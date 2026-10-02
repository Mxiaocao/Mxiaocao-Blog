---
title: "9.2 凸包"
published: 2026-05-24
updated: 2026-05-25
description: "在二维计算几何中，凸包是最经典的算法之一。无论是求解最远点对、判断点集区域还是进行动态规划的几何优化，凸包都是不可或缺的知识点 一、定义凸多边形：是指所有内角大小都在 [0,𝜋] 范围内的简单多边形 凸包：在平面上能包含所有给定点的最小凸多边形叫做凸包，严谨地说，对于给定平面上的点集 ，所有包含 的凸集的交集 ，被称为 的凸包 但说白了可以理解为用一个橡皮筋包含住所有给定点的形态，凸包用最小"
image: "/img/2.jpg"
tags: ["计算几何", "凸包", "Andrew算法"]
category: "ACM-ICPC"
draft: false
pinned: false
comment: true
author: "Mxiaocao"
sourceLink: "https://www.mxiaocaoblog.com/2026/05/25/9-2-Convex-Hull/index.html"
licenseName: "CC BY-NC-SA 4.0"
subcategory: "计算几何"
topic: "算法竞赛"
---

在二维计算几何中，凸包是最经典的算法之一。无论是求解最远点对、判断点集区域还是进行动态规划的几何优化，凸包都是不可或缺的知识点

## 一、定义

凸多边形：是指所有内角大小都在 [0,𝜋] 范围内的简单多边形

凸包：在平面上能包含所有给定点的最小凸多边形叫做凸包，严谨地说，对于给定平面上的点集 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.545ex" role="img" style="vertical-align: 0;" viewbox="0 -683 852 683" width="1.928ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M42 0H40Q26 0 26 11Q26 15 29 27Q33 41 36 43T55 46Q141 49 190 98Q200 108 306 224T411 342Q302 620 297 625Q288 636 234 637H206Q200 643 200 645T202 664Q206 677 212 683H226Q260 681 347 681Q380 681 408 681T453 682T473 682Q490 682 490 671Q490 670 488 658Q484 643 481 640T465 637Q434 634 411 620L488 426L541 485Q646 598 646 610Q646 628 622 635Q617 635 609 637Q594 637 594 648Q594 650 596 664Q600 677 606 683H618Q619 683 643 683T697 681T738 680Q828 680 837 683H845Q852 676 852 672Q850 647 840 637H824Q790 636 763 628T722 611T698 593L687 584Q687 585 592 480L505 384Q505 383 536 304T601 142T638 56Q648 47 699 46Q734 46 734 37Q734 35 732 23Q728 7 725 4T711 1Q708 1 678 1T589 2Q528 2 496 2T461 1Q444 1 444 10Q444 11 446 25Q448 35 450 39T455 44T464 46T480 47T506 54Q523 62 523 64Q522 64 476 181L429 299Q241 95 236 84Q232 76 232 72Q232 53 261 47Q262 47 267 47T273 46Q276 46 277 46T280 45T283 42T284 35Q284 26 282 19Q279 6 276 4T261 1Q258 1 243 1T201 2T142 2Q64 2 42 0Z" data-c="1D44B"></path></g></g></g></svg></mjx-container>，所有包含 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.545ex" role="img" style="vertical-align: 0;" viewbox="0 -683 852 683" width="1.928ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M42 0H40Q26 0 26 11Q26 15 29 27Q33 41 36 43T55 46Q141 49 190 98Q200 108 306 224T411 342Q302 620 297 625Q288 636 234 637H206Q200 643 200 645T202 664Q206 677 212 683H226Q260 681 347 681Q380 681 408 681T453 682T473 682Q490 682 490 671Q490 670 488 658Q484 643 481 640T465 637Q434 634 411 620L488 426L541 485Q646 598 646 610Q646 628 622 635Q617 635 609 637Q594 637 594 648Q594 650 596 664Q600 677 606 683H618Q619 683 643 683T697 681T738 680Q828 680 837 683H845Q852 676 852 672Q850 647 840 637H824Q790 636 763 628T722 611T698 593L687 584Q687 585 592 480L505 384Q505 383 536 304T601 142T638 56Q648 47 699 46Q734 46 734 37Q734 35 732 23Q728 7 725 4T711 1Q708 1 678 1T589 2Q528 2 496 2T461 1Q444 1 444 10Q444 11 446 25Q448 35 450 39T455 44T464 46T480 47T506 54Q523 62 523 64Q522 64 476 181L429 299Q241 95 236 84Q232 76 232 72Q232 53 261 47Q262 47 267 47T273 46Q276 46 277 46T280 45T283 42T284 35Q284 26 282 19Q279 6 276 4T261 1Q258 1 243 1T201 2T142 2Q64 2 42 0Z" data-c="1D44B"></path></g></g></g></svg></mjx-container> 的凸集的交集 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.645ex" role="img" style="vertical-align: -0.05ex;" viewbox="0 -705 645 727" width="1.459ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M308 24Q367 24 416 76T466 197Q466 260 414 284Q308 311 278 321T236 341Q176 383 176 462Q176 523 208 573T273 648Q302 673 343 688T407 704H418H425Q521 704 564 640Q565 640 577 653T603 682T623 704Q624 704 627 704T632 705Q645 705 645 698T617 577T585 459T569 456Q549 456 549 465Q549 471 550 475Q550 478 551 494T553 520Q553 554 544 579T526 616T501 641Q465 662 419 662Q362 662 313 616T263 510Q263 480 278 458T319 427Q323 425 389 408T456 390Q490 379 522 342T554 242Q554 216 546 186Q541 164 528 137T492 78T426 18T332 -20Q320 -22 298 -22Q199 -22 144 33L134 44L106 13Q83 -14 78 -18T65 -22Q52 -22 52 -14Q52 -11 110 221Q112 227 130 227H143Q149 221 149 216Q149 214 148 207T144 186T142 153Q144 114 160 87T203 47T255 29T308 24Z" data-c="1D446"></path></g></g></g></svg></mjx-container>，被称为 <mjx-container class="MathJax" jax="SVG"><svg focusable="false" height="1.545ex" role="img" style="vertical-align: 0;" viewbox="0 -683 852 683" width="1.928ex" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path d="M42 0H40Q26 0 26 11Q26 15 29 27Q33 41 36 43T55 46Q141 49 190 98Q200 108 306 224T411 342Q302 620 297 625Q288 636 234 637H206Q200 643 200 645T202 664Q206 677 212 683H226Q260 681 347 681Q380 681 408 681T453 682T473 682Q490 682 490 671Q490 670 488 658Q484 643 481 640T465 637Q434 634 411 620L488 426L541 485Q646 598 646 610Q646 628 622 635Q617 635 609 637Q594 637 594 648Q594 650 596 664Q600 677 606 683H618Q619 683 643 683T697 681T738 680Q828 680 837 683H845Q852 676 852 672Q850 647 840 637H824Q790 636 763 628T722 611T698 593L687 584Q687 585 592 480L505 384Q505 383 536 304T601 142T638 56Q648 47 699 46Q734 46 734 37Q734 35 732 23Q728 7 725 4T711 1Q708 1 678 1T589 2Q528 2 496 2T461 1Q444 1 444 10Q444 11 446 25Q448 35 450 39T455 44T464 46T480 47T506 54Q523 62 523 64Q522 64 476 181L429 299Q241 95 236 84Q232 76 232 72Q232 53 261 47Q262 47 267 47T273 46Q276 46 277 46T280 45T283 42T284 35Q284 26 282 19Q279 6 276 4T261 1Q258 1 243 1T201 2T142 2Q64 2 42 0Z" data-c="1D44B"></path></g></g></g></svg></mjx-container> 的凸包

