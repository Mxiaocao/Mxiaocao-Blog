---
title: "Team Weekly Contest 2026-5-10"
published: 2026-05-13
updated: 2026-06-08
description: "Team Weekly Contest 2026-5-10题目难度：AG -> J -> EBI -> LKHDCF A. Anxiety at the restaurantQues题意 Margot Finch goes out to eat. A lot. Like, way too much. Birthdays, Fridays, random Wednesdays —"
tags: []
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/13/Team-Weekly-Contest-2026-5-10/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "比赛复盘"
topic: "算法竞赛"
---

# Team Weekly Contest 2026-5-10

题目难度：AG -> J -> EBI -> LKHDCF

## A. Anxiety at the restaurant

### Ques

**题意**

Margot Finch goes out to eat. A lot. Like, way too much. Birthdays, Fridays, random Wednesdays — she always finds a reason. And every time, the same thing happens: everyone at the table does their own math, puts their money in the middle, and walks out like everything is fine.

It is never fine.

The waiter always catches her at the door. Every. Single. Time. “Hey, we’re still a little short.” And because Margot cannot handle the embarrassment, she pays the difference. But here’s the thing — paying the difference also makes her anxious. Now she’s the one who paid more than everyone else, and that’s awkward too. She replays the moment in her head the whole ride home.

And then one night she got home and realized the group had left the waiter zero tip. Zero pesos. The guy had been running back and forth all night. She thought about it for four days straight.

Look — Margot knows tips are not mandatory. She knows waiters should just earn a decent salary. She agrees! But her anxiety does not care about labor policy. If she doesn’t leave at least 10%, she will think about it for the next three days.

So now she wants a program. Something she can check before anyone stands up from the table. Something that tells her: are we good, or is this about to be a whole thing?

**Input**

The first line contains two integers N and M  : the number of items on the bill and the number of friends at the table (counting Margot).

The second line contains N integers  , the price of each item, rounded up to the nearest whole number.

The third line contains M integers  : the amount paid by Margot and her friends, also rounded up.

**Output**

If the total collected is greater than or equal to the bill plus 10% tip (rounded up), print “YES” meaning that all is good and Margot can relax

Otherwise, print: “NO” meaning that all is bad and Margot can’t relax.

**Examples**


```plaintext
5 4
180 250 120 300 150
200 180 150 220
```


```plaintext
NO
```


```plaintext
4 5
200 350 250 200
220 210 200 190 230
```


```plaintext
NO
```


```plaintext
3 3
300 350 250
350 400 260
```


```plaintext
YES
```


### Ans

**题解**

对于处理“向上取整”，为了尽量避免使用浮点数带来的精度误差，我们可以直接使用整数运算的向上取整技巧  ，故而在这道题处理这个10%，我们可以 


```cpp
void solve(){
    int n,m; cin >> n >> m;
    int a = 0,b = 0;
    for(int i = 0;i < n;++i){
        int x; cin >> x;
        a += x;
    }
    for(int i = 0;i < m;++i){
        int x; cin >> x;
        b += x;
    }
    cout << (a + (a+9)/10 <= b ? "YES" : "NO") << '\n';
    return;
}
```


## G. Gerald the mudcrab

### Ques

**题意**

Deep in the marshes of Vvardenfell, there is a mudcrab. Not just any mudcrab — the mudcrab. The one with 10,000 gold and nothing to sell. Travelers come from across Morrowind just to stare at him.

His name, as far as anyone can tell, is Gerald.

Gerald has recently decided to expand his business. He has acquired exactly N soul gems, each engraved with a number by some bored Telvanni wizard. A complete collection means having exactly one gem for each number from 1 to N no duplicates, no missing numbers. The order on the shelf doesn’t matter. Gerald just wants one of each.

The problem is the wizard was drunk. Some numbers were engraved twice. Some were skipped entirely. Gerald now has N soul gems, but the numbers are a mess.

Gerald can trade with a merchant in Balmora giving one of his gems for any other gem. But every trip through the swamp is exhausting, and Gerald, despite being a successful business-crab, would rather minimize travel.

