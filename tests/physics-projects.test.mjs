import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { physicsProjects } from "../src/data/physics-projects.ts";
import { projectSchema } from "../src/schemas/content.ts";
import { assertPostPermalinkAvailable } from "../src/utils/route-boundaries.ts";

test("one project groups every legacy physics experiment with a runnable local document", () => {
	const inventory = JSON.parse(readFileSync(new URL("../migration/legacy-url-inventory.json", import.meta.url), "utf8"));
	const entries = inventory.entries ?? inventory.pages;
	const paths = entries.filter(entry => entry.path.startsWith("/physics-lab/") && entry.path.endsWith(".html")).map(entry => entry.path);
	assert.equal(paths.length, 6);
	assert.equal(physicsProjects.length, 1);
	const collection = projectSchema.parse(physicsProjects[0]);
	assert.equal(collection.id, "physics-lab");
	assert.equal(collection.category, "physics");
	assert.equal(collection.featured, true);
	assert.equal(collection.startDate, undefined);
	assert.deepEqual(collection.experiments.map(experiment => experiment.liveDemo).sort(), paths.sort());
	for (const project of collection.experiments) {
		const html = readFileSync(new URL(`../public${project.liveDemo}`, import.meta.url), "utf8");
		assert.match(html, /^<!DOCTYPE html>/i);
		assert.match(html.trim(), /<\/html>$/i);
		assert.ok(/<canvas\b|new THREE.WebGLRenderer/i.test(html), `${project.id}: drawing surface`);
		assert.doesNotMatch(html, /```html|\/css\/index\.css|butterfly-extsrc/);
		for (const [, attributes, code] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)) {
			if (attributes.includes('type="importmap"')) { JSON.parse(code); continue; }
			const result = spawnSync(process.execPath, ["--check", "--input-type=module"], { input: code, encoding: "utf8" });
			assert.equal(result.status, 0, `${project.id}: ${result.stderr}`);
		}
	}
});

test("local demo URLs are accepted while unsafe schemes and route collisions are rejected", () => {
	const project = physicsProjects[0];
	for (const liveDemo of ["javascript:alert(1)", "//outside.example", "data:text/html,test"]) {
		assert.equal(projectSchema.safeParse({ ...project, liveDemo }).success, false);
	}
	assert.throws(() => assertPostPermalinkAvailable("physics-lab/oscilloscope.html", "fixture"));
});
