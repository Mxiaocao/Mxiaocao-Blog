---
title: "LTT L2"
published: 2026-05-14
updated: 2026-05-14
description: "天梯赛 L2 速通25分L2-001 紧急救援 √考点：dijkstra 1. dist[v]：S -> v 最短距离 2. cnt[v]：最短路条数 3. sum[v]：在最短路前提下可召集的最大救援队数 并用 pre[v] 记录最优前驱，最后回溯路径。 时间复杂度 O(N^2 + M)，在 N<=500 下可通过。 1234567891011121314151617181920"
image: "/img/2.jpg"
tags: []
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/14/LTT-L2/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "天梯赛"
topic: "算法竞赛"
---

# 天梯赛 L2 速通

## 25分

### L2-001 紧急救援 √

考点：dijkstra

```
1. dist[v]：S -> v 最短距离
2. cnt[v]：最短路条数
3. sum[v]：在最短路前提下可召集的最大救援队数
```

并用 pre[v] 记录最优前驱，最后回溯路径。

时间复杂度 O(N^2 + M)，在 N<=500 下可通过。


```cpp
using ll = long long;
const int INF = 0x3f3f3f3f;

struct edge{
    int to,w;
};

void solve(){
    int n,m,s,d; cin >> n >> m >> s >> d;
    vector<int> team(n);
    for(int i = 0;i < n;++i) cin >> team[i];

    vector<vector<edge>> g(n);
    for(int i = 0;i < m;++i){
        int u,v,w;
        cin >> u >> v >> w;
        g[u].push_back({v,w});
        g[v].push_back({u,w});
    }

    vector<int> dist(n,INF),sum(n,0),pre(n,-1);
    vector<ll> cnt(n,0);
    vector<bool> vis(n,false);

    dist[s] = 0;
    cnt[s] = 1;
    sum[s] = team[s];

    for(int i = 0;i < n;++i){
        int u = -1,mindist = INF;
        for(int j = 0;j < n;++j){
            if(!vis[j] && dist[j] < mindist){
                mindist = dist[j];
                u = j;
            }
        }
        if(u == -1) break;
        vis[u] = true;

        for(auto &e : g[u]){
            int v = e.to;
            int nd = dist[u] + e.w;
            if(nd < dist[v]){
                dist[v] = nd;
                cnt[v] = cnt[u];
                sum[v] = sum[u] + team[v];
                pre[v] = u;
            }else if(nd == dist[v]){
                cnt[v] += cnt[u];
                if(sum[u] + team[v] > sum[v]){
                    sum[v] = sum[u] + team[v];
                    pre[v] = u;
                }
            }
        }
    }
    cout << cnt[d] << ' ' << sum[d] << '\n';

    vector<int> path;
    for(int cur = d;cur != -1;cur = pre[cur])
        path.push_back(cur);
    reverse(path.begin(),path.end());

    for(int i = 0;i < (int)path.size();++i){
        if(i) cout << ' ';
        cout << path[i];
    }
    cout << '\n';
    return;
}
```


### L2-002 链表去重 √

考点：链表

**字符串**

1. fmtAddr

   - 作用：把地址按题目要求输出成 5 位，不够前面补 0。
   - 例如：100 输出成 00100，0 输出成 00000，-1 直接输出 -1。

     1. ostringstream oss;
   - 可以理解成“字符串输出器”，像 cout 一样往里写，但最后得到的是字符串。

     1. setw(5)
   - 表示“这个输出字段宽度至少 5”。

     1. setfill(‘0’)
   - 表示“不够宽度时用字符 0 来补”。

     1. oss << setw(5) << setfill(‘0’) << x;
   - 把整数 x 按“5 位、补 0”的格式写入 oss。

     1. oss.str()
   - 把 oss 里当前内容取出来，得到一个 string 返回。

   所以 fmtAddr 这段本质就是：
   int -> 按 5 位补 0 -> string

**lambda表达式**

lambda 表达式本质上是“现场定义的匿名函数”。
 语法核心：

`[capture](params) -> return_type { body }`

- capture：捕获外部变量（最关键）
- params：参数列表
- return\_type：可省略（编译器推导）
- body：函数体


```cpp
struct node{
    int key,next;
};

string fmtAddr(int x){
    if(x == -1) return "-1";
    ostringstream oss;
    oss << setw(5) << setfill('0') << x;
    return oss.str();
}

void solve(){
    int head,n; cin >> head >> n;
    vector<node> nodes(100000);
    vector<bool> exist(100000,false);

    for(int i = 0;i < n;++i){
        int addr,key,next; cin >> addr >> key >> next;
        nodes[addr] = {key,next};
        exist[addr] = true;
    }

    vector<int> keep,removed;
    vector<bool> seen(10001,false);

    for(int p = head;p != -1;p = nodes[p].next){
        int a = abs(nodes[p].key);
        if(!seen[a]){
            seen[a] = true;
            keep.push_back(p);
        }else{
            removed.push_back(p);
        }
    }

    auto printList = [&](const vector<int>& v){
        for(int i = 0;i < (int)v.size();++i){
            int addr = v[i];
            int next = (i+1 < (int)v.size()) ? v[i+1] : -1;
            cout << fmtAddr(addr) << ' ' << nodes[addr].key << ' '<< fmtAddr(next) << '\n';
        }
    };

    printList(keep);
    printList(removed);
    return;
}
```


