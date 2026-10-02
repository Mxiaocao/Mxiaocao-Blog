---
title: "链表"
published: 2026-05-14
updated: 2026-05-14
description: "链表准备工作链表声明1234567struct ListNode { int val; ListNode *next; ListNode() : val(0), next(nullptr) {} ListNode(int x) : val(x), next(nullptr) {} ListNode(int x, ListNode *next) : val(x), ne"
tags: []
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/14/Linked-List/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "数据结构与题解"
topic: "算法竞赛"
---

# 链表

## 准备工作

### 链表声明


```cpp
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};
```


下面举例说明下这三个构造函数：

1. ListNode() : val(0), next(nullptr) {}

   `ListNode a;` 表示a.val = 0,a.next = nullptr
2. ListNode(int x) : val(x), next(nullptr) {}

   `ListNode a(5);` 表示a.val = 5,a.next = nullptr
3. ListNode(int x, ListNode \*next) : val(x), next(next) {}

   `ListNode b(3, &a);`表示b.val = 3,b.next = &a

[**注**]：构造函数语法：类名(参数) : 成员1(值1), 成员2(值2) {}

### 创建头节点

而我们接下来会频繁使用**创建虚拟头节点dummy**的方法，所以这边先介绍一下统一的格式，我们后面基本都会基于这一版：


```cpp
ListNode dummy;
ListNode* cur = &dummy;
```


1. 第一行`ListNode dummy;`

   表示定义了一个ListNode类型的变量dummy，这是个对象本身,不是指针   **dummy表示一个对象**

   而根据先前定义的`ListNode() : val(0), next(nullptr) {}`，也可知这个dummy的val是0，next是0 (nullptr ->无指针)
2. 第二行`ListNode* cur = &dummy;`\

   等号左边表示定义了一个指针变量cur，它指向ListNode类型的对象   cur 里面存了某个ListNode类型对象的地址   cur 存的地址

   而等号右边表示dummy这个对象的地址

也就是说,cur指向dummy这个节点   **cur最开始存的dummy的地址**

如果我们想让dummy后面紧跟原链表怎么办？

那就加一条`dummy.next = head;`

[**注**]：dummy node 中文是虚拟节点/虚拟头节点~~，因为刚开始写DS问AI的时候它很喜欢用dummy这个变量名，所以我也一直沿用下来了。~~

### 链表更新

那我们该怎么接链表呢

like this


```cpp
cur -> next = new ListNode(sum%10);
cur = cur -> next
```


在cur后面new~（创建）~一个新的节点，然后让cur指向这个新的节点（也就是让cur往后走一步）

### 输出链表

最后我们是返回dummy.next的，因为dummy是虚拟头节点，是我们为了方便操作而引入的，而不是答案本身。

讲得可能不清楚，但可以通过刷题慢慢理解。可以先通过刷题来肌肉记忆，也许前期不明白为什么，但也许某一天，某个下午，当你打开了电脑，刷到了自己的梦中情题，那一刻，一切都明了了。

## 1. 两数相加（中等）

