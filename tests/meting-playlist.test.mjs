import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import { fetchMetingTracks } from "../src/utils/meting-playlist.ts";

afterEach(() => mock.restoreAll());
const primary =
	"https://primary.test/?server=:server&type=:type&id=:id&auth=:auth&r=:r";
const backup = "https://backup.test/?server=:server&type=:type&id=:id";
const tracks = [{ title: "Song", url: "https://audio.test/?auth=a%2Fb" }];

test("keeps signed URLs and only requests the healthy primary", async () => {
	const fetchMock = mock.method(globalThis, "fetch", async (url) => {
		const params = new URL(url).searchParams;
		assert.equal(params.get("id"), "a&b");
		assert.equal(params.get("server"), "netease");
		return Response.json(tracks);
	});
	assert.deepEqual(
		await fetchMetingTracks([primary, backup], "netease", "playlist", "a&b"),
		tracks,
	);
	assert.equal(fetchMock.mock.callCount(), 1);
});

for (const failure of [
	"network",
	"http",
	"json",
	"object",
	"empty",
	"invalid",
]) {
	test(`falls back after ${failure} failure`, async () => {
		const fetchMock = mock.method(globalThis, "fetch", async (url) => {
			if (url.startsWith("https://backup.test/")) return Response.json(tracks);
			if (failure === "network") throw new TypeError("Failed to fetch");
			if (failure === "http")
				return new Response("unavailable", { status: 503 });
			if (failure === "json") return new Response("<html>error</html>");
			if (failure === "object") return Response.json({ code: 500 });
			if (failure === "invalid") return Response.json([null, {}, { url: " " }]);
			return Response.json([]);
		});
		assert.deepEqual(
			await fetchMetingTracks(
				[primary, primary, backup],
				"netease",
				"playlist",
				"123",
			),
			tracks,
		);
		assert.equal(fetchMock.mock.callCount(), 2);
	});
}

test("aborts a stalled request and tries the backup", async () => {
	// Keep the test process alive while AbortSignal's unref'ed timer expires.
	const keepAlive = setInterval(() => {}, 1000);
	try {
		mock.method(globalThis, "fetch", async (url, { signal }) => {
			if (url.startsWith("https://backup.test/")) return Response.json(tracks);
			return new Promise((_, reject) =>
				signal.addEventListener("abort", () => reject(signal.reason), {
					once: true,
				}),
			);
		});
		assert.deepEqual(
			await fetchMetingTracks(
				[primary, backup],
				"netease",
				"playlist",
				"123",
				10,
			),
			tracks,
		);
	} finally {
		clearInterval(keepAlive);
	}
});

test("rejects once all providers fail", async () => {
	mock.method(globalThis, "fetch", async () => Response.json([]));
	await assert.rejects(
		fetchMetingTracks([primary, backup], "netease", "playlist", "123"),
		/No Meting provider/,
	);
});
