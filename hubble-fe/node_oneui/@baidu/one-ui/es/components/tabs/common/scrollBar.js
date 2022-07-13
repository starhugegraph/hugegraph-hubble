function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { IconPlus, IconAngleRight, IconAngleLeft } from '@baidu/one-ui-icon';
import ResizeObserver from 'resize-observer-polyfill';
import Button from '../../button';
import { isTransform3dSupported, setTransform } from '../../../core/tabsTools';

var LineNode =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(LineNode, _PureComponent);

  function LineNode() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      showPrevIcon: false,
      showNextIcon: false
    });

    _defineProperty(_assertThisInitialized(_this), "offset", 0);

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
      var nextPrev = _this.setNextAndPrevShow();

      if (_this.isNextAndPrevIconShow(_this.state) !== _this.isNextAndPrevIconShow(nextPrev)) {
        _this.setState({}, _this.scrollToActiveTab);
      } else if (!prevProps || _this.props.activeKey !== prevProps.activeKey) {
        // can not use props.activeKey
        _this.scrollToActiveTab();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      if (_this.resizeObserver) {
        _this.resizeObserver.disconnect();
      }

      if (_this.debouncedResize && _this.debouncedResize.cancel) {
        _this.debouncedResize.cancel();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isNextAndPrevIconShow", function (state) {
      if (state) {
        return state.showPrevIcon || state.showNextIcon;
      }

      return _this.state.showPrevIcon || _this.state.showNextIcon;
    });

    _defineProperty(_assertThisInitialized(_this), "setNextAndPrevShow", function () {
      // showPrevIcon 和 showNextIcon状态
      var navNode = _this.scrollNav;
      var navTabsContainerNode = _this.navTabsContainer;
      var currentNode = navTabsContainerNode || navNode;
      var scrollWidth = currentNode.scrollWidth;
      var containerWdith = _this.navContainer.offsetWidth + 1;
      var navWrapWidth = _this.navWrapper.offsetWidth;
      var minOffset = containerWdith - scrollWidth;
      var _this$state = _this.state,
          showNextIcon = _this$state.showNextIcon,
          showPrevIcon = _this$state.showPrevIcon;
      var offset = _this.offset;

      if (minOffset >= 0) {
        showNextIcon = false;

        _this.setOffset(0, false);

        offset = 0;
      } else if (minOffset < offset) {
        showNextIcon = true;
      } else {
        showNextIcon = false;
        var realOffset = navWrapWidth - scrollWidth;

        _this.setOffset(realOffset, false);

        offset = realOffset;
      }

      if (offset < 0) {
        showPrevIcon = true;
      } else {
        showPrevIcon = false;
      }

      _this.setNext(showNextIcon);

      _this.setPrev(showPrevIcon);

      return {
        showNextIcon: showNextIcon,
        showPrevIcon: showPrevIcon
      };
    });

    _defineProperty(_assertThisInitialized(_this), "setPrev", function (value) {
      if (_this.state.showPrevIcon !== value) {
        _this.setState({
          showPrevIcon: value
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setNext", function (value) {
      if (_this.state.showNextIcon !== value) {
        _this.setState({
          showNextIcon: value
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setOffset", function (offset, checkNextPrev) {
      if (checkNextPrev === void 0) {
        checkNextPrev = true;
      }

      var target = Math.min(0, offset);

      if (target !== _this.offset) {
        _this.offset = target;
        var navOffset = {};
        var navStyle = _this.scrollNav.style;
        var transformSupported = isTransform3dSupported(navStyle);

        if (transformSupported) {
          navOffset = {
            value: "translate3d(" + target + "px,0,0)"
          };
          setTransform(navStyle, navOffset.value);
        } else {
          navOffset = {
            name: 'left',
            value: target + "px"
          };
          navStyle[navOffset.name] = navOffset.value;
        }

        if (checkNextPrev) {
          _this.setNextAndPrevShow();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getRef", function (name, ref) {
      _this[name] = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "renderPrevIcon", function () {
      var _classNames;

      var _this$props = _this.props,
          type = _this$props.type,
          prefixCls = _this$props.prefixCls;
      var showPrevIcon = _this.state.showPrevIcon;
      var prevIconClassName = classNames(prefixCls + "-nav-prev", (_classNames = {}, _classNames[prefixCls + "-nav-prev-disabled"] = !showPrevIcon, _classNames));
      var prevProps = {
        className: prevIconClassName,
        onClick: !showPrevIcon ? function () {} : _this.prev
      };

      if (type === 'line') {
        return React.createElement("span", prevProps, React.createElement(IconAngleLeft, null));
      }

      return React.createElement(Button, _extends({}, prevProps, {
        disabled: !showPrevIcon
      }), React.createElement(IconAngleLeft, null));
    });

    _defineProperty(_assertThisInitialized(_this), "renderNextIcon", function () {
      var _classNames2;

      var _this$props2 = _this.props,
          type = _this$props2.type,
          prefixCls = _this$props2.prefixCls;
      var showNextIcon = _this.state.showNextIcon;
      var nextIconClassName = classNames(prefixCls + "-nav-next", (_classNames2 = {}, _classNames2[prefixCls + "-nav-next-disabled"] = !showNextIcon, _classNames2));
      var nextProps = {
        className: nextIconClassName,
        onClick: !showNextIcon ? function () {} : _this.next
      };

      if (type === 'line') {
        return React.createElement("span", nextProps, React.createElement(IconAngleRight, null));
      }

      return React.createElement(Button, _extends({}, nextProps, {
        disabled: !showNextIcon
      }), React.createElement(IconAngleRight, null));
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToActiveTab", function (e) {
      var navWrapper = _this.navWrapper;
      var activeTab = _this.activeTab;

      if (e && e.target !== e.currentTarget || !activeTab) {
        return;
      }

      var needToSroll = _this.isNextAndPrevIconShow(); // this.lastNextPrevShown = this.isNextAndPrevIconShow();


      if (!needToSroll) {
        return;
      }

      var activeTabScrollWidth = activeTab.scrollWidth;
      var navWrapNodeWidth = navWrapper.offsetWidth;
      var wrapOffset = navWrapper.getBoundingClientRect().left;
      var activeTabOffset = activeTab.getBoundingClientRect().left;
      var offset = _this.offset;

      if (wrapOffset > activeTabOffset) {
        offset += wrapOffset - activeTabOffset;

        _this.setOffset(offset);
      } else if (wrapOffset + navWrapNodeWidth < activeTabOffset + activeTabScrollWidth) {
        offset -= activeTabOffset + activeTabScrollWidth - (wrapOffset + navWrapNodeWidth);

        _this.setOffset(offset);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "prev", function (e) {
      _this.props.onPrevClick(e);

      var navWrapNode = _this.navWrapper;
      var navWrapNodeWidth = navWrapNode.offsetWidth;

      _this.setOffset(_this.offset + navWrapNodeWidth);
    });

    _defineProperty(_assertThisInitialized(_this), "next", function (e) {
      _this.props.onNextClick(e);

      var navWrapNode = _this.navWrapper;
      var navWrapNodeWidth = navWrapNode.offsetWidth;

      _this.setOffset(_this.offset - navWrapNodeWidth);
    });

    return _this;
  }

  var _proto = LineNode.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.setNextAndPrevShow();
    this.scrollToActiveTab();
    this.debouncedResize = debounce(function () {
      _this2.setNextAndPrevShow();

      _this2.scrollToActiveTab();
    }, 200);
    this.resizeObserver = new ResizeObserver(this.debouncedResize);
    this.resizeObserver.observe(this.navContainer);
  };

  _proto.render = function render() {
    var _classNames3,
        _classNames4,
        _this3 = this;

    var _this$props3 = this.props,
        prefixCls = _this$props3.prefixCls,
        content = _this$props3.content,
        showAdd = _this$props3.showAdd,
        type = _this$props3.type,
        onAdd = _this$props3.onAdd,
        activeKey = _this$props3.activeKey,
        showAddDisabled = _this$props3.showAddDisabled,
        addButtonText = _this$props3.addButtonText;
    var addClassName = classNames(prefixCls + "-bar-add", prefixCls + "-bar-add-" + type, (_classNames3 = {}, _classNames3[prefixCls + "-bar-add-disabled"] = showAddDisabled, _classNames3));
    var showIcon = this.isNextAndPrevIconShow();
    var containerClassName = classNames(prefixCls + "-bar", (_classNames4 = {}, _classNames4[prefixCls + "-bar-show-add"] = showAdd, _classNames4[prefixCls + "-bar-pagination-show"] = showIcon, _classNames4));
    return React.createElement("div", {
      className: containerClassName
    }, React.createElement("div", {
      className: prefixCls + "-nav-container",
      ref: function ref(_ref5) {
        return _this3.getRef('navContainer', _ref5);
      }
    }, showIcon ? this.renderPrevIcon() : null, showIcon ? this.renderNextIcon() : null, React.createElement("div", {
      className: prefixCls + "-nav-wrap",
      ref: function ref(_ref4) {
        return _this3.getRef('navWrapper', _ref4);
      }
    }, React.createElement("div", {
      className: prefixCls + "-nav-scroll",
      ref: function ref(_ref3) {
        return _this3.getRef('scrollBarContainer', _ref3);
      }
    }, React.createElement("div", {
      className: prefixCls + "-nav",
      ref: function ref(_ref2) {
        return _this3.getRef('scrollNav', _ref2);
      }
    }, React.createElement("div", {
      ref: function ref(_ref) {
        return _this3.getRef('navTabsContainer', _ref);
      }
    }, content.map(function (item) {
      var _classNames5;

      var key = item.key;
      var isActive = activeKey === key;
      var paneClassName = classNames(prefixCls + "-tab-item", (_classNames5 = {}, _classNames5[prefixCls + "-tab-item-is-active"] = isActive, _classNames5[prefixCls + "-tab-item-is-inactive"] = !isActive, _classNames5));
      var itemProps = {
        className: paneClassName,
        key: key
      };

      if (isActive) {
        itemProps.ref = function (ref) {
          return _this3.getRef('activeTab', ref);
        };
      }

      return React.createElement("span", itemProps, item);
    })))))), showAdd ? React.createElement(Button, {
      className: addClassName,
      type: type === 'line' ? 'link' : 'normal',
      onClick: onAdd,
      disabled: showAddDisabled
    }, React.createElement(IconPlus, null), type === 'line' ? React.createElement("span", null, addButtonText) : null) : null);
  };

  return LineNode;
}(PureComponent);

_defineProperty(LineNode, "propTypes", {
  content: PropTypes.node.isRequired,
  prefixCls: PropTypes.string.isRequired,
  showAdd: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  activeKey: PropTypes.string.isRequired,
  onNextClick: PropTypes.func,
  onPrevClick: PropTypes.func,
  showAddDisabled: PropTypes.bool,
  addButtonText: PropTypes.string.isRequired
});

_defineProperty(LineNode, "defaultProps", {
  onNextClick: function onNextClick() {},
  onPrevClick: function onPrevClick() {}
});

export { LineNode as default };