[门钥匙](https://leetcode.cn/problems/add-two-numbers/)

### Ques

给你两个 **非空** 的链表，表示两个非负的整数。它们每位数字都是按照 **逆序** 的方式存储的，并且每个节点只能存储 **一位** 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

`ListNode* addTwoNumbers(ListNode* l1, ListNode* l2);`

### Ans

1. 先在开头创建虚拟头节点dummy

   
```cpp
ListNode dummy;
ListNode* cur = &dummy;
```

2. 引入中间变量carry，用来记录中间运算过程的每一步进位

   
```cpp
int carry = 0;
```


   如果 还没算完，如果 还没算完，如果carry还有值……

   
```cpp
int carry = 0;
while(l1 || l2 || carry){
    
}
```


   接下来开始纯模拟，就不详细讲解了，还是要自己领悟的

   
```cpp
int carry = 0;
while(l1 || l2 || carry){
    int sum = carry;
    if(l1){
        sum += l1 -> val;
        l1 = l1 -> next;
    }
    if(l2){
        sum += l2 -> val;
        l2 = l2 -> next;
    }
    carry = sum/10;
    cur -> next = new ListNode(sum%10);
    cur = cur -> next;
}
```

3. return 节点

   
```cpp
return dummy.next;
```


最终：


```cpp
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy;
        ListNode* cur = &dummy;
        int carry = 0;
        while(l1 || l2 || carry){
            int sum = carry;
            if(l1){
                sum += l1 -> val;
                l1 = l1 -> next;
            }
            if(l2){
                sum += l2 -> val;
                l2 = l2 -> next;
            }
            carry = sum/10;
            cur -> next = new ListNode(sum%10);
            cur = cur -> next;
        }
        return dummy.next;
    }
};
```


击败100.00%

## 2. 删除链表的倒数第 N 个结点（中等）

[门钥匙](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)

### Ques

给你一个链表，删除链表的倒数第n个结点，并且返回链表的头结点。

`ListNode* removeNthFromEnd(ListNode* head, int n)`

### Ans

也许大多数人看到这个都会想到一个解法，先遍历一遍获得长度，然后再各显神通，但如果有一个特别长的链表，然后只让你删掉的第二个节点呢，那也太亏了。

于是有人问了，主播主播，有没有不吃操作的解法。

有的，兄弟有的。

我们可以创建两个指针fast和slow，我们先让fast走n步，然后slow和fast一起走，当fast走到最后一个节点是，slow正好停在要删除节点的前一个节点。

而这个方法，就叫“快慢指针”

1. 创建快慢指针

   
```cpp
ListNode dummy(0,head);
ListNode* fast = &dummy;
ListNode* slow = &dummy;
```

2. 先让快指针飞起来

   
```cpp
for(int i = 0;i < n;++i){
    fast = fast -> next;
}
```

3. 再两个一起走，这里注意下循环方式与终止条件

   
```cpp
while(fast -> next){
    fast = fast -> next;
    slow = slow -> next;
}
```

4. 删除操作

   当fast到达最后一个节点时，slow正好停在要删除节点的前一个节点

   
```cpp
slow -> next = slow -> next -> next;
```

5. 返回；

   
```cpp
return dummy.next;
```


综合代码：


```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0,head);
        ListNode* fast = &dummy;
        ListNode* slow = &dummy;
        
        for(int i = 0;i < n;++i){
            fast = fast -> next;
        }
        while(fast -> next){
            fast = fast -> next;
            slow = slow -> next;
        }
        slow -> next = slow -> next -> next;
        return dummy.next;
    }
};
```


击败100.00%

## 3. 合并两个有序链表（简单）

[门钥匙](https://leetcode.cn/problems/merge-two-sorted-lists/)

### Ques

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

`ListNode* mergeTwoLists(ListNode* list1, ListNode* list2)`

### Ans

我们可以先创建一个新链表，然后让小的数接到新链表后面。好，那我们遍历的方式是什么呢？想想我们第一题的`while(l1 | l2 | carry)`，我们可以用类似的方式。那如果一个链表跑完了，另一个没跑完呢？我们前面的“准备工作”有提出一个问题，如果我们想让dummy后面接原链表该怎么办，那自然是`dummy.next = head`，那这道题也应该同理。


```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy;
        ListNode* cur = &dummy;
        
        while(list1 && list2){
            if(list1 -> val < list2 -> val){
                cur -> next = list1;
                list1 = list1 -> next;
            }else{
                cur -> next = list2;
                list2 = list2 -> next;
            }
            cur = cur -> next;
        }
        
        if(list1) cur -> next = list1;
        else cur -> next = list2;
        
        return dummy.next;
    }
};
```


击败100.00%

## 4. 合并 K 个升序链表（困难）

[门钥匙](https://leetcode.cn/problems/merge-k-sorted-lists/)

### Ques

给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。

`ListNode* mergeKLists(vector<ListNode*>& lists)`

### Ans

刚才有人和主播说感觉自己变强了，看什么链表题都像插标卖首

。现在呢……

两个链表合并的过程我们可以参考上一道题，那怎么选择这两个链表又是一个问题。

这道题如果直接一个一个按顺序合并，让第一个和第二个合，再和第三个合……，虽然这样思路确实很简单，但最差会有O(KN)。能不能优化呢？

可以的，可以进行两两合并，像归并排序一样分治。

#### 法一：分治，两两合并

假设现在有8个链表[L0,L1,L2,L3,L4,L5,L6,L7]

第一轮：[L0,L4] [L1,L5] [L2,L6] [L3,L7]，剩4个链表

第二轮：[[L0,L4] [L2,L6]] 和 [[L1,L5] [L3,L7]] 两个链表

第三轮：合并成一个链表

1. 获取当前要处理的链表数量

   
```cpp
int n = lists.size();
```

2. 每一轮链表数减半，以及一轮合并后剩下多少

   
```cpp
while(n > 1){
    int k = (n+1)/2;
    
    n = k;
}
```


   比如n = 3，k = 2；n = 4，k = 2，所以它其实是向上取整的，即 
3. 对应合并

   
```cpp
while(n > 1){
    int k = (n+1)/2;
    for(int i = 0;i < n/2;++i){
        list[i] = mergeTwoLists(lists[i],list[i+k]);
    }
    n = k;
}
```

4. return

   
```cpp
return lists[0];
```


综合代码


```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* a,ListNode* b){
        ListNode dummy;
        ListNode* cur = &dummy;
        while(a && b){
            if(a -> val < b -> val){
                cur -> next = a;
                a = a -> next;
            }else{
                cur -> next = b;
                b = b -> next;
            }
            cur = cur -> next;
        }
        cur -> next = a ? a : b;
        return dummy.next;
    }
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        if(lists.empty()) return nullptr;

        int n = lists.size();
        while(n > 1){
            int k = (n+1)/2;
            for(int i = 0;i < n/2;++i){
                lists[i] = mergeTwoLists(lists[i],lists[i+k]);
            }
            n = k;
        }
        return lists[0];
    }
};
```


击败53.86%

什么？！！~~这么优雅的~~代码居然击败了这么点人

难道说……海油糕手？

#### 法二：优先队列优化

如果不熟可以私信主播，主播可以私发，主播之前有整理过。

1. 先写一个小根堆cmp函数。

   
```cpp
struct cmp{
    bool operator(){ListNode* a,ListNode* b}{
        return a -> val > b -> val;
    }
};
```

2. 再初始化堆

   
```cpp
priority_queue<ListNode*,vector<ListNode*>,cmp> pq;
```

3. 把每个链表的头节点放进堆

   
```cpp
for(auto node : lists){ //auto <=> ListNode*
    if(node){
        pq.push(node);
    }
}
```


   因为每条链表都是升序的，所以各自的最小节点就是头节点
4. 创建最终要输出的那个链表

   
```cpp
ListNode dummy;
ListNode* cur = &dummy;
```

5. 每次取出最小节点（核心）

   
```cpp
while(!pq.empty()){
    auto node = pq.top(); // auto <=> ListNode*
    pq.pop();
    cur -> next = node;
    cur = cur -> next;
    if(node -> next){
        pq.push(node -> next);
    }
}
```


综合代码：


```cpp
class Solution {
public:

    struct cmp{
        bool operator()(ListNode* a,ListNode* b){
            return a -> val > b -> val;
        }
    };

    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*,vector<ListNode*>,cmp> pq;

        for(ListNode* node : lists){
            if(node){
                pq.push(node);
            }
        }
        ListNode dummy;
        ListNode* cur = &dummy;
        while(!pq.empty()){
            ListNode* node = pq.top();
            pq.pop();
            cur -> next = node;
            cur = cur -> next;
            if(node -> next){
                pq.push(node -> next);
            }
        }
        return dummy.next;
    }
};
```


击败100.00% ~~拿下拿下，全国第一~~

怎么样，跟开了挂一样，连mergetwolists都不用写，优先队列直接处理好了。

## 5. 两两交换链表中的节点（中等）

[门钥匙](https://leetcode.cn/problems/swap-nodes-in-pairs/)

### Ques

给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

`ListNode* swapPairs(ListNode* head)`

### Ans

1. 先把客套话写好

   
```cpp
ListNode dummy;
ListNode* cur = &dummy;
while(cur -> next && cur -> next -> next){
    ListNode* first = cur -> next;
    ListNode* second = cur -> next -> next;
            
}
```

2. 然后就要开始思考怎么交换了

   ![img](/img/15.png)

   看我给你的这个图：

   研究一下初始的图和要求的图，发现1的后面接的是3，所以首先`first -> next = second -> next`，得到第二行。此时我们要进一步让2后面接1，所以有`second -> next = first`,得到第三行。~（可能不是很直观，所以下面那一行给他拉开了）~最后，我们要让dummy后面接上2，有`dummy -> next = second`,得到第五第六行。操作完成。

综合代码


```cpp
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        ListNode dummy;
        ListNode* cur = &dummy;
        while(cur -> next && cur -> next -> next){
            ListNode* first = cur -> next;
            ListNode* second = cur -> next -> next;
            
        }
    }
};
```


击败100.00%

## 6. K 个一组翻转链表（困难）

[门钥匙](https://leetcode.cn/problems/reverse-nodes-in-k-group/)

### Ques

给你链表的头节点 `head` ，每 `k` 个节点一组进行翻转，请你返回修改后的链表。

`k` 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 `k` 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

`ListNode* reverseKGroup(ListNode* head, int k)`

### Ans

依旧是一把糖一把药，这道题是上一道的pro max版，当然，在这里我们要学一种新的东西。

我们先要想，假设现在给你一个链表，就让你全部翻过去，你会怎么处理。

![image-20260501152902457](/img/16.png)

对于每一轮循环都是：

- 先保存下一个节点
- 让当前节点指向cur
- 移动cur
- 移动head

而当head = nullptr时，退出循环。最终return cur

所以写出代码


```cpp
ListNode* reverse(ListNode* head){
    ListNode* cur = nullptr;
    while(head){
        ListNode* nxt = head -> next;
        head -> next = cur;
        cur = head;
        head = nxt;
    }
    return cur;
}
```


现在考虑k个一组翻转的问题了

1. 创建虚拟头节点，方便处理头部翻转
2. 每次找到一组长度为k的区间

   
```cpp
while(true){
    ListNode* end = cur;
    for(int i = 0;i < k && end;++i){
        end = end -> next;
    }
    if(!end) break;
    
    ListNode* l = cur -> next;
    ListNode* r = end -> next;
    
}
```


   前面的代码还是有点像处理快慢指针的代码

   后面的代码告诉我们这处理的是[l,r)区间
3. 把这k个节点原地翻转

   我们上面不是已经找到这个区间了吗，所以我们现在断开这一组：`end -> next = nullptr`,这样它就变成了一个独立链表。~~为什么断开呢？不要急。~~然后我们可以额外写个reverse函数，然后再把这个翻转后的链表接到cur后面：`cur -> next = reverse(l)`。然后再把翻转后的尾巴接到后半段：`l -> next = r`

   
```cpp
while(true){
    ListNode* end = cur;
    for(int i = 0;i < k && end;++i){
        end = end -> next;
    }
    if(!end) break;
    
    ListNode* l = cur -> next;
    ListNode* r = end -> next;
    
    end -> next = nullptr;
    cur -> next = reverse(l);
    l -> next = r;
}
```


1. 继续处理下一组

   
```cpp
cur = l
```


   这一步要注意不要写成`cur = l -> next`了，因为这个区间刚开始就是从cur -> next开始的

综合代码


```cpp
class Solution {
public:
    ListNode* reverse(ListNode* head){
        ListNode* cur = nullptr;
        while(head){
            ListNode* nxt = head -> next;
            head -> next = cur;
            cur = head;
            head = nxt;
        }
        return cur;
    }
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode dummy(0,head);
        ListNode* cur = &dummy;

        while(true){
            ListNode* end = cur;
            for(int i = 0;i < k && end;++i){
                end = end -> next;
            }
            if(!end) break;

            ListNode* l = cur -> next;
            ListNode* r = end -> next;

            end -> next = nullptr;
            cur -> next = reverse(l);
            l -> next = r;
            cur = l;
        }

        return dummy.next;
    }
};
```


击败100.00%
**相关文章**

[[stack]]
