"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _classnames = _interopRequireDefault(require("classnames"));

var _map = _interopRequireDefault(require("lodash/map"));

var _findIndex = _interopRequireDefault(require("lodash/findIndex"));

var _uploaderAnchor = _interopRequireDefault(require("./common/uploaderAnchor"));

var _uploaderList = _interopRequireDefault(require("./common/uploaderList"));

var _message = _interopRequireDefault(require("../message"));

var _uploaderTools = require("../../core/uploaderTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Uploader =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Uploader, _PureComponent);

  function Uploader(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (e) {
      var files = e.target.files;
      var postFiles = Array.prototype.slice.call(files);
      var tempFiles = [];
      var _this$props = _this.props,
          maxParallelFileNumber = _this$props.maxParallelFileNumber,
          maxFileLength = _this$props.maxFileLength,
          maxFileLengthErrorMessage = _this$props.maxFileLengthErrorMessage;
      var _this$state = _this.state,
          insertImage = _this$state.insertImage,
          insetIndex = _this$state.insetIndex;

      if (maxParallelFileNumber && postFiles.length > maxParallelFileNumber) {
        _message["default"].error({
          content: '超过最大上传个数， 请重新选择...'
        });

        return;
      }

      if (maxFileLength && maxFileLength === _this.state.fileList.length && !insertImage) {
        // 存在限制文件上传的个数，并且不是图片重新上传的情况下，进行报错return
        _message["default"].error({
          content: "" + maxFileLengthErrorMessage
        });

        return;
      }

      postFiles.forEach(function (file, index) {
        tempFiles.push({
          status: _uploaderTools.originStatus.WAITING,
          name: file.name,
          isNewUpload: true,
          originFile: file,
          uid: (0, _uploaderTools.getUid)(index)
        });
      });

      var newFileList = _this._fileList.concat(tempFiles);

      if (insertImage) {
        var _newFileList;

        // 从中间插入
        newFileList = [].concat(_this._fileList);

        (_newFileList = newFileList).splice.apply(_newFileList, [insetIndex, 1].concat(tempFiles));
      }

      var _this$onValidatorFile = _this.onValidatorFiles(newFileList),
          _fileList = _this$onValidatorFile._fileList,
          allFailures = _this$onValidatorFile.allFailures;

      _this._fileList = _fileList;

      if (allFailures) {
        return;
      }

      var newUploadingFiles = _fileList.filter(function (file) {
        return file.status === _uploaderTools.originStatus.WAITING && file.isNewUpload;
      });

      newUploadingFiles.forEach(function (file) {
        _this.upload(file, newUploadingFiles);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "upload", function (file, fileList) {
      if (!_this.props.beforeUpload) {
        return setTimeout(function () {
          return _this.post(file);
        }, 0);
      }

      var before = _this.props.beforeUpload(file, fileList);

      if (before && before.then) {
        before.then(function (processedFile) {
          var processedFileType = Object.prototype.toString.call(processedFile);

          if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
            return _this.post(processedFile);
          }

          return _this.post(file);
        })["catch"](function (e) {
          console && console.log(e); // eslint-disable-line
        });
      } else if (before !== false) {
        setTimeout(function () {
          return _this.post(file);
        }, 0);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "post", function (file) {
      return new Promise(function () {
        var _this$props2 = _this.props,
            uploadResquestUrl = _this$props2.uploadResquestUrl,
            transformFile = _this$props2.transformFile,
            uploader = _this$props2.uploader,
            headers = _this$props2.headers,
            _this$props2$withCred = _this$props2.withCredentials,
            withCredentials = _this$props2$withCred === void 0 ? false : _this$props2$withCred,
            _this$props2$method = _this$props2.method,
            method = _this$props2$method === void 0 ? 'post' : _this$props2$method,
            reqData = _this$props2.reqData;
        var transform = Promise.resolve(transformFile(file));
        transform.then(function (transformedFile) {
          var requestOption = {
            action: uploadResquestUrl,
            filename: file.name,
            reqData: reqData,
            file: transformedFile,
            headers: headers,
            withCredentials: withCredentials,
            method: method || 'post',
            onProgress: function onProgress(e) {
              _this.onProgress(e, file);
            },
            onSuccess: function onSuccess(ret, xhr) {
              _this.onSuccess(ret, file, xhr);
            },
            onError: function onError(err, ret) {
              _this.onError(err, ret, file);
            }
          };
          uploader(requestOption);

          _this.onStart(file);
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getFileIndex", function (file) {
      var uid = file.uid;
      var fileList = [].concat(_this.state.fileList);
      var currentFileIndex = (0, _findIndex["default"])(fileList, function (file) {
        return file.uid === uid;
      });
      return currentFileIndex;
    });

    _defineProperty(_assertThisInitialized(_this), "onProgress", function (e, file) {
      var percent = e.percent;
      var fileList = [].concat(_this.state.fileList);

      var currentFileIndex = _this.getFileIndex(file);

      fileList[currentFileIndex].progressStep = percent - 1;

      _this.props.onChange({
        file: file,
        fileList: fileList
      });

      if (!('fileList' in _this.props)) {
        _this.setState({
          fileList: fileList
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSuccess", function (ret, file) {
      var fileList = [].concat(_this.state.fileList);

      var currentFileIndex = _this.getFileIndex(file);

      fileList[currentFileIndex].status = _uploaderTools.originStatus.SUCCESS;

      _this.props.onChange({
        file: file,
        fileList: fileList,
        response: ret
      });

      if (!('fileList' in _this.props)) {
        _this.setState({
          fileList: fileList
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onError", function (err, ret, file) {
      var fileList = [].concat(_this.state.fileList);

      var currentFileIndex = _this.getFileIndex(file);

      fileList[currentFileIndex].status = _uploaderTools.originStatus.ERROR;
      fileList[currentFileIndex].errorMessage = [_uploaderTools.UPLOAD_STATUS_MAP.UPLOAD_ERROR.error.msg];

      _this.props.onChange({
        file: file,
        fileList: fileList,
        err: err,
        response: ret
      });

      if (!('fileList' in _this.props)) {
        _this.setState({
          fileList: fileList
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onStart", function (file) {
      var fileList = [].concat(_this.state.fileList);

      var currentFileIndex = _this.getFileIndex(file);

      fileList[currentFileIndex].status = _uploaderTools.originStatus.UPLOADING;
      fileList[currentFileIndex].progressStep = 0;

      _this.props.onChange({
        file: file,
        fileList: fileList
      });

      if (!('fileList' in _this.props)) {
        _this.setState({
          fileList: fileList
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onValidatorFiles", function (files) {
      var _fileList = [].concat(files);

      var allFailures = true;

      _fileList.forEach(function (file, index) {
        if (file.status === _uploaderTools.originStatus.WAITING && file.isNewUpload) {
          var errors = _this.onValidatorSingleFile(file.originFile);

          var hasError = errors.length;
          _fileList[index] = _extends({}, _fileList[index], {
            status: hasError ? _uploaderTools.originStatus.ERROR : _uploaderTools.originStatus.WAITING
          });

          if (hasError) {
            _fileList[index].errorMessage = errors;
          } else {
            _fileList[index].progressStep = 0;
          }

          _this.props.onChange({
            fileList: _fileList,
            file: _fileList[index].originFile
          });

          if (!hasError) {
            allFailures = false;
          }
        }
      });

      if (!('fileList' in _this.props)) {
        _this.setState({
          fileList: _fileList
        });
      }

      return {
        allFailures: allFailures,
        _fileList: _fileList
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onValidatorSingleFile", function (file) {
      var errorMessages = [];
      var _this$props3 = _this.props,
          accept = _this$props3.accept,
          maxSize = _this$props3.maxSize,
          validator = _this$props3.validator;
      (0, _map["default"])(_uploaderTools.checkFileRules, function (checkFileRule) {
        if (checkFileRule.match({
          file: file,
          options: {
            accept: accept,
            maxSize: maxSize
          }
        })) {
          errorMessages.push(checkFileRule.error.error.msg);
        }
      });

      if (validator && validator(file)) {
        errorMessages.push(validator(file));
      }

      return errorMessages;
    });

    _defineProperty(_assertThisInitialized(_this), "onRemove", function (_ref) {
      var fileList = _ref.fileList,
          index = _ref.index;

      if (!('fileList' in _this.props)) {
        _this.setState({
          fileList: fileList
        });
      }

      _this._fileList = [].concat(fileList);

      _this.props.onRemove({
        fileList: fileList,
        index: index
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onInsertImage", function (insertImage, index) {
      _this.setState({
        insertImage: insertImage,
        insetIndex: index
      });

      _this.uploaderAnchorRef.uploadInputRef.value = '';

      _this.uploaderAnchorRef.uploadInputRef.click();
    });

    _defineProperty(_assertThisInitialized(_this), "onClickAnchor", function () {
      _this.setState({
        insertImage: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "uploadAnchorRef", function (ref) {
      _this.uploaderAnchorRef = ref;
    });

    var _fileList2 = props.fileList || props.defaultFileList || [];

    _this.state = {
      fileList: _fileList2,
      insertImage: false,
      insetIndex: 0
    };
    _this._fileList = _fileList2;
    return _this;
  }

  var _proto = Uploader.prototype;

  _proto.render = function render() {
    var _this$props4 = this.props,
        prefixCls = _this$props4.prefixCls,
        className = _this$props4.className,
        listType = _this$props4.listType,
        onPreview = _this$props4.onPreview,
        onReUpload = _this$props4.onReUpload;
    var fileList = this.state.fileList;
    var uploadClassNames = (0, _classnames["default"])(prefixCls, prefixCls + "-image", className);

    if (listType === 'image') {
      return _react["default"].createElement("div", {
        className: uploadClassNames
      }, _react["default"].createElement(_uploaderList["default"], _extends({}, this.props, {
        fileList: fileList,
        onRemove: this.onRemove,
        onPreview: onPreview,
        onReUpload: onReUpload,
        onInsertImage: this.onInsertImage
      })), _react["default"].createElement(_uploaderAnchor["default"], _extends({}, this.props, {
        ref: this.uploadAnchorRef,
        onChange: this.onInputChange,
        onClickAnchor: this.onClickAnchor
      })));
    }

    return _react["default"].createElement("div", {
      className: uploadClassNames
    }, _react["default"].createElement(_uploaderAnchor["default"], _extends({}, this.props, {
      onChange: this.onInputChange,
      ref: this.uploadAnchorRef
    })), _react["default"].createElement(_uploaderList["default"], _extends({}, this.props, {
      fileList: fileList,
      onRemove: this.onRemove
    })));
  };

  return Uploader;
}(_react.PureComponent);

_defineProperty(Uploader, "propTypes", {
  /**
   * 接收的参数
   */
  accept: _propTypes["default"].array,

  /**
   * 上传文件的校验器
   */
  validator: _propTypes["default"].func,

  /**
   * 上传前的钩子，return Promise
   */
  beforeUpload: _propTypes["default"].func,

  /**
   * 上传的url
   */
  uploadResquestUrl: _propTypes["default"].string,

  /**
   * 文件列表的list - 受控属性
   */
  fileList: _propTypes["default"].arrayOf(Object),

  /**
   * 文件列表的list - 非受控属性
   */
  defaultFileList: _propTypes["default"].arrayOf(Object),

  /**
   * 禁用
   */
  disabled: _propTypes["default"].bool,

  /**
   * 请求的headers
   */
  headers: _propTypes["default"].object,

  /**
   * 列表的样式类型
   */
  listType: _propTypes["default"].oneOf(['file', 'image']),

  /**
   * upload请求的延时
   */
  timeout: _propTypes["default"].number,

  /**
   * 是否支持多选
   */
  multiple: _propTypes["default"].bool,

  /**
   * 图片类型中，展示的icon
   */
  showUploadListIcon: _propTypes["default"].object,

  /**
   * 图片类型中可自定义操作icon
   */
  customUploadIcon: _propTypes["default"].node,

  /**
   * 点击预览的回调
   */
  onPreview: _propTypes["default"].func,

  /**
   * 点击删除的回调
   */
  onRemove: _propTypes["default"].func,

  /**
   * 点击重新上传的回调
   */
  onReUpload: _propTypes["default"].func,

  /**
   * 自定义className
   */
  className: _propTypes["default"].string,
  prefixCls: _propTypes["default"].string,

  /**
   * 上传文件的最大尺寸
   */
  maxSize: _propTypes["default"].number,

  /**
   * 最大可并行上传的文件个数
   */
  maxParallelFileNumber: _propTypes["default"].number,

  /**
   * 自定义上传的锚点
   */
  CustomUploadAnchor: _propTypes["default"].node,

  /**
   * 上传input的name
   */
  inputControlName: _propTypes["default"].string,

  /**
   * loading
   */
  loading: _propTypes["default"].bool,

  /**
   * helper text位置 right or bottom
   */
  helperTextPostion: _propTypes["default"].oneOf(['right', 'bottom']),

  /**
   * 状态改变时候的回调
   */
  onChange: _propTypes["default"].func,

  /**
   * 自定义上传方法
   */
  uploader: _propTypes["default"].func,

  /**
   * 将origin的File转成所需要的file
   */
  transformFile: _propTypes["default"].func,

  /**
   * 上传请求时是否携带 cookie
   */
  withCredentials: _propTypes["default"].bool,

  /**
   * 请求的方式，默认是post
   */
  method: _propTypes["default"].string,

  /**
   * 请求额外的data
   */
  reqData: _propTypes["default"].object,

  /**
   * listType为image的时候，可以自己定义操作
   */
  customUploadListIcon: _propTypes["default"].node,
  maxFileLength: _propTypes["default"].number,
  maxFileLengthErrorMessage: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node])
});

_defineProperty(Uploader, "defaultProps", {
  accept: ['*'],
  disabled: false,
  listType: 'file',
  timeout: 3000,
  multiple: false,
  showUploadListIcon: {
    showPreviewIcon: true,
    showReUploadIcon: true,
    showRemoveOnIcon: true
  },
  className: '',
  prefixCls: 'new-fc-one-uploader',
  inputControlName: 'file',
  headers: {},
  loading: false,
  helperTextPostion: 'right',
  onRemove: function onRemove() {},
  onChange: function onChange() {},
  transformFile: function transformFile(originFile) {
    return originFile;
  },
  uploader: _uploaderTools.fileUploader,
  maxFileLengthErrorMessage: '已超出文件最大上传个数，请删除后重新上传'
});

_defineProperty(Uploader, "getDerivedStateFromProps", function (nextProps, prevState) {
  if ('fileList' in nextProps && nextProps.fileList !== prevState.fileList) {
    return {
      fileList: nextProps.fileList
    };
  }

  return null;
});

(0, _reactLifecyclesCompat.polyfill)(Uploader);
var _default = Uploader;
exports["default"] = _default;
module.exports = exports.default;