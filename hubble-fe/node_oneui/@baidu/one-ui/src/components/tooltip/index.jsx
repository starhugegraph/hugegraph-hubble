import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CommonTooltip from './common/tooltip';
import getPlacements from './placements';

const splitObject = (obj, keys) => {
    const picked = {};
    const omited = {...obj};
    keys.forEach(key => {
        if (obj && key in obj) {
            picked[key] = obj[key];
            delete omited[key];
        }
    });
    return {picked, omited};
};

export default class Tooltip extends Component {
    static propTypes = {
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** overlay的类名 */
        overlayClassName: PropTypes.string,
        /** 自定义tip样式 */
        overlayStyle: PropTypes.object,
        /** tip的位置 */
        placement: PropTypes.oneOf([
            'top',
            'left',
            'right',
            'bottom',
            'topLeft',
            'topRight',
            'bottomLeft',
            'bottomRight',
            'leftTop',
            'leftBottom',
            'rightTop',
            'rightBottom'
        ]),
        // builtinPlacements: PropTypes.object,
        /** 是否可视 */
        visible: PropTypes.bool,
        /** 弹窗可视变化时候触发的函数 */
        onVisibleChange: PropTypes.func,
        /** 鼠标进入触发函数延时 */
        mouseEnterDelay: PropTypes.number,
        /** 鼠标离开触发函数延时 */
        mouseLeaveDelay: PropTypes.number,
        transitionName: PropTypes.string,
        /** trigger */
        trigger: PropTypes.oneOf([
            'hover',
            'focus',
            'click'
        ]),
        /** 弹窗展开时候触发的类名 */
        openClassName: PropTypes.string,
        arrowPointAtCenter: PropTypes.bool,
        /** 被遮挡时是否自适应 */
        autoAdjustOverflow: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({
                adjustX: PropTypes.oneOf([0, 1]),
                adjustY: PropTypes.oneOf([0, 1])
            })
        ]),
        /** 弹窗挂载函数 */
        getTooltipContainer: PropTypes.func,
        /** 弹窗挂载函数 */
        getPopupContainer: PropTypes.func,
        children: PropTypes.node,
        /** 标题 */
        title: PropTypes.node,
        /** 自定义内嵌, 与title作用，相同推荐使用title */
        overlay: PropTypes.node,
        /** tooltip 有两种类型，normal、reverse两种，noraml为白色背景色，reverse为黑色背景色 */
        type: PropTypes.oneOf(['light', 'dark'])
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-tooltip',
        placement: 'top',
        transitionName: 'zoom-big-fast',
        mouseEnterDelay: 0.1,
        mouseLeaveDelay: 0.1,
        arrowPointAtCenter: false,
        autoAdjustOverflow: true,
        type: 'light'
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: !!props.visible
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('visible' in nextProps) {
            this.setState({visible: nextProps.visible});
        }
    }

    onVisibleChange = visible => {
        const {onVisibleChange} = this.props;
        if (!('visible' in this.props)) {
            this.setState({visible: this.isNoTitle() ? false : visible});
        }
        if (onVisibleChange && !this.isNoTitle()) {
            onVisibleChange(visible);
        }
    };

    // 动态设置动画点
    onPopupAlign = (domNode, align) => {
        const placements = this.getPlacements();
        // 当前返回的位置
        const placement = Object.keys(placements).filter(
            key => (
                placements[key].points[0] === align.points[0]
                && placements[key].points[1] === align.points[1]
            ),
        )[0];
        if (!placement) {
            return;
        }
        // 根据当前坐标设置动画点
        const rect = domNode.getBoundingClientRect();
        const transformOrigin = {
            top: '50%',
            left: '50%'
        };
        if (placement.indexOf('top') >= 0 || placement.indexOf('Bottom') >= 0) {
            transformOrigin.top = `${rect.height - align.offset[1]}px`;
        } else if (placement.indexOf('Top') >= 0 || placement.indexOf('bottom') >= 0) {
            transformOrigin.top = `${-align.offset[1]}px`;
        }
        if (placement.indexOf('left') >= 0 || placement.indexOf('Right') >= 0) {
            transformOrigin.left = `${rect.width - align.offset[0]}px`;
        } else if (placement.indexOf('right') >= 0 || placement.indexOf('Left') >= 0) {
            transformOrigin.left = `${-align.offset[0]}px`;
        }
        if (placement.indexOf('top') >= 0) {
            domNode.style.top = (domNode.style.top.split('px') && `${+domNode.style.top.split('px')[0] + 4}px`) || domNode.style.top;
        } else if (placement.indexOf('bottom') >= 0) {
            domNode.style.top = (domNode.style.top.split('px') && `${+domNode.style.top.split('px')[0] - 4}px`) || domNode.style.top;
        } else if (placement.indexOf('right') >= 0) {
            domNode.style.left = (domNode.style.left.split('px') && `${+domNode.style.left.split('px')[0] - 4}px`) || domNode.style.left;
        } else if (placement.indexOf('left') >= 0) {
            domNode.style.left = (domNode.style.left.split('px') && `${+domNode.style.left.split('px')[0] + 4}px`) || domNode.style.left;
        }
        domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
    };

    getPlacements() {
        const {arrowPointAtCenter, autoAdjustOverflow} = this.props;
        return getPlacements({
            arrowPointAtCenter,
            verticalArrowShift: 8,
            autoAdjustOverflow
        });
    }

    // Fix Tooltip won't hide at disabled button
    getDisabledCompatibleChildren(element) {
        if ((
            element.type === 'button'
            || element.type.name === 'Button' || element.type.displayName === 'Button')
            && element.props.disabled && this.isHoverTrigger()) {
            // Pick some layout related style properties up to span
            const {picked, omited} = splitObject(
                element.props.style,
                ['position', 'left', 'right', 'top', 'bottom', 'float', 'display', 'zIndex'],
            );
            const spanStyle = {
                display: 'inline-block', // default inline-block is important
                ...picked,
                cursor: 'not-allowed'
            };
            const buttonStyle = {
                ...omited,
                pointerEvents: 'none'
            };
            const child = cloneElement(element, {
                style: buttonStyle,
                className: null
            });
            return (
                <span style={spanStyle} className={element.props.className}>
                    {child}
                </span>
            );
        }
        return element;
    }

    isHoverTrigger() {
        const {trigger} = this.props;
        if (!trigger || trigger === 'hover') {
            return true;
        }
        if (Array.isArray(trigger)) {
            return trigger.indexOf('hover') >= 0;
        }
        return false;
    }

    isNoTitle() {
        const {title, overlay} = this.props;
        return !title && !overlay; // overlay for old version compatibility
    }

    getTooltipRef = ref => {
        this.tooltipRef = ref;
    }

    render() {
        const {props, state} = this;
        const {prefixCls, title, overlay, openClassName, getPopupContainer, getTooltipContainer, overlayClassName, type} = props;
        const children = props.children;
        let visible = state.visible;
        // Hide tooltip when there is no title
        if (!('visible' in props) && this.isNoTitle()) {
            visible = false;
        }

        const child = this.getDisabledCompatibleChildren(
            React.isValidElement(children) ? children : <span>{children}</span>,
        );
        const childProps = child.props;
        const childCls = classNames(childProps.className, {
            [openClassName || `${prefixCls}-open`]: true
        });

        const tooltipOverlayClass = classNames(overlayClassName, `${prefixCls}-${type}`);

        return (
            <CommonTooltip
                ref={this.getTooltipRef}
                {...this.props}
                getTooltipContainer={getPopupContainer || getTooltipContainer}
                builtinPlacements={this.getPlacements()}
                overlay={overlay || title || ''}
                visible={visible}
                onVisibleChange={this.onVisibleChange}
                onPopupAlign={this.onPopupAlign}
                overlayClassName={tooltipOverlayClass}
            >
                {visible ? cloneElement(child, {className: childCls}) : child}
            </CommonTooltip>
        );
    }
}
