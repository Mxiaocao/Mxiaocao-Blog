---
title: "5.2.3 Dijkstra 最短路"
published: 2026-05-14
updated: 2026-05-14
description: "5.2.3 Dijkstra 最短路适用条件：单源、边权非负。 负边权 -> Bellman-Ford 1. 邻接矩阵：O(V^2) dijkstra算法是每次都是找距离源点最近的点，所以我们可以维护一个dist数组，来存储v到每个点的最短距离 (1) 初始化首先创建数组dist，存源点v到每个点的最短距离，然后我们自然是要进行初始化的 12345int dist[MAXV]; //存源点"
tags: ["Dijkstra", "最短路"]
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/14/5-2-3-Dijkstra/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "图论"
topic: "算法竞赛"
---

# 5.2.3 Dijkstra 最短路

适用条件：单源、边权非负。 负边权 -> Bellman-Ford

## 1. 邻接矩阵：O(V^2)

![6](/img/6.png)

dijkstra算法是每次都是找距离源点最近的点，所以我们可以维护一个dist数组，来存储v到每个点的最短距离

### (1) 初始化

首先创建数组dist，存源点v到每个点的最短距离，然后我们自然是要进行初始化的

![7](/img/7.png)


```cpp
int dist[MAXV]; //存源点v到每个点的最短距离
for(int i = 0;i < n;++i){
    dist[i] = g[v][i]; //对于下标i的点，dist就是g[v][i]的值
}
dist[v] = 0; //源点自己到自己的距离为0
```


而后续就是每次寻找距离源点v距离最短的点，所以我们是要枚举dist数组看看哪个最小的。但是，如果我们已经确定了一个点，后续还要再考虑进去吗？自然是不用的，所以我们可以创建一个bool类型的ok数组，已确定标1，未确定标0。比如此时只有源点0确定了，那就给ok数组下标为0的位置标记为1，其余的点为0。


```cpp
int dist[MAXV];
bool ok[MAXV]; //标记每个点是否已确定最短距离
for(int i = 0;i < n;++i){
    dist[i] = g[v][i];
    ok[i] = 0; //其他点
}
dist[v] = 0;
ok[v] = 1; //源点
```


### (2) 核心代码

一开始只有源点v是确定的，所以如果有n个点的话，我们还需要确认其余n-1个点，也就是再找n-1次，所以我们可以利用for循环去实现，让i从1循环到n-1。然后对于每次循环，就是去枚举dist数组，看看还没有确认的点里面哪个最小，最小的就是距离源点v最近的点。


```cpp
for(int i = 1;i < n;++i){ //再找n-1个点
    //每次都找距离源点v最近的点
}
```


这个其实就是找最小值的逻辑，我们可以一开始设置两个变量，mindist用来存最小值，初始化为INF，k用来存最小值对应的下标，也就是距离源点最近的点，最开始可以先初始化为-1。


```cpp
for(int i = 1;i < n;++i){
    int mindist = INF; //存最小值
    int k = -1;  //最小值对应的点
}
```


接下来就是从头到尾去枚举dist数组，看看未确定的点里面哪个最小，同样可以用一个for循环实现，而此时我们要让下标j从0循环到n-1。而循环里面，我们需要过滤掉已经确定的值，也就是判断当前节点的值是不是0。而判断完未确定之后，才需要进一步去判断最小，即拿当前节点最小值和mindist比较，若更小，则更新最小值，同时记录新最小值的下标。


```cpp
for(int i = 1;i < n;++i){
    int mindist = INF;
    int k = -1;
    for(int j = 0;j < n;++j){
        if(ok[j] == 0 && dist[j] < mindist){
            mindist = dist[j]; //更新最小值
            k = j; //记录最小值的下标
        }
    }
}
```


可以模拟一下

![8](/img/8.png)

因为已经找到最近的点了，所以我们要这个点标记成已确定。同时，我们还要再看源点通过这个新确定的点到其他点的距离是否变短了。这张图，我们需要看源点0通过2，到1/3/4的距离是否变短了，如果更短了，那就需要更新dist数组的值。比方说原本dist[1]为5，但现在`dist[2]+g[2][1]`仅为4了，所以此时需要更新这个dist值了，因为我们要dist记录目前已知的最短距离。