### L2-003 月饼

考点：部分背包/贪心


```cpp

```


### L2-004 这是二叉搜索树吗？√

考点：前序遍历验证二叉搜索树

思路：

```
1. 前序第一个是根 root。
2. 对普通 BST：接下来一段 < root 是左子树，后面一段 >= root 是右子树。
3. 对镜像 BST：接下来一段 >= root 是“左子树”（镜像后），后面一段 < root 是“右子树”。
4. 每层都检查是否满足上述连续分段；不满足就失败。
5. 递归处理左右子树，回溯时把 root 加入结果，即得到后序。
6. 先尝试普通 BST，失败再尝试镜像 BST。
```

通用流程（程序每次都这么做）：

```
1. 读入 pre[0..N-1]。
2. 先按“普通 BST”规则递归检查。
3. 如果失败，清空 post，再按“镜像 BST”规则递归检查。
4. 只要有一种成功，输出 YES 和 post；两种都失败就 NO。
```

递归函数 dfs(l, r, mirror) 的固定流程：

```
1. 如果 l > r：空树，返回真。
2. root = pre[l]（前序第一个一定是根）。
3. 找分界点：
   1. 普通 BST：先连续吃掉 < root（左子树），再连续吃掉 >= root（右子树）。
   2. 镜像 BST：先连续吃掉 >= root（左子树），再连续吃掉 < root（右子树）。
4. 如果没刚好吃到 r+1，说明中间有“非法值”，返回假。
5. 递归验证左区间和右区间。
6. 左右都成功后，把 root 压入 post（这一步就是后序“根最后输出”）。
```

———

二、样例1详细全过程

输入：8 6 5 7 10 8 11

先尝试普通 BST（< root 在左，>= root 在右）。

第1层：dfs(0,6)

```
1. 根 root=8。
2. 扫描 pre[1..6]：
   1. <8 段：6,5,7，到下标 4 停。
   2. <=8 段：10,8,11，到结尾。
3. 分段合法。
4. 递归左：dfs(1,3)，递归右：dfs(4,6)。
5. 等左右完了再放 8。
```

第2层左子树：dfs(1,3)，子序列 6 5 7

```
1. 根 root=6。
2. 扫描 pre[2..3]：
   1. <6 段：5。
   2. <=6 段：7。
3. 合法。
4. 递归 dfs(2,2) 和 dfs(3,3)。
5. 等左右完了放 6。
```

第3层：dfs(2,2)，子序列 5

```
1. 根 5。
2. 后面没有元素，左右都是空。
3. 放入 post：[5]。
```

第3层：dfs(3,3)，子序列 7

```
1. 根 7。
2. 左右空。
3. 放入 post：[5,7]。
```

回到 dfs(1,3)：

```
1. 左右都完成。
2. 放 6。
3. post=[5,7,6]。
```

第2层右子树：dfs(4,6)，子序列 10 8 11

```
1. 根 root=10。
2. 扫描 pre[5..6]：
   1. <10 段：8。
   2. <=10 段：11。
3. 合法。
4. 递归 dfs(5,5) 和 dfs(6,6)。
5. 等左右完了放 10。
```

第3层：dfs(5,5)，子序列 8

```
1. 根 8，左右空。
2. 放入：post=[5,7,6,8]。
```

第3层：dfs(6,6)，子序列 11

```
1. 根 11，左右空。
2. 放入：post=[5,7,6,8,11]。
```

回到 dfs(4,6)：

```
1. 放 10。
2. post=[5,7,6,8,11,10]。
```

回到最外层 dfs(0,6)：

```
1. 左右都完成。
2. 放 8。
3. post=[5,7,6,8,11,10,8]。
```

最终输出：

```
1. YES
2. 5 7 6 8 11 10 8
```

———


```cpp
vector<int> pre,post;

bool dfs(int l,int r,bool mirror){
    if(l > r) return true;
    int root = pre[l];
    int i = l+1,j = r+1;
    if(!mirror){
        while(i <= r && pre[i] < root) ++i;
        j = i;
        while(j <= r && pre[j] >= root) ++j;
    }else{
        while(i <= r && pre[i] >= root) ++i;
        j = i;
        while(j <= r && pre[j] < root) ++j;
    }
    if( j != r+1) return false;

    bool left = dfs(l+1,i-1,mirror);
    bool right = dfs(i,r,mirror);
    if(!left || !right) return false;

    post.push_back(root);
    return true;
}

void solve(){
    int n; cin >> n;
    pre.resize(n);
    for(int i = 0;i < n;++i) cin >> pre[i];

    post.clear();
    if(dfs(0,n-1,false)){
        cout << "YES\n";
        for(int i = 0;i < (int)post.size();++i){
            if(i) cout << ' ';
            cout << post[i];
        }
        cout << '\n';
    }else{
        post.clear();
        if(dfs(0,n-1,true)){
            cout << "YES\n";
        for(int i = 0;i < (int)post.size();++i){
            if(i) cout << ' ';
            cout << post[i];
        }
        cout << '\n';
        }else{
            cout << "NO\n";
        }
    }
    return;
}
```


