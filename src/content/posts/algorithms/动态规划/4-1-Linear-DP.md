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

<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.025ex" role="img" style="vertical-align: -0.025ex;" viewbox="0 -442 600 453" width="1.357ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" data-c="1D45B"></path></g></g></g></svg></mjx-container> 位同学站成一排，音乐老师要请其中的 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.756ex" role="img" style="vertical-align: -0.186ex;" viewbox="0 -694 2343.4 776" width="5.302ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" data-c="1D45B"></path></g><g data-mml-node="mo" transform="translate(822.2,0)"><path d="M84 237T84 250T98 270H679Q694 262 694 250T679 230H98Q84 237 84 250Z" data-c="2212"></path></g><g data-mml-node="mi" transform="translate(1822.4,0)"><path d="M121 647Q121 657 125 670T137 683Q138 683 209 688T282 694Q294 694 294 686Q294 679 244 477Q194 279 194 272Q213 282 223 291Q247 309 292 354T362 415Q402 442 438 442Q468 442 485 423T503 369Q503 344 496 327T477 302T456 291T438 288Q418 288 406 299T394 328Q394 353 410 369T442 390L458 393Q446 405 434 405H430Q398 402 367 380T294 316T228 255Q230 254 243 252T267 246T293 238T320 224T342 206T359 180T365 147Q365 130 360 106T354 66Q354 26 381 26Q429 26 459 145Q461 153 479 153H483Q499 153 499 144Q499 139 496 130Q455 -11 378 -11Q333 -11 305 15T277 90Q277 108 280 121T283 145Q283 167 269 183T234 206T200 217T182 220H180Q168 178 159 139T145 81T136 44T129 20T122 7T111 -2Q98 -11 83 -11Q66 -11 57 -1T48 16Q48 26 85 176T158 471L195 616Q196 629 188 632T149 637H144Q134 637 131 637T124 640T121 647Z" data-c="1D458"></path></g></g></g></svg></mjx-container> 位同学出列，使得剩下的 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.595ex" role="img" style="vertical-align: -0.025ex;" viewbox="0 -694 521 705" width="1.179ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M121 647Q121 657 125 670T137 683Q138 683 209 688T282 694Q294 694 294 686Q294 679 244 477Q194 279 194 272Q213 282 223 291Q247 309 292 354T362 415Q402 442 438 442Q468 442 485 423T503 369Q503 344 496 327T477 302T456 291T438 288Q418 288 406 299T394 328Q394 353 410 369T442 390L458 393Q446 405 434 405H430Q398 402 367 380T294 316T228 255Q230 254 243 252T267 246T293 238T320 224T342 206T359 180T365 147Q365 130 360 106T354 66Q354 26 381 26Q429 26 459 145Q461 153 479 153H483Q499 153 499 144Q499 139 496 130Q455 -11 378 -11Q333 -11 305 15T277 90Q277 108 280 121T283 145Q283 167 269 183T234 206T200 217T182 220H180Q168 178 159 139T145 81T136 44T129 20T122 7T111 -2Q98 -11 83 -11Q66 -11 57 -1T48 16Q48 26 85 176T158 471L195 616Q196 629 188 632T149 637H144Q134 637 131 637T124 640T121 647Z" data-c="1D458"></path></g></g></g></svg></mjx-container> 位同学排成合唱队形。

