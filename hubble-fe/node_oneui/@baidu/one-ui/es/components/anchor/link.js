function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';

var AnchorLink =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(AnchorLink, _Component);

  function AnchorLink() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      var _this$context$oneAnch = _this.context.oneAnchor,
          scrollTo = _this$context$oneAnch.scrollTo,
          onClick = _this$context$oneAnch.onClick;
      var _this$props = _this.props,
          href = _this$props.href,
          title = _this$props.title;

      if (onClick) {
        onClick(e, {
          title: title,
          href: href
        });
      }

      scrollTo(href);
    });

    return _this;
  }

  var _proto = AnchorLink.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.context.oneAnchor.registerLink(this.props.href);
  };

  _proto.componentDidUpdate = function componentDidUpdate(_ref) {
    var prevHref = _ref.href;
    var href = this.props.href;

    if (prevHref !== href) {
      this.context.oneAnchor.unregisterLink(prevHref);
      this.context.oneAnchor.registerLink(href);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.context.oneAnchor.unregisterLink(this.props.href);
  };

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        href = _this$props2.href,
        title = _this$props2.title,
        children = _this$props2.children,
        className = _this$props2.className,
        isALabel = _this$props2.isALabel;
    var active = this.context.oneAnchor.activeLink === href;
    var wrapperClassName = classNames(className, prefixCls + "-link", (_classNames = {}, _classNames[prefixCls + "-link-active"] = active, _classNames[prefixCls + "-link-not-active"] = !active, _classNames[prefixCls + "-link-has-children"] = !!children, _classNames[prefixCls + "-link-without-children"] = !children, _classNames));
    var titleClassName = classNames(prefixCls + "-link-title", (_classNames2 = {}, _classNames2[prefixCls + "-link-title-active"] = active, _classNames2[prefixCls + "-link-title-not-active"] = !active, _classNames2));
    var label = isALabel ? React.createElement("a", {
      className: titleClassName,
      href: href,
      title: typeof title === 'string' ? title : '',
      onClick: this.handleClick
    }, React.createElement("span", null, title)) : React.createElement("span", {
      className: titleClassName,
      title: typeof title === 'string' ? title : '',
      onClick: this.handleClick
    }, React.createElement("span", null, title));
    return React.createElement("div", {
      className: wrapperClassName
    }, label, children);
  };

  return AnchorLink;
}(Component);

_defineProperty(AnchorLink, "propTypes", {
  prefixCls: PropTypes.string,
  href: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  isALabel: PropTypes.bool
});

_defineProperty(AnchorLink, "defaultProps", {
  prefixCls: 'new-fc-one-anchor',
  href: '#',
  isALabel: false
});

_defineProperty(AnchorLink, "contextTypes", {
  oneAnchor: PropTypes.object
});

polyfill(AnchorLink);
export default AnchorLink;