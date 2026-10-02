---
title: "4.1 线性dp"
published: 2026-05-14
updated: 2026-05-14
description: "线性 DP大多数教材没有定义什么是线性dp，而是把它归为dp的入门篇目。 那什么是线性DP呢？下面引用gpt的话： “线性 DP 是指把状态按一个线性顺序（通常是下标、时间、位置）依次计算，且每个状态只依赖这个顺序中更早的少量状态的动态规划。 可写成抽象形式：dp[i] = transfer(dp[i-1], dp[i-2], …, input[i]) 核心特征就两点： 1. 有明确的一维推进顺序"
image: "/img/2.jpg"
tags: ["线性dp", "dp"]
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/14/4-1-Linear-DP/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "动态规划"
topic: "算法竞赛"
---

# 线性 DP

大多数教材没有定义什么是线性dp，而是把它归为dp的入门篇目。

那什么是线性DP呢？下面引用gpt的话：

“线性 DP 是指把状态按一个线性顺序（通常是下标、时间、位置）依次计算，且每个状态只依赖这个顺序中更早的少量状态的动态规划。

可写成抽象形式：dp[i] = transfer(dp[i-1], dp[i-2], …, input[i])

核心特征就两点：

```
1. 有明确的一维推进顺序（前缀化处理）。
2. 依赖只向前看，不成环，且局部。”
```

说白话就是该问题的模型是线性的，基本从左到右扫一遍前缀，且每步只看前面的有限信息~~，即无后效性，就是当前的状态只由前面的问题转移而来~~

做这类题有个四步走的策略：

1. `dp[][]`：表达的意思

   题目问什么，dp表示什么意思
2. 初始值：

   `dp[1][1] = a[1][1];`
3. ==**确定状态转移**：==（**核心**）

   当前状态由哪些状态转移而来

   `dp[i][j] = max(dp[i-1][j],dp[i-1][j-1]) + a[i][j];`
4. 结束

## 一、基于数字三角形

### 例1. 数字三角形 Number Triangles

