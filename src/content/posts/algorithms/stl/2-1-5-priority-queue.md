---
title: "2.1.5 priority_queue"
published: 2026-05-14
updated: 2026-05-14
description: "priority_queue优先队列与普通队列不同，总是将优先级最高（或最低）的元素置于队列的前端。默认情况下，priority_queue使用最大堆实现，即优先级最高的元素将最先被移除。 一、结构priority_queue只维护堆顶的元素，即队列的队头(top)，这种数据结构适用于需要快速访问最优先处理项的场景。 小根堆：最小值优先，堆顶top()永远是当前最小元素 ​"
image: "/img/2.jpg"
tags: ["stl", "priority_queue"]
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/14/2-1-5-priority-queue/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "stl"
topic: "算法竞赛"
---

# priority\_queue

优先队列与普通队列不同，总是将优先级最高（或最低）的元素置于队列的前端。默认情况下，priority\_queue使用最大堆实现，即优先级最高的元素将最先被移除。

## 一、结构

priority\_queue只维护堆顶的元素，即队列的队头(top)，这种数据结构适用于需要快速访问最优先处理项的场景。

小根堆：最小值优先，堆顶top()永远是当前最小元素

​ `priority_queue<int,vector<int>,greater<int>>`

大根堆：最大值优先，堆顶top()永远是当前最大元素

​ `priority_queue<int,vector<int>,less<int>>`（默认）

而priority\_queue底层就是堆，通常是用vector存成数组，再映射成完全二叉树。

以大堆栈压入 3，2，8，8，10为例：

![3](/img/3.png)

以大根堆为例，只保证每个父节点 ≥ 子节点，且堆顶（根）最大。

维护过程：

push(x)：先放数组末尾，再“上浮”，若比父节点大就交换，一直到交换不动为止

![4](/img/4.png)

pop()：删除堆顶，再把最后一个元素放到堆顶，再不断“下沉”，和更大的孩子比，不满足就交换，直到满足堆性质

![5](/img/5.png)

## 二、初始化

头文件：`<bits/stdc++.h> or <queue>`

当然，要声明一个priority\_queue，需要指定数据类型Type。还有，如果要使用自定义结构体的时候，必须**重载小于运算符**或者**定义比较类cmp**并**重载括号运算符**


```cpp
struct node{
    int x,y;
    bool operator < (const node& o) const{
        return x == o.x ? y < o.y : x < o.x;
    }
};

struct cmp{
    bool operator () (const int& a,const int& b) const{
        return a > b;
    }
};

void solve(){
    //声明一个以结构体为类型的优先队列
    priority_queue<node> pq1;
    //声明一个以int为类型、vector为容器、cmp为比较类的优先队列
    priority_queue<int,vector<int>,cmp> pq2;
    
    for(int i = 1;i <= 5;++i){
        pq1.push({i,2*i});
        pq2.push(i);
    }
    while(pq1.size()){
        cout << pq1.top().x << ' ' << pq1.top().y << '\n';
        pq1.pop();
    }
    while(!pq2.empty()){
        cout << pq2.top() << '\n';
        pq2.pop();
    }
    return;
}
/*
5 10
4 8
3 6
2 4
1 2
1
2
3
4
5
*/
```


对于这里的cmp，有些人可能就要说了，主播主播，我怎么记得sort里面的cmp好像不是这样的啊。没错，priority\_queue的cmp是定义谁的优先级更低而不是谁排在前面。也就是说，对于cmp(a,b)，如果是a > b，那也就是说大的a的优先级更低，即小的在堆顶（小根堆），如果是a < b，也就是说小的a的优先级更低，即大的在堆顶（大根堆）。当然要硬记的话，可以记，**如果是大于号，说明是小根堆，如果是小于号，说明是大根堆**。**（大小小大）**

然后就又有人说了，主播主播，操作太快了，没看明白怎么办。没事没事~

## 三、cmp

### 1. 标准比较器


```cpp
priority_queue<int,vector<int>,greater<int>> minHeap;
priority_queue<int,vector<int>,less<int>> maxHeap; //默认
||
\/
priority_queue<int> maxHeap;
```


### 2. 结构体重载小于运算符