Help Gerald figure out the minimum number of trades needed so that his collection contains exactly one gem of each number from 1 to N.

**Input**

The first line contains a single integer    : the number of soul gems Gerald owns.

The second line contains   integers  : the number engraved on each soul gem.

**Output**

Print a single integer: the minimum number of trades needed so that Gerald has exactly one gem for each number from   to  . The gems do not need to be in any particular order — Gerald just needs one of each.

**Examples**


```plaintext
5
1 2 3 4 5
```


```plaintext
0
```


```plaintext
5
1 1 2 4 4
```


```plaintext
2
```


```plaintext
3
3 2 2
```


```plaintext
1
```


### Ans

**题解**

就是很普通的去重，维护set即可


```cpp
void solve(){
    int n; cin >> n;
    set<int> s;
    for(int i = 0;i < n;++i){
        int x; cin >> x;
        s.insert(x);
    }
    cout << n-s.size() << '\n';
    return;
}
```


## J. Just the right enchantment

### Ques

**题意**

Seraphina Coldwater is the most celebrated pastry chef of the Arcane Confectionery Guild. Her legendary cakes are not merely delicious — they are magical. Each cake requires exactly three ingredients, chosen from her enchanted pantry, where every ingredient is labeled with an enchantment level from 1 to N.

However, Seraphina is a perfectionist. She insists that a cake is only worth baking if its total enchantment — the sum of the three chosen ingredients’ levels — is an even number. An odd total, she claims, makes the frosting curdle and the candles flicker in an unsettling fashion.

Being a meticulous record-keeper, Seraphina wants to know exactly how many distinct valid combinations she can bake. Since she respects each ingredient’s individuality, she always picks three different ingredients, and she considers two selections identical if they contain the exact same trio regardless of order.

Given the size of her pantry N, help Seraphina count the number of valid triples   with   such that   is even.

As pantries can grow astronomically large, the answer may be an enormous number. Seraphina’s enchanted ledger can only record values modulo   — print the answer modulo  .

**Input**

The first line contains a single integer    , the number of pantry configurations Seraphina wishes to evaluate.

Each of the next   lines contains a single integer    , the number of ingredients available.

**Output**

For each test case, print a single integer — the number of valid magical cake combinations, modulo  .

**Examples**


```plaintext
3
3
4
7
```


```plaintext
1
2
19
```


```plaintext
2
100
1000
```


```plaintext
80850
83083500
```


```plaintext
1
3
```


```plaintext
1
```


### Ans

**初始思路**

确实照着模拟了几组数据，感觉是dp，又感觉要分类讨论，但看来十分钟没看出来

**题解**

三个整数之和为偶数的情况只有以下两种互斥的情形：

- 三个整数全是偶数
- 一个整数是偶数，两个整数是奇数

设e为[1,N]中偶数的总数，o为奇数的总数，则 

故而我们最终只需要输出  ，即 

为避免潜在的数值溢出问题，我们可以利用6和2对 的乘法逆元进行组合数学运算


```cpp
using ll = long long;
constexpr ll mod = 1e9+7;
constexpr ll inv2 = 500000004;
constexpr ll inv6 = 166666668;

void solve(){
    ll n; cin >> n;
    ll e = n/2;
    ll o = n-e;
    ll r1 = 0;
    if(e >= 3){
        r1 = e * (e-1) % mod;
        r1 = r1 * (e-2) % mod;
        r1 = r1 * inv6 % mod;
    }
    ll r2 = 0;
    if(e >= 1 && o >= 2){
        r2 = o * (o-1) % mod;
        r2 = r2 * inv2 % mod;
        r2 = r2 * e % mod;
    }
    cout << (r1 + r2) % mod << '\n';
    return;
}
```


## E. Erasmus Valthron

### Ques

**题意**

Erasmus Valthorn is the Chief Archivist of the Celestial Library of Numeris — a vast hall where every integer from 1 to N exists as a physical tome, its spine engraved with the number it represents.

After decades of cataloguing by mere numeric order, Erasmus has grown restless. He believes that numbers have a true identity — not their face value, but their prime essence: the sorted sequence of prime factors that compose them.

