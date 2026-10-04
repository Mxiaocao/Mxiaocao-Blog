---
title: "AtCoder Daily Compile 2"
published: 2026-06-05
updated: 2026-06-05
description: "Mxiaocao::Daily_Compile() T1111. D - Card Pile Query门钥匙 口头表述有n张牌，n个牌堆，一开始，牌堆i中只有牌i。现在要进行q次操作，每次操作，都会给你c，p两个数，即找到牌c的那一堆，把牌c和它上面的所有牌一起拿起来，保持顺序不变，放到牌p上面。题目保证牌c和牌p不在同一堆，且p在牌堆的最上面。最后要求你输出每个牌堆分别还剩多少牌 题解我们可以"
tags: []
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://mxiaocaoblog.com/2026/06/05/AtCoder-Daily-Compile-2/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "比赛复盘"
topic: "算法竞赛"
---

# Mxiaocao::Daily\_Compile() T11

## 11. **D - Card Pile Query**

[门钥匙](https://atcoder.jp/contests/abc455/tasks/abc455_d)

### 口头表述

有n张牌，n个牌堆，一开始，牌堆i中只有牌i。现在要进行q次操作，每次操作，都会给你c，p两个数，即找到牌c的那一堆，把牌c和它上面的所有牌一起拿起来，保持顺序不变，放到牌p上面。题目保证牌c和牌p不在同一堆，且p在牌堆的最上面。最后要求你输出每个牌堆分别还剩多少牌

### 题解

我们可以把每张牌看成一个节点，只记录这张牌下面压着哪张牌，用down来记录，当然，如果down[x] = 0，说明x是某一堆的最底牌。比如一堆牌从下往上看是3 1 4，那么down[4] = 1，down[1] = 3，down[3] = 0。那么我们怎么统计每堆有几张牌呢，每张牌顺着down一直往下找，找到最底下那张牌root，然后res[root]++，返回res。这个find是不是很眼熟，没错，就是借鉴了并查集的思想


```cpp
void solve(){
    int n,q; cin >> n >> q;
    vector<int> down(n+1);
    while(q--){
        int c,p; cin >> c >> p;
        down[c] = p;
    }

    auto find = [&](auto self,int x) -> int {
        if(down[x] == 0) return x;
        return down[x] = self(self,down[x]);
    };

    vector<int> res(n+1, 0);

    for(int i = 1;i <= n;++i){
        int root = find(find,i);
        res[root]++;
    }

    for(int i = 1;i <= n;++i){
        cout << res[i] << ' ';
    }
    cout << '\n';
    return;
}
```
