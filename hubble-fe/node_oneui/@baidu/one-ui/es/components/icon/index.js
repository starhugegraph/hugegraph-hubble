function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import PropTypes from 'prop-types';
export default function Icon(props) {
  var _classNames;

  var type = props.type,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      spin = props.spin,
      prefixCls = props.prefixCls;
  var classString = classNames(prefixCls, 'anchor', (_classNames = {}, _classNames[prefixCls + "-spin"] = !!spin || type === 'loading', _classNames[prefixCls + "-" + type] = true, _classNames), className);
  return React.createElement("i", _extends({}, omit(props, ['type', 'spin', 'prefixCls']), {
    className: classString
  }));
}
Icon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  spin: PropTypes.bool,
  style: PropTypes.object,
  prefixCls: PropTypes.string
};
Icon.defaultProps = {
  prefixCls: 'new-fc-one-icon'
};