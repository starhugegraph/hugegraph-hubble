# Changelog
All notable changes to this project will be documented in this file.

[released]
### [3.1.1-beta-18] 2020-06-08
### tabs
    remove tranform transition

### [3.1.1-beta-16] 2020-05-21
### datePicker
    add datePicker new feature validateDisabled
### slider
    fix tooltip show delay

### [3.1.1-beta-15] 2020-05-20
### TextLine
    fix textLine multiple validate

### [3.1.1-beta-14] 2020-05-12
### Table
    fix table 表格 滚动条 scroll -> auto

### [3.1.1-beta-13] 2020-05-11
### cascader
    自定义children无法被选中

### [3.1.1-beta-12] 2020-05-11
### modal
    fix react15下不使用portal导致不销毁问题

### [3.1.1-beta-11] 2020-05-09
### checkbox button 和 radio button
    checkbox和radio从小勾换成三角

### [3.1.1-beta-10] 2020-04-30
### Transfer
    兼容Transfer组件的selectedList有值但allDataMap为{}时报错问题

### [3.1.1-beta-9] 2020-04-28
### CascaderPane
    支持传入CustomItemRender属性在数据源render前自定义render一项
### SelectRegion
    支持传入showCheckAll属性，扩展全选地域功能

### [3.1.1-beta-8] 2020-04-26
### transfer
    优化allDataMap变化后，componentWillRecieveProps不发生变化
### table
    优化表格size未medium情况，字号样式被覆盖
### comfirm和alert
    支持传入modalProps属性来修改modal上的样式和类名

### [3.1.1-beta-7] 2020-04-17
### transfer
    点checkbox触发两次冒泡
### form
    报错样式修复


### [3.1.1-beta-6] 2020-04-17
### checkbox.button、radio.button
    高度样式修复
### transfer
    修复disabled后依旧能被全选和清空的问题
### uploader
    修复上传icon样式
### menu
    修复子submenu的color
### button
    修复图文按钮的spacing问题

### [3.1.1-beta-5] 2020-04-09
### select
    增加checkboxPrefixCls来自定义checkbox前缀

### [3.1.1-beta-4] 2020-04-03
### CascaderPane
    新增组件cascaderPane

### [3.1.1-beta-3] 2020-04-01
### Table
    子母表样式调整
### radioGroup, checkboxGroup
    增加 radioPrefixCls、checkboxPrefixCls

### [3.1.1-beta-2] 2020-04-01
### radioButton, radioGroup
    disabled时，z-index调整

### [3.1.1-beta-1] 2020-03-26
### datePicker
    datePicker增加参数:
        layerPrefixCls、buttonPrefixCls 为弹层的自定义样式前缀、按钮自定义前缀
    monthPicker增加参数：
        layerPrefixCls、buttonPrefixCls 为弹层的自定义样式前缀、按钮自定义前缀
    rangePicker
        layerPrefixCls、buttonPrefixCls 为弹层的自定义样式前缀、按钮自定义前缀
### dropdown
    dropdownButton增加参数：
        searchPrefixCls： 为搜索框自定义前缀
### region
    region增加参数：
        checkboxPrefixCls：为复选框自定义前缀
    selectRegion增加参数：
        checkboxPrefixCls：为复选框自定义前缀
        searchPrefixCls: 为搜索自定义前缀
        buttonPrefixCls: 为按钮自定义前缀
        popLayerPrefixCls: 为弹层自定义前缀
    singleRegion增加参数：
        cascaderPrefixCls：为级联器自定义前缀
### transfer
    暴露：
    默认元组件：
        Transfer.CommonTitleRender;
        Transfer.CommonItemRender;
        Transfer.CommonSearchRender;
        Transfer.CommonFooterRender;
    分别为默认的 标题title Render、item Render、搜索框的render、footer的render
    增加参数：
        treePrefixCls、buttonPrefixCls、checkboxPrefixCls、tooltipPrefixCls
### 

### [3.0.14-beta-74] 2020-03-23
### region
    Region支持 prefix and suffix render

### [3.0.14-beta-73] 2020-03-17
### table
    expandedRowRender返回null时，则不渲染子表

### [3.0.14-beta-72] 2020-3-9
### drawer
    下掉rc-drawer

### [3.0.14-beta-71] 2020-2-25
### iconSvg
    新增dls svg的所有图标
### pagination
    样式修复

