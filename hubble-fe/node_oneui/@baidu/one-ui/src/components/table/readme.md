column 结构

普通表格

```js
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <div color={color} key={tag}>{tag.toUpperCase()}</div>;
      })}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Invite {record.name}</a>
      <a href="javascript:;">Delete</a>
    </span>
  ),
}];

const data = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: `${i}`,
        name: `John Brown ${i}`,
        age: 100 - i,
        address: `New York No. ${i + 1} Lake Park`,
        tags: ['nice', 'developer'],
    })
}

<div>
  <Table columns={columns} dataSource={data} />
</div>
```

普通表格不要分页

```js
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <div color={color} key={tag}>{tag.toUpperCase()}</div>;
      })}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Invite {record.name}</a>
      <a href="javascript:;">Delete</a>
    </span>
  ),
}];

const data = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: `${i}`,
        name: `John Brown ${i}`,
        age: 100 - i,
        address: `New York No. ${i + 1} Lake Park`,
        tags: ['nice', 'developer'],
    })
}

<div>
  <Table columns={columns} dataSource={data} pagination={false}/>
</div>
```

普通表格 - 无数据情况

```js
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <div color={color} key={tag}>{tag.toUpperCase()}</div>;
      })}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Invite {record.name}</a>
      <a href="javascript:;">Delete</a>
    </span>
  ),
}];

const data = [];

<div>
  <Table columns={columns} dataSource={data} />
</div>
```

普通表格 - 带border

```js
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <div color={color} key={tag}>{tag.toUpperCase()}</div>;
      })}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Invite {record.name}</a>
      <a href="javascript:;">Delete</a>
    </span>
  ),
}];

const data = [];
for (let i = 0; i < 5; i++) {
    data.push({
        key: `${i}`,
        name: `John Brown ${i}`,
        age: 100 - i,
        address: `New York No. ${i + 1} Lake Park`,
        tags: ['nice', 'developer'],
    })
}

<div>
  <Table columns={columns} dataSource={data} bordered={true}/>
</div>
```

普通表格 loading中

```js
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <div color={color} key={tag}>{tag.toUpperCase()}</div>;
      })}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Invite {record.name}</a>
      <a href="javascript:;">Delete</a>
    </span>
  ),
}];

const data = [];
for (let i = 0; i < 3; i++) {
    data.push({
        key: `${i}`,
        name: `John Brown ${i}`,
        age: 100 - i,
        address: `New York No. ${i + 1} Lake Park`,
        tags: ['nice', 'developer'],
    })
}

<div>
  <Table columns={columns} dataSource={data} bordered={true} loading={true}/>
</div>
```

普通表格 分页器受控 (模拟ajax请求)

- pagination.onPageNoChange({pageNo, pageSize})
- pagination.onPageSizeChange({pageNo, pageSize})

```js
const initialState = {
  pageNo: 1,
  pageSize: 2,
  total: 20
}
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <div color={color} key={tag}>{tag.toUpperCase()}</div>;
      })}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Invite {record.name}</a>
      <a href="javascript:;">Delete</a>
    </span>
  ),
}];

const data = [];
for (let i = 0; i < 3; i++) {
    data.push({
        key: `${i}`,
        name: `John Brown ${i}`,
        age: 100 - i,
        address: `New York No. ${i + 1} Lake Park`,
        tags: ['nice', 'developer'],
    })
}

initialState.data = data;

onPageNoChange = e => {
  const pageNo = e.target.value;
  const pageSize = this.state.pageSize;
  const newData = [];
  for (let i = 100; i < 100 + pageSize; i++) {
    newData.push({
        key: `${i}`,
        name: `John Brown ${i}`,
        age: 100 - i,
        address: `${pageNo} New York No. ${i + 1} Lake Park`,
        tags: ['nice', 'developer'],
    })
  }
  setState({
    data: newData,
    pageNo
  })
}

onPageSizeChange = e => {
   const pageSize = e.target.value;
  const newData = [];
  for (let i = 300; i < 300 + pageSize; i++) {
    newData.push({
        key: `${i}`,
        name: `John Brown ${i}`,
        age: 100 - i,
        address: `New York No. ${i + 1} Lake Park`,
        tags: ['nice', 'developer'],
    })
  }
  setState({
    data: newData,
    pageSize
  })
}

<div>
  <Table
    columns={columns}
    dataSource={state.data}
    pagination={{
      pageNo: state.pageNo,
      pageSize: state.pageSize,
      onPageNoChange: this.onPageNoChange,
      onPageSizeChange: this.onPageSizeChange,
      pageSizeOptions: ['2', '5', '10'],
      total: state.total
  }} />
</div>
```

