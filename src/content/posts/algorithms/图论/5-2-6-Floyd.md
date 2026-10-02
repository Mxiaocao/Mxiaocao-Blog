---
title: "5.2.6 Floyd"
published: 2026-05-25
updated: 2026-05-25
description: "5.2.6 Floyd适用条件：多源最短路（求任意两点间的最短距离）、允许存在负权边。 [注]：由于其时间复杂度高达 ，纯正的“暴力美学”，只适用于图极其微小的情况（通常顶点数 ）。但在小图里，它是最好写、最不容易出错的算法，核心代码只有五行！ Floyd 算法与 Dijkstra、SPFA 最大的不同在于，它不是用来求“单源”（从一个固定起点出发）的，而是一次性把地图上任意两个村庄之间的最短路全"
image: "/img/2.jpg"
tags: ["最短路", "Floyd"]
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/25/5-2-6-Floyd/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "图论"
topic: "算法竞赛"
---

# 5.2.6 Floyd

**适用条件**：多源最短路（求任意两点间的最短距离）、允许存在负权边。

**[注]**：由于其时间复杂度高达  ，纯正的“暴力美学”，只适用于图极其微小的情况（通常顶点数  ）。但在小图里，它是最好写、最不容易出错的算法，核心代码只有五行！

Floyd 算法与 Dijkstra、SPFA 最大的不同在于，它不是用来求“单源”（从一个固定起点出发）的，而是一次性把地图上任意两个村庄之间的最短路全部算出来。

有个极其贴切的现实模型，即“航班中转（找中间人）”。 假设你要从城市   飞往城市  ，当前直飞的机票要 1000 块。此时，你考虑去城市   作为一个“中转站”。你查了一下，从   飞   只要 300 块，从   飞   只要 400 块。那么  。此时，你找到了更便宜的路线。Floyd 算法的本质，就是把地图上的每一个城市，都轮流当作一次中转站，去尝试优化所有航班的票价。

## 必备概念

只需要记下一个最核心的数据结构：

- `dist[N][N]`：一个二维数组（邻接矩阵），存储的是目前从点   到点   的最短距离。
  - 起初，它只记录“直飞”的距离（也就是输入的边）。
  - 随着算法运行，它会不断被“中转航班”更新，最终变成全局最短距离。

**沙盘推演：**

地图情报：城市 1、2、3。直飞航线：1->2 票价 8，2->3 票价 1，1->3 票价 10。

- **初始状态：**

  `dist[1][2] = 8`

  `dist[2][3] = 1`

  `dist[1][3] = 10`
- **第一步：所有人尝试把城市 1 当作中转站**

  2 说：“我要去 3，如果去 1 中转……”（毫无意义，绕远了）。没人的票价被更新。
- **第二步：所有人尝试把城市 2 当作中转站（高潮来了）**

  1 说：“我要去 3，目前的票价是 `dist[1][3] = 10`。如果我先去 2，再去 3，票价是 `dist[1][2] + dist[2][3] = 8 + 1 = 9`。”

  因为  ，**路线被优化！** 更新底牌：`dist[1][3] = 9`。
- **第三步：所有人尝试把城市 3 当作中转站**

  也没有人能得到更便宜的票价。
- **最终收网：**

  任意两点间的最短距离都已经锁定。


<iframe frameborder="0" height="750" loading="lazy" src="/algo-vis/floyd.html" style="border-radius:12px;margin:20px 0;" width="100%"></iframe>


## 代码解析

1. 初始化

   在 Floyd 算法中，初始化非常关键，必须遵守三条原则：

   1. 自己到自己的距离是 0（`dist[i][i] = 0`）
   2. 一开始互相没路的点，距离是无穷大（`inf`）
   3. 如果有两点之间有多条边（重边），只记录最短的那条
