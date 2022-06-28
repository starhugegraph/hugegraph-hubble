"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSlick = _interopRequireDefault(require("react-slick"));

var _classnames = _interopRequireDefault(require("classnames"));

var _isInteger = _interopRequireDefault(require("lodash/isInteger"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _oneUiIcon = require("@baidu/one-ui-icon");

var _button = _interopRequireDefault(require("../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var NextArrow = function NextArrow(props) {
  var _classNames;

  var _props$onClick = props.onClick,
      onClick = _props$onClick === void 0 ? function () {} : _props$onClick,
      prefixCls = props.prefixCls,
      showButton = props.showButton,
      _props$buttonProps = props.buttonProps,
      buttonProps = _props$buttonProps === void 0 ? {} : _props$buttonProps;
  var buttonCls = prefixCls + "-slick-change";

  var style = _extends({
    display: 'block'
  }, buttonProps.style || {});

  if (!showButton) {
    style = {
      display: 'none'
    };
  }

  var currentButtonProps = {
    className: (0, _classnames["default"])(buttonCls, buttonCls + "-next", (_classNames = {}, _classNames[buttonProps.className] = !!buttonProps.className, _classNames)),
    type: 'translucent',
    icon: _react["default"].createElement(_oneUiIcon.IconChevronRight, null),
    size: 'medium',
    style: style,
    onClick: onClick,
    disabled: !onClick
  };
  return _react["default"].createElement(_button["default"], currentButtonProps);
};

var PrevArrow = function PrevArrow(props) {
  var _classNames2;

  var _props$onClick2 = props.onClick,
      onClick = _props$onClick2 === void 0 ? function () {} : _props$onClick2,
      prefixCls = props.prefixCls,
      showButton = props.showButton,
      _props$buttonProps2 = props.buttonProps,
      buttonProps = _props$buttonProps2 === void 0 ? {} : _props$buttonProps2;
  var buttonCls = prefixCls + "-slick-change";

  var style = _extends({
    display: 'block'
  }, buttonProps.style || {});

  if (!showButton) {
    style = {
      display: 'none'
    };
  }

  var currentButtonProps = {
    className: (0, _classnames["default"])(buttonCls, buttonCls + "-prev", (_classNames2 = {}, _classNames2[buttonProps.className] = !!buttonProps.className, _classNames2)),
    type: 'translucent',
    icon: _react["default"].createElement(_oneUiIcon.IconAngleLeft, null),
    size: 'medium',
    style: style,
    onClick: onClick,
    disabled: !onClick
  };
  return _react["default"].createElement(_button["default"], currentButtonProps);
};

var Carousel =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Carousel, _PureComponent);

  function Carousel(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onWindowResized", function () {
      var autoplay = _this.props.autoplay;

      if (autoplay && _this.slick && _this.slick.innerSlider && _this.slick.innerSlider.autoPlay) {
        _this.slick.innerSlider.autoPlay();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveSlick", function (node) {
      _this.slick = node;
    });

    _defineProperty(_assertThisInitialized(_this), "getCarouselIsVertical", function () {
      var dotPosition = _this.props.dotPosition;

      if (dotPosition === 'left' || dotPosition === 'right') {
        return true;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "isSingleSlideMode", function () {
      return _this.props.mode === 'single';
    });

    _defineProperty(_assertThisInitialized(_this), "afterChange", function (current) {
      _this.setState({
        current: current
      });

      _this.props.afterChange(current);
    });

    _this.onWindowResized = (0, _debounce["default"])(_this.onWindowResized, 500, {
      leading: false
    });
    _this.state = {
      current: props.initialSlide || 0
    };
    return _this;
  }

  var _proto = Carousel.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var autoplay = this.props.autoplay;

    if (autoplay) {
      window.addEventListener('resize', this.onWindowResized);
    }

    this.innerSlider = this.slick && this.slick.innerSlider;
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var autoplay = this.props.autoplay;

    if (autoplay) {
      window.removeEventListener('resize', this.onWindowResized);
    }
  };

  _proto.next = function next() {
    this.slick.slickNext();
  };

  _proto.prev = function prev() {
    this.slick.slickPrev();
  };

  _proto.goTo = function goTo(slide, dontAnimate) {
    if (dontAnimate === void 0) {
      dontAnimate = false;
    }

    this.slick.slickGoTo(slide, dontAnimate);
  };

  _proto.render = function render() {
    var _classNames3;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        width = _this$props.width,
        infinite = _this$props.infinite,
        slidesToShow = _this$props.slidesToShow,
        effect = _this$props.effect,
        mode = _this$props.mode,
        dotPosition = _this$props.dotPosition,
        sliderMode = _this$props.sliderMode,
        nextArrow = _this$props.nextArrow,
        prevArrow = _this$props.prevArrow,
        className = _this$props.className,
        showButton = _this$props.showButton,
        prevButtonProps = _this$props.prevButtonProps,
        nextButtonProps = _this$props.nextButtonProps,
        afterChange = _this$props.afterChange,
        restProps = _objectWithoutPropertiesLoose(_this$props, ["prefixCls", "width", "infinite", "slidesToShow", "effect", "mode", "dotPosition", "sliderMode", "nextArrow", "prevArrow", "className", "showButton", "prevButtonProps", "nextButtonProps", "afterChange"]);

    var isSlidesToShowIsInteger = (0, _isInteger["default"])(slidesToShow);
    var vertical = this.getCarouselIsVertical();
    var dotsClass = 'slick-dots';
    var isSingleSlide = this.isSingleSlideMode();
    var wrapperPrefixCls = !isSingleSlide ? prefixCls : prefixCls + "-" + mode;
    var showDot = !(sliderMode === 'hide' || sliderMode === 'number');

    if ('customSuffix' in this.props) {
      showDot = false;
    }

    var nextArrowProps = {
      prefixCls: prefixCls,
      showButton: showButton || sliderMode === 'button',
      buttonProps: nextButtonProps
    };
    var prevArrowProps = {
      prefixCls: prefixCls,
      showButton: showButton || sliderMode === 'button',
      buttonProps: prevButtonProps
    };

    var slickCarouselProps = _extends({
      dots: showDot,
      vertical: vertical,
      nextArrow: nextArrow || _react["default"].createElement(NextArrow, nextArrowProps),
      prevArrow: prevArrow || _react["default"].createElement(PrevArrow, prevArrowProps),
      cssEase: 'cubic-bezier(.25, .1, .25, 1)',
      infinite: infinite,
      slidesToShow: isSingleSlide ? 1 : slidesToShow,
      dotsClass: dotsClass + " " + dotsClass + "-" + dotPosition,
      afterChange: this.afterChange
    }, restProps);

    var classes = (0, _classnames["default"])(wrapperPrefixCls, className, (_classNames3 = {}, _classNames3[wrapperPrefixCls + "-vertical"] = vertical, _classNames3[wrapperPrefixCls + "-half-show"] = !isSlidesToShowIsInteger, _classNames3), wrapperPrefixCls + "-slider-" + sliderMode);
    var containerProps = {
      className: classes
    };

    if (width) {
      containerProps.style = {
        width: width
      };
    }

    if (effect === 'fade') {
      slickCarouselProps.fade = true;
    }

    var current = this.state.current;
    var customNode = null;

    if (this.props.customSuffix) {
      customNode = this.props.customSuffix;
    } else if (sliderMode === 'number') {
      customNode = _react["default"].createElement("div", {
        className: prefixCls + "-custom-suffix"
      }, current + 1, "/", (this.props.children || []).length);
    }

    return _react["default"].createElement("div", containerProps, _react["default"].createElement(_reactSlick["default"], _extends({
      ref: this.saveSlick
    }, slickCarouselProps)), !isSlidesToShowIsInteger ? _react["default"].createElement("div", {
      className: prefixCls + "-half-mask"
    }) : null, customNode);
  };

  return Carousel;
}(_react.PureComponent);

exports["default"] = Carousel;

_defineProperty(Carousel, "propTypes", {
  /** 样式前缀 */
  prefixCls: _propTypes["default"].string,

  /** 是否自动播放 */
  autoplay: _propTypes["default"].bool,

  /** 每次滚动几张 */
  slidesToScroll: _propTypes["default"].number,

  /** 宽度 */
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),

  /** 每屏幕展示多少张 */
  slidesToShow: _propTypes["default"].number,

  /** 是否无限循环 */
  infinite: _propTypes["default"].bool,

  /** 是否淡入淡出 - 效果 */
  effect: _propTypes["default"].string,

  /** 切换前的function */
  beforeChange: _propTypes["default"].func,

  /** 切换后的function */
  afterChange: _propTypes["default"].func,

  /**
   * 模式， 多片滚动模式，单片模式，默认多片滚动
   */
  mode: _propTypes["default"].oneOf(['multiple', 'single']),

  /**
   * dotPosition, 面板指示点的位置，如果dotPosition为left, right，表示垂直滚动
   * dotPostion为bottom和top的时候为左右滚动
   */
  dotPosition: _propTypes["default"].oneOf(['top', 'bottom', 'left', 'right']),

  /**
   * sliderMode - 切换的模式，支持两种 滑动条 or 按钮，后续支持点、数字
   */
  sliderMode: _propTypes["default"].oneOf(['line', 'number', 'dot', 'hide', 'button']),
  className: _propTypes["default"].string,
  nextArrow: _propTypes["default"].node,
  prevArrow: _propTypes["default"].node,
  showButton: _propTypes["default"].bool,
  prevButtonProps: _propTypes["default"].object,
  nextButtonProps: _propTypes["default"].object,
  children: _propTypes["default"].node,
  customSuffix: _propTypes["default"].node,
  initialSlide: _propTypes["default"].number
});

_defineProperty(Carousel, "defaultProps", {
  prefixCls: 'new-fc-one-carousel',
  autoplay: false,
  slidesToScroll: 1,
  slidesToShow: 1,
  width: '',
  effect: '',
  infinite: false,
  mode: 'multiple',
  dotPosition: 'bottom',
  sliderMode: 'line',
  className: '',
  showButton: false,
  afterChange: function afterChange() {}
});

NextArrow.propTypes = {
  onClick: _propTypes["default"].func,
  prefixCls: _propTypes["default"].string,
  showButton: _propTypes["default"].bool,
  buttonProps: _propTypes["default"].object,
  disabled: _propTypes["default"].bool
};
PrevArrow.propTypes = {
  onClick: _propTypes["default"].func,
  prefixCls: _propTypes["default"].string,
  showButton: _propTypes["default"].bool,
  buttonProps: _propTypes["default"].object,
  disabled: _propTypes["default"].bool
};
module.exports = exports.default;