---
title: "8.8.3 Euler's Sieve"
published: 2026-05-14
updated: 2026-05-14
description: "欧拉筛欧拉筛（Euler Sieve），也被称为线性筛，是算法竞赛中极其重要且优雅的基础算法。它可以在 的严格线性时间内，找出 范围内的所有质数。它比我们初学时接触的“埃氏筛（埃拉托斯特尼筛法，）”更快。 接下来介绍它的核心（不重复劳动）： 在普通的埃氏筛中，我们会用质数去筛掉它的倍数，比如用质数2筛掉4，6，8，10，12，用质数3筛掉6，9，12，15。不难发现，像6，12，被2筛了一次，"
tags: ["数学", "欧拉筛", "质数"]
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "数学"
topic: "算法竞赛"
---

# 欧拉筛

欧拉筛（Euler Sieve），也被称为**线性筛**，是算法竞赛中极其重要且优雅的基础算法。它可以在   的严格线性时间内，找出   范围内的所有质数。它比我们初学时接触的“埃氏筛（埃拉托斯特尼筛法， ）”更快。

**接下来介绍它的核心（不重复劳动）：**

在普通的埃氏筛中，我们会用质数去筛掉它的倍数，比如用质数2筛掉4，6，8，10，12，用质数3筛掉6，9，12，15。不难发现，像6，12，被2筛了一次，被3也筛了一次。当N很大时，就会有很多个数会被重复标记，这样就浪费了大量的时间。

而欧拉筛则避免了这个问题，它保证每一个合数，必定且只能被它的最小质因数筛掉一次

**步骤：**

1. 我们先假设所有数初始都是质数，并且再创建一个数组记录已经找到的质数

   
```cpp
vector<char> is_prime(n+1,1);
vector<int> primes;
is_prime[0] = is_prime[1] = 0; //0和1不是质数
```

2. 然后开始循环，遍历2到N的每一个数字

   
```cpp
for(int i = 2;i <= n;++i){
    
}
```


   如果一个数i，它没被前面的数筛掉，那么i自己必定是个质数

   
```cpp
if(is_prime[i]){
    primes.push_back(i);
}
```


   然后我们再进行内层循环，用当前的i去乘以已经找到的质数p

   
```cpp
for(int p : primes){
    
}
```


   在这个循环中，我们要标记下i\*p这个合数

   
```cpp
for(int p : primes){
    is_prime[i*p] = 0;
}
```


   当然还要加上越界条件

   
```cpp
for(int p : primes){
    if(i * p > n) break;
    is_prime[i*p] = 0;
}
```


   这就够了吗，还没。压轴登场了，接下来是最最最核心的剪枝

   
```cpp
for(int p : primes){
    if(i*p > n) break;
    is_prime[i*p] = 0;
    if(i%p == 0) break;
}
```


   于是就有

   
```cpp
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
```


**阐述：**

当然会有人问，为什么`if (i % p == 0) break;`就很重要了，它做了什么。它就是保证线性复杂度的关键。当我们在内层遍历中已经找到p，如果发现`i%p == 0`，说明此时p已经是i的最小质因数了。如果不break掉，继续用下一个更大的质数去乘i，那么就会导致有一个数不仅被最小质因数除了，也被另一个稍微大一点的质因数除了，那么这样自然是不符合欧拉筛的。
**相关文章**

[[8-6-Modular-Multiplicative-Inverse]]