[门钥匙](https://www.luogu.com.cn/problem/P1216)

**题意**

观察下面的数字金字塔。

写一个程序来查找从最高点到底部任意处结束的路径，使路径经过数字的和最大。每一步可以走到左下方的点也可以到达右下方的点。

![img](/img/12.png)
在上面的样例中，从 7→3→8→7→5 的路径产生了最大权值。

对于 100% 的数据，1≤*r*≤1000，所有输入在 [0,100] 范围内。

**输入格式**

第一个行一个正整数 *r*，表示行的数目。

后面每行为这个数字金字塔特定行包含的整数。

**输出格式**

单独的一行，包含那个可能得到的最大的和。

**题解**

**法一：dfs 暴搜**

无任何优化（55分）


```cpp
const int N = 1010;
int n;
int res;
int a[N][N];

void dfs(int x,int y,int sum){
    // dfs搜索要先写终止条件
    if(x == n){
        res = max(res,sum);
        return;
    }
    //往左（直着往下）
    dfs(x+1,y,sum+a[x+1][y]);
    //往右（斜着往下）
    dfs(x+1,y+1,sum+a[x+1][y+1]);
}

void solve(){
    cin >> n;
    for(int i = 1;i <= n;++i)
    for(int j = 1;j <= i;++j)
    cin >> a[i][j];
    dfs(1,1,a[1][1]);
    cout << res << '\n';
    return;
}
```


记忆化搜索+最优性剪枝（85分）

**法二：dp**

四步走：

1. 定义`dp[][]`存的是每一步的总和

   
```cpp
int dp[N][N];
```

2. 初始化

   
```cpp
dp[1][1] = a[1][1];
```

3. 确定状态转移

   
```cpp
for(int i = 2;i <= n;++i)
for(int j = 1;j <= i;++j)
dp[i][j] = max(dp[i-1][j-1],dp[i-1][j]) + a[i][j];
```

4. 结束，准备输出

   
```cpp
for(int i = 1;i <= n;++i)
res = max(res,dp[n][i]);
```


**综合代码：**


```cpp
const int N = 1010;
int n;
int res;
int a[N][N];
int dp[N][N];

void solve(){
    cin >> n;
    for(int i = 1;i <= n;++i)
    for(int j = 1;j <= i;++j)
    cin >> a[i][j];

    dp[1][1] = a[1][1];

    for(int i = 2;i <= n;++i)
    for(int j = 1;j <= i;++j)
    dp[i][j] = max(dp[i-1][j-1],dp[i-1][j]) + a[i][j];

    for(int i = 1;i <= n;++i)
    res = max(res,dp[n][i]);

    cout << res << '\n';
    return;
}
```


## 二、最长上升子序列

### 例1：最长上升子序列

[门钥匙](https://www.luogu.com.cn/problem/B3637)

**题意**

给出一个由 *n*(*n*≤5000) 个不超过 106 的正整数组成的序列。请输出这个序列的最长上升子序列的长度。

[**注**]：最长上升子序列是指，从原序列中**按顺序**取出一些数字排在一起，这些数字是**逐渐增大**的。

**输入格式**

第一行，一个整数 *n*，表示序列长度。

第二行有 *n* 个整数，表示这个序列。

**输出格式**

一个整数表示答案。

**题解**

四步走：

1. dp[i]：表示以i结尾的序列，此刻的最优解
2. dp[i] = 1; 表示自己是自己的子序列
3. 寻找状态转移：

   可以举例子(下标从1开始)

   a[]: 2 1 5 3 6 4 6

   dp[]: 1 1 1 1 1 1 1

   可以找一个中间的数字，比如看下标为4 值为3的元素，以它为结尾，也就是说它接在谁后面。而要满足上升，那就要从前面找一个比它小的数，然后发现它可以接在2后面，也就是`dp[4] = dp[1]+1`，也可以接在1后面，也就是`dp[4] = dp[2]+1`。那现在再考虑，你这个3既可以接在1后面，也可以接2后面，那你现在要考虑题目要求了，谁大你就接在谁后面，所以你现在要调用下max，找最大值。

   
```cpp
for(int i = 1;i <= n;++i){
    for(int j = 1;j < i;++j){
    	if(a[j] < a[i]){
        	dp[i] = max(dp[i],dp[j]+1);
    	}
	}
}
```


   然后现在跑一下这个代码

   i = 1：dp的值还是1，++i；

   i = 2：开始考虑，发现不能接在前面的数后面,++i;

   i = …

![13](/img/13.png)

1. 输出：找所有dp的最大值

**综合代码**


```cpp
const int N = 5010;
int a[N];
int dp[N];
int res;

void solve(){
    int n; cin >> n;
    for(int i = 1;i <= n;++i) cin >> a[i];
    
    for(int i = 1;i <= n;++i){
        dp[i] = 1;
        for(int j = 1;j < i;++j){
            if(a[i] > a[j]) dp[i] = max(dp[i],dp[j]+1);
        }
    }
    
    for(int i = 1;i <= n;++i)
    res = max(res,dp[i]);
    
    cout << res << '\n';
    return;
}
```


### 例2：合唱队形

**题意**

  位同学站成一排，音乐老师要请其中的   位同学出列，使得剩下的   位同学排成合唱队形。

合唱队形是指这样的一种队形：设   位同学从左到右依次编号为   …  ，他们的身高分别为 $t*1,t\_2, ,t\_k t\_1< \cdots t*{i+1}> >t\_k(1\le i\le k)$。

你的任务是，已知所有   位同学的身高，计算最少需要几位同学出列，可以使得剩下的同学排成合唱队形。

对于   的数据，保证有  。

对于全部的数据，保证有  。

**输入格式**

共二行。

第一行是一个整数  （ ），表示同学的总数。

第二行有   个整数，用空格分隔，第   个整数  （ ）是第   位同学的身高（厘米）。

**输出格式**

一个整数，最少需要几位同学出列。

**样例**


```plaintext
8
186 186 150 200 160 130 197 220
```


```plaintext
4
```


## 三、最长公共子序列

## 四、编辑问题

## 五、 最大连续子段和

## 六、轮廓线、网格窄宽DP

### 例1：Red-Black Pairs

[门钥匙](https://codeforces.com/problemset/problem/2225/C)

**题意**

There is a table of 2×n cells. Each cell of the table is colored either red or black. You want to repaint some cells of this table so that there exists at least one way to partition all cells into n pairs such that the following conditions hold:

- the cells in each pair have the same color;
- the cells in each pair share a side.

What is the minimum number of cells that need to be repainted?

**输入格式**

Each test contains multiple test cases. The first line contains the number of test cases t (1≤t≤ ). The description of the test cases follows.

The first line of each test case contains one integer n (1≤n≤2⋅ ).

The second and third lines of each test case describe the colors of the cells. Each line contains a string consisting of exactly n letters “R” and/or “B”.

Additional constraint on the input:

- the sum of n over all test cases does not exceed 2⋅ .

**输出格式**

For each test case, output one integer — the minimum number of cells that need to be repainted.

**样例**


```plaintext
5
1
R
B
2
BR
BR
3
RBR
BRB
4
RRBB
BBRB
5
RBRBR
BBBRB
```


```plaintext
1
0
3
1
4
```


Consider the 3rd example. One possible option is to color all cells in one color, which requires repainting 3 cells.

In the 4th example, one possible valid repainting is


```plaintext
RRBB
BBRR
```


**题解**

题解思路（DP）

这题是 2×n 窄网格，最自然是按列做 轮廓线 DP（profile DP）。
 也可以理解成“按列线性推进的状态机 DP”。

把每个多米诺对（相邻两格）看成一条边。若这两格颜色不同，至少要重染 1 格；相同则 0。
 所以每个配对边的代价就是：

- 相同颜色：0
- 不同颜色：1

  目标变成：在所有合法覆盖（完美匹配）里，最小化总代价。

  ———

  ### 1. 状态定义

  设 dp[mask] 为处理到当前列 i 时，第 i 列哪些格子已被“左边横放骨牌”占用的最小代价。

  mask 2 位：
- 0：都没占
- 1：上格已占
- 2：下格已占
- 3：上下都已占

  初始：dp[0]=0，其余为 INF。

  ———

  ### 2. 转移

  记：
- v = (top[i] != bot[i])：当前列竖配对代价
- ht = (top[i] != top[i+1])：上行横配对代价
- hb = (bot[i] != bot[i+1])：下行横配对代价

  对每个 mask：

  1. mask=0（两格都空）
- 竖着配：ndp[0] = min(ndp[0], dp[0] + v)
- 两个横着配到下一列（i<n）：
  ndp[3] = min(ndp[3], dp[0] + ht + hb)

  1. mask=1（上格已占，只剩下格）
- 只能下格横着到下一列（i<n）：
  ndp[2] = min(ndp[2], dp[1] + hb)

  1. mask=2（下格已占，只剩上格）
- 只能上格横着到下一列（i<n）：
  ndp[1] = min(ndp[1], dp[2] + ht)

  1. mask=3（两格都已占）
- 当前列不用放：ndp[0] = min(ndp[0], dp[3])

  每列更新一次 dp=ndp。
  答案是处理完第 n 列后 dp[0]。

  ———

  ### 3. 正确性要点（简）
- mask 精确记录了“当前列遗留占用信息”，无遗漏无重复。
- 每种 mask 下可行放法是唯一完备枚举（竖放、双横放、被迫单横、跳过）。
- 每次转移加的正是新放骨牌对应最小重染代价（0/1）。
- 因为覆盖是局部相邻且列间只通过横骨牌耦合，按列 DP 的最优子结构成立。

  ———

  ### 4. 复杂度
- 时间：O(n) 每列常数状态转移
- 空间：O(1)（4 个状态滚动）
- 全部测试：O(sum n)，满足 2e5。

  ———


```cpp
int n;
          string top, bot;
          cin >> n >> top >> bot;

          // dp[i][mask]:
          // 已处理完前 i 列后，第 i+1 列被左侧横牌占用情况为 mask 的最小代价
          // i: 0..n
          vector<array<int, 4>> dp(n + 1);
          for (int i = 0; i <= n; ++i) dp[i].fill(INF);
          dp[0][0] = 0;

          for (int i = 0; i < n; ++i) {
              // 预计算当前列/横边代价
              int v = (top[i] != bot[i]); // 当前列竖配
              int ht = 0, hb = 0;
              if (i + 1 < n) {
                  ht = (top[i] != top[i + 1]); // 上行横配(i,i+1)
                  hb = (bot[i] != bot[i + 1]); // 下行横配(i,i+1)
              }

              // mask = 0: 当前列两格空
              if (dp[i][0] < INF) {
                  // 方案1：当前列竖着配
                  dp[i + 1][0] = min(dp[i + 1][0], dp[i][0] + v);

                  // 方案2：上下都横着连到下一列 => 下一列两格被占（mask=3）
                  if (i + 1 < n) {
                      dp[i + 1][3] = min(dp[i + 1][3], dp[i][0] + ht + hb);
                  }
              }

              // mask = 1: 当前列上格已被占，只剩下格，必须下格横连到下一列
              if (dp[i][1] < INF && i + 1 < n) {
                  dp[i + 1][2] = min(dp[i + 1][2], dp[i][1] + hb);
              }

              // mask = 2: 当前列下格已被占，只剩上格，必须上格横连到下一列
              if (dp[i][2] < INF && i + 1 < n) {
                  dp[i + 1][1] = min(dp[i + 1][1], dp[i][2] + ht);
              }

              // mask = 3: 当前列两格都已被占，直接进入下一列空状态
              if (dp[i][3] < INF) {
                  dp[i + 1][0] = min(dp[i + 1][0], dp[i][3]);
              }
          }

          // 处理完 n 列后，不应再有“下一列被占”的遗留
          cout << dp[n][0] << '\n';
```


```cpp
Use DP on columns.

 Key observation:
 If two adjacent cells are paired, the minimum repaint cost for this pair is:

 - 0 if their current colors are equal
 - 1 if their current colors are different

 So each possible domino (pair) has weight 0/1 by color equality, and we need a minimum-weight
 domino tiling of a 2 x n board.

 For a 2 x n board, any full pairing is built by:

 1. a vertical domino in column i, then solve from i+1
 2. two horizontal dominos across columns i and i+1, then solve from i+2

 Define dp[i] = minimum cost to cover columns [i..n] (1-indexed).

 Transitions:

 - vertical = (top[i] != bot[i]) + dp[i+1]
 - if i < n:
   horizontal = (top[i] != top[i+1]) + (bot[i] != bot[i+1]) + dp[i+2]
 - dp[i] = min(vertical, horizontal-if-possible)

 Base:

 - dp[n+1] = 0

 Complexity: O(n) per test case, total O(sum n).

 #include <bits/stdc++.h>
 using namespace std;

 int main() {
     ios::sync_with_stdio(false);
     cin.tie(nullptr);

     int t;
     cin >> t;
     while (t--) {
         int n;
         cin >> n;
         string top, bot;
         cin >> top >> bot;

         const int INF = 1e9;
         vector<int> dp(n + 3, INF);
         dp[n + 1] = 0;

         for (int i = n; i >= 1; --i) {
             int vertical = (top[i - 1] != bot[i - 1]) + dp[i + 1];
             int best = vertical;

             if (i < n) {
                 int horizontal = (top[i - 1] != top[i]) + (bot[i - 1] != bot[i]) + dp[i + 2];
                 best = min(best, horizontal);
             }

             dp[i] = best;
         }

         cout << dp[1] << '\n';
     }

     return 0;
 }

 把每个“相邻且同色的配对代价”看成最少重涂数：

 - 两格当前同色，代价 0
 - 两格当前异色，代价 1（把其中一个改色）

 问题就变成：
 在 2×n 棋盘上，用多米诺骨牌（每块覆盖两个共享边的格子）完全覆盖，总代价最小。

 设 dp[i] 表示从第 i 列到第 n 列的最小代价（1-based）。

 第 i 列只有两种放法：

 1. 竖着放一块（覆盖 (1,i) 和 (2,i)）
    costV = (top[i] != bot[i]) + dp[i+1]
 2. 横着放两块（覆盖 i 和 i+1 两列，要求 i<n）
    上面一块代价 (top[i] != top[i+1])
    下面一块代价 (bot[i] != bot[i+1])
    costH = (top[i] != top[i+1]) + (bot[i] != bot[i+1]) + dp[i+2]

 转移：
 dp[i] = min(costV, costH)（若 i==n 则只能竖放）

 边界：
 dp[n+1]=0

 时间复杂度 O(n) 每组，符合总 2e5 限制。
```


**相关文章**

[[5-2-3-Dijkstra]] [[5-3-2-MST]]
