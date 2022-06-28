import React, {PureComponent, Children, cloneElement} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Row extends PureComponent {
    static propTypes = {
        /** 布局模式， 可选flex */
        type: PropTypes.string,
        /** flex布局模式下，垂直对齐的方式 */
        align: PropTypes.string,
        /** flex布局模式下，水平对齐的方式 */
        justify: PropTypes.string,
        /** 自定义row的类名 */
        className: PropTypes.string,
        /** row的children */
        children: PropTypes.node,
        /** 栅格间隔，类型是数字 */
        gutter: PropTypes.number,
        /** row的样式前缀 */
        prefixCls: PropTypes.string,
        /** 自定义row的样式 */
        style: PropTypes.object
    };

    static defaultProps = {
        gutter: 0
    };

    render() {
        const {type, justify, align, className, gutter, style, children,
            prefixCls = 'new-fc-one-row', ...others} = this.props;
        const classes = classNames({
            [prefixCls]: !type,
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${type}-${justify}`]: type && justify,
            [`${prefixCls}-${type}-${align}`]: type && align
        }, className);
        const rowStyle = gutter > 0
            ? {
                marginLeft: gutter / -2,
                marginRight: gutter / -2,
                ...style
            }
            : style;
        const cols = Children.map(children, col => {
            if (!col) {
                return null;
            }
            if (col.props && gutter > 0) {
                return cloneElement(col, {
                    style: {
                        paddingLeft: gutter / 2,
                        paddingRight: gutter / 2,
                        ...col.props.style
                    }
                });
            }
            return col;
        });
        return <div {...others} className={classes} style={rowStyle}>{cols}</div>;
    }
}