合唱队形是指这样的一种队形：设 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.595ex" role="img" style="vertical-align: -0.025ex;" viewbox="0 -694 521 705" width="1.179ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M121 647Q121 657 125 670T137 683Q138 683 209 688T282 694Q294 694 294 686Q294 679 244 477Q194 279 194 272Q213 282 223 291Q247 309 292 354T362 415Q402 442 438 442Q468 442 485 423T503 369Q503 344 496 327T477 302T456 291T438 288Q418 288 406 299T394 328Q394 353 410 369T442 390L458 393Q446 405 434 405H430Q398 402 367 380T294 316T228 255Q230 254 243 252T267 246T293 238T320 224T342 206T359 180T365 147Q365 130 360 106T354 66Q354 26 381 26Q429 26 459 145Q461 153 479 153H483Q499 153 499 144Q499 139 496 130Q455 -11 378 -11Q333 -11 305 15T277 90Q277 108 280 121T283 145Q283 167 269 183T234 206T200 217T182 220H180Q168 178 159 139T145 81T136 44T129 20T122 7T111 -2Q98 -11 83 -11Q66 -11 57 -1T48 16Q48 26 85 176T158 471L195 616Q196 629 188 632T149 637H144Q134 637 131 637T124 640T121 647Z" data-c="1D458"></path></g></g></g></svg></mjx-container> 位同学从左到右依次编号为 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.946ex" role="img" style="vertical-align: -0.439ex;" viewbox="0 -666 1722.7 860" width="3.897ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mn"><path d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" data-c="31"></path></g><g data-mml-node="mo" transform="translate(500,0)"><path d="M78 35T78 60T94 103T137 121Q165 121 187 96T210 8Q210 -27 201 -60T180 -117T154 -158T130 -185T117 -194Q113 -194 104 -185T95 -172Q95 -168 106 -156T131 -126T157 -76T173 -3V9L172 8Q170 7 167 6T161 3T152 1T140 0Q113 0 96 17Z" data-c="2C"></path></g><g data-mml-node="mn" transform="translate(944.7,0)"><path d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z" data-c="32"></path></g><g data-mml-node="mo" transform="translate(1444.7,0)"><path d="M78 35T78 60T94 103T137 121Q165 121 187 96T210 8Q210 -27 201 -60T180 -117T154 -158T130 -185T117 -194Q113 -194 104 -185T95 -172Q95 -168 106 -156T131 -126T157 -76T173 -3V9L172 8Q170 7 167 6T161 3T152 1T140 0Q113 0 96 17Z" data-c="2C"></path></g></g></g></svg></mjx-container> … <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="2.009ex" role="img" style="vertical-align: -0.439ex;" viewbox="0 -694 965.7 888" width="2.185ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mo"><path d="M78 35T78 60T94 103T137 121Q165 121 187 96T210 8Q210 -27 201 -60T180 -117T154 -158T130 -185T117 -194Q113 -194 104 -185T95 -172Q95 -168 106 -156T131 -126T157 -76T173 -3V9L172 8Q170 7 167 6T161 3T152 1T140 0Q113 0 96 17Z" data-c="2C"></path></g><g data-mml-node="mi" transform="translate(444.7,0)"><path d="M121 647Q121 657 125 670T137 683Q138 683 209 688T282 694Q294 694 294 686Q294 679 244 477Q194 279 194 272Q213 282 223 291Q247 309 292 354T362 415Q402 442 438 442Q468 442 485 423T503 369Q503 344 496 327T477 302T456 291T438 288Q418 288 406 299T394 328Q394 353 410 369T442 390L458 393Q446 405 434 405H430Q398 402 367 380T294 316T228 255Q230 254 243 252T267 246T293 238T320 224T342 206T359 180T365 147Q365 130 360 106T354 66Q354 26 381 26Q429 26 459 145Q461 153 479 153H483Q499 153 499 144Q499 139 496 130Q455 -11 378 -11Q333 -11 305 15T277 90Q277 108 280 121T283 145Q283 167 269 183T234 206T200 217T182 220H180Q168 178 159 139T145 81T136 44T129 20T122 7T111 -2Q98 -11 83 -11Q66 -11 57 -1T48 16Q48 26 85 176T158 471L195 616Q196 629 188 632T149 637H144Q134 637 131 637T124 640T121 647Z" data-c="1D458"></path></g></g></g></svg></mjx-container>，他们的身高分别为 $t*1,t\_2,<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="0.271ex" role="img" style="vertical-align: 0;" viewbox="0 -120 1172 120" width="2.652ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mo"><path d="M78 60Q78 84 95 102T138 120Q162 120 180 104T199 61Q199 36 182 18T139 0T96 17T78 60ZM525 60Q525 84 542 102T585 120Q609 120 627 104T646 61Q646 36 629 18T586 0T543 17T525 60ZM972 60Q972 84 989 102T1032 120Q1056 120 1074 104T1093 61Q1093 36 1076 18T1033 0T990 17T972 60Z" data-c="2026"></path></g></g></g></svg></mjx-container>,t\_k<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="2.149ex" role="img" style="vertical-align: -0.452ex;" viewbox="0 -750 9000 950" width="20.362ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><text data-variant="italic" font-family="serif" font-size="884px" font-style="italic" transform="scale(1,-1)">，</text></g><g data-mml-node="mi" transform="translate(1000,0)"><text data-variant="normal" font-family="serif" font-size="884px" transform="scale(1,-1)">则</text></g><g data-mml-node="mi" transform="translate(2000,0)"><text data-variant="normal" font-family="serif" font-size="884px" transform="scale(1,-1)">他</text></g><g data-mml-node="mi" transform="translate(3000,0)"><text data-variant="normal" font-family="serif" font-size="884px" transform="scale(1,-1)">们</text></g><g data-mml-node="mi" transform="translate(4000,0)"><text data-variant="normal" font-family="serif" font-size="884px" transform="scale(1,-1)">的</text></g><g data-mml-node="mi" transform="translate(5000,0)"><text data-variant="normal" font-family="serif" font-size="884px" transform="scale(1,-1)">身</text></g><g data-mml-node="mi" transform="translate(6000,0)"><text data-variant="normal" font-family="serif" font-size="884px" transform="scale(1,-1)">高</text></g><g data-mml-node="mi" transform="translate(7000,0)"><text data-variant="normal" font-family="serif" font-size="884px" transform="scale(1,-1)">满</text></g><g data-mml-node="mi" transform="translate(8000,0)"><text data-variant="normal" font-family="serif" font-size="884px" transform="scale(1,-1)">足</text></g></g></g></svg></mjx-container>t\_1< \cdots t*{i+1}><mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="0.271ex" role="img" style="vertical-align: 0;" viewbox="0 -120 1172 120" width="2.652ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mo"><path d="M78 60Q78 84 95 102T138 120Q162 120 180 104T199 61Q199 36 182 18T139 0T96 17T78 60ZM525 60Q525 84 542 102T585 120Q609 120 627 104T646 61Q646 36 629 18T586 0T543 17T525 60ZM972 60Q972 84 989 102T1032 120Q1056 120 1074 104T1093 61Q1093 36 1076 18T1033 0T990 17T972 60Z" data-c="2026"></path></g></g></g></svg></mjx-container>>t\_k(1\le i\le k)$。

