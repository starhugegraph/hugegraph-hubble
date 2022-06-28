/**
 * backTop
 * @author liuyahui01
 * @date 2019/08/09
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import Icon from '../icon';
import Button from '../button';

const defaultVisibilityHeight = 400;
export default class BackTop extends PureComponent {
    static propTypes = {
        /** 用户点击之后回调函数 */
        onClick: PropTypes.func,
        /** 用户监听其滚动的元素 */
        target: PropTypes.func,
        /** 滚动高度到达此致显示BackTop按钮 */
        visibilityHeight: PropTypes.number,
        /** 用户可自定义class前缀 */
        prefixCls: PropTypes.string,
        /** 用户可自定义class */
        className: PropTypes.string
    }

    static defaultProps = {
        onClick: _.noop,
        visibilityHeight: defaultVisibilityHeight,
        prefixCls: 'new-fc-one-back-top',
        className: ''
    }

    constructor(args) {
        super(...args);
        this.state = {
            visible: false
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if ('visible' in nextProps
        && nextProps.visible !== prevState.visible) {
            return {
                visible: nextProps.visible
            };
        }
        return null;
    }

    componentDidMount() {
        const getTarget = this.props.target || this.getDefaultTarget;
        const target = getTarget();
        if (target) {
            this.scrollEvent = target.addEventListener('scroll', this.handleScroll);
            this.handleScroll();
        }
    }

    componentWillUnmount() {
        if (this.scrollEvent) {
            // 初始化清除上一次监听的滚动元素
            this.scrollEvent.remove();
        }
    }

    onVisibleChange = visible => {
        if (!('visible' in this.props)) {
            this.setState({
                visible
            });
        }
    }

    getDefaultTarget = () => window;

    getScroll = target => {
        // 获取滚动高度
        if (typeof window === 'undefined') {
            return 0;
        }

        const prop = 'pageYOffset';
        const method = 'scrollTop';
        const isWindow = target === window;
        let ret = isWindow ? target[prop] : target[method];
        if (isWindow && typeof ret !== 'number') {
            ret = document.documentElement[method];
        }
        return ret;
    }

    handleScroll = () => {
        const {visibilityHeight, target = this.getDefaultTarget} = this.props;
        const scrollTop = this.getScroll(target());
        const visible = scrollTop > visibilityHeight;
        this.onVisibleChange(visible);
    };

    // 回到顶部
    scrollToTop = () => {
        const getTarget = this.props.target || this.getDefaultTarget;
        const targetNode = getTarget();
        if (targetNode === window) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        } else {
            targetNode.scrollTop = 0;
        }
        this.props.onClick();
    };

    render() {
        const {prefixCls, className, target} = this.props;
        const classes = classNames(prefixCls, className, {
            [`${prefixCls}-default`]: !target
        });
        return this.state.visible
            ? (
                <Button className={classes} onClick={this.scrollToTop} type="translucent" size="xsmall">
                    <Icon type="arrow-to-top" className={`${prefixCls}-icon`} />
                </Button>
            )
            : null;
    }
}
