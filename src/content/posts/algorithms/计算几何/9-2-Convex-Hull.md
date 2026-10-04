---
title: "9.2 凸包"
published: 2026-05-24
updated: 2026-05-25
description: "在二维计算几何中，凸包是最经典的算法之一。无论是求解最远点对、判断点集区域还是进行动态规划的几何优化，凸包都是不可或缺的知识点 一、定义凸多边形：是指所有内角大小都在 [0,𝜋] 范围内的简单多边形 凸包：在平面上能包含所有给定点的最小凸多边形叫做凸包，严谨地说，对于给定平面上的点集 ，所有包含 的凸集的交集 ，被称为 的凸包 但说白了可以理解为用一个橡皮筋包含住所有给定点的形态，凸包用最小"
tags: ["计算几何", "凸包", "Andrew算法"]
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "计算几何"
topic: "算法竞赛"
---

在二维计算几何中，凸包是最经典的算法之一。无论是求解最远点对、判断点集区域还是进行动态规划的几何优化，凸包都是不可或缺的知识点

## 一、定义

凸多边形：是指所有内角大小都在 [0,𝜋] 范围内的简单多边形

凸包：在平面上能包含所有给定点的最小凸多边形叫做凸包，严谨地说，对于给定平面上的点集  ，所有包含   的凸集的交集  ，被称为   的凸包

但说白了可以理解为用一个橡皮筋包含住所有给定点的形态，凸包用最小的周长围住了给定的所有点。例如一堆点中，内部点不会出现在凸包上，只有最外层的点会构成凸包

凸包常见用途包括：

- 求最外层边界
- 求最远点对，配合旋转卡壳
- 判断点是否在点集形成的区域内
- 凸多边形面积、周长
- 半平面交、动态规划优化中的几何结构

## 二、Andrew 算法求凸包

求凸包常用地有Andrew算法和Graham扫描法。由于Andrew算法好写、稳定、常数小，复杂度是O(n log n)，所以介绍Andrew算法

Andrew算法地核心思想是维护一个单调栈，分两步求出下凸壳和上凸壳：

1. 双关键字排序：

   先按x坐标从小到大排序，若x相同则按y坐标排序。排序后，最左下角的点和最右上角的点必定在凸包上
2. 扫描下凸壳（从左到右）：

   - 依次将点入栈
   - 假设栈顶的两个点是A B，即将入栈的新点是C
   - 计算cross(B-A,C-B)。如果结果小于等于0（即出现了向右转或直走），说明B点凹进去了，不配留在凸包上，将B弹出
   - 重复上述判定，直到转向再次变为左转，将C压入栈
3. 扫描上凸壳（从右到左）：

   逆序枚举所有点，同上
4. 合并收尾：

   上下凸壳拼接为完整的凸包


<iframe title="Andrew 凸包算法交互模拟" height="900" loading="lazy" src="/algo-vis/convex-hull.html" style="border:0;border-radius:12px;margin:20px 0;" width="100%"></iframe>

[在独立页面打开凸包模拟器](/algo-vis/convex-hull.html)

模拟器支持逐步查看排序、叉积判断、出栈和入栈，也可以编辑点集。与下面的代码一致，重复点会先去重，共线边只保留两个端点；全部共线时，凸包退化为线段。


```cpp
struct point{
    ll x,y;
    
    bool operator<(const point& o) const{
        if(x != o.x) return x < o.x;
        return y < o.y;
    }
    bool operator==(const point& o) const{
        return x == o.x && y == o.y;
    }
};

point operator-(point a,point b){
    return {a.x-b.x,a.y-b.y};
}

ll cross(point a,point b){
    return a.x*b.y - a.y*b.x;
}

vector<point> convex_hull(vector<point> p){
    sort(p.begin(),p.end());
    p.erase(unique(p.begin(),p.end()),p.end());
    
    int n = p.size();
    if(n <= 2) return p;
    
    vector<point> hull;
    
    for(int i = 0;i < n;++i){
        while(hull.size() >= 2){
            point a = hull[hull.size()-2];
            point b = hull[hull.size()-1];
            point c = p[i];
            
            if(cross(b-a,c-a) <= 0){
                hull.pop_back();
            }else{
                break;
            }
        }
        hull.push_back(p[i]);
    }
    
    int lower_size = hull.size();
    for(int i = n-2;i >= 0;--i){
        while((int)hull.size() > lower_size){
            point a = hull[hull.size()-2];
            point b = hull[hull.size()-1];
            point c = p[i];
            
            if(cross(b-a,c-a) <= 0){
                hull.pop_back();
            }else{
                break;
            }
        }
        hull.push_back(p[i]);
    }
    hull.pop_back();
    return hull;
}
```


**相关文章**

[[9-1-2D-Geometry]]
