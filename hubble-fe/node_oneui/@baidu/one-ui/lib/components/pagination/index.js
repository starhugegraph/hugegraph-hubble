"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _oneUiIcon = require("@baidu/one-ui-icon");

var _select = _interopRequireDefault(require("../select"));

var _commonTools = require("../../core/commonTools");

var _button = _interopRequireDefault(require("../button"));

var _input = _interopRequireDefault(require("../input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SelectOption = _select["default"].Option;

var isInteger = function isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

var calculatePage = function calculatePage(pageSize, total) {
  return Math.floor((total - 1) / pageSize) + 1;
};

var Pagination =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Pagination, _PureComponent);

  function Pagination(_props) {
    var _this;

    _this = _PureComponent.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "getPaginationContainer", function (ref) {
      _this.paginationNode = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getOptionByList", function () {
      var pageSizeOptions = _this.props.pageSizeOptions;
      var options = [];
      pageSizeOptions.forEach(function (option) {
        options.push({
          value: option,
          label: option
        });
      });
      return options;
    });

    _defineProperty(_assertThisInitialized(_this), "isValidPage", function (page) {
      return isInteger(page) && page >= 1 && page !== _this.state.pageNo;
    });

    _defineProperty(_assertThisInitialized(_this), "handlePageSizeChange", function (pageSize) {
      var size = +pageSize;
      var newPage = calculatePage(size, _this.state.total);
      var newState = {};

      if (!('pageSize' in _this.props)) {
        newState.pageSize = size;
      }

      if (!('pageNo' in _this.props)) {
        // 统一为页码更改，非受控情况下，页码跳转回第一页
        newState.pageNo = 1;
      }

      newState.lastPage = newPage;

      _this.setState(newState);

      _this.props.onPageSizeChange({
        target: {
          value: size
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (p) {
      var page = p;
      var _this$state = _this.state,
          pageSize = _this$state.pageSize,
          total = _this$state.total;

      if (_this.isValidPage(page)) {
        var lastPage = calculatePage(pageSize, total);

        if (page > lastPage) {
          page = lastPage;
        }

        if (!('pageNo' in _this.props)) {
          _this.setState({
            pageNo: page
          });
        }

        _this.props.onPageNoChange({
          target: {
            value: page
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleItemPageChange", function (e) {
      var dataset = e && e.currentTarget && e.currentTarget.dataset;
      var key = dataset && dataset.key;

      if (key) {
        _this.handleChange(+key);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "goToPrevPage", function () {
      var pageNo = _this.state.pageNo;

      if (pageNo > 1) {
        if (!('pageNo' in _this.props)) {
          _this.setState({
            pageNo: pageNo - 1
          });
        }

        _this.handleChange(pageNo - 1);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "goToNextPage", function () {
      var _this$state2 = _this.state,
          pageNo = _this$state2.pageNo,
          lastPage = _this$state2.lastPage;

      if (lastPage > pageNo) {
        if (!('pageNo' in _this.props)) {
          _this.setState({
            pageNo: pageNo + 1
          });
        }

        _this.handleChange(pageNo + 1);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "jumpToPrevPage", function () {
      var pageNo = _this.state.pageNo;
      var range = 5;
      var newPage = pageNo - range > 1 ? pageNo - range : 1;

      if (!('pageNo' in _this.props)) {
        _this.setState({
          pageNo: newPage
        });
      }

      _this.handleChange(newPage);
    });

    _defineProperty(_assertThisInitialized(_this), "jumpToNextPage", function () {
      var _this$state3 = _this.state,
          pageNo = _this$state3.pageNo,
          pageSize = _this$state3.pageSize,
          total = _this$state3.total;
      var range = 5;
      var lastPage = calculatePage(pageSize, total);
      var newPage = pageNo + range > lastPage ? lastPage : pageNo + range;

      if (!('pageNo' in _this.props)) {
        _this.setState({
          pageNo: newPage
        });
      }

      _this.handleChange(newPage);
    });

    _defineProperty(_assertThisInitialized(_this), "generateItemRender", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props,
          state = _assertThisInitialize.state;

      var prefixCls = props.prefixCls,
          size = props.size;
      var lastPage = state.lastPage,
          pageNo = state.pageNo;
      var pageBufferSize = 2;
      var itemList = [];
      var hasPrevDot = false;
      var hasNextDot = false;
      var buttonProps = {
        onClick: _this.handleItemPageChange,
        size: size
      };

      if (lastPage < 7) {
        for (var i = 1; i <= lastPage; i++) {
          var _classNames;

          var itemProps = _extends({
            className: (0, _classnames["default"])(prefixCls + "-pager-item", (_classNames = {}, _classNames[prefixCls + "-pager-item-active"] = i === +pageNo, _classNames)),
            'data-key': i,
            key: i
          }, buttonProps);

          itemList.push(_react["default"].createElement(_button["default"], itemProps, i));
        }

        return itemList;
      }

      var left = Math.max(1, pageNo - pageBufferSize);
      var right = Math.min(pageNo + pageBufferSize, lastPage);

      if (pageNo - 1 <= pageBufferSize) {
        right = 1 + pageBufferSize * 2;
      }

      if (lastPage - pageNo <= pageBufferSize) {
        left = lastPage - pageBufferSize * 2;
      }

      for (var _i = left; _i <= right; _i++) {
        var _classNames2;

        var _itemProps = _extends({
          className: (0, _classnames["default"])(prefixCls + "-pager-item", (_classNames2 = {}, _classNames2[prefixCls + "-pager-item-active"] = _i === +pageNo, _classNames2)),
          'data-key': _i,
          key: _i
        }, buttonProps);

        itemList.push(_react["default"].createElement(_button["default"], _itemProps, _i));
      }

      if (pageNo - 1 >= pageBufferSize * 2 && pageNo !== 1 + pageBufferSize) {
        itemList.unshift(_react["default"].createElement("span", {
          className: prefixCls + "-pager-item " + prefixCls + "-pager-item-dot " + prefixCls + "-pager-item-dot-prev",
          key: "jump-prev",
          onClick: _this.jumpToPrevPage
        }, "..."));
        hasPrevDot = true;
      }

      if (lastPage - pageNo >= pageBufferSize * 2 && pageNo !== lastPage - 2) {
        itemList.push(_react["default"].createElement("span", {
          className: prefixCls + "-pager-item " + prefixCls + "-pager-item-dot " + prefixCls + "-pager-item-dot-next",
          key: "jump-next",
          onClick: _this.jumpToNextPage
        }, "..."));
        hasNextDot = true;
      }

      if (hasPrevDot && hasNextDot) {
        delete itemList[1];
        delete itemList[itemList.length - 2];
      }

      if (left !== 1) {
        itemList.unshift(_react["default"].createElement(_button["default"], _extends({
          className: prefixCls + "-pager-item",
          "data-key": 1,
          key: 1
        }, buttonProps), "1"));
      }

      if (right !== lastPage) {
        itemList.push(_react["default"].createElement(_button["default"], _extends({
          className: prefixCls + "-pager-item",
          "data-key": lastPage,
          key: lastPage
        }, buttonProps), lastPage));
      }

      return itemList;
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeInput", function (e) {
      var value = e.value;

      _this.setState({
        searchValue: value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onJumpToPager", function (value) {
      var _this$state4 = _this.state,
          pageSize = _this$state4.pageSize,
          total = _this$state4.total;

      if (!isInteger(value)) {
        return;
      }

      var lastPage = calculatePage(pageSize, total);
      var jumpToPage = value;

      if (jumpToPage > lastPage) {
        jumpToPage = lastPage;
      }

      if (jumpToPage <= 0) {
        jumpToPage = 1;
      }

      var newState = {
        searchValue: ''
      };

      if (!('pageNo' in _this.props)) {
        newState.pageNo = jumpToPage;
      }

      _this.setState(newState);

      _this.props.onPageNoChange({
        target: {
          value: jumpToPage
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onInputKeyDown", function (e) {
      var value = +e.value;

      _this.onJumpToPager(value);
    });

    _defineProperty(_assertThisInitialized(_this), "onInputKeyConfirm", function () {
      _this.onJumpToPager(+_this.state.searchValue);
    });

    var _pageSize = _props.pageSize || _props.defaultPageSize;

    var _total = _props.total;
    _this.state = {
      pageSize: _pageSize,
      pageNo: _props.pageNo || _props.defaultPageNo,
      total: _total,
      lastPage: calculatePage(_pageSize, _total),
      searchValue: ''
    };
    return _this;
  }

  var _proto = Pagination.prototype;

  _proto.render = function render() {
    var _classNames3;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        selectPrefixCls = _this$props.selectPrefixCls,
        hideOnSinglePage = _this$props.hideOnSinglePage,
        showSizeChange = _this$props.showSizeChange,
        className = _this$props.className,
        showPageJumper = _this$props.showPageJumper,
        selectWidth = _this$props.selectWidth,
        selectProps = _this$props.selectProps;
    var _this$state5 = this.state,
        pageNo = _this$state5.pageNo,
        pageSize = _this$state5.pageSize,
        lastPage = _this$state5.lastPage,
        searchValue = _this$state5.searchValue;
    var size = (0, _commonTools.transSizeOfDefault)(this.props.size, 'small');
    var paginationProps = {
      className: (0, _classnames["default"])("" + prefixCls, className, (_classNames3 = {}, _classNames3[prefixCls + "-" + size] = size, _classNames3))
    };

    var paginationSelectProps = _extends({}, selectProps, {
      width: selectWidth,
      onChange: this.handlePageSizeChange,
      value: "" + pageSize,
      size: size
    });

    var itemList = this.generateItemRender();
    var itemLength = itemList.length;

    if (itemLength < 2 && hideOnSinglePage) {
      // 只有一页的时候隐藏分页器
      return null;
    }

    var options = this.getOptionByList();
    return _react["default"].createElement("div", paginationProps, showSizeChange && itemLength ? _react["default"].createElement("div", {
      className: prefixCls + "-select"
    }, _react["default"].createElement("span", {
      className: prefixCls + "-select-title"
    }, "\u6BCF\u9875\u663E\u793A"), _react["default"].createElement("span", {
      className: selectPrefixCls + "-container " + prefixCls + "-select-menu",
      ref: this.getPaginationContainer
    }, _react["default"].createElement(_select["default"], paginationSelectProps, options.map(function (option) {
      return _react["default"].createElement(SelectOption, {
        key: option.value
      }, option.label);
    })))) : null, _react["default"].createElement("div", {
      className: prefixCls + "-pager"
    }, _react["default"].createElement("span", {
      className: prefixCls + "-pager-list"
    }, _react["default"].createElement(_button["default"], {
      className: prefixCls + "-pager-item " + prefixCls + "-pager-item-jumper",
      size: size,
      disabled: pageNo <= 1,
      onClick: this.goToPrevPage
    }, _react["default"].createElement(_oneUiIcon.IconAngleLeft, null)), itemList.map(function (item) {
      return item;
    }), _react["default"].createElement(_button["default"], {
      className: prefixCls + "-pager-item " + prefixCls + "-pager-item-jumper",
      size: size,
      disabled: pageNo >= lastPage,
      onClick: this.goToNextPage
    }, _react["default"].createElement(_oneUiIcon.IconAngleRight, null))), showPageJumper && _react["default"].createElement("div", {
      className: prefixCls + "-jumper"
    }, _react["default"].createElement("span", {
      className: prefixCls + "-jumper-title"
    }, "\u53BB\u7B2C"), _react["default"].createElement(_input["default"], {
      width: 40,
      className: prefixCls + "-input",
      size: size,
      value: searchValue,
      onChange: this.onChangeInput,
      onPressEnter: this.onInputKeyDown
    }), _react["default"].createElement("span", {
      className: prefixCls + "-jumper-title"
    }, "\u9875"), _react["default"].createElement(_button["default"], {
      className: prefixCls + "-jumper-confirm",
      onClick: this.onInputKeyConfirm,
      size: size
    }, "\u786E\u5B9A"))));
  };

  return Pagination;
}(_react.PureComponent);

_defineProperty(Pagination, "propTypes", {
  /**
   * 当前总数
   */
  total: _propTypes["default"].number,

  /**
   * 当前页数
   */
  pageNo: _propTypes["default"].number,

  /**
   * 当前页码
   */
  pageSize: _propTypes["default"].number,

  /**
   * 默认的pageNo
   */
  defaultPageNo: _propTypes["default"].number,

  /**
   * 默认的pageSize
   */
  defaultPageSize: _propTypes["default"].number,

  /**
   * 页数change的时候触发的函数， 传出e
   */
  onPageNoChange: _propTypes["default"].func,

  /**
   * 是否隐藏分页器，如果只有一页的情况
   */
  hideOnSinglePage: _propTypes["default"].bool,

  /**
   * 是否展示分页器，页码下拉选择
   */
  showSizeChange: _propTypes["default"].bool,

  /**
   * 页码选项
   */
  pageSizeOptions: _propTypes["default"].arrayOf(_propTypes["default"].string),

  /**
   * 页码改变的时候触发的函数, 传出e
   */
  onPageSizeChange: _propTypes["default"].func,

  /**
   * 分页器尺寸 small, medium, large
   */
  size: _propTypes["default"].oneOf(['xsmall', 'small', 'medium']),

  /**
   * 分页器传入的类名
   */
  className: _propTypes["default"].string,

  /**
   * 类名前缀
   */
  prefixCls: _propTypes["default"].string,

  /**
   * 页码下拉选择器类名前缀
   */
  selectPrefixCls: _propTypes["default"].string,

  /**
   * 是否展示跳页器
   */
  showPageJumper: _propTypes["default"].bool,
  selectWidth: _propTypes["default"].number,

  /**
   * pagination的select的props
   */
  selectProps: _propTypes["default"].object
});

_defineProperty(Pagination, "defaultProps", {
  prefixCls: 'new-fc-one-pagination',
  selectPrefixCls: 'new-fc-one-select',
  pageSizeOptions: ['20', '50', '100'],
  total: 0,
  defaultPageSize: 20,
  defaultPageNo: 1,
  size: 'small',
  className: '',
  onPageNoChange: function onPageNoChange() {},
  onPageSizeChange: function onPageSizeChange() {},
  hideOnSinglePage: false,
  showSizeChange: true,
  showPageJumper: true,
  selectWidth: 64,
  selectProps: {}
});

_defineProperty(Pagination, "getDerivedStateFromProps", function (nextProps, prevState) {
  var newState = {};

  if ('pageNo' in nextProps && nextProps.pageNo !== prevState.pageNo) {
    newState.pageNo = nextProps.pageNo;
  }

  if ('pageSize' in nextProps && nextProps.pageSize !== prevState.pageSize) {
    var pageSize = nextProps.pageSize;
    var newPage = calculatePage(pageSize, prevState.total);

    if (!('pageNo' in nextProps)) {
      // 统一为页码更改，非受控情况下，页码跳转回第一页 (pageSize受控，pageNo不受控)
      newState.pageNo = 1;
    }

    newState.lastPage = newPage;
    newState.pageSize = pageSize;
  }

  if ('total' in nextProps && nextProps.total !== prevState.total) {
    var total = nextProps.total;
    var _pageSize2 = prevState.pageSize;

    var _newPage = calculatePage(_pageSize2, total);

    if (!('pageNo' in nextProps)) {
      newState.pageNo = 1;
    }

    newState.lastPage = _newPage;
    newState.total = total;
  }

  return newState;
});

(0, _reactLifecyclesCompat.polyfill)(Pagination);
var _default = Pagination;
exports["default"] = _default;
module.exports = exports.default;