He calls this the Canonical Form of a number. For example:

 

 

Erasmus now wishes to rearrange all tomes according to their Canonical Form, sorted lexicographically. Under this order, the tome of 48 precedes the tome of 9, since the first element of its sequence — 2 — is less than 3.

The number 1, having no prime factors, is represented by the empty sequence [ ], which is lexicographically smallest of all, and thus occupies the very first shelf.

However, Erasmus is old and forgetful. He keeps losing track of where specific tomes end up in the new arrangement. He has written down Q questions — each asking: “In this new order, which number sits at position K?”

Help Erasmus answer his queries before the next lunar eclipse!

**Input**

The first line contains two integers   and    , the number of tomes in the library and the number of queries Erasmus has written down.

Each of the next   lines contains a single integer    , a position in the sorted arrangement.

**Output**

For each query, print a single integer — the number occupying position   in Erasmus’s new ordering.

**Examples**


```plaintext
10 10
1
2
3
4
5
6
7
8
9
10
```


```plaintext
1
2
4
8
6
10
3
9
5
7
```


```plaintext
10 4
1
4
7
10
```


```plaintext
1
8
3
7
```


```plaintext
5 1
5
```


```plaintext
5
```


### Ans

**初始思路**

刚开始不知道怎么想的，想到了字典树，然后让每个节点存它的质数因子，其实也就是dfs。后来队友又分享了一种顺序表的方式，但是我怎么都实现不了（代码能力太弱了）

**题解**

然后发现我这个居然可以写。

如果将数字1视为空序列 []，并作为一棵树的根节点，我们可以用以下规则生成其他数：

从任意节点u出发，我们可以通过乘以一个质数p来生成它的子节点 ，而为保证质因数序列是非递减的，我们每次乘上的质数p必须大于等于u当前最大的质因数。dfs这块，for循环遍历质数时，一旦遇到 ，就break掉。

至于质因数，欧拉筛O(n)写掉


```cpp
void solve(){
    int n,q; cin >> n >> q;

    vector<char> is_prime(n+1,1);
    vector<int> primes;
    is_prime[0] = is_prime[1] = 0;
    for(int i = 2;i <= n;++i){
        if(is_prime[i]){
            primes.push_back(i);
        }
        for(int p : primes){
            if(i*p > n) break;
            is_prime[i*p] = 0;
            if(i%p == 0) break;
        }
    }

    vector<int> res;
    res.reserve(n);
    auto dfs = [&](auto&& self,int u,int p_idx) -> void{
        res.push_back(u);
        for(int i = p_idx;i < (int)primes.size();++i){
            ll v = (ll)u * primes[i];
            if(v > n) break;
            self(self,v,i);
        }
    };
    dfs(dfs,1,0);
    while(q--){
        int x; cin >> x;
        cout << res[x-1] << '\n';
    }
    return;
}
```


注意，如果`ll v = (ll)u * primes[i];`写成了int，那就会MLE ~~和溢位~~

## I. Inner Product

### Ques

**题意**

You are given a sequence of positive integers   and a string   of length  .

For each   from   to  :

- if $s*i \text{ is equal to } \lt  b\_i \lt b*{i + 1}$;
- if $s*i \text{ is equal to } = b\_i = b*{i + 1}$;
- if $s*i \text{ is equal to } \gt  b\_i \gt b*{i + 1}$.

Your task is to choose a sequence of positive integers   satisfying all these relations.

Among all valid sequences, minimize


$$
a_1 b_1 + a_2 b_2 + \dots + a_n b_n.
$$


For the given constraints, it can be proved that the optimal sequence is unique.

**Input**

The first line contains one integer   ( ).

The second line contains   integers   ( ).

The third line contains a string   of length  , consisting only of the characters <, \=, and >.

**Output**

Print the minimum possible value of


$$
a_1 b_1 + a_2 b_2 + \dots + a_n b_n
$$


in the first line.

In the second line, print the unique optimal sequence  .

It can be proved that, for the given constraints, the minimum value always fits in a signed  -bit integer.

