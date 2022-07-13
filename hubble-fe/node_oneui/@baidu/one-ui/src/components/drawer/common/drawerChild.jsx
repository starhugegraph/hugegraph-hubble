import classnames from 'classnames';
import getScrollBarSize from 'rc-util/lib/getScrollBarSize';
import KeyCode from 'rc-util/lib/KeyCode';
import switchScrollingEffect from 'rc-util/lib/switchScrollingEffect';
import React from 'react';
import {polyfill} from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import {
    addEventListener,
    dataToArray,
    getTouchParentScroll,
    isNumeric,
    removeEventListener,
    transformArguments,
    transitionEnd,
    transitionStr,
    windowIsUndefined
} from '../../../core/drawerTools';

const currentDrawer = {};

class DrawerChild extends React.Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        open: PropTypes.bool,
        defaultOpen: PropTypes.bool,
        handler: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
        placement: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
        level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        duration: PropTypes.string,
        ease: PropTypes.string,
        showMask: PropTypes.bool,
        maskClosable: PropTypes.bool,
        maskStyle: PropTypes.object,
        drawerStyle: PropTypes.object,
        onChange: PropTypes.func,
        afterVisibleChange: PropTypes.func,
        onHandleClick: PropTypes.func,
        onClose: PropTypes.func,
        keyboard: PropTypes.bool,
        getContainer: PropTypes.func,
        getOpenCount: PropTypes.func,
        levelMove: PropTypes.func,
        className: PropTypes.string,
        children: PropTypes.node,
        style: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            _self: this
        };
    }

    static getDerivedStateFromProps = (props, {prevProps, _self}) => {
        const nextState = {
            prevProps: props
        };
        if (prevProps !== undefined) {
            const {placement, level} = props;
            if (placement !== prevProps.placement) {
                // test 的 bug, 有动画过场，删除 dom
                _self.contentDom = null;
            }
            if (level !== prevProps.level) {
                _self.getLevelDom(props);
            }
        }
        return nextState;
    }

    componentDidMount() {
        if (!windowIsUndefined) {
            let passiveSupported = false;
            window.addEventListener(
                'test',
                () => { },
                Object.defineProperty({}, 'passive', {
                    get: () => {
                        passiveSupported = true;
                        return null;
                    }
                }),
            );
            this.passive = passiveSupported ? {passive: false} : false;
        }
        const open = this.props.open;
        this.drawerId = `drawer_id_${
            Number(
                (Date.now() + Math.random()).toString().replace('.', Math.round(Math.random() * 9).toString()),
            ).toString(16)
        }`;
        this.getLevelDom(this.props);
        if (open) {
            currentDrawer[this.drawerId] = open;
            // 默认打开状态时推出 level;
            this.openLevelTransition();
            this.forceUpdate(() => {
                this.domFocus();
            });
        }
    }

    componentDidUpdate(prevProps) {
        const open = this.props.open;
        if (open !== prevProps.open) {
            if (open) {
                this.domFocus();
            }
            currentDrawer[this.drawerId] = !!open;
            this.openLevelTransition();
        }
    }

    componentWillUnmount() {
        const {getOpenCount, open} = this.props;
        delete currentDrawer[this.drawerId];
        if (open) {
            this.setLevelTransform(false);
            document.body.style.touchAction = '';
        }
        if (typeof getOpenCount === 'function' && !getOpenCount()) {
            document.body.style.overflow = '';
        }
    }

    domFocus = () => {
        if (this.dom) {
            this.dom.focus();
        }
    }

    removeStartHandler = e => {
        if (e.touches.length > 1) {
            return;
        }
        this.startPos = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    }

    removeMoveHandler = e => {
        if (e.changedTouches.length > 1) {
            return;
        }
        const currentTarget = e.currentTarget;
        const differX = e.changedTouches[0].clientX - this.startPos.x;
        const differY = e.changedTouches[0].clientY - this.startPos.y;
        if (
            currentTarget === this.maskDom
            || currentTarget === this.handlerDom
            || (currentTarget === this.contentDom && getTouchParentScroll(
                currentTarget, e.target, differX, differY)
            )
        ) {
            e.preventDefault();
        }
    }

    transitionEnd = e => {
        const dom = e.target;
        removeEventListener(dom, transitionEnd, this.transitionEnd);
        dom.style.transition = '';
    }

    onKeyDown = e => {
        if (e.keyCode === KeyCode.ESC) {
            const onClose = this.props.onClose;
            e.stopPropagation();
            if (onClose) {
                onClose(e);
            }
        }
    }

    onWrapperTransitionEnd = e => {
        const {open, afterVisibleChange} = this.props;
        if (e.target === this.contentWrapper && e.propertyName.match(/transform$/)) {
            this.dom.style.transition = '';
            if (!open && this.getCurrentDrawerSome()) {
                document.body.style.overflowX = '';
                if (this.maskDom) {
                    this.maskDom.style.left = '';
                    this.maskDom.style.width = '';
                }
            }
            if (afterVisibleChange) {
                afterVisibleChange(!!open);
            }
        }
    }

    openLevelTransition = () => {
        const {open, width, height} = this.props;
        const {isHorizontal, placementName} = this.getHorizontalBoolAndPlacementName();
        const contentValue = this.contentDom
            ? this.contentDom.getBoundingClientRect()[isHorizontal ? 'width' : 'height']
            : 0;
        const value = (isHorizontal ? width : height) || contentValue;
        this.setLevelAndScrolling(open, placementName, value);
    }

    setLevelTransform = (
        open,
        placementName,
        value,
        right,
    ) => {
        const {placement, levelMove, duration, ease, showMask} = this.props;
        // router 切换时可能会导至页面失去滚动条，所以需要时时获取。
        this.levelDom.forEach(dom => {
            dom.style.transition = `transform ${duration} ${ease}`;
            addEventListener(dom, transitionEnd, this.transitionEnd);
            let levelValue = open ? value : 0;
            if (levelMove) {
                const $levelMove = transformArguments(levelMove, {target: dom, open});
                levelValue = open ? $levelMove[0] : $levelMove[1] || 0;
            }
            const $value = typeof levelValue === 'number' ? `${levelValue}px` : levelValue;
            let placementPos = placement === 'left' || placement === 'top' ? $value : `-${$value}`;
            placementPos = showMask && placement === 'right' && right
                ? `calc(${placementPos} + ${right}px)` : placementPos;
            dom.style.transform = levelValue ? `${placementName}(${placementPos})` : '';
        });
    }

    setLevelAndScrolling = (
        open,
        placementName,
        value
    ) => {
        const onChange = this.props.onChange;
        if (!windowIsUndefined) {
            const right = document.body.scrollHeight > (
                window.innerHeight || document.documentElement.clientHeight
            ) && window.innerWidth > document.body.offsetWidth ? getScrollBarSize(true) : 0;
            this.setLevelTransform(open, placementName, value, right);
            this.toggleScrollingToDrawerAndBody(right);
        }
        if (onChange) {
            onChange(open);
        }
    }

    toggleScrollingToDrawerAndBody = right => {
        const {getOpenCount, getContainer, showMask, open} = this.props;
        const container = getContainer && getContainer();
        const openCount = getOpenCount && getOpenCount();
        // 处理 body 滚动
        if (container && container.parentNode === document.body && showMask) {
            const eventArray = ['touchstart'];
            const domArray = [document.body, this.maskDom, this.handlerDom, this.contentDom];
            if (open && document.body.style.overflow !== 'hidden') {
                if (right) {
                    this.addScrollingEffect(right);
                }
                if (openCount === 1) {
                    document.body.style.overflow = 'hidden';
                }
                document.body.style.touchAction = 'none';
                // 手机禁滚
                domArray.forEach((item, i) => {
                    if (!item) {
                        return;
                    }
                    addEventListener(
                        item,
                        eventArray[i] || 'touchmove',
                        i ? this.removeMoveHandler : this.removeStartHandler,
                        this.passive,
                    );
                });
            } else if (this.getCurrentDrawerSome()) {
            // 没有弹框的状态下清除 overflow;
                if (!openCount) {
                    document.body.style.overflow = '';
                }
                document.body.style.touchAction = '';
                if (right) {
                    this.remScrollingEffect(right);
                }
                // 恢复事件
                domArray.forEach((item, i) => {
                    if (!item) {
                        return;
                    }
                    removeEventListener(
                        item,
                        eventArray[i] || 'touchmove',
                        i ? this.removeMoveHandler : this.removeStartHandler,
                        this.passive,
                    );
                });
            }
        }
    }

    addScrollingEffect = right => {
        const {placement, duration, ease, getOpenCount} = this.props;
        const openCount = getOpenCount && getOpenCount();
        if (openCount === 1) {
            switchScrollingEffect();
        }
        const widthTransition = `width ${duration} ${ease}`;
        const transformTransition = `transform ${duration} ${ease}`;
        this.dom.style.transition = 'none';
        switch (placement) {
            case 'right':
                this.dom.style.transform = `translateX(-${right}px)`;
                break;
            case 'top':
            case 'bottom':
                this.dom.style.width = `calc(100% - ${right}px)`;
                this.dom.style.transform = 'translateZ(0)';
                break;
            default:
                break;
        }
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            if (this.dom) {
                this.dom.style.transition = `${transformTransition},${widthTransition}`;
                this.dom.style.width = '';
                this.dom.style.transform = '';
            }
        });
    }

    remScrollingEffect = right => {
        const {placement, duration, ease, getOpenCount} = this.props;
        const openCount = getOpenCount && getOpenCount();
        if (!openCount) {
            switchScrollingEffect(true);
        }
        if (transitionStr) {
            document.body.style.overflowX = 'hidden';
        }
        this.dom.style.transition = 'none';
        let heightTransition;
        let widthTransition = `width ${duration} ${ease}`;
        const transformTransition = `transform ${duration} ${ease}`;
        switch (placement) {
            case 'left': {
                this.dom.style.width = '100%';
                widthTransition = `width 0s ${ease} ${duration}`;
                break;
            }
            case 'right': {
                this.dom.style.transform = `translateX(${right}px)`;
                this.dom.style.width = '100%';
                widthTransition = `width 0s ${ease} ${duration}`;
                if (this.maskDom) {
                    this.maskDom.style.left = `-${right}px`;
                    this.maskDom.style.width = `calc(100% + ${right}px)`;
                }
                break;
            }
            case 'top':
            case 'bottom': {
                this.dom.style.width = `calc(100% + ${right}px)`;
                this.dom.style.height = '100%';
                this.dom.style.transform = 'translateZ(0)';
                heightTransition = `height 0s ${ease} ${duration}`;
                break;
            }
            default:
                break;
        }
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            if (this.dom) {
                this.dom.style.transition = `${transformTransition},${
                    heightTransition ? `${heightTransition},` : ''
                }${widthTransition}`;
                this.dom.style.transform = '';
                this.dom.style.width = '';
                this.dom.style.height = '';
            }
        });
    }

    getCurrentDrawerSome = () => !Object.keys(currentDrawer).some(key => currentDrawer[key]);

    getLevelDom = ({level, getContainer}) => {
        if (windowIsUndefined) {
            return;
        }
        const container = getContainer && getContainer();
        const parent = container ? container.parentNode : null;
        this.levelDom = [];
        if (level === 'all') {
            const children = parent ? Array.prototype.slice.call(parent.children) : [];
            children.forEach(child => {
                if (
                    child.nodeName !== 'SCRIPT' && child.nodeName !== 'STYLE'
                    && child.nodeName !== 'LINK' && child !== container
                ) {
                    this.levelDom.push(child);
                }
            });
        } else if (level) {
            dataToArray(level).forEach(key => {
                document.querySelectorAll(key).forEach(item => {
                    this.levelDom.push(item);
                });
            });
        }
    }

    getHorizontalBoolAndPlacementName = () => {
        const placement = this.props.placement;
        const isHorizontal = placement === 'left' || placement === 'right';
        const placementName = `translate${isHorizontal ? 'X' : 'Y'}`;
        return {
            isHorizontal,
            placementName
        };
    }

    render() {
        const {
            className,
            children,
            style,
            width,
            height,
            defaultOpen,
            open: $open,
            prefixCls,
            placement,
            level,
            levelMove,
            ease,
            duration,
            getContainer,
            handler,
            onChange,
            afterVisibleChange,
            showMask,
            maskClosable,
            maskStyle,
            drawerStyle,
            onClose,
            onHandleClick,
            keyboard,
            getOpenCount,
            ...props
        } = this.props;
        // 首次渲染都将是关闭状态。
        const open = this.dom ? $open : false;
        const wrapperClassName = classnames(prefixCls, {
            [`${prefixCls}-${placement}`]: true,
            [`${prefixCls}-open`]: open,
            [className || '']: !!className,
            'no-mask': !showMask
        });

        const placementName = this.getHorizontalBoolAndPlacementName().placementName;
        // 百分比与像素动画不同步，第一次打用后全用像素动画。
        // const defaultValue = !this.contentDom || !level ? '100%' : `${value}px`;
        const placementPos = placement === 'left' || placement === 'top' ? '-100%' : '100%';
        const transform = open ? '' : `${placementName}(${placementPos})`;

        const handlerChildren = handler && React.cloneElement(handler, {
            onClick: e => {
                if (handler.props.onClick) {
                    handler.props.onClick();
                }
                if (onHandleClick) {
                    onHandleClick(e);
                }
            },
            ref: c => {
                this.handlerDom = c;
            }
        });
        return (
            <div
                {...omit(props, ['switchScrollingEffect'])}
                tabIndex={-1}
                className={wrapperClassName}
                style={style}
                ref={c => {
                    this.dom = c;
                }}
                onKeyDown={open && keyboard ? this.onKeyDown : undefined}
                onTransitionEnd={this.onWrapperTransitionEnd}
            >
                {showMask && (
                    <div
                        className={`${prefixCls}-mask`}
                        onClick={maskClosable ? onClose : undefined}
                        style={maskStyle}
                        ref={c => {
                            this.maskDom = c;
                        }}
                    />
                )}
                <div
                    className={`${prefixCls}-content-wrapper`}
                    style={{
                        transform,
                        msTransform: transform,
                        width: isNumeric(width) ? `${width}px` : width,
                        height: isNumeric(height) ? `${height}px` : height,
                        ...drawerStyle
                    }}
                    ref={c => {
                        this.contentWrapper = c;
                    }}
                >
                    <div
                        className={`${prefixCls}-content`}
                        ref={c => {
                            this.contentDom = c;
                        }}
                        onTouchStart={open && showMask ? this.removeStartHandler : undefined} // 跑用例用
                        onTouchMove={open && showMask ? this.removeMoveHandler : undefined} // 跑用例用
                    >
                        {children}
                    </div>
                    {handlerChildren}
                </div>
            </div>
        );
    }
}

export default polyfill(DrawerChild);