当然我们需要确保当前所枚举的点还没有确定最短距离，还要确保k到枚举的点j是有边的，最后再看从源点通过k到j的距离是否比之前所记录的dist[j]更短。


```cpp
for(int i = 1;i < n;++i){ 
    int mindist = INF;
    int k = -1;
    for(int j = 0;j < n;++j){
        if(ok[j] == 0 && dist[j] < mindist){
            mindist = dist[j];
            k = j;
        }
    }
    ok[k] = 1; //标记新找到的确定点为1
    //看看源点通过k到其余点的距离会不会更短
    for(int j = 0;j < n;++j){
        if(ok[j] == 0 && g[k][j] < INF && dist[k]+g[k][j] < dist[j]){
         // 是否确定      k -> j 是否有边         距离是否更短
            dist[j] = dist[k]+g[k][j];
        }
    }
}
```


可以继续模拟一下

![9](/img/9.png)

最后我们简单复盘下核心逻辑：

最开始只有源点的，最短距离是确定的，所以总共n个点，我们还需要循环n-1次，去确定其余n-1个点。

然后对于每次循环，主要有三个步骤：首先通过枚举dist数组，去找距离源点最近的点，找到之后，把它的ok值标记成1，代表它的最短距离已确定，最后，看一下源点通过这个新确定的点，到其余点的距离会不会变短，如果更短了，就需要去更新dist数组对应的值

然后这是最终的结果，有兴趣可以自己推一下

![10](/img/10.png)


<iframe frameborder="0" height="550" loading="lazy" src="/algo-vis/dijkstra.html" style="border-radius:12px;margin:20px 0;" width="100%"></iframe>


### (3) 最终代码


```cpp
#define MAXV 100
#define INF 2147483647

void dijkstra(int g[MAXV][MAXV],int n,int v){ // n:顶点数 v:源点  无需获取图的边数，有些教材会把邻接矩阵和顶点数组合成一个结构体，整体传入函数  
    int dist[MAXV];
    bool ok[MAXV];
    for(int i = 0;i < n;++i){
        dist[i] = g[v][i];
        ok[i] = 0;
    }
    ok[v] = 1;
    dist[v] = 0;
    for(int i = 1;i < n;++i){ 
        int mindist = INF;
        int k = -1;
        for(int j = 0;j < n;++j){
            if(ok[j] == 0 && dist[j] < mindist){
                mindist = dist[j];
                k = j;
            }
        }
        ok[k] = 1;
        if(i < n-1) //最后一轮可以不做更新 （其实也可以不用写，让他空转一轮也没关系）
        for(int j = 0;j < n;++j){
            if(ok[j] == 0 && g[k][j] < INF && dist[k]+g[k][j] < dist[j]){
                dist[j] = dist[k]+g[k][j];
            }
        }
    }
    for(int i = 0;i < n;++i){ //输出
        cout << "源点" << v << "到顶点" << i << "的最短距离为：" << dist[i] << '\n';
    }
}
```


### (4) 代码分析与拓展

时间复杂度： 

#### 源点无法到达某些点

![11](/img/11.png)

在循环后面写上`if(mindist == INF) break;` 或者 `if(k == -1) break;`

打印：`if(ok[i] == 0) cout << "源点" << v << "到顶点" << i << "不可达\n";`

#### 输出路径

创建pre数组记录前驱

声明过程：`int pre[MAXV];`

初始化：`if(g[v][i] < INF) pre[i] = v;`

​ `else pre[i] = -1;`

记录前驱：在修改了dist数组之后，跟上`pre[j] = k;`

打印：`printpath(pre,i);`


```cpp
void printpath(int pre[],int a){
	int tmp[MAXV],d = 0;
    while(a != -1){
        tmp[d++] = a;
        a = pre[a];
    }
    for(int i = d-1;i >= 0;--i){
        cout << tmp[i] << ' ';
    }
    cout << '\n';
}
```


#### 建反图策略

下面例题会有

#### 虚拟源点技巧

下面例题会有

## 2. 邻接表