### [3.0.14-beta-70] 2020-2-9
### table
    修复firefox双滚动条问题
    修复无数据的时候留白

### [3.0.14-beta-69] 2020-1-15
### search
    bugfix: 设置overlay的时候，不需要options里面有值

### [3.0.14-beta-68] 2020-1-13
### table
    升级表格dls样式

### [3.0.14-beta-67] 2020-1-8
### transfer
    修复穿梭框disabled后还能点击问题

### [3.0.14-beta-66] 2020-1-8
### select
    下拉target的arrow样式，替换成svg

### [3.0.14-beta-65] 2020-1-7
### modal
    弹窗弹出的时候，给body增加overflow: hidden

### [3.0.14-beta-64] 2020-1-5
### transfer
    对.disabled的情况，排查了一下做兼容处理
### input
    修复报错颜色由黑色变成红色

### [3.0.14-beta-62] 2019-12-30
### transfer
    bugfix 禁用后依旧可以点的问题

### [3.0.14-beta-61] 2019-12-30
### steps
    bugfix steps样式

### [3.0.14-beta-59] 2019-12-26
### tree
    switchIcon支持func
### select
    group分割线颜色bugfix
### transfer
    至上限的时候tooltip提示加回

### [3.0.14-beta-58] 2019-12-20
### numberbox 
    修复没有值的时候，上下键不可点击问题
### datePicker
    多片的时候flex改成inline-block，兼容ie

### [3.0.14-beta-57] 2019-12-20
### tree 
    修复超长的时候出现对不齐的情况
### modal
    下线rc-dialog依赖

### [3.0.14-beta-56] 2019-12-16
### tree
    修复-treeNode的disabled始终只控制select，其余请用其他属性控制
### numberbox
    修复样式问题

### [3.0.14-beta-55] 2019-12-16
### numberbox
- 修复样式问题
### uploader
- 修复限制个数后，重新上传的问题
### select
- 支持自定义target枚举

### [3.0.14-beta-54] 2019-12-11
### datePicker
    修复引入删除icon后，导致日期的icon不可点击的问题
### form
    修复报错样式
### menu
    竖排menu，多级菜单，只有最有一级有选中状态，其余只打开
### uploader
    修复删除后，this._fileList没删除的问题

### [3.0.14-beta-53] 2019-12-9
### checkbox
    className层级高于组件自身的层级
### input
    getDerivedStateFromProps监听value change的时候重新设置errorMessage
### Modal.Confirm
    增加icon以及iconType属性，增加带图标的confirm/alert的用法
### slider
    样式优化
### radio
    样式优化
### uploader
    修复showUploadListIcon设置无效的bug，增加属性maxFileLength以及maxFileLengthErrorMessage属性，表示最大个数以及提示（注意：报错的文件也算在最大个数里）



### [3.0.14-beta-52] 2019-12-6
### anchor
    样式优化，增加尺寸medium，默认是small尺寸
### carousel
    优化样式，切换点增加支持dot，number，hide，增加showButton属性表示是否展示翻页按钮，支持prevButtonProps，nextButtonProps，customSuffix属性
### checkbox
    去掉rc-checkbox依赖
### radio
    去掉rc-checkbox依赖
### slider
    样式优化
### switch
    去掉rc-switch依赖
### timePicker
    当自定义输入框宽度时，下拉菜单与输入框同宽，
### datePicker
    增加showDeleteIcon，onDelete两个参数，展示日期选择器日期是否可以被删除
### dropdown
    去除rc-dropdown的依赖
### modal
    优化样式，footer样式右对齐的时候，主按钮在右侧
### popover
    优化样式，内容区设置font-size为14px
### tree
    升级尺寸，扩展功能
### alert
    重构了Alert.Page，去掉了轮播图特效，增加slider, size, onPrevChange, onNextChange属性
### uploader
    报错导致图形上传样式出错

### [3.0.14-beta-51] 2019-12-2
### datePicker
    修复非受控情况下不传默认值的时候，rangePicker下12月月份+1后出现的bug
### tabs
    支持自定义添加文案
### tooltip
    替换rc-tooltip


### [3.0.14-beta-50] 2019-11-29
### calendar
    优化包大小，去掉了calendar里面不必要的配置项
### tabs
    新增tabs组件
### uploader
    去掉图片列表中失败重传的刷新icon样式，统一改为重新上传的icon

