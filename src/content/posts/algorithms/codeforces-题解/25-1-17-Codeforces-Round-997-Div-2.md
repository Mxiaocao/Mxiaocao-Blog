---
title: "25_1_17 Codeforces Round 997 (Div. 2)"
published: 2026-05-18
updated: 2026-05-18
description: "2. Codeforces Round 997 (Div. 2)A. Shape Perimeter（800）（constructive algorithms）（math） Ques门钥匙 题意 There is an by square stamp on an infinite piece of paper. Initially, the bottom-left corner of the"
tags: []
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/18/25-1-17-Codeforces-Round-997-Div-2/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "codeforces-题解"
topic: "算法竞赛"
---

# 2. Codeforces Round 997 (Div. 2)

## A. Shape Perimeter（800）

（constructive algorithms）（math）

### Ques

[门钥匙](https://codeforces.com/contest/2056/problem/A)

**题意**

There is an   by   square stamp on an infinite piece of paper. Initially, the bottom-left corner of the square stamp is aligned with the bottom-left corner of the paper. You are given two integer sequences   and  , each of length  . For each step   from   to  , the following happens:

- Move the stamp   units to the right and   units upwards.
- Press the stamp onto the paper, leaving an   by   colored square at its current position.

**Note that the elements of sequences   and   have a special constraint:  .**

Note that you **do not** press the stamp at the bottom-left corner of the paper. Refer to the notes section for better understanding.

It can be proven that after all the operations, the colored shape on the paper formed by the stamp is a single connected region. Find the perimeter of this colored shape.

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains two integers   and   ( ,  ) — the number of operations performed and the side length of the square stamp.

The  -th of the next   lines contains two integers   and   ( ) — the distance that the stamp will be moved right and up during the  -th operation, respectively.

Note that there are **no** constraints on the sum of   over all test cases.

**Output**

For each test case, output a single integer representing the perimeter of the colored shape on the paper.

**Example**


```plaintext
3
4 3
1 1
2 2
2 1
1 2
1 2
1 1
6 7
3 6
1 1
3 1
6 6
5 4
6 1
```


```plaintext
32
8
96
```


**Note**

In the first example, the stamp has a side length of   and is pressed   times at coordinates  ,  ,  , and  . The piece of paper looks like that afterwards:

![](https://espresso.codeforces.com/1e1e0a336f650c6a4d8df1a79b7eedc1a495e703.png)

Here, the square formed by the first press is colored blue, the second red, the third green, and the fourth purple. The combined shape, whose perimeter we need to calculate, looks like that:

![](https://espresso.codeforces.com/a6e9b464a384c88aef80c02dac6470e6ec74adb4.png)

From the diagram, it can be seen that this shape has a perimeter of  .

### Ans


```cpp
void solve(){
    int n,m; cin >> n >> m;
    ll res = 0;
    for(int i = 0;i < n;++i){
        int x,y; cin >> x >> y;
        if(i == 0) res = 4*m;
        else res += 2*m+x+y-(m-x)-(m-y);
    }
    cout << res << '\n';
    return;
}
```


## B. Find the Permutation（1300）

（brute force）（dfs and similar）（graphs）（implementation）（sortings）

### Ques

**题意**

You are given an undirected graph with   vertices, labeled from   to  . This graph encodes a hidden permutation    of size  . The graph is constructed as follows:

- For every pair of integers  , an undirected edge is added between vertex   and vertex   if and only if  . Note that the edge **is not added** between vertices   and  , but between the vertices of their respective elements. Refer to the notes section for better understanding.

Your task is to reconstruct and output the permutation  . It can be proven that permutation   can be uniquely determined.

 A permutation of length   is an array consisting of   distinct integers from   to   in arbitrary order. For example,   is a permutation, but   is not a permutation (  appears twice in the array), and   is also not a permutation (  but there is   in the array).

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains a single integer   ( ).

The  -th of the next   lines contains a string of   characters $g*{i, 1}g*{i, 2}\ldots g*{i, n} g*{i, j} = \mathtt{0} g*{i, j} = \mathtt{1} g*{i, j} = \mathtt{1} i j$.

It is guaranteed that there exists a permutation   which generates the given graph. It is also guaranteed that the graph is undirected and has no self-loops, meaning $g*{i, j} = g*{j, i} g\_{i, i} = \mathtt{0}$.

It is guaranteed that the sum of   over all test cases does not exceed  .

**Output**

For each test case, output   integers   representing the reconstructed permutation.

**Example**


```plaintext
3
1
0
5
00101
00101
11001
00001
11110
6
000000
000000
000000
000000
000000
000000
```


```plaintext
1 
4 2 1 3 5 
6 5 4 3 2 1 
```


**Note**

In the first case  . Since there are no pairs  , there are no edges in the graph.

The graph in the second case is shown below. For example, when we choose   and  , we add an edge between vertices   and  , because  . However, when we choose   and  ,   and  , so   doesn’t hold. Therefore, we don’t add an edge between   and  .

![](https://espresso.codeforces.com/5f1953d2774c0b1378a67cd9be1536c8978a3765.png)

In the third case, there are no edges in the graph, so there are no pairs of integers   such that  . Therefore,  .

### Ans

**初始思路**

经过我的不断推敲，发现一条可行的思路，把这个矩阵沿着主对角线切开，对角线以右表示这个点的右边有谁。

**题解**

#### 法一

对于两个数字 i < j ,若`g[i][j] = 1`，表示 i 在 j 左边，若`g[i][j] = 0`，表示 j 在 i 左边。i > j 同理。

所以我们可以计算每个数字前有多少个数，即cnt，然后把它排在cnt+1位即可


```cpp
void solve(){
    int n; cin >> n;
    vector<string> g(n+1);
    for(int i = 1;i <= n;++i){
        cin >> g[i];
        g[i] = ' ' + g[i];
    }

    vector<int> res(n+1);
    for(int i = 1;i <= n;++i){
        int cnt = 0;
        for(int j = 1;j <= n;++j){
            if(i == j) continue;
            if(i < j){
                if(g[i][j] == '0') cnt++;
            }else{
                if(g[i][j] == '1') cnt++;
            }
        }
        res[cnt+1] = i;
    }
    for(int i = 1;i <= n;++i) cout << res[i] << ' ';
    cout << '\n';
}
```


#### 法二

直接自定义sort


```cpp
void solve(){
    int n; cin >> n;
    vector<string> g(n);
    for(auto& gi : g) cin >> gi;

    vector<int> p(n);
    iota(p.begin(),p.end(),0);
    sort(p.begin(),p.end(),[&](int x,int y){
        if(g[x][y] == '1') return x < y;
        else return x > y;
    });

    for(auto& pi : p) cout << pi+1 << ' ';
    cout << '\n';
    return;
}
```


## C. Palindromic Subsequences（1200）

（brute force）（constructive algorithms）（math）

### Ques

[门钥匙](https://codeforces.com/contest/2056/problem/c)

**题意**

For an integer sequence  , we define   as the length of the longest subsequence  of   that is a palindrome .

Let   represent the number of subsequences of length   that are palindromes. In other words,   counts the number of palindromic subsequences in   that have the maximum length.

Given an integer  , your task is to find any sequence   of   integers that satisfies the following conditions:

-   for all  .
-  

It can be proven that such a sequence always exists under the given constraints.

 A sequence   is a subsequence of a sequence   if   can be obtained from   by the deletion of several (possibly, zero or all) element from arbitrary positions.

 A palindrome is a sequence that reads the same from left to right as from right to left. For example,  ,  , and   are palindromes, while   and   are not.

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains a single integer   ( ) — the length of the sequence.

Note that there are **no** constraints on the sum of   over all test cases.

**Output**

For each test case, output   integers  , representing an array that satisfies the conditions.

If there are multiple solutions, you may output any of them.

**Example**


```plaintext
3
6
9
15
```


```plaintext
1 1 2 3 1 2
7 3 3 7 5 3 7 7 3
15 8 8 8 15 5 8 1 15 5 8 15 15 15 8
```


**Note**

In the first example, one possible solution is  . In this case,   as the longest palindromic subsequence has length  . There are   ways to choose a subsequence of length   that is a palindrome, as shown below:

1.  
2.  
3.  
4.  
5.  
6.  
7.  

Therefore,  , which is greater than  . Hence,   is a valid solution.

In the second example, one possible solution is  . In this case,  . There are   ways to choose a subsequence of length   that is a palindrome. Some examples are   and  . Therefore,  , which is greater than  . Hence,   is a valid solution.

In the third example,   and  , which is greater than  .

### Ans

**初始思路**

研究下样例，然后得出


```cpp
void solve(){
    int n; cin >> n;
    int cnt1 = n/2;
    int cnt2 = n/2;
    int cnt3 = n-cnt1-cnt2;
    while(cnt1 || cnt2 || cnt3){
        if(cnt1) cout << 1 << ' ',cnt1--;
        if(cnt2) cout << 2 << ' ',cnt2--;
        if(cnt3) cout << 3 << ' ',cnt3--;
    }
    cout << '\n';
    return;
}
```


但直接WA1了

**题解**

#### 法一

核心构造：对于大多数n，输出：1 2 3 … m 1 2 3 … m，其中m = n/2，如果n是奇数，最后再补一个没用过的数字。比方n = 9，则1 2 3 4 1 2 3 4 5

理由：对于每个数字x，它出现两次，中间刚好有m-1个数，所以可以形成m-1个长度为3的回文子序列，而一共又有m个数字，所以 。同时，这个构造里最长的回文子序列长度是3，不会大于它了，因为任意一个数的两次出现之间，所有数字只出现一次，不可能再凑出一对相同的数。而对于n = 6和n = 7单独构造即可


```cpp
void solve(){
    int n; cin >> n;
    if(n == 6){
        cout << "1 1 2 3 1 2\n";
        return;
    }
    if(n == 7){
        cout << "1 1 2 3 1 2 3\n";
        return;
    }
    int m = n/2;
    for(int i = 1;i <= m;++i) cout << i << ' ';
    for(int i = 1;i <= m;++i) cout << i << ' ';
    if(n&1) cout << m+1 << ' ';
    cout << '\n';
}
```


#### 法二

这个参考了上一个方法，不过更直接： a = [1, 1, 2, 3, …, n - 3, 1, 2]

这个能构造的回文是1 x 1 或 2 x 2，而且这个对所有n >= 6都适用

可以大致算下 成立


```cpp
void solve(){
    int n; cin >> n;
    cout << 1 << ' ' << 1 << ' ';
    for(int i = 2;i <= n-3;++i) cout << i << ' ';
    cout << 1 << ' ' << 2 << '\n';
    return;
}
```
