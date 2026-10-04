---
title: "AtCoder Daily Compile 1"
published: 2026-05-27
updated: 2026-06-04
description: "Mxiaocao::Daily_Compile() T1-T101. C - Drop Blocks门钥匙 QuesProblem Statement There are cells arranged in a row from left to right. Initially, no blocks are placed in any cell. You are given queries,"
tags: []
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "题解"
topic: "算法竞赛"
---

# Mxiaocao::Daily\_Compile() T1-T10

## **1. C - Drop Blocks**

[门钥匙](https://atcoder.jp/contests/abc459/tasks/abc459_c)

### Ques

**Problem Statement**

There are   cells arranged in a row from left to right. Initially, no blocks are placed in any cell.

You are given   queries, so process them in order. Each query is one of the following two types:

- `1 x`: Place   block in the  -th cell from the left. Then, if every cell has at least   block, remove   block from every cell.
- `2 y`: Output the number of cells that have at least   blocks.

**Constraints**

-  
-  
-  
-  
- All input values are integers.
- At least one query of the second type exists.

**Input**

The input is given from Standard Input in the following format:

   
 
 
 
 

Each query     is given in one of the following formats:

   

   

**Output**

Let   be the number of queries of the second type. Output   lines. The  -th line   should contain the answer to the  -th query of the second type.

**Sample Input 1**


```plaintext
3 7
1 1
1 3
1 3
2 1
2 2
1 2
2 1
```


**Sample Output 1**


```plaintext
2
1
1
```


 , and initially the numbers of blocks placed in the  -st,  -nd,  -rd cells from the left are  . The queries are processed in order as follows:

- Place   block in the  -st cell from the left. There exist cells with no blocks, so no further action is taken. The numbers of blocks in the  -st,  -nd,  -rd cells become  .
- Place   block in the  -rd cell from the left. The numbers of blocks in the  -st,  -nd,  -rd cells become  .
- Place   block in the  -rd cell from the left. The numbers of blocks in the  -st,  -nd,  -rd cells become  .
- The cells with at least   block are the  -st and  -rd cells from the left, so there are   such cells. Thus, output  .
- The cells with at least   blocks is only the  -rd cell from the left, so there is   such cell. Thus, output  .
- Place   block in the  -nd cell from the left. At this point, every cell has at least   block, so   block is removed from every cell. The numbers of blocks in the  -st,  -nd,  -rd cells become  .
- The cells with at least   block is only the  -rd cell from the left, so there is   such cell. Thus, output  .

Thus, output   in this order, one per line.

### Ans

如果让你想一种最暴力的写法，你会怎么写。是不是每次操作1就给方格加1，如果每个格子都有方格了，就把所有格子都减1。但显而易见，这种做法会TLE。

那么此时我们就想想相对运动，与其费劲地去把每个方块挖掉一层，我们为什么不把海平面涨上来一层。所以我们可以搞一个变量idx，初始是0，而当格子铺满后，格子高度不变，我们可以让idx++，也就是海平面升高。而对于一个格子的真实高度，就是它的账面高度-海平面高度。

那么我们该在什么时候涨海平面呢？与其开个数组记录每个格子的高度，不如开个雷达数组cnt，专门记录处于某个格子上的高度各有几个。而只要cnt[idx] == 0，也就是底层一个格子都没有，那我们可以idx++了。

而现在题目又问我们，真实高度≥y的格子有几个，我们总不能用for循环把雷达数组后面的人数全加起来吧，那又TLE了。那就想象打怪拿通行证，当一个格子从2级升级到3级的时候，它不需要退回2级的通行证，他只是获得了一张新的3级通行证。所以我们搞一个hcnt数组，记录签发了多少张这个级别的通行证：每次高度从h变成h+1的时候，我们只需要hcnt[h+1]++即可，其他的都不用管

而现在问，真实高度≥target的个数，即账面高度-idx ≥ target，即账面高度≥target+idx，于是我们直接输出hcnt[target+idx]


```cpp
void solve(){
    int n,q; cin >> n >> q;
    int MAXN = 600005;
    vector<int> cnt(MAXN),hcnt(MAXN),cur(n+1,0);
    cnt[0] = n;
    hcnt[0] = n;
    int idx = 0;
    while(q--){
        int op,x; cin >> op >> x;
        if(op == 1){
            int oldcur = cur[x];
            int newcur = cur[x]+1;
            cnt[oldcur]--;
            cnt[newcur]++;
            hcnt[newcur]++;
            cur[x] = newcur;
            while(cnt[idx]== 0){
                idx++;
            }
        }else{
            int res = x+idx;
            //防越界检查，虽然不写也没有多大关系
            if(res >= MAXN) cout << 0 << '\n';
            else cout << hcnt[res] << '\n';
        }
    }
    return;
}
```


## 2. **C - C Stands for Center**

[门钥匙](https://atcoder.jp/contests/abc458/tasks/abc458_c)

### Ques

**Problem Statement**

You are given a string   consisting of uppercase English letters.
Find the number of substrings (contiguous subsequences) of   that satisfy all of the following conditions.

- It consists of an odd number of characters.
- Its middle character is `C`. More formally, if the extracted substring consists of   characters, its  -th character is `C`.

Even if two substrings are identical as strings, they are counted separately if they are extracted from different positions.

**Constraints**

-   is a string consisting of uppercase English letters with length between   and  , inclusive.

**Input**

The input is given from Standard Input in the following format:

 

**Output**

Output the answer.

**Sample Input 1**

ABCCA

**Sample Output 1**

5

In this input,   `ABCCA`.
The substrings satisfying the conditions in the problem statement are the following five:

- `ABCCA`, extracted from the  st to  th characters of  
- `BCC`, extracted from the  nd to  th characters of  
- `C`, extracted from the  rd to  rd characters of  
- `CCA`, extracted from the  rd to  th characters of  
- `C`, extracted from the  th to  th characters of  

### Ans

这才是C题的难度，这道题只需要遍历下C的下标pos，然后求出 


```cpp
void solve(){
    string s; cin >> s;
    int len = s.length();
    ll res = 0;
    for(int i = 0;i < len;++i){
        if(s[i] == 'C') res += min(i+1,len-i);
    }
    cout << res << '\n';
    return;
}
```


而能否再进行一点小小的优化呢，可以使用string的find加速

普通的for循环是一个字符一个字符地读进 CPU 进行比对。 而 C++ STL 里的 `string::find`（其底层通常依赖于 C 语言的 `memchr`）是经过极致优化的。现代编译器会利用 CPU 的 SIMD（单指令多数据流）指令集，一次性读取 16 个甚至 32 个字符放进寄存器里做并行比对。但在极端(“CCCCC”)的情况下，find每次只能前进一步，会退化成和for循环一样的效率


```cpp
void solve(){
    string s; cin >> s;
    ll len = s.length();
    ll res = 0;

    size_t pos = s.find('C',0);
    while(pos != string::npos){
        res += min((ll)pos+1,len-(ll)pos);
        pos = s.find('C',pos+1);
    }
    cout << res << '\n';
    return;
}
```


## 3. **D - Adjacent Distinct String**

[门钥匙](https://atcoder.jp/contests/abc459/tasks/abc459_d)

### Ques

**Problem Statement**

You are given a string   consisting of lowercase English letters.

Determine whether it is possible to rearrange the characters of   so that no two adjacent characters are the same, and if so, find one such rearrangement.

You are given   test cases; solve each.

**Constraints**

-  
-   is a string of length between   and  , inclusive, consisting of lowercase English letters.
- The total length of   across all test cases is at most  .

**Input**

The input is given from Standard Input in the following format:

 
 
 
 
 

The  -th   test case   is given in the following format:

 

**Output**

Output the answers for the test cases in order, separated by newlines.

For each test case, if it is impossible to rearrange   so that no two adjacent characters are the same, output `No`.

If it is possible, let   be such a rearrangement and output in the following format:

Yes
 

If there are multiple valid rearrangements of  , any of them will be accepted.

**Sample Input 1**


```plaintext
3
aiiw
doodoo
aabbababcacababaaba
```


**Sample Output 1**


```plaintext
Yes
iwai
No
Yes
ababacabababacababa
```


Consider the first test case.

`iwai` is a rearrangement of `aiiw` in which no two adjacent characters are the same. Thus, outputting `iwai` is correct.

Other correct outputs include `wiai` and `iawi`.

### Ans

这道题我一开始的思路是：比方说有5个1 3个2 2个3 那么输出1231231211

这种思路在其他地方可能是对的，但在这里显然不对，这里最优的是先构造奇数位，再回填偶数位。

首先统计下26个字母的出现次数，再用vector> freq统计频率，这一步是方便我们后续排序的。对于降序排序，我们自然可以写成`sort(freq.begin(), freq.end(), greater<pair<int, char>>());`,但我们也可以写成`sort(freq.rbegin(),freq.rend());`

而后便是构造：准备一个全空的字符串，从下标0开始，每填一个字母，指针就向右跳两格，当等坑被填完后，再把指针拉回下标1，继续填。

对于返回，我们可以用鸽巢原理，就是我们要思考，想象我们有N个停车位排成一排。为了不让两辆同型号的车挨在一起，你最多能停多少辆同型号的车？那显然就是不能朝过(N+1)/2，否则怎么排也没用


```cpp
void solve(){
    string s; cin >> s;
    //26个字母统计
    vector<int> cnt(26,0);
    int n = s.length();
    int max_freq = 0;
    for(auto c : s){
        cnt[c-'a']++;
        max_freq = max(max_freq,cnt[c-'a']);
    }

    //对频率排序
    vector<pair<int,char>> freq;
    for(int i = 0;i < 26;++i){
        if(cnt[i]){
            freq.push_back({cnt[i],i+'a'});
        }
    }

    if(max_freq > (n+1)/2){
        cout << "No\n";
        return;
    }
    sort(freq.rbegin(),freq.rend());

    //奇偶重构
    string res(n,' ');
    int idx = 0;
    for(auto fi : freq){
        int count = fi.first;
        int ch = fi.second;
        
        while(count--){
            res[idx] = ch;
            idx += 2;

            if(idx >= n){
                idx = 1;
            }
        }
    }

    cout << "Yes\n";
    cout << res << '\n';

    return;
}
```


当然还有另外一种方式


```cpp
void solve(){
    string s; cin >> s;
    int n = s.length();
    
    vector<int> cnt(26,0);
    int mx = 0;
    for(auto c : s){
        cnt[c-'a']++;
        mx = max(mx,cnt[c-'a']);
    }
    
    if(mx > (n+1)/2){
        cout << "No\n";
        return;
    }
    
    priority_queue<pair<int,char>> pq;
    for(int i = 0;i < 26;++i){
        if(cnt[i]){
            pq.push({cnt[i],i+'a'});
        }
    }
    
    string res;
    res.reserve(n);
    
    while(pq.size() >= 2){
        auto [c1,ch1] = pq.top(); pq.pop();
        auto [c2,ch2] = pq.top(); pq.pop();
        
        res += ch1;
        res += ch2;
        
        c1--;
        c2--;
        
        if(c1 > 0) pq.push({c1,ch1});
        if(c2 > 0) pq.push({c2,ch2});
    }
    
    if(!pq.empty()){
        res += pq.top().second;
    }
    
    cout << "Yes\n";
    cout << res << '\n';

    return;
}
```


## 4. **D - Chalkboard Median**

[门钥匙](https://atcoder.jp/contests/abc458/tasks/abc458_d)

### Ques

**Problem Statement**

There is one integer   written on a blackboard.

You are given   queries to process in order. The  -th query   is as follows.

> Two integers   and   are given. Write two new integers   and   on the blackboard.
>
> Then, output the median of the   integers written on the blackboard.

**Constraints**

-  
-  
-  
- All input values are integers.

**Input**

The input is given from Standard Input in the following format:

 
 
   
   
 
   

**Output**

Output   lines.

The  -th line should contain the answer to the  -th query.

**Sample Input 1**


```plaintext
5
3
2 3
1 2
8 9
```


**Sample Output 1**


```plaintext
3
2
3
```


In the first query, the integers written on the blackboard become  , and their median is  .

In the second query, the integers written on the blackboard become  , and their median is  .

In the third query, the integers written on the blackboard become  , and their median is  .

### Ans

这道题是经典的优先队列模型：**动态中位数**

我们可以准备两个优先队列：

大根堆：存放所有≤中位数的数字（我们此时只关心左半边最大的数字）

小根堆：存放所有≥中位数的数字（我们只关心右半边最小的数字）

这道题目，我们只需维护左右两个队列的人数，让左边队列的人数，刚好只比右边多1个。于是，左队列的队头就是我们要求的中位数

而我们的流程就是，首先把X压入左队列，而后每次来新数字时，如果比中位数小，压入左队列，否则压入右队列。

而后我们需要调整一下左右的平衡，如果左边人太多，balabala，如果右边人太多，balabala


```cpp
void solve(){
    priority_queue<ll> left_pq;
    priority_queue<ll,vector<ll>,greater<ll>> right_pq;
    ll x; cin >> x;
    left_pq.push(x);
    int q; cin >> q;
    while(q--){
        ll a,b; cin >> a >> b;
        ll t = left_pq.top();

        if(a < t) left_pq.push(a);
        else right_pq.push(a);
        if(b < t) left_pq.push(b);
        else right_pq.push(b);

        while(left_pq.size() > right_pq.size()+1){
            right_pq.push(left_pq.top());
            left_pq.pop();
        }
        while(left_pq.size() < right_pq.size()){
            left_pq.push(right_pq.top());
            right_pq.pop();
        }
        cout << left_pq.top() << '\n';
    }
    return;
}
```


## 5. **C - Sushi**

[门钥匙](https://atcoder.jp/contests/abc460/tasks/abc460_c)

### Ques

**Problem Statement**

There are   pieces of shari (vinegared rice) and   pieces of neta (toppings) as ingredients for sushi.

The weight of the  -th shari is  , and the weight of the  -th neta is  .

You will make sushi by combining shari and neta.

To make one piece of sushi, you need to combine one shari with one neta. Here, the weight of the neta must be at most twice the weight of the shari. Also, the same shari or neta cannot be used in multiple pieces of sushi.

Find the maximum number of sushi that can be made.

**Constraints**

-  
-  
- All input values are integers.

**Input**

The input is given from Standard Input in the following format:

   
       
       

**Output**

Output the answer.

**Sample Input 1**


```plaintext
4 5
4 2 1 8
14 9 3 2 9
```


**Sample Output 1**


```plaintext
3
```


By combining the  st shari with the  rd neta, the  nd shari with the  th neta, and the  th shari with the  st neta, for example, you can make three pieces of sushi. It is impossible to make four or more pieces of sushi, so output  .

### Ans


```cpp
void solve(){
    int n,m; cin >> n >> m;
    vector<ll> a(n),b(m);
    for(int i = 0;i < n;++i){
        ll x; cin >> x;
        a[i] = 2*x;
    }
    for(int i = 0;i < m;++i) cin >> b[i];

    sort(a.begin(),a.end());
    sort(b.begin(),b.end());

    int res = 0;
    int j = 0;
    for(int i = 0;i < n;++i){
        if(j < m && b[j] <= a[i]){
            res++;
            j++;
        }
    }

    cout << res << '\n';

    return;
}
```


还是比较容易的，不过注意第16行的`j < m`不要忘了，否则WA6

## 6. **C - Long Sequence**

[门钥匙](https://atcoder.jp/contests/abc457/tasks/abc457_c)

### 口头表述

第一行给你两个变量n和k，然后接下来的n行，每一行开头先给你一个长度L，然后再跟上长度为L的数组a，最后一行给一个长度为n的c数组。然后现在有个空数组b，然后比方说，对于第一行，你把第一行的数组a加到b后面，然后这个动作执行 次。

举例：


```plaintext
3 9
3 1 3 2
1 3
2 4 3
1 3 2
```


我们的过程是： 

然后输出这个b数组中第k个数

### 题解


```cpp
void solve(){
    int n; ll k; cin >> n >> k;
    vector<vector<int>> a(n+1);
    vector<int> l(n+1);
    for(int i = 1;i <= n;++i){
        cin >> l[i];
        a[i].resize(l[i]+1);
        for(int j = 1;j <= l[i];++j) cin >> a[i][j];
    }
    vector<ll> c(n+1);
    for(int i = 1;i <= n;++i) cin >> c[i];

    for(int i = 1;i <= n;++i){
        ll tmp = c[i]*l[i];
        if(k <= tmp){
            ll idx = (k-1)%l[i]+1;
            cout << a[i][idx] << '\n';
            return;
        }else{
            k -= tmp;
        }
    }
    return;
}
```


这里总结一下一些要点：

- 对于k这种，不要上来就k -= x;，然后想着事后复原，最好是先判断，然后再else k -= x
- 对于取模运算：数组长度是l，k是要求找的第几个数

  0-based：`int idx = (k-1)%l`

  1-based：`int idx = (k-1)%l+1`

  减 1 减的是什么 为什么要减   减的是：起始下标（1），因为人类说“第 `k` 个”，是从 1 开始查数的但是 C++ 的取模运算符永远是从 **0** 开始的

  加 1 加的是什么 为什么要加   加的是：起始下标（1）， 取模运算 `(k - 1) % L` 跑完之后，吐出来的结果是一个 0-based（从0开始） 的下标（结果范围是 `0` 到 `L-1`）

  比方说：数据是从下标 `5` 开始存的，周期长度是 `L = 3`，那就是`idx = (k - 5) % 3 + 5;`

## 7. **D - Raise Minimum**

[门钥匙](https://atcoder.jp/contests/abc457/tasks/abc457_d)

### 口头表述

给一个长度为n的序列a（下标从1开始）和一个整数k。要求选择一个整数 ，将 加到 中，然后要求你最大化序列a中的最小值，当然你最多可以进行k次这样的操作

### 题解

这道题如果写得无脑一点，那就直接


```cpp
void solve(){
    int n; ll k; cin >> n >> k;
    priority_queue<pll,vector<pll>,greater<pll>> pq;
    for(int i = 1;i <= n;++i){
        ll x; cin >> x;
        pq.push({x,i});
    }

    while(k--){
        auto [x,i] = pq.top(); pq.pop();
        x += i;
        pq.push({x,i});
    }

    cout << pq.top().first << '\n';
    return;
}
```


但显而易见，直接TLE红牌罚下

所以我们要想有没有什么能改进一下，阿巴阿巴，没错，既然看到了最大化最小值字样，那就二分答案+判断函数

对于最大化最小值，我们可以反过来想，假设我希望序列的最小值至少是x，那我手里的k次操作够不够用，如果够，说明我们可以尝试更大的x，否则缩小x，而对于判断的功能，正是check函数要实现的：

1. 遍历原数组每一个元素，如果大于等于x，无需操作，反之，我们需要操作 次
2. 然后把所有次数加起来，如果总数超过k那return false，反之true


```cpp
void solve(){
    int n; ll k; cin >> n >> k;
    vector<ll> a(n+1);
    for(int i = 1;i <= n;++i) cin >> a[i];

    auto check = [&](ll x) -> bool {
        ll cnt = 0;
        for(int i = 1;i <= n;++i){
            if(a[i] < x){
                cnt += (x-a[i]+i-1)/i;
                if(cnt > k) return false;
            }
        }
        return true;
    };

    ll l = 1,r = 2e18,res = 0;
    while(l <= r){
        ll mid = l+(r-l)/2;
        if(check(mid)){
            l = mid+1;
            res = mid;
        }else{
            r = mid-1;
        }
    }

    cout << res << '\n';
    return;
}
```


如此下来，尽管范围有1e18+1e18\*2e5，二分最多60次

## 8. **C - Not Adjacent**

[门钥匙](https://atcoder.jp/contests/abc456/tasks/abc456_c)

### 口头表述

给你一个只包含字符a,b,c的字符串s，现在要求你统计s的所有非空子串中，有多少个子串满足没有两个相邻的字符相同

注意：字串是连续的部分；两个子串即使内容相同，只要字符串的下标不同，也算不同的子串；最终答案对998244353取模

例如，对字符串 `S = "aab"`：

- 非空子串有 `"a"`, `"a"`, `"b"`, `"aa"`, `"ab"`, `"aab"`
- `"aa"` 和 `"aab"` 不满足条件（有连续 `"a"`），其他子串满足。
- 所以答案是 3

### 题解

其实我们可以很容易就想到两层for循环枚举，外层i走每一个起点，内层j走每个点，但是毫无疑问，直接TLE。那么我们能怎么优化呢？滑动窗口，双指针。对于双for，我们的j每次都从i开始，但是双指针中，我们的j从上一次的j继续走，此时时间复杂度就是O(n)


```cpp
const int mod = 998244353;

void solve(){
    string s; cin >> s;
    int n = s.size();

    int res = 0;
    int j = 0;
    for(int i = 0;i < n;++i){
        if(j < i) j = i; //保证右指针不小于左指针
        while(j+1 < n && s[j+1] != s[j]) j++;
        res = (res+j-i+1)%mod;
    }

    cout << res << '\n';
    return;
}
```


这个滑动窗口是正着想着，当然我们也可以发过来想，固定右端点i，看有多少个合法子串以i结尾


```cpp
const int mod = 998244353;

void solve(){
    string s; cin >> s;
    int n = s.size();
    int len = 0,res = 0;

    for(int i = 0;i < n;++i){
        if(i == 0 || s[i] == s[i-1]) len = 1;
        else len++;

        res = (res+len)%mod;
    }

    cout << res << '\n';
    return;
}
```


比如字符串 s = “ababc”

i = 0，字符是 a，以 `s[0]` 结尾的合法子串只有a，所以：len = 1，ans += 1

i = 1，字符是 b，因为 s[1] != s[0]，所以 `b` 可以接在前面的合法段后面。原来以 `a` 结尾的最长合法段是 a。现在变成 ab。所以len = 2。以 `b` 结尾的合法子串有b ab，ans += 2

……

## 9. **D - Not Adjacent 2**

[门钥匙](https://atcoder.jp/contests/abc456/tasks/abc456_d)

### 口头描述

这道题与上道题的区别是，上道是子串，而这一道是子序列

### 题解

如果是连续的，那我们就能用双指针或滑动窗口统计。但现在是 两个字符之间可以跳过字符，那我们可以考虑使用动态规划

记 f(i,c)为：

- `i`：考虑前 `i` 个字符
- `c`：子序列最后一个字符是什么

而我们的转移方程则是`dp[i][S[i]] = sum(dp[i-1][y] for y != S[i]) + 1`

而最后答案是`sum(dp[n][a], dp[n][b], dp[n][c])`

举个例子，字符串 S = “aba”

1. 初始化

   
```plaintext
dp[0]['a'] = 1   // 选择第一个字符自己
dp[0]['b'] = 0
dp[0]['c'] = 0
```

2. i = 1, S[1] = ‘b’

   -  
     - 可以选：’b’（自己） 或者 ‘ab’（接在 ‘a’ 后）
   -  （不选当前字符）
   -  
3. i = 2, S[2] = ‘a’

   -  
     - 可以选：’a’（自己）、’ba’（接在 ‘b’ 后）、’aba’（接在 ‘b’ 后）
   -  （不选当前字符）
   -  
4. 结果

    

合法子序列：


```plaintext
'a', 'b', 'ab', 'ba', 'aba'
```


所以有：


```cpp
const int mod = 998244353;

void solve(){
    string s; cin >> s;
    int n = s.size();

    vector<vector<int>> dp(n+1,vector<int> (3,0));
    for(int i = 1;i <= n;++i){
        int id = s[i-1]-'a';
        for(int c = 0;c < 3;++c){
            dp[i][c] = dp[i-1][c];
        }

        int tmp = 0;
        for(int c = 0;c < 3;++c){
            if(c != id) tmp = (tmp+dp[i-1][c])%mod;
        }

        dp[i][id] = (dp[i][id]+tmp+1)%mod;
    }

    int res = 0;
    for(int c = 0;c < 3;++c){
        res = (res+dp[n][c])%mod;
    }

    cout << res << '\n';
    return;
}
```


当然，不难发现dp[i]只和dp[i-1]有关，所以我们依旧可以用滚动数组进行优化


```cpp
const int mod = 998244353;

void solve(){
    string s; cin >> s;
    int n = s.size();

    vector<int> dp(3,0);
    for(char ch : s){
        int id = ch-'a';
        int tmp = 0;
        for(int c = 0;c < 3;++c){
            if(c != id) tmp = (tmp+dp[c])%mod;
        }

        dp[id] = (dp[id]+tmp+1)%mod;
    }

    int res = 0;
    for(int c = 0;c < 3;++c){
        res = (res+dp[c])%mod;
    }

    cout << res << '\n';
    return;
}
```


## 10. **C - Vanish**

[门钥匙](https://atcoder.jp/contests/abc455/tasks/abc455_c)

### 口头表述

给你一个长度为n的数组a，你一共有k次操作机会。每次操作时，你可而已选择一个整数x，然后把数组里所有等于x的元素全部清零。要求，经过k次操作之后，让数组所有元素总和尽可能的小，并输出这个最小总和

### 题解


```cpp
void solve(){
    int n,k; cin >> n >> k;
    map<ll,ll> mp;

    ll sum = 0;
    for(int i = 0;i < n;++i){
        ll x; cin >> x;
        sum += x;
        mp[x]++;
    }

    vector<ll> tmp;
    tmp.reserve(n);
    for(auto &[x,cnt] : mp){
        tmp.push_back(x*cnt);
    }
    sort(tmp.begin(),tmp.end(),greater<ll>());

    ll res = 0;
    for(int i = 0;i < k && i < tmp.size();++i){
        res += tmp[i];
    }
    cout << sum-res << '\n';
    return;
}
```


思路简单，先统计出每个数字的贡献数，然后进行排序

当然，写的时候还是要注意，第20行的代码`i < tmp.size()`不要遗漏了，否则样例都过不了

那能不能再稍加优化下~~精益求精~~


```cpp
void solve(){
    int n,k; cin >> n >> k;
    unordered_map<ll,ll> mp;

    ll sum = 0;
    for(int i = 0;i < n;++i){
        ll x; cin >> x;
        sum += x;
        mp[x]++;
    }

    vector<ll> tmp;
    tmp.reserve(mp.size());
    for(auto &[x,cnt] : mp){
        tmp.push_back(x*cnt);
    }

    if(k >= (int)tmp.size()){
        cout << 0 << '\n';
        return;
    }
    nth_element(tmp.begin(),tmp.begin()+k,tmp.end(),greater<ll>());

    ll res = 0;
    for(int i = 0;i < k;++i){
        res += tmp[i];
    }
    cout << sum-res << '\n';
    return;
}
```


这一块把样例二的特判提出来了。当然，最明显的优化是排序函数，sort全排序是O(M log M)，nth\_element平均O(M)

用法是nth\_element(first,nth,last)，默认是从小到大，它只把第n个位置的元素放到排序后他应该在的位置，并保证他左边都不比它差，右边都不比它好，不过左右内部不排序

比如：


```cpp
vector<int> a = {5, 1, 9, 3, 7};
nth_element(a.begin(), a.begin() + 2, a.end());

而后，可能变成1 3 5 7 9 or 3 1 5 9 7，但不管怎么说，a[2]都是5，且左右关系满足
```


而要找贡献最大的k个，则可以通过`greater<int>()`来，执行后，前k个元素就是最大的k个，但他们内部不一定有序
