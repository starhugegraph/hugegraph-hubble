import React, {PureComponent} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import {
    IconPlus,
    IconAngleRight,
    IconAngleLeft
} from '@baidu/one-ui-icon';
import ResizeObserver from 'resize-observer-polyfill';
import Button from '../../button';
import {
    isTransform3dSupported,
    setTransform
} from '../../../core/tabsTools';

export default class LineNode extends PureComponent {
    static propTypes = {
        content: PropTypes.node.isRequired,
        prefixCls: PropTypes.string.isRequired,
        showAdd: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        onAdd: PropTypes.func.isRequired,
        activeKey: PropTypes.string.isRequired,
        onNextClick: PropTypes.func,
        onPrevClick: PropTypes.func,
        showAddDisabled: PropTypes.bool,
        addButtonText: PropTypes.string.isRequired
    }

    static defaultProps = {
        onNextClick() {},
        onPrevClick() {}
    }

    state = {
        showPrevIcon: false,
        showNextIcon: false
    }

    offset = 0;

    componentDidMount() {
        this.setNextAndPrevShow();
        this.scrollToActiveTab();
        this.debouncedResize = debounce(() => {
            this.setNextAndPrevShow();
            this.scrollToActiveTab();
        }, 200);
        this.resizeObserver = new ResizeObserver(this.debouncedResize);
        this.resizeObserver.observe(this.navContainer);
    }

    componentDidUpdate = prevProps => {
        const nextPrev = this.setNextAndPrevShow();
        if (this.isNextAndPrevIconShow(this.state) !== this.isNextAndPrevIconShow(nextPrev)) {
            this.setState({}, this.scrollToActiveTab);
        } else if (!prevProps || this.props.activeKey !== prevProps.activeKey) {
            // can not use props.activeKey
            this.scrollToActiveTab();
        }
    }

