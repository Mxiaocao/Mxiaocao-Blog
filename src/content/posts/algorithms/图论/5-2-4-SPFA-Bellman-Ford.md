---
title: "5.2.4 SPFA (Bellman-Ford)"
published: 2026-05-23
updated: 2026-05-24
description: "适用条件：单源、包含负边权、判断是否存在负环。 [注]：在没有负边权的正权图里，优先使用 Dijkstra，因为 SPFA 容易被特殊构造的数据卡成 的龟速。 Bellman-Ford 算法是单源最短路径算法，求一个起点 到其他所有点的最短路径。一个有 个点的图，给每个点 次机会查询邻居，是否有到起点 的更短的路径，如果有就更新；经过 轮查询和更新，就得到了所有点到起点 的最短路径。"
tags: ["最短路", "SPFA", "负环"]
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/24/5-2-4-SPFA-Bellman-Ford/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "图论"
topic: "算法竞赛"
---

**适用条件**：单源、包含负边权、判断是否存在负环。

**[注]**：在没有负边权的正权图里，优先使用 Dijkstra，因为 SPFA 容易被特殊构造的数据卡成   的龟速。

Bellman-Ford 算法是单源最短路径算法，求一个起点   到其他所有点的最短路径。一个有   个点的图，给每个点   次机会查询邻居，是否有到起点   的更短的路径，如果有就更新；经过   轮查询和更新，就得到了所有点到起点   的最短路径。

有个现实的模型，即”问路”。每个十字路口站着一个警察；在某个路口，路人问一个警察：”怎么到   最近？”如果这个警察不知道，他就会问相邻几个路口的警察。这些警察可能也不知道，他们会继续问新的邻居。这样传递下去，最后肯定有个警察是   路口的警察，他会把   的信息返回给他的邻居，邻居再返回给邻居。最后所有的警察都知道怎么走到  ，而且是最短的路。从   返回信息到所有其他点的过程，就像在一个平静的池塘中，从   丢下一个石头，荡起的涟漪一圈圈向外扩散，这一圈圈涟漪经过的路径，肯定是最短的。

在这个模型中，能体现 Bellman-Ford 算法思想的是：警察不需要知道到   的完整路径，只需要知道从自己的路口出发，往哪个方向走能走到   并且路最近。

但是，纯粹的 Bellman-Ford 太慢了，因为每次连那些根本没被更新过的点也要跟着广播，于是，有了 SPFA，这可以说是用队列优化的 Bellman-Ford。这个改进方法在于，每轮计算只需要更新上一轮有变化的那些点的邻居，而那些没有变化的点不需要更新他们的邻居，而这种改进恰好用队列处理非常合适。SPFA 在一般情况下和 Dijkstra 算法一样快，甚至还要更好，但是在最差的情况下复杂度仍然为  。

## 必备概念

先记下四个核心结构：

- `dist[N]`：存储源点   到每个点的最短距离，初始化为 `inf`。
- `vis[N]`：表示这个点是否已经在队列里排队，若已入队，则没必要重复入队。
- `cnt[N]`：记录每个点被拉入队列的次数。如果某个点入队超过   次，说明图里有负权环。
- `queue<int> q`：用来存放那些刚刚被更新了距离，需要去通知邻居的点。

下面让我们代入一个场景： 假设你在玩一个游戏，从起点 A 走到各个房间。A-B 花费 2，A-C 花费 5。但有一个特殊的传送门 B-C，由于是倒贴奖励，花费为 -4。

**沙盘推演：**

- **第一步：发车** 起点 A 的距离 `dist[A] = 0`。A 被扔进队列 `q` 里。
- **第二步：A 广播** 队列弹出 A。A 说：”我到起点是 0，邻居们，你们加上我的距离看看有没有变短？” B 发现 `0 + 2 < inf`，于是 `dist[B] = 2`。B 被扔进队列。 C 发现 `0 + 5 < inf`，于是 `dist[C] = 5`。C 被扔进队列。 此时队列：`[B, C]`。
- **第三步：B 广播（触发负权推翻）** 队列弹出 B。B 说：”我现在到起点是 2，邻居们快看看！” B 通向 C 的路是 -4。C 一听，计算了一下：`dist[B] + (-4) = 2 - 4 = -2`。 原来 `dist[C]` 是 5，现在变成了 -2！ **C 惨遭推翻，距离被更新。** 因为 C 的底牌变了，它必须重新去通知它的邻居，而此时 C 恰好还在队列里等候，所以不需要重复入队。
- **第四步：C 广播** 队列弹出 C。C 发现自己没有别的邻居了。 队列为空，算法结束。 最终距离：`dist[B] = 2`, `dist[C] = -2`。


<iframe title="SPFA 与 Bellman-Ford 最短路交互模拟" height="780" loading="lazy" src="/algo-vis/spfa.html" style="border:0;border-radius:12px;margin:20px 0;" width="100%"></iframe>

[在独立页面打开SPFA 与 Bellman-Ford 最短路模拟器](/algo-vis/spfa.html)


## 代码解析

1. 初始化

   `dist` 设置为 `inf`，把起点放进队列，并标记为正在排队。

   
```cpp
vector<int> dist(n+1,inf);
vector<bool> vis(n+1,false);
queue<int> q;

dist[s] = 0;
q.push(s);
vis[s] = true;
```

