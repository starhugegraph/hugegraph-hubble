import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {polyfill} from 'react-lifecycles-compat';

class AnchorLink extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        href: PropTypes.string,
        title: PropTypes.node,
        children: PropTypes.node,
        className: PropTypes.string,
        isALabel: PropTypes.bool
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-anchor',
        href: '#',
        isALabel: false
    };

    static contextTypes = {
        oneAnchor: PropTypes.object
    };

    componentDidMount() {
        this.context.oneAnchor.registerLink(this.props.href);
    }

    componentDidUpdate({href: prevHref}) {
        const href = this.props.href;
        if (prevHref !== href) {
            this.context.oneAnchor.unregisterLink(prevHref);
            this.context.oneAnchor.registerLink(href);
        }
    }

    componentWillUnmount() {
        this.context.oneAnchor.unregisterLink(this.props.href);
    }

    handleClick = e => {
        const {scrollTo, onClick} = this.context.oneAnchor;
        const {href, title} = this.props;
        if (onClick) {
            onClick(e, {title, href});
        }
        scrollTo(href);
    };

    render() {
        const {prefixCls, href, title, children, className, isALabel} = this.props;
        const active = this.context.oneAnchor.activeLink === href;
        const wrapperClassName = classNames(className, `${prefixCls}-link`, {
            [`${prefixCls}-link-active`]: active,
            [`${prefixCls}-link-not-active`]: !active,
            [`${prefixCls}-link-has-children`]: !!children,
            [`${prefixCls}-link-without-children`]: !children
        });
        const titleClassName = classNames(`${prefixCls}-link-title`, {
            [`${prefixCls}-link-title-active`]: active,
            [`${prefixCls}-link-title-not-active`]: !active
        });
        const label = isALabel ? (
            <a
                className={titleClassName}
                href={href}
                title={typeof title === 'string' ? title : ''}
                onClick={this.handleClick}
            >
                <span>
                    {title}
                </span>
            </a>
        ) : (
            <span
                className={titleClassName}
                title={typeof title === 'string' ? title : ''}
                onClick={this.handleClick}
            >
                <span>
                    {title}
                </span>
            </span>
        );
        return (
            <div className={wrapperClassName}>
                {label}
                {children}
            </div>
        );
    }
}


polyfill(AnchorLink);
export default AnchorLink;
