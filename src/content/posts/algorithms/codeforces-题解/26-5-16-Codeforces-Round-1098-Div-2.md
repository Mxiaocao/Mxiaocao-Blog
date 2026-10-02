---
title: "26_5_16 Codeforces Round 1098 (Div. 2)"
published: 2026-05-17
updated: 2026-05-17
description: "Codeforces Round 1098 (Div. 2)A. Marisa Steals Reimu’s Takeout门钥匙 Ques题意 The Darkness Brought In by Swallowstone Naturalis Historia — Dateless Bar “Old Adam” Marisa is a girl of integrity who always h"
tags: []
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/17/26-5-16-Codeforces-Round-1098-Div-2/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "codeforces-题解"
topic: "算法竞赛"
---

# Codeforces Round 1098 (Div. 2)

## A. Marisa Steals Reimu’s Takeout

[门钥匙](https://codeforces.com/contest/2228/problem/A)

### Ques

**题意**

The Darkness Brought In by Swallowstone Naturalis Historia

— Dateless Bar “Old Adam”

Marisa is a girl of integrity who always helps others safeguard their belongings. Over a period of   days, she comes each day to take one of Reimu’s takeouts. The  -th takeout is described by its deliciousness value — an integer   ( ), forming a sequence   of length  .

Marisa has a special fondness for the number  . She can perform the following operation zero or more times:

- Select a non-empty subsequence  of   whose sum is divisible by  , and remove the elements of the subsequence from  .

Determine the maximum number of operations Marisa can perform.

 A sequence   is a subsequence of a sequence   if   can be obtained from   by the deletion of several (possibly, zero or all) element from arbitrary positions.

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains a single integer   ( ).

The second line contains   integers   ( ), denoting the deliciousness values of the takeouts.

**Output**

For each test case, output the maximum number of operations Marisa can perform.

**Example**


```plaintext
3
4
0 0 0 0
3
1 2 0
5
1 2 1 2 1
```


```plaintext
4
2
2
```


**Note**

In the first test case, Marisa can perform four operations:


$$
[\underline{0},0,0,0]\to[\underline{0},0,0]\to[\underline{0},0]\to[\underline{0}]\to [].
$$


In the second test case, Marisa can perform two operations:


$$
[\underline{1},\underline{2},0]- \gt [\underline{0}]- \gt [].
$$


In the third test case, Marisa can perform two operations:


$$
[\underline{1},2,1,\underline{2},1]- \gt [\underline{2},1,\underline{1}]- \gt [1].
$$


### Ans

要进行讨论：

- 0可以单独删掉一次，所以贡献cnt0
- 每一对1和2可以贡献一次
- 剩下的全是1或全是2，此时要三个一组才可以贡献一次操作

于是有


```cpp
void solve(){
    int n; cin >> n;
    
    vector<int> cnt(3);
    for(int i = 0;i < n;++i){
        int x; cin >> x;
        cnt[x]++;
    }
    cout << cnt[0]+min(cnt[1],cnt[2])+abs(cnt[1]-cnt[2])/3 << '\n';

    return;
}
```


## B. Remilia Plays Soku

[门钥匙](https://codeforces.com/contest/2228/problem/b)

### Ques

**题意**

Remilia is trying to escape, while Reimu wants to land the final hit.

The playing field consists of   positions arranged in a circle. For each  , positions   and   are adjacent, and positions   and   are also adjacent.

Initially, at time  , Reimu is at position   and Remilia is at position  , where  .

Each second, the following happens in order:

1. Remilia either moves to an adjacent position or stays in place. Over the entire game, she may move to an adjacent position at most   times.
2. After observing Remilia’s action, Reimu either moves to an adjacent position or stays in place.
3. If they are at the same position after both actions, Reimu catches Remilia and the game ends.

Assuming both players play optimally, Reimu always tries to minimize the catching time, while Remilia tries to maximize it.

Find the number of seconds until Reimu catches Remilia.

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The only line of each test case contains four integers  ,  ,   and   ( ,  ,  ,  ).

**Output**

For each test case, output the number of seconds until Reimu catches Remilia, assuming both players play optimally.

**Example**


```plaintext
4
2 1 2 0
4 3 2 1
4 2 3 1
16 8 4 2
```


```plaintext
1
2
2
6
```


**Note**

In the first test case, one possible sequence of actions is:

- In the first second, Remilia stays in place, and then Reimu moves to   and catches Remilia.

In the second test case, one possible sequence of actions is:

- In the first second, Remilia moves to  , and then Reimu moves to  .
- In the second second, Remilia cannot move and has to stay in place, and then Reimu moves to   and catches Remilia.

### Ans

这道题也可以进行简单的模拟

他两个点之间的距离肯定是`d = abs(x1-x2)`的。当然这样就够了吗，并非，这在一个圆上，而对于一个圆来说，那其实还要加一个`d = min(d,n-d)`，这样才符合一个圆。而这个k，无非就是拖延k秒，你靠近我1次，那我就远离你1次，你靠近我k次，我远离你k次。所以还要有个`d += k`


```cpp
void solve(){
    int n,x1,x2,k; cin >> n >> x1 >> x2 >> k;
    
    cout << min(abs(x1-x2)+k,n-abs(x1-x2)+k) << '\n';
    return;
}
```


但是你会发现你直接就WA2了。思路明明没错，你甚至越想越觉得自己挺对的。但是这世界就是这样的，不会因为你自信就网开一面，也不会因为你盯着in queue等了很久，就心软放你一马。当然，与其怨天尤人，不如向内求索：你真的对了吗？不是的。你一直以为，有些人空有小聪明而无大智慧，而反观自己站在更高处，拥有了所谓的大局观了。但你从来不会意识到，真正能把事情做成的人，从来不是只会俯瞰全局的人。你空有大局观，却不能左右那些细枝末节。说难听点，这不就是糙吗。

有些人 不撞南墙 不回头

于是你苦思冥想，终于发现，当n <= 3时，需要特殊处理


```cpp
void solve(){
    int n,x1,x2,k; cin >> n >> x1 >> x2 >> k;
    
    if(n <= 3){
        cout << 1 << '\n';
        return;
    }
    cout << min(abs(x1-x2)+k,n-abs(x1-x2)+k) << '\n';
    return;
}
```


AC了

## C1. Cirno and Number (Easy Version)

[门钥匙](https://codeforces.com/contest/2228/problem/c1)

### Ques

**题意**

Led On by a Cow to Visit Zenkou Temple

— Neo-traditionalism of Japan

**This is the easy version of the problem. The difference between the versions is that in this version,  . You can hack only if you solved all versions of this problem.**

You are given a non-negative integer   and a non-empty, strictly increasing sequence of digits   of length  , where  .

Find the minimum value of   over all non-negative integers   whose decimal representation contains only digits from  .

**Input**

Each test contains multiple test cases. The first line contains the number of test cases   ( ). The description of the test cases follows.

The first line of each test case contains two integers   and   ( ,  ).

The second line contains   integers  . It is guaranteed that  .

**Output**

For each test case, output the minimum value of  .

**Example**


```plaintext
4
0 2
0 1
11 2
1 2
222 2
3 4
3333 2
6 7
```


```plaintext
0
0
111
2556
```


**Note**

In the first test case, a=0, b=0, and |a−b|=0.

In the second test case, a=11, b=11, and |a−b|=0.

In the third test case, a=222, b=333, and |a−b|=111.

In the fourth test case, a=3333, b=777, and |a−b|=2556.

### Ans

**初始思路**

就是dfs不断枚举


```cpp
void solve(){
    ll a; int n; cin >> a >> n;
    vector<int> d(n);
    for(int i = 0;i < n;++i) cin >> d[i];
    int len = to_string(a).size();
 
    ll res = 1e18+10;
    auto dfs = [&](auto&& self,int len,int pos,ll x) -> void {
        if(pos == len){
            res = min(res,abs(x-a));
            return;
        }
        for(int i = 0;i < n;++i){
            if(pos == 0 && d[i]== 0 && len != 1) continue;
            self(self,len,pos+1,x*10+d[i]);
        }
        return;
    };
 
    for(int i = 1;i <= len+1;++i){
        dfs(dfs,i,0,0);
    }
    cout << res << '\n';
    return;
}
```


但是TLE3

**题解**

对于这道题，我们的核心只有一个：找离a最近的合法数，即找不大于a的最大合法数和找不小于a的最小合法数

我们要先候选一些数：

1. a本身合法，那答案就是0
2. 同长度，刚好小于等于a的最大合法数lo

   从高位往低位扫：

   - 当前位能选一个等于d[i]的数，就先选
   - 如果能选一个小于a[i]的数，那么后面的全部填最大数
   - 如果当前位选不出来，就往回退，把前面某一位降一点，后面全填最大数字
3. 同长度，刚好大于等于a的最小合法数hi

   类似：

   - 当前位能选一个等于d[i]的数，就先选
   - 如果能选一个大于a[i]的数，那么后面的全部填最小数
   - 如果当前位选不出来，就往回退，把前面某一位升一点，后面全填最小数字
4. 位数更短的最大合法数

   长度L-1，全填最大数，且首位不能是0
5. 位数更长的最小合法数

   长度L+1，首位填最小非零数，后面填最大

最后对所有候选数取`min(abs(a-b))`

而对于写法，一共有三种

#### 法一：上下界构造法

核心目标是直接构造两个数：

lo = 最大的 <= a的合法数

hi = 最小的 >= a的合法数

有min(a-lo,hi-a)


```cpp
#include <bits/stdc++.h>
#define code using
#define by namespace
#define Mxiaocao std
code by Mxiaocao;

using int64 = long long;
const int64 INF = (1LL << 62);

vector<int> d;

int64 to_num(const vector<int>& v){
    int64 x = 0;
    for(int c : v) x = x * 10 + c;
    return x;
}

int64 max_len(int len){
    if(len <= 0) return -1;
    if(len == 1) return d.back();

    int first = -1;
    for(int i = (int)d.size() - 1;i >= 0;--i){
        if(d[i] != 0){
            first = d[i];
            break;
        }
    }
    if(first == -1) return -1;

    int64 x = first;
    for(int i = 1;i < len;++i) x = x * 10 + d.back();
    return x;
}

int64 min_len(int len){
    if(len <= 0) return -1;
    if(len == 1) return d.front();

    int first = -1;
    for(int x : d){
        if(x != 0){
            first = x;
            break;
        }
    }
    if(first == -1) return -1;

    int64 x = first;
    for(int i = 1;i < len;++i) x = x * 10 + d.front();
    return x;
}

int64 get_lo(const string& s){
    int L = s.size();
    vector<int> b;

    for(int i = 0;i < L;++i){
        int cur = s[i] - '0';
        int choose = -1;

        for(int j = (int)d.size() - 1;j >= 0;--j){
            int x = d[j];
            if(i == 0 && L > 1 && x == 0) continue;
            if(x <= cur){
                choose = x;
                break;
            }
        }

        if(choose != -1){
            b.push_back(choose);

            if(choose < cur){
                while((int)b.size() < L) b.push_back(d.back());
                return to_num(b);
            }
        } else {
            while(!b.empty()){
                int pos = (int)b.size() - 1;
                int old = b.back();
                b.pop_back();

                int nxt = -1;
                for(int j = (int)d.size() - 1;j >= 0;--j){
                    int x = d[j];
                    if(pos == 0 && L > 1 && x == 0) continue;
                    if(x < old){
                        nxt = x;
                        break;
                    }
                }

                if(nxt != -1){
                    b.push_back(nxt);
                    while((int)b.size() < L) b.push_back(d.back());
                    return to_num(b);
                }
            }

            return max_len(L - 1);
        }
    }

    return to_num(b);
}

int64 get_hi(const string& s){
    int L = s.size();
    vector<int> b;

    for(int i = 0;i < L;++i){
        int cur = s[i] - '0';
        int choose = -1;

        for(int x : d){
            if(i == 0 && L > 1 && x == 0) continue;
            if(x >= cur){
                choose = x;
                break;
            }
        }

        if(choose != -1){
            b.push_back(choose);

            if(choose > cur){
                while((int)b.size() < L) b.push_back(d.front());
                return to_num(b);
            }
        } else {
            while(!b.empty()){
                int pos = (int)b.size() - 1;
                int old = b.back();
                b.pop_back();

                int nxt = -1;
                for(int x : d){
                    if(pos == 0 && L > 1 && x == 0) continue;
                    if(x > old){
                        nxt = x;
                        break;
                    }
                }

                if(nxt != -1){
                    b.push_back(nxt);
                    while((int)b.size() < L) b.push_back(d.front());
                    return to_num(b);
                }
            }

            return min_len(L + 1);
        }
    }

    return to_num(b);
}

void solve(){
    int64 a;
    int n;
    cin >> a >> n;

    d.resize(n);
    for(int i = 0;i < n;++i) cin >> d[i];

    string s = to_string(a);

    int64 ans = INF;

    int64 lo = get_lo(s);
    int64 hi = get_hi(s);

    if(lo != -1) ans = min(ans, llabs(a - lo));
    if(hi != -1) ans = min(ans, llabs(a - hi));

    cout << ans << '\n';
}

signed main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int T;
    cin >> T;

    while(T--){
        solve();
    }

    return 0;
}
```


#### 法二：候选枚举法

不构造lo和hi，而是枚举所有可能成为答案的候选数


```cpp
#include <bits/stdc++.h>
#define code using
#define by namespace
#define Mxiaocao std
code by Mxiaocao;

using int64 = long long;
const int64 INF = (1LL << 62);

int64 to_num(const string& s){
    int64 x = 0;
    for(char c : s) x = x * 10 + (c - '0');
    return x;
}

void solve(){
    int64 a;
    int n;
    cin >> a >> n;

    vector<int> d(n);
    for(int i = 0;i < n;++i) cin >> d[i];
    sort(d.begin(), d.end());

    string s = to_string(a);
    int L = s.size();

    vector<int64> cand;

    auto add = [&](const string& t){
        if(!t.empty()) cand.push_back(to_num(t));
    };

    auto valid_prefix = [&](int len){
        for(int i = 0;i < len;++i){
            int x = s[i] - '0';
            if(!binary_search(d.begin(), d.end(), x)) return false;
        }
        return true;
    };

    bool exact = true;
    for(char c : s){
        if(!binary_search(d.begin(), d.end(), c - '0')){
            exact = false;
            break;
        }
    }
    if(exact) cand.push_back(a);

    if(d[0] == 0) cand.push_back(0);

    if(L > 1){
        string t;
        int first = -1;
        for(int i = n - 1;i >= 0;--i){
            if(d[i] != 0){
                first = d[i];
                break;
            }
        }

        if(first != -1){
            t += char('0' + first);
            for(int i = 1;i < L - 1;++i){
                t += char('0' + d.back());
            }
            add(t);
        }
    }

    {
        int first = -1;
        for(int x : d){
            if(x != 0){
                first = x;
                break;
            }
        }

        if(first != -1){
            string t;
            t += char('0' + first);
            for(int i = 1;i < L + 1;++i){
                t += char('0' + d.front());
            }
            add(t);
        }
    }

    for(int i = 0;i < L;++i){
        if(!valid_prefix(i)) break;

        int cur = s[i] - '0';

        for(int x : d){
            if(i == 0 && L > 1 && x == 0) continue;

            if(x < cur){
                string t = s.substr(0, i);
                t += char('0' + x);
                for(int j = i + 1;j < L;++j){
                    t += char('0' + d.back());
                }
                add(t);
            }

            if(x > cur){
                string t = s.substr(0, i);
                t += char('0' + x);
                for(int j = i + 1;j < L;++j){
                    t += char('0' + d.front());
                }
                add(t);
            }
        }
    }

    int64 ans = INF;
    for(int64 x : cand){
        ans = min(ans, llabs(a - x));
    }

    cout << ans << '\n';
}

signed main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int T;
    cin >> T;

    while(T--){
        solve();
    }

    return 0;
}
```


#### 法三：DFS/数位DP


```cpp
#include <bits/stdc++.h>
#define code using
#define by namespace
#define Mxiaocao std
code by Mxiaocao;

using int64 = long long;
const int64 INF = (1LL << 62);

int64 a;
string s;
int L;
vector<int> d;
int64 ans;

int64 to_num(const string& t){
    int64 x = 0;
    for(char c : t){
        x = x * 10 + (c - '0');
    }
    return x;
}

void relax(const string& t){
    if(t.empty()){
        return;
    }
    int64 x = to_num(t);
    ans = min(ans, llabs(a - x));
}

void dfs(int pos, string cur, int state){
    if(pos == L){
        relax(cur);
        return;
    }
    if(state == 1){
        while((int)cur.size() < L){
            cur += char('0' + d.front());
        }
        relax(cur);
        return;
    }
    if(state == -1){
        while((int)cur.size() < L){
            cur += char('0' + d.back());
        }
        relax(cur);
        return;
    }
    int target = s[pos] - '0';
    for(int x : d){
        if(pos == 0 && L > 1 && x == 0){
            continue;
        }
        if(x == target){
            dfs(pos + 1, cur + char('0' + x), 0);
        } else if(x > target){
            dfs(pos + 1, cur + char('0' + x), 1);
        } else {
            dfs(pos + 1, cur + char('0' + x), -1);
        }
    }
}

void solve(){
    int n;
    cin >> a >> n;
    d.resize(n);
    for(int i = 0;i < n;++i){
        cin >> d[i];
    }
    sort(d.begin(), d.end());
    s = to_string(a);
    L = s.size();
    ans = INF;
    if(d[0] == 0){
        relax("0");
    }
    if(L > 1){
        int max_nonzero = -1;
        for(int i = n - 1;i >= 0;--i){
            if(d[i] != 0){
                max_nonzero = d[i];
                break;
            }
        }
        if(max_nonzero != -1){
            string t;
            t += char('0' + max_nonzero);
            for(int i = 1;i < L - 1;++i){
                t += char('0' + d.back());
            }
            relax(t);
        }
    }
    int min_nonzero = -1;
    for(int x : d){
        if(x != 0){
            min_nonzero = x;
            break;
        }
    }
    if(min_nonzero != -1){
        string t;
        t += char('0' + min_nonzero);
        for(int i = 1;i < L + 1;++i){
            t += char('0' + d.front());
        }
        relax(t);
    }
    dfs(0, "", 0);
    cout << ans << '\n';
}

signed main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int T;
    cin >> T;
    while(T--){
        solve();
    }
    return 0;
}
```
