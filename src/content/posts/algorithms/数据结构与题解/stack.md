---
title: "栈"
published: 2026-05-14
updated: 2026-05-30
description: "栈因为c++有标准STL库，所以下面将给出两个cpp和c两种版本的代码 1. 有效的括号（简单）门钥匙 Ques给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。 有效字符串需满足： 左括号必须用相同类型的右括号闭合。 左括号必须以"
tags: []
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/14/stack/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "数据结构与题解"
topic: "算法竞赛"
---

# 栈

因为c++有标准STL库，所以下面将给出两个cpp和c两种版本的代码

## 1. 有效的括号（简单）

[门钥匙](https://leetcode.cn/problems/valid-parentheses/)

### Ques

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

cpp: `bool isValid(string s);`

c: `bool isValid(char* s);`

### Ans

简单模拟下

#### cpp代码


```cpp
class Solution {
public:
    bool isValid(string s) {
        if(s.length() & 1) return false;
        stack<char> st;
        for(char c : s){
            if(c == '(' || c == '[' || c == '{'){
                st.push(c);
            }else{
                if(st.empty()) return false;
                char top = st.top();
                if((c == ')' && top == '(') ||
                   (c == ']' && top == '[') ||
                   (c == '}' && top == '{')){
                    st.pop();
                }else{
                    return false;
                }
            }
        }
        return st.empty();
    }
};
```


击败100.00%

#### c代码

动态


```c
bool isValid(char* s) {
    int len = strlen(s);
    if(len & 1) return false;

    char* stack = (char*)malloc(len*sizeof(char));
    int top = -1;
    for(int i = 0;i < len;++i){
        char ch = s[i];
        if(ch == '(' || ch == '[' || ch == '{')
            stack[++top] = ch;
        else{
            if(top == -1){
                free(stack);
                return false;
            }
            char topc = stack[top--];
            if((ch == ')' && topc != '(') ||
               (ch == ']' && topc != '[') ||
               (ch == '}' && topc != '{')){
                free(stack);
                return false;
            }
        }
    }
    bool res = (top == -1);
    free(stack);
    return res;
}
```


击败100.00%

于是有人问了，主播主播，你这认真的吗，三个free，头都看大了，能不能解释下。okkkkk的

第一个free：遇到右括号多了就提前下班，比方说，输入一个”]”，但是此时栈空的，说明前面没有左括号，无效

第二个free：遇到左右不匹配就提前下班，比方说，输入”(]”，虽然栈里面有左括号，但不是它想要的类型，所以也free掉，并且return false；

第三个free：顺顺利利走到最后，正常下班。当然此时还要判断下栈里面有没有元素，然后输出出来

于是又有人问了，主播主播，就不能搞个静态内存吗，给你刷火箭🚀🚀🚀。好的好的

（静态）


```c
bool isValid(char* s) {
    int len = strlen(s);
    if(len & 1) return false;

    char* stack = (char*)malloc(len*sizeof(char));
    int top = -1;
    for(int i = 0;i < len;++i){
        char ch = s[i];
        if(ch == '(' || ch == '[' || ch == '{')
            stack[++top] = ch;
        else{
            if(top == -1){
                free(stack);
                return false;
            }
            char topc = stack[top--];
            if((ch == ')' && topc != '(') ||
               (ch == ']' && topc != '[') ||
               (ch == '}' && topc != '{')){
                free(stack);
                return false;
            }
        }
    }
    bool res = (top == -1);
    free(stack);
    return res;
}
```


击败100.00%

## 2. 最长有效括号（困难）

[门钥匙](https://leetcode.cn/problems/longest-valid-parentheses/)

### Ques

给你一个只包含 `'('` 和 `')'` 的字符串，找出最长有效（格式正确且连续）括号 子串 的长度。

左右括号匹配，即每个左括号都有对应的右括号将其闭合的字符串是格式正确的，比如 `"(()())"`。

cpp: `int longestValidParentheses(string s)`

c: `int longestValidParentheses(char* s)`

### Ans

#### cpp

对于这种题，有两种解法

##### 法一：栈（把括号的下标压入栈）

一开始，我们往栈里压入一个-1，作为初始的哨兵。开始遍历：

- 如果碰到’(‘，把索引压入栈
- 如果碰到’)’，先弹出栈顶元素，表示匹配一个左括号
  - 如果弹出后栈为空，说明刚才弹出的是哨兵，’)’其实没有被匹配，是多余的。同时，我们把当前的下标也压入栈，作为后面新的哨兵
  - 如果弹出后栈不为空，说明匹配成功，然后我们就继续更新最大长度


```cpp
class Solution {
public:
    int longestValidParentheses(string s) {
        int max_len = 0;
        stack<int> st;
        st.push(-1);
        for(int i = 0;i < (int)s.size();++i){
            if(s[i] == '(') st.push(i);
            else{
                st.pop();
                if(st.empty()) st.push(i);
                else max_len = max(max_len,i-st.top());
            }
        }
        return max_len;
    }
};
```


击败100.00%

可以自己跑一下“)()())”方便自己理解。

但是真的击败了吗，并没有，只是时间复杂度上击败了，而至于空间，还有优化的余地

##### 法二：（双指针/左右计数器）