### L2-005 集合相似度

考点：集合运算


```cpp

```


### L2-006 树的遍历 √

考点：二叉树重建+层序遍历

输入初始化

```
1. N = 7
2. post = [2, 3, 1, 5, 7, 6, 4]
3. inor = [1, 2, 3, 4, 5, 6, 7]
4. pos 映射：
   1->0, 2->1, 3->2, 4->3, 5->4, 6->5, 7->6
```

build 递归全过程（变量逐次变化）

```
1. build(0,6,0,6)
   rootVal=post[6]=4, k=3, leftSize=3, rightSize=3
   左区间：in[0,2], post[0,2]
   右区间：in[4,6], post[3,5]
2. build(0,2,0,2)
   rootVal=post[2]=1, k=0, leftSize=0, rightSize=2
   左区间：in[0,-1], post[0,-1]（空）
   右区间：in[1,2], post[0,1]
3. build(0,-1,0,-1)
   inL > inR，返回 nullptr
4. build(1,2,0,1)
   rootVal=post[1]=3, k=2, leftSize=1, rightSize=0
   左区间：in[1,1], post[0,0]
   右区间：in[3,2], post[1,0]（空）
5. build(1,1,0,0)
   rootVal=post[0]=2, k=1, leftSize=0, rightSize=0
   左区间：in[1,0], post[0,-1]（空）
   右区间：in[2,1], post[0,-1]（空）
   返回节点 2(左空,右空)
6. build(3,2,1,0)
   inL > inR，返回 nullptr
   返回节点 3(左=2,右空)
   返回节点 1(左空,右=3)
7. build(4,6,3,5)
   rootVal=post[5]=6, k=5, leftSize=1, rightSize=1
   左区间：in[4,4], post[3,3]
   rootVal=post[3]=5, k=4, leftSize=0, rightSize=0
   左右都空，返回节点 5
8. build(6,6,4,4)
   rootVal=post[4]=7, k=6, leftSize=0, rightSize=0
   左右都空，返回节点 7
9. 返回节点 6(左=5,右=7)
10. 返回根节点 4(左=1,右=6)
```

BFS（层序）变量变化

```
1. 初始：q=[4], ans=[]
2. 弹出 4：ans=[4]，入队 1,6，q=[1,6]
3. 弹出 1：ans=[4,1]，入队 3，q=[6,3]
4. 弹出 6：ans=[4,1,6]，入队 5,7，q=[3,5,7]
5. 弹出 3：ans=[4,1,6,3]，入队 2，q=[5,7,2]
6. 弹出 5：ans=[4,1,6,3,5]，q=[7,2]
7. 弹出 7：ans=[4,1,6,3,5,7]，q=[2]
8. 弹出 2：ans=[4,1,6,3,5,7,2]，q=[]
```

最终输出
 4 1 6 3 5 7 2


```cpp
vector<int> post,inor;
unordered_map<int,int> pos;

struct node{
    int val;
    node *l,*r;
    node(int v): val(v),l(0),r(0){}
};

node* build(int inl,int inr,int postl,int postr){
    if(inl > inr) return 0;
    int rootval = post[postr];
    node* root = new node(rootval);

    int k = pos[rootval];
    int leftsize = k-inl;

    root -> l = build(inl,k-1,postl,postl+leftsize-1);
    root -> r = build(k+1,inr,postl+leftsize,postr-1);
    return root;
}

void solve(){
    int n; cin >> n;
    post.resize(n);
    inor.resize(n);
    for(int i = 0;i < n;++i) cin >> post[i];
    for(int i = 0;i < n;++i){
        cin >> inor[i];
        pos[inor[i]] = i;
    }
    node* root = build(0,n-1,0,n-1);
    vector<int> res;
    queue<node*> q;
    if(root) q.push(root);
    while(!q.empty()){
        node* cur = q.front(); q.pop();
        res.push_back(cur -> val);
        if(cur -> l) q.push(cur -> l);
        if(cur -> r) q.push(cur -> r);
    }
    for(int i = 0;i < (int)res.size();++i){
        if(i) cout <<  ' ';
        cout << res[i];
    }
    cout << '\n';
    return;
}
```


### L2-007 家庭房产 √

考点：并查集