你的任务是，已知所有 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.025ex" role="img" style="vertical-align: -0.025ex;" viewbox="0 -442 600 453" width="1.357ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" data-c="1D45B"></path></g></g></g></svg></mjx-container> 位同学的身高，计算最少需要几位同学出列，可以使得剩下的同学排成合唱队形。

对于 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.824ex" role="img" style="vertical-align: -0.127ex;" viewbox="0 -750 1833 806" width="4.147ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mn"><path d="M164 157Q164 133 148 117T109 101H102Q148 22 224 22Q294 22 326 82Q345 115 345 210Q345 313 318 349Q292 382 260 382H254Q176 382 136 314Q132 307 129 306T114 304Q97 304 95 310Q93 314 93 485V614Q93 664 98 664Q100 666 102 666Q103 666 123 658T178 642T253 634Q324 634 389 662Q397 666 402 666Q410 666 410 648V635Q328 538 205 538Q174 538 149 544L139 546V374Q158 388 169 396T205 412T256 420Q337 420 393 355T449 201Q449 109 385 44T229 -22Q148 -22 99 32T50 154Q50 178 61 192T84 210T107 214Q132 214 148 197T164 157Z" data-c="35"></path><path d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" data-c="30" transform="translate(500,0)"></path></g><g data-mml-node="mi" transform="translate(1000,0)"><path d="M465 605Q428 605 394 614T340 632T319 641Q332 608 332 548Q332 458 293 403T202 347Q145 347 101 402T56 548Q56 637 101 693T202 750Q241 750 272 719Q359 642 464 642Q580 642 650 732Q662 748 668 749Q670 750 673 750Q682 750 688 743T693 726Q178 -47 170 -52Q166 -56 160 -56Q147 -56 142 -45Q137 -36 142 -27Q143 -24 363 304Q469 462 525 546T581 630Q528 605 465 605ZM207 385Q235 385 263 427T292 548Q292 617 267 664T200 712Q193 712 186 709T167 698T147 668T134 615Q132 595 132 548V527Q132 436 165 403Q183 385 203 385H207ZM500 146Q500 234 544 290T647 347Q699 347 737 292T776 146T737 0T646 -56Q590 -56 545 0T500 146ZM651 -18Q679 -18 707 24T736 146Q736 215 711 262T644 309Q637 309 630 306T611 295T591 265T578 212Q577 200 577 146V124Q577 -18 647 -18H651Z" data-c="25"></path></g></g></g></svg></mjx-container> 的数据，保证有 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.819ex" role="img" style="vertical-align: -0.312ex;" viewbox="0 -666 2933.6 804" width="6.637ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" data-c="1D45B"></path></g><g data-mml-node="mo" transform="translate(877.8,0)"><path d="M674 636Q682 636 688 630T694 615T687 601Q686 600 417 472L151 346L399 228Q687 92 691 87Q694 81 694 76Q694 58 676 56H670L382 192Q92 329 90 331Q83 336 83 348Q84 359 96 365Q104 369 382 500T665 634Q669 636 674 636ZM84 -118Q84 -108 99 -98H678Q694 -104 694 -118Q694 -130 679 -138H98Q84 -131 84 -118Z" data-c="2264"></path></g><g data-mml-node="mn" transform="translate(1933.6,0)"><path d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z" data-c="32"></path><path d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" data-c="30" transform="translate(500,0)"></path></g></g></g></svg></mjx-container>。

