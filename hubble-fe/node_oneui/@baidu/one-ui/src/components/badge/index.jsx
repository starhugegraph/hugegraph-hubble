import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import {polyfill} from 'react-lifecycles-compat';

class Badge extends PureComponent {
    static propTypes = {
        /**
         * 类名前缀
         */
        prefixCls: PropTypes.string,
        /**
         * 自定义类名
         */
        className: PropTypes.string,
        /**
         * count 展示的数字
         */
        count: PropTypes.number,
        /**
         * 自定义圆点的颜色
         */
        color: PropTypes.string,
        /**
         * 不展示数字，只展示小圆点
         */
        isDot: PropTypes.bool,
        /**
         * 设置状态点的位置偏移，结构为 [number, number]
         */
        offset: PropTypes.array,
        /**
         * 设置封顶的数字，比如overflowCount为99，当count > 99的时候，显示 99+
         */
        overflowCount: PropTypes.number,
        /**
         * 当count为0的时候，是否还要展示badge
         */
        showZero: PropTypes.bool,
        /**
         * 小圆点的状态值，enum {success, warning, error, process, default}
         */
        type: PropTypes.string,
        /**
         * 设置了type情况下，小圆点旁边展示的文字
         */
        text: PropTypes.string,
        /**
         * 自定义样式
         */
        style: PropTypes.object,
        children: PropTypes.node,
        /**
         * 是否展示badge
         */
        visible: PropTypes.bool,
        /**
         * 自定义内容
         */
        textContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-badge',
        count: null,
        showZero: false,
        isDot: false,
        overflowCount: 99,
        visible: true,
        textContent: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            count: props.count,
            visible: props.visible,
            prevProps: props
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const newState = {
            prevProps: nextProps
        };
        const prevProps = prevState.prevProps;
        if ('visible' in nextProps && nextProps.visible !== prevProps.visible) {
            newState.visible = nextProps.visible;
        }
        if ('count' in nextProps && nextProps.count !== prevProps.count) {
            newState.count = nextProps.count;
        }
        return newState;
    }

    render = () => {
        const {
            showZero,
            prefixCls,
            overflowCount,
            className,
            style,
            children,
            isDot,
            type,
            text,
            offset,
            color,
            textContent,
            ...restProps
        } = this.props;
        const {visible, count} = this.state;
        let displayCount = +count > +overflowCount ? `${overflowCount}+` : count;
        const isZero = displayCount === 0;
        const isDotMode = (isDot && !isZero) || type;
        // 小圆点状态下，不展示数字
        if (isDotMode) {
            displayCount = '';
        }
        const isEmpty = (displayCount === null || displayCount === undefined || displayCount === '') && !textContent;
        const hidden = ((isEmpty || (isZero && !showZero)) && !isDotMode) || !visible;
        const typeCls = classNames({
            [`${prefixCls}-type-dot`]: !!type,
            [`${prefixCls}-type-${type}`]: !!type
        });
        const numberBoxCls = classNames({
            [`${prefixCls}-dot`]: isDotMode,
            [`${prefixCls}-count`]: !isDotMode,
            [`${prefixCls}-type-${type}`]: !!type,
            [`${prefixCls}-hidden`]: hidden
        });
        const badgeCls = classNames(className, prefixCls, {
            [`${prefixCls}-type`]: !!type,
            [`${prefixCls}-not-a-wrapper`]: !children
        });
        let styleWithOffset = offset ? {
            right: -offset[0],
            marginTop: offset[1],
            ...style
        } : style;
        if (color) {
            styleWithOffset = {
                ...styleWithOffset,
                backgroundColor: color
            };
        }
        const divProps = omit(restProps, [
            'visible'
        ]);
        if (!children && type) {
            return (
                <span {...divProps} className={badgeCls} style={styleWithOffset}>
                    <span className={typeCls} />
                    <span className={`${prefixCls}-type-text`}>{text}</span>
                </span>
            );
        }
        let showContent = displayCount;
        // 如果有文字形式，数字形式默认失效
        if (textContent) {
            showContent = textContent;
        }
        return (
            <span {...divProps} className={badgeCls}>
                {children}
                <span className={numberBoxCls} style={styleWithOffset}>
                    {showContent}
                </span>
            </span>
        );
    }
}

polyfill(Badge);

export default Badge;
