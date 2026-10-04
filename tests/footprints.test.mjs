import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { test } from "node:test";
import { assertPostPermalinkAvailable } from "../src/utils/route-boundaries.ts";

const data = JSON.parse(fs.readFileSync(new URL("../src/data/footprints.json", import.meta.url), "utf8"));

test("migrated locations, routes and every referenced photo are complete", () => {
	assert.equal(data.places.length, 28);
	assert.equal(data.routes.length, 3);
	const ids = new Set(data.places.map(place => place.id));
	assert.equal(ids.size, data.places.length);
	const photos = new Set();
	for (const place of data.places) {
		assert.ok(place.coord[0] > 119 && place.coord[0] < 121);
		assert.ok(place.coord[1] > 29 && place.coord[1] < 31);
		for (const visit of [place, ...(place.visits ?? [])]) {
			for (const photo of visit.photos ?? []) photos.add(photo);
		}
	}
	assert.equal(photos.size, 62);
	for (const photo of photos) {
		const bytes = fs.readFileSync(new URL(`../public${photo}`, import.meta.url));
		assert.equal(bytes.readUInt16BE(0), 0xffd8, photo);
	}
	for (const route of data.routes) {
		assert.ok(route.placeIds.length > 0);
		for (const id of route.placeIds) assert.ok(ids.has(id), `${route.id}: ${id}`);
	}
	assert.throws(() => assertPostPermalinkAvailable("map/view", "fixture"));
});

test("filters include repeat visits and distance sampling retains route endpoints", () => {
	const elements = { mapTagFilter: { value: "all" }, mapYearFilter: { value: "all" } };
	let source = fs.readFileSync(new URL("../public/footprints/map.js", import.meta.url), "utf8");
	source = source.slice(0, source.indexOf("  function syncTheme()")) + "\nwindow.testing = {getFilteredPlaces, totalPhotos, placeVisits, resamplePathByDistance, routeLengthMeters}; })();";
	const window = { MXIAOCAO_FOOTPRINTS: data };
	vm.runInNewContext(source, { window, document: { getElementById: id => elements[id], addEventListener() {} } });
	const api = window.testing;
	assert.equal(api.getFilteredPlaces().length, 28);
	elements.mapYearFilter.value = "2025";
	assert.deepEqual(Array.from(api.getFilteredPlaces(), place => place.id), ["lingyin"]);
	elements.mapYearFilter.value = "2026";
	elements.mapTagFilter.value = "公园";
	assert.ok(api.getFilteredPlaces().some(place => place.id === "taiziwan"));
	assert.equal(api.totalPhotos(data.places.find(place => place.id === "taiziwan")), 11);
	elements.mapTagFilter.value = "不存在的标签";
	assert.equal(api.getFilteredPlaces().length, 0);
	const path = [[120.15, 30.25], [120.15, 30.25], [120.16, 30.26]];
	const sampled = api.resamplePathByDistance(path, 30);
	assert.deepEqual(Array.from(sampled[0]), path[0]);
	assert.deepEqual(Array.from(sampled.at(-1)), path.at(-1));
	assert.ok(sampled.length > 2);
	assert.ok(Math.abs(api.routeLengthMeters(sampled) - api.routeLengthMeters(path)) < 1);
});

test("basemap feedback waits for map completion, handles timeout, and cleans listeners", () => {
	let source = fs.readFileSync(new URL("../public/footprints/map.js", import.meta.url), "utf8");
	source = source.slice(0, source.indexOf("  function syncTheme()")) + "\nwindow.monitor = monitorBasemap; })();";
	const window = { MXIAOCAO_FOOTPRINTS: data };
	const timers = new Set();
	vm.runInNewContext(source, {
		window, document: { getElementById() {}, addEventListener() {} },
		setTimeout(callback) { timers.add(callback); return callback; },
		clearTimeout(callback) { timers.delete(callback); },
	});
	const handlers = new Map();
	const map = { on: (name, callback) => handlers.set(name, callback), off: name => handlers.delete(name) };
	let state = "loading";
	const stop = window.monitor(map, () => { state = "ready"; }, () => { state = "failed"; });
	assert.equal(state, "loading");
	for (const callback of timers) callback();
	assert.equal(state, "failed");
	handlers.get("complete")();
	assert.equal(state, "ready");
	assert.equal(timers.size, 0);
	stop();
	assert.equal(handlers.size, 0);
	const dispose = window.monitor(map, () => {}, () => { state = "failed"; });
	handlers.get("error")();
	assert.equal(state, "failed");
	dispose();
	assert.equal(timers.size, 0);
});

test("map page keeps the embedded experience without a separate-window link", () => {
	const source = fs.readFileSync(new URL("../src/pages/map/index.astro", import.meta.url), "utf8");
	assert.doesNotMatch(source, /新窗口展开地图/);
	assert.match(source, /src="\/map\/view\/"/);
});
