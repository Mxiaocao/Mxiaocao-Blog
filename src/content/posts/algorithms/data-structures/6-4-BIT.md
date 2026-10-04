---
title: "6.4 树状数组（BIT）"
published: 2026-05-30
updated: 2026-05-30
description: "6.4 树状数组/BIT树状数组本质上可以理解为一个“进行分段求和”的数组，且具备树的物理性质。树状数组可以高效地计算数列的区间和，并支持单点及区间的动态修改操作。这种结构不仅精巧，而且常数极小，是算法竞赛中的绝对大杀器。 但是在正式学习树状数组之前，我们需要先掌握一个核心的二进制底层操作：lowbit。 lowbit(x) 是整个数据结构的灵魂，它表示将 x 在二进制下仅保留最低位的 1 所表达"
tags: ["BIT", "树状数组", "数据结构"]
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "数据结构"
topic: "算法竞赛"
---

# 6.4 树状数组/BIT

树状数组本质上可以理解为一个“进行分段求和”的数组，且具备树的物理性质。树状数组可以高效地计算数列的区间和，并支持单点及区间的动态修改操作。这种结构不仅精巧，而且常数极小，是算法竞赛中的绝对大杀器。

但是在正式学习树状数组之前，我们需要先掌握一个核心的二进制底层操作：**lowbit**。

`lowbit(x)` 是整个数据结构的灵魂，它表示将 `x` 在二进制下仅保留最低位的 `1` 所表达的二进制数。例如：

- lowbit((10010) ) = (10) 
- lowbit((1010010100) ) = (100) 

它的实现方式也是非常的直接，利用计算机底层补码的性质（即负数是按位取反再加一），直接返回 `x & -x` 即可。即：


```cpp
int lowbit(int x) {
    return x & (-x);
}
```

> **交互演示**：[在线演示 BIT 的树形结构、add 更新与 sum 查询过程](/algo-vis/bit.html)

## 1. 单点修改 区间查询

在算法竞赛中，我们经常会遇到这样一种极度恶心的场景：

系统维护着一个长度为   的数组（  往往高达   甚至  ），并且会在任意时刻交替向你发送两种指令：

- **单点修改**：立刻把第   个位置的元素加上  。
- **区间查询**：立刻回答从第   个位置到第   个位置的所有元素的总和。

为了解决区间求和，很多人的第一反应往往是前缀和数组。

假设我们维护一个数组 `sum[]`，`sum[i]` 存的是前   个元素的和。此时，回答区间   的总和，只需要极其优雅的一步：`sum[R] - sum[L - 1]`。时间复杂度是极致的  。

但如果是这样，遇到动态修改时效果会极其惨烈。因为题目里还有“单点修改”。如果你把原数组第 1 个位置的值增加了 5，为了保证前缀和的正确性，你必须把 `sum[1]`、`sum[2]`、`sum[3]`……一直到 `sum[N]` 的所有值，全部重新加上 5。

为了修改一个点，你被迫遍历了整个数组，时间复杂度暴增到  。如果有   次修改操作，总时间变成  ，程序绝对会TLE。

前缀和查询无敌，但修改稀烂；普通数组修改无敌，但查询稀烂。

于是，我们可以借助树状数组（Binary Indexed Tree）来完美破局。

树状数组不是真正的树，它是形状像树的一个数组。它放弃了   的极端查询速度，也放弃了   的极端修改速度，而是将这两者都强行压制到了极其平衡的  。

它的核心思想是：用二进制的特性，让数组里的某些元素去“管辖”一段区间，从而实现跳跃式的更新和查询。而掌控这种跳跃的，就是全场唯一的真神宏定义：`lowbit(x) = x & -x`。

要熟练使用树状数组 `c[]`，我们必须要深刻理解两个核心操作路径：

- **寻找“管辖我的父节点”（`x + lowbit(x)`）**

  当原数组第   个位置的值发生改变时，我们需要去通知所有“管辖”了位置   的区间。

  怎么找到这些上级？就是通过 `x + lowbit(x)`。

  比如修改了第   个点（`0011`），它的下一个父节点是  （`0100`）；  的下一个父节点是  （`1000`）。

  这个操作就是在不断往上攀爬，更新沿途所有的上级大区间。
- **寻找“左边相邻的拼图块”（`x - lowbit(x)`）**

  当我们要求前   个元素的总和时，`c[x]` 本身只包含了其中一部分。剩下的部分去哪找？去找它左边紧挨着的兄弟区间！

  怎么找到左边相邻的块？就是通过 `x - lowbit(x)`。

  比如求前   个点的和（`0111`），先拿到 `c[7]`；剩下的去找  ，拿到 `c[6]`；剩下的去找  ，拿到 `c[4]`。

  这个操作就是在不断向左回溯，把互相不重叠的拼图完美拼成一个完整的前缀。