```cpp
//初始化为无穷大
for(int i = 1;i <= n;++i){
    for(int j = 1;j <= n;++j){
        if(i == j) dist[i][j] = 0;
        else dist[i][j] = INF;
    }
}
//读入边，注意重边
for(int i = 1;i <= m;++i){
    int u,v,w; cin >> u >> v >> w;
    dist[u][v] = min(dist[u][v],w);
}
```

2. 核心循环

   Floyd 算法的核心是三层for循环

   这一块要记住变量  必须写在最外层循环，因为 Floyd 的本质是动态规划。它指 在只允许经过前   个城市作为中转站的情况下，任意两点的最短距离。如果把   写在内层，就会导致前面还没彻底算清楚的中转方案被提前跳过，答案全错。

   
```cpp
for(int k = 1;k <= n;++k){
    for(int i = 1;i <= n;++i){ //起点
        for(int j = 1;j <= n;++j){ //终点
            if(dist[i][k] < INF && dist[k][j] < INF){
                if(dist[i][j] > dist[i][k] + dist[k][j]){
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}
```


**综合代码**


```cpp
const int N = 505;
const int INF = 0x3f3f3f3f;

int dist[N][N];

void floyd(int n,int m){
    for(int i = 1;i <= n;++i){
        for(int j = 1;j <= n;++j){
            if(i == j) dist[i][j] = 0;
            else dist[i][j] = INF;
        }
    }

    for(int i = 1;i <= m;++i){
        int u,v,w; cin >> u >> v >> w;
        dist[u][v] = min(dist[u][v],w);
        dist[v][u] = min(dist[v][u],w); //无向图
    }
    
    for(int k = 1;k <= n;++k){
        for(int i = 1;i <= n;++i){
            for(int j = 1;j <= n;++j){
                if(dist[i][k] < INF && dist[k][j] < INF){
                    if(dist[i][j] > dist[i][k] + dist[k][j]){
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
    }
}
```


## 例题

### 1. B3647 【模板】Floyd

#### Ques

[门钥匙](https://www.luogu.com.cn/problem/B3647)

**题目描述**

给出一张由   个点   条边组成的无向连通图。

求出所有点对   之间的最短路径。

**输入格式**

第一行为两个整数  ，分别代表点的个数和边的条数。

接下来   行，每行三个整数  ，代表   之间存在一条边权为   的边。

**输出格式**

输出   行每行   个整数。

第   行的第   个整数代表从   到   的最短路径。

**输入 #1**


```plaintext
4 4
1 2 1
2 3 1
3 4 1
4 1 1
```


**输出 #1**


```plaintext
0 1 2 1
1 0 1 2
2 1 0 1
1 2 1 0
```


**说明/提示**

对于   的数据， ， ，任意一条边的权值   是正整数且  。

**数据中可能存在重边。**

#### Ans


```cpp
const int INF = 1e9;

void Floyd(int n,int m,vector<vector<int>>& dist){
    dist.assign(n+1,vector<int> (n+1,INF));
    for(int i = 1;i <= n;++i){
        dist[i][i] = 0;
    }

    for(int i = 1;i <= m;++i){
        int u,v,w; cin >> u >> v >> w;
        dist[u][v] = min(dist[u][v],w);
        dist[v][u] = min(dist[v][u],w);
    }

    for(int k = 1;k <= n;++k){
        for(int i = 1;i <= n;++i){
            for(int j = 1;j <= n;++j){
                if(dist[i][k] < INF && dist[k][j] < INF){
                    if(dist[i][j] > dist[i][k] + dist[k][j]){
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
    }
}

void solve(){
    int n,m; cin >> n >> m;
    vector<vector<int>> dist;
    Floyd(n,m,dist);
    for(int i = 1;i <= n;++i){
        for(int j = 1;j <= n;++j){
            cout << dist[i][j] << (j == n ? "\n" : " ");
        }
    }
    return;
}
```


**相关文章**

[[5-2-3-Dijkstra]] [[5-2-4-SPFA-Bellman-Ford]] [[5-3-2-MST]]