2. 核心循环

   每次从队头拿出一个点 `u`，并且把 `vis[u]` 改回 `false`，表示出队。

   
```cpp
while(!q.empty()){
    int u = q.front();
    q.pop();
    vis[u] = false;
}
```


   对于 `u` 的每一个邻居节点，更新距离。

   
```cpp
while(!q.empty()){
    int u = q.front();
    q.pop();
    vis[u] = false;

    for(auto& ei : e[u]){
        int v = ei.v,w = ei.w;
        if(dist[v] > dist[u]+w){
            dist[v] = dist[u] + w;

        }
    }
}
```


   同时，距离变短后，如果 `v` 不在队列里，赶紧把它拉进去排队通知别人

   
```cpp
while(!q.empty()){
    int u = q.front();
    q.pop();
    vis[u] = false;

    for(auto& ei : e[u]){
        int v = ei.v,w = ei.w;
        if(dist[v] > dist[u]+w){
            dist[v] = dist[u] + w;

            if(!vis[v]){
                q.push(v);
                vis[v] = true;
            }
        }
    }
}
```


   除此之外，还要再加一条防死循环的逻辑。和溢位。比方说图中有一个环，跑一圈的总权重是负数，那 SPFA 就会永远在里面绕圈，距离会趋近于负无穷。为此，我们可以维护一个 `cnt` 数组，一个点只要入队次数  ，直接判定存在负环。

   
```cpp
vector<int> cnt(n+1,0);

while(!q.empty()){
    int u = q.front();
    q.pop();
    vis[u] = false;

    for(auto& ei : e[u]){
        int v = ei.v,w = ei.w;
        if(dist[v] > dist[u]+w){
            dist[v] = dist[u] + w;

            if(!vis[v]){
                q.push(v);
                vis[v] = true;

                cnt[v]++;
                if(cnt[v] >= n){
                    return false;
                }
            }
        }
    }
}
return true;
```


**综合代码**


```cpp
const int N = 5005;
const int INF = 0x3f3f3f3f;

struct node{
    int v,w;
};

vector<node> e[N];

bool spfa(int n,int s,vector<int>& dist){
    dist.assign(n+1,INF);
    vector<bool> vis(n+1,false);
    vector<int> cnt(n+1,0);
    queue<int> q;

    dist[s] = 0;
    q.push(s);
    vis[s] = true;

    while(!q.empty()){
        int u = q.front();
        q.pop();
        vis[u] = false;

        for(auto& ei : e[u]){
            int v = ei.v,w = ei.w;
            if(dist[v] > dist[u]+w){
                dist[v] = dist[u]+w;

                if(!vis[v]){
                    q.push(v);
                    vis[v] = true;
                    cnt[v]++;

                    if(cnt[v] >= n){
                        return false;
                    }
                }
            }
        }
    }
    return true;
}
```


## 例题

### 1. P3371 【模板】单源最短路径（弱化版）

#### Ques

[门钥匙](https://www.luogu.com.cn/problem/P3371)

**题目描述**

如题，给出一个有向图，请输出从某一点出发到所有点的最短路径长度。

**输入格式**

第一行为三个正整数  ，分别表示点的个数、有向边的个数、出发点的编号。
第二行起   行，每行三个非负整数  ，表示从   到   有一条权值为   的有向边。

**输出格式**

输出一行   个整数，第   个表示   到第   个点的最短路径，若不能到达则输出  。

**输入 #1**


```plaintext
4 6 1
1 2 2
2 3 2
2 4 1
1 3 5
3 4 3
1 4 4
```


**输出 #1**


```plaintext
0 2 4 3
```


**说明/提示**

【数据范围】
对于   的数据： ， ；
对于   的数据： ， ；
对于   的数据： ， ；
对于   的数据： ， ， ， ， ，保证数据随机。

**Update 2022/07/29：两个点之间可能有多条边，敬请注意。**

对于真正   的数据，请移步 [P4779](https://www.luogu.com.cn/problem/P4779)。请注意，该题与本题数据范围略有不同。

### Ans


```cpp
struct node{
    int v,w;
};
vector<node> e[N];

bool spfa(int s,int n,vector<ll>& dist){
    dist.assign(n+1,INF);
    vector<bool> vis(n+1,false);
    vector<int> cnt(n+1,0);
    queue<int> q;

    dist[s] = 0;
    vis[s] = true;
    q.push(s);

    while(!q.empty()){
        int u = q.front();
        q.pop();
        vis[u] = false;

        for(auto& ei : e[u]){
            int v = ei.v;
            int w = ei.w;
            if(dist[v] > dist[u]+w){
                dist[v] = dist[u]+w;

                if(!vis[v]){
                    q.push(v);
                    vis[v] = true;
                    cnt[v]++;

                    if(cnt[v] >= n){
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

void solve(){
    int n,m,s; cin >> n >> m >> s;
    for(int i = 0;i < m;++i){
        int u,v,w; cin >> u >> v >> w;
        e[u].push_back({v,w});
    }
    vector<ll> dist;
    bool ok = spfa(s,n,dist);
    if(ok){
        for(int i = 1;i < dist.size();++i){
            cout << dist[i] << (i == dist.size()-1 ? "" : " ");
        }
    }
    return;
}
```


**相关文章**

[[5-2-3-Dijkstra]] [[5-2-6-Floyd]] [[5-3-2-MST]]
