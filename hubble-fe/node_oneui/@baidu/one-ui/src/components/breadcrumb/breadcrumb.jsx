import React, {PureComponent, cloneElement} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {IconAngleRight} from '@baidu/one-ui-icon';

export default class Breadcrumb extends PureComponent {
    static propTypes = {
        /**
         * 类名前缀
         */
        prefixCls: PropTypes.string,
        /**
         * 分割符
         */
        separator: PropTypes.node,
        /**
         * 自定义样式className
         */
        className: PropTypes.string,
        /**
         * 自定义样式
         */
        style: PropTypes.object,
        /**
         * children
         */
        children: PropTypes.node,
        size: PropTypes.oneOf(['medium', 'small']),
        type: PropTypes.oneOf(['normal', 'strong'])
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-breadcrumb',
        separator: <IconAngleRight />,
        size: 'medium',
        type: 'normal'
    };

    render() {
        const {
            separator,
            prefixCls,
            style,
            className,
            children,
            size,
            type
        } = this.props;
        const crumbs = React.Children.map(children, (element, index) => {
            if (!element) {
                return element;
            }
            return cloneElement(element, {
                separator,
                key: index
            });
        });
        const breadcrumbCls = classNames(
            prefixCls,
            `${prefixCls}-${size}`,
            className,
            `${prefixCls}-${type}`
        );
        return (
            <div className={breadcrumbCls} style={style}>
                {crumbs}
            </div>
        );
    }
}
