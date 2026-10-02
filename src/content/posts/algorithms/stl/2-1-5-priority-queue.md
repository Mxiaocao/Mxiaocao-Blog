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

给出*n*个数，将这*n*个数依次放入一个初始为空的集合中（不去重），要求你每放入一个数，输出当前集合的中位数，如果集合大小为偶数，则中位数为这个集合中第 大的数，如果集合大小为奇数，则中位数为这个集合中第 大的数。换句话说，你需要找出前1个数的中位数、前2个数的中位数、前3个数的中位数…依次类推直到前 个数的中位数。

**输入格式**

输入包含两行，第一行输入一个整数 。

第二行输入 个整数 ，每个整数之间空一个空格， 。

**输出格式**

输出包含 行，第 行的整数表示将第 个数加入集合后集合的中位数是多少。

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