可选择的列表 通过rowSelection来进行控制

```js
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Disabled User',
  age: 99,
  address: 'Sidney No. 1 Lake Park',
}];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

<Table rowSelection={rowSelection} columns={columns} dataSource={data} />
```

选择item

```js
const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: `${i}`,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

  initialState = {
    selectedRowKeys: [] // Check here to configure the default column
  };


  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setState({ selectedRowKeys });
  }

    const hasSelected = state.selectedRowKeys.length > 0;
    <div>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${state.selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={{
          selectedRowKeys: state.selectedRowKeys,
          onChange: this.onSelectChange
        }} columns={columns} dataSource={data} />
      </div>
```

自定义选项

```js
const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: `${i}`,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}


initialState = {
  selectedRowKeys: [], // Check here to configure the default column
};

onSelectChange = (selectedRowKeys) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  setState({ selectedRowKeys });
}

<Table rowSelection={{
  selectedRowKeys: state.selectedRowKeys,
  onChange: this.onSelectChange,
  hideDefaultSelections: true,
  selections: [{
    key: 'all-data',
    text: '全选',
    onSelect: () => {
      const selectedRowKeys = [];
      for (let i = 0; i <46; i++) {
        selectedRowKeys.push(`${i}`);
      }
      setState({
        selectedRowKeys // 0...45
      });
    },
  }, {
    key: 'odd',
    text: '选择双列',
    onSelect: (changableRowKeys) => {
      let newSelectedRowKeys = [];
      newSelectedRowKeys = changableRowKeys.filter((key, index) => {
        if (index % 2 !== 0) {
          return false;
        }
        return true;
      });
      setState({ selectedRowKeys: newSelectedRowKeys });
    },
  }, {
    key: 'even',
    text: '选择单列',
    onSelect: (changableRowKeys) => {
      let newSelectedRowKeys = [];
      newSelectedRowKeys = changableRowKeys.filter((key, index) => {
        if (index % 2 !== 0) {
          return true;
        }
        return false;
      });
      setState({ selectedRowKeys: newSelectedRowKeys });
    },
  }],
  onSelection: this.onSelection
}} columns={columns} dataSource={data} />
```

排序和筛选

```js
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  filters: [{
    text: 'Joe',
    value: 'Joe',
  }, {
    text: 'Jim',
    value: 'Jim',
  }, {
    text: 'Submenu',
    value: 'Submenu',
    children: [{
      text: 'Green',
      value: 'Green',
    }, {
      text: 'Black',
      value: 'Black',
    }],
  }],
  onFilter: (value, record) => record.name.indexOf(value) === 0,
  sorter: (a, b) => a.name.length - b.name.length
}, {
  title: 'Age',
  dataIndex: 'age',
  sorter: (a, b) => a.age - b.age,
}, {
  title: 'Address',
  dataIndex: 'address',
  filters: [{
    text: 'London',
    value: 'London',
  }, {
    text: 'New York',
    value: 'New York',
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.address.indexOf(value) === 0,
  sorter: (a, b) => a.address.length - b.address.length
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

<Table columns={columns} dataSource={data} onChange={onChange} />
```