```cpp
using ll = long long;
const int MAXID = 10000;

struct DSU{
    vector<int> par,siz;
    DSU(int n = 0){ init(n);}

    void init(int n){
        par.resize(n);
        siz.resize(n,1);
        iota(par.begin(),par.end(),0);
    }

    int find(int x){
        if(par[x] == x) return x;
        return par[x] = find(par[x]);
    }

    void unite(int a,int b){
        a = find(a),b = find(b);
        if(a == b) return;
        if(siz[a] < siz[b]) swap(a,b);
        par[b] = a;
        siz[a] += siz[b];
    }
};

struct node{
    int minId;
    int cnt;
    double avgSet;
    double avgArea;
};

void solve(){
    int n; cin >> n;
    DSU dsu(MAXID);

    vector<bool> exist(MAXID,false);
    vector<double> houseSet(MAXID,0.0),houseArea(MAXID,0.0);

    for(int i = 0;i < n;++i){
        int id,d,m,k; cin >> id >> d >> m >> k;
        exist[id] = true;
        if(d != -1){
            exist[d] = true;
            dsu.unite(id,d);
        }
        if(m != -1){
            exist[m] = true;
            dsu.unite(id,m);
        }
        for(int j = 0;j < k;++j){
            int x; cin >> x;
            exist[x] = true;
            dsu.unite(id,x);
        }
        double set,area; cin >> set >> area;
        houseSet[id] += set;
        houseArea[id] += area;
    }

    vector<int> cnt(MAXID,0),minId(MAXID,INT_MAX);
    vector<double> sumSet(MAXID,0.0),sumArea(MAXID,0.0);

    for(int id = 0;id < MAXID;++id){
        if(!exist[id]) continue;
        int r = dsu.find(id);
        cnt[r]++;
        sumSet[r] += houseSet[id];
        sumArea[r] += houseArea[id];
        minId[r] = min(minId[r],id);
    }

    vector<node> res;
    for(int i = 0;i < MAXID;++i){
        if(cnt[i] == 0) continue;
        res.push_back({minId[i],cnt[i],sumSet[i]/cnt[i],sumArea[i]/cnt[i]});
    }
    sort(res.begin(),res.end(),[](const node& a,const node& b){
        if(fabs(a.avgArea - b.avgArea) > 1e-12) return a.avgArea > b.avgArea;
        return a.minId < b.minId;
    });

    cout << res.size() << '\n';
    for(auto &ri : res){
        cout << setw(4) << setfill('0') << ri.minId << setfill(' ')
             << ' ' << ri.cnt
             << ' ' << fixed << setprecision(3) << ri.avgSet
             << ' ' << fixed << setprecision(3) << ri.avgArea << '\n';
    }
    return;
}
```


### L2-008 最长对称子串

考点：最长回文子串：动态规划、Manacher


```cpp

```


### L2-009 抢红包

考点：统计排序


```cpp

```


### L2-010 排座位

考点：并查集


```cpp

```


### L2-011 玩转二叉树 √

考点：中序+前序构建二叉树 + 镜面反转 + 层序遍历


```cpp
vector<int> inor,pre;
unordered_map<int,int> pos;

struct node{
    int val;
    node *l,*r;
    node(int v): val(v),l(0),r(0){}
};

node* build(int inl,int inr,int prel,int prer){
    if(inl > inr) return 0;
    int rootval = pre[prel];
    node* root = new node(rootval);

    int k = pos[rootval];
    int leftsize = k-inl;

    root -> l = build(inl,k-1,prel+1,prel+leftsize);
    root -> r = build(k+1,inr,prel+leftsize+1,prer);
    return root;
}

void mirror(node* root){
    if(!root) return;
    swap(root -> l,root -> r);
    mirror(root -> l);
    mirror(root -> r);
}

void solve(){
    int n; cin >> n;
    inor.resize(n);
    pre.resize(n);
    for(int i = 0;i < n;++i){
        cin >> inor[i];
        pos[inor[i]] = i;
    }
    for(int i = 0;i < n;++i) cin >> pre[i];

    node* root = build(0,n-1,0,n-1);
    mirror(root);

    vector<int> res;
    queue<node*> q;
    if(root) q.push(root);

    while(!q.empty()){
        node* cur = q.front(); q.pop();
        res.push_back(cur -> val);
        if(cur -> l) q.push(cur -> l);
        if(cur -> r) q.push(cur -> r);
    }
    for(int i = 0;i < (int)res.size();++i){
        if(i) cout << ' ';
        cout << res[i];
    }
    cout << '\n';
    return;
}
```


### L2-012 关于堆的判断

考点：完全二叉树


```cpp

```


### L2-013 红色警报

考点：图的联通分量 <=> DFS/并查集


```cpp

```


### L2-014 列车调度

考点：最长递增子序列，贪心


```cpp

```


### L2-015 互评成绩

考点：STL


```cpp

```


### L2-016 愿天下有情人都是失散多年的兄妹

考点：树的遍历、最近公共祖先


```cpp

```


### L2-017 人以群分

考点：贪心


```cpp

```


### L2-018 多项式A除以B

考点：多项式除法、模拟


```cpp

```


### L2-019 悄悄关注

考点：集合运算和排序、STL


```cpp

```


### L2-020 功夫传人 √

考点：树的遍历

#### **法一：dfs(邻接表)**

1. 输入后变量状态

   N=10, Z=18.0, r=1.00, q=0.99, ans=0

   g（邻接表）：

- g[0]=[2,3,5]
- g[1]=[9]
- g[2]=[4]
- g[3]=[7]
- g[4]=[]
- g[5]=[6,1]
- g[6]=[8]
- g[7]=[]
- g[8]=[]
- g[9]=[]

  isLeaf：
