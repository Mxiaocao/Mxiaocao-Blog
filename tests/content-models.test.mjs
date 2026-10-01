import assert from "node:assert/strict";
import { test } from "node:test";
import {
	projectSchema,
	noteSchema,
	labSchema,
} from "../src/schemas/content.ts";
import {
	assertPostPermalinkAvailable,
	writingPagePath,
} from "../src/utils/route-boundaries.ts";

test("article permalinks cannot shadow site sections or legacy pagination", () => {
	for (const path of [
		"writing",
		"/projects/example/",
		"Notes/foo",
		"%6Cab/test",
		"about",
		"2",
		"posts/article",
		"lab/../other",
		"other?x=1",
	]) {
		assert.throws(() => assertPostPermalinkAvailable(path, "fixture"));
	}
	for (const path of [
		"2026/05/14/hello-world",
		"2026/05/24/女王生日快乐",
		"engineering/build-notes",
	]) {
		assert.doesNotThrow(() => assertPostPermalinkAvailable(path, "fixture"));
	}
});
test("Writing page one and subsequent pages stay within the Writing section", () => {
	assert.equal(writingPagePath(1), "/writing/");
	assert.equal(writingPagePath(2), "/writing/2/");
	assert.throws(() => writingPagePath(0));
});
test("project records require stable slugs, valid status and dates", () => {
	const record = {
		id: "sample-project",
		title: "Sample",
		description: "Description",
		category: "web",
		techStack: [],
		status: "planned",
		startDate: "2026-10-01",
	};
	assert.equal(projectSchema.parse(record).isDemo, false);
	for (const patch of [
		{ id: "../sample" },
		{ status: "unknown" },
		{ startDate: "2026-02-31" },
		{ sourceCode: "javascript:alert(1)" },
	]) {
		assert.equal(
			projectSchema.safeParse({ ...record, ...patch }).success,
			false,
		);
	}
});
test("Notes and Lab keep distinct models and reject invalid experiment URLs", () => {
	const record = {
		title: "Sample",
		description: "Description",
		published: "2026-10-01",
		draft: true,
	};
	assert.equal(noteSchema.parse({ ...record, kind: "til" }).draft, true);
	assert.equal(
		noteSchema.safeParse({ ...record, kind: "experiment" }).success,
		false,
	);
	const lab = { ...record, kind: "experiment", status: "in-progress" };
	assert.equal(labSchema.safeParse(lab).success, true);
	assert.equal(
		labSchema.safeParse({ ...lab, demoUrl: "/lab/demo/" }).success,
		true,
	);
	assert.equal(
		labSchema.safeParse({ ...lab, demoUrl: "javascript:alert(1)" }).success,
		false,
	);
	assert.equal(
		labSchema.safeParse({ ...lab, demoUrl: "//outside.example" }).success,
		false,
	);
});
