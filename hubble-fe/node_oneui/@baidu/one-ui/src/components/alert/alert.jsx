import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {polyfill} from 'react-lifecycles-compat';
import classes from 'component-classes';
import {
    IconClose,
    IconCheckCircle,
    IconExclamationCircle,
    IconTimesCircle,
    IconInfoCircle
} from '@baidu/one-ui-icon';

import Icon from '../icon';

const defaultHeight = 32;

class Alert extends PureComponent {
    static propTypes = {
        type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
        title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        closable: PropTypes.bool,
        onClose: PropTypes.func,
        visible: PropTypes.bool,
        showIcon: PropTypes.bool,
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        size: PropTypes.oneOf(['small', 'medium'])
    }

    static defaultProps = {
        onClose() {},
        prefixCls: 'new-fc-one-alert',
        className: '',
        style: {},
        type: 'info',
        size: 'medium'
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible || true
        };
    }

    componentDidMount = () => {
        this.setDomClassByHeight();
    }

    componentDidUpdate = () => {
        this.setDomClassByHeight();
    }

    setDomClassByHeight = () => {
        const alertContentRef = this.alertContentRef;
        const alertRef = this.alertRef;
        if (!alertContentRef || !alertRef) {
            return null;
        }
        const height = alertContentRef.offsetHeight;
        const multipleClassName = `${this.props.prefixCls}-multiple`;
        const singleClassName = `${this.props.prefixCls}-single`;
        const dom = classes(alertRef);
        if (height > defaultHeight) {
            dom.remove(singleClassName);
            dom.add(multipleClassName);
        } else if (dom.has(multipleClassName)) {
            dom.remove(multipleClassName);
            dom.add(singleClassName);
        }
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if ('visible' in nextProps && nextProps.visible !== prevState.visible) {
            return {visible: nextProps.visible};
        }
        return null;
    }

    onHandleClose = e => {
        e.preventDefault();
        if (!('visble' in this.props)) {
            this.setState({
                visible: false
            });
        }
        const onClose = this.props.onClose;
        if (onClose) {
            onClose(e);
        }
    }

    saveRef = type => ref => {
        this[type] = ref;
    }

    render() {
        const {className, prefixCls, style, showIcon, icon, type, content, closable, title, size} = this.props;
        const visible = this.state.visible;
        if (!visible) {
            return null;
        }
        let iconNode = null;
        if (!icon) {
            switch (type) {
                case 'success':
                    iconNode = <IconCheckCircle />;
                    break;
                case 'info':
                    iconNode = <IconInfoCircle />;
                    break;
                case 'error':
                    iconNode = <IconTimesCircle />;
                    break;
                case 'warning':
                    iconNode = <IconExclamationCircle />;
                    break;
                default:
                    iconNode = null;
            }
        } else if (typeof icon === 'string') {
            iconNode = <Icon type={icon} />;
        } else if (React.isValidElement(icon)) {
            iconNode = icon;
        }
        const alertCls = classNames(
            prefixCls,
            `${prefixCls}-${type}`,
            `${prefixCls}-${size}`,
            {
                [`${prefixCls}-no-title`]: !title,
                [`${prefixCls}-with-title`]: !!title,
                [`${prefixCls}-show-icon`]: showIcon,
                [`${prefixCls}-has-close-icon`]: closable
            },
            className,
        );
        const closeIcon = closable ? (
            <span onClick={this.onHandleClose} className={`${prefixCls}-close-icon`}>
                <IconClose />
            </span>
        ) : null;
        return (
            <div className={alertCls} style={style} ref={this.saveRef('alertRef')}>
                {
                    showIcon
                        ? <span className={`${prefixCls}-icon`}>{iconNode}</span>
                        : null
                }
                <div>
                    {
                        title ? <div className={`${prefixCls}-title`}>{title}</div> : null
                    }
                    <div className={`${prefixCls}-content`} ref={this.saveRef('alertContentRef')}>{content}</div>
                </div>
                {closeIcon}
            </div>
        );
    }
}

polyfill(Alert);

export default Alert;
