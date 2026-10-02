---
title: "hdoj1"
published: 2026-05-14
updated: 2026-05-14
description: "5,6,8 -> 2,7 -> 9,1,3 -> 4,10 1005 大户爱的开根题意对于每组数据，给定两个整数N,K，要求输出一个整数，表示⌊K⌋。题目保证 ，组数T≤100。 题解 法一参考讨论区的做法，用long double处理一下题目给的式子，就能AC了 12345void solve(){ long double n,k; cin >> n >&g"
tags: []
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/14/hdoj1/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "题解"
topic: "算法竞赛"
---

5,6,8 -> 2,7 -> 9,1,3 -> 4,10

## 1005 大户爱的开根

### 题意

对于每组数据，给定两个整数N,K，要求输出一个**整数**，表示⌊K ⌋。题目保证  ，组数T≤100。

### 题解

- #### 法一

  参考讨论区的做法，用long double处理一下题目给的式子，就能AC了

  
```cpp
void solve(){
	long double n,k;
 	cin >> n >> k;
 	cout << floor(pow(n,1.0/k)) << '\n';
} 
```


- #### 法二

  枚举，从小到大枚举i表示⌊K ⌋的整数，然后乘k次，得到res，若res\*i>n，则直接退出，并输出i-1。当然，需要特别判断k=1的情况，否则，最差会一直到1e9。

  
```cpp
void solve(){
    int n,k;
    cin >> n >> k;
    if(k == 1){
        cout << n << '\n';
        return;
    }
    bool ok = false;
    for(ll i = 2;;++i){
        ll res = 1;
        for(int j = 0;j < k;++j){
            if(res*i > n){
                ok = true;
                break;
            }
            res *= i;
        }
        if(ok){
            cout << i-1 << '\n';
            return;
        }
    }
    return;
}
```


  于是，就有人说了，主播主播，这样会不会太慢了，有没有更快的。好的他来了。
- #### 法三

  使用二分

  
```cpp
卖掉了
```


## 1006 巧克力工厂

### 题意

对于每组数据，第一行给定一个整数N，表示巧克力数量，接下来N行，每行两个整数 ，分别表示巧克力加工完成的时间，以及吃完该块巧克力所需时间。要求输出一个整数，表示吃完所有巧克力的最早时刻。题目保证1≤N≤105，所有测试用例的N之和不超过 ，组数T≤100。

[**注**] 一台机器可以同时加工多个巧克力

### 题解

先按照加工完成时间由小到大排序，再按照吃的时间从大到小排序。反正都是要吃的，不如先吃大的，把t凑大了，以至能吃到其他的，再吃剩下的那些小的。


```cpp
const int N = 5e5+10;

struct node{
    ll s,d;
}cho[N];

void solve(){
    int n;
    cin >> n;
    for(int i = 0;i < n;++i)
    cin >> cho[i].s >> cho[i].d;

    sort(cho,cho+n,[](node x,node y){
        if(x.s == y.s) return x.d > y.d;
        return x.s < y.s;
    });

    ll t = 0;
    for(ll i = 0;i < n;++i){
        if(t < cho[i].s) t = cho[i].s;
        t += cho[i].d;
    }
    
    cout << t << '\n';
    return;
}
```


## 1008 大户爱的gcd

### 题意

对于每组数据，第一行给定三个整数N,M,Q，分别表示长度为N的数组a（a未知），M个提示，Q个问题。接下来M行每行给定三个整数x,y,g，表示 的最大公因数为g。接下来Q行每行给定两个整数x,y，表示**询问** 的最大公因数最小可能是多少。要求输出Q行，每行一个整数，表示对应问题的答案。题目保证 ，组数T≤5。

### 题解

不要那些高大上的解释，可以直接举例子去理解它。

如果 gcd(a[1], a[2]) = 6，则6|a[1]且6|a[2]，即a[1] 必须是 6 的倍数：6, 12, 18, 24, …，a[2] 也必须是 6 的倍数：6, 12, 18, 24, …。现在，若gcd(a[1], a[3]) = 10。则可知， 对于a[1] ，其必须是 6 和 10 的公倍数，最小是 lcm(6,10) = 30。对于a[2]，它是6的倍数，最小是6。对于a[3]，它是10的倍数，最小是10。而现在询问gcd(a[2], a[3]) 最小可能是多少，那只需要将lcm处理后的、类似于a[1]的结果丢出去就行了。直接`a[x] = lcm(a[x], g)`，就差不多了。


```cpp
int gcd(int a,int b){ return b == 0 ? a : gcd(b,a%b);}

int lcm(int a,int b){ return a*b/gcd(a,b);}

void solve(){
    int n,m,q;
    cin >> n >> m >> q;
    vector<int> a(n+1,1);
    while(m--){
        int x,y,b;
        cin >> x >> y >> b;
        a[x] = lcm(a[x],b);
        a[y] = lcm(a[y],b);
    }
    while(q--){
        int x,y;
        cin >> x >> y;
        cout << gcd(a[x],a[y]) << '\n';
    }
    return;
}
```


## 1002 数字王国的警报密码

