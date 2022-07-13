分页器

author huangshiming
```js
initialState = {current: 1, pageSize: 10, total: 200};
onShowSizeChange = e => {
    setState({
        pageSize: +e.target.value,
        pageNo: 1,
        total: 5
    });
}
onChange = e => {
    setState({
        pageNo: +e.target.value,
    });
}
<Pagination 
    onPageSizeChange={this.onShowSizeChange} 
    total={state.total}
    pageNo={state.pageNo}
    pageSize={state.pageSize}
    pageSizeOptions={['10', '20', '30']}
    onPageNoChange={this.onChange}
/>
```

```js
initialState = {pageNo: 1, pageSize: 10};
onShowSizeChange = e => {
    setState({
        pageSize: +e.target.value
    });
}
onChange = e => {
    setState({
        pageNo: +e.target.value,
    });
}
<Pagination 
    onPageSizeChange={this.onShowSizeChange} 
    total={60}
    pageNo={state.pageNo}
    pageSize={state.pageSize}
    pageSizeOptions={['10', '20', '30']}
    onPageNoChange={this.onChange}
/>
```

简版 - 简版是没有翻页器的
```js
initialState = {pageNo: 1, pageSize: 10};
onShowSizeChange = e => {
    setState({
        pageSize: +e.target.value
    });
}
onChange = e => {
    setState({
        pageNo: +e.target.value,
    });
}
<Pagination 
    total={60}
    pageNo={state.pageNo}
    onPageNoChange={this.onChange}
    size="small"
/>
```
