/**
 * 文字链
 * @author Chen Xiao
 * @email companyforme@gmail.com
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {transSizeOfDefault} from '../../core/commonTools';

/**
 * TextLink component.
 */

const oldTextLinkToDlsMap = {
    'base-01': 'noraml',
    'base-02': 'noraml',
    'important-01': 'strong',
    'important-02': 'strong',
    'important-03': 'strong',
    'important-04': 'strong'
};

export default class TextLink extends PureComponent {
    static propTypes = {
        /**
         *设置按钮类型，默认为base-01，可选值如下：
         * base-01 普通文字链01
         * base-02 普通文字链02
         * important-01 加强文字链01
         * important-02 加强文字链02
         * important-03 加强文字链03
         * important-04 加强文字链04
         * --- 版本更新 2019-06-05 --- 3.0以上版本对外暴露type不会是xxxx-xx形式了
         * 将根据新的DLS规范，将文字链类型分为
         * 普通文字链、加强文字链
         * type形式更加语义化 分别为 normal、strong两种
         * 默认不传type将定义为normal类型的普通按钮
         * --- end ---
         */
        type: PropTypes.oneOf(['normal', 'strong']),
        /** 文字链的链接打开类型，原a标签html属性，默认'_self'，取值有'_self'、'_blank'、'_parent'、'top' */
        target: PropTypes.string,
        /** 文字链的链接地址 */
        toUrl: PropTypes.string.isRequired,
        /** 文字链的内容节点 */
        children: PropTypes.node,
        /** 用户可自定义class前缀 */
        prefixCls: PropTypes.string,
        /** 用户可自定义class */
        className: PropTypes.string,
        /** 用户可自定义行内样式 */
        style: PropTypes.object,
        /**
         * 文字链尺寸，分为两种，默认为medium, 和small
         */
        size: PropTypes.oneOf(['medium', 'small']),
        /**
         * 禁用
         */
        disabled: PropTypes.bool
    }

    static defaultProps = {
        type: 'noraml',
        target: '_self',
        size: 'medium',
        children: null,
        prefixCls: 'new-fc-one-text-link',
        className: '',
        style: {},
        disabled: false
    }

    onClick = () => {
        const {toUrl, target, disabled} = this.props;
        if (disabled) {
            return;
        }
        window.open(toUrl, target);
    }

    render() {
        const {type, className, prefixCls, children, disabled} = this.props;
        const size = transSizeOfDefault(this.props.size, 'medium');
        const newType = oldTextLinkToDlsMap[type] || type;
        const classes = classNames(prefixCls, className, `${prefixCls}-${size}`, {
            [`${prefixCls}-${newType}`]: newType,
            [`${prefixCls}-disabled`]: disabled
        });
        const textLinkProps = {
            className: classes
        };
        return (
            <span {...textLinkProps} onClick={this.onClick}>
                {children}
            </span>
        );
    }
}