### 题意

对于每组数据，给定两个整数n,k，分别表示需要构造的密码序列的长度以及神秘的危险数字。要求构造一个严格单调递增的正整数序列，使得该序列中任一个长度至少为1的连续子序列的数字之和，都不能被k整除，并且使它的字典序最小。如果该序列存在，则输出构造的序列，否则，输出-1。题目保证 ，所有挑战中的k的总和不会超过 ，组数T≤ 。

[**字典序最小**] 比较两个长度相同的序列 和 ： 从第一个位置开始比较，找到第一个满足  的位置i，如果  < ，则称序列 AA 的字典序小于序列BB，如果所有对应位置的元素都相等，则两个序列字典序相同

### 题解


```cpp
vector<int> par;

int find(int x){
    if(par[x] != x){
        par[x] = find(par[x]);
    }
    return par[x];
}

void solve(){
    int n,k;
    cin >> n >> k;
    par.resize(k+1);
    iota(par.begin(),par.end(),0);
    par[0] = 1;

    if(n >= k){
        cout << -1 << '\n';
        return;
    }
    for(ll i = 1,sum = 0,cur = 1;i <= n;++i,++cur){ //这里一定要开long long，不然Runtime Error (ACCESS_VIOLATION)
        int u = (sum+cur)%k;
        int p = find(u);
        cur += (p-u+k)%k;
        cout << cur << ' ';
        par[p] = find((p+1)%k);
        sum += cur;
    }
    cout << '\n';
    return;
}
```


## 1007 流沙

### 题意

对于每组数据，第一行给定一个整数N，表示一棵包含N个节点的有根树。第二行给出N个整数 ，表示每个节点i上存放着 粒沙子。接下来N-1行，每行给定两个整数u,v，表示节点u和v之间有一条边。现在，你可以执行任意次操作：将任意节点上的一粒沙子移动到他的直接父节点上，并由此定义函数f[u]：假设此时只有以节点u为根的子树，问子树u中所有节点的沙子数量的最小值，最大有多少。要求为每个节点u计算出f[u]的值，并输出，即输出N个整数，第i个整数表示 f[i] 的值。题目保证 ，所有样例中N的总和不超过 ，给出的是合法的树结构，组数T≤ 。

[**hdoj开栈代码**] `__asm__ ( "movq %0, %%rsp\n"::"r"((char*)malloc(size)+size));`

## 1009 力的平衡

### 题意

对于每组数据，第一行给定一个整数k，表示力发生器的种类数。接下来k行，每行两个整数$F*{x\_i},F*{y*i} 1≤k≤500，−100≤F*{x*i},F*{y\_i}≤100$，并且所有样例中k的总和≤1000，组数≤10。

### 题解


```cpp
#include <bits/stdc++.h>
#define code using
#define by namespace
#define Mxiaocao std
code by Mxiaocao;

#define PII pair<int,int>
#define x first
#define y second
using ll = long long;

const int N = 505;

PII q[N*N];
int dist[N][N];
int dx[N],dy[N];
int k;

int bfs(){
    memset(dist,0,sizeof dist);
    int hh = 0,tt = -1;
    q[++tt] = {250,250};
    while(hh <= tt){
        auto t = q[hh++];
        for(int i = 0;i < k;++i){
            int a = t.x + dx[i],b = t.y + dy[i];
            if(a <= 0 || a >= 500 || b <= 0 || b >= 500) continue;
            if(dist[a][b]) continue;
            dist[a][b] = dist[t.x][t.y]+1;
            q[++tt] = {a,b};
        }
    }
    if(dist[250][250]) return dist[250][250];
    else return -1;
}

void solve(){
    cin >> k;
    for(int i = 0;i < k;++i){
        cin >> dx[i] >> dy[i];
        if(!dx[i] && !dy[i]){
            cout << 1 << '\n';
            return;
        }
    }
    
    int res = bfs();
    cout << res << '\n';
    return;
}

signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t = 1;
    cin >> t;
    while(t--){
        solve();
    }
    return 0;
}

// using i64 = long long;
// #define int i64
// #define endl "\n"
```


## 1001 氟化钙

### 题意

对于每组数据，第一行给定一个整数n，第二行给定n个正整数表示数组a。定义 。每次游戏，小远和小涛将随机选择两个正整数(i,j) (1≤i,j≤n)，取l=min(i,j)，r=max(i,j)，k=max⁡ ax(l≤x≤r)。现有一堆f(i,j,k)颗萤石，小远和小涛轮流从堆中取萤石，每次取1到k之间任意值，取到最后一颗萤石获胜，小远先手，两人都采取最佳策略。输出一个整数，表示可以使小远获胜的(i,j)对数。题目保证 ，组数≤10。

## 1003 回文串

### 题意

对于每组数据，输入两行表示两个只包含小写字母的字符串S和T，长度均为n。现在，可以在S和T中分别选取子串S’和T’，并将T’拼接在S’后面组成新字符串。输出一个整数，表示多少种选法，使得组成的新字符串是个回文串。题目保证，n≤2000，组数≤10。
