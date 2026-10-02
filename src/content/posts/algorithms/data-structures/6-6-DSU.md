---
title: "6.6 并查集"
published: 2026-05-14
updated: 2026-05-30
description: "经典并查集(DSU)可以将并查集想象成一个帮派合并的过程。 假设现在有n个人，一开始大家都不认识，每个人都可以是自己的老大。当然，有了ai，以后每个人都可以有自己的个体公司。当然，随着剧情的发展，会产生两种操作：合并、查询。 合并：两个帮派结盟了，此时就需要一个帮派的老大带着全体小弟去归顺另一个老大。 查询：随便抓两个人，问问他们的帮派的老大是不是一个人（即是不是一个帮派的）。 为了处理这两种"
tags: ["并查集"]
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/14/6-6-DSU/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "data-structures"
topic: "算法竞赛"
---

# 经典并查集(DSU)

可以将并查集想象成一个帮派合并的过程。

假设现在有n个人，一开始大家都不认识，每个人都可以是自己的老大。~~当然，有了ai，以后每个人都可以有自己的个体公司。~~当然，随着剧情的发展，会产生两种操作：合并、查询。

1. **合并**：两个帮派结盟了，此时就需要一个帮派的老大带着全体小弟去归顺另一个老大。
2. **查询**：随便抓两个人，问问他们的帮派的老大是不是一个人（即是不是一个帮派的）。

为了处理这两种操作，聪明的人类发明了并查集。

而如何实现并查集呢？我们可以使用数组，数组名可以使用par，而关于par数组里面存的是什么，后面我们将探讨~~当然不少题解会写far（farther的缩写）~~

## 一、初始化

一开始，每个人自成一派，也就是`par[i] = i`，这里的par数组存的是每个人的“直系上级”。当一个人的直系上级是他自己时，他就是这个帮派的首领（即树的根节点）。

![image-20260324144452498](/img/20.png)


```cpp
vector<int> par;

void Init(int n){
    par.resize(n);
    for(int i = 0;i < n;++i){
        par[i] = i;
   }
    //iota(par.begin(),par.end(),0);
}
```


或者可以用c++的内置函数iota优雅地进行初始化

## 二、查询

由于par数组只能看出一个人的直系上级，而为了找到一个人真正的老大，即帮派首领，我们需要顺着直系上级往上找，知道找到`Par[i] == i`，这个过程，需要用到递归。

如果par[x] == x，说明已经找到头了，否则，我们就继续递归，找这个人上级的上级。


```cpp
int Find(int x){
    if(par[x] == x) return x;
    return Find(par[x]);
    // return par[x] == x ? x : Find(par[x]);
}
```


~~蛋蛋蛋蛋~~但是，最坏情况下，这棵树会退化成一条链，且不说爆栈一事，查询效率O(n)，对于高级的数据结构来说，未免也太慢了。

那该怎么优化呢?我们可以在查询的时候，顺手把这条路径上所有人的直系上级直接改成首领。

于是我们可以对它进行路径压缩优化(Path Compression)

![image-20260324153214215](/img/21.png)

也就是这里的par[x] = Find(par[x])，要注意下这里是=而不是==。


```cpp
int Find(int x){
    //return par[x] == x ? x : par[x] = Find(par[x]);
    if(par[x] == x){
        return x;
    }
    return par[x] = Find(par[x]);
}
```


```cpp
int Find(int x){
    if(par[x] != x){
        par[x] = Find(par[x]);
    }
    return par[x];
}
```


当然两种写法都可，看自己喜欢哪一个。

## 三、合并

在合并两个帮派的时候，我们只需找到各自的老大，让其中一个老大认另一个老大做上级即可


```cpp
void Union(int x,int y){
    int fx = Find(x);
    int fy = Find(y);
    if(fx != fy){
        par[fx] = fy;
    }
}
```


但是这样子又会有问题，如果我把几万人的大帮派合并给只有一个人的小帮派时，会使得树的结构头重脚轻，增加后续的查询负担。~~骗你的，那几万人也不会同意。~~于是，我们又引入了按秩合并(Union by Rank & Size)


```cpp
vector<int> rak;  // rank 高度

void Union(int x,int y){
    int fx = Find(x),fy = Find(y);
    if(fx == fy) return;
    if(rak[fx] < rak[fy]){
        par[fx] = fy;
        rak[fy] += rak[fx];
    }else{
        par[fy] = fx;
        rak[fx] += rak[fy];
    }
}
```


```cpp
vector<int> siz;  // size 大小
void Union(int x,int y){
    int fx = Find(x),fy = Find(y);
    if(fx == fy) return;
    if(siz[fx] < siz[fy]){
        par[fx] = fy;
        siz[fy] += siz[fx];
    }else{
        par[fy] = fx;
        siz[fx] += siz[fy];
    }
}
```


## 四、其他函数

### Same函数


```cpp
bool Same(int x,int y){
    return Find(x) == Find(y);
}
```


### Getsize函数


```cpp
int GetSize(int x){
    return siz[Find(x)];
}
```


其他的函数就自己实现了

## 五、综合代码


```cpp
#include <bits/stdc++.h>
#define code using
#define by namespace
#define Mxiaocao std
#define int long long
// const int inf = 1e9+7;
const int N = 1e6+5;
code by Mxiaocao;

vector<int> par,siz;
int comp; //这个是连通块的数量

void Init(int n){
    par.resize(n);
    siz.resize(n,1);
    comp = n;
    iota(par.begin(),par.end(),0);
}

int Find(int x){
    if(par[x] == x) return par[x];
    return par[x] = Find(par[x]);
}

void Union(int x,int y){
    x = Find(x),y = Find(y);
    if(x == y) return;
    if(siz[x] < siz[y]) swap(x,y);
    par[y] = x;
    siz[x] += siz[y];
    comp--;
}

bool Same (int x,int y){
    return Find(x) == Find(y);
}

int GetSize(int x){
    return siz[Find(x)];
}

void solve(){
    int n,m;
    cin >> n >> m;
    Init(n);
    for(int i = 0;i < m;++i){
        int z,x,y;
        cin >> z >> x >> y;
        x--,y--;
        if(z == 1){
            Union(x,y);
        }else if(z == 2){
            if(Find(x) == Find(y)){
                cout << "Y\n";
            }else{
                cout << "N\n";
            }
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

// 4 7
// 2 1 2
// 1 1 2
// 2 1 2
// 1 3 4
// 2 1 4
// 1 2 3
// 2 1 4

// N
// Y
// N
// Y
```


**相关文章**

[[5-3-2-MST]] [[5-2-8-Tarjan-Algorithm]]
