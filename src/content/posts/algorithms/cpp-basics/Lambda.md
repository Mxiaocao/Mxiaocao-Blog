---
title: "Lambda"
published: 2026-05-18
updated: 2026-05-18
description: "Lambda表达式Lambda 表达式是现代编程语言中一个非常重要的特性，特别是在 Java 8及更高版本、C#、Python、JavaScript 和 c++ 等语言中被广泛使用。 Lambda 表达式还是很常见且重要的，我看机房的一些学长写题解的时候会使用到。下面以 c++ 为例展开讨论。 1. 什么是 Lambda 表达式简单来说，Lambda 表达式是一个匿名函数。它没有函数名，但可以有参"
tags: []
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/18/Lambda/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "cpp-basics"
topic: "算法竞赛"
---

# Lambda表达式

~~Lambda 表达式是现代编程语言中一个非常重要的特性，特别是在 Java 8及更高版本、C#、Python、JavaScript 和 c++ 等语言中被广泛使用。~~ Lambda 表达式还是很常见且重要的，我看机房的一些学长写题解的时候会使用到。下面以 c++ 为例展开讨论。

## 1. 什么是 Lambda 表达式

~~简单来说，Lambda 表达式是一个匿名函数。它没有函数名，但可以有参数列表、函数主体和返回值。它的核心思想是将行为（一段代码）作为数据进行传递。~~

简单来说，Lambda 表达式就是写在函数内部的小函数。

## 2. 为什么需要 Lambda 表达式

1. 代码简洁
2. 可读性强

于 c++ 而言 ，Lambda 表达式是在 **C++11** 标准中引入的，并在 C++14、C++17、C++20 中得到了增强。它是 C++ 迈向现代、高效编程风格的重要标志。

## 3. c++ Lambda 的基础语法


```cpp
[捕获列表](参数列表) -> 返回类型 { 函数体 } 
```


- **`[捕获列表]`**：核心且**必须**,是用于定义如何在 Lambda 内部访问外部作用域的变量。
- **`(参数列表)`**：**可选**，类似于普通函数的参数列表。如果不需要参数，可以省略，或者写成 `()`。
- **`-> 返回类型`**：**可选**，即尾置返回类型。如果函数体只有一条 `return` 语句，编译器可以自动推导类型，可以省略。
- **`{ 函数体 }`**：**必须**，具体的逻辑代码。

  ~~看不懂没关系，下面的概念部分会进一步探讨~~
- ### 捕获列表

  这是 C++ Lambda 最独特的地方。你需要明确告诉 Lambda，你打算**如何**使用它外部的变量。

  1. #### 值捕获 [=]

     ~~将外部变量**拷贝**一份到 Lambda 内部。Lambda 内部使用的是这份拷贝，修改它不会影响原来的变量。~~ 直接拷贝数据。

     
```cpp
void solve(){
    int x = 10;
    auto lambda = [x](){
        cout << "Inside lambda, x = " << x << '\n';
        // x = 20; // 会报错，因为值捕获的变量是只读的
    };
    x = 100; 
    lambda(); // 输出: Inside lambda, x = 10 (捕获的是创建时的值，不是修改后的值)
    return 0;
}
```

     > 注意：默认情况下，值捕获的变量在 Lambda 内部是 `const` 的。如果想修改它，需要加上 `mutable` 关键字：`[x]() mutable { x = 20; }`。
  2. #### 引用捕获 [&]

     ~~捕获外部变量的引用。Lambda 内部使用的是原始变量的别名。修改它会影响原来的变量，且必须确保 Lambda 执行时，原始变量依然存在（避免悬空引用）。~~ 直接引用数据。

     
```cpp
void solve(){
    int x = 10;
    auto lambda = [&x](){
        cout << "Inside lambda,x = " << x << '\n';
        x = 20;
    };
    x = 100; 
    lambda(); // 输出x = 10 
    cout << "Outside lambda,x = " << x << '\n'; // 输出x = 20
    return 0;
}
```

  3. #### 隐式捕获

     - `[=]`：表示 Lambda 体内用到的`所有`外部变量，都按**值**捕获。
     - `[&]`：表示 Lambda 体内用到的`所有`外部变量，都按**引用**捕获。
  4. #### 混合捕获

     可以混合使用，指定一些变量值捕获，一些变量引用捕获。
  5. #### 初始化捕获（c++14)

     ~~我不会，看不懂，所以不讲了~~
- ### 参数列表

  与普通函数类似，可以传参。

  
```cpp
auto add = [](int a, int b) -> int{ 
    return a + b; 
};
```


  c++14泛型Lambda:可以用auto定义

  
```cpp
// 可以处理任何类型的加法
auto add = [](auto a, auto b){
    return a + b;
};
```

- ### 返回类型

  通常可以省略，编译器会推导。但如果逻辑复杂，还是显式指定吧。

## 4. 实际应用场景

1. ### 自定义排序(cmp)

   #### 传统写法：

   
```cpp
bool cmp(const pair<int, int>& a,const pair<int, int>& b){
    if(a.second == b.second) return a.first < b.first;
    return a.second < b.second;
}

sort(v.begin(), v.end(), cmp);
```


   #### Lambda 写法：

   
```cpp
sort(v.begin(),v.end(),[](const pair<int, int>& a,const pair<int, int>& b){
    if(a.second == b.second) return a.first < b.first;
    return a.second < b.second;
});
```

2. ### dfs/bfs内部递归

   在求树的直径时，可以跑两次dfs，ok这里也是直接贴代码了。

   
```cpp
void solve(){
    int n,m;
    cin >> n;
    m = n - 1;
    vector<vector<int> > g(n);
    for(int i = 0;i < m;++i){
        int u,v;
        cin >> u >> v;
        u--,v--;
        g[u].push_back(v);
        g[v].push_back(u);
    }
    vector<int> dep(n);
    auto dfs = [&](auto &&self,int x,int p) -> void{
        for(auto y : g[x]){
            if(y == p) continue;
            dep[y] = dep[x] + 1;
            self(self,y,x);
        }
    };
    dfs(dfs,0,-1);
    int u = max_element(dep.begin(),dep.end()) - dep.begin();
    fill(dep.begin(),dep.end(),0);

    dfs(dfs,u,-1);
    int v = max_element(dep.begin(),dep.end()) - dep.begin();
    int d = *max_element(dep.begin(),dep.end());
    cout << d << endl;
    return;
}
```


这段代码中，读者也许会有一个疑惑，`auto dfs = [&](auto &&self,int x,int p)`中，这个**self**是干什么的。

解答：self就是 Lambda 函数在**自己内部**使用的自己的名字，因为Lambda在定义时，还不知道自己的变量名是什么。

所以需要：

1. 在参数列表给自己留一个位置：auto &&self
2. 在调用时把自己传进去：dfs(dfs,……)
3. 在内部用self来递归：self(self,……)