对于全部的数据，保证有 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.819ex" role="img" style="vertical-align: -0.312ex;" viewbox="0 -666 3433.6 804" width="7.768ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" data-c="1D45B"></path></g><g data-mml-node="mo" transform="translate(877.8,0)"><path d="M674 636Q682 636 688 630T694 615T687 601Q686 600 417 472L151 346L399 228Q687 92 691 87Q694 81 694 76Q694 58 676 56H670L382 192Q92 329 90 331Q83 336 83 348Q84 359 96 365Q104 369 382 500T665 634Q669 636 674 636ZM84 -118Q84 -108 99 -98H678Q694 -104 694 -118Q694 -130 679 -138H98Q84 -131 84 -118Z" data-c="2264"></path></g><g data-mml-node="mn" transform="translate(1933.6,0)"><path d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" data-c="31"></path><path d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" data-c="30" transform="translate(500,0)"></path><path d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" data-c="30" transform="translate(1000,0)"></path></g></g></g></svg></mjx-container>。

**输入格式**

共二行。

第一行是一个整数 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.025ex" role="img" style="vertical-align: -0.025ex;" viewbox="0 -442 600 453" width="1.357ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" data-c="1D45B"></path></g></g></g></svg></mjx-container>（<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.819ex" role="img" style="vertical-align: -0.312ex;" viewbox="0 -666 5267.1 804" width="11.917ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mn"><path d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z" data-c="32"></path></g><g data-mml-node="mo" transform="translate(777.8,0)"><path d="M674 636Q682 636 688 630T694 615T687 601Q686 600 417 472L151 346L399 228Q687 92 691 87Q694 81 694 76Q694 58 676 56H670L382 192Q92 329 90 331Q83 336 83 348Q84 359 96 365Q104 369 382 500T665 634Q669 636 674 636ZM84 -118Q84 -108 99 -98H678Q694 -104 694 -118Q694 -130 679 -138H98Q84 -131 84 -118Z" data-c="2264"></path></g><g data-mml-node="mi" transform="translate(1833.6,0)"><path d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" data-c="1D45B"></path></g><g data-mml-node="mo" transform="translate(2711.3,0)"><path d="M674 636Q682 636 688 630T694 615T687 601Q686 600 417 472L151 346L399 228Q687 92 691 87Q694 81 694 76Q694 58 676 56H670L382 192Q92 329 90 331Q83 336 83 348Q84 359 96 365Q104 369 382 500T665 634Q669 636 674 636ZM84 -118Q84 -108 99 -98H678Q694 -104 694 -118Q694 -130 679 -138H98Q84 -131 84 -118Z" data-c="2264"></path></g><g data-mml-node="mn" transform="translate(3767.1,0)"><path d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" data-c="31"></path><path d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" data-c="30" transform="translate(500,0)"></path><path d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" data-c="30" transform="translate(1000,0)"></path></g></g></g></svg></mjx-container>），表示同学的总数。