但说白了可以理解为用一个橡皮筋包含住所有给定点的形态，凸包用最小的周长围住了给定的所有点。例如一堆点中，内部点不会出现在凸包上，只有最外层的点会构成凸包

凸包常见用途包括：

- 求最外层边界
- 求最远点对，配合旋转卡壳
- 判断点是否在点集形成的区域内
- 凸多边形面积、周长
- 半平面交、动态规划优化中的几何结构

## 二、Andrew 算法求凸包

求凸包常用地有Andrew算法和Graham扫描法。由于Andrew算法好写、稳定、常数小，复杂度是O(n log n)，所以介绍Andrew算法

Andrew算法地核心思想是维护一个单调栈，分两步求出下凸壳和上凸壳：

1. 双关键字排序：

   先按x坐标从小到大排序，若x相同则按y坐标排序。排序后，最左下角的点和最右上角的点必定在凸包上
2. 扫描下凸壳（从左到右）：

   - 依次将点入栈
   - 假设栈顶的两个点是A B，即将入栈的新点是C
   - 计算cross(B-A,C-B)。如果结果小于等于0（即出现了向右转或直走），说明B点凹进去了，不配留在凸包上，将B弹出
   - 重复上述判定，直到转向再次变为左转，将C压入栈
3. 扫描上凸壳（从右到左）：

   逆序枚举所有点，同上
4. 合并收尾：

   上下凸壳拼接为完整的凸包


<iframe frameborder="0" height="600" loading="lazy" src="/algo-vis/convex-hull.html" style="border-radius:12px;margin:20px 0;" width="100%"></iframe>


```cpp
struct point{
    ll x,y;
    
    bool operator<(const point& o) const{
        if(x != o.x) return x < o.x;
        return y < o.y;
    }
    bool operator==(const point& o) const{
        return x == other.x && y == other.y;
    }
};

point operator-(point a,point b){
    return {a.x-b.x,a.y-b.y};
}

ll cross(point a,point b){
    return a.x*b.y - a.y-b.x;
}

vector<point> convex_hull(vector<point> p){
    sort(p.begin(),p.end());
    p.erase(unique(p.begin(),p.end()),p.end());
    
    int n = p.size();
    if(n <= 2) return p;
    
    vector<point> hull;
    
    for(int i = 0;i < n;++i){
        while(hull.size() >= 2){
            point a = hull[hull.size()-2];
            point b = hull[hull.size()-1];
            point c = p[i];
            
            if(cross(b-a,c-a) <= 0){
                hull.pop_back();
            }else{
                break;
            }
        }
        hull.push_back(p[i]);
    }
    
    int lower_size = hull.size();
    for(int i = n-2;i >= 0;--i){
        while((int)hull.size() > lower_size){
            point a = hull[hull.size()-2];
            point b = hull[hull.size()-1];
            point c = p[i];
            
            if(cross(b-a,c-a) <= 0){
                hull.pop_back();
            }else{
                break;
            }
        }
        hull.push_back(p[i]);
    }
    hull.pop_back();
    return hull;
}
```


**相关文章**

[[9-1-2D-Geometry]]