### [3.0.14-beta-49] 2019-11-27
### transfer
    根据dls规范优化了样式，增加了medium尺寸穿梭框，由于UE制定新的规范，isShowLevelSelect默认值由true改成false
### dropdown和select
    增加键盘上下移的焦点事件
### checkbox and radio
    根据dls规范，优化了checkbox.Button和radio.Button的样式
### input.search
    去掉input里写的内联width，使用100%根据父节点自适应
### 



### [3.0.14-beta-48]
### dropdown
    优化了样式，支持分组下拉菜单和文字链下拉菜单，具体请看示例
### alert
    优化样式，将icon由font替换成svg
### badge
    优化了badge样式
### checkbox
    优化了checkbox样式
### collapse
    优化了collapse样式
### drawer
    优化了drawer的透明度由0.3 -> 0.6
### loading
    优化了loading样式，支持垂直方向loading和自定义loading icon
### modal
    优化了modal样式
### switch 
    优化了样式，支持showInnerIcon和showInnerLabel进行内嵌图标和文字
### datePicker 
    同时出现月份的时候增加分割线
### numberBox 
    优化样式与实例
### tooltip and popover
    优化箭头位置与样式

### [3.0.14-beta-46]
### collapse
    样式bugfix
    箭头icon替换成svg
### 
### drawer
    样式优化
    关闭icon替换成svg
### embedded
    增加position属性，表示按钮的默认值，默认是在左侧

### [3.0.14-beta-45]
### select
    fix 没有value的时候，selectorName颜色与placeholder不一致的问题
### textLine
    componentWillRecieveProps监听value变化时候实时触发校验报错
###

### [3.0.14-beta-44]
### uploader
    新增uploader
其余组件优化
###

### [3.0.14-beta-43]
### calendar
fix引入dayjs.isValid报错
###

### [3.0.14-beta-42]
### datePicker
样式优化
###


### [3.0.14-beta-41]
### Table
优化表格筛选下拉按钮跑出下拉框样式优化
###

### [3.0.14-beta-40]
### datePicker
新增日期选择器组件 datePicker
###
### input
    优化有前缀和后缀的input样式
###
### transfer
    handleDelete函数暴露当前点击删除的节点的key
###

### [3.0.14-beta-39]
###
    去掉Region的customRegion中isRequired
###

### [3.0.14-beta-37]
###
    去掉输入类input的line-height
    增加pagination的selectProps属性，可以直接控制下拉页码选择器的select属性
    fix menu样式
###

### [3.0.14-beta-36]
###
    引入popLayer
###

### [3.0.14-beta-35]
###
    日历修复表单中的日历，表单中日历请选择Calendar.Form
###

### [3.0.14-beta-31]
###
    input支持input宽度传入100%的时候自适应外层宽度
    select - multiple or tags模式下，内置了checkbox
###


### [3.0.14-beta-30]
###
search 增加showSearchIcon参数，传false没有搜索按钮
popLayer 默认挂载body上
###

### [3.0.14-beta-11] 2019-08-01
### 新增组件
    form、alert、anchor、loading
###
### 皮肤升级
    breaking: menu， 其余增加尺寸
###

### [3.0.12] 2019-07-16
###  drawer
    升级rc-drawer至2.0.1
###
###  message
    fix loading状态时 icon与文字对不齐
###
###  modal
    fix buttonPosition 不生效
###
### transfer
    fix searchValue必须受控的问题，调用handleSelect时候会把点击的key暴露出来
###
### checkbox, radio
    default变为了medium，使用default不会有问题，但是会报warning，请注意修改
###

### [3.0.5] 2019-07-02
### input,numberbox,textArea,search
    升级符合DLS规范皮肤
###

### [3.0.2] 2019-06-20
### checkbox
    升级符合DLS规范皮肤, 更新了checkbox的size，移除large尺寸，增加small尺寸
###
### radio
    升级符合DLS规范皮肤, 更新了radio的size，移除large尺寸，增加small尺寸
###
### switch
    升级符合DLS皮肤规范，增加small尺寸，然后每个尺寸高度和宽度都有所调整(变小)
###
### pagination
    pageSize发生改变的时候，非受控情况下，统一更改为pageNo置为1，跳回第一页
###
### modal
    升级依赖rc-dialog，至7.4.0，react16以上版本，创建modal的时候使用createPortal
###
### 其他
    将less-plugin-dls从devDependencies移到dependencies
