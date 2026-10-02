---
title: "9.1 二维几何"
published: 2026-05-24
updated: 2026-05-25
description: "二维计算几何通常处理平面上的点、向量、线段、多边形、圆等图形。而其核心在于熟练使用向量和叉积 最常用的点/向量结构可以这样理解 123456789101112131415struct point{ double x,y;};point operator+(point a,point b){ return {a.x + b.x,a.y+b.y};}point operator-(poin"
image: "/img/2.jpg"
tags: ["计算几何", "二维几何", "叉积", "点积"]
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/25/9-1-2D-Geometry/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "计算几何"
topic: "算法竞赛"
---

二维计算几何通常处理平面上的点、向量、线段、多边形、圆等图形。而其核心在于熟练使用向量和叉积

最常用的点/向量结构可以这样理解


```cpp
struct point{
    double x,y;
};

point operator+(point a,point b){
    return {a.x + b.x,a.y+b.y};
}

point operator-(point a,point b){
    return {a.x-b.x,a.y-b.y};
}

point operator*(point a,double k){
    return {a.x*k,a.y*k};
}
```


点表示位置，向量表示方向和长度，在代码里他们通常用一个结构体存

最重要的两个运算是点积和叉积

点积：


```cpp
double dot(point a,point b){
    return a.x*b.x + a.y*b.y;
}
```


点积主要用来判断夹角、投影、距离

若dot(a,b) > 0，夹角小于90°；若等于0，两个向量垂直；若小于0，夹角大于90°

叉积：


```cpp
double cross(point a,point b){
    return a.x*b.y - a.y-b.x;
}
```


叉积是二维计算几何的核心

cross(a,b)的符号表示b在a的哪一侧：

- 大于0：b在a的左侧，即从a到b是逆时针转
- 小于0：b在a的右侧，即从a到b是顺时针转
- 等于0：两个向量共线

如果想判断点p在有向直线ab的哪一侧，可以算：`cross(b-a,p-a);`，这也是很多几何算法的基础

线段相交一般靠两个实验：

第一是快速排斥实验：两条线段如果他们的横坐标范围、纵坐标范围都没有重叠，那么一定不相交

第二是跨立实验：设两条线段为ab和cd，如果c d分别在直线ab两侧，并且a b分别在直线cd两侧，那么两线段必相交


```cpp
int sgn(double x){
    const double eps = 1e-9;
    if(x > eps) return 1;
    if(x < eps) return -1;
    return 0;
}

bool intersect(point a,point b,point c,point d){
    double c1 = cross(b-a,c-a);
    double c2 = cross(b-a,d-a);
    double c3 = cross(d-c,a-c);
    double c4 = cross(d-c,b-c);
    
    return sgn(c1)*sgn(c2) <= 0 &&
           sgn(c3)*sgn(c4) <= 0 &&
           max(min(a.x,b.x),min(c.x,d.x)) <= min(max(a.x,b.x),max(c.x,d,x));
           max(min(a.y,b.y),min(c.y,d.y)) <= min(max(a.y,b.y),max(c.y,d,y));
}
```


下面解释一下return的内容：

1. 跨立实验

   `c1 = cross(b - a, c - a)`：表示   点在   直线的哪一侧。

   `c2 = cross(b - a, d - a)`：表示   点在   直线的哪一侧。

   如果 `sgn(c1) * sgn(c2) <= 0`，说明：

   - `c1` 和 `c2` 符号相反（一个正，一个负），说明   跨立在   两侧。
   - `c1` 或 `c2` 等于 0，说明   或   恰好在直线   上。
2. 快速排斥实验

   从一维上来看：

   假设线段 1 的端点是   和  ，线段 2 的端点是   和  。

   为了方便，我们规定：

   - 线段 1 的范围是  
   - 线段 2 的范围是  

   这两条线段什么时候有重叠？

   想象两根棍子，如果它们的范围要重叠，必须满足：左边界的最大值，不能超过右边界的最小值。

   用数学语言写就是：`max(左边界1, 左边界2) <= min(右边界1, 右边界2)`

   从二维上看：

   无非就是写一个x方向和y方向的

多边形面积也可以用叉积，设多边形顶点按顺时针或逆时针排列，面积为：


```cpp
double polygon_area(vector<point> p){
    int n = p.size();
    double s = 0;
    for(int i = 0;i < n;++i){
        s += cross(p[i],p[(i+1)%n])
    }
    return fabs(s)/2;
}
```


当然这个公式也叫”鞋带”公式，本质上是把多边形拆解成若干个以原点为公共点的有向三角形

点在多边形内有两种常见方法：

- 光线投射法：从该点向任意方向发出一条射线，看和多边形边相交的次数。奇数次在内部，偶数次在外部
- 回转数法：看多边形绕这个点转了几圈。回转数非零则在内部

竞赛中最常见的是光线投射法，但要小心点在边上、射线穿过顶点等边界情况

**相关文章**

[[9-2-Convex-Hull]]
