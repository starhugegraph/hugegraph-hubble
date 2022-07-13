基础栅格
```js
import Grid from './index';
const rowStyle={
  height: '50px',
  marginBottom: '10px',
  textAlign: 'center',
  color: 'white',
  lineHeight: '50px'
};
const {Row, Col} = Grid;
<div>
    <Row style={rowStyle}>
      <Col span={12} style={{background: '#00a0e9', height: '100%'}}>col-12</Col>
      <Col span={12} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}>col-12</Col>
    </Row>
    <Row style={rowStyle}>
      <Col span={8}  style={{background: '#00a0e9', height: '100%'}}>col-8</Col>
      <Col span={8} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}>col-8</Col>
      <Col span={8}  style={{background: '#00a0e9', height: '100%'}}>col-8</Col>
    </Row>
    <Row style={rowStyle}>
      <Col span={6} style={{background: '#00a0e9', height: '100%'}}>col-6</Col>
      <Col span={6} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}>col-6</Col>
      <Col span={6} style={{background: '#00a0e9', height: '100%'}}>col-6</Col>
      <Col span={6} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}>col-6</Col>
    </Row>
</div>
```

区块间隔
```js
import Grid from './index';
const rowStyle={
  height: '50px',
  marginBottom: '10px',
  textAlign: 'center',
  color: 'white',
  lineHeight: '50px'
};
const {Row, Col} = Grid;
<div>
    <Row style={rowStyle} gutter={16}>
      <Col span={4}>
        <div style={{background: '#00a0e9', height: '100%'}}>col-6</div>
      </Col>
      <Col span={4}>
        <div style={{background: '#00a0e9', height: '100%'}}>col-6</div>
      </Col>
      <Col span={4}>
        <div style={{background: '#00a0e9', height: '100%'}}>col-6</div>
      </Col>
      <Col span={4}>
        <div style={{background: '#00a0e9', height: '100%'}}>col-6</div>
      </Col>
    </Row>
</div>
```

左右偏移
列偏移。
使用 offset 可以将列向右侧偏。例如，offset={4} 将元素向右侧偏移了 4 个列（column）的宽度。
```js
import Grid from './index';
const rowStyle={
  height: '50px',
  marginBottom: '10px',
  textAlign: 'center',
  color: 'white',
  lineHeight: '50px'
};
const {Row, Col} = Grid;
<div>
    <Row style={rowStyle}>
      <Col span={8} style={{background: '#00a0e9', height: '100%'}}>col-8</Col>
      <Col span={8} offset={8} style={{background: '#00a0e9', height: '100%'}}>col-8 col-offset-8</Col>
    </Row>
    <Row style={rowStyle}>
      <Col span={6} offset={6} style={{background: '#00a0e9', height: '100%'}}>col-6 col-offset-6</Col>
      <Col span={6} offset={6} style={{background: '#00a0e9', height: '100%'}}>col-6 col-offset-6</Col>
    </Row>
    <Row style={rowStyle}>
      <Col span={12} offset={6} style={{background: '#00a0e9', height: '100%'}}>col-12 col-offset-6</Col>
    </Row>
  </div>
```

Flex 布局
使用 row-flex 定义 flex 布局，其子元素根据不同的值 start,center,end,space-between,space-around，分别定义其在父节点里面的排版方式。
```js
import Grid from './index';
const rowStyle={
  height: '50px',
  marginBottom: '10px',
  textAlign: 'center',
  color: 'white',
  lineHeight: '50px'
};
const {Row, Col} = Grid;
<div>
    <p>sub-element align left</p>
    <Row type="flex" justify="start" style={rowStyle}>
      <Col span={4} style={{background: '#00a0e9', height: '100%'}}>col-4</Col>
      <Col span={4} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}>col-4</Col>
      <Col span={4} style={{background: '#00a0e9', height: '100%'}}>col-4</Col>
      <Col span={4} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}>col-4</Col>
    </Row>

    <p>sub-element align center</p>
    <Row type="flex" justify="center" style={rowStyle}>
      <Col span={4} style={{background: '#00a0e9', height: '100%'}}>col-4</Col>
      <Col span={4} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}>col-4</Col>
      <Col span={4} style={{background: '#00a0e9', height: '100%'}}>col-4</Col>
      <Col span={4} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}>col-4</Col>
    </Row>

    <p>sub-element align right</p>
    <Row type="flex" justify="end" style={rowStyle}>
      <Col span={4} style={{background: '#00a0e9', height: '100%'}}>col-4</Col>
      <Col span={4} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}>col-4</Col>
      <Col span={4} style={{background: '#00a0e9', height: '100%'}}>col-4</Col>
      <Col span={4} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}>col-4</Col>
    </Row>

    <p>sub-element monospaced arrangement</p>
    <Row type="flex" justify="space-between" style={rowStyle}>
      <Col span={4} style={{background: '#00a0e9', height: '100%'}}>col-4</Col>
      <Col span={4} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}>col-4</Col>
      <Col span={4} style={{background: '#00a0e9', height: '100%'}}>col-4</Col>
      <Col span={4} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}>col-4</Col>
    </Row>

    <p>sub-element align full</p>
    <Row type="flex" justify="space-around" style={rowStyle}>
      <Col span={4} style={{background: '#00a0e9', height: '100%'}}>col-4</Col>
      <Col span={4} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}>col-4</Col>
      <Col span={4} style={{background: '#00a0e9', height: '100%'}}>col-4</Col>
      <Col span={4} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}>col-4</Col>
    </Row>
  </div>
```

Flex 对齐
Flex 子元素垂直对齐。
使用align
```js
import Grid from './index';
const rowStyle={
  height: '50px',
  marginBottom: '10px',
  textAlign: 'center',
  color: 'white',
  lineHeight: '50px'
};
const {Row, Col} = Grid;
<div>
    <p>Align Top</p>
    <Row type="flex" justify="center" align="top" style={rowStyle}>
      <Col span={4}><div  style={{background: '#00a0e9', height: '40px'}} value={100}>col-4</div></Col>
      <Col span={4}><div style={{background: 'rgba(0,160,233,0.7)', height: '60px'}}value={50}>col-4</div></Col>
      <Col span={4}><div style={{background: '#00a0e9', height: '70px'}} value={120}>col-4</div></Col>
      <Col span={4}><div style={{background: 'rgba(0,160,233,0.7)', height: '50px'}} value={80}>col-4</div></Col>
    </Row>

    <p>Align Center</p>
    <Row type="flex" justify="space-around" align="middle">
      <Col span={4} style={{background: '#00a0e9', height: '100%'}}><div value={100}>col-4</div></Col>
      <Col span={4} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}><div value={50}>col-4</div></Col>
      <Col span={4} style={{background: '#00a0e9', height: '100%'}}><div value={120}>col-4</div></Col>
      <Col span={4} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}><div value={80}>col-4</div></Col>
    </Row>

    <p>Align Bottom</p>
    <Row type="flex" justify="space-between" align="bottom">
      <Col span={4} style={{background: '#00a0e9', height: '100%'}}><div value={100}>col-4</div></Col>
      <Col span={4} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}><div value={50}>col-4</div></Col>
      <Col span={4} style={{background: '#00a0e9', height: '100%'}}><div value={120}>col-4</div></Col>
      <Col span={4} style={{background: 'rgba(0,160,233,0.7)', height: '100%'}}><div value={80}>col-4</div></Col>
    </Row>
  </div>
```