---
title: "25-1-12-Codeforces-Round-996-Div-2"
published: 2026-05-18
updated: 2026-05-18
description: "3. Codeforces Round 996 (Div. 2)A. Two Frogs（800）（constructive algorithms）（games）（greedy）（math） Ques门钥匙 题意 Roaming through the alligator-infested Everglades, Florida Man encounters a most peculiar"
tags: []
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/18/25-1-12-Codeforces-Round-996-Div-2/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "codeforces-题解"
topic: "算法竞赛"
---

# 3. Codeforces Round 996 (Div. 2)

## A. Two Frogs（800）

（constructive algorithms）（games）（greedy）（math）

### Ques

[门钥匙](https://codeforces.com/contest/2055/problem/A)

**题意**

| Roaming through the alligator-infested Everglades, Florida Man encounters a most peculiar showdown. |
| --- |
|  |

There are   lilypads arranged in a row, numbered from   to   from left to right. Alice and Bob are frogs initially positioned on distinct lilypads,   and  , respectively. They take turns jumping, starting with Alice.

During a frog’s turn, it can jump either one space to the left or one space to the right, as long as the destination lilypad exists. For example, on Alice’s first turn, she can jump to either lilypad   or  , provided these lilypads are within bounds. It is important to note that each frog **must jump** during its turn and cannot remain on the same lilypad.

However, there are some restrictions:

- The two frogs cannot occupy the same lilypad. This means that Alice cannot jump to a lilypad that Bob is currently occupying, and vice versa.
- If a frog cannot make a valid jump on its turn, it loses the game. As a result, the other frog wins.

Determine whether Alice can guarantee a win, assuming that both players play optimally. It can be proven that the game will end after a finite number of moves if both players play optimally.

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first and only line of each test case contains three integers  ,  , and   ( ,  ,  ) — the number of lilypads, and the starting positions of Alice and Bob, respectively.

Note that there are **no** constraints on the sum of   over all test cases.

**Output**

For each test case, print a single line containing either “YES” or “NO”, representing whether or not Alice has a winning strategy.

You can output the answer in any case (upper or lower). For example, the strings “yEs”, “yes”, “Yes”, and “YES” will be recognized as positive responses.

**Example**


```plaintext
5
2 1 2
3 3 1
4 2 3
5 2 4
7 6 2
```


```plaintext
NO
YES
NO
YES
YES
```


**Note**

In the first test case, Alice has no legal moves. Therefore, Alice loses on the first turn.

In the second test case, Alice can only move to lilypad  . Then, Bob has no legal moves. Therefore, Alice has a winning strategy in this case.

In the third test case, Alice can only move to lilypad  . Then, Bob can move to lilypad  . Alice is no longer able to move and loses, giving Bob the win. It can be shown that Bob can always win regardless of Alice’s moves; hence, Alice does not have a winning strategy.

### Ans

画图不断模拟下，很快就能发现这个跟ab之间的距离有关：

- 如果是奇数 输出YES
- 如果是偶数 输出NO


```cpp
void solve(){
    int n,a,b; cin >> n >> a >> b;
    if(abs(a-b-1)&1) cout << "YES\n";
    else cout << "NO\n";
    return;
}
```


## B. Crafting（1000）

（constructive algorithms）（greedy）（sortings）

### Ques

[门钥匙](https://codeforces.com/contest/2055/problem/b)

**题意**

| As you’d expect, Florida is home to many bizarre magical forces, and Florida Man seeks to tame them. |
| --- |
|  |

There are   different types of magical materials, numbered from   to  . Initially, you have   units of material   for each   from   to  . You are allowed to perform the following operation:

- Select a material   (where  ). Then, spend   unit of **every** other material   (in other words,  ) to gain   unit of material  . More formally, after selecting material  , update array   as follows:  , and   for all   where   and  . Note that all   must remain non-negative, i.e. you cannot spend resources you do not have.

You are trying to craft an artifact using these materials. To successfully craft the artifact, you must have at least   units of material   for each   from   to  . Determine if it is possible to craft the artifact by performing the operation any number of times (including zero).

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains a single integer   ( ) — the number of types of materials.

The second line of each test case contains   integers   ( ) — the amount of each material   that you currently hold.

The third line of each test case contains   integers   ( ) — the amount of each material   needed to produce the artifact.

It is guaranteed that the sum of   over all test cases does not exceed  .

**Output**

For each test case, print a single line containing either “YES” or “NO”, representing whether or not the artifact can be crafted.

You can output the answer in any case (upper or lower). For example, the strings “yEs”, “yes”, “Yes”, and “YES” will be recognized as positive responses.

**Example**


```plaintext
3
4
0 5 5 1
1 4 4 0
3
1 1 3
2 2 1
2
1 10
3 3
```


```plaintext
YES
NO
YES
```


**Note**

In the first test case, perform an operation on material  . After doing so, we will have exactly the required resources:   unit of material  , and   units each of materials   and  .

In the second test case, it can be shown that no matter how the operations are performed, it is impossible to craft the artifact.

In the third test case, we can perform the operation on material   twice. After these operations, we will have   units of material   and   units of material  , which is more than enough to craft the artifact.

### Ans

先创建新数组，存一下a-b的值，然后跑样例的时候突然意识到：

- 当存在两个及以上的负数时，那肯定输出NO的，这个你自己想一想也会发现
- 当只有一个负数时，那就是这个数不断+1，剩下的数不断-1。还可以再优化下，我们可以只比较前两个元素，也就是如果这两个元素之和大于等于0，那就输出YES。因为既然最小的正数都满足条件了，那后面那些更大的正数肯定也是可以的
- 当没有负数，直接输出YES，并return掉


```cpp
void solve(){
    int n; cin >> n;
    vector<int> a(n),b(n);
    for(auto &ai : a) cin >> ai;
    for(auto &bi : b) cin >> bi;
    for(int i = 0;i < n;++i){
        a[i] -= b[i];
    }

    sort(a.begin(),a.end());

    if(a[0] > 0){
        cout << "YES\n";
        return;
    }
    int cnt = 0;
    for(int i = 0;i < n;++i){
        if(a[i] < 0) cnt++;
        if(cnt == 2){
            cout << "NO\n";
            return;
        }
    }
    if(a[0]+a[1] >= 0){
        cout << "YES\n";
        return;
    }else{
        cout << "NO\n";
        return;
    }
    return;
}
```


## C. The Trail（1400）

（brute force）（constructive algorithms）（greedy）（math）（two pointers）

### Ques

[门钥匙](https://codeforces.com/contest/2055/problem/c)

**题意**

| There are no mountains in Florida, and Florida Man cannot comprehend their existence. As such, he really needs your help with this one. |
| --- |
|  |

In the wilderness lies a region of mountainous terrain represented as a rectangular grid with   rows and   columns. Each cell in the grid is identified by its position  , where   is the row index and   is the column index. The altitude of cell   is denoted by  .

However, this region has been tampered with. A path consisting of   cells, starting from the top-left corner   and ending at the bottom-right corner  , has been cleared. For every cell   along this path, the altitude   has been set to  . The path moves strictly via downward ( ) or rightward ( ) steps.

To restore the terrain to its original state, it is known that the region possessed a magical property before it was tampered with: all rows and all columns shared the same sum of altitudes. More formally, there exists an integer   such that $\sum*{j=1}^m a*{i, j} = x 1\le i\le n \sum*{i=1}^n a*{i, j} = x 1\le j\le m$.

Your task is to assign new altitudes to the cells on the path such that the above magical property is restored. It can be proven that a solution always exists. If there are multiple solutions that satisfy the property, any one of them may be provided.

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains two integers   and   ( ) — the number of rows and columns in the grid.

The second line of each test case contains a string   of length   (  or  ) — the steps the path makes from   to  . The character   represents a downward step, and   represents a rightward step.

The  -th of the next   lines each contain   integers $a*{i,1}, a*{i, 2}, \ldots, a*{i,m} -10^6 \leq a*{i,j} \leq 10^6 (i, j) a\_{i,j} = 0$.

It is guaranteed that the sum of   over all test cases does not exceed  .

**Output**

For each test case, output   lines of   integers representing the restored grid of altitudes $b*{i, j} -10^{15} \leq b*{i,j} \leq 10^{15} a*{i,j} = b*{i,j} (i, j)$ is not on the path. If multiple solutions exist, output any of them.

**Example**


```plaintext
4
3 3
DRRD
0 2 3
0 0 0
3 1 0
4 5
DRRRRDD
0 1 0 2 3
0 0 0 0 0
-1 0 -3 -3 0
0 0 0 -1 0
2 3
RRD
0 0 0
0 1 0
5 5
DDDDRRRR
0 25 2 9 11
0 6 13 20 22
0 17 24 1 8
0 3 10 12 19
0 0 0 0 0
```


```plaintext
1 2 3
2 3 1
3 1 2
-6 1 0 2 3
7 -1 3 2 -11
-1 0 -3 -3 7
0 0 0 -1 1
0 -1 1
0 1 -1
18 25 2 9 11
4 6 13 20 22
15 17 24 1 8
21 3 10 12 19
7 14 16 23 5
```


**Note**

In the first test case, the grid has been filled such that every row and column contains the numbers   in some order, resulting in a common sum of  .

In the second test case, the grid has been filled such that all rows and columns sum to  .

### Ans

**初始思路**

写到后面发现方向就错了，无奈只能放弃

**题解**

我们可以让所有的行列和都为0~~可惜了，刚开始就是这么想的~~

设：

row[i] = 第 i 行当前总和

col[j] = 第 j 列当前总和

因为路径上的格子是0，所以row[i]和col[i]只统计非路径格子的贡献

如果当前位置是(i,j)：

- 下一步是D

  以后不会再碰到第i行的格子

  但我们要保证每一行总和是0，而当前第x行的总和是row[x]，且当前格子是第x行里最后一个还能修改的路径格子，所以我们这个格子要填`a[x][y] -= row[x]`，同时更新下`row[x] += a[x][y]`。而同时，这个格子也属于第y列，所以第y列的总和也要更新`col[y] += a[x][y]`

  
```cpp
a[i][j] -= row[i];
row[i] += a[i][j];
col[j] += a[i][j];
```

- 下一步是R

  以后不会再碰第j行的格子

  同理

  
```cpp
a[i][j] -= col[i];
col[j] += a[i][j];
row[i] += a[i][j];
```

- 最后到达(n,m)，只剩下最后一行和最后一列没有处理

  此时填`a[n][m] -= row[n];`或者`a[n][m] -= col[m];`


```cpp
void solve(){
    int n,m; cin >> n >> m;
    string s; cin >> s;
    vector<vector<ll>> a(n+1,vector<ll>(m+1));
    vector<ll> row(n+1,0),col(m+1,0);

    for(int i = 1;i <= n;++i){
        for(int j = 1;j <= m;++j){
            cin >> a[i][j];
            row[i] += a[i][j];
            col[j] += a[i][j];
        }
    }
    int x = 1,y = 1;
    for(char ch : s){
        if(ch == 'D'){
            a[x][y] -= row[x];
            row[x] += a[x][y];
            col[y] += a[x][y];
            x++;
        }else if(ch == 'R'){
            a[x][y] -= col[y];
            col[y] += a[x][y];
            row[x] += a[x][y];
            y++;
        }
    }
    a[x][y] -= row[x];
    for(int i = 1;i <= n;++i){
        for(int j = 1;j <= m;++j){
            cout << a[i][j] << ' ';
        }
        cout << '\n';
    }
    return;
}
```
