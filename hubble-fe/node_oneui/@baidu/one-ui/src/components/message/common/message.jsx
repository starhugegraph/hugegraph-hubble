import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from 'component-classes';
import Icon from '../../icon';

const minHeightMap = {
    small: 32,
    medium: 36
};

const IconInfo = {
    info: <Icon type="info" />,
    warning: <Icon type="warning" />,
    success: <Icon type="success" />,
    error: <Icon type="fail" />,
    loading: <Icon type="loading" />
};

export default class Message extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string,
        type: PropTypes.string,
        title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        size: PropTypes.string,
        instance: PropTypes.object,
        target: PropTypes.number,
        content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        showCloseIcon: PropTypes.bool
    }

    componentDidMount = () => {
        const {size, prefixCls} = this.props;
        const height = this.messageRef.offsetHeight;
        const minHeight = minHeightMap[size];
        if (height > minHeight) {
            const dom = classes(this.messageRef);
            dom.add(`${prefixCls}-multiple-line`);
        }
    }

    saveRef = ref => {
        this.messageRef = ref;
    }

    render = () => {
        const {prefixCls, type, title, size, instance, target, content, showCloseIcon} = this.props;
        const wrapClass = classNames(
            {
                [`${prefixCls}-${type}`]: type,
                [`${prefixCls}-header`]: !!title,
                [`${prefixCls}-widthout-header`]: !title
            },
            `${prefixCls}-custom-content`,
            `${prefixCls}-${size}`
        );
        const removeNotice = () => {
            if (instance) {
                instance.removeNotice(target);
            }
        };
        const iconNode = IconInfo[type];
        return (
            <div className={wrapClass} ref={this.saveRef}>
                {
                    showCloseIcon && (
                        <span className={`${prefixCls}-close-icon`}>
                            <Icon type="close" onClick={removeNotice}/>
                        </span>
                    )
                }
                {iconNode}
                <div className={`${prefixCls}-container`}>
                    {
                        title ? (<div className={`${prefixCls}-container-header`}>{title}</div>) : null
                    }
                    {
                        content ? (<div className={`${prefixCls}-container-content`}>{content}</div>) : null
                    }
                </div>
            </div>
        );
    }
}