- 4,7,8,9 为 1
- 其余为 0

  mul：
- mul[4]=7
- mul[7]=9
- mul[8]=4
- mul[9]=3
- 其余 0

  开始：dfs(0, 18.0)

  ———

  1. 每一步 DFS 流程
  2. 进入 dfs(u=0, curPower=18.0)，isLeaf[0]=0
  3. 遍历 g[0]，先到 v=2，下一层功力 17.82
  4. 进入 dfs(2,17.82)，isLeaf[2]=0
  5. 遍历 g[2]，到 v=4，下一层功力 17.6418
  6. 进入 dfs(4,17.6418)，isLeaf[4]=1
  7. 叶子贡献：add=17.6418\*7=123.4926，ans: 0 -> 123.4926
  8. 返回 dfs(2,…)，再返回 dfs(0,…)
  9. 在 dfs(0,…) 继续下一个孩子 v=3，下一层功力 17.82
  10. 进入 dfs(3,17.82)，isLeaf[3]=0
  11. 遍历 g[3] 到 v=7，下一层功力 17.6418
  12. 进入 dfs(7,17.6418)，isLeaf[7]=1
  13. 叶子贡献：add=17.6418\*9=158.7762，ans: 123.4926 -> 282.2688
  14. 返回 dfs(3,…)，再返回 dfs(0,…)
  15. 在 dfs(0,…) 继续孩子 v=5，下一层功力 17.82
  16. 进入 dfs(5,17.82)，isLeaf[5]=0
  17. 遍历 g[5] 第一个孩子 v=6，下一层功力 17.6418
  18. 进入 dfs(6,17.6418)，isLeaf[6]=0
  19. 遍历 g[6] 到 v=8，下一层功力 17.465382
  20. 进入 dfs(8,17.465382)，isLeaf[8]=1
  21. 叶子贡献：add=17.465382\*4=69.861528，ans: 282.2688 -> 352.130328
  22. 返回 dfs(6,…)，再回到 dfs(5,…)
  23. 在 dfs(5,…) 继续第二个孩子 v=1，下一层功力 17.6418
  24. 进入 dfs(1,17.6418)，isLeaf[1]=0
  25. 遍历 g[1] 到 v=9，下一层功力 17.465382
  26. 进入 dfs(9,17.465382)，isLeaf[9]=1
  27. 叶子贡献：add=17.465382\*3=52.396146，ans: 352.130328 -> 404.526474
  28. 返回 dfs(1,…) -> 返回 dfs(5,…) -> 返回 dfs(0,…)
  29. DFS 结束

  ———


```cpp
int n;
long double z,r,q;
vector<vector<int>> g;
vector<int> mul; //倍数
vector<bool> isLeaf; //得道
long double res;

void dfs(int u,long double curPower){
    if(isLeaf[u]){
        res += curPower * mul[u];
        return;
    }
    for(auto gi : g[u]){
        dfs(gi,curPower*q);
    }
}

void solve(){
    cin >> n >> z >> r;
    q = 1.0L - r/100.0L;
    res = 0.0L;
    g.assign(n,{});
    mul.assign(n,0);
    isLeaf.assign(n,0);
    for(int i = 0;i < n;++i){
        int k; cin >> k;
        if(k == 0){
            int m; cin >> m;
            isLeaf[i] = 1;
            mul[i] = m;
        }else{
            g[i].assign(k,0);
            for(int j = 0;j < k;++j) cin >> g[i][j];
        }
    }
    dfs(0,z);
    cout << (long long)res << '\n';
    return;
}
```


#### **法二：dfs(链表)**


