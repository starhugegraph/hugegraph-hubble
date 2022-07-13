import React from 'react';
import PropTypes from 'prop-types';
import { Circle as RCCircle } from 'rc-progress';

var Circle = function Circle(props) {
  var prefixCls = props.prefixCls,
      percent = props.percent,
      strokeLinecap = props.strokeLinecap,
      strokeColor = props.strokeColor,
      strokeWidth = props.strokeWidth,
      width = props.width,
      trailColor = props.trailColor,
      children = props.children;
  var circleStyle = {
    width: width,
    height: width
  };
  return React.createElement("div", {
    className: prefixCls + "-inner",
    style: circleStyle
  }, React.createElement(RCCircle, {
    percent: percent,
    strokeWidth: strokeWidth,
    trailWidth: strokeWidth,
    strokeColor: strokeColor,
    strokeLinecap: strokeLinecap,
    trailColor: trailColor,
    prefixCls: prefixCls
  }), children);
};

Circle.propTypes = {
  prefixCls: PropTypes.string,
  percent: PropTypes.number,
  strokeLinecap: PropTypes.string,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  width: PropTypes.number,
  trailColor: PropTypes.string,
  children: PropTypes.node
};
Circle.defaultProps = {
  prefixCls: 'new-fc-one-progress',
  percent: 0,
  strokeLinecap: 'round',
  strokeColor: '',
  strokeWidth: 0,
  width: 100,
  trailColor: '#eee'
};
export default Circle;