###

### [3.0.1] 2019-06-17
### button
    符合DLS规范，更新了button的type，从3.0版本开始type只支持normal、strong、primary、translucent、link五种类型，同时向下兼容类型
    button尺寸由原来的3种变成了5种，增加xsmall，xlarge
###
### textLink
    符合DLS规范，更新了textlink的type，从3.0版本开始type只支持normal、strong两种类型，同时向下兼容类型
    size尺寸由原来的1种变成2种，增加small尺寸
    textLink增加disabled状态
###


### [2.1.11] 2019-06-14
### menu
    将横向menu布局方式由float改为flex布局方式，避免clear:both引起的撑大的样式问题
### badge
    badge组件包裹生命周期react-lifecycles-compat的polyfill，fix react15版本使用badge时，getDerivedStateFromProps不生效的问题
### textArea
    textArea的默认宽度由322px修改为标准标注300px。

### [2.1.10] 2019-06-06
### table
    column里面增加defaultSortOrder表示非受控默认排序
    column里面增加defaultFilteredValue表示非受控默认的filteredValue
    column里面增加filterWithoutConfirm，该值为boolean类型值，表示filter不需要确认取消按钮，该条件下每次点击筛选的单选/复选会调用onFilterChange
    column里面增加customOperate，可自定义除sort和filter以外的其他操作，例如tip
###
### pagination
    增加defaultPageNo，defaultPageSize表示非受控分页器的默认页数和默认页码
###
### modal
    增加needCloseIcon属性表示是否展示右上角的X，默认是true表示展示x
###
### region、table
    demo页中标注region、table为非DLS规范，属于商业规范的实验性组件
###
### select
    增加实验性质属性customRenderTarget（有提出这个target略生涩，所以这个名字可能会更换），放在实验性质里面建议该版本不使用，customRenderTarget => 可自定义target的展示规则，如姓名：${Label}
###

### [2.1.6] 2019-05-29
### transfer 
    可选的大于上限的时候，全选按钮置灰
###
### input 
    增加参数countMode 来区分中文校验算1个字符还是2个字符，具体见demo
    增加参数getLength 可自定义计数，具体见demo
###
### textLine 
    增加参数countMode 来区分中文校验算1个字符还是2个字符，具体见demo
    增加参数getLength 可自定义计数，具体见demo
###
### textArea 
    增加参数countMode 来区分中文校验算1个字符还是2个字符，具体见demo
    增加参数getLength 可自定义计数，具体见demo
    textArea支持最小行高可定义，具体见demo
###
###
    demo库网站 排版更新
###

### [2.1.2] 2019-5-27
### 新增飘角组件Badge
### 新增标签组件 Tag
### 穿梭框
    - 支持没有选项的时候，添加全部按钮置灰，且不可使用状态
###
### 搜索
    - 支持defaultValue
###
### 按钮，消息提示
    - 更新了样式配置，支持更细粒度的皮肤定制
###
### 升级了babel，eslint，支持输出es

### [2.0.22] 2019-5-17
### 新增Grid组件
### 新增BreadCrumb组件
### 优化了Table 部分样式问题
### ReadMe 增加如何使用安装说明

### [2.0.18] 2019-5-8
### menu 支持icon箭头放在左边
### table 优化样式

###  [2.0.13] 2019-4-28  2.0.11 - patch
### 更新dropdown.Button 传参问题
### 更新search, autoFocus 为true时报错


###  [2.0.11] 2019-4-28

### table
    发布新组件table

### region
    地域组件发布单选地域组件

### modal
    修复modal出现可能会有抖动的问题

### 

## [2.0.1] 2019-4-15

### 升级版本至 react 16.8.4

### region
    发布地域组件，暂只支持多选，单选先使用cascader, 单选会在近期内收录至组件库
###

### 其他

## ## [2.0.5] 2019-4-18

### calendar
    修复快捷操作时，设置了最大时间小于今天时候，今天还能被选上

### search
    menu选中的时候，value不受控问题

### message
    增加message.warning，message.loading

### 其他样式优化

## [1.0.49] 2019-3-29

### modal
    modal.confirm 可以支持自定义 okProps, cancelProps 来定义confirm的按钮
###

### 其他样式优化

## [1.0.48] 2019-3-21
### textArea
    发布新组件 textArea
###