能不能不借用栈，把空间复杂度压到O(1)。有的，兄弟，有的。

利用left和right分别统计左右括号的数量

- 从左到右遍历：

  遇到”(“就left++，遇到”)”就right++

  - 当left == right，说明找到了完美匹配，更新最大长度为2\*right
  - 当right > left，则匹配不合法，此时要清零left和right

那如果左括号多余有括号呢，比如“(()”，那么我们可以从右到左遍历，消除这个盲区

- 从右到左遍历

  遇到“)”就right++，遇到”(“就left++

  - 当left == right，更新
  - 当left > right，清零


```cpp
class Solution {
public:
    int longestValidParentheses(string s) {
        int left = 0,right = 0,max_len = 0;
        for(int i = 0;i < (int)s.size();++i){
            if(s[i] == '(') left++;
            else right++;
            
            if(left == right) max_len = max(max_len,2*right);
            else if(right > left) left = right = 0;;
        }
        left = right = 0;
        for(int i = (int)s.size()-1;i >= 0;--i){
            if(s[i] == '(') left++;
            else right++;

            if(left == right) max_len = max(max_len,2*left);
            else if(left > right) left = right = 0;
        }
        return max_len;
    }
};
```


时间复杂度：击败100.00%

空间复杂度：击败98.81%（刷不上去，有脏东西）

#### c

思路其实一样，这里就是给c的写法


```c
int longestValidParentheses(char* s) {
    int max_len = 0;
    int len = strlen(s);
    int* stack = (int*)malloc((len+1)*sizeof(int));
    int top = -1;
    stack[++top] = -1;
    for(int i = 0;i < len;++i){
        if(s[i] == '(') stack[++top] = i;
        else{
            --top;
            if(top == -1) stack[++top] = i;
            else max_len = (max_len > i-stack[top]) ? max_len : i-stack[top];
        }
    }
    free(stack);
    return max_len;
}
```


## 3. 接雨水（困难）

[门钥匙](https://leetcode.cn/problems/trapping-rain-water/)

### Ques

给定 `n` 个非负整数表示每个宽度为 `1` 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

cpp: `int trap(vector<int>& height)`

c: `int trap(int* height, int heightSize)`

### Ans

666，~~看到梦中情题了~~这道题还是很有名的

我们首先要明白，位置i的积水量 = min(左边最高柱子，右边最高柱子) - i自己的高度

#### cpp

##### 法一：双指针

我们可以使用left和right两个指针从两端向中间夹逼，并用left\_max和right\_max不断记录左右两边历史最高柱子

我们的目标是，谁的柱子矮，就算谁的积水量，并把对应指针往中间挪

假设height[left] < height[right]:

- 如果 height[left] >= left\_max，说明当前柱子比历史左侧最高还高，装不了水，此时更新left\_max
- 如果 height[left] < left\_max，说明当前柱子矮于左侧最高，且右侧有一定高的屏障，可以装水，装水量就是left\_max - height[left]

反之亦然


```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0,right = (int)height.size()-1;
        int left_max = 0,right_max = 0;
        int water = 0;
        while(left < right){
            if(height[left] < height[right]){
                if(height[left] >= left_max) left_max = height[left];
                else water += left_max-height[left];
                
                left++;
            }else{
                if(height[right] >= right_max) right_max = height[right];
                else water += right_max-height[right];

                right--;
            }
        }
        return water;
    }
};
```


击败100.00%

##### 法二：单调栈

双指针这个是竖着切的，计算每个柱子上面能竖着顶几格水，相信大家理解的时候也有注意到。而这里是横着切，一层一层填水。

而要这么做，我们需要维护一个单调递减栈，只要碰到一个比前面高的柱子，就可以开始蓄水了。

- 遍历柱子高度，栈内存柱子的索引
- 如果当前柱子比栈顶的柱子矮 or 相等，直接把当前柱子的索引压入栈
- 如果当前柱子比栈顶的柱子高，开始蓄水
  - 宽度 = 右边界索引-左边界索引-1
  - 高度 = min(左边界高度，右边界高度) - 当前坑底高度
- 若当前柱子还是比新的栈顶高，继续弹出，重复上述步骤

~~可以说和上一道题有异曲同工之妙~~


```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int water = 0;
        stack<int> st;
        for(int i = 0;i < (int)height.size();++i){
            while(!st.empty() && height[i] > height[st.top()]){
                int bot = st.top();
                st.pop();
                if(st.empty()) break;

                int left = st.top();
                int right = i;
                water += (right-left-1)*(min(height[left],height[right])-height[bot]);
            }
            st.push(i);
        }
        return water;
    }
};
```


击败100.00%

### c


```c
int trap(int* height, int heightSize) {
    int water = 0;
    int* stack = (int*)malloc(heightSize*sizeof(int));
    int top = -1;
    for(int i = 0;i < heightSize;++i){
        while(top != -1 && height[i] > height[stack[top]]){
            int bot = stack[top--];
            if(top == -1) break;

            int left = stack[top];
            int right = i;
            int h = height[left] < height[right] ? height[left] : height[right];
            water += (right-left-1)*(h-height[bot]);
        }
        stack[++top] = i;
    }
    return water;
}
```


击败100.00%

**相关文章**

[[Linked-List]]