**Examples**


```plaintext
6
3 1 4 1 5 9
<=>><
```


```plaintext
43
1 3 3 2 1 2
```


```plaintext
2
2 7
<
```


```plaintext
16
1 2
```


```plaintext
8
8 2 2 8 3 7 4 6
=<<=>>=
```


```plaintext
71
1 1 2 3 3 2 1 1
```


**Note**

The first sample requires


$$
b_1 \lt b_2 = b_3 \gt b_4 \gt b_5 \lt b_6.
$$


The sequence   satisfies all relations, and its cost is


$$
3 \cdot 1 + 1 \cdot 3 + 4 \cdot 3 + 1 \cdot 2 + 5 \cdot 1 + 9 \cdot 2 = 43.
$$


### Ans

**初始思路**

可以想一想，其实a和b是独立的，我们不用为了a去考虑b，因为b的最优情况是唯一的，所以我们只需要考虑怎么排b。

刚开始就想着纯模拟，把这个当成一个个山峰和谷地，先建立height数组，设第一个点的高度为1，再根据大于小于等于号把整个地形跑一变，再让总体加上(1-最小值)，这点是为了让这里面的最低点是1，而不是大于1的数，或者负数。然后再来个边界特判，如果第一个符号是<号，那就让最左边的点高度降到最低，右边也同理。但是，这个思路WA8。队友的思路是拓扑排序，不过WA9。

**题解**

我们考虑为什么原先的算法不行，因为我们建立这个height数组时，遇到<就+1，遇到>就-1，这相当于给所有的数都固定了，而后，又为了把最低点从负数拉回1，而进行全局平移，这个会导致那些正常的数字，也被拉到空中。这显然不对。所以，在原来的一次扫描的基础上，这道题我们可以采用左右两次扫描的想法，这样不仅避免了原先小于0的部分，也避免了后续的全局平移。


```cpp
void solve(){
    int n; cin >> n;
    vector<ll> a(n);
    for(int i = 0;i < n;++i) cin >> a[i];
    string s; cin >> s;

    vector<int> l(n,1),r(n,1);
    for(int i = 1;i < n;++i){
        if(s[i-1] == '<') l[i] = l[i-1]+1;
        else if(s[i-1] == '=') l[i] = l[i-1];
        else l[i] = 1;
    }

    for(int i = n-2;i >= 0;--i){
        if(s[i] == '>') r[i] = r[i+1]+1;
        else if(s[i] == '=') r[i] = r[i+1];
        else r[i] = 1;
    }

    ll res = 0;
    vector<ll> b(n);
    for(int i = 0;i < n;++i){
        b[i] = max(l[i],r[i]);
        res += b[i] * a[i];
    }
    cout << res << '\n';
    for(int i = 0;i < n;++i){
        cout << b[i] << (i == n-1 ? '\n' : ' ');
    }
    
    return;
}
```


那为什么左右扫描后取最大值就是真实的值了呢？

我们要从两个方向出发

- 为什么取max

  一个数字 ，同时受到左边和右边的双重约束

  l数组表示不违反左边的所有规则，这个数字最少最少要是几

  r数组表示不违反右边的所有规则，这个数字最少最少要是几

  显然，为了满足这两个底线，我们只有取两者里的最大值
- 为什么拔高一侧，不会影响另一侧

  比如：A < B > C > D > E

  对B来说，L是2，R是4，取最大值让B变成4后，再回看左侧，发现他更加正确了。

## B. Bad LaTeX

### Ques

**题意**

Tomorrow is the Gran Premio de Mexico 2026 Primera Fecha, and you are in a hurry to finish setting all the problems for tomorrow’s contest. Since two heads are better than one, you asked your friend Jimbo to help you out with the statements of the problems. However, this quote didn’t end up being true — Jimbo wrote the statements but without respecting some writing style rules!

For an easier read, you want to ensure that the following rules are held:

- If an integer value is a power of   with   zeros, you write them as a power of   instead of its whole representation.

  For example, if Jimbo wrote  , then you must transform it to   **in LaTeX**, so the final text would be 10^{9}.
