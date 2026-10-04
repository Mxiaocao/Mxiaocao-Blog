---
title: "26_5_30 Codeforces Round 1101 (Div. 2)"
published: 2026-06-02
updated: 2026-06-02
description: "26_5_30 Codeforces Round 1101 (Div. 2)A. ConvergenceQues门钥匙 题意 Alice is inviting her friends to a party to eat cakes. However, each friend may not be at the same place, so everyone has to meet up at t"
tags: []
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "比赛复盘"
topic: "算法竞赛"
---

# 26\_5\_30 Codeforces Round 1101 (Div. 2)

## A. Convergence

### Ques

[门钥匙](https://codeforces.com/contest/2232/problem/A)

**题意**

Alice is inviting her friends to a party to eat cakes. However, each friend may not be at the same place, so everyone has to meet up at the same location first.

Alice has   friends, where the  -th friend is at position  . To make everyone be at the same place, Alice has to make multiple group calls. Unfortunately, the signal is weak, and Alice can only call   other people at a time.

Being a good person, Alice doesn’t want her friends to walk too far. So, for each group call containing the  -th friend and the  -th friend, Alice will tell both of them to meet at some integer location between   and   inclusive. After that, both of them will move to that location so quickly that Alice cannot make any group call during their movement. Please note that Alice can call these friends again once they reach that location.

The party is starting soon, so Alice needs to make group calls fast. Help her find the minimum number of group calls she needs to make.

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains an integer   ( ) — the number of friends Alice has.

The second line of each test case contains   integers   ( ) — the locations of her friends.

**Output**

For each test case, output the minimum number of group calls she needs to make in order for all of her friends to be in the same location.

**Example**


```plaintext
4
5
1 2 3 4 5
5
1 1 1 2 2
11
3 1 4 1 5 9 2 6 5 3 5
5
1 2 2 2 2
```


```plaintext
2
2
5
1
```


**Note**

In the first test case, the minimum number of group calls is 2. One way to make everyone at the same location is as follows:

- Call the  -st and  -th friend and tell them to move to location  . Their locations are now  .
- Call the  -nd and  -th friend and tell them to move to location  . Their locations are now  .

In the second test case, the minimum number of group calls is 2. One way to make everyone at the same location is as follows:

- Call the  -st and  -th friend and tell them to move to location  . Their locations are now  .
- Call the  -th and  -th friend and tell them to move to location  . Their locations are now  .

### Ans

其实就是个普通的线性遍历，不断枚举下target的值，因为对于每一次target，结果都是target左边的数目和右边的数目取最大


```cpp
void solve(){
    int n; cin >> n;
    map<int,int> mp;
    for(int i = 0;i < n;++i){
        int x; cin >> x;
        mp[x]++;
    }

    int l = 0,r = n;
    int res = 1e9;
    
    for(auto mi : mp){
        r -= mi.second;
        if(max(l,r) < res) res = max(l,r);
        l += mi.second;
    }

    cout << res << '\n';
    return;
}
```


## B. Cake Leveling

### Ques

[门钥匙](https://codeforces.com/contest/2232/problem/B)

**题意**

Alice is preparing a cake for her party. However, she is in a rush, so the frosting on the cake is uneven. To quickly solve this issue, Alice will put her knife at some **integer** height and then sweep the frosting from left to right to make the frosting level.

Formally, let   be the height of the frosting at the  -th position. Suppose that Alice puts her knife at some **integer** height  . If the height of frosting at position   is greater than  , the excess frosting will be pushed to position  . Excess frosting on position   will be pushed off the cake completely.

Alice and her friends really love cake frosting. Since Alice might decide to serve some prefix of the cake instead of the whole cake, help her find the maximum height the frosting can be while keeping the frosting level for the first   positions for  .

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains an integer   ( ) — the length of Alice’s cake.

The second line of each test case contains   integers   ( ) — the height of the frosting at the  -th position.

The sum of   over all test cases is at most  .

**Output**

For each test case, output   integers where the  -th integer represents the maximum height the frosting can be while keeping the frosting level for the first   positions.

**Example**


```plaintext
5
3
4 2 3
5
2 3 4 3 2
5
3 3 3 1 1
3
913764826 346182673 764382516
8
6 7 6 7 6 7 6 7
```


```plaintext
4 3 3 
2 2 2 2 2 
3 3 3 2 2 
913764826 629973749 629973749 
6 6 6 6 6 6 6 6 
```


**Note**

The explanation of the first test case is as follows:

When  , Alice is interested in the cake represented by an array  . Since the cake is already leveled, the maximum height the frosting can be is  .

When  , Alice is interested in the cake represented by an array  . If Alice put her knife at height  , the resulting cake will have a frosting of height  , making the cake not levelled. However, if Alice put her knife at height  , one unit of frosting will be pushed from the first position to the second position, making the resulting cake have a frosting height of  , which is leveled. Therefore, the maximum height the frosting can be while keeping it levelled is  .

When  , if Alice put her knife at height  , the resulting frosting level will be  . However, if Alice put her knife at height  , the resulting frosting level will be  . Therefore, the maximum height the frosting can be while keeping it levelled is  .

### Ans

也是一道普通的遍历题


```cpp
void solve(){
    int n; cin >> n;

    ll sum = 0;
    ll res = 4e18;
    for(int i = 1;i <= n;++i){
        ll x; cin >> x;
        sum += x;
        res = min(res,sum/i);
        cout << res << ' ';
    }
    cout << '\n';
    return;
}
```


## C1. Seating Arrangement (Easy Version)

### Ques

[门钥匙](https://codeforces.com/contest/2232/problem/C1)

**题意**

**This is the Easy version of the problem. The difference between the versions is that in this version, the constraints on  ,  ,  ,   are smaller. You can hack only if you solved all versions of this problem.**

Alice’s friends have come to the party, and now they are lining up to enter the party.

There are   tables at the party with   seats each. Each seat can only hold one person.

Each friend has one of these three following personalities:

- Introverts (I) who have to sit at an empty table
- Extroverts (E) who have to sit at a non-empty table
- Ambiverts (A) who can sit at any table.

Initially, every seat is empty. However, because Alice was eating cakes, her friends had already formed a line, which Alice cannot change their order. For each person in the line, Alice has to assign them a table or kick them out of the party. Each person is seated before the next person is assigned a table.

Wanting to have a lot of fun at the party, Alice needs to seat as many people as she can at the party. Help her find the maximum number of friends she can have at the party.

Note that once a friend is seated, they are not allowed to move even if they are not seated according to their personality anymore.

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains three integers  ,  , and   ( ) – the number of Alice’s friends, the number of tables, and the number of seats per table. The second line contains a string   of length   consisting only of the letters A, E, and I, representing an ambivert, extrovert, and introvert respectively.

It is guaranteed that the sum of   for all test cases is at most  .

**Output**

For each test case, output an integer: the maximum number of people seated.

**Example**


```plaintext
6
5 2 2
EIAIE
20 5 5
AEIEEEEIEAAEIEEEEIEA
8 2 4
AAAAAIEE
8 4 2
AIEAEAAI
8 3 3
AIEAEAAI
4 2 2
IAEE
```


```plaintext
4
20
7
7
7
4
```


**Note**

In the first test case, there are   tables with   seats each. Here is one of the ways to achieve the maximum number of people seated.

The first person is an extrovert. Since all tables are empty, they have to leave the party.

The second person is an introvert. Alice can assign them to the first table, which is empty.

The third person is an ambivert. Alice can assign them to the first table.

The fourth person is an introvert. Alice can assign them to the second table, which is empty.

The fifth person is an extrovert. Alice can assign them to the second table, which is not empty.

Thus, four people are seated at the party. This is maximal since there are only four seats at the party.

### Ans

我们有三种人：

- I：必须坐空桌。相当于消耗 1 张空桌，但会提供   个残缺座位（供 E 或 A 使用）。
- E：必须坐非空桌。相当于消耗 1 个残缺座位。
- A：既可以当 I 也可以当 E。

为了让最多的人坐下，我们要尽可能多地满足后续的人。

#### 法一：反悔贪心

对于这道题，我们可以运用贪心思想：

1. 对于 ‘I’：如果有空桌，直接开新桌坐下
2. 对于 ‘E’：如果有残缺座位，直接坐下
3. 对于 ‘A’：优先当 ‘E’ 坐残缺座位；如果没有残缺座位，再去当 ‘I’ 开新桌

反悔机制：

如果遇到一个 ‘E’，此时没有残缺座位了怎么办？

我们可以回头找之前当做 ‘E’ 坐下的 ‘A’，让去开一张新桌（前提是还有空桌）

- 这个 ‘A’ 去开新桌后，他不仅腾出了之前占用的 1 个残缺座位，还因为开了新桌，又额外提供了   个残缺座位。
- 总计瞬间多出了   个残缺座位，这样当前的 ‘E’ 就可以坐下了。
- 整体来看，人数加了 1，空桌少了 1，剩余残缺座位增加了  。

可以声明remain\_seat变量，记录当前还剩下的位子数，初始化为0，让它不断增加。remain\_table变量记录还能再申请多少桌子，初始化为x。


```cpp
void solve(){
    int n,x,s; cin >> n >> x >> s;
    string ss; cin >> ss;

    int remain_seat = 0;
    int remain_table = x;
    int a = 0;
    int res = 0;

    for(auto c : ss){
        if(c == 'I'){
            if(remain_table > 0){
                remain_table--;
                remain_seat += s-1;
                res++;
            }
        }else if(c == 'E'){
            if(remain_seat > 0){
                remain_seat--;
                res++;
            }else if(a > 0 && remain_table > 0){
                a--;
                remain_table--;
                remain_seat += s-1;
                res++;
            }
        }else if(c == 'A'){
            if(remain_seat > 0){
                remain_seat--;
                res++;
                a++;
            }else if(remain_table > 0){
                remain_table--;
                remain_seat += s-1;
                res++;
            }
        }
    }

    cout << res << endl;
    return;
}
```


最后写的时候其实还要注意让a当i人去申请新桌子的时候，还要注意remain\_table是否大于0

#### 法二：线性dp

尽请期待

## C2. Seating Arrangement (Hard Version)

### Ques

[门钥匙](https://codeforces.com/contest/2232/problem/C2)

**题意**

**This is the Hard version of the problem. The difference between the versions is that in this version, the constraints on  ,  ,  ,   are larger. You can hack only if you solved all versions of this problem.**

Alice’s friends have come to the party, and now they are lining up to enter the party.

There are   tables at the party with   seats each. Each seat can only hold one person.

Each friend has one of these three following personalities:

- Introverts (I) who have to sit at an empty table
- Extroverts (E) who have to sit at a non-empty table
- Ambiverts (A) who can sit at any table.

Initially, every seat is empty. However, because Alice was eating cakes, her friends had already formed a line, which Alice cannot change their order. For each person in the line, Alice has to assign them a table or kick them out of the party. Each person is seated before the next person is assigned a table.

Wanting to have a lot of fun at the party, Alice needs to seat as many people as she can at the party. Help her find the maximum number of friends she can have at the party.

Note that once a friend is seated, they are not allowed to move even if they are not seated according to their personality anymore.

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains three integers  ,  , and   ( ) – the number of Alice’s friends, the number of tables, and the number of seats per table. The second line contains a string   of length   consisting only of the letters A, E, and I, representing an ambivert, extrovert, and introvert respectively.

It is guaranteed that the sum of   for all test cases is at most  .

**Output**

For each test case, output an integer: the maximum number of people seated.

**Example**


```plaintext
6
5 2 2
EIAIE
20 5 5
AEIEEEEIEAAEIEEEEIEA
8 2 4
AAAAAIEE
8 4 2
AIEAEAAI
8 3 3
AIEAEAAI
4 2 2
IAEE
```


```plaintext
4
20
7
7
7
4
```


**Note**

In the first test case, there are   tables with   seats each. Here is one of the ways to achieve the maximum number of people seated.

The first person is an extrovert. Since all tables are empty, they have to leave the party.

The second person is an introvert. Alice can assign them to the first table, which is empty.

The third person is an ambivert. Alice can assign them to the first table.

The fourth person is an introvert. Alice can assign them to the second table, which is empty.

The fifth person is an extrovert. Alice can assign them to the second table, which is not empty.

Thus, four people are seated at the party. This is maximal since there are only four seats at the party.

### Ans

这道题只需要在上一道反悔贪心的基础上`define int long long`即可通关
