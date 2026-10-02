---
title: "LTT L1"
published: 2026-05-14
updated: 2026-05-14
description: "天梯赛 L1 速通15分1.L1-003 个位数统计==for(char c : s)== 12345678910111213void solve(){ string s; cin >> s; int cnt[10] = {0}; for(char c : s){ cnt[c-'0']++"
tags: []
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/14/LTT-L1/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "天梯赛"
topic: "算法竞赛"
---

# 天梯赛 L1 速通

## 15分

### 1.L1-003 个位数统计

==for(char c : s)==


```cpp
void solve(){
    string s;
    cin >> s;
    int cnt[10] = {0};
    for(char c : s){
        cnt[c-'0']++;
    }
    for(int i = 0;i < 10;++i){
        if(cnt[i] != 0)
        cout << i << ":" << cnt[i] << '\n';
    }
    return;
}
```


### 2.L1-005 考试座位号

建立映射，而不是结构体。


```cpp
void solve(){
    int n;
    cin >> n;
    string id[1005];
    int examSeat[1005];
    for (int i = 0; i < n; i++) {
        string zhunkaozheng;
        int testSeat, realSeat;
        cin >> zhunkaozheng >> testSeat >> realSeat;
        id[testSeat] = zhunkaozheng;
        examSeat[testSeat] = realSeat;
    }
    int m;
    cin >> m;
    while (m--) {
        int x;
        cin >> x;
        cout << id[x] << " " << examSeat[x] << '\n';
    }
}      
```


### 3.L1-058 6翻了


```cpp
void solve(){
    string s;
    getline(cin,s);
    for(int i = 0;i < (int)s.size();){
        if(s[i] != '6'){
            cout << s[i];
            ++i;
        }else{
            int j = i;
            while(s[j] == '6') j++;
            int len = j-i;
            if(len > 9) cout << 27;
            else if(len > 3) cout << 9;
            else cout << string(len,'6');
            i = j;
        }
    }
    cout << '\n';
}
```


## 20分

### 1. L1-002 打印沙漏

==在while里面运算k+1就能防止超过去==

==string（space,’ ‘)的用法==


```cpp
void solve(){
    int n; char ch; cin >> n >> ch;
    int k = 0;
    while(2*(k+1)*(k+1)-1 <= n){
        ++k;
    }
    int used = 2*k*k-1;
    for(int i = k;i >= 1;--i){
        int space = k-i;
        int cnt = 2*i-1;
        cout << string(space,' ') << string(cnt,ch) << '\n';
    }
    for(int i = 2;i <= k;++i){
        int space = k-i;
        int cnt = 2*i-1;
        cout << string(space,' ') << string(cnt,ch) << '\n';
    }
    cout << n-used << '\n';
    return;
}
```


### 2. L1-006 连续因子

一直枚举下去


```cpp
void solve(){
    ll n; cin >> n;
    int maxlen = 0;
    ll start = 0;
    for(ll i = 2;i*i <= n;++i){
        ll tmp = 1;
        int len = 0;
        for(int j = i;;++j){
            tmp *= j;
            if(n%tmp != 0) break;
            ++len;
        }
        if(len > maxlen){
            maxlen = len;
            start = i;
        }
    }
    if(maxlen == 0){
        cout << 1 << '\n' << n << '\n';
    }else{
        cout << maxlen << '\n';
        for(int i = 0;i < maxlen;++i){
            if(i) cout << "*";
            cout << start+i;
        }
        cout << '\n';
    }
    return;
}
```


### 3. L1-009 N个数求和

a/b \* c/d 分子部分是ad+cb，分母部分是bd


```cpp
int gcd(int a,int b){
    return b == 0 ? abs(a) : gcd(b,a%b);
}

void solve(){
    int n; cin >> n;
    int fz = 0,fm = 1;
    for(int i = 0;i < n;++i){
        int a,b; char op; cin >> a >> op >> b;
        fz = a*fm+b*fz;
        fm = fm*b;
        int g = gcd(fz,fm);
        fz /= g;
        fm /= g;
    }
    if(fz == 0){
        cout << 0 << '\n';
        return;
    }
    int inter = fz/fm;
    int rem = abs(fz%fm);

    if(rem == 0){
        cout << inter << '\n';
    }else if(inter == 0){
        if(fz < 0) cout << "-";
        cout << rem << "/" << fm << '\n';
    }else{
        cout << inter << " " << rem << "/" << fm << '\n';
    }
}
```


### 4. L1-011 A-B