```cpp
• #include <bits/stdc++.h>
  using namespace std;

  struct Node {
      int id;
      int mul;                 // 得道倍数；非得道者为0
      bool isLeaf;             // 是否得道者
      vector<Node*> child;     // 徒弟列表
      Node(int _id = 0) : id(_id), mul(0), isLeaf(false) {}
  };

  int N;
  long double Z, r, q;
  long double ans = 0.0L;
  vector<Node*> nodes;         // 先按编号建好所有节点，便于连边

  void dfs(Node* u, long double curPower) {
      if (u->isLeaf) {
          ans += curPower * u->mul;
          return;
      }
      for (Node* v : u->child) {
          dfs(v, curPower * q);
      }
  }

  int main() {
      ios::sync_with_stdio(false);
      cin.tie(nullptr);

      cin >> N >> Z >> r;
      q = 1.0L - r / 100.0L;

      nodes.resize(N);
      for (int i = 0; i < N; ++i) nodes[i] = new Node(i);

      for (int i = 0; i < N; ++i) {
          int k;
          cin >> k;
          if (k == 0) {
              int m;
              cin >> m;
              nodes[i]->isLeaf = true;
              nodes[i]->mul = m;
          } else {
              nodes[i]->child.reserve(k);
              for (int j = 0; j < k; ++j) {
                  int id;
                  cin >> id;
                  nodes[i]->child.push_back(nodes[id]);
              }
          }
      }

      dfs(nodes[0], Z);
      cout << (long long)ans << '\n'; // 只保留整数部分

      // 释放内存（比赛不写也行，这里写完整）
      for (auto p : nodes) delete p;
      return 0;
  }

  这个版本就是你要的“Node* 建树 + DFS”。
       1. 读入后所有关键变量初值

  N = 10
  Z = 18.0
  r = 1.00
  q = 1 - r/100 = 0.99
  ans = 0

  每个节点信息（isLeaf, mul, child）：

  0: isLeaf=false, mul=0, child=[2,3,5]
  1: isLeaf=false, mul=0, child=[9]
  2: isLeaf=false, mul=0, child=[4]
  3: isLeaf=false, mul=0, child=[7]
  4: isLeaf=true,  mul=7, child=[]
  5: isLeaf=false, mul=0, child=[6,1]
  6: isLeaf=false, mul=0, child=[8]
  7: isLeaf=true,  mul=9, child=[]
  8: isLeaf=true,  mul=4, child=[]
  9: isLeaf=true,  mul=3, child=[]

  开始调用：

  dfs(0, 18.0)

  ———

  2. DFS 逐步过程（每一步变量变化）

  Step 1  进入 u=0, depth=0, curPower=18.0, ans=0
          u=0 不是叶子，遍历 child=[2,3,5]

  Step 2  走边 0->2
          nextPower = 18.0 * 0.99 = 17.82
          调用 dfs(2, 17.82)

  Step 3  进入 u=2, depth=1, curPower=17.82, ans=0
          u=2 不是叶子，child=[4]

  Step 4  走边 2->4
          nextPower = 17.82 * 0.99 = 17.6418
          调用 dfs(4, 17.6418)

  Step 5  进入 u=4, depth=2, curPower=17.6418, ans=0
          u=4 是叶子，mul=7
          add = 17.6418 * 7 = 123.4926
          ans = 0 + 123.4926 = 123.4926
          返回 u=4

  Step 6  u=2 子节点处理完，返回 u=2
          ans=123.4926

  Step 7  回到 u=0，走边 0->3
          nextPower = 18.0 * 0.99 = 17.82
          调用 dfs(3, 17.82)

  Step 8  进入 u=3, depth=1, curPower=17.82, ans=123.4926
          u=3 不是叶子，child=[7]

  Step 9  走边 3->7
          nextPower = 17.82 * 0.99 = 17.6418
          调用 dfs(7, 17.6418)

  Step 10 进入 u=7, depth=2, curPower=17.6418, ans=123.4926
          u=7 是叶子，mul=9
          add = 17.6418 * 9 = 158.7762
          ans = 123.4926 + 158.7762 = 282.2688
          返回 u=7

  Step 11 u=3 子节点处理完，返回 u=3
          ans=282.2688

  Step 12 回到 u=0，走边 0->5
          nextPower = 18.0 * 0.99 = 17.82
          调用 dfs(5, 17.82)

  Step 13 进入 u=5, depth=1, curPower=17.82, ans=282.2688
          u=5 不是叶子，child=[6,1]

  Step 14 走边 5->6
          nextPower = 17.82 * 0.99 = 17.6418
          调用 dfs(6, 17.6418)

  Step 15 进入 u=6, depth=2, curPower=17.6418, ans=282.2688
          u=6 不是叶子，child=[8]

  Step 16 走边 6->8
          nextPower = 17.6418 * 0.99 = 17.465382
          调用 dfs(8, 17.465382)

  Step 17 进入 u=8, depth=3, curPower=17.465382, ans=282.2688
          u=8 是叶子，mul=4
          add = 17.465382 * 4 = 69.861528
          ans = 282.2688 + 69.861528 = 352.130328
          返回 u=8

  Step 18 u=6 子节点处理完，返回 u=6
          ans=352.130328

  Step 19 回到 u=5，走边 5->1
          nextPower = 17.82 * 0.99 = 17.6418
          调用 dfs(1, 17.6418)

  Step 20 进入 u=1, depth=2, curPower=17.6418, ans=352.130328
          u=1 不是叶子，child=[9]

  Step 21 走边 1->9
          nextPower = 17.6418 * 0.99 = 17.465382
          调用 dfs(9, 17.465382)

  Step 22 进入 u=9, depth=3, curPower=17.465382, ans=352.130328
          u=9 是叶子，mul=3
          add = 17.465382 * 3 = 52.396146
          ans = 352.130328 + 52.396146 = 404.526474
          返回 u=9

  Step 23 u=1 子节点处理完，返回 u=1
          ans=404.526474

  Step 24 u=5 子节点处理完，返回 u=5
          ans=404.526474

  Step 25 u=0 子节点全部处理完，返回 u=0
          ans=404.526474

  ———

  3. 最终输出

  题目要求“只保留整数部分”：

  (long long)ans = 404

  输出就是：

  404
```


#### **法三：bfs**


