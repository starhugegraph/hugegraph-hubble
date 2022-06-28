import Modal from './modal';
import confirm from './confirm';
import message from '../message';

Modal.confirm = props => {
    const config = {
        type: 'confirm',
        okCancel: true,
        okType: 'primary',
        okText: '确定',
        cancelText: '取消',
        cancelType: 'normal',
        ...props
    };
    return confirm(config);
};

Modal.alert = props => {
    const config = {
        type: 'alert',
        okCancel: false,
        okType: 'primary',
        okText: '确定',
        buttonPosition: 'center',
        size: 'small',
        ...props
    };
    return confirm(config);
};

Modal.message = message;

export default Modal;
