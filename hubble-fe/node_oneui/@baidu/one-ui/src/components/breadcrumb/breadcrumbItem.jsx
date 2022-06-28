import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {IconAngleRight} from '@baidu/one-ui-icon';

export default class BreadcrumbItem extends PureComponent {
    static propTypes = {
        /**
         * 类名前缀
         */
        prefixCls: PropTypes.string,
        /**
         * 分隔符
         */
        separator: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
        ]),
        /**
         * 跳转链接, 作用于a标签上
         */
        href: PropTypes.string,
        /**
         * breadcrumb的children
         */
        children: PropTypes.node,
        /**
         * 点击crumbItem的回调函数
         */
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-breadcrumb',
        separator: <IconAngleRight />,
        onClick() {},
        disabled: false
    };

    render() {
        const {prefixCls, separator, children, onClick, disabled, ...restProps} = this.props;
        let link;
        const linkClassName = classNames({
            [`${prefixCls}-link-disabled`]: disabled,
            [`${prefixCls}-link`]: !disabled
        });
        const linkProps = {
            className: linkClassName,
            ...restProps
        };
        if ('href' in this.props) {
            if (disabled) {
                /* eslint-disable no-script-url */
                linkProps.href = 'javascript:void(0)';
            }
            link = <a {...linkProps}>{children}</a>;
        } else {
            link = <span {...linkProps}>{children}</span>;
        }
        if (children) {
            return (
                <span onClick={onClick}>
                    {link}
                    <span className={`${prefixCls}-separator`}>{separator}</span>
                </span>
            );
        }
        return null;
    }
}