第二行有 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.025ex" role="img" style="vertical-align: -0.025ex;" viewbox="0 -442 600 453" width="1.357ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" data-c="1D45B"></path></g></g></g></svg></mjx-container> 个整数，用空格分隔，第 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.52ex" role="img" style="vertical-align: -0.025ex;" viewbox="0 -661 345 672" width="0.781ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M184 600Q184 624 203 642T247 661Q265 661 277 649T290 619Q290 596 270 577T226 557Q211 557 198 567T184 600ZM21 287Q21 295 30 318T54 369T98 420T158 442Q197 442 223 419T250 357Q250 340 236 301T196 196T154 83Q149 61 149 51Q149 26 166 26Q175 26 185 29T208 43T235 78T260 137Q263 149 265 151T282 153Q302 153 302 143Q302 135 293 112T268 61T223 11T161 -11Q129 -11 102 10T74 74Q74 91 79 106T122 220Q160 321 166 341T173 380Q173 404 156 404H154Q124 404 99 371T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Z" data-c="1D456"></path></g></g></g></svg></mjx-container> 个整数 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.773ex" role="img" style="vertical-align: -0.357ex;" viewbox="0 -626 688 783.8" width="1.556ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="msub"><g data-mml-node="mi"><path d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z" data-c="1D461"></path></g><g data-mml-node="mi" transform="translate(394,-150) scale(0.707)"><path d="M184 600Q184 624 203 642T247 661Q265 661 277 649T290 619Q290 596 270 577T226 557Q211 557 198 567T184 600ZM21 287Q21 295 30 318T54 369T98 420T158 442Q197 442 223 419T250 357Q250 340 236 301T196 196T154 83Q149 61 149 51Q149 26 166 26Q175 26 185 29T208 43T235 78T260 137Q263 149 265 151T282 153Q302 153 302 143Q302 135 293 112T268 61T223 11T161 -11Q129 -11 102 10T74 74Q74 91 79 106T122 220Q160 321 166 341T173 380Q173 404 156 404H154Q124 404 99 371T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Z" data-c="1D456"></path></g></g></g></g></svg></mjx-container>（<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.864ex" role="img" style="vertical-align: -0.357ex;" viewbox="0 -666 6355.1 823.8" width="14.378ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mn"><path d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" data-c="31"></path><path d="M127 463Q100 463 85 480T69 524Q69 579 117 622T233 665Q268 665 277 664Q351 652 390 611T430 522Q430 470 396 421T302 350L299 348Q299 347 308 345T337 336T375 315Q457 262 457 175Q457 96 395 37T238 -22Q158 -22 100 21T42 130Q42 158 60 175T105 193Q133 193 151 175T169 130Q169 119 166 110T159 94T148 82T136 74T126 70T118 67L114 66Q165 21 238 21Q293 21 321 74Q338 107 338 175V195Q338 290 274 322Q259 328 213 329L171 330L168 332Q166 335 166 348Q166 366 174 366Q202 366 232 371Q266 376 294 413T322 525V533Q322 590 287 612Q265 626 240 626Q208 626 181 615T143 592T132 580H135Q138 579 143 578T153 573T165 566T175 555T183 540T186 520Q186 498 172 481T127 463Z" data-c="33" transform="translate(500,0)"></path><path d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" data-c="30" transform="translate(1000,0)"></path></g><g data-mml-node="mo" transform="translate(1777.8,0)"><path d="M674 636Q682 636 688 630T694 615T687 601Q686 600 417 472L151 346L399 228Q687 92 691 87Q694 81 694 76Q694 58 676 56H670L382 192Q92 329 90 331Q83 336 83 348Q84 359 96 365Q104 369 382 500T665 634Q669 636 674 636ZM84 -118Q84 -108 99 -98H678Q694 -104 694 -118Q694 -130 679 -138H98Q84 -131 84 -118Z" data-c="2264"></path></g><g data-mml-node="msub" transform="translate(2833.6,0)"><g data-mml-node="mi"><path d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z" data-c="1D461"></path></g><g data-mml-node="mi" transform="translate(394,-150) scale(0.707)"><path d="M184 600Q184 624 203 642T247 661Q265 661 277 649T290 619Q290 596 270 577T226 557Q211 557 198 567T184 600ZM21 287Q21 295 30 318T54 369T98 420T158 442Q197 442 223 419T250 357Q250 340 236 301T196 196T154 83Q149 61 149 51Q149 26 166 26Q175 26 185 29T208 43T235 78T260 137Q263 149 265 151T282 153Q302 153 302 143Q302 135 293 112T268 61T223 11T161 -11Q129 -11 102 10T74 74Q74 91 79 106T122 220Q160 321 166 341T173 380Q173 404 156 404H154Q124 404 99 371T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Z" data-c="1D456"></path></g></g><g data-mml-node="mo" transform="translate(3799.3,0)"><path d="M674 636Q682 636 688 630T694 615T687 601Q686 600 417 472L151 346L399 228Q687 92 691 87Q694 81 694 76Q694 58 676 56H670L382 192Q92 329 90 331Q83 336 83 348Q84 359 96 365Q104 369 382 500T665 634Q669 636 674 636ZM84 -118Q84 -108 99 -98H678Q694 -104 694 -118Q694 -130 679 -138H98Q84 -131 84 -118Z" data-c="2264"></path></g><g data-mml-node="mn" transform="translate(4855.1,0)"><path d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z" data-c="32"></path><path d="M127 463Q100 463 85 480T69 524Q69 579 117 622T233 665Q268 665 277 664Q351 652 390 611T430 522Q430 470 396 421T302 350L299 348Q299 347 308 345T337 336T375 315Q457 262 457 175Q457 96 395 37T238 -22Q158 -22 100 21T42 130Q42 158 60 175T105 193Q133 193 151 175T169 130Q169 119 166 110T159 94T148 82T136 74T126 70T118 67L114 66Q165 21 238 21Q293 21 321 74Q338 107 338 175V195Q338 290 274 322Q259 328 213 329L171 330L168 332Q166 335 166 348Q166 366 174 366Q202 366 232 371Q266 376 294 413T322 525V533Q322 590 287 612Q265 626 240 626Q208 626 181 615T143 592T132 580H135Q138 579 143 578T153 573T165 566T175 555T183 540T186 520Q186 498 172 481T127 463Z" data-c="33" transform="translate(500,0)"></path><path d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" data-c="30" transform="translate(1000,0)"></path></g></g></g></svg></mjx-container>）是第 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.52ex" role="img" style="vertical-align: -0.025ex;" viewbox="0 -661 345 672" width="0.781ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M184 600Q184 624 203 642T247 661Q265 661 277 649T290 619Q290 596 270 577T226 557Q211 557 198 567T184 600ZM21 287Q21 295 30 318T54 369T98 420T158 442Q197 442 223 419T250 357Q250 340 236 301T196 196T154 83Q149 61 149 51Q149 26 166 26Q175 26 185 29T208 43T235 78T260 137Q263 149 265 151T282 153Q302 153 302 143Q302 135 293 112T268 61T223 11T161 -11Q129 -11 102 10T74 74Q74 91 79 106T122 220Q160 321 166 341T173 380Q173 404 156 404H154Q124 404 99 371T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Z" data-c="1D456"></path></g></g></g></svg></mjx-container> 位同学的身高（厘米）。

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

