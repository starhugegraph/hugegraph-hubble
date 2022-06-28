function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { IconChevronDown, IconClose } from '@baidu/one-ui-icon';
import Button from '../button';
import PopSelectTrigger from './common/popSelectTrigger';
import tools from '../../core';
var _tools$select = tools.select,
    saveRef = _tools$select.saveRef,
    toTitle = _tools$select.toTitle,
    UNSELECTABLE_STYLE = _tools$select.UNSELECTABLE_STYLE,
    UNSELECTABLE_ATTRIBUTE = _tools$select.UNSELECTABLE_ATTRIBUTE,
    preventDefaultEvent = _tools$select.preventDefaultEvent;

var SelectPopOver =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(SelectPopOver, _PureComponent);

  function SelectPopOver(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onVisibleChange", function (visible) {
      var onVisibleChange = _this.props.onVisibleChange;

      if (!('visible' in _this.props)) {
        _this.setState({
          visible: visible
        });
      }

      if (onVisibleChange) {
        onVisibleChange(visible);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClickConfirm", function () {
      var onClickConfirm = _this.props.onClickConfirm;

      _this.setState({
        visible: false
      });

      if (onClickConfirm) {
        onClickConfirm();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClickCancel", function () {
      var onClickCancel = _this.props.onClickCancel;

      _this.setState({
        visible: false
      });

      if (onClickCancel) {
        onClickCancel();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getContainerLayer", function (ref) {
      _this.selectPopOver = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "removeSelected", function (selectedKey, e) {
      var _this$props = _this.props,
          onRemoveSelected = _this$props.onRemoveSelected,
          titleCallback = _this$props.titleCallback;
      var type = titleCallback.type;

      if (type !== 'list') {
        return;
      } // Do not trigger Trigger popup


      if (e && e.stopPropagation) {
        e.stopPropagation();
      } // eslint-disable-next-line react/no-access-state-in-setstate


      var value = _this.state.value.filter(function (singleValue) {
        return singleValue !== selectedKey;
      }); // TODO: 此处是否应该在`setValue`生效以后才调用？


      if (onRemoveSelected) {
        onRemoveSelected(selectedKey, value);
      }

      _this.setState({
        value: value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderTopControlNode", function () {
      var _this$props2 = _this.props,
          titleCallback = _this$props2.titleCallback,
          prefixCls = _this$props2.prefixCls;
      var type = titleCallback.type,
          selectorName = titleCallback.selectorName;
      var _this$state = _this.state,
          value = _this$state.value,
          visible = _this$state.visible;
      var className = prefixCls + "-selection__rendered";
      var valueLength = value.length;
      var label = selectorName;
      var opacity = 1;

      if (type === 'list') {
        var multipleNode = null;

        if (!valueLength) {
          if (visible) {
            opacity = 0.4;
          }

          multipleNode = React.createElement("div", {
            key: "value",
            className: prefixCls + "-selection-selected-value",
            title: toTitle(label),
            style: {
              opacity: opacity
            }
          }, label);
        } else {
          var selectedValueNodes = value.map(function (singleValue, index) {
            return React.createElement("li", _extends({
              style: UNSELECTABLE_STYLE
            }, UNSELECTABLE_ATTRIBUTE, {
              onMouseDown: preventDefaultEvent,
              className: prefixCls + "-selection__choice",
              key: singleValue + "-" + index,
              title: toTitle(singleValue)
            }), React.createElement("div", {
              className: prefixCls + "-selection__choice__content"
            }, singleValue), React.createElement("span", {
              onClick: function onClick(event) {
                _this.removeSelected(singleValue, event);
              },
              className: prefixCls + "-selection__choice__remove"
            }, React.createElement(IconClose, null)));
          });
          multipleNode = selectedValueNodes.length ? React.createElement("ul", {
            className: prefixCls + "-search-ul"
          }, selectedValueNodes) : null;
        }

        return React.createElement("div", {
          className: className,
          ref: _this.saveTopCtrlRef
        }, multipleNode);
      }

      if (valueLength) {
        label = valueLength === 1 ? value[0] : value[0] + "\u3001" + value[1] + "\u7B49" + valueLength + "\u4E2A";

        if (type === 'count') {
          label = valueLength === 1 ? value[0] : selectorName + "(" + valueLength + "\u4E2A)";
        }
      }

      if (visible || !valueLength) {
        opacity = 0.4;
      }

      var selectedValue = React.createElement("div", {
        key: "value",
        className: prefixCls + "-selection-selected-value",
        title: toTitle(label),
        style: {
          opacity: opacity
        }
      }, label);
      return React.createElement("div", {
        className: className,
        ref: _this.saveTopCtrlRef
      }, selectedValue);
    });

    _this.saveSelectionRef = saveRef(_assertThisInitialized(_this), 'selectionRef');
    _this.state = {
      visible: !!props.visible,
      value: props.value
    };
    return _this;
  }

  var _proto = SelectPopOver.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var newState = {};
    var _this$props3 = this.props,
        value = _this$props3.value,
        visible = _this$props3.visible;

    if ('visible' in nextProps && visible !== nextProps.visible) {
      newState.visible = nextProps.visible;
    }

    if ('value' in nextProps && value !== nextProps.value) {
      newState.value = nextProps.value;
    }

    this.setState(newState);
  };

  _proto.getErrorMessage = function getErrorMessage() {
    var _this$props4 = this.props,
        maxTagCount = _this$props4.maxTagCount,
        prefixCls = _this$props4.prefixCls,
        errorMessage = _this$props4.errorMessage;

    if (!maxTagCount && !errorMessage) {
      return null;
    }

    if (errorMessage) {
      return React.createElement("div", {
        className: prefixCls + "-selection-text-error"
      }, errorMessage);
    }

    var _this$state2 = this.state,
        value = _this$state2.value,
        open = _this$state2.open;
    var valueLength = value && value.length;

    if (valueLength > maxTagCount && !open) {
      var error = "\u5DF2\u8D85\u8FC7\u6700\u5927\u53EF\u9009\u6570\u91CF" + (valueLength - maxTagCount) + "\u4E2A";
      return React.createElement("div", {
        className: prefixCls + "-selection-text-error"
      }, error);
    }

    return null;
  };

  _proto.renderOverLay = function renderOverLay() {
    var _this$props5 = this.props,
        overlay = _this$props5.overlay,
        prefixCls = _this$props5.prefixCls,
        showConfirmButton = _this$props5.showConfirmButton,
        showCancelButton = _this$props5.showCancelButton;
    var newPrefixCls = prefixCls + "-popover";
    var conatiner = React.createElement("div", {
      className: newPrefixCls + "-inner-container"
    }, React.createElement("div", {
      className: newPrefixCls + "-inner-container-custom"
    }, overlay), React.createElement("div", {
      className: newPrefixCls + "-inner-container-button"
    }, showConfirmButton ? React.createElement(Button, {
      className: newPrefixCls + "-inner-container-button-item",
      type: "primary",
      onClick: this.onClickConfirm
    }, "\u786E\u5B9A") : null, showCancelButton ? React.createElement(Button, {
      className: newPrefixCls + "-inner-container-button-item",
      type: "normal",
      onClick: this.onClickConfirm
    }, "\u53D6\u6D88") : null));
    return conatiner;
  };

  _proto.renderTotalDom = function renderTotalDom() {
    var _classnames;

    var _this$props6 = this.props,
        maxTagCount = _this$props6.maxTagCount,
        prefixCls = _this$props6.prefixCls;
    var value = this.state.value;
    var valueLength = value.length;

    if (!maxTagCount || !valueLength) {
      return null;
    }

    var totalCountCls = classnames(prefixCls + "-selection__total_count", (_classnames = {}, _classnames[prefixCls + "-selection__total_count-error"] = valueLength > maxTagCount, _classnames));
    return React.createElement("span", {
      className: totalCountCls
    }, valueLength, "/", maxTagCount);
  };

  _proto.render = function render() {
    var _classnames2, _classnames3;

    var props = this.props,
        state = this.state;
    var prefixCls = props.prefixCls,
        getPopupContainer = props.getPopupContainer,
        titleCallback = props.titleCallback,
        maxTagCount = props.maxTagCount;
    var visible = state.visible,
        value = state.value;
    var type = titleCallback.type;
    var ctrlNode = this.renderTopControlNode();
    var newPrefixCls = prefixCls + "-popover";
    var containerCls = classnames(newPrefixCls + "-container", (_classnames2 = {}, _classnames2[newPrefixCls + "-container-open"] = visible, _classnames2));
    var sectionCls = classnames(prefixCls + "-selection", (_classnames3 = {}, _classnames3[prefixCls + "-selection--multiple"] = type === 'list', _classnames3[prefixCls + "-selection-error"] = maxTagCount && maxTagCount < value.length, _classnames3));
    return React.createElement(PopSelectTrigger, _extends({}, this.props, {
      prefixCls: newPrefixCls,
      getPopupContainer: getPopupContainer,
      ref: this.getContainerLayer,
      overlay: this.renderOverLay(),
      visible: visible,
      onVisibleChange: this.onVisibleChange,
      trigger: "click"
    }), React.createElement("div", {
      className: containerCls
    }, React.createElement("div", {
      ref: this.saveSelectionRef,
      key: "selection",
      className: sectionCls,
      type: type
    }, ctrlNode, React.createElement("span", _extends({
      key: "arrow",
      className: prefixCls + "-arrow",
      style: UNSELECTABLE_STYLE
    }, UNSELECTABLE_ATTRIBUTE, {
      onClick: this.onArrowClick
    }), React.createElement(IconChevronDown, null)), type === 'list' ? this.renderTotalDom() : null), this.getErrorMessage()));
  };

  return SelectPopOver;
}(PureComponent);

_defineProperty(SelectPopOver, "propTypes", {
  prefixCls: PropTypes.string,
  overlayClassName: PropTypes.string,
  style: PropTypes.object,
  overlayStyle: PropTypes.object,
  visible: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  transitionName: PropTypes.string,
  openClassName: PropTypes.string,
  autoAdjustOverflow: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
    adjustX: PropTypes.oneOf([0, 1]),
    adjustY: PropTypes.oneOf([0, 1])
  })]),
  getPopupContainer: PropTypes.func,
  overlay: PropTypes.node,
  dropdownMatchSelectWidth: PropTypes.bool,
  onClickConfirm: PropTypes.func,
  onClickCancel: PropTypes.func,
  onRemoveSelected: PropTypes.func,
  titleCallback: PropTypes.shape({
    type: PropTypes.string,
    selectorName: PropTypes.string
  }),
  value: PropTypes.array,
  maxTagCount: PropTypes.number,
  errorMessage: PropTypes.string,
  showConfirmButton: PropTypes.bool,
  showCancelButton: PropTypes.bool
});

_defineProperty(SelectPopOver, "defaultProps", {
  prefixCls: 'new-fc-one-select',
  transitionName: 'zoom-big-fast',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  autoAdjustOverflow: true,
  dropdownMatchSelectWidth: true,
  titleCallback: {
    type: 'enum',
    // 三类回填 enum, list, count
    selectorName: '地域选择器'
  },
  value: [],
  showConfirmButton: true,
  showCancelButton: true
});

export { SelectPopOver as default };