- 先把字符串 B 里出现过的字符标记下来
- 再遍历 A
- 如果当前字符不在 B 里，就输出

因为是 ASCII 字符，直接开个数组记是否出现最方便，因为他是0-255，所以开个256的数组

unsigned char 是为了防止字符转成数字的时候变成负数(因为有时候他是signed char)


```cpp
void solve(){
    string a,b;
    getline(cin,a);
    getline(cin,b);

    bool vis[256] = {false};
    for(char c : b){
        vis[(unsigned char)c] = true;
    }
    for(char c : a){
        if(!vis[(unsigned char)c]){
            cout << c;
        }
    }
    cout << '\n';
}
```


### 5. L1-020 帅到没朋友

- k > 1 的朋友圈里所有人都标记为“有朋友”
- 查询时，如果这个人不在 hasFriend 里，说明他“帅到没朋友”
- 但同一个查询 ID 只能输出一次，所以再用一个 printed 去重

可以用unordered\_set的count来代替bool ok

unordered\_set的用法


```cpp
void solve(){
    int n; cin >> n;
    unordered_set<string> hasFriend;
    for(int i = 0;i < n;++i){
        int k; cin >> k;
        vector<string> group(k);
        for(int j = 0;j < k;++j){
            cin >> group[j];
        }
        if(k > 1){
            for(int j = 0;j < k;++j){
                hasFriend.insert(group[j]);
            }
        }
        
    }
    int m; cin >> m;
    unordered_set<string> printed;
    vector<string> res;
    
    for(int i = 0;i < m;++i){
        string id; cin >> id;
        if(!hasFriend.count(id) && !printed.count(id)){
            res.push_back(id);
            printed.insert(id);
        }
    }
    if(res.empty()){
        cout << "No one is handsome\n";
    }else{
        for(size_t i = 0;i < res.size();++i){
            if(i) cout << " ";
            cout << res[i];
        }
        cout << '\n';
    }
}
```


### 6. L1-023 输出GPLT

- toupper(c)：转大写
- tolower(c)：转小写


```cpp
void solve(){
    string s;
    cin >> s;
    int g = 0,p = 0,l = 0,t = 0;
    for(char c : s){
        c = toupper(c);
        if (c == 'G') g++;
        else if (c == 'P') p++;
        else if (c == 'L') l++;
        else if (c == 'T') t++;
    }
    while(g || p || l || t){
          if(g) cout << 'G',g--;
          if(p) cout << 'P',p--;
          if(l) cout << 'L',l--;
          if(t) cout << 'T',t--;
    }
    cout << '\n';
}
```


### 7. L1-027 出租


```cpp
vector<int> arr;
bool vis[10];

void solve(){
    string s; cin >> s;
    for(char c : s){
        int x = c - '0';
        if(!vis[x]){
            vis[x] = true;
            arr.push_back(x);
        }
    }
    sort(arr.begin(),arr.end(),greater<int>());
    cout << "int[] arr = new int[]{";
    for(size_t i = 0;i < arr.size();++i){
        if(i) cout << ",";
        cout << arr[i];
    }
    cout << "};\n";
    cout << "int[] index = new int[]{";
    for(size_t i = 0;i < s.size();++i){
        int x = s[i]-'0';
        for(size_t j = 0;j < arr.size();++j){
            if(arr[j] == x){
                if(i) cout << ",";
                cout << j;
                break;
            }
        }
    }
    cout << "};\n";
}
```


### 8. L1-032 Left-pad

substr(pos,len);


```cpp
void solve(){
    int n; char ch; cin >> n >> ch;
    string s;
    cin.ignore();
    getline(cin,s);
    int len = (int)s.size();
    if(n > len){
        cout << string(n-len,ch)<< s << '\n';
    }else{
        cout << s.substr(len-n) << '\n';
    }
}
```


### 9. L1-034 点赞

依旧是舍弃结构体，直接写


```cpp
void solve(){
    int n; cin >> n;
    int cnt[1001] = {0};
    for(int i = 1;i <= n;++i){
        int k; cin >> k;
        for(int j = 0;j < k;++j){
            int x; cin >> x;
            cnt[x]++;
        }
    }
    int ansId = 0,ansCnt = 0;
    for(int i = 1;i <= 1000;++i){
        if(cnt[i] > ansCnt || (cnt[i] == ansCnt && i > ansId)){
            ansCnt = cnt[i];
            ansId = i;
        }
    }
    cout << ansId << ' ' << ansCnt << '\n';
}
```


### 10. L1-039 古风排版