### calendar
    优化交互，比较或选择一段时间的时候，选择月份后回来可以继续上一次的步骤
    calendar增加disabled状态
###

### select
    优化多选交互，去掉了无用参数tagWarnPlaceholder, 只用传placeholder即可
### 

## [1.0.47] 2019-3-14
更新如下：
#### calendar
    1、优化了交互，减少了卡顿
    2、简化了操作步骤，每次点击比较的时候，会清空对比时间
####

### step
    增加参数onClickStep函数，为点击步骤条触发的函数
###

###tooltip
    去掉无用参数，style
###

###number
    当没有min&&max时，向上调节器置灰问题。
###

## [1.0.46] 2019-3-8
更新如下
-calendar：
    增加参数 validateMinDate, validateMaxDate，允许传入限制的起止时间和结束时间
    增加参数 rangeValidate 允许自定义校验
    修改交互，由之前的循环时间，改为第四次点击时候清空之前的日期
    修改UI 时间输入框蓝色的字号，改为黑色
    修复bug: 滑动的时候选择有抖动的问题，比较选择的时候，移开日期可能会有tip挡住的问题
-message：
    修复弹层过高的问题
-dropdown Button
    修复默认将弹窗挂载在父组件上改为默认挂载在body上面
-drawer
    修复弹窗弹出时候，页面跟着被移动
-tooltip
    根据UI进行了样式修复
-steps
    增加步骤条的hover样式，增加参数showTipWhenHover, hoverTip,来自定义选择要不要展示hover 的tooltip
-pagination
    分开分页器和页码选择器，改变布局由连在一起改为一左一右
-numberbox
    修改了部分bug
-input
    优化了部分bug
-cascader
    修复了，搜索模式下，输入报错的情况
-comfirm
    修改了按钮默认size为large的情况
-swicth
    优化了样式

## [0.0.45-beta-01] 2019-3-3
-calendar 增加参数 validateMinDate, validateMaxDate，允许传入限制的起止时间和结束时间
-message 修复弹层过高的问题
-dropdown Button 修复默认将弹窗挂载在父组件上改为默认挂载在body上面
-drawer修复弹窗弹出时候，页面跟着被移动
-tooltip 根据UI进行了样式修复
-steps 增加步骤条的hover样式，增加参数showTipWhenHover, hoverTip,来自定义选择要不要展示hover 的tooltip

## [0.0.44] -2019-2-27
-calendar 单日，选一段时间模式下，暴露onSelectDay函数
-calendar 单日，选一段时间模式下，暴露onSelectDay函数
-calendar 修复不可选未来时间，输入框还是可以输入未来时间
-calendar 增加最近14天配置项
-dropdownButton 增加 divider
-calendar 暴露自定义className
-calendar 支持xxxx-xx-xx格式
-transfer 支持自定义disabled
-增加部分参数注释

## [0.0.43] - 2019-2-26
-calendar 修改了输入日期的颜色，由橙色和蓝色变成了黑色


## [0.0.42] - 2019-2-26
-searchBox 修复传入类名引用错误
-transfer 引用的searchBox去除style参数

## [0.0.41] - 2019-2-18
-修改select样式问题，去掉select的components
-去掉cascader的components
-searchBox样式升级，下拉框交互方式；去掉style，改为具体的width，height；
-fix calendar some bug
-calendar 增加 属性与default区分开
-Select.SingleSelect 增加selectorName作为默认的placeholder

## [0.0.40] - 2019-2-18
-修改级联器样式问题

## [0.0.39] - 2019-2-18
-日期选择器bugfix

## [0.0.38] - 2019-2-18
- 修改分页器的api Name, 将onChange 换成了 onPageNoChange, onShowSizeChange 换成了 onPageSizeChange, 将这两个的函数传出参数包装成了e，将current替换成了pageNo
- 修改穿梭框在默认已有选中情况下的问题
-去掉了步骤条部分无用样式，把样式合并至了一个文件
-fix 日期选择器部分bug,支持选择时间时候，只选择时或者时分
-去了日期的component,将依赖组件展平
-tooltip 背景色由黑色变白色

## [0.0.37] -  2019-2-17
### Changed
- start use Changelog in this version
- fix the bug that Calendar choose time is Undefined
- fix some Calendar style bug such as when choose a day, the dom is shaking
- fix the bug that when PopLayer first open in document, the position is wrong
- fix the bug that date can't change when props Changed
