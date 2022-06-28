import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {IconLoading} from '@baidu/one-ui-icon';

export default class Loading extends PureComponent {

    static propTypes = {
        /** 是否为loading状态 */
        loading: PropTypes.bool,
        /** 设置loading图标大小，可选值为 small large 或者不设 */
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 自定义类名 */
        className: PropTypes.string,
        /** loading时的文案 */
        tip: PropTypes.string,
        children: PropTypes.node,
        style: PropTypes.object,
        type: PropTypes.string,
        /** loading文案的方向 */
        textDirection: PropTypes.oneOf(['horizontal', 'vertical']),
        /** 自定义icon Node */
        CustomIconNode: PropTypes.node
    }

    static defaultProps = {
        loading: true,
        prefixCls: 'new-fc-one-loading',
        className: '',
        size: 'medium',
        style: {},
        tip: '',
        type: 'normal',
        textDirection: 'horizontal',
        CustomIconNode: null
    }

    isNestedPattern() {
        return !!(this.props && this.props.children);
    }

    render() {
        const {
            prefixCls, className, size, loading, style,
            tip, type, children, textDirection, CustomIconNode
        } = this.props;
        const classes = classNames(prefixCls, {
            [`${prefixCls}-${size}`]: size,
            [`${prefixCls}-visible`]: loading,
            [`${prefixCls}-show-text`]: !!tip,
            [`${prefixCls}-type-${type}`]: type
        }, `${prefixCls}-${textDirection}`, className);
        const loadingElement = (
            <div className={classes} style={style}>
                <div className={`${prefixCls}-icon-element`}>
                    {CustomIconNode || <IconLoading className={`${prefixCls}-loading-icon`} />}
                    {tip ? <span className={`${prefixCls}-text`}>{tip}</span> : null}
                </div>
            </div>
        );
        if (this.isNestedPattern()) {
            const containerClassName = classNames(`${prefixCls}-container`, {
                [`${prefixCls}-blur`]: loading
            });
            return (
                <div className={classNames(`${prefixCls}-nested-loading`)}>
                    {loading && <div>{loadingElement}</div>}
                    <div className={containerClassName}>
                        {children}
                    </div>
                </div>
            );
        }
        return loadingElement;
    }
}