可控排序，场景用于由服务端排序 column内的
onSort 指定排序函数 （本地模式） 远程模式使用onSortClick({sortOrder, sortColumn})
可控筛选 场景用于由服务端筛选 column内的 filterMultiple 指定多选和单选，filter指定筛选条件,
onFilter 用于筛选当前条件(本地模式下， 远程数据就用onFilterChange)

```js
const initialState = {
  sortOrder: 'descend'
}
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  filters: [{
    text: 'Joe',
    value: 'Joe',
  }, {
    text: 'Jim',
    value: 'Jim',
  }, {
    text: 'Submenu',
    value: 'Submenu',
    children: [{
      text: 'Green',
      value: 'Green',
    }, {
      text: 'Black',
      value: 'Black',
    }],
  }],
  sorter: true,
  sortOrder: state.sortOrder
}, {
  title: 'Age',
  dataIndex: 'age'
}, {
  title: 'Address',
  dataIndex: 'address',
  filters: [{
    text: 'London',
    value: 'London',
  }, {
    text: 'New York',
    value: 'New York',
  }]
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}];

onSortClick = sortParams => {
  console.log(sortParams);
  const sortOrder = sortParams.sortOrder;
  setState({
    sortOrder
  })
}

onFilterChange = filter => {
  console.log(filter);
}

<Table columns={columns} dataSource={data} onSortClick={this.onSortClick} onFilterChange={this.onFilterChange}/>
```

表格行、列合并

```js
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: (text, row, index) => {
    if (index < 4) {
      return <a href="javascript:;">{text}</a>;
    }
    return {
      children: <a href="javascript:;">{text}</a>,
      props: {
        colSpan: 5,
      },
    };
  },
}, {
  title: 'Age',
  dataIndex: 'age',
  render: renderContent,
}, {
  title: 'Home phone',
  colSpan: 2,
  dataIndex: 'tel',
  render: (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 2) {
      obj.props.rowSpan = 2;
    }
    // These two are merged into above cell
    if (index === 3) {
      obj.props.rowSpan = 0;
    }
    if (index === 4) {
      obj.props.colSpan = 0;
    }
    return obj;
  },
}, {
  title: 'Phone',
  colSpan: 0,
  dataIndex: 'phone',
  render: renderContent,
}, {
  title: 'Address',
  dataIndex: 'address',
  render: renderContent,
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  tel: '0571-22098909',
  phone: 18889898989,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  tel: '0571-22098333',
  phone: 18889898888,
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'London No. 2 Lake Park',
}, {
  key: '5',
  name: 'Jake White',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'Dublin No. 2 Lake Park',
}];

<Table columns={columns} dataSource={data} bordered />
```

固定表头

```js
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  width: 150,
}, {
  title: 'Age',
  dataIndex: 'age',
  width: 150,
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 15; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

<Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 100 }} />
```

固定表头和列，通过column.render渲染单元格

```js
import Button from '../button';

const columns = [
  {
    title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left',
  },
  {
    title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left',
  },
  {
    title: 'Column 1', dataIndex: 'address', key: '1', width: 150,
  },
  {
    title: 'Column 2', dataIndex: 'address', key: '2', width: 150,
  },
  {
    title: 'Column 3', dataIndex: 'address', key: '3', width: 150,
  },
  {
    title: 'Column 4', dataIndex: 'address', key: '4', width: 150,
  },
  {
    title: 'Column 5', dataIndex: 'address', key: '5', width: 150,
  },
  {
    title: 'Column 6', dataIndex: 'address', key: '6', width: 150,
  },
  {
    title: 'Column 7', dataIndex: 'address', key: '7', width: 150,
  },
  { title: 'Column 8', dataIndex: 'address', key: '8', width: 150},
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (text, record, index) => <a href="javascript:;">action</a>,
  },
];

const data = [];
for (let i = 0; i < 3; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
initialState = {
    selectedRowKeys: [], // Check here to configure the default column
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setState({ selectedRowKeys });
  }

<Table columns={columns} dataSource={data} scroll={{ x: 1585, y: 300 }} rowSelection={{
      selectedRowKeys: state.selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: '全选',
        onSelect: () => {
          const selectedRowKeys = [];
          for (let i = 0; i <46; i++) {
            selectedRowKeys.push(`${i}`);
          }
          setState({
            selectedRowKeys // 0...45
          });
        },
      }, {
        key: 'odd',
        text: '选择双列',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'even',
        text: '选择单列',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }],
      onSelection: this.onSelection
    }} />
```

