import assert from "node:assert/strict";
import { test } from "node:test";
import { articleTaxonomy, articleQuery, buildArticleMenu, classificationPath, matchesClassification, articleFilterGroups, articlePageHeading } from "../src/utils/article-taxonomy.ts";

test("nested pages show their own heading and immediate children, never ancestor filters", () => {
	const tree = buildArticleMenu([{ category: "技术学习", subcategory: "编程语言", topic: "C / C++" }]);
	const groups = articleFilterGroups(tree, 1);
	const path = ["技术学习", "计算机基础"];
	const group = groups.find(group => articleQuery(group.path) === articleQuery(path));
	assert.deepEqual(group.nodes.map(node => node.name), ["数据结构", "计算机系统原理"]);
	assert.equal(group.count, 0);
	const leaf = [...path, "计算机系统原理"];
	assert.equal(groups.some(group => articleQuery(group.path) === articleQuery(leaf)), false);
	assert.equal(articlePageHeading(leaf).title, "计算机系统原理");
	assert.match(articlePageHeading(leaf).subtitle, /计算机系统原理/);
	assert.equal(articlePageHeading(path).title, "计算机基础");
	assert.equal(articlePageHeading([]).title, "文章");
});

test("classification accepts one to three levels and preserves legacy posts", () => {
	assert.deepEqual(classificationPath({}), []);
	assert.deepEqual(classificationPath({ category: "原有分类" }), ["原有分类"]);
	assert.deepEqual(classificationPath({ category: "ACM-ICPC", subcategory: "图论" }), ["ACM-ICPC", "图论"]);
	assert.deepEqual(classificationPath({ category: "STL" }), ["技术学习", "编程语言", "C / C++"]);
});

test("classification URLs preserve spaces, slashes and plus signs", () => {
	const path = ["技术学习", "编程语言", "C / C++"];
	const query = new URL(articleQuery(path), "https://example.com").searchParams;
	assert.deepEqual(classificationPath(Object.fromEntries(query)), path);
	assert.equal(articleQuery([]), "/writing/");
});

test("prefix filters include descendants without mixing same-name categories", () => {
	assert.equal(matchesClassification(["技术学习", "计算机基础", "数据结构"], ["技术学习"]), true);
	assert.equal(matchesClassification(["技术学习", "计算机基础", "数据结构"], ["ACM-ICPC", "数据结构"]), false);
	assert.equal(matchesClassification(["ACM-ICPC", "数据结构"], ["ACM-ICPC", "数据结构"]), true);
});

test("menus retain the complete directory including empty categories and never exceed three levels", () => {
	const tree = buildArticleMenu([{ category: "技术学习", subcategory: "编程语言", topic: "C / C++" }]);
	assert.deepEqual(tree.map(node => node.name), ["技术学习", "ACM-ICPC", "AI"]);
	assert.deepEqual(tree[0].children.map(node => node.name), ["编程语言", "计算机基础", "Web 开发", "开发环境与工具"]);
	assert.deepEqual(tree[0].children[0].children.map(node => node.name), ["C / C++", "Java", "Python", "其他"]);
	assert.deepEqual(tree[0].children[1].children.map(node => node.name), ["数据结构", "计算机系统原理"]);
	assert.deepEqual(tree[0].children[3].children.map(node => node.name), ["Git / GitHub", "Linux", "Docker", "环境配置"]);
	assert.deepEqual(tree[1].children.map(node => node.name), ["基础算法", "STL", "数据结构", "图论", "动态规划", "数学", "计算几何", "字符串", "题解", "比赛复盘"]);
	assert.deepEqual(tree[2].children.map(node => node.name), ["AI Coding", "AI 实践"]);
	assert.equal(tree[0].children[0].children[1].count, 0);
	assert.equal(tree[0].count, 1);
	assert.equal(tree[1].count, 0);
	function validate(nodes, depth = 1) {
		assert.ok(depth <= 3);
		for (const node of nodes) if (node.children?.length) validate(node.children, depth + 1);
	}
	validate(articleTaxonomy);
	assert.equal(buildArticleMenu([])[1].children.length, 10);
});