```cpp
struct edge{
    int v,w;   // v目标顶点，w边权
};

vector<edge> e[N];
int dist[N];   // dist为s点到u点的估计最短路长度
bool vis[N];

void dijkstra(int n,int s){    // n为图上点的数目，s为最短路的源点
    memset(dist,0x3f,sizeof dist);
    dist[s] = 0;
    for(int i = 1;i <= n;++i){
        int u = 0,mind = inf;
        for(int j = 1;j <= n;++j){
            if(!vis[j] && dist[j] < mind){
                u = j;
                mind = dist[j];
            }
        }
        vis[u] = true;
        for(auto ei : e[u]){
            int v = ei.v,w = ei.w;
            if(dist[v] > dist[u] + w){
                dist[v] = dist[u] + w;
            }
        }
    }
}
```


## 3. 二叉堆优化


```cpp
int n,m,s;
vector<int> path;

vector<int> dijkstra(int n,int s,vector<vector<pii> >& graph){
    vector<int> dist(n+1,inf);
    priority_queue<pii,vector<pii>,greater<pii> > pq;   
    dist[s] = 0;                                        // pair<int,int> first存距离,second存顶点
    pq.push({0,s});
    while(!pq.empty()){
        auto [d,u] = pq.top();  //c++17 特性
        // int d = pq.top().first;
        // int u = pq.top().second;
        pq.pop();
        if(d > dist[u]) continue;

        for(auto& [v,w] : graph[u]){
            // int v = edge.first,w = edge.second;
            if(dist[v] > dist[u] + w){
                dist[v] = dist[u] + w;
                pq.push({dist[v],v});
                path[v] = u; //记录路径
            }
        }
    }
    return dist;
}
```


## 4. 例题

### 例1：驿站

