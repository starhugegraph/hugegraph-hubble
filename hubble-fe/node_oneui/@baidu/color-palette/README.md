# @baidu/color-palette

采用[DLS色彩规则]色盘生成[less @plugin at-rules].
输入一个color的less对象，生成对应的色阶

1. 安装方法：  
`shell
npm i @baidu/colorPalette --registry=http://regsitry.npm.baidu-int.com
`
2. 使用方法：
```less
@plugin '@baidu/colorPalette';

@c-1: colorPallette(color(@c-6));
@c-6: #1890ff;

.bg-1 {
    background: @c-1;
}
```

## DLS色彩规则
### 1. 用HSB颜色模式；

### 2. 采用10级色阶模式，主色为6号，按照上面的规则分别向深浅两端扩展；
以6号色为品牌主色，向浅延展5个色值，向深延展4个色值，共得出10个色阶
| 向浅色延展5个色值 | 基准色 | 向深色延展4个色值 |
| --- | --- | --- |
| H+1递增 | H值 | H-1递增 |
| (s/5)≈值递减，最小值为5 | S值 | S+5递增 |
| B+5递增 | B值 | B-15递减 |
* H值变化规则：  
以品牌色为基准，向浅色过渡，色相值以H+1递增（超过360，再递增1的话，值为1）；向深色过渡，色相值以H-1递减，色阶在色相的变化增加品牌色的活泼度。
* S值变化规则：  
以品牌色为基准，向浅色过渡时，S值以公式（S/5) ≈值递减， 最小值为5， 保证最浅颜色也具有色彩倾向； 向深色过渡时，S值以公式S+5=值递增，最大值为100。
* B值变化规则：  
以品牌色为基准，向浅色过渡时，B值以公式+5= 值递增， 最大值为100 ； 向深色过渡时，B 值以公式B-15= 值递减。

### 3. 以主色为基准，按照色相值的冷暖范围，和主色对应的饱和度（S）和明度（B）值，自动生成3个功能颜色
* 如主色为冷色，则辅助色搭配的红绿为冷红、冷绿，冷色H范围：64-320，冷红H355，冷绿H125，冷橙H18；
* 如主色为暖色，则辅助色搭配的红绿为暖红、暖绿，暖色H范围：321-360/0-63，暖红H5，暖绿H95，暖橙H24。
<div>
    <font color="#E64552">错误色#E64552(355/70/90)</font>
    <font color="#39BF45">通过色#39BF45(125/70/75)</font>
    <font color="#E27C49">警示色#E27C49(18/70/95)</font>
    <font color="#3D88F2">主色#3D88F2(215/75/95)</font>
</div>
<div>
    <font color="#E65245">错误色#E65245(5/70/90)</font>
    <font color="#71BF39">通过色#71BF39(95/70/75)</font>
    <font color="#F2853D">警示色#F2853D(24/70/95)</font>
    <font color="#B29B28">主色#B29B28(50/75/95)</font>
</div>

* 交叉叠加规则：如果品牌色位于错误色、通过色、警示色的冷暖区间内，品牌色可以定义成某一种功能色；
* 如果主色的H值处于5-0/360-355区间，直接用主色替换辅助色的红色，此时非中性色为3种
* 错误红色H值区间：5-0/360-355
* 通过绿色H值区间：95-125
* 警示橙色H值区间：18-24


### 4：中性色同样为10阶 
#### 文字颜色
<font color="#000000">主色#B29B28(0/0/0)</font>
<font color="#333333">主色#333333(0/0/20)</font>
<font color="#666666">主色#666666(0/0/40)</font>
<font color="#999999">主色#999999(0/0/60)</font>
<font color="#CCCCCC">主色#CCCCCC(0/0/80)</font>
#### 结构颜色
<font color="#E0E0E0">主色#E0E0E0(0/0/88)</font>
<font color="#EEEEEE">主色#EEEEEE(0/0/93)</font>
<font color="#F5F5F5">主色#F5F5F5(0/0/96)</font>
<font color="#FAFAFA">主色#FAFAFA(0/0/98)</font>
<font color="#FFFFFF">主色#FFFFFF(0/0/100)</font>

[less @plugin at-rules]:https://less.bootcss.com/features/#plugin-atrules-feature
[DLS色彩规则]:(##DLS色彩规则)