```cpp
//bfs
 这题就是一棵树上的层次衰减累加。

  设衰减系数
  [
  q = 1 - \frac{r}{100}
  ]
  若某人深度为 d（祖师爷深度 0），其基础功力为
  [
  Z \cdot q^d
  ]
  如果他是得道者（K_i=0，倍数 m），贡献是
  [
  Z \cdot q^d \cdot m
  ]
  把所有得道者贡献求和，最后输出整数部分。

  N 可到 1e5，用 BFS/队列迭代，别用深递归。

  #include <bits/stdc++.h>
  using namespace std;

  int main() {
      ios::sync_with_stdio(false);
      cin.tie(nullptr);

      int N;
      long double Z, r;
      cin >> N >> Z >> r;

      vector<vector<int>> children(N);
      vector<int> mul(N, 0);      // 得道者倍数
      vector<char> isLeaf(N, 0);  // 是否得道者

      for (int i = 0; i < N; ++i) {
          int k;
          cin >> k;
          if (k == 0) {
              int m;
              cin >> m;
              isLeaf[i] = 1;
              mul[i] = m;
          } else {
              children[i].resize(k);
              for (int j = 0; j < k; ++j) cin >> children[i][j];
          }
      long double q = 1.0L - r / 100.0L;
      vector<long double> power(N, 0.0L);
      power[0] = Z;

      queue<int> que;
      que.push(0);

      long double ans = 0.0L;

      while (!que.empty()) {
          int u = que.front();
          que.pop();

          if (isLeaf[u]) {
              ans += power[u] * mul[u];
              continue;
          }

          for (int v : children[u]) {
          }
      }

      cout << (long long)(ans) << '\n'; // 只保留整数部分
      return 0;
  }

  样例会输出 404。
```


### L2-021 点赞狂魔

考点：数据统计、自定义排序


```cpp

```


### L2-022 重排链表

考点：链表的遍历和重组


```cpp

```


### L2-023 图着色问题

考点：图的遍历


```cpp

```


### L2-024 部落

考点：并查集


```cpp

```


### L2-025 分而治之

考点：图的连通性


```cpp

```


### L2-026 小字辈 √

考点：树的深度计算 -> 向上找祖先、路径压缩

输入：

- N = 9
- parent[1..9] = [2, 6, 5, 5, -1, 5, 6, 4, 7]
- 初始：depth[1..9] 全是 0

  for (i = 1..9) 逐个处理：

  1. i=1
- cur=1, path=[]
- 向上走：1 -> 2 -> 6 -> 5 -> -1
- 此时 path=[1,2,6,5]，cur=-1
- base = 0（因为到 -1）
- 反向回填：

  - depth[5]=1
  - depth[6]=2
  - depth[2]=3
  - depth[1]=4
  1. i=2
- depth[2]!=0，跳过

  1. i=3
- 向上走：3 -> 5（depth[5]=1 已知，停）
- path=[3], base=1
- 回填：depth[3]=2

  1. i=4
- 向上走：4 -> 5（已知）
- path=[4], base=1
- 回填：depth[4]=2

  1. i=5
- 已知，跳过

  1. i=6
- 已知，跳过

  1. i=7
- 向上走：7 -> 6（depth[6]=2 已知）
- path=[7], base=2
- 回填：depth[7]=3
- 向上走：8 -> 4（depth[4]=2 已知）
- path=[8], base=2
- 回填：depth[8]=3

  1. i=9
- 向上走：9 -> 7（depth[7]=3 已知）
- path=[9], base=3
- 回填：depth[9]=4

  最终 depth：
- 1:4, 2:3, 3:2, 4:2, 5:1, 6:2, 7:3, 8:3, 9:4

  然后找最大辈分：
- maxDepth = 4
- 对应成员：1 9

  输出：
- 第一行：4

› 把这棵树画一下

• 按样例 parent[i] 画出来是这棵树（父母在上，孩子在下）：

5
 ├─ 3
 ├─ 4
 │ └─ 8
 └─ 6
 ├─ 2
 │ └─ 1
 └─ 7
 └─ 9

对应辈分：

- 第1辈：5
- 第2辈：3 4 6
- 第3辈：2 7 8
- 第4辈：1 9


```cpp
void solve(){
    int n; cin >> n;
    vector<int> par(n+1);
    for(int i = 1;i <= n;++i) cin >> par[i];

    vector<int> depth(n+1,0);
    for(int i = 1;i <= n;++i){
        if(depth[i] != 0) continue;
        int cur = i;
        vector<int> path;
        while(cur != -1 && depth[cur] == 0){
            path.push_back(cur);
            cur = par[cur];
        }
        int base = (cur == -1 ? 0 :depth[cur]);
        for(int k = (int)path.size()-1;k >= 0;--k){
            depth[path[k]] = ++base;
        }
    }
    int maxdepth = 0;
    for(int i = 1;i <= n;++i) maxdepth = max(maxdepth,depth[i]);
    cout << maxdepth << '\n';
    bool ok = true;
    for(int i = 1;i <= n;++i){
        if(depth[i] == maxdepth){
            if(!ok) cout << ' ';
            cout << i;
            ok = false;
        }
    }
    cout << '\n';
    return;
}
```


### L2-027 名人堂与代金券

考点：排序和排名处理


```cpp

```


### L2-028 秀恩爱分得快

考点：图的数据处理


```cpp

```


