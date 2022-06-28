"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _partial = _interopRequireDefault(require("lodash/partial"));

var _classnames = _interopRequireDefault(require("classnames"));

var _oneUiIcon = require("@baidu/one-ui-icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AlertPage =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(AlertPage, _PureComponent);

  function AlertPage(_props) {
    var _this;

    _this = _PureComponent.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "onClose", function (closeFunc, index, e) {
      // 全局的
      _this.props.onClose(index); // 每一个alert自身的onClose


      closeFunc(e);

      if (!('dataSource' in _this.props)) {
        // 移除
        var dataSource = _this.state.dataSource;
        dataSource.splice(index, 1);

        _this.setState({
          dataSource: [].concat(dataSource)
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getItems", function () {
      var dataSource = [].concat(_this.state.dataSource);
      var children = dataSource.map(function (child, index) {
        if (!child) {
          return null;
        }

        var prefixCls = _this.props.prefixCls;
        var key = child.key || String(index);

        var props = _extends({
          key: key
        }, child.props, {
          onClose: (0, _partial["default"])(_this.onClose, child.props.onClose, index),
          visible: true
        });

        return _react["default"].createElement("span", {
          className: prefixCls + "-slick-item",
          key: key
        }, _react["default"].cloneElement(child, props));
      });
      return children;
    });

    _defineProperty(_assertThisInitialized(_this), "saveRef", function (ref) {
      _this.alertPageRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "prevChange", function () {
      var current = _this.state.slider;

      if (current === 0) {
        return;
      }

      var prevSlider = current - 1;

      if (!('slider' in _this.props)) {
        _this.setState({
          slider: prevSlider
        });
      }

      _this.props.onPrevChange(prevSlider);
    });

    _defineProperty(_assertThisInitialized(_this), "nextChange", function (childrenLength) {
      var current = _this.state.slider;

      if (current === childrenLength - 1) {
        return;
      }

      var nextSlider = current + 1;

      if (!('slider' in _this.props)) {
        _this.setState({
          slider: nextSlider
        });
      }

      _this.props.onNextChange(nextSlider);
    });

    var _dataSource = _props.dataSource,
        defaultDataSource = _props.defaultDataSource,
        slider = _props.slider,
        initialSlide = _props.initialSlide;
    _this.state = {
      dataSource: _dataSource || defaultDataSource || [],
      slider: slider || initialSlide
    };
    return _this;
  }

  AlertPage.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var newState = {};

    if ('dataSource' in nextProps) {
      newState.dataSource = [].concat(nextProps.dataSource);
    }

    if ('slider' in nextProps && nextProps.slider !== prevState.slider) {
      newState.slider = nextProps.slider;
    }

    return newState;
  };

  var _proto = AlertPage.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        className = _this$props.className,
        style = _this$props.style,
        size = _this$props.size;
    var _this$state = this.state,
        dataSource = _this$state.dataSource,
        slider = _this$state.slider;

    if (!dataSource.length) {
      return null;
    }

    var children = this.getItems();
    var alertClassNames = (0, _classnames["default"])(prefixCls, className, prefixCls + "-" + size, (_classNames = {}, _classNames[prefixCls + "-first-page"] = slider === 0, _classNames[prefixCls + "-last-page"] = slider === children.length - 1, _classNames));
    return _react["default"].createElement("div", {
      ref: this.saveRef,
      className: alertClassNames,
      style: style
    }, children[slider], _react["default"].createElement("div", {
      className: prefixCls + "-count"
    }, _react["default"].createElement(_oneUiIcon.IconAngleLeft, {
      onClick: this.prevChange
    }), _react["default"].createElement("span", null, slider + 1, "/", children.length), _react["default"].createElement(_oneUiIcon.IconAngleRight, {
      onClick: (0, _partial["default"])(this.nextChange, children.length)
    })));
  };

  return AlertPage;
}(_react.PureComponent);

_defineProperty(AlertPage, "propTypes", {
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  dataSource: _propTypes["default"].arrayOf(_propTypes["default"].node),
  defaultDataSource: _propTypes["default"].arrayOf(_propTypes["default"].node),
  onClose: _propTypes["default"].func,
  initialSlide: _propTypes["default"].number,
  slider: _propTypes["default"].number,
  size: _propTypes["default"].oneOf(['small', 'medium']),
  onPrevChange: _propTypes["default"].func,
  onNextChange: _propTypes["default"].func
});

_defineProperty(AlertPage, "defaultProps", {
  prefixCls: 'new-fc-one-alert-page',
  className: '',
  style: {},
  onClose: function onClose() {},
  initialSlide: 0,
  size: 'medium',
  onPrevChange: function onPrevChange() {},
  onNextChange: function onNextChange() {}
});

(0, _reactLifecyclesCompat.polyfill)(AlertPage);
var _default = AlertPage;
exports["default"] = _default;
module.exports = exports.default;