[门钥匙](https://acm.hdu.edu.cn/contest/problem?cid=1201&pid=1002)

**题意**

2026 丙午马年，某快递公司运营着一张覆盖全国的物流网络，快递员马不停蹄地在各驿站之间接力配送。

该网络共设有   座驿站，编号为   驿站之间由 条单向运输线路相连。每座驿站的编号代表其安全等级——编号越大，途经该驿站包裹丢失的风险越高。

一条从驿站  （总部）到驿站   的运输路线  （其中  ）的风险值定义为途经所有驿站编号的最大值，即：

 

调度员需要为每座驿站规划最安全的配送路线。对于每个驿站  ，求从总部出发到达驿站 i*i* 的所有路线中风险值的最小值。若驿站 无法从总部到达，输出  。

**输入**

本题有多组测试数据。输入  ，表示数据组数。

对于每组数据（相邻两组数据间用一空行隔开）：

第一行输入两个正整数  。

接下来   行，每行输入两个正整数  ，表示一条从驿站   到驿站   的单向驿道。图中可能存在重边和自环。

保证所有数据的   的和不超过  ，  的和不超过  。

**输出**

对于每组数据：

输出一行   个整数，第   个整数表示从总部到驿站   的最小风险值。若不可达，输出  。

**代码**


```cpp
using ll = long long;
using pii = pair<int,int>;
const int inf = 0x3f3f3f3f;

vector<int> path;

vector<int> dijkstra(int n,int s,vector<vector<pii>>& graph){
    vector<int> dist(n + 1, inf);
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    dist[s] = s;
    pq.push({dist[s],s});

    while(!pq.empty()){
        auto [d,u] = pq.top();
        pq.pop();
        if(d > dist[u]) continue;

        for(auto& [v, w] : graph[u]){
            int nd = max(dist[u],v);
            if(dist[v] > nd){
                dist[v] = nd;
                pq.push({dist[v], v});
                path[v] = u;
            }
        }
    }
    return dist;
}

void solve(){
    int n, m;
    cin >> n >> m;
    vector<vector<pii>> graph(n+1);
    for(int i = 0;i < m;++i){
        int u, v;
        cin >> u >> v;
        graph[u].push_back({v,0});
    }

    path.assign(n+1,-1);
    vector<int> dist = dijkstra(n,1,graph);

    for(int i = 1;i <= n;++i){
        cout << (dist[i] == inf ? -1 : dist[i]) << (i == n ? '\n' : ' ');
    }
    return;
}
```


### 例2：Dijkstra?

#### Ques

[门钥匙](https://codeforces.com/problemset/problem/20/C)

**题意**

You are given a weighted undirected graph. The vertices are enumerated from 1 to *n*. Your task is to find the shortest path between the vertex 1 and the vertex *n*.

**Input**

The first line contains two integers , where *n* is the number of vertices and *m* is the number of edges. Following *m* lines contain one edge each in form  , where   are edge endpoints and   is the length of the edge.

It is possible that the graph has loops and multiple edges between pair of vertices.

**Output**

Write the only integer -1 in case of no path. Write the shortest path in opposite case. If there are many solutions, print any of them.

**Examples**


```plaintext
5 6
1 2 2
2 5 5
2 3 4
1 4 1
4 3 3
3 5 1
```


```plaintext
1 4 3 5 
```


#### Ans


```cpp
const int INF = 1e9;
using pii = pair<int,int>;

void dijkstra(int s,int n,const vector<vector<pii>>& g,vector<int>& dist,vector<int>& pre){
    dist.assign(n+1,INF);
    pre.assign(n+1,-1);
    priority_queue<pii,vector<pii>,greater<pii>> pq;

    dist[s] = 0;
    pq.push({0,s});

    while(!pq.empty()){
        auto [d,u] = pq.top();
        pq.pop();

        if(d > dist[u]) continue;

        for(auto& gi : g[u]){
            int v = gi.first;
            int w = gi.second;

            if(dist[v] > dist[u]+w){
                dist[v] = dist[u]+w;
                pq.push({dist[v],v});
                pre[v] = u;
            }
        }
    }
}

void solve(){
    int n,m; cin >> n >> m;
    vector<vector<pii>> g(n+1);
    for(int i = 0;i < m;++i){
        int u,v,w; cin >> u >> v >> w;
        g[u].push_back({v,w});
        g[v].push_back({u,w});
    }

    vector<int> dist,pre;
    dijkstra(1,n,g,dist,pre);
    
    if(dist[n] == INF){
        cout << -1 << '\n';
        return;
    }

    vector<int> path;
    int curr = n;
    while(curr != -1){
        path.push_back(curr);
        curr = pre[curr];
    }

    reverse(path.begin(),path.end());

    for(int i = 0;i < path.size();++i){
        cout << path[i] << (i == path.size()-1 ? "" : " ");
    }
    return;
}
```


但是，WA31，为什么呢？

  个点，单条边权最大  。 在极端情况下（比如所有点排成一条直线，你要从头走到尾），最短路径的总长度是  


```cpp
using ll = long long;
const ll INF = 1e18;
using pii = pair<int,int>;
using pli = pair<ll,int>;

void dijkstra(int s,int n,vector<vector<pii>>& g,vector<ll>& dist,vector<int>& pre){
    dist.assign(n+1,INF);
    pre.assign(n+1,-1);
    priority_queue<pli,vector<pli>,greater<pli>> pq;

    dist[s] = 0;
    pq.push({0,s});

    while(!pq.empty()){
        auto [d,u] = pq.top();
        pq.pop();

        if(d > dist[u]) continue;

        for(auto& gi : g[u]){
            int v = gi.first;
            int w = gi.second;

            if(dist[v] > dist[u]+w){
                dist[v] = dist[u]+w;
                pq.push({dist[v],v});
                pre[v] = u;
            }
        }
    }
}

void solve(){
    int n,m; cin >> n >> m;
    vector<vector<pii>> g(n+1);

    for(int i = 0;i < m;++i){
        int u,v,w; cin >> u >> v >> w;
        g[u].push_back({v,w});
        g[v].push_back({u,w});
    }

    vector<ll> dist;
    vector<int> pre;
    dijkstra(1,n,g,dist,pre);

    if(dist[n] == INF){
        cout << -1 << '\n';
        return;
    }

    vector<int> path;
    int curr = n;
    while(curr != -1){
        path.push_back(curr);
        curr = pre[curr];
    }

    reverse(path.begin(),path.end());
    for(int i = 0;i < path.size();++i){
        cout << path[i] << (i == path.size()-1 ? "" : " ");
    }
    return;
}
```


**相关文章**

[[5-2-4-SPFA-Bellman-Ford]] [[5-2-6-Floyd]] [[5-3-2-MST]] [[5-2-8-Tarjan-Algorithm]] [[5.2.10 Topological-Sort]]