- If an integer value ends with   zeros, you write them in an special scientific notation: You write a truncated real equivalent of the value with only 1 digit in the integral part and then multiply this real by the corresponding power of ten.

  For example, if Jimbo wrote  , then you must transform it to   **in LaTeX**, so the final text would be 1.234\cdot10^{8}
- These rules only apply to **integers that are not subscripts or superscripts or affected by any of them**. Any other value is kept as it is.

Since you are very tired from setting up the solutions, validators and testcases, you will automatize this process by writing a program that applies these rules on the statements.

**Input**

The first line of input contains an integer   ( ) — The number of lines of a given statement.

The following   lines of input contain a string $s*{i} 1 \leq |s*{i}| \leq 1000 i i$-th line of the given statement.

It is guaranteed that the statement will only consist of letters (could be in lowercase or uppercase), digits, spaces and special symbols (!?.,;$#^{}\_=+\*) and there won’t be any leading or trailing space. Consider that if a line ends with an integer and the next one starts with an integer, these two are not part of the same value.

**Output**

Print   lines — The  -th line must contain the  -th line of the statement after applying the rules.

**Example**


```plaintext
4
This example shows a value
Of 1000000000 without being compressed to 10^{9}
Which is annoying when read. $ S_{10} = 2^{100000} + 780000 $
My ID is RA180000 but that was back in the year 20000
```


```plaintext
This example shows a value
Of 10^{9} without being compressed to 10^{9}
Which is annoying when read. $ S_{10} = 2^{100000} + 7.8\cdot10^{5} $
My ID is RA180000 but that was back in the year 2\cdot10^{4}
```


### Ans

在编写Latex功能的时候，我们要先思考下：

1. 什么时候这个数字被保护起来 不能动了

   拿到一行字符串后，只要看到 \_ 或者 ^ ，就把受影响的地方保护起来：当然，如果后面跟着 { ，那就保护一个代码块，否则就保护后面那一个数字

   
```cpp
int len = s.length();
vector<bool> ok(len,0);

for(int i = 0;i < len;++i){
    if(s[i] == '_' || s[i] == '^'){
        //碰到空格就跳过
        int j = i+1;
        while(j < len && s[j] == ' ') j++;
        
        if(j < len && s[i] == '{'){
        	int depth = 1;
        	ok[j] = true;
        	int k = j+1;
            //处理下大括号内的所有字符
            while(k < len && depth > 0){
                ok[k] = 1;
                if(s[k] == '{') depth++;
                if(s[k] == '}') depth--;
                k++;
            }
    	}else if(j < len){
            ok[j] = 1;
        }
    }
}
```

2. 此时已经找到了保护区，于是我们要开始扫描数字并进行替换

   从头到尾扫一遍字符串，如果遇到数字就把整串都抠出来，如果既不受保护，又不紧挨字母，那就是合法独立大数字，此时只需进行压缩即可

   
```cpp
string res = "";
for(int i = 0;i < len;){
    if(isdigit(s[i])){
        //把一整串抠出来
        int j = i;
        while(j < len && isdigit(s[j]) j++;
        string num = s.substr(i,j-1);
        
        bool ok1 = ok[i];
        bool ok2 = 0;
        if(i > 0 && isalpha(s[i-1])) ok2 = 1;
        if(j < len && isalpha(s[j])) ok2 = 1;
        
        if(!ok1 && !ok2) res += run(num);
        else res += num
              
        i = j;
    }else{
        res += s[i];
        i++;
    }
}
cout << res << '\n';
```


于是我们就得到了solve函数，停，压缩的函数还没写呢

1. 拿到一个字符串数字，我们首先要把前面没用的0去掉，而同时，如过去掉后 发现字符串空了，说明是纯0，此时直接退出就行

   
```cpp
int start = 0;
while(start < s.length() && s[start] == '0') start++;
if(start = s.length()) return s;
string res = s.substr(start);
```

2. 拿到数字后，题目要求后缀0大于等于4才可以压缩，所以我们需要从后往前数

   
```cpp
int len = res.length();
int cnt0 = 0;
for(int i = len-1;i >= 0;--i){
    if(res[i] == '0') cnt0++;
    else break;
}
```

3. 开始变形

   
```cpp
if(cnt0 > 4){
    int power = len-1;
    if(res[0] == '1' && cnt0 = power){
        return "10^{" + to_string(power) + "}";
    }else{
        string ress = "";
        ress += res[0];
        string ss = res.substr(1,len-1-cnt0);
        if(!ss.empty()) res += "."+ss;
        ress += "\\cdot10^{" + to_string(power) + "}";
        return ress;
    }
}
return s;
```


阿巴阿巴，我要告诉你的是，上面的都是错的

法一：


```cpp
#include <bits/stdc++.h>
#define code using
#define by namespace
#define Mxiaocao std
code by Mxiaocao;

using ll = long long;

string run(string s){
    int start = 0;
    while(start < s.length() && s[start] == '0') start++;
    if(start == s.length()) return s;
    string res = s.substr(start);

    int len = res.length();
    int cnt0 = 0;
    for(int i = len-1; i >= 0; --i){
        if(res[i] == '0') cnt0++;
        else break;
    }

    if(cnt0 >= 4){
        int power = len-1;
        if(res[0] == '1' && cnt0 == power){
            return "10^{" + to_string(power) + "}";
        }else{
            string ress = "";
            ress += res[0];
            string ss = res.substr(1, len-1-cnt0);
            if(!ss.empty()) ress += "."+ss;
            ress += "\\cdot10^{" + to_string(power) + "}";
            return ress;
        }
    }
    return s;
}

void solve(){
    int n; cin >> n;
    cin.ignore();
    string s = "";
    for(int i = 0; i < n; ++i){
        string line; getline(cin, line);
        s += line;
        if(i != n-1) s += '\n';
    }

    int len = s.length();
    vector<bool> ok(len, 0);

    for(int i = 0; i < len; ++i){
        if(s[i] == '_' || s[i] == '^'){
            ok[i] = 1;
            
            int j = i+1;
            while(j < len && (s[j] == ' ' || s[j] == '\n')) j++;
            
            if(j < len){
                if(s[j] == '{'){
                    int depth = 1;
                    ok[j] = 1;
                    int k = j+1;
                    while(k < len && depth > 0){
                        ok[k] = 1;
                        if(s[k] == '{') depth++;
                        if(s[k] == '}') depth--;
                        k++;
                    }
                } else if(isdigit(s[j])){
                    int k = j;
                    while(k < len && isdigit(s[k])){
                        ok[k] = 1;
                        k++;
                    }
                } else {
                    ok[j] = 1;
                }
            }

            int l = i-1;
            while(l >= 0 && (s[l] == ' ' || s[l] == '\n')) l--;
            
            if(l >= 0){
                if(s[l] == '}'){
                    int depth = 1;
                    ok[l] = 1;
                    int k = l-1;
                    while(k >= 0 && depth > 0){
                        ok[k] = 1;
                        if(s[k] == '}') depth++;
                        if(s[k] == '{') depth--;
                        k--;
                    }
                } else if(isdigit(s[l])){
                    int k = l;
                    while(k >= 0 && isdigit(s[k])){
                        ok[k] = 1;
                        k--;
                    }
                } else {
                    ok[l] = 1;
                }
            }
        }
    }

    string res = "";
    for(int i = 0; i < len;){
        if(isdigit(s[i])){
            int j = i;
            while(j < len && isdigit(s[j])) j++;
            string num = s.substr(i, j-i);
            
            bool ok1 = 0;
            for(int k = i; k < j; ++k){
                if(ok[k]){
                    ok1 = 1;
                    break;
                }
            }
            
            bool ok2 = 0;
            if(i > 0 && isalpha(s[i-1])) ok2 = 1;
            if(j < len && isalpha(s[j])) ok2 = 1;
            if(i > 0 && s[i-1] == '.') ok2 = 1;
            if(j < len && s[j] == '.' && j+1 < len && isdigit(s[j+1])) ok2 = 1;
            
            if(!ok1 && !ok2) res += run(num);
            else res += num;
                
            i = j;
        }else{
            res += s[i];
            i++;
        }
    }
    cout << res << '\n';
}

signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t = 1;
    while(t--){
        solve();
    }
    return 0;
}
```


法二：


```cpp
#include <bits/stdc++.h>
#define code using
#define by namespace
#define Mxiaocao std
code by Mxiaocao;

using ll = long long;

string run(string s){
    if(s.empty()) return s;
    if(s[0] == '0') return s;

    int len = s.length();
    int cnt0 = 0;
    for(int i = len-1; i >= 0 && s[i] == '0'; --i){
        cnt0++;
    }

    if(cnt0 < 4) return s;

    int power = len-1;
    bool ok10 = (s[0] == '1');
    for(int i = 1; i < len; ++i){
        if(s[i] != '0'){
            ok10 = 0;
            break;
        }
    }

    if(ok10){
        return "10^{" + to_string(power) + "}";
    }

    string res = "";
    res += s[0];
    string ss = s.substr(1, len-1-cnt0);
    if(!ss.empty()) res += "." + ss;
    res += "\\cdot10^{" + to_string(power) + "}";
    return res;
}

void solve(){
    int n;
    cin >> n;
    cin.ignore();

    vector<string> v(n);
    for(int i = 0; i < n; ++i) getline(cin, v[i]);

    for(string s : v){
        int len = s.length();
        vector<int> match(len, -1);
        vector<int> stk;

        for(int i = 0; i < len; ++i){
            if(s[i] == '{') stk.push_back(i);
            else if(s[i] == '}' && !stk.empty()){
                int j = stk.back();
                stk.pop_back();
                match[i] = j;
                match[j] = i;
            }
        }

        vector<int> diff(len + 1, 0);
        auto add = [&](int l, int r){
            if(l < 0 || r < 0 || l >= len || r >= len || l > r) return;
            diff[l]++;
            diff[r+1]--;
        };

        for(int i = 0; i < len; ++i){
            if(s[i] != '_' && s[i] != '^') continue;

            add(i, i);

            // 保护右侧目标
            int r = i+1;
            while(r < len && s[r] == ' ') r++;
            if(r < len){
                if(s[r] == '{' && match[r] != -1) add(r, match[r]);
                else if(isdigit(s[r])){
                    int rr = r;
                    while(rr < len && isdigit(s[rr])) rr++;
                    add(r, rr-1);
                }else add(r, r);
            }

            // 保护左侧目标 (base)
            int l = i-1;
            while(l >= 0 && s[l] == ' ') l--;
            if(l >= 0){
                if(s[l] == '}' && match[l] != -1) add(match[l], l);
                else if(isdigit(s[l])){
                    int ll = l;
                    while(ll >= 0 && isdigit(s[ll])) ll--;
                    add(ll+1, l);
                }else add(l, l);
            }
        }

        vector<bool> bad(len, 0);
        int cur = 0;
        for(int i = 0; i < len; ++i){
            cur += diff[i];
            bad[i] = (cur > 0);
        }

        string res = "";
        for(int i = 0; i < len;){
            if(!isdigit(s[i])){
                res += s[i];
                i++;
                continue;
            }

            int j = i;
            while(j < len && isdigit(s[j])) j++;
            string num = s.substr(i, j-i);

            bool ok = 0; // ok 标记为 1 时说明被污染，不能压缩
            for(int k = i; k < j; ++k){
                if(bad[k]){
                    ok = 1;
                    break;
                }
            }

            if(i > 0 && isalpha(s[i-1])) ok = 1;
            if(j < len && isalpha(s[j])) ok = 1;
            // 拦截包含小数的实数
            if(i > 0 && s[i-1] == '.') ok = 1;
            if(j < len && s[j] == '.' && j+1 < len && isdigit(s[j+1])) ok = 1;

            if(ok) res += num;
            else res += run(num);

            i = j;
        }
        cout << res << '\n';
    }
}

signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    solve();
    return 0;
}

// using i64 = long long;
// #define int i64
// #define endl "\n"
```
