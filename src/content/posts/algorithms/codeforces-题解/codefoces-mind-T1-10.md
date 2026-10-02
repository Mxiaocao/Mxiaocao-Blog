---
title: "codefoces mind (T1-10)"
published: 2026-05-14
updated: 2026-05-14
description: "codefoces mind (T1-10)1. The 67th XOR Problem（1200）（binary search）（bitmasks）（brute force） Ques门钥匙 题意 You are given an array , initially containing non-negative integers. You perform the following op"
image: "/img/2.jpg"
tags: []
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/14/codefoces-mind-T1-10/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "codeforces-题解"
topic: "算法竞赛"
---

# codefoces mind (T1-10)

## 1. The 67th XOR Problem（1200）

（binary search）（bitmasks）（brute force）

### Ques

[门钥匙](https://codeforces.com/problemset/problem/2218/E)

**题意**

You are given an array  , initially containing   non-negative integers.

You perform the following operation exactly   times:

1. Select an index   of   ( , where   denotes the current length of  ). Let  .
2. Set   for all  , where   denotes the [bitwise XOR operation](https://en.wikipedia.org/wiki/Bitwise_operation#XOR).
3. Remove   from the array.

It can be shown that after   operations, exactly one element remains in the array. Your task is to determine the maximum possible value of this final remaining element if you perform the operations optimally.

**输入**

每个测试包含多个测试用例。第一行包含测试用例的数量   (   )。测试用例说明如下。

每个测试用例的第一行都包含一个整数   (   ) - 数组的初始长度。

每个测试用例的第二行包含   个整数   (   ) - 数组的元素。

保证所有测试用例中   的总和不超过   。

**输出**

对于每个测试用例，输出一个整数 - 最终元素的最大可能值。

**样例**


```plaintext
3
2
67 67
3
1 2 3
10
67 667 167 867 267 467 367 567 767 967
```


```plaintext
0
3
1012
```


**注**

在第二个测试案例中，数组为   。一个最佳的操作顺序是

1. 选择元素   。删除它。其余元素变为   。
2. 选择元素   。将其删除。剩余元素变为   。

最终值为   。

### Ans

**初始思路**

看样例，感觉是先排序，然后从大往小依次遍历过去。然后数据量比较有意思，应该是两个for循环


```cpp
void solve(){
    int n; cin >> n;
    vector<int> a(n);
    for(int i = 0;i < n;++i) cin >> a[i];

    sort(a.begin(),a.end());
    for(int i = n-1;i >= 0;--i){
        for(int j = 0;j < i;++j){
            a[j] ^= a[i];
        }
    }
    cout << a[0] << '\n';

    return;
}
```


但是样例一就WA了

**题解**

#### 法一

首先，异或有个很重要的性质： 

现在我们有个数组 ，然后我们现在从左到右执行操作，看看数组最后是怎么变化的

第一次操作： 

第二次操作： 

 

我们发现，此时这个新数组与 无关。也就是说，每进行两次操作，第一次操作中选的元素值都不再重要。进一步地，进行三次操作时，前两次选的元素都不重要。

归纳可得：真正影响的只有两件事

1. 最后一次操作选中的元素（记为 x）
2. 从未被选中过的元素（记为 y）

最终数组只剩一个值，为 x ⊕ y。

而由于n较小，直接暴力枚举所有 (x, y) 对即可。最终输出所有数对中 a[x] ⊕ a[y] 的最大值即可。


```cpp
void solve(){
    int n; cin >> n;
    vector<int> a(n);
    for(int i = 0;i < n;++i) cin >> a[i];

    sort(a.begin(),a.end());
    int res = 0;
    for(int i = 0;i < n;++i){
        for(int j = i+1;j < n;++j){
            res = max(res,a[j]^a[i]);
        }
    }
    cout << res << '\n';

    return;
}
```


#### 法二

但是如果数据量很大呢，总不能万事都暴力吧。而这种题就是经典的“最大两数异或”问题，复杂度仅用O(n\*B)。(B是位数，int通常是31or 32)

可选用两种高效做法：

01-Trie（二进制字典树） or 按位贪心+哈希集合

不过01-Trie稳定好写

1. 先建立节点

   ch[0]表示走到bit为0的儿子下标，ch[1]表示走到bit为1的儿子下标，-1表示边不存在

   
```cpp
struct node{
    int ch[2];
    node(){ ch[0] = ch[1] = -1;}
};
```

2. 建立节点数组

   初始的trie[0]是根节点，后续再加新节点就emplace\_back()，索引代表节点编号

   
```cpp
vector<node> trie(1);
```

3. 创建插入函数

   把数字x插入Trie时，从最高位b=30到最低位b=0，先通过`bit = (x >> b) & 1`取第b位，如果当前节点没有这条边，就新建节点，同时，让p走到对应的儿子，继续下一位的操作

   
```cpp
auto insert = [&](int x){
    int p = 0;
    for(int b = 30;b >= 0;--b){
        int bit = (x >> b)&1;
        if(trie[p].ch[bit] == -1){
            trie[p].ch[bit] = (int)trie.size();
            trie.emplace_back();
        }
        p = trie[p].ch[bit];
    }
};
```

4. 创建查询函数

   在已插入的数里，要想找到一个y使得x^y最大，那就要优先走x的反位

   设当前走到第b位：

   `bit = (x>>b)&1；`

   `want = bit^1；`

   如果trie有want这条边：

   - 说明这一位可以异或出1
   - 此时执行`res |= (1<<b)`，把答案的第b位设为1
   - 沿着这条边继续走下去

   如果没有want这条边：

   - 这一位异或为0
   - res不变
   - 只能走同位边
```plaintext
eg:
Trie 里有 {1,2}，查询 x=3。

  二进制（只看3位）：

  - 1 = 001
  - 2 = 010
  - x = 3 = 011

  Trie 树：

  (根)
   └─0→ A
       ├─0→ B
       │   └─1→ C      (路径 0-0-1，对应数字 1)
       └─1→ D
           └─0→ E      (路径 0-1-0，对应数字 2)

  query_max_xor(3=011) 从高位到低位走：

  1. b=2，x这一位是 0，想走 1（反位）
      - 根没有 1 边，只能走 0 到 A
      - 这一位异或是 0，res 不变
  2. b=1，x这一位是 1，想走 0（反位）
      - A 有 0 边，走到 B
      - 这一位异或是 1，res += 2^1
  3. b=0，x这一位是 1，想走 0（反位）
      - B 没有 0 边，只能走 1 到 C
      - 这一位异或是 0

  最终：
  - 走到的数是路径 001，也就是 y=1
  - x ^ y = 3 ^ 1 = 2
  - res=2
```



```cpp
auto query = [&](int x){
    int p = 0,res = 0;
    for(int b = 30;b >= 0;--b){
        int bit = (x>>b)&1;
        int want = bit^1;
        if(trie[p].ch[want] != -1){
            res |= (1<<b);
            p = trie[p].ch[want];
        }else{
            p = trie[p].ch[bit];
        }
    }
    return res;
};
```


**综合代码**


```cpp
struct node{
    int ch[2];
    node(){ ch[0] = ch[1] = -1; }
};

void solve(){
    int n; cin >> n;
    vector<int> a(n);
    for(int i = 0;i < n;++i) cin >> a[i];

    vector<node> trie(1);
    auto insert = [&](int x){
        int p = 0;
        for(int b = 30;b >= 0;--b){
            int bit = (x >> b) & 1;
            if(trie[p].ch[bit] == -1){
                trie[p].ch[bit] = (int)trie.size();
                trie.emplace_back();
            }
            p = trie[p].ch[bit];
        }
    };

    auto query = [&](int x){
        int p = 0,res = 0;
        for(int b = 30;b >= 0;--b){
            int bit = (x >> b) & 1;
            int want = bit ^ 1;
            if(trie[p].ch[want] != -1){
                res |= (1 << b);
                p = trie[p].ch[want];
            }else{
                p = trie[p].ch[bit];
            }
        }
        return res;
    };
    
    int res = 0;
    insert(a[0]);
    for(int i = 1;i < n;++i){
        res = max(res,query(a[i]));
        insert(a[i]);
    }
    cout << res << '\n';
    return;
}
```


## 2. The 67th OEIS Problem（1100）

（constructive algorithms）（greedy）（math）（number theory）

### Ques

[门钥匙](https://codeforces.com/problemset/problem/2218/D)

**题意**

Construct a sequence   containing   integers such that $\operatorname{gcd}(a*i, a*{i+1}) ^{\text{†}} 1 \leq i \leq n - 1 a$ exists.

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The following   lines contain one integer   ( ) — the desired length of the sequence.

It is guaranteed the sum of   over all test cases does not exceed  .

**Output**

For each query, output your answer — a sequence   of   space-separated integers ( ).

**Example**


```plaintext
2
3
5
```


```plaintext
1 6 2
134 67 69 207 414
```


**Note**

In the first test case, the sequence   is a possible answer. This is because   is not equal to  .

In the second test case, the sequence   is a possible answer. This is because the values of $\gcd(a*i, a*{i+1}) i 1 n-1 67 1 69 207$.

### Ans

**初始思路**

感觉跟质数有点关系，倒是在想，7 14 28 56，这样子gcd是不同的


```cpp
void solve(){
    int n; cin >> n;
    ll res = 7;
    while(n--){
        cout << res << ' ' << '\n';
        res *= 2;
    }
    cout << '\n';
    return;
}
```


但是样例二WA了

所以哪错了呢？当n接近1e4时，7\*2^(n-1)远超1e18，直接爆范围

**题解**

我们的目标是让相邻的$\gcd(a*i,a*{i+1}) (n-1)$个不同gcd值

考虑先构造一个辅助序列$b = [b*1,b\_2,…,b*{n+1}]$

再定义${a*i = b\_i·b*{i+1}} $

即$a = [b*1·b\_2,b\_2·b\_3,…,b\_n·b*{n+1}]$

 

此时$\gcd(a*i,a*{i+1}) = \gcd(b*i·b*{i+1},b*{i+1}·b*{i+2}) = \gcd(b*i,b*{i+2})·b\_{i+1}$

而此时，若保证对所有的i，都有$\gcd(b*i,b*{i+2})=1 b*{i+1},b*{i+2},…$，而只要这些值互不相同，题目条件就满足了

而此时有两种实现方法

$\left{
 
\right.$

下面给出第二个实现方式


```cpp
void solve(){
    int n; cin >> n;
    for(int i = 3;i <= 2*n+1;i += 2){
        cout << i*(i+2) << ' ';
    }
    cout << '\n';
    return;
}
```


## 3. Mickey Mouse Constructive（1100）

（constructive algorithms）（dp）（greedy）（math）

### Ques

[门钥匙](https://codeforces.com/problemset/problem/2211/B)

**题意**

Given an array  , let   be the number of ways to partition   into one or more subarrays  such that:

- Each element appears in exactly one subarray.
- All subarrays have the same sum.

For example, if  , then  , because there are two such ways to partition  :

-  , where the only subarray has sum  .
-  , where both subarrays have sum  .

You are given two integers   and  . Find the minimum value of   over all arrays   of length  , consisting of   copies of the number  , and   copies of the number   in some order. Since this answer may be large, output the answer modulo  . Additionally, you should construct one array that achieves this minimal value.

 An array   is a subarray of an array   if   can be obtained from   by the deletion of several (possibly, zero or all) elements from the beginning and several (possibly, zero or all) elements from the end.

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains two integers   and   ( ). It is guaranteed that  .

It is guaranteed that the sum of   over all test cases does not exceed  , and the sum of   over all test cases does not exceed  .

**Output**

For each test case, output two lines: the minimum value of   over all valid arrays   modulo  , and an example of an array that achieves the minimal result. Note you are minimizing  , and taking that minimum value modulo  , not finding the minimal possible result of   mod  .

**Example**


```plaintext
4
2 0
1 1
6 7
1 3
```


```plaintext
2
1 1
1
1 -1
1
-1 1 -1 1 -1 1 -1 1 -1 1 -1 1 -1
2
-1 -1 -1 1
```


**Note**

In the first test case,   and  . The only possible array is  , with   as explained above.

In the second case,   and  . One possible array that minimizes   is  , where   (as the only way to partition into subarrays with all subarrays having equal sum is  ).

### Ans

**初始思路**

研究样例，猜一下先全部输出-1，再输出剩下的1

**题解**

1. 如果x=y，那么最小值是1
2. 如果 ，那么最小值是这个a的因子个数

对于最终的构造数列，先输出-1，再输出1~~（当然也可以对调）~~

（题解不会写）


```cpp
const int mod = 676767677;

int run(int x){
    int res = 0;
    for(int i = 1;i*i <= x;++i){
        if(x % i == 0){
            res++;
            if(i*i != x) res++;
        }
    }
    return res;
}

void solve(){
    int x,y; cin >> x >> y;
    if(x == y){
        cout << 1 << '\n';
    }else{
        cout << run(abs(x-y))%mod << '\n';
    }
    
    for(int i = 1;i <= y;++i){
        cout << "-1" << ' ';
    }
    for(int i = 1;i <= x;++i){
        cout << "1" << ' ';
    }
    cout << '\n';
    return;
}
```


## 4. Flipping Binary String（1000）

（constructive algorithms）（strings）

### Ques

[门钥匙](https://codeforces.com/problemset/problem/2192/B)

**题意**

You are given a binary string   of length  . You can perform the following operation on the string:

- Choose an index  , and flip the bit present at all other indices except for the index  . In other words, choose an integer   ( ), and for all   such that   and  , if  , then set  , otherwise set  .

You can perform the operation any number of times, but each index can be chosen by **at most one** operation.

Your task is to make all bits present in the string   equal  , or report that it is impossible to do so. You don’t have to minimize the number of operations.

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains a single integer   ( ).

The second line of each test case contains the binary string   of length  .

It is guaranteed that the sum of   over all test cases does not exceed  .

**Output**

For each test case, output   if it is impossible to transform all bits to  . Otherwise, output two lines in the following format:

- In the first line, print the number of operations   ( ).
- In the second line of each test case, print   numbers – the indices you select in each operation in order. You should guarantee that each index is chosen at most once.

If there are multiple possible solutions, you may output any.

**Example**


```plaintext
4
3
101
3
100
4
0000
4
1010
```


```plaintext
1
2 
-1
0
2
1 3 
```


**Note**

In the first test case, performing the operation on index   means flipping bits present at index   and  . So the new string formed will be  .

In the second test case, it can be shown that we cannot make string   equal to   using the described operations.

### Ans

**初始思路**

一头雾水，在研究总数和1的个数之间的关系

**题解**

提示：要去研究一下什么时候答案为-1。

$\left{
 
\right.$

而要使所有位都是0，那么我们必须确保所有的0位都翻转偶数次，所有的1位都翻转奇数次

那么现在我们要展开讨论：

- 如果字符串中0位都是奇数，那么就对所有0位进行操作。因为此时对1操作n次（奇数），对其余的0操作n-1次（偶数）
- 如果字符串中0位都是偶数，且字符串中的1位数也是偶数，则对所有1位进行操作。因为此时对1操作n-1次（奇数），对0操作n次（偶数）
- 如果字符串中0位都是偶数，且字符串中的1位数是奇数。那么这种情况下，我们无法使得所有位都是0，输出-1。


```cpp
void solve(){
    int n; cin >> n;
    string s; cin >> s;
    
    int cnt0 = count(s.begin(),s.end(),'0');
    int cnt1 = count(s.begin(),s.end(),'1');
    if(cnt0&1){
        cout << cnt0 << '\n';
        for(int i = 0;i < (int)s.size();++i){
            if(s[i] == '0'){
                cout << i+1 << ' ';
            }
        }
    }else if(cnt1&1){
        cout << "-1";
    }else{
        cout << cnt1 << '\n';
        if(cnt1 == 0){
            return;
        }
        for(int i = 0;i < (int)s.size();++i){
            if(s[i] == '1'){
                cout << i+1 << ' ';
            }
        }
    }
    cout << '\n';
    return;
}
```


当然也要注意下如果cnt1 = 0的情况。

## 5. MEX Reordering（1000）

（constructive algorithms）（sortings）

### Ques

[门钥匙](https://codeforces.com/problemset/problem/2191/B)

**题意**

You are given an integer array   consisting of   elements. Denote $f(l, r) = \operatorname{MEX}([a*l, a*{l + 1}, \ldots, a\_r])$$^{\text{∗}}$.

Determine if there is a way to reorder the array   such that for **every**   ( ),  . In other words, for every split point  , the   of the prefix must be different from the   of the suffix.

 The minimum excluded (MEX) of a collection of integers   is defined as the smallest non-negative integer   which does not occur in the collection  .

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains a single integer   ( ) — the length of the array.

The second line of each test case contains   integers   ( ).

**Output**

Output “YES” if you can reorder   so that the condition from the statement is satisfied, and “NO” otherwise. You can output the answer in any case (upper or lower). For example, the strings “yEs”, “yes”, “Yes”, and “YES” will be recognized as positive responses.

**Example**


```plaintext
3
2
1 0
3
0 3 0
6
1 0 5 0 6 1
```


```plaintext
YES
NO
YES
```


**Note**

In the first example, the initial ordering of   already satisfies the condition. The only choice for   is  . Then  , and  . Since  , the condition is satisfied.

In the second example, it can be shown that there is no way to reorder   to satisfy the condition. As an example, consider the order   and  . We have  , and  , hence  , so the choice of reordering is invalid.

In the third example, we can reorder   into  . When  ,  ,  , so the condition is satisfied for this  . It can be verified that the condition is also satisfied for all other  .

### Ans

**初始思路**

好像跟1的存在有关系，构造了下[1,0,5,6]，然后参考[0,3,0]，没有1就错。不过这个应该是1和0之间的相对关系。反正就是想什么时候构造不出来。


```cpp
void solve(){
    int n; cin >> n;
    vector<int> a(n);
    for(int i = 0;i < n;++i) cin >> a[i];

    int cnt0 = count(a.begin(),a.end(),0);
    int cnt1 = count(a.begin(),a.end(),1);
    if(cnt1 == 0){
        cout << "NO\n";
        return;
    }
    if(cnt0-cnt1 > 1){
        cout << "NO\n";
        return;
    }
    cout << "YES\n";
    return;
}
```


经典WA2

**题解**

提示 1：如果数组中没有 0，那么一定不可能；如果恰好有一个 0，那么一定可以。

提示 2：如果至少有两个 0，并且没有 1，那么总能找到一个分割点，使得左右两边都包含 0。

提示 3：如果至少有两个 0，并且至少有一个 1，那么可以把所有 0 都放到数组末尾。

接下来解释为什么这些结论成立。

首先，  当且仅当区间   中包含至少一个 0。因此，如果数组中没有任何 0，那么所有区间的   都等于  ，自然无法构造出满足条件的排列，答案是  。

如果数组中恰好有一个 0，我们只需要把这个 0 放在最后。此时，对于任意  ，前缀   都不包含 0，所以  ；而后缀   一定包含这个 0，所以  。因此每个分割点两边的值都不相等，答案是  。

接着考虑数组中至少有两个 0 的情况。

如果数组中没有 1，那么答案是  。因为无论如何排列，我们总能选择一个分割点，把这些 0 分到左右两边，使得   和   都包含 0。由于数组中没有 1，此时两边的  值都会等于  ，即 ，所以不满足条件。

如果数组中至少有一个 1，那么答案是  。我们可以把所有 0 放在数组末尾，并把所有1放在 0 前面。现在考虑任意分割点  ：

- 如果   不包含 0，那么  ；而   一定包含 0，所以  。
- 如果   包含 0，由于所有 1 都在所有 0 前面，所以   也一定包含 1，于是
   。而   只由 0 组成，所以  。

两种情况下都有  ，因此答案是  。

## 6. Sorting Game（1200）

（constructive algorithms）（games）（greedy）

### Ques

[门钥匙](https://codeforces.com/problemset/problem/2190/A)

**题意**

Alice and Bob play a game on a binary string   of length   (a string consisting only of characters   and  ). Alice moves first, and the players take alternate turns.

In one turn, a player chooses a sequence of indices $i*1, i\_2, \ldots, i\_m 1 \le i\_1 \lt i\_2 \lt \ldots \lt i\_m \le n$) such that the characters at these positions form a **non-increasing** sequence (that is, $s*{i*1} \ge s*{i*2} \ge \ldots \ge s*{i\_m}$). The player then rearranges the characters at these positions to be sorted in **non-decreasing** order.

Formally, let the chosen characters consist of   zeros and   ones (where  ). The move replaces the characters at positions   with a sequence of   zeros followed by   ones. A move is valid if and only if it strictly **modifies** the string   (which implies   and  ).

The player who cannot make a valid move loses.

Assuming both players play optimally, determine the winner. If Alice wins, output a valid first move that is part of a winning strategy.

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case consists of a single integer   ( ) — the length of the string  .

The second line of each test case contains a binary string   of length   consisting of only characters   and  .

It is guaranteed that the sum of   over all test cases does not exceed  .

**Output**

For each test case, output one or three lines:

- If Bob wins with optimal play, print a single line containing “Bob”.
- Otherwise, print three lines. On the first line print “Alice”. On the second line print an integer   ( ), and on the third line print   distinct integers   ( ) — the indices chosen for Alice’s first move.

The sequence of indices you print must form a valid move according to the rules described in the statement. The indices must be printed in **increasing order**. If there are multiple winning moves, you may output any of them.

**Example**


```plaintext
3
3
000
2
10
3
101
```


```plaintext
Bob
Alice
2
1 2 
Alice
2
1 2 
```


**Note**

In the first example, there is no way to make a move after which   will change, so Bob wins immediately.

In the third example, Alice can choose a subsequence   and sort it, after which   will turn into  . After that, Bob can’t make a move, so Alice wins.

### Ans

设 t 是 s 排序后得到的结果，如果在游戏一开始就存在 s = t，那么答案就是bob，反之就是alice。

而对于alice来说，可以第一回合就选择所有满足   的下标，从而直接获胜。

设   中 0 的个数为  ，那么排序后的  全部由 0 组成，  全部由 1 组成。对于任意  ，如果   和   不同，那么由于  ，所以一定有 。类似地，对于任意  ，如果   和   不同，那么由于  ，所以一定有  。因此，在被选中的下标中，前半部分对应的 都是1，后半部分对应的 都是0，也就是说这是个非递增序列。注意到，在区间   中被选中的下标数量，等于区间   中被选中的下标数量。原因是  和   中 0 和 1 的数量完全相同，所以这次操作本质上就是把   中所有放错位置的 1，和   中所有放错位置的 0 交换，操作之后就得到  。


```cpp
void solve(){
    int n; cin >> n;
    string s; cin >> s;
    string t = s;
    sort(t.begin(),t.end());\
    if(s == t){
        cout << "Bob\n";
        return;
    }
    vector<int> res;
    for(int i = 0;i < n;++i){
        if(s[i] != t[i]){
            res.push_back(i+1);
        }
    }
    cout << "Alice\n";
    cout << res.size() << '\n';
    for(int i : res){
        cout << i << ' ';
    }
    cout << '\n';
    return;
}
```


## 7. The Curse of the Frog（1200）

（constructive algorithms）（greedy）（math）

### Ques

[门钥匙](https://codeforces.com/problemset/problem/2189/B)

**题意**

On an infinite number line, at point  , sits a frog. After many years of meditation, the frog has mastered   unique types of magical jumps. The  -th type of jump allows it to jump forward by no more than   units. In other words, if it was at integer point  , after the jump it can land **at any integer point from   to  **.

But magic always comes with a price; it has been cursed. Before each  -th attempt (before  -th,  -th,  -th etc. attempt among the jumps of type  ) to use the  -th type of jump, the frog rolls back   units! In other words, if it was at point  , it will first find itself at point  , and after the jump, it can land at any integer point from   to  .

The frog’s goal is to reach the point with the number  , using jumps while minimizing the number of rollbacks. Help the frog — find the minimum number of rollbacks it will have to endure on its way to the goal, or determine that it cannot reach point  .

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

In the first line of each test case, there are   integers   and   ( ,  ) — the number of types of jumps the frog can make and its final target.

In the following   lines, the description of the jump types is provided; the  -th line contains   integers  ,  , and   ( ).

It is guaranteed that the sum of   across all test cases does not exceed  .

**Output**

For each test case, if the frog can reach point  , find the smallest number of rollbacks it must endure to do so. If it cannot reach point  , output  .

**Example**


```plaintext
6
1 1
3 3 3
1 7
4 2 5
2 4
1 2 3
2 2 4
5 8
12 1 11
10 1 4
1 1 3
1 2 5
2 1 7
1 1000000000000000000
1000000 4 654321
1 10
2 2 1
```


```plaintext
0
1
-1
2
298892990032
3
```


**Note**

In the first test case, the frog can jump forward by   unit and will end up at point  . Thus, the answer is  .

In the third test case, it can be shown that the frog cannot reach point  .

In the fourth test case, the frog can reach point  , for example, as follows: jump using the  -st type by  , jump using the  -th type by  , and jump using the  -nd type by  . Then it will sequentially be at the following points  .

In the sixth test case, the frog can reach point  , for example, as follows: jump   times by   and   time by  . Then it will sequentially be at the following points  .

### Ans

**初始思路**

先从贪心的角度考虑。我们先计算青蛙在不发生回撤的情况下，最多能够到达的位置。如果这个位置已经大于等于目标距离，那么答案就是 0。否则，我们需要考虑发生回撤后的情况。对于每一种跳跃方式，计算它在一轮中能够带来的净前进距离，也就是： 

然后取其中的最大值。若这个最大净前进距离小于等于 0，说明即使选择最优跳跃方式，青蛙也无法继续向前推进，因此答案为 -1。否则，设剩余距离为 r，最大净前进距离为 m，那么所需的最少回撤次数就是： 

也就是说，答案为： 


```cpp
using ll = long long;

void solve(){
    int n; ll x; cin >> n >> x;
    ll sum = 0;
    vector<ll> res;
    while(n--){
        ll a,b,c; cin >> a >> b >> c;
        sum += (b-1)*a;
        res.push_back(a*b-c);
    }

    sort(res.begin(),res.end(),greater<ll>());
    
    if(sum >= x){
        cout << 0 << '\n';
        return;
    }else{
        if(res[0] <= 0){
            cout << -1 << '\n';
            return;
        }else{
            cout << (x-sum+res[0]-1)/res[0] << '\n';
        }
    }
    return;
}
```


然后也是顺利AC了，不过这道题在数据上也是有点坑的，写的时候需要注意。

## 8.Yet Another MEX Problem（1100）

（constructive algorithms）（greedy）

### Ques

[门钥匙](https://codeforces.com/problemset/problem/2183/B)

**题意**

You are given an array   of length  , and an integer  . Let   be the value of $\operatorname{mex}(a*l,a*{l+1},\ldots,a\_r)$$^{\text{∗}} n-k+1$ times:

- Let the current length of the sequence be  . You need to find an interval   of length   such that $\operatorname{max}*{i=1}^{|a|-k+1} f(i, i+k-1) = f(l, r). k k \operatorname{mex} [l,r] i l \leq i \leq r a\_i a [a\_1, a\_2, \ldots, a*{i-1}, a*{i+1}, a*{i+2}, \ldots, a\_n]$.

For example, in the array   with  , the two possible   pairs are   and   (since they each have  , which is the maximum among all windows of size  ). Therefore, you can remove any one of the indices   in your next move.

After   operations, you will have a sequence of length  . Your objective is to maximize the   of the remaining elements. Please output the maximum   possible.

 The minimum excluded (MEX) of a collection of integers   is defined as the smallest non-negative integer   which does not occur in the collection  .

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains two positive integers   and   ( ).

The second line of each test case contains   integers   ( ).

It is guaranteed that the sum of   over all test cases does not exceed  .

**Output**

Output a single non-negative integer representing your answer.

**Example**


```plaintext
5
3 3
0 0 0
4 2
0 2 1 3
5 3
0 1 2 1 0
6 2
0 1 0 1 2 0
7 5
0 1 2 4 0 3 1
```


```plaintext
1
1
2
1
4
```


**Note**

In the first test case, we can select the interval  . Then, delete   to obtain  . The process terminates, and the   of the remaining elements is  .

In the third test case, we can perform the following operations:

- Select  . This is allowed because the   of all windows of size   is  , and the window   has a   of  , which is the largest. Then, remove  . The sequence is now  .
- Select  . Then, remove  . The sequence is now  .
- Select  . Then, remove  . The sequence is now  . The process terminates, and the final   is  .

### Ans

**初始思路**

反正数组中没有0肯定输出0。一开始以为数组中如果有多个0那就消除最大，一个0也消除最大。但后面发现如果这样了，样例5就不是最优了，所以想想可能和后面的有关系，难道是有个特判？如果是最后一轮，如果有多个相同的最大值，那就删掉多余的那个，如果只有一个最大值，但是这个区间里面有多余的数，那也删去。不过这个不好讲，而且也写不出代码。

**题解**

我们可以先思考一个关键点：由于最后只会剩下 k - 1 个数字，因此对于任意长度为 k 的区间，都必须从中删除一个数字。

那么哪些数字是可以删除的呢？显然，如果区间中存在大于等于 k - 1 的数字，它不会影响我们保留 0 到 k - 2 这些数，因此可以删除。另一方面，如果区间中存在重复值，那么删除其中一个重复的数字，也不会影响最终能够得到的 mex。

而我们最终希望尽可能保留的是 这些数字，它们一共只有 k - 1个。对于任意长度为 k 的区间来说，根据抽屉原理，区间内一定至少存在一个“无效数字”：要么是大于等于 k - 1 的数，要么是某个重复值。

因此，每次操作都可以删除一个不会影响答案的数字。最终答案受到两个限制： 以及 

所以答案为： 


```cpp
void solve(){
    int n,k; cin >> n >> k;
    vector<int> a(n),b(n);
    for(int i = 0;i < n;++i) cin >> a[i],a[i] = min(a[i],n+1);//这一步不写会runtime error
    int mex = 0;
    for(int i = 0;i < n;++i){
        b[a[i]]++;
    }
    while(b[mex]){
        mex++;
    }
    cout << min(mex,k-1) << '\n';
    return;
}
```


还有一版更逆天的


```cpp
void solve(){
    int n, k;
    cin >> n >> k;
    vector<int> cnt(n+2,0);
    for(int i = 0;i < n;++i){
        int x;
        cin >> x;
        cnt[x]++;
    }
    int mex = 0;
    while(cnt[mex] > 0)
        mex++;

    cout << min(mex,k-1) << '\n';
}
```


非常简短。

## 9.Blackslex and Penguin Civilization（1300）（×）

（bitmasks）（constructive algorithms）（greedy）（math）

### Ques

[门钥匙](https://codeforces.com/problemset/problem/2179/D)

**题意**

Penguins are civilized creatures that communicate using permutations. Blackslex, as a penguin researcher, must study their means of communication.

For a given integer  , consider permutations    of the array  . Define


$$
S(p) \;=\; \sum_{i=0}^{2^n-1} \operatorname{popcount}\!\bigl(p_0 \mathbin{\&} p_1 \mathbin{\&} \cdots \mathbin{\&} p_i\bigr),
$$


where   is the number of  -bits in the binary representation of   (for instance,   because   has two  -bits in the binary representation), and   denotes the [bitwise AND operation](https://en.wikipedia.org/wiki/Bitwise_operation#AND). .

A permutation is considered **sacred** if it maximizes  . Find the **lexicographically minimal**  sacred permutation.

 A permutation of length   is an array consisting of   distinct integers from   to   in arbitrary order. For example,   is a permutation, but   is not a permutation (  appears twice in the array), and   is also not a permutation (  but there is   in the array).

 An array   is lexicographically smaller than an array   of the same size if and only if the following holds:

- in the first position where   and   differ, the array   has a smaller element than the corresponding element in  .

**Input**

The first line contains a single integer   ( ) — the number of test cases.

Each test case contains a single integer   ( ).

It is guaranteed that the sum of   over all test cases does not exceed  .

**Output**

For each test case, output   integers $p*0, p\_1, \ldots, p*{2^n-1}$ — the required permutation.

**Example**


```plaintext
2
1
2
```


```plaintext
1 0 
3 1 0 2 
```


**Note**

For the first test case, there are two possible permutations.

-  ,  
-  ,  

For the second test case,   is sacred. There are other permutations   that are sacred, such as  , but those are not lexicographically minimal.

### Ans

对于$A*i = p\_0 \& p\_1 \&\ …\& p\_i  \operatorname{popcount}(A\_i) ≥ k 2^{n-k} S*{max} = \sum\_{k=1}^n2^{n-k}$。

而要用满每个情况，我们要让popcount尽可能缓慢下降，一种方式是让A每次只减少一个1。也就是从一个全1的数，每次只把一个1变成0，比如 ，这样得到7，6，5，4，3，2，1，0，但是这个并不是字典序最小，所以我们要在所有最大化的排序中找字典序最小的：

- 每次选择下一个数时，在保证人能填满所有可能时，尽量选小的数
- 固定低位为1，让高位部分按偶数递增


```cpp
void solve(){
    int n; cin >> n;
    cout << (1<<n)-1;
    for(int i = 1;i <= n;++i)
    for(int j = 0;j < (1<<i);j += 2){
        int val = (j<<(n-i)) | ((1<<(n-i))-1);
        cout << ' ' << val;
    }
    cout << '\n';
    return;
}
```


## 10. Beautiful XOR（1100）

（bitmasks）（constructive algorithms）（greedy）

### Ques

[门钥匙](https://codeforces.com/problemset/problem/2162/C)

**题意**

You are given two integers   and  . You are allowed to perform the following operation any number of times (including zero):

- choose any integer   such that   (the current value of  , not initial),
- set  . Here,   represents the [bitwise XOR](https://en.wikipedia.org/wiki/Bitwise_operation#XOR) operator.

After performing a sequence of operations, you want the value of   to become exactly  .

Find a sequence of at most   operations (values of   used in each operation) that transforms   into  , or report that it is impossible.

Note that you are not required to find the minimum number of operations, but any valid sequence of at most   operations.

**Input**

The first line of input contains a single integer   ( ) — the number of test cases.

Each test case contains two integers   and   ( ).

**Output**

For each test case, if it is impossible to obtain   from   using the allowed operations, print a single line containing  .

Otherwise, on the first line print a single integer   ( ) — the number of operations. On the second line print   integers ( ) — the chosen values of   in the order you apply them.

If there are multiple valid sequences, you may print any one of them.

**Example**


```plaintext
6
9 6
13 13
292 929
405 400
998 244
244 353
```


```plaintext
2
7 8
0
-1
1
5
2
25 779
-1
```


**Note**

For the first test case,

- choose  , now   becomes equal to  .
- choose  , now   becomes equal to  .

Thus, we can make  .

For the fourth test case, choosing   makes  .

### Ans

**初始思路**

如果a = b，输出0；

如果a > b，找下最前面的位，使得a是1，b是0，此时可以两步调好，先把除此位以后的位调好，再调此位。

如果a < b，输出-1；（不过原因没有细想）


```cpp
void solve(){
    int a,b; cin >> a >> b;
    if(a == b){
        cout << 0 << '\n';
        return;
    }else if(a < b){
        cout << -1 << '\n';
        return;
    }
    //这里放了个黑箱 -> 处理剩下的一种情况，写得一坨，不展示
    return;
}
```


依旧WA2

**题解**

不过这道题想法没问题。

对于每个测试用例：

1. 先看 a 和 b 的最高位（最高二进制位）是否一致范围内。
2. 如果 b 的最高位比 a 还高，那么不可能。
3. 否则：

   - 如果 a == b，输出 0
   - 其他情况，一定可以用 2 次操作完成：设a的最高位是第m位，那么把这一位及以下的全部变成1，构造c。由于 ，那么 其实也就是a的按位取反。而因为 ，所以 
4. 总结一下： 

   若a==b，直接输出0

过一下流程，欣赏一下人家细节处理的优雅

 

a的最高位是3，所以构造中间变量 

 

 


```cpp
using ll = long long;

void solve(){
    ll a,b; cin >> a >> b;
    if(a == b){
        cout << 0 << '\n';
        return;
    }

    int msb_a = 63-__builtin_clzll(a);
    int msb_b = 63-__builtin_clzll(b);
    if(msb_b > msb_a){
        cout << -1 << '\n';
        return;
    }

    ll c = (1ll << (msb_a+1)) - 1;
    ll x1 = c^a;
    ll x2 = c^b;
    cout << 2 << '\n';
    cout << x1 << ' ' << x2 << '\n';
    return;
}
```


然后就有人问了，主播主播，这个\_\_builtin\_clzll()是什么，操作太快了，没看清思路。

`__builtin_clzll(x)`是 GCC/Clang 提供的一个内建函数，意思是：

> **count leading zeros long long**
> 统计一个 `unsigned long long` 的二进制表示里，**从最高位开始有多少个前导 0**

而如果你想求 `x` 的最高位下标（从 0 开始），常用：


```cpp
int msb = 63 - __builtin_clzll(x);
//msb: most significant bit,也就是一个数最高位1所在的位置
```


而用这个之前，要记住两点

- 参数不能是 0，`__builtin_clzll(0)`是未定义行为，不能用
- 类型最好是无符号（unsigned）

而与之类似的，还有\_\_builtin\_clz()，它是处理unsigned int类型的