### 1. 单点修改

如果我们让原数组下标为 `x` 的值加上 `k`，那么树状数组中所有“管辖”了位置 `x` 的节点都需要更新。更新路径就是不断往上攀爬：`x += lowbit(x)`。


```cpp
void add(int x,ll k){
    while(x <= n){
        c[x] += k;
        x += lowbit(x);
    }
}
```


也可以简写为 `for` 循环形式：


```cpp
void add(int x,ll k){
    for(int i = x;i <= n;i += lowbit(i)) c[i] += k;
}
```


### 2. 区间查询

要求区间   的和，就是顺着树向下跳跃，把互相不重叠的管辖区间的和（即 `c[x]`）累加起来。跳跃路径为：`x -= lowbit(x)`。


```cpp
ll sum(int x){
    ll res = 0;
    while(x > 0){
        res += c[x];
        c -= lowbit[x];
    }
    return res;
}
```


对应的 `for` 循环形式：


```cpp
ll sum(int x){
    ll res = 0;
    for(int i = x;i >= 1;i -= lowbit(i)) res += c[i];
    return res;
}
```


查询任意区间   时，利用前缀和相减的性质：


```cpp
ll qurey(int x,int y){
    return sum(y)-sum(x);
}
```


### 3. 综合代码

结合以上逻辑，我们封装一个强大且易用的 BIT 结构体：


```cpp
struct BIT{
    int n;
    vector<ll> c;

    void init(int _n){
        n = _n;
        c.resize(n+1);// 树状数组下标从1开始，空间必须开到n+1
    }

    int lowbit(int x){ return x&-x;}

    void add(int x,ll k){
        for(int i = x;i <= n;i += lowbit(i)) c[i] += k;
    }

    ll sum(int x){
        ll res = 0;
        for(int i = x;i >= 1;i -= lowbit(i)) res += c[i];
        return res;
    }

    ll query(int x,int y){
        return sum(y) - sum(x-1);
    }
};
```


### 4. 例题

#### 例1：P3374 【模板】树状数组 1