### L2-029 特立独行的幸福

考点：数学迭代、素数判断


```cpp

```


### L2-030 冰岛人

考点：树的构建和最近公共祖先


```cpp

```


### L2-031 深入虎穴 √

考点：树的遍历

1) 读入后关键变量

children：

- 1 -> [2,3,4]
- 2 -> [5,6]
- 3 -> [7]
- 4 -> [8]
- 5 -> [9]
- 6 -> []
- 7 -> [11,10]
- 8 -> [13]
- 9 -> []
- 10 -> []
- 11 -> [12]
- 12 -> []
- 13 -> []

  indegree（入度）最终为：
- indegree[1]=0
- indegree[2]=1, indegree[3]=1, indegree[4]=1
- indegree[5]=1, indegree[6]=1,
  indegree[7]=1, indegree[8]=1
- indegree[9]=1, indegree[10]=1,
  indegree[11]=1, indegree[12]=1,
  indegree[13]=1

  所以根节点：
- root = 1

  ———

  2) BFS 过程（你这份代码的队列和 last）

  初始化：
- q = [1]
- last = 1

  逐步出队：

  1. 出队 1，last=1，入队 2,3,4
     q=[2,3,4]
  2. 出队 2，last=2，入队 5,6
     q=[3,4,5,6]
  3. 出队 3，last=3，入队 7
     q=[4,5,6,7]
  4. 出队 4，last=4，入队 8
     q=[5,6,7,8]
  5. 出队 5，last=5，入队 9
     q=[6,7,8,9]
  6. 出队 6，last=6，无入队
     q=[7,8,9]
  7. 出队 7，last=7，入队 11,10
     q=[8,9,11,10]
  8. 出队 8，last=8，入队 13
     q=[9,11,10,13]
  9. 出队 9，last=9，无入队
     q=[11,10,13]
  10. 出队 11，last=11，入队 12

​ q=[10,13,12]

```
11. 出队 10，last=10，无入队
```

​ q=[13,12]

```
12. 出队 13，last=13，无入队
```

​ q=[12]

```
13. 出队 12，last=12，无入队
```

​ q=[]

循环结束，输出：

- last = 12

  最终输出：

  12


```cpp
void solve(){
    int n; cin >> n;
    vector<vector<int>> g(n+1);
    vector<int> indeg(n+1,0);

    for(int i = 1;i <= n;++i){
        int k; cin >> k;
        g[i].resize(k);
        for(int j = 0;j < k;++j){
            cin >> g[i][j];
            indeg[g[i][j]]++;
        }
    }
    int root = -1;
    for(int i = 1;i <= n;++i){
        if(indeg[i] == 0){
            root = i;
            break;
        }
    }

    queue<pair<int,int>> q;
    q.push({root,0});

    int res = root,maxdepth = 0;

    while(!q.empty()){
        auto [u,d] = q.front();
        q.pop();
        if(d > maxdepth){
            maxdepth = d;
            res = u;
        }
        for(int v : g[u]){
            q.push({v,d+1});
        }
    }
    cout << res << '\n';
    return;
}
```


### L2-032 彩虹瓶

考点：栈的应用


```cpp

```


### L2-033 简单计算器

考点：栈的基本操作


```cpp

```


### L2-034 口罩发放

考点：排序与条件筛选


```cpp

```


### L2-035 完全二叉树的层序遍历

考点：完全二叉树的性质、后序遍历重建


```cpp

```


### L2-036 网红点打卡攻略

考点：图的遍历、路径验证


```cpp

```


### L2-037 包装机

考点：栈和队列的模拟


```cpp

```


### L2-038 病毒溯源

考点：DFS


```cpp

```


### L2-039 清点代码库

考点：数据统计与排序


```cpp

```


### L2-040 哲哲打游戏

考点：图的遍历和模拟


```cpp

```


### L2-041 插松枝

考点：栈和队列的模拟


```cpp

```


### L2-042 老板的作息表

考点：时间区间的排序和合并


```cpp

```


### L2-043 龙龙送外卖

考点：树的最短路径计算


```cpp

```


### L2-044 大众情人

考点：Floyed


```cpp

```


### L2-045 堆宝塔

考点：栈的模拟应用


```cpp

```


### L2-046 天梯赛的赛场安排

考点：贪心、优先队列


```cpp

```


### L2-047 锦标赛

考点：树的构建、自底向上还原


```cpp

```


### L2-048 寻宝图

考点：图的联通分量 <=>BFS/DFS


```cpp

```


### L2-049 鱼与熊掌

考点：集合交集查询优化


```cpp

```


### L2-050 懂蛇语

考点：字符串处理和映射查询


```cpp

```


### L2-051 满树的遍历

考点：树的构建和遍历


```cpp

```


### L2-052 吉利矩阵

考点：回溯剪枝


```cpp

```


### L2-053 算式拆解

考点：栈


```cpp

```


### L2-054 三点共线

考点：几何


```cpp

```


### L2-055 胖达的山头

考点：区间重叠的最大并发数


```cpp

```


### L2-056 被n整除的n位数

考点：回溯剪枝


```cpp

```
