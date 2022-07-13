import React, {PureComponent, cloneElement} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import {polyfill} from 'react-lifecycles-compat';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import Affix from '../affix';
import {
    sharpMatcherRegx,
    scrollToDom,
    getOffsetTop
} from '../../core/anchorTools';

class Anchor extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        offsetTop: PropTypes.number,
        affix: PropTypes.bool,
        children: PropTypes.node,
        getContainer: PropTypes.func,
        onClick: PropTypes.func,
        bounds: PropTypes.number,
        size: PropTypes.oneOf(['small', 'medium'])
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-anchor',
        className: '',
        style: {},
        affix: true,
        getContainer: () => window,
        onClick() {},
        bounds: 5,
        offsetTop: 0,
        size: 'small'
    }

    static childContextTypes = {
        oneAnchor: PropTypes.object
    };

    links = [];

    state = {
        activeLink: null
    };

    getChildContext = () => {
        const oneAnchor = {
            registerLink: link => {
                if (!this.links.includes(link)) {
                    this.links.push(link);
                }
            },
            unregisterLink: link => {
                const index = this.links.indexOf(link);
                if (index !== -1) {
                    this.links.splice(index, 1);
                }
            },
            activeLink: this.state.activeLink,
            scrollTo: this.handleScrollTo,
            onClick: this.props.onClick
        };
        return {oneAnchor};
    };

    componentDidMount() {
        const getContainer = this.props.getContainer;
        this.scrollContainer = getContainer();
        this.scrollEvent = addEventListener(this.scrollContainer, 'scroll', this.handleScroll);
        this.handleScroll();
    }

    componentWillUnmount() {
        if (this.scrollEvent) {
            this.scrollEvent.remove();
        }
    }

    componentDidUpdate() {
        if (this.scrollEvent) {
            const getContainer = this.props.getContainer;
            const currentContainer = getContainer();
            if (this.scrollContainer !== currentContainer) {
                this.scrollContainer = currentContainer;
                this.scrollEvent.remove();
                this.scrollEvent = addEventListener(this.scrollContainer, 'scroll', this.handleScroll);
                this.handleScroll();
            }
        }
        this.updateInk();
    }

    handleScroll = () => {
        if (this.animating) {
            return;
        }
        const activeLink = this.state.activeLink;
        const {offsetTop, bounds} = this.props;
        const currentActiveLink = this.getCurrentAnchor(offsetTop, bounds);
        if (activeLink !== currentActiveLink) {
            this.setState({
                activeLink: currentActiveLink
            });
        }
    }

    handleScrollTo = link => {
        const {offsetTop, getContainer} = this.props;
        this.animating = true;
        this.setState({activeLink: link});
        scrollToDom(link, offsetTop, getContainer, () => {
            this.animating = false;
        });
    };

    getCurrentAnchor = (offsetTop = 0, bounds = 5) => {
        const activeLink = '';
        if (typeof document === 'undefined') {
            return activeLink;
        }
        const linkSections = [];
        const getContainer = this.props.getContainer;
        const container = getContainer();
        this.links.forEach(link => {
            const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
            if (!sharpLinkMatch) {
                return;
            }
            const target = document.getElementById(sharpLinkMatch[1]);
            if (target) {
                const top = getOffsetTop(target, container);
                if (top < offsetTop + bounds) {
                    linkSections.push({
                        link,
                        top
                    });
                }
            }
        });
        if (linkSections.length) {
            const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
            return maxSection.link;
        }
        return '';
    }

    updateInk = () => {
        if (typeof document === 'undefined') {
            return;
        }
        const prefixCls = this.prefixCls;
        const anchorNode = ReactDOM.findDOMNode(this);
        const linkNode = anchorNode.getElementsByClassName(`${prefixCls}-link-title-active`)[0];
        if (linkNode) {
            this.inkNode.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
        }
    };

    saveInkNode = node => {
        this.inkNode = node;
    };

    render() {
        const {
            prefixCls,
            className,
            style,
            offsetTop,
            affix,
            children,
            getContainer,
            size
        } = this.props;
        const wrapperClass = classNames(className, `${prefixCls}-wrapper`);
        const anchorClassName = classNames(prefixCls, `${prefixCls}-${size}`);
        const wrapperStyle = {
            maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
            ...style
        };
        const anchorContent = (
            <div className={wrapperClass} style={wrapperStyle}>
                <div className={anchorClassName}>
                    {
                        children && children.map((child, index) => {
                            const childProps = {
                                ...child.props,
                                key: child.key || index,
                                className: `${prefixCls}-first-level`,
                                size
                            };
                            return cloneElement(child, childProps);
                        })
                    }
                </div>
            </div>
        );
        return !affix ? anchorContent : <Affix offsetTop={offsetTop} target={getContainer}>{anchorContent}</Affix>;
    }
}

polyfill(Anchor);

export default Anchor;
