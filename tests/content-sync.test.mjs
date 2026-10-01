import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
	copyFileSync,
	mkdirSync,
	mkdtempSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";

for (const value of [undefined, "false", "", "TRUE", "1"]) {
	test(`content sync leaves local files untouched when ENABLE_CONTENT_SYNC=${String(value)}`, () => {
		const root = mkdtempSync(path.join(tmpdir(), "mizuki-sync-test-"));
		try {
			mkdirSync(path.join(root, "scripts"));
			mkdirSync(path.join(root, "content", "posts"), { recursive: true });
			mkdirSync(path.join(root, "src", "content", "posts"), {
				recursive: true,
			});
			writeFileSync(path.join(root, "package.json"), '{"type":"module"}');
			writeFileSync(
				path.join(root, "content", "posts", "remote.md"),
				"remote content",
			);
			const local = path.join(root, "src", "content", "posts", "local.md");
			writeFileSync(local, "local content");
			for (const file of ["sync-content.js", "load-env.js"]) {
				copyFileSync(
					new URL(`../scripts/${file}`, import.meta.url),
					path.join(root, "scripts", file),
				);
			}
			const env = {
				...process.env,
				CONTENT_DIR: path.join(root, "content"),
				CONTENT_REPO_URL: "",
			};
			delete env.ENABLE_CONTENT_SYNC;
			if (value !== undefined) env.ENABLE_CONTENT_SYNC = value;
			const result = spawnSync(
				process.execPath,
				[path.join(root, "scripts", "sync-content.js")],
				{
					cwd: root,
					env,
					encoding: "utf8",
					timeout: 5000,
				},
			);
			assert.equal(result.status, 0, result.stderr);
			assert.match(result.stdout, /ENABLE_CONTENT_SYNC=true/);
			assert.equal(readFileSync(local, "utf8"), "local content");
			assert.doesNotMatch(result.stdout, /git|已提交内容更新|正在建立内容链接/);
		} finally {
			rmSync(root, { recursive: true, force: true });
		}
	});
}
