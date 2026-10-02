---
title: "codeforces daily compile 1"
published: 2026-05-27
updated: 2026-06-04
description: "Mxiaocao::Daily_Compile() T1-T41. C1. Equal Multisets (Easy Version)Ques门钥匙 题意 This is the easy version of the problem. The difference between the versions is that in this version, the array is guara"
image: "/img/2.jpg"
tags: []
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/27/codeforces-daily-compile-1/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "codeforces-题解"
topic: "算法竞赛"
---

# Mxiaocao::Daily\_Compile() T1-T4

## 1. C1. Equal Multisets (Easy Version)

### Ques

[门钥匙](https://codeforces.com/problemset/problem/2211/C1)

**题意**

**This is the easy version of the problem. The difference between the versions is that in this version, the array   is guaranteed to be a permutation. You can hack only if you solved all versions of this problem.**

Given an array   of size  , and a parameter  , an array   is called cool if the following conditions hold:

- For each   from   to  , the array $[a*{i-k+1},a*{i-k+2},\ldots,a*i] [b*{i-k+1},b\_{i-k+2},\ldots,b\_i]$.

You are given two arrays   and   of size  , and an integer  . The array   **is guaranteed to be a permutation** . The array   only contains integers from   to  , and  .

Determine if it is possible to replace all   in   with an integer from   to  , such that   is cool with respect to  .

 A permutation of length   is an array consisting of   distinct integers from   to   in arbitrary order. For example,   is a permutation, but   is not a permutation (  appears twice in the array), and   is also not a permutation (  but there is   in the array).

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains two integers   and   ( ).

The second line of each test case contains   integers   ( ). **In this version, it is guaranteed that each number from   to   appears exactly once.**

The third line of each test case contains   integers   (  or  ).

It is guaranteed that the sum of   across all test cases does not exceed  .

**Output**

For each test case, output YES if possible, and NO otherwise. You may print each letter in either uppercase or lowercase.

**Example**


```plaintext
4
5 5
1 2 3 4 5
3 1 5 2 4
5 4
4 1 2 5 3
2 -1 -1 -1 -1
6 4
1 2 4 3 5 6
-1 -1 3 -1 -1 -1
6 4
1 2 4 3 5 6
-1 -1 3 3 -1 -1
```


```plaintext
YES
NO
YES
NO
```


**Note**

In the first test case, we have  . The only subarray of size   is  . We can see that   is a rearrangement of  , so the answer is YES.

In the second test case, it can be shown that it is impossible to replace all   in   such that every subarray of size   are rearrangements of each other.

### Ans

这道题题目有点绕

你有两个长度为 `n` 的数组：`a` 和 `b`。

- `a` 是一个完美的排列（包含 1 到 `n` 的所有数字，没有重复）。
- `b` 是一个残缺的数组，里面有些数字已经固定了，有些是 `-1`（意思是你可以随便填 1 到 `n` 里的数字）。
- 题目给你一个窗口大小 `k`。

你能不能把 `b` 里的 `-1` 全填上，使得对于任何一个长度为 `k` 的滑动窗口，`b` 窗口里框住的数字集合，必须和 `a` 窗口里框住的数字集合一模一样（不看顺序）

你要想，既然滑动前后集合都要保持一致，那唯一的可能就是：b吐出去的那个数字，必须和a吐出去的那个数字一样，b吞进去的新数字，也必须和a吞进去的新数字一样

借此，我们可以把数组切分为三个不同的区域：

1. 左侧死锁区

   这些数字随着窗口滑动，最早被吐出去。而为了保证吐出去的东西一样，b这一段必须和a这一段一模一样。如果b[i] != -1，且跟a对应位置不一样，直接返回NO
2. 右侧死锁区

   这些数字随着窗口滑动，最晚被吞进去的。同理，b这一段也必须和a一样
3. 中央自由区

   这块区域的数字，刚好是a这块区域里数字的重新打乱排序，不破坏一致性


```cpp
void solve(){
    int n,k; cin >> n >> k;
    vector<int> a(n+1),b(n+1);
    for(int i = 1;i <= n;++i) cin >> a[i];
    for(int i = 1;i <= n;++i) cin >> b[i];

    for(int i = 1;i <= n-k;++i){
        if(b[i] != -1 && b[i] != a[i]){
            cout << "NO\n";
            return;
        }
    }
    for(int i = k+1;i <= n;++i){
        if(b[i] != -1 && b[i] != a[i]){
            cout << "NO\n";
            return;
        }
    }
    
    vector<int> cnt(n+1);
    for(int i = n-k+1;i <= k;++i){
        cnt[a[i]]++;
    }
    for(int i = n-k+1;i <= k;++i){
        if(b[i] != -1){
            if(cnt[b[i]] > 0){
                cnt[b[i]]--;
            }else{
                cout << "NO\n";
                return;
            }
        }
    }
    cout << "YES\n";
    return;
}
```


稍加优化下


```cpp
void solve(){
    int n,k; cin >> n >> k;
    vector<int> a(n+1),b(n+1);
    for(int i = 1;i <= n;++i) cin >> a[i];
    for(int i = 1;i <= n;++i) cin >> b[i];

    vector<int> cnt(n+1);
    for(int i = 1;i <= n;++i){
        if(i <= n-k || i >= k+1){
            if(b[i] != -1 && b[i] != a[i]){
                cout << "NO\n";
                return;
            }
        }else{
            cnt[a[i]]++;
        }
    }

    for(int i = n-k+1;i <= k;++i){
        if(b[i] != -1){
            if(cnt[b[i]] > 0){
                cnt[b[i]]--;
            }else{
                cout << "NO\n";
                return;
            }
        }
    }
    cout << "YES\n";
    return;
}
```


## 2. B. Array and Permutation（1100）

[门钥匙](https://codeforces.com/problemset/problem/2197/B)

### 口头表述

现在给你一个初始数组p，长度是n，它是排列。又给了你一个目标数组a，长度也是n。然后现在要求你做若干次操作把初始数组p变成目标数组a。哪些操作呢？就是你可以执行`p[i] = p[i+1]`,可以执行`p[i+1] = p[i]`

举个例子，p = [1,2,3]，那就可以让p[2] = p[1]，得到p = [1,2,2]，后面继续研究样例……balabala

但是说白了其实就是让数字扩散

### 题解

#### 法一

hint1：你就想，一个数字被复制后，它和它的分身块必然是相邻的，也就是变成一块连续的相同数字块

那有什么启发呢？目前想的是，对于一个连续块，如果它的上面出现了和它相同的数，那就是yes的，比方说


```cpp
3 1 2 4
3 4 2 2
```


对于这个2的连续块，上面出现了2，但是对于4，它的上面就没有。但是这样对吗，并非，因为这个连续块还会存在被覆盖的情况

比方说


```cpp
1 3 2 7 5 4 6
2 2 7 7 7 5 6
```


而此时，突然灵光乍现，我们可以想到，不管怎么推，每个数字的相对位置其实都是不变的。那该怎么实现呢？难道记下每个数字的下标吗，这样显然不行，因为一个数会出现多次。那么，我们可不可以尝试把一个连续块压缩成一个数字，即去重。这样，我们只需看被压缩的序列是不是原数组的子序列即可


```cpp
void solve(){
    int n; cin >> n;
    vector<int> p(n),a(n);
    for(int i = 0;i < n;++i) cin >> p[i];
    for(int i = 0;i < n;++i) cin >> a[i];

    a.erase(unique(a.begin(),a.end()),a.end());

    int cnt = 0;
    int j = 0;
    for(int i = 0;i < a.size();++i){
        if(a[i] == p[j]) cnt++;
        else{
            while(j < n && p[j] != a[i]) j++;
            if(j < n) cnt++;
        }
    }
    // cout << cnt << '\n';
    cout << (cnt == a.size() ? "YES\n" : "NO\n");
    return;
}
```


虽然我的代码过了，但显然，比较见不得人，所以稍加优化下


```cpp
void solve(){
    int n; cin >> n;
    vector<int> p(n),a(n);
    for(int i = 0;i < n;++i) cin >> p[i];
    for(int i = 0;i < n;++i) cin >> a[i];

    a.erase(unique(a.begin(),a.end()),a.end());

    int j = 0;
    for(int i = 0;i < a.size();++i){
        while(j < n && p[j] != a[i]) j++;

        if(j == n){
            cout << "NO\n";
            return;
        }
    }
    cout << "YES\n";
    return;
}
```


显然，比上面的~~史山代码~~优雅了不少

#### 法二

我上面不是说可以记每个数字的下标吗，其实这个做法也是可行的

令pos[x] = 数字 x 在排列 p 中的位置，那么答案为 `YES` 当且仅当 pos[a1] <= pos[a2] <= … <= pos[an]，也就是说，数组 `a` 中数字出现的顺序，必须和它们在 `p` 中的顺序一致。

例如：p = [2, 3, 1]

那么


```plaintext
pos[2] = 1
pos[3] = 2
pos[1] = 3
```


初始数组 `p` 转换成位置数组后就是 [1, 2, 3]

由于一次操作是把相邻两个位置中的一个值复制给另一个。在“位置数组”里，这个操作也等价于把相邻两个数中的一个复制给另一个

初始位置数组是 [1, 2, 3, …, n]，它是单调不降的。而如果一个数组本来是单调不降的，那么复制相邻两个数中的一个给另一个之后，它仍然单调不降。所以不管怎么操作，最后得到的数组对应的 `pos` 序列一定单调不降。反过来，如果目标数组 `a` 的 `pos` 序列是单调不降的，那么它一定可以生成。

这样，我们就有我们的流了：

对每个测试用例：

1. 读入排列 `p`。
2. 记录每个值在 `p` 中的位置 `pos[x]`。
3. 读入数组 `a`。
4. 检查 pos[a[i]] <= pos[a[i + 1]] 是否对所有 `i` 成立。如果成立，输出 `YES`，否则输出 `NO`。


```cpp
void solve(){
    int n; cin >> n;
    vector<int> pos(n+1);

    for(int i = 1;i <= n;++i){
        int x; cin >> x;
        pos[x] = i;
    }

    int nxt = -1;
    bool ok = true;
    for(int i = 1;i <= n;++i){
        int x; cin >> x;

        int cur = pos[x];
        if(cur < nxt){
            ok = false;
        }
        nxt = cur;
    }
    cout << (ok ? "YES\n" : "NO\n");
    return;
}
```


此时，这份代码已经登峰造极了。

接下来分享写这道题遇到的一些坑

- 数组不能只开n，因为它是1~n的序列。 ~~当然12行代码这里可以写i = 0~~
- 17行代码这里不能cout然后return，因为这会让输入流错位

## 3. C. Dice Roll Sequence（1100）

[门钥匙](https://codeforces.com/problemset/problem/2195/C)

### 口头表述

题目定义了一种叫”掷骰子序列“的序列，要求所有的相邻元素都位于立方体的相邻面上。而对于骰子，数字x和7-x位于相对面上。

eg：[1,4,2]是；[3,4,6,3]不是，因为3 4不是相邻面；[2,2,4]不是，因为2 2在同一面

现在给定一个由1~6的n个整数组成的序列a，然后要求你执行若干次操作，将它变为掷骰子序列。

这个操作是，选择一个索引和一个整数x（1≤x≤6），然后将 变成x。

问你至少要进行多少次操作，也就是要修改多少数字

解释样例，balabala

### 题解

#### 法一：dp

这道题依旧是 非常非常非常经典的线性dp里的一维状态机dp，说实话，这道题我今天遇见了好多次

题目对“相邻”的定义非常明确。如果位置   的数字是  ，位置   的数字是  ，那么它们必须满足：

1. 不能是同一个面： 
2. 不能是对立面： 

只要满足这两个条件，  就是一对合法的相邻转移。

由于每个位置的数字只能是   到  ，我们可以让   表示：处理到前   个数字，并且强行把第   个数字改成  （ ）时，所需要的最少总修改次数。

可能不好理解，`dp[i][j]` = 前 i 个数处理好，且第 i 个数字强制变成 j 时最少修改次数

- `i` 表示序列的索引
- `j` 表示当前位置最终选择的数字
- 代价 = 当前数字和原数字是否相同

对于第   个位置的数字  ，我们需要枚举上一个位置   的所有可能数字  。

只要   满足合法条件，我们就可以进行转移：


$$
dp[i][j] = \min_{1 \le k \le 6, \, k \neq j, \, k+j \neq 7} \{ dp[i-1][k] \} + \text{cost}
$$


其中，`cost` 为当前位修改的代价：如果原数组   本来就是  ，则  ，否则  。

所以我们现在过一下流程：

1. 初始化

   
```cpp
for(int j = 1;j <= 6;++j){
    if(a[0] == j) dp[0][j] = 0;
    else dp[0][j] = 1;
}
```


   因为第一个位置没有前一个数，所以不需要考虑相邻是否合法，只需要看a[0]是不是j，如果是，不用改，否则要改，代价是1

   例如 a[0] = 3，那么

   
```plaintext
dp[0] = [INF,1,1,0,1,1,1]  // dp[0][0] 不用，dp[0][3] = 0
```

2. 转移

   我们现在正在处理位置i，想让它变成 j

   1. 那么先算代价 cost = (a[1] == j ? 0 : 1)
   2. 枚举上一位数字k，如果(k,j)合法，就可以从`dp[i-1][k]`转移，也就是`dp[i][j] = min(dp[i][j], dp[i - 1][k] + cost)`
```cpp
for(int i = 1;i < n;++i){
    for(int j = 1;j <= 6;++j){
        int cost = (a[i] == j ? 0 : 1);
        for(int k = 1;k <= 6;++k){
            if(k != j && k + j != 7){
                dp[i][j] = min(dp[i][j],dp[i-1][k]+cost);
            }
        }
    }
}
```


   比如序列 3 4 6 3，原序列里，`3` 和 `4` 是对立面，所以它本身不合法。

   我们看前两个位置。

   - 第一个数字 3，初始化 `dp[0]`：
```plaintext
dp[0][1]=1 dp[0][2]=1 dp[0][3]=0 dp[0][4]=1 dp[0][5]=1 dp[0][6]=1
```

   - 处理第二个数字 4
     - 想让第二个数字最终是 4，cost = 0（原本就是4）
     - 上一个数字 k 合法的有：1,2,5,6
     -  
     - min(1,1,1,1) = 1

   所以要保留 4，至少要改一次前一个数字。

   - 想让第二个数字是 5，cost = 1（原本是4，要改成5）
     - 上一个数字 k 合法：1,3,4,6
     -  
     - min(1+1,0+1,1+1,1+1) = 1
     - 这里选择前一个是3（不用改），第二个改成5，总共1次改动
3. 最终输出

   我们只关心整个序列合法，不关心最后以恶个数具体是什么，所以取min即可

综合代码：


```cpp
const int INF = 1e9;

void solve(){
    int n; cin >> n;
    vector<int> a(n);
    for(int i = 0;i < n;++i) cin >> a[i];
    
    vector<vector<int>> dp(n,vector<int> (7,INF));

    for(int j = 1;j <= 6;++j){
        if(a[0] == j) dp[0][j] = 0;
        else dp[0][j] = 1;
    }
    
    for(int i = 1;i < n;++i){
        for(int j = 1;j <= 6;++j){
            int cost = (a[i] == j) ? 0 : 1;
            for(int k = 1;k <= 6;++k){
                if(k != j && k+j != 7) dp[i][j] = min(dp[i][j],dp[i-1][k]+cost);
            }
        }
    }

    int res = INF;
    for(int j = 1;j <= 6;++j){
        res = min(res,dp[n-1][j]);
    }

    cout << res << '\n';
    return;
}
```


观察转移方程，第   层的状态仅仅依赖于第   层。 为了追求极致的速度和空间，我们完全不需要开一个   的大二维数组，只需要维护一个长度为   的一维数组，每次用一个新数组 `ndp` 覆盖旧的 `dp` 即可，也就是把dp[i-1]叫做dp，把正在计算的dp[i]叫做ndp，于是转移变成`ndp[i] = min(ndp[i],dp[k]+cost)`，计算完当前层后，再`dp = ndp`，空间复杂度直接降为  


```cpp
const int INF = 1e9;

void solve(){
    int n; cin >> n;
    vector<int> a(n);
    for(int i = 0;i < n;++i) cin >> a[i];
    
    vector<int> dp(7,0);

    for(int j = 1;j <= 6;++j){
        if(a[0] == j) dp[j] = 0;
        else dp[j] = 1;
    }
    
    for(int i = 1;i < n;++i){
        vector<int> ndp(7,INF);
        for(int j = 1;j <= 6;++j){
            int cost = (a[i] == j) ? 0 : 1;
            for(int k = 1;k <= 6;++k){
                if(k != j && k+j != 7) ndp[j] = min(ndp[j],dp[k]+cost);
            }
        }
        dp = ndp;
    }

    int res = INF;
    for(int j = 1;j <= 6;++j){
        res = min(res,dp[j]);
    }

    cout << res << '\n';
    return;
}
```


#### 法二：拉马努金瞪眼法

但是我不明白~~（奉化口音）~~，我的代码和它的一样啊，为什么没过

我的：


```cpp
void solve(){
    int n; cin >> n;
    vector<int> a(n);
    for(int i = 0;i < n;++i) cin >> a[i];
    
    int res = 0;
    for(int i = 1;i < n;++i){
        if(a[i] + a[i-1] == 7) res++;
        if(a[i] == a[i-1]) res++;
    }
    
    cout << res << '\n';
    return;
}
```


他的：


```cpp
void solve(){
    int n; cin >> n;
    vector<int> a(n);
    for(int i = 0;i < n;++i) cin >> a[i];
    
    int res = 0;
    for(int i = 1;i < n;++i){
        if(a[i] + a[i-1] == 7 || a[i] == a[i-1]) res++,i++;
    }
    
    cout << res << '\n';
    return;
}
```


原来是少了i，于是我


```cpp
void solve(){
    int n; cin >> n;
    vector<int> a(n);
    for(int i = 0;i < n;++i) cin >> a[i];
    
    int res = 0;
    for(int i = 1;i < n;++i){
        if(a[i] + a[i-1] == 7) res++,i++;
        if(a[i] == a[i-1]) res++,i++;
    }
    
    cout << res << '\n';
    return;
}
```


又WA2，我chory，你代码给我改好的啊，\*\*又哪出问题了

在这里，i被第一个if修改后，立刻就被第二个if拿去用了

好的，接下来就说为什么可以这么写

我们先定义一个坏边，对于相邻两个位置，如果他们不合法，那么就说这两个位置之间有一条坏边，而我们要做的就是把所有坏边都修掉。而对于一个操作，我们最多只能修左边这条边和右边这条边。

而我们此刻就要想，假设现在有三个位置L,x,R，如果我们修改中间这个为u，使得左右都合法，那么对于u，其实最多也就被静止L,7-L,R,7-R这四个数字，也就是说我们至少还有2个数字可以选，即我们**总能找到一个u能够让左右都合法**。

那么现在我们代入实际例子中，拿一个连续坏段举例，[1,6,1,1]

四个数，三条坏边，那我们至少要改几个？答案是 ，为什么，看(1,6)和(1,1)这两条坏边，他们没有公共端点，而要修一条坏边，我们至少要改一个端点，所以我们至少要改两个

再举个例子，[2,5,2,5,2]我们发现也可以改成[2,4,2,4,2]

所以对于一个长度为k的坏边，答案就是 

那么这个i++有是干嘛的，稍微提点一下就行了，也就是一旦遇到坏边，实际会让i往后走两步

比如当前 i = 1，正在看（a[0], a[1]），如果它是坏边,此时 `i` 从 `1` 变成 `2`，然后 `for` 循环结尾又自动 `i++`，于是 `i` 变成 `3`。下一次检查的是（a[2], a[3]）

为什么可以跳过？因为我们可以通过修改 `a[1]`，让（a[0], a[1]）、（a[1], a[2]）这两条边都变合法，也就是一次操作最多覆盖两条相邻坏边。

## 4. B. Cyclists（1100）

[门钥匙](https://codeforces.com/problemset/problem/2208/B)

### 口头表述

你有一个长度为n的队列（代表牌堆），每张牌都有一个固定的消耗值。在这个队列中有一张胜利牌，它一开始排在第p个位置，而你希望尽可能地多打出这张牌。你一共有m个能量，每一回合，你只能从前k张里选一张，拿出来，然后放到队尾。也就是说，在总能量不超过m的前提下，你最多能打出多少次胜利牌

### 题解

这道题我们能够发现，为了让目标牌再次进入前k个位置，我们必须把它前面若干牌先打出去，同时，我们也可以选择保留最多k-1张不打。而每打出一张牌后，这张牌就会去队尾。

我们先看第一次打目标牌：

如果p <= k，那么他就可以直接打，不需要提前打别的牌，即额外代价为0

如果p > k，那么我们要打掉一些牌，目标牌前一共有p-1张牌，而要进入前k，说明它前面最多只能剩k-1张牌，也就是我们要打掉p-k张牌，当然也可以选择留下最贵的k-1张。所以我们第一次把目标牌弄出的最小代价是前面所有牌的总和 减去 k-1张最贵的牌

再看之后每次打目标牌：

同理，我们此刻要打掉(n-1)-(k-1) = n-k张牌，而我们此刻的代价还是前面所有牌的总和 减去 k-1张最贵的牌，然后把这个设为一个周期的值。


```plaintext
l    // 从第 l 张牌开始看
r    // 看到第 r 张牌结束
ban  // 哪张牌跳过不算
keep // 最多可以保留几张牌不打
sum      // 当前考虑的所有牌的总花费
keep_sum // 被保留下来的牌的总花费
```


```cpp
void solve(){
    int n,k,p; ll m; cin >> n >> k >> p >> m;
    vector<ll> a(n+1);
    for(int i = 1;i <= n;++i) cin >> a[i];
    
    auto cal = [&](int l,int r,int ban,int keep) -> ll {
        ll sum = 0,keep_sum = 0;
        priority_queue<ll,vector<ll>,greater<ll>> pq;
        for(int i = l;i <= r;++i){
            if(i == ban) continue;
            
            sum += a[i];
            
            if(keep > 0){
                pq.push(a[i]);
                keep_sum += a[i];
                
                if((int)pq.size() > keep){
                    keep_sum -= pq.top();
                    pq.pop();
                }
            }
        }
        return sum - keep_sum;
    };
    
    int keep = k-1;
    ll first = cal(1,p-1,0,keep);
    ll cycle = cal(1,n,p,keep);
    
    ll need = first+a[p];
    
    if(need > m){
        cout << "0\n";
        return;
    }
    
    ll res = 1;
    m -= need;
    res += m/(cycle+a[p]);
    
    cout << res << '\n';
    return;
}
```


这种题做下来，神了，只能说，看看过得了
