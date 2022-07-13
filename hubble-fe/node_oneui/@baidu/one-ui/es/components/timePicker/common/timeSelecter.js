function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import classnames from 'classnames';
import { scrollTo } from '../../../core/pickTimeTools';

var TimeSelecter =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TimeSelecter, _Component);

  function TimeSelecter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      active: false
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (value) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          type = _this$props.type;
      onSelect(type, value);
    });

    _defineProperty(_assertThisInitialized(_this), "getOptions", function () {
      var _this$props2 = _this.props,
          options = _this$props2.options,
          selectedIndex = _this$props2.selectedIndex,
          prefixCls = _this$props2.prefixCls;
      return options.map(function (item, index) {
        var _classnames;

        var cls = classnames((_classnames = {}, _classnames[prefixCls + "-select-option-selected"] = selectedIndex === index, _classnames[prefixCls + "-select-option-disabled"] = item.disabled, _classnames));
        var onClick = item.disabled ? undefined : function () {
          _this.onSelect(item.value);
        };
        return React.createElement("li", {
          onClick: onClick,
          className: cls,
          key: index,
          disabled: item.disabled
        }, item.value);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function (e) {
      _this.setState({
        active: true
      });

      _this.props.onMouseEnter(e);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function () {
      _this.setState({
        active: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "saveList", function (node) {
      _this.list = node;
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToSelected", function (duration) {
      // move to selected item
      var select = ReactDom.findDOMNode(_assertThisInitialized(_this));
      var list = ReactDom.findDOMNode(_this.list);

      if (!list) {
        return;
      }

      var index = _this.props.selectedIndex;

      if (index < 0) {
        index = 0;
      }

      var topOption = list.children[index];
      var to = topOption.offsetTop;
      scrollTo(select, to, duration);
    });

    return _this;
  }

  var _proto = TimeSelecter.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // jump to selected option
    this.scrollToSelected(0);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    // smooth scroll to selected option
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      this.scrollToSelected(120);
    }
  };

  _proto.render = function render() {
    var _classnames2;

    var _this$props3 = this.props,
        prefixCls = _this$props3.prefixCls,
        options = _this$props3.options;

    if (options.length === 0) {
      return null;
    }

    var cls = classnames(prefixCls + "-select", (_classnames2 = {}, _classnames2[prefixCls + "-select-active"] = this.state.active, _classnames2));
    return React.createElement("div", {
      className: cls,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave
    }, React.createElement("ul", {
      ref: this.saveList
    }, this.getOptions()));
  };

  return TimeSelecter;
}(Component);

_defineProperty(TimeSelecter, "propTypes", {
  prefixCls: PropTypes.string,
  options: PropTypes.array,
  selectedIndex: PropTypes.number,
  type: PropTypes.string,
  onSelect: PropTypes.func,
  onMouseEnter: PropTypes.func
});

export { TimeSelecter as default };