树结构：

author: zhangbo


先试一下树
```js
const TreeNode = Tree.TreeNode;
onSelect = e => {
    console.log(e);
}
onCheck = e => {
    console.log(e);
}
<Tree
defaultExpandedKeys={['0-0-0', '0-0-1']}
defaultSelectedKeys={['0-0-0', '0-0-1']}
defaultCheckedKeys={['0-0-0', '0-0-1']}
onSelect={onSelect}
onCheck={onCheck}
>
<TreeNode title="parent 1" key="0-0">
  <TreeNode title="parent 1-0" key="0-0-0" disabled>
    <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
    <TreeNode title="leaf" key="0-0-0-1" />
  </TreeNode>
  <TreeNode title="parent 1-1" key="0-0-1">
    <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
  </TreeNode>
</TreeNode>
</Tree>
```