[门钥匙](https://www.luogu.com.cn/problem/P3374)

##### Qus

**题目描述**

如题，已知一个数列，你需要进行下面两种操作：

- 将某一个数加上  ；
- 求出某区间每一个数的和。

**输入格式**

第一行包含两个正整数  ，分别表示该数列数字的个数和操作的总个数。

第二行包含   个用空格分隔的整数，其中第   个数字表示数列第   项的初始值。

接下来   行每行包含   个整数，表示一个操作，具体如下：

- `1 x k` 含义：将第   个数加上  ；
- `2 x y` 含义：输出区间   内每个数的和。

**输出格式**

输出包含若干行整数，即为所有操作   的结果。

**输入 #1**


```plaintext
5 5
1 5 4 2 3
1 1 3
2 2 5
1 3 -1
1 4 2
2 1 4
```


**输出 #1**


```plaintext
14
16
```


**说明/提示**

【数据范围】

对于   的数据， ， ；
对于   的数据， ；
对于   的数据， ， ， 。

数据保证对于任意时刻，  的任意子区间（包括长度为   和   的子区间）和均在   范围内。

样例说明：

![](https://cdn.luogu.com.cn/upload/pic/2256.png)

故输出结果   和  。

##### Ans


```cpp
#include <bits/stdc++.h>
#define code using
#define by namespace
#define Mxiaocao std
code by Mxiaocao;

using ll = long long;

struct BIT{
    int n;
    vector<ll> c;

    void init(int _n){
        n = _n;
        c.resize(n+1);
    }

    int lowbit(int x){ return x&-x;}

    void add(int x,ll k){
        while(x <= n){
            c[x] += k;
            x += lowbit(x);
        }
    }

    ll sum(int x){
        ll ans = 0;
        while(x > 0){
            ans += c[x];
            x -= lowbit(x);
        }
        return ans;
    }

    ll query(int x,int y){
        return sum(y) - sum(x-1);
    }
};

void solve(){
    int n,m;
    cin >> n >> m;
    BIT bit;
    bit.init(n);
    for(int i = 1;i <= n;++i){
        int x;
        cin >> x;
        bit.add(i,x);
    }
    for(int i = 1;i <= m;++i){
        int op;
        cin >> op;
        if(op == 1){
            int x;
            ll k;
            cin >> x >> k;
            bit.add(x,k);
        }
        if(op == 2){
            int x,y;
            cin >> x >> y;
            cout << bit.query(x,y) << endl;
        }
    }
    return;
}

signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t = 1;
    // cin >> t;
    while(t--){
        solve();
    }
    return 0;
}

// using i64 = long long;
// #define int i64
```


## 2. 区间修改 单点查询

在单点修改型的树状数组中，`c` 数组维护的是原数组 `a` 的区间和。为了实现区间的高效修改，我们可以转换思路，令 `c` 数组维护 `a` 的差分数组 `d` 的区间和。

即构造差分数组： 。

- **数学性质**：原数组的单点值，等于差分数组的前缀和。即  。
- **区间修改**：在区间   加上  ，等价于在差分数组中进行两处单点修改：`D[L] += k` 且 `D[R+1] -= k`。

所以，此时只需要将 BIT 维护的对象从原数组   变成差分数组   即可完美解决该问题。

### 例题

#### 例1：P3368 【模板】树状数组 2

[门钥匙](https://www.luogu.com.cn/problem/P3368)

##### Ques

**题目描述**

如题，已知一个数列，你需要进行下面两种操作：

1. 将某区间每一个数加上  ；
2. 求出某一个数的值。

**输入格式**

第一行包含两个整数  、 ，分别表示该数列数字的个数和操作的总个数。

第二行包含   个用空格分隔的整数，其中第   个数字表示数列第   项的初始值。

接下来   行每行包含   或   个整数，表示一个操作，具体如下：

操作  ： 格式：`1 x y k` 含义：将区间   内每个数加上  ；

操作  ： 格式：`2 x` 含义：输出第   个数的值。

**输出格式**

输出包含若干行整数，即为所有操作   的结果。

**输入 #1**


```plaintext
5 5
1 5 4 2 3
1 2 4 2
2 3
1 1 5 -1
1 3 5 7
2 4
```


**输出 #1**


```plaintext
6
10
```


**说明/提示**

**样例 1 解释：**

![](https://cdn.luogu.com.cn/upload/pic/2258.png)

故输出结果为   和  。

---

**数据规模与约定**

对于   的数据： ， ；

对于   的数据： ， ；

对于   的数据： ， ，保证任意时刻序列中任意元素的绝对值都不大于  。

##### Ans


```cpp
#include <bits/stdc++.h>
#define code using
#define by namespace
#define Mxiaocao std
code by Mxiaocao;

using ll = long long;

struct BIT{
    int n;
    vector<ll> c;

    void init(int _n){
        n = _n;
        c.resize(n+1);
    }

    int lowbit(int x){
        return x&-x;
    }

    void add(int x,ll k){
        while(x < n){
            c[x] += k;
            x += lowbit(x);
        }
    }

    ll sum(int x){
        ll ans = 0;
        while(x > 0){
            ans += c[x];
            x -= lowbit(x);
        }
        return ans;
    }

    ll query(int x,int y){
        return sum(y) - sum(x-1);
    }
};

void solve(){
    int n,m;  
    cin >> n >> m;

    BIT bit;
    bit.init(n+1);
    for(int i = 1;i <= n;++i){
        int x;  
        cin >> x;
        bit.add(i,x);
        bit.add(i+1,-x);
    }

    while(m--){
        int op; cin >> op;
        if(op == 1){
            int l,r;  ll x;  
            cin >> l >> r >> x;
            bit.add(l,x);
            bit.add(r+1,-x);
        }
        if(op == 2){
            int x;  cin >> x;
            cout << bit.sum(x) << endl;
        }
    }
    return;
}

signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t = 1;
    // cin >> t;
    while(t--){
        solve();
    }
    return 0;
}

// using i64 = long long;
// #define int i64
```


## 3. 区间修改 区间查询

这是树状数组的终极形态（遇到这类问题通常会选用线段树解决，但 BIT 凭借着常数更小、代码更短的优势，依然是很多顶尖高手的首选）。 我们需要求  ，且同时支持区间的批量修改。我们继续在差分数组上推导公式：


$$
\sum_{i=1}^x A[i] = \sum_{i=1}^x \sum_{j=1}^i D[j]
$$


展开求和式，合并同类项后得到绝对的核心公式：


$$
\sum_{i=1}^x A[i] = (x + 1) \sum_{i=1}^x D[i] - \sum_{i=1}^x (D[i] \times i)
$$


**核心逻辑**

为了实现这个公式，我们需要同时维护两个树状数组：

- `BIT1`：维护差分数组   的前缀和。
- `BIT2`：维护   的前缀和。

每次进行区间修改   加上   时：


```cpp
void range_add(int l, int r, ll k) {
    bit1.add(l, k);       bit1.add(r + 1, -k);
    bit2.add(l, l * k);   bit2.add(r + 1, (r + 1) * -k);
}
```


前缀查询时直接套公式：


```cpp
ll range_sum(int x) {
    return (x + 1) * bit1.sum(x) - bit2.sum(x);
}
```


## 4. 离散化

在实际做题中，遇到值域巨大（比如   甚至更大）但是元素个数不多（比如  ）的统计问题（例如求逆序对），直接用数值作为树状数组的下标显然会直接MLE。

此时，你会怎么处理？对于离散化而言，我们根本不关心数值具体有多大，只关心它们之间的**相对大小关系**，将它们映射到   的紧凑区间即可。

离散化标准流程代码片段：


```cpp
void solve(){
    int n;
    cin >> n;
    vector<ll> a(n+1);
    for(int i = 1;i <= n;++i){
        cin >> a[i];
    }
    
    // 拷贝并进行排序、去重
    auto t = a;
    sort(t.begin()+1,t.end());
    t.erase(unique(t.begin()+1,t.end()),t.end());
    
    // 使用二分查找替换原数组的值为其离散化后的相对排名
    for(int i = 1;i <= n;++i){
        a[i] = lower_bound(t.begin()+1,t.end(),a[i])-t.begin();
    }
    BIT bit;
    bit.init(n);
    ll res = 0;
    
    // 利用相对排名放入树状数组进行统计
    for(int i = 1;i <= n;++i){
        res += bit.query(a[i]+1,n);
        bit.add(a[i],1);
    }
    cout << res << endl;
    return;
}
```


### 例题

#### 例1：P1908 逆序对

[门钥匙](https://www.luogu.com.cn/problem/P1908)

##### Ques

**题目描述**

猫猫 TOM 和小老鼠 JERRY 最近又较量上了，但是毕竟都是成年人，他们已经不喜欢再玩那种你追我赶的游戏，现在他们喜欢玩统计。

最近，TOM 老猫查阅到一个人类称之为“逆序对”的东西，这东西是这样定义的：对于给定的一段正整数序列，逆序对就是序列中   且   的有序对。知道这概念后，他们就比赛谁先算出给定的一段正整数序列中逆序对的数目。注意序列中可能有重复数字。

**Update：数据已加强。**

**输入格式**

第一行，一个数  ，表示序列中有   个数。

第二行   个数，表示给定的序列。序列中每个数字不超过  。

**输出格式**

输出序列中逆序对的数目。

**输入 #1**


```plaintext
6
5 4 2 6 3 1
```


**输出 #1**


```plaintext
11
```


**说明/提示**

对于   的数据， 。

对于   的数据， 。

对于所有数据， 。

应该不会有人   过 50 万吧 —— 2018.8 chen\_zhe。

##### Ans


```cpp
#include <bits/stdc++.h>
#define code using
#define by namespace
#define Mxiaocao std
code by Mxiaocao;

// using i64 = long long;
// #define int i64
using ll = long long;

struct BIT{
    int n;
    vector<ll> c;

    void init(int _n){
        n = _n;
        c.resize(n+1);
    }

    int lowbit(int x){ return x&-x;}

    void add(int x,ll k){
        while(x <= n){
            c[x] += k;
            x += lowbit(x);
        }
    }

    ll query(int x){
        ll ans = 0;
        while(x > 0){
            ans += c[x];
            x -= lowbit(x);
        }
        return ans;
    }

    ll query(int x,int y){
        return query(y) - query(x-1);
    }
};

void solve(){
    int n;
    cin >> n;
    vector<ll> a(n+1);
    for(int i = 1;i <= n;++i){
        cin >> a[i];
    }
    auto t = a;
    sort(t.begin()+1,t.end());
    t.erase(unique(t.begin()+1,t.end()),t.end());
    for(int i = 1;i <= n;++i){
        a[i] = lower_bound(t.begin()+1,t.end(),a[i])-t.begin();
    }
    BIT bit;
    bit.init(n);
    ll res = 0;
    for(int i = 1;i <= n;++i){
        res += bit.query(a[i]+1,n);
        bit.add(a[i],1);
    }
    cout << res << '\n';
    return;
}

signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t = 1;
    // cin >> t;
    while(t--){
        solve();
    }
    return 0;
}
```


**相关文章**

[[6-6-DSU]]

---
