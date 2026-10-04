import type { ProjectInput } from "../schemas/content";

// Recovered from the legacy site's published snapshot. Original start dates are unknown.
const experiments = [
	{
		id: "oscilloscope",
		file: "oscilloscope.html",
		title: "模拟示波器",
		description: "YB43020B 示波器与信号发生器的交互仿真，练习波形观察、旋钮调节和信号测量。",
		instructions: "打开实验指引，按照提示设置信号发生器和示波器。调节频率、幅度、时基与垂直灵敏度，观察屏幕上的波形变化。仪器面板较大，建议在独立窗口中操作。",
		tags: ["物理实验", "示波器", "信号测量"],
	},
	{
		id: "string-vibration",
		file: "String-Vibration-Experiment-1.html",
		title: "弦振动实验",
		description: "调节频率、张力与驻波段数，观察弦的振动，记录波长和波速，探索驻波与共振条件。",
		instructions: "点击“开始实验”，调节控制台中的参数，观察驻波形态和共振状态。点击“记录当前数据”将读数写入实验记录表，也可以暂停或重置动画。",
		tags: ["物理实验", "驻波", "共振"],
	},
	{
		id: "equal-thickness-interference",
		file: "Equal-Thickness-Interference-1.html",
		title: "等厚干涉实验",
		description: "在劈尖与牛顿环两种模式中观察干涉条纹，用测量光标记录数据并进行逐差法计算。",
		instructions: "选择劈尖或牛顿环模式，调节实验参数，拖动光标或用微调按钮测量暗纹位置、环直径。记录读数后查看逐差法结果；自动扫描可用于对照手动测量。",
		tags: ["物理实验", "光学", "牛顿环"],
	},
	{
		id: "electric-field",
		file: "E-Field-Simulation.html",
		title: "电场可视化",
		description: "通过电场线、矢量场、等势线和三维视图，观察不同电荷分布产生的电场与电势。",
		instructions: "从电偶极子、同号电荷等预置场景开始，切换可视化模式，调整电荷并比较结果。三维视图支持旋转和缩放。",
		tags: ["物理实验", "电场", "电势"],
		three: true,
	},
	{
		id: "3d-function-grapher",
		file: "3D-Function-Grapher.html",
		title: "三维函数图像生成器",
		description: "输入二元函数绘制三维曲面，配合等高线、截面与积分区域预设辅助微积分学习。",
		instructions: "输入函数（例如 x^2 + y^2）后点击“绘制”。拖动视图旋转，滚轮缩放；在右侧面板切换线框、等高线、截面和积分区域。",
		tags: ["数学可视化", "微积分", "三维曲面"],
		three: true,
	},
	{
		id: "electric-flux",
		file: "Electric-Flux-Engineering-to-AI.html",
		title: "电通量：从工程到 AI",
		description: "以交互图解介绍电通量与高斯定律，展示经典工程应用，并讨论与图神经网络的联系。",
		instructions: "沿页面阅读各章节，点击应用卡片打开交互演示，调节参数观察变化。AI 部分为概念演示。",
		tags: ["物理实验", "电通量", "高斯定律"],
	},
];

export const physicsExperiments = experiments.map((experiment) => ({
	id: experiment.id,
	title: experiment.title,
	description: experiment.description,
	instructions: experiment.instructions,
	liveDemo: `/physics-lab/${experiment.file}`,
}));

export const physicsProjects: ProjectInput[] = [{
	id: "physics-lab",
	title: "交互式物理实验室",
	description: "大学物理学习中的浏览器仿真实验合集，包含示波器、弦振动、光学干涉、电场与电通量演示，以及三维函数绘图工具。",
	category: "physics",
	techStack: ["HTML", "CSS", "JavaScript", "Canvas", "Three.js"],
	status: "completed",
	featured: true,
	tags: ["学习实践", "物理实验", "可视化"],
	experiments: physicsExperiments,
}];