```cpp
//矩阵处理
void solve(){
    int n; cin >> n; cin.ignore();
    string s; getline(cin,s);

    int len = (int)s.length();
    int col = (len+n-1)/n;
    char a[105][1005];
    
    for(int i = 0;i < n;++i)
        for(int j = 0;j < col;++j)
            a[i][j] = ' ';
    int k = 0;
    for(int j = col-1;j >= 0;--j)
        for(int i = 0;i < n;++i)
            if(k < len)
                a[i][j] = s[k++];
    for(int i = 0;i < n;++i){
        for(int j = 0;j < col;++j)
            cout << a[i][j];
        cout << '\n';
    }
}
//直接cout
void solve(){
    int n; cin >> n; cin.ignore();
    string s; getline(cin,s);

    int len = (int)s.length();
    int col = (len+n-1)/n;
    for(int i = 0;i < n;++i){
        for(int j = 0;j < col;++j){
            int idx = (col-j-1)*n+i;
            if(idx < len) cout << s[idx];
            else cout << " ";
        }
        cout << '\n';
    }
}
```


### 11. L1-043 阅览室

四舍五入：(sum+cnt/2)/cnt

分类讨论


```cpp
void solve(){
    int n; cin >> n;
    while(n--){
        int start[1010] = {0};
        bool ok[1010] = {false};
        int id,h,m;
        char op,ch;
        int sum = 0,cnt = 0;
        while(cin >> id >> op >> h >> ch >> m){
            if(id == 0) break;
            int t = 60*h+m;
            if(op == 'S'){
                start[id] = t;
                ok[id] = true;
            }else if(op == 'E'){
                if(ok[id]){
                    sum += t-start[id];
                    cnt++;
                    ok[id] = false;
                }
            }
        }
        if(cnt == 0) cout << "0 0" << '\n';
        else cout << cnt << ' ' << (sum+cnt/2)/cnt << '\n';
    }
}
```


### 12. L1-046 整除光棍

常规方法会tle。

因为光棍可能非常大，真正要做的是模拟竖式除法。

设当前被除数的一部分是 t，每次：

- 商增加一位：t / x
- 新余数变成：t % x
- 然后在余数后面再“补一个 1”，变成下一轮的 t = (t % x) \* 10 + 1

一直做到余数为 0 为止。

这样：

- 依次输出出来的商位拼起来，就是最小的 s
- 一共做了多少轮，就是光棍的位数 n

拿 31 举例，本质是在做：

- 1 / 31，商 0，余 1
- 11 / 31，商 0，余 11
- 111 / 31，商 3，余 18
- 181 / 31，商 5，余 26
- …

  最后会输出：

  3584229390681 15


```cpp
void solve(){
    int x; cin >> x;
    int t = 1;
    int n = 0;
    bool ok = false;
    while(true){
        int q = t/x;
        int r = t%x;
        if(q != 0 || ok){ //ok是为了防止前导0
            cout << q ;
            ok = true;
        }
        n++;
        if(r == 0) break;
        t = r*10+1;
    }
    cout << ' ' << n << '\n';
}
```


### 13. L1-049 天梯赛座位分配


```cpp
void solve(){
    int n; cin >> n;
    vector<int> team(n+1); //每个学校多少队
    vector<int> rem(n+1); // 每个学校还剩多少人
    vector<vector<int>> seat(n+1); //座位号

    for(int i = 1;i <= n;++i){
        cin >> team[i];
        rem[i] = team[i]*10;
    }
    int pos = 1;
    int prev = 0;
    while(true){
        int cnt = 0; //还有几所学校没分配完
        int last = 0;
        for(int i = 1;i <= n;++i){
            if(rem[i] > 0){
                cnt++;
                last = i;
            }
        }
        if(cnt == 0) break;
        if(cnt > 1){
            for(int i = 1;i <= n;++i){
                if(rem[i] > 0){
                    seat[i].push_back(pos);
                    pos++;
                    rem[i]--;
                    prev = i;
                }
            }
        }else{
            if(prev == last) pos++;
            while(rem[last] > 0){
                seat[last].push_back(pos);
                rem[last]--;
                pos += 2;
                prev = last;
            }
        }
    }
    for(int i = 1;i <= n;++i){
        cout << "#" << i << '\n';
        for(int j = 0;j < team[i]*10;++j){
            if(j > 0 && j % 10 != 0) cout << ' ';
            cout << seat[i][j];
            if(j % 10 == 9) cout << '\n';
        }
    }
}
```


### 14. L1-056 猜数字