Each test contains multiple test cases. The first line contains the number of test cases t (1≤t≤<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="2.022ex" role="img" style="vertical-align: -0.05ex;" viewbox="0 -871.8 1436.6 893.8" width="3.25ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="msup"><g data-mml-node="mn"><path d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" data-c="31"></path><path d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" data-c="30" transform="translate(500,0)"></path></g><g data-mml-node="mn" transform="translate(1033,393.1) scale(0.707)"><path d="M462 0Q444 3 333 3Q217 3 199 0H190V46H221Q241 46 248 46T265 48T279 53T286 61Q287 63 287 115V165H28V211L179 442Q332 674 334 675Q336 677 355 677H373L379 671V211H471V165H379V114Q379 73 379 66T385 54Q393 47 442 46H471V0H462ZM293 211V545L74 212L183 211H293Z" data-c="34"></path></g></g></g></g></svg></mjx-container>). The description of the test cases follows.

The first line of each test case contains one integer n (1≤n≤2⋅<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="2.005ex" role="img" style="vertical-align: -0.05ex;" viewbox="0 -864 1436.6 886" width="3.25ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="msup"><g data-mml-node="mn"><path d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" data-c="31"></path><path d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" data-c="30" transform="translate(500,0)"></path></g><g data-mml-node="mn" transform="translate(1033,393.1) scale(0.707)"><path d="M164 157Q164 133 148 117T109 101H102Q148 22 224 22Q294 22 326 82Q345 115 345 210Q345 313 318 349Q292 382 260 382H254Q176 382 136 314Q132 307 129 306T114 304Q97 304 95 310Q93 314 93 485V614Q93 664 98 664Q100 666 102 666Q103 666 123 658T178 642T253 634Q324 634 389 662Q397 666 402 666Q410 666 410 648V635Q328 538 205 538Q174 538 149 544L139 546V374Q158 388 169 396T205 412T256 420Q337 420 393 355T449 201Q449 109 385 44T229 -22Q148 -22 99 32T50 154Q50 178 61 192T84 210T107 214Q132 214 148 197T164 157Z" data-c="35"></path></g></g></g></g></svg></mjx-container>).

The second and third lines of each test case describe the colors of the cells. Each line contains a string consisting of exactly n letters “R” and/or “B”.

Additional constraint on the input:

- the sum of n over all test cases does not exceed 2⋅<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="2.005ex" role="img" style="vertical-align: -0.05ex;" viewbox="0 -864 1436.6 886" width="3.25ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="msup"><g data-mml-node="mn"><path d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" data-c="31"></path><path d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" data-c="30" transform="translate(500,0)"></path></g><g data-mml-node="mn" transform="translate(1033,393.1) scale(0.707)"><path d="M164 157Q164 133 148 117T109 101H102Q148 22 224 22Q294 22 326 82Q345 115 345 210Q345 313 318 349Q292 382 260 382H254Q176 382 136 314Q132 307 129 306T114 304Q97 304 95 310Q93 314 93 485V614Q93 664 98 664Q100 666 102 666Q103 666 123 658T178 642T253 634Q324 634 389 662Q397 666 402 666Q410 666 410 648V635Q328 538 205 538Q174 538 149 544L139 546V374Q158 388 169 396T205 412T256 420Q337 420 393 355T449 201Q449 109 385 44T229 -22Q148 -22 99 32T50 154Q50 178 61 192T84 210T107 214Q132 214 148 197T164 157Z" data-c="35"></path></g></g></g></g></svg></mjx-container>.

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
