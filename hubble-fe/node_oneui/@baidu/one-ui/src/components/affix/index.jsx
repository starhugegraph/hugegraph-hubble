import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import omit from 'omit.js';
import _ from 'lodash';
import tools from '../../core';

const {
    getScroll
} = tools.affix;

const getDefaultTarget = () => {
    return typeof window !== 'undefined' ? window : null;
};

const getTargetRect = target => {
    return target !== window
        ? target.getBoundingClientRect()
        : {top: 0, left: 0, bottom: 0};
};

const getOffset = (element, target) => {
    const elemRect = element.getBoundingClientRect();
    const targetRect = getTargetRect(target);

    const scrollTop = getScroll(target, true);
    const scrollLeft = getScroll(target, false);

    const docElem = window.document.body;
    const clientTop = docElem.clientTop || 0;
    const clientLeft = docElem.clientLeft || 0;

    return {
        top: (elemRect.top - targetRect.top) + (scrollTop - clientTop),
        left: (elemRect.left - targetRect.left) + (scrollLeft - clientLeft),
        width: elemRect.width,
        height: elemRect.height
    };
};

const noop = () => {};

export default class Affix extends Component {
    static propTypes = {
        /** 距离窗口顶部达到指定偏移量后触发 */
        offsetTop: PropTypes.number,
        /** 距离窗口底部到达指定偏移量后触发 */
        offsetBottom: PropTypes.number,
        /** 固定状态改变时触发的回调函数 */
        onChange: PropTypes.func,
        /** 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
        target: PropTypes.func,
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** dom的children */
        children: PropTypes.node,
        /** 样式 */
        style: PropTypes.object,
        /** 固钉的z-index */
        zIndex: PropTypes.number
    }

    static defaultProps = {
        zIndex: 1
    }

    constructor(props) {
        super(props);
        this.state = {
            affixStyle: null,
            placeholderStyle: null
        };
    }

    componentDidMount() {
        const target = this.props.target || getDefaultTarget;
        this.timeout = setTimeout(() => {
            this.setTargetEventListeners(target);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.target !== nextProps.target) {
            this.clearEventListeners();
            this.setTargetEventListeners(nextProps.target);

            // Mock Event object.
            this.updatePosition({});
        }
    }

    componentWillUnmount() {
        this.clearEventListeners();
        clearTimeout(this.timeout);
    }

    setTargetEventListeners = getTarget => {
        const target = getTarget();
        if (!target) {
            return;
        }
        this.clearEventListeners();

        this.events.forEach(eventName => {
            this.eventHandlers[eventName] = addEventListener(target, eventName, _.throttle(this.updatePosition, 10));
        });
    }

    setAffixStyle = (e, affixStyle) => {
        const {onChange = noop, target = getDefaultTarget} = this.props;
        const originalAffixStyle = this.state.affixStyle;
        const isWindow = target() === window;
        if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
            return;
        }
        if (shallowequal(affixStyle, originalAffixStyle)) {
            return;
        }
        this.setState({affixStyle}, () => {
            const affixed = !!this.state.affixStyle;
            if ((affixStyle && !originalAffixStyle)
                || (!affixStyle && originalAffixStyle)) {
                onChange(affixed);
            }
        });
    }

    setPlaceholderStyle = placeholderStyle => {
        const originalPlaceholderStyle = this.state.placeholderStyle;
        if (shallowequal(placeholderStyle, originalPlaceholderStyle)) {
            return;
        }
        this.setState({placeholderStyle});
    }

    getFixedNode = node => {
        this.fixedNode = node;
    }

    updatePosition = e => {
        const {
            offsetBottom,
            target = getDefaultTarget,
            zIndex
        } = this.props;
        let offsetTop = this.props.offsetTop;
        const targetNode = target();
        const scrollTop = getScroll(targetNode, true);
        const affixNode = ReactDOM.findDOMNode(this);
        const elemOffset = getOffset(affixNode, targetNode);
        const elemSize = {
            width: this.fixedNode.offsetWidth,
            height: this.fixedNode.offsetHeight
        };

        const offsetMode = {
            top: false,
            bottom: false
        };
        if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
            offsetMode.top = true;
            offsetTop = 0;
        } else {
            offsetMode.top = typeof offsetTop === 'number';
            offsetMode.bottom = typeof offsetBottom === 'number';
        }
        const targetRect = getTargetRect(targetNode);
        const targetInnerHeight = targetNode.innerHeight || targetNode.clientHeight;
        if (scrollTop > elemOffset.top - offsetTop && offsetMode.top) {
            // Fixed Top
            const width = elemOffset.width;
            this.setAffixStyle(e, {
                position: 'fixed',
                top: targetRect.top + offsetTop,
                left: targetRect.left + elemOffset.left,
                width,
                zIndex
            });
            this.setPlaceholderStyle({
                width,
                height: elemSize.height
            });
        } else if (scrollTop < ((elemOffset.top + elemSize.height) + (offsetBottom - targetInnerHeight))
        && offsetMode.bottom) {
            const targetBottomOffet = targetNode === window ? 0 : (window.innerHeight - targetRect.bottom);
            const width = elemOffset.width;
            this.setAffixStyle(e, {
                position: 'fixed',
                bottom: (targetBottomOffet + offsetBottom),
                left: (targetRect.left + elemOffset.left),
                width,
                zIndex
            });
            this.setPlaceholderStyle({
                width,
                height: elemOffset.height
            });
        } else {
            const affixStyle = this.state.affixStyle;
            if (e.type === 'resize' && affixStyle && affixStyle.position === 'fixed' && affixNode.offsetWidth) {
                this.setAffixStyle(e, {...affixStyle, width: affixNode.offsetWidth});
            } else {
                this.setAffixStyle(e, null);
            }
            this.setPlaceholderStyle(null);
        }
    }

    eventHandlers = {};

    clearEventListeners = () => {
        this.events.forEach(eventName => {
            const handler = this.eventHandlers[eventName];
            if (handler && handler.remove) {
                handler.remove();
            }
        });
    }

    events = [
        'resize',
        'scroll',
        'touchstart',
        'touchmove',
        'touchend',
        'pageshow',
        'load'
    ];

    render() {
        const affixStyle = this.state.affixStyle;
        const {prefixCls, style, children} = this.props;
        const className = classNames({
            [prefixCls || 'new-fc-one-affix']: affixStyle
        });

        const props = omit(this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange', 'zIndex']);
        const placeholderStyle = {...this.state.placeholderStyle, ...style};
        return (
            <div {...props} style={placeholderStyle}>
                <div className={className} ref={this.getFixedNode} style={affixStyle}>
                    {children}
                </div>
            </div>
        );
    }
}
