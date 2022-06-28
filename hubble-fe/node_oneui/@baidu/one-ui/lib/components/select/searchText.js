"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SearchText =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(SearchText, _PureComponent);

  function SearchText(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "formatTextWithColor", function (text, searchValue) {
      var pivolIndex = text.indexOf(searchValue);
      var prefixCls = _this.props.prefixCls;

      if (pivolIndex < 0) {
        return _react["default"].createElement("span", null, text);
      }

      var textArray = _lodash["default"].flattenDeep(text.split(searchValue).map(function (node, index) {
        return index === 0 ? [_react["default"].createElement("span", {
          key: index
        }, node)] : [_react["default"].createElement("span", {
          key: index + "-highlight",
          className: prefixCls + "-search-text-highlight"
        }, searchValue), _react["default"].createElement("span", {
          key: index
        }, node)];
      }));

      var strDom = _react["default"].createElement("span", null, textArray.map(function (node) {
        return node;
      }));

      return strDom;
    });

    _this.state = {
      searchValue: props.searchValue || ''
    };
    return _this;
  }

  var _proto = SearchText.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var searchValue = nextProps.searchValue;
    var currentSearchValue = this.state.searchValue;

    if (searchValue !== currentSearchValue) {
      this.setState({
        searchValue: searchValue
      });
    }
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        text = _this$props.text,
        showSearch = _this$props.showSearch,
        className = _this$props.className,
        prefixCls = _this$props.prefixCls,
        disabled = _this$props.disabled;
    var searchValue = this.state.searchValue;
    var searchTextClassName = (0, _classnames["default"])((_classNames = {}, _classNames[prefixCls + "-search-text-disabled"] = disabled, _classNames), className);

    if (!showSearch || !searchValue) {
      return _react["default"].createElement("span", {
        className: className
      }, text);
    }

    return _react["default"].createElement("span", {
      className: searchTextClassName
    }, this.formatTextWithColor(text, searchValue));
  };

  return SearchText;
}(_react.PureComponent);

exports["default"] = SearchText;

_defineProperty(SearchText, "propTypes", {
  text: _propTypes["default"].string,
  showSearch: _propTypes["default"].bool,
  searchValue: _propTypes["default"].string,
  className: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  prefixCls: _propTypes["default"].string
});

_defineProperty(SearchText, "defaultProps", {
  className: '',
  disabled: false,
  prefixCls: 'new-fc-one-select'
});

module.exports = exports.default;