表头分组

```js
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 100,
  fixed: 'left',
  filters: [{
    text: 'Joe',
    value: 'Joe',
  }, {
    text: 'John',
    value: 'John',
  }],
  onFilter: (value, record) => record.name.indexOf(value) === 0,
}, {
  title: 'Other',
  children: [{
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 200,
    sorter: (a, b) => a.age - b.age,
  }, {
    title: 'Address',
    children: [{
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
      width: 200,
    }, {
      title: 'Block',
      children: [{
        title: 'Building',
        dataIndex: 'building',
        key: 'building',
        width: 100,
      }, {
        title: 'Door No.',
        dataIndex: 'number',
        key: 'number',
        width: 100,
      }],
    }],
  }],
}, {
  title: 'Company',
  children: [{
    title: 'Company Address',
    dataIndex: 'companyAddress',
    key: 'companyAddress',
  }, {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName',
  }],
}, {
  title: 'Gender',
  dataIndex: 'gender',
  key: 'gender',
  width: 80,
  fixed: 'right',
}];

const data = [];
for (let i = 0; i < 3; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  });
}

<Table
    columns={columns}
    dataSource={data}
    bordered
    scroll={{ x: '130%', y: 240 }}
/>
```

通过column.render渲染单元格

```js
import Button from '../button';

const columns = [
  {
    title: 'Full Name', dataIndex: 'name', key: 'name',
  },
  {
    title: 'Age', dataIndex: 'age', key: 'age',
  },
  {
    title: 'Column', dataIndex: 'address', key: 'address',
  },
  {
    title: 'Action',
    key: 'operation',
    render: (text, record, index) => <div><Button type="base-b1">action</Button></div>,
  },
];

const data = [];
for (let i = 0; i < 3; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

<Table columns={columns} dataSource={data} />
```

嵌套子表格

```js
import Menu from '../menu';

initialState = {
    selectedRowKeys: [], // Check here to configure the default column
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setState({ selectedRowKeys });
  }
const menu = (
  <Menu>
    <Menu.Item>
      Action 1
    </Menu.Item>
    <Menu.Item>
      Action 2
    </Menu.Item>
  </Menu>
);

const expandedRowRender = () => {
  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', key: 'state', render: () => <span>Finished</span> },
    { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <span className="table-operation">
          <a href="javascript:;">Pause</a>
          <a href="javascript:;">Stop</a>
          <Dropdown overlay={menu}>
            <a href="javascript:;">
              More <Icon type="down" />
            </a>
          </Dropdown>
        </span>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56',
    });
  }
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowSelection={{
      selectedRowKeys: state.selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: '全选',
        onSelect: () => {
          const selectedRowKeys = [];
          for (let i = 0; i <46; i++) {
            selectedRowKeys.push(`${i}`);
          }
          setState({
            selectedRowKeys // 0...45
          });
        },
      }, {
        key: 'odd',
        text: '选择双列',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'even',
        text: '选择单列',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }],
      onSelection: this.onSelection
    }}
    />
  );
};

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Platform', dataIndex: 'platform', key: 'platform' },
  { title: 'Version', dataIndex: 'version', key: 'version' },
  { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  { title: 'Creator', dataIndex: 'creator', key: 'creator' },
  { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Action', key: 'operation', render: () => <a href="javascript:;">Publish</a> },
];

const data = [];
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    name: 'Screem',
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00',
  });
}

<Table
    className="components-table-demo-nested"
    columns={columns}
    expandedRowRender={expandedRowRender}
    dataSource={data}
  />
```
