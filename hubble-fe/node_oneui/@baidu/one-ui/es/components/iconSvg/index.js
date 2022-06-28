function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import tools from '../../core';
var iconSvgMap = tools.iconSvg.iconSvgMap;
export default function IconSvg(props) {
  var _classNames;

  var type = props.type,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      prefixCls = props.prefixCls;
  var classString = classNames(prefixCls, (_classNames = {}, _classNames[prefixCls + "-" + type] = true, _classNames), className);
  var Comp = iconSvgMap[type];

  if (!Comp) {
    return null;
  }

  return React.createElement(Comp, _extends({}, omit(props, ['type', 'prefixCls']), {
    className: classString
  }));
}
IconSvg.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  prefixCls: PropTypes.string
};
IconSvg.defaultProps = {
  prefixCls: 'new-fc-one-icon-svg'
};