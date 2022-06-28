function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import Modal from './modal';
import confirm from './confirm';
import message from '../message';

Modal.confirm = function (props) {
  var config = _extends({
    type: 'confirm',
    okCancel: true,
    okType: 'primary',
    okText: '确定',
    cancelText: '取消',
    cancelType: 'normal'
  }, props);

  return confirm(config);
};

Modal.alert = function (props) {
  var config = _extends({
    type: 'alert',
    okCancel: false,
    okType: 'primary',
    okText: '确定',
    buttonPosition: 'center',
    size: 'small'
  }, props);

  return confirm(config);
};

Modal.message = message;
export default Modal;