```cpp
struct node{
    int x,y;
    bool operator< (const node& o) const{
        return x < o.x;
    }
};
priority_queue<node> pq;
```


### 3. 自定义仿函数


```cpp
struct cmp{
    bool operator() (const int a,const int b) const{
        return a > b;
    }
};
priority_queue<int,vector<int>,cmp> pq;
```


### 4. Lambda 比较器（decltype(cmp)）


```cpp
auto cmp = [](int a,int b){ return a > b; }
priority_queue<int,vector<int>,decltype(cmp)> pq;
```


decltype：declared type（声明变量）

### 5. 函数指针法

看书的时候有见过，但这个毕竟太冷门了，不建议使用，有兴趣可以自己学。

## 四、基本操作

`push(x)` O(logn)

`pop()` O(logn)

`top()` O(1)

`size()` O(1)

`empty()` O(1)

[**注**]：1. priority\_queue不提供迭代器iterator，因此无法使用类似begin()和end()这样的函数以及for auto 来遍历队列。2. 此外，也不能直接修改队列中的元素。3. 调用top()后紧接着调用pop()，并在pop()之前，应确保队列非空。

## 五、例题

### 例1：中位数

[门钥匙](https://pintia.cn/problem-sets/2044021680550948864/exam/problems/type/7?problemSetProblemId=2044021680785829899)

给出*n*个数，将这*n*个数依次放入一个初始为空的集合中（不去重），要求你每放入一个数，输出当前集合的中位数，如果集合大小为偶数，则中位数为这个集合中第<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="4.081ex" role="img" style="vertical-align: -1.552ex;" viewbox="0 -1118 1040 1804" width="2.353ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mstyle"><g data-mml-node="mfrac"><g data-mml-node="mi" transform="translate(220,676)"><path d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" data-c="1D45B"></path></g><g data-mml-node="mn" transform="translate(270,-686)"><path d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z" data-c="32"></path></g><rect height="60" width="800" x="120" y="220"></rect></g></g></g></g></svg></mjx-container>大的数，如果集合大小为奇数，则中位数为这个集合中第<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="4.588ex" role="img" style="vertical-align: -1.552ex;" viewbox="0 -1342 2762.4 2028" width="6.25ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mstyle"><g data-mml-node="mfrac"><g data-mml-node="mrow" transform="translate(220,676)"><g data-mml-node="mi"><path d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" data-c="1D45B"></path></g><g data-mml-node="mo" transform="translate(822.2,0)"><path d="M56 237T56 250T70 270H369V420L370 570Q380 583 389 583Q402 583 409 568V270H707Q722 262 722 250T707 230H409V-68Q401 -82 391 -82H389H387Q375 -82 369 -68V230H70Q56 237 56 250Z" data-c="2B"></path></g><g data-mml-node="mn" transform="translate(1822.4,0)"><path d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" data-c="31"></path></g></g><g data-mml-node="mn" transform="translate(1131.2,-686)"><path d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z" data-c="32"></path></g><rect height="60" width="2522.4" x="120" y="220"></rect></g></g></g></g></svg></mjx-container>大的数。换句话说，你需要找出前1个数的中位数、前2个数的中位数、前3个数的中位数…依次类推直到前<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.025ex" role="img" style="vertical-align: -0.025ex;" viewbox="0 -442 600 453" width="1.357ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" data-c="1D45B"></path></g></g></g></svg></mjx-container>个数的中位数。

**输入格式**

输入包含两行，第一行输入一个整数<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="2.407ex" role="img" style="vertical-align: -0.452ex;" viewbox="0 -864 7303.7 1064" width="16.524ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" data-c="1D45B"></path></g><g data-mml-node="mi" transform="translate(600,0)"><text data-variant="italic" font-family="serif" font-size="884px" font-style="italic" transform="scale(1,-1)">，</text></g><g data-mml-node="mn" transform="translate(1600,0)"><path d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" data-c="31"></path></g><g data-mml-node="mo" transform="translate(2377.8,0)"><path d="M674 636Q682 636 688 630T694 615T687 601Q686 600 417 472L151 346L399 228Q687 92 691 87Q694 81 694 76Q694 58 676 56H670L382 192Q92 329 90 331Q83 336 83 348Q84 359 96 365Q104 369 382 500T665 634Q669 636 674 636ZM84 -118Q84 -108 99 -98H678Q694 -104 694 -118Q694 -130 679 -138H98Q84 -131 84 -118Z" data-c="2264"></path></g><g data-mml-node="mtext" transform="translate(3433.6,0)"><path d="" data-c="A0"></path></g><g data-mml-node="mi" transform="translate(3683.6,0)"><path d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" data-c="1D45B"></path></g><g data-mml-node="mo" transform="translate(4561.3,0)"><path d="M674 636Q682 636 688 630T694 615T687 601Q686 600 417 472L151 346L399 228Q687 92 691 87Q694 81 694 76Q694 58 676 56H670L382 192Q92 329 90 331Q83 336 83 348Q84 359 96 365Q104 369 382 500T665 634Q669 636 674 636ZM84 -118Q84 -108 99 -98H678Q694 -104 694 -118Q694 -130 679 -138H98Q84 -131 84 -118Z" data-c="2264"></path></g><g data-mml-node="mtext" transform="translate(5617.1,0)"><path d="" data-c="A0"></path></g><g data-mml-node="msup" transform="translate(5867.1,0)"><g data-mml-node="mn"><path d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" data-c="31"></path><path d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" data-c="30" transform="translate(500,0)"></path></g><g data-mml-node="mn" transform="translate(1033,393.1) scale(0.707)"><path d="M164 157Q164 133 148 117T109 101H102Q148 22 224 22Q294 22 326 82Q345 115 345 210Q345 313 318 349Q292 382 260 382H254Q176 382 136 314Q132 307 129 306T114 304Q97 304 95 310Q93 314 93 485V614Q93 664 98 664Q100 666 102 666Q103 666 123 658T178 642T253 634Q324 634 389 662Q397 666 402 666Q410 666 410 648V635Q328 538 205 538Q174 538 149 544L139 546V374Q158 388 169 396T205 412T256 420Q337 420 393 355T449 201Q449 109 385 44T229 -22Q148 -22 99 32T50 154Q50 178 61 192T84 210T107 214Q132 214 148 197T164 157Z" data-c="35"></path></g></g></g></g></svg></mjx-container>。

第二行输入<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.025ex" role="img" style="vertical-align: -0.025ex;" viewbox="0 -442 600 453" width="1.357ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" data-c="1D45B"></path></g></g></g></svg></mjx-container>个整数<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.355ex" role="img" style="vertical-align: -0.357ex;" viewbox="0 -441 856 598.8" width="1.937ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="msub"><g data-mml-node="mi"><path d="M33 157Q33 258 109 349T280 441Q331 441 370 392Q386 422 416 422Q429 422 439 414T449 394Q449 381 412 234T374 68Q374 43 381 35T402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487Q506 153 506 144Q506 138 501 117T481 63T449 13Q436 0 417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157ZM351 328Q351 334 346 350T323 385T277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q217 26 254 59T298 110Q300 114 325 217T351 328Z" data-c="1D44E"></path></g><g data-mml-node="mi" transform="translate(562,-150) scale(0.707)"><path d="M184 600Q184 624 203 642T247 661Q265 661 277 649T290 619Q290 596 270 577T226 557Q211 557 198 567T184 600ZM21 287Q21 295 30 318T54 369T98 420T158 442Q197 442 223 419T250 357Q250 340 236 301T196 196T154 83Q149 61 149 51Q149 26 166 26Q175 26 185 29T208 43T235 78T260 137Q263 149 265 151T282 153Q302 153 302 143Q302 135 293 112T268 61T223 11T161 -11Q129 -11 102 10T74 74Q74 91 79 106T122 220Q160 321 166 341T173 380Q173 404 156 404H154Q124 404 99 371T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Z" data-c="1D456"></path></g></g></g></g></svg></mjx-container>，每个整数之间空一个空格，<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="2.312ex" role="img" style="vertical-align: -0.357ex;" viewbox="0 -864 5959.6 1021.8" width="13.483ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mn"><path d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" data-c="31"></path></g><g data-mml-node="mo" transform="translate(777.8,0)"><path d="M674 636Q682 636 688 630T694 615T687 601Q686 600 417 472L151 346L399 228Q687 92 691 87Q694 81 694 76Q694 58 676 56H670L382 192Q92 329 90 331Q83 336 83 348Q84 359 96 365Q104 369 382 500T665 634Q669 636 674 636ZM84 -118Q84 -108 99 -98H678Q694 -104 694 -118Q694 -130 679 -138H98Q84 -131 84 -118Z" data-c="2264"></path></g><g data-mml-node="mtext" transform="translate(1833.6,0)"><path d="" data-c="A0"></path></g><g data-mml-node="msub" transform="translate(2083.6,0)"><g data-mml-node="mi"><path d="M33 157Q33 258 109 349T280 441Q331 441 370 392Q386 422 416 422Q429 422 439 414T449 394Q449 381 412 234T374 68Q374 43 381 35T402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487Q506 153 506 144Q506 138 501 117T481 63T449 13Q436 0 417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157ZM351 328Q351 334 346 350T323 385T277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q217 26 254 59T298 110Q300 114 325 217T351 328Z" data-c="1D44E"></path></g><g data-mml-node="mi" transform="translate(562,-150) scale(0.707)"><path d="M184 600Q184 624 203 642T247 661Q265 661 277 649T290 619Q290 596 270 577T226 557Q211 557 198 567T184 600ZM21 287Q21 295 30 318T54 369T98 420T158 442Q197 442 223 419T250 357Q250 340 236 301T196 196T154 83Q149 61 149 51Q149 26 166 26Q175 26 185 29T208 43T235 78T260 137Q263 149 265 151T282 153Q302 153 302 143Q302 135 293 112T268 61T223 11T161 -11Q129 -11 102 10T74 74Q74 91 79 106T122 220Q160 321 166 341T173 380Q173 404 156 404H154Q124 404 99 371T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Z" data-c="1D456"></path></g></g><g data-mml-node="mo" transform="translate(3217.3,0)"><path d="M674 636Q682 636 688 630T694 615T687 601Q686 600 417 472L151 346L399 228Q687 92 691 87Q694 81 694 76Q694 58 676 56H670L382 192Q92 329 90 331Q83 336 83 348Q84 359 96 365Q104 369 382 500T665 634Q669 636 674 636ZM84 -118Q84 -108 99 -98H678Q694 -104 694 -118Q694 -130 679 -138H98Q84 -131 84 -118Z" data-c="2264"></path></g><g data-mml-node="mtext" transform="translate(4273.1,0)"><path d="" data-c="A0"></path></g><g data-mml-node="msup" transform="translate(4523.1,0)"><g data-mml-node="mn"><path d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" data-c="31"></path><path d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" data-c="30" transform="translate(500,0)"></path></g><g data-mml-node="mn" transform="translate(1033,393.1) scale(0.707)"><path d="M164 157Q164 133 148 117T109 101H102Q148 22 224 22Q294 22 326 82Q345 115 345 210Q345 313 318 349Q292 382 260 382H254Q176 382 136 314Q132 307 129 306T114 304Q97 304 95 310Q93 314 93 485V614Q93 664 98 664Q100 666 102 666Q103 666 123 658T178 642T253 634Q324 634 389 662Q397 666 402 666Q410 666 410 648V635Q328 538 205 538Q174 538 149 544L139 546V374Q158 388 169 396T205 412T256 420Q337 420 393 355T449 201Q449 109 385 44T229 -22Q148 -22 99 32T50 154Q50 178 61 192T84 210T107 214Q132 214 148 197T164 157Z" data-c="35"></path></g></g></g></g></svg></mjx-container>。

**输出格式**

输出包含<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.025ex" role="img" style="vertical-align: -0.025ex;" viewbox="0 -442 600 453" width="1.357ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" data-c="1D45B"></path></g></g></g></svg></mjx-container>行，第<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.52ex" role="img" style="vertical-align: -0.025ex;" viewbox="0 -661 345 672" width="0.781ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M184 600Q184 624 203 642T247 661Q265 661 277 649T290 619Q290 596 270 577T226 557Q211 557 198 567T184 600ZM21 287Q21 295 30 318T54 369T98 420T158 442Q197 442 223 419T250 357Q250 340 236 301T196 196T154 83Q149 61 149 51Q149 26 166 26Q175 26 185 29T208 43T235 78T260 137Q263 149 265 151T282 153Q302 153 302 143Q302 135 293 112T268 61T223 11T161 -11Q129 -11 102 10T74 74Q74 91 79 106T122 220Q160 321 166 341T173 380Q173 404 156 404H154Q124 404 99 371T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Z" data-c="1D456"></path></g></g></g></svg></mjx-container>行的整数表示将第<mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.52ex" role="img" style="vertical-align: -0.025ex;" viewbox="0 -661 345 672" width="0.781ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M184 600Q184 624 203 642T247 661Q265 661 277 649T290 619Q290 596 270 577T226 557Q211 557 198 567T184 600ZM21 287Q21 295 30 318T54 369T98 420T158 442Q197 442 223 419T250 357Q250 340 236 301T196 196T154 83Q149 61 149 51Q149 26 166 26Q175 26 185 29T208 43T235 78T260 137Q263 149 265 151T282 153Q302 153 302 143Q302 135 293 112T268 61T223 11T161 -11Q129 -11 102 10T74 74Q74 91 79 106T122 220Q160 321 166 341T173 380Q173 404 156 404H154Q124 404 99 371T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Z" data-c="1D456"></path></g></g></g></svg></mjx-container>个数加入集合后集合的中位数是多少。

| 样例输入 [ in ] | 样例输出 [ out ] |
| --- | --- |
| 5 | 3 |
| 3 2 8 8 10 | 2 |
|  | 3 |
|  | 3 |
|  | 8 |

**题解**

用“对顶堆”即可，O(n log n)：

left：大根堆，存较小一半

right：小根堆，存较大一半

保持 left.size() == right.size() 或 left.size() == right.size() + 1

这样每次中位数就是 left.top()（正好符合题目偶数取第 n/2 大，也就是下中位数）

**代码**


```cpp
void solve(){
    int n; cin >> n;
    priority_queue<int> left;
    priority_queue<int,vector<int>,greater<int>> right;

    for(int i = 0;i < n;++i){
        int x; cin >> x;
        if(left.empty() || x <= left.top()) left.push(x);
        else right.push(x);

        if(left.size() < right.size()){
            left.push(right.top());
            right.pop();
        }else if(left.size() > right.size()+1){
            right.push(left.top());
            left.pop();
        }
        cout << left.top() << '\n';
    }
    return;
}
```


**样例实现**

样例 n=5, 序列=3 2 8 8 10 的完整流程如下。

变量说明：

- left：大根堆（较小一半），堆顶 left.top() 是当前答案
- right：小根堆（较大一半）
- 平衡规则：left.size() == right.size() 或 left.size() == right.size()+1

  为便于看懂，下面把堆内容写成“有序视图”（不是底层存储顺序）：

  1. 读入 x=3
- 初始：left=[], right=[]
- left 空，3 入 left
- 平衡前：left=[3], right=[]
- 已平衡（1 和 0）
- 输出：left.top()=3

  1. 读入 x=2
- 当前：left=[3], right=[]
- 2 <= left.top(3)，入 left
- 平衡前：left=[3,2], right=[]
- left 比 right 多了 2 个，不合法
- 调整：left.top=3 移到 right
- 平衡后：left=[2], right=[3]
- 输出：left.top()=2

  1. 读入 x=8
- 当前：left=[2], right=[3]
- 8 > left.top(2)，入 right
- 平衡前：left=[2], right=[3,8]
- left.size < right.size，不合法
- 调整：right.top=3 移到 left
- 平衡后：left=[3,2], right=[8]
- 输出：left.top()=3

  1. 读入 x=8
- 当前：left=[3,2], right=[8]
- 8 > left.top(3)，入 right
- 平衡前：left=[3,2], right=[8,8]
- 大小相等，合法
- 输出：left.top()=3

  1. 读入 x=10
- 当前：left=[3,2], right=[8,8]
- 10 > left.top(3)，入 right
- 平衡前：left=[3,2], right=[8,8,10]
- left.size < right.size，不合法
- 调整：right.top=8 移到 left
- 平衡后：left=[8,3,2], right=[8,10]
- 输出：left.top()=8

  最终输出：

  3
  2
  3
  3
  8
  **相关文章**

[[2-1-8-deque]]