    componentWillUnmount = () => {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.debouncedResize && this.debouncedResize.cancel) {
            this.debouncedResize.cancel();
        }
    }

    isNextAndPrevIconShow = state => {
        if (state) {
            return state.showPrevIcon || state.showNextIcon;
        }
        return this.state.showPrevIcon || this.state.showNextIcon;
    }

    setNextAndPrevShow = () => {
        // showPrevIcon 和 showNextIcon状态
        const navNode = this.scrollNav;
        const navTabsContainerNode = this.navTabsContainer;
        const currentNode = navTabsContainerNode || navNode;
        const scrollWidth = currentNode.scrollWidth;
        const containerWdith = this.navContainer.offsetWidth + 1;
        const navWrapWidth = this.navWrapper.offsetWidth;
        const minOffset = containerWdith - scrollWidth;
        let {showNextIcon, showPrevIcon} = this.state;
        let offset = this.offset;
        if (minOffset >= 0) {
            showNextIcon = false;
            this.setOffset(0, false);
            offset = 0;
        } else if (minOffset < offset) {
            showNextIcon = true;
        } else {
            showNextIcon = false;
            const realOffset = navWrapWidth - scrollWidth;
            this.setOffset(realOffset, false);
            offset = realOffset;
        }
        if (offset < 0) {
            showPrevIcon = true;
        } else {
            showPrevIcon = false;
        }
        this.setNext(showNextIcon);
        this.setPrev(showPrevIcon);
        return {
            showNextIcon,
            showPrevIcon
        };
    }

    setPrev = value => {
        if (this.state.showPrevIcon !== value) {
            this.setState({
                showPrevIcon: value
            });
        }
    }

    setNext = value => {
        if (this.state.showNextIcon !== value) {
            this.setState({
                showNextIcon: value
            });
        }
    }

    setOffset = (offset, checkNextPrev = true) => {
        const target = Math.min(0, offset);
        if (target !== this.offset) {
            this.offset = target;
            let navOffset = {};
            const navStyle = this.scrollNav.style;
            const transformSupported = isTransform3dSupported(navStyle);
            if (transformSupported) {
                navOffset = {
                    value: `translate3d(${target}px,0,0)`
                };
                setTransform(navStyle, navOffset.value);
            } else {
                navOffset = {
                    name: 'left',
                    value: `${target}px`
                };
                navStyle[navOffset.name] = navOffset.value;
            }
            if (checkNextPrev) {
                this.setNextAndPrevShow();
            }
        }
    }

    getRef = (name, ref) => {
        this[name] = ref;
    }

    renderPrevIcon = () => {
        const {type, prefixCls} = this.props;
        const showPrevIcon = this.state.showPrevIcon;
        const prevIconClassName = classNames(`${prefixCls}-nav-prev`, {
            [`${prefixCls}-nav-prev-disabled`]: !showPrevIcon
        });
        const prevProps = {
            className: prevIconClassName,
            onClick: !showPrevIcon ? () => {} : this.prev
        };
        if (type === 'line') {
            return (
                <span {...prevProps}>
                    <IconAngleLeft />
                </span>
            );
        }
        return (
            <Button {...prevProps} disabled={!showPrevIcon}>
                <IconAngleLeft />
            </Button>
        );
    }

    renderNextIcon = () => {
        const {type, prefixCls} = this.props;
        const showNextIcon = this.state.showNextIcon;
        const nextIconClassName = classNames(`${prefixCls}-nav-next`, {
            [`${prefixCls}-nav-next-disabled`]: !showNextIcon
        });
        const nextProps = {
            className: nextIconClassName,
            onClick: !showNextIcon ? () => {} : this.next
        };
        if (type === 'line') {
            return (
                <span {...nextProps}>
                    <IconAngleRight />
                </span>
            );
        }
        return (
            <Button {...nextProps} disabled={!showNextIcon}>
                <IconAngleRight />
            </Button>
        );
    }

    scrollToActiveTab = e => {
        const navWrapper = this.navWrapper;
        const activeTab = this.activeTab;
        if ((e && e.target !== e.currentTarget) || !activeTab) {
            return;
        }
        const needToSroll = this.isNextAndPrevIconShow();
        // this.lastNextPrevShown = this.isNextAndPrevIconShow();
        if (!needToSroll) {
            return;
        }
        const activeTabScrollWidth = activeTab.scrollWidth;
        const navWrapNodeWidth = navWrapper.offsetWidth;
        const wrapOffset = navWrapper.getBoundingClientRect().left;
        const activeTabOffset = activeTab.getBoundingClientRect().left;
        let offset = this.offset;
        if (wrapOffset > activeTabOffset) {
            offset += (wrapOffset - activeTabOffset);
            this.setOffset(offset);
        } else if ((wrapOffset + navWrapNodeWidth) < (activeTabOffset + activeTabScrollWidth)) {
            offset -= (activeTabOffset + activeTabScrollWidth) - (wrapOffset + navWrapNodeWidth);
            this.setOffset(offset);
        }
    }

    prev = e => {
        this.props.onPrevClick(e);
        const navWrapNode = this.navWrapper;
        const navWrapNodeWidth = navWrapNode.offsetWidth;
        this.setOffset(this.offset + navWrapNodeWidth);
    }

    next = e => {
        this.props.onNextClick(e);
        const navWrapNode = this.navWrapper;
        const navWrapNodeWidth = navWrapNode.offsetWidth;
        this.setOffset(this.offset - navWrapNodeWidth);
    }

    render() {
        const {
            prefixCls, content, showAdd, type,
            onAdd, activeKey, showAddDisabled, addButtonText
        } = this.props;
        const addClassName = classNames(
            `${prefixCls}-bar-add`,
            `${prefixCls}-bar-add-${type}`,
            {
                [`${prefixCls}-bar-add-disabled`]: showAddDisabled
            }
        );
        const showIcon = this.isNextAndPrevIconShow();
        const containerClassName = classNames(`${prefixCls}-bar`, {
            [`${prefixCls}-bar-show-add`]: showAdd,
            [`${prefixCls}-bar-pagination-show`]: showIcon
        });
        return (
            <div className={containerClassName}>
                <div className={`${prefixCls}-nav-container`} ref={ref => this.getRef('navContainer', ref)}>
                    {
                        showIcon ? this.renderPrevIcon() : null
                    }
                    {
                        showIcon ? this.renderNextIcon() : null
                    }
                    <div className={`${prefixCls}-nav-wrap`} ref={ref => this.getRef('navWrapper', ref)}>
                        <div className={`${prefixCls}-nav-scroll`} ref={ref => this.getRef('scrollBarContainer', ref)}>
                            <div className={`${prefixCls}-nav`} ref={ref => this.getRef('scrollNav', ref)}>
                                <div ref={ref => this.getRef('navTabsContainer', ref)}>
                                    {
                                        content.map(item => {
                                            const key = item.key;
                                            const isActive = activeKey === key;
                                            const paneClassName = classNames(`${prefixCls}-tab-item`, {
                                                [`${prefixCls}-tab-item-is-active`]: isActive,
                                                [`${prefixCls}-tab-item-is-inactive`]: !isActive
                                            });
                                            const itemProps = {
                                                className: paneClassName,
                                                key
                                            };
                                            if (isActive) {
                                                itemProps.ref = ref => this.getRef('activeTab', ref);
                                            }
                                            return <span {...itemProps}>{item}</span>;
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showAdd ? (
                        <Button
                            className={addClassName}
                            type={type === 'line' ? 'link' : 'normal'}
                            onClick={onAdd}
                            disabled={showAddDisabled}
                        >
                            <IconPlus />
                            {
                                type === 'line' ? <span>{addButtonText}</span> : null
                            }
                        </Button>
                    ) : null
                }
            </div>
        );
    }
}