```cpp
struct node{
    string name;
    int score;
    int diff;

    bool operator<(const node& o) const{
        return diff < o.diff;
    }
};

void solve(){
    int n; cin >> n;
    vector<node> p(n);
    int sum = 0;
    for(int i = 0;i < n;++i){
        cin >> p[i].name >> p[i].score;
        sum += p[i].score;
    }
    sum /= n;
    for(int i = 0;i < n;++i){
        p[i].diff = abs(p[i].score-sum/2);
    }
    sort(p.begin(),p.end());
    cout << sum/2 << ' ' << p[0].name << '\n';
}
```


### 15. L1-059 敲笨钟


```cpp

```


### 16. L1-064 估值一亿的AI核心代码


```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

// 判断字符是否为分隔符（空格或标点）
bool isSeparator(char c) {
    return !isalnum(c);
}

int main() {
    int n;
    cin >> n;
    cin.ignore(); // 忽略换行符
    
    while (n--) {
        string s;
        getline(cin, s);
        
        // 1. 原样输出
        cout << s << endl;
        
        // 2. 处理多余空格和大小写，以及问号替换
        string processed;
        bool lastSpace = false;
        
        // 去掉首尾空格（先不处理，在构造时处理）
        int start = 0, end = s.length() - 1;
        while (start <= end && s[start] == ' ') start++;
        while (end >= start && s[end] == ' ') end--;
        
        for (int i = start; i <= end; i++) {
            if (s[i] == ' ') {
                if (!lastSpace) {
                    processed += ' ';
                    lastSpace = true;
                }
            } else if (s[i] == '?') {
                processed += '!';
                lastSpace = false;
            } else if (s[i] == 'I') {
                // 保持 I 大写，后续替换处理
                processed += 'I';
                lastSpace = false;
            } else if (isupper(s[i])) {
                processed += tolower(s[i]);
                lastSpace = false;
            } else {
                processed += s[i];
                lastSpace = false;
            }
        }
        
        // 3. 去掉标点前的空格
        string noSpaceBeforePunct;
        for (size_t i = 0; i < processed.length(); i++) {
            if (processed[i] == ' ' && i + 1 < processed.length() && 
                isSeparator(processed[i + 1])) {
                continue; // 跳过标点前的空格
            }
            noSpaceBeforePunct += processed[i];
        }
        
        // 4. 单词独立替换
        // 为了方便判断独立单词，我们在前后加空格
        string temp = " " + noSpaceBeforePunct + " ";
        
        // 4.1 标记 can you 和 could you
        // 使用临时标记避免干扰
        string::size_type pos;
        
        // 替换 could you
        pos = 0;
        while ((pos = temp.find(" could you ", pos)) != string::npos) {
            // 检查前后是否为分隔符（空格已保证）
            temp.replace(pos, 11, " AAAA ");
            pos += 6;
        }
        
        // 替换 can you
        pos = 0;
        while ((pos = temp.find(" can you ", pos)) != string::npos) {
            temp.replace(pos, 9, " BBBB ");
            pos += 6;
        }
        
        // 4.2 替换 I 和 me
        pos = 0;
        while ((pos = temp.find(" I ", pos)) != string::npos) {
            temp.replace(pos, 3, " you ");
            pos += 5;
        }
        
        pos = 0;
        while ((pos = temp.find(" me ", pos)) != string::npos) {
            temp.replace(pos, 4, " you ");
            pos += 5;
        }
        
        // 4.3 将标记替换回来
        pos = 0;
        while ((pos = temp.find(" AAAA ", pos)) != string::npos) {
            temp.replace(pos, 6, " I could ");
            pos += 9;
        }
        
        pos = 0;
        while ((pos = temp.find(" BBBB ", pos)) != string::npos) {
            temp.replace(pos, 6, " I can ");
            pos += 7;
        }
        
        // 去掉首尾添加的空格
        temp = temp.substr(1, temp.length() - 2);
        
        cout << "AI: " << temp << endl;
    }
    
    return 0;
}
```


### L1-071 前世档案


```cpp

```


### L1-072 刮刮彩票


```cpp

```


### L1-079 天梯赛的善良


```cpp

```


### L1-080 乘法口诀数列


```cpp

```


### L1-087 机工士姆斯塔迪奥


```cpp

```


### L1-088 静静的推荐


```cpp

```


### L1-095 分寝室


```cpp

```


### L1-096 谁管谁叫爹


```cpp

```


### L1-103 整数的持续性


```cpp

```


### L1-104 九宫格


```cpp

```


### L1-111 大幂数


```cpp

```


### L1-112 现代战争


```cpp

```
