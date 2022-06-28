import React, {Component} from 'react';
import shallowEqual from 'shallowequal';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {IconChevronDown, IconChevronRight} from '@baidu/one-ui-icon';
import Content from './common/content';

export default class CollapsePanel extends Component {
    static propTypes = {
        className: PropTypes.string,
        prefixCls: PropTypes.string,
        id: PropTypes.string,
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.number]),
        header: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.node
        ]),
        isActive: PropTypes.bool,
        onItemClick: PropTypes.func,
        headerClass: PropTypes.string,
        style: PropTypes.object,
        panelKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        disabled: PropTypes.bool,
        destroyNotActivePanel: PropTypes.bool,
        accordion: PropTypes.bool,
        // 隐藏的时候渲染dom
        renderDomWhenHide: PropTypes.bool
    };

    state = {
        focused: false
    }

    onBlur = () => {
        this.setState({
            focused: false
        });
    }

    static defaultProps = {
        isActive: false,
        onItemClick() {},
        headerClass: '',
        prefixCls: 'new-fc-one-collapse',
        disabled: false,
        style: {},
        destroyNotActivePanel: false,
        accordion: false,
        renderDomWhenHide: false
    }

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(this.props, nextProps);
    }

    // 点击事件
    onItemClick = () => {
        const {onItemClick, panelKey, disabled} = this.props;
        if (disabled) {
            return;
        }
        if (typeof onItemClick === 'function') {
            onItemClick(panelKey);
        }
    }

    // 键盘事件
    onKeyPress = e => {
        if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13
        || e.key === ' ' || e.which === 32 || e.keyCode === 32) {
            // tab和确认
            this.onItemClick();
            this.setState({
                focused: true
            });
        }
    }

    render() {
        const {
            className,
            id,
            style,
            prefixCls,
            header,
            headerClass,
            children,
            isActive,
            disabled,
            destroyNotActivePanel,
            accordion,
            renderDomWhenHide
        } = this.props;
        const headerCls = classNames(`${prefixCls}-item-header`, {
            [headerClass]: headerClass
        });
        const itemCls = classNames(`${prefixCls}-item`, {
            [`${prefixCls}-item-active`]: isActive,
            [`${prefixCls}-item-not-active`]: !isActive,
            [`${prefixCls}-item-disabled`]: disabled,
            [`${prefixCls}-item-focused`]: this.state.focused
        }, className);

        const iconNode = isActive ? <IconChevronDown /> : <IconChevronRight />;
        return (
            <div className={itemCls} style={style} id={id}>
                <div
                    className={headerCls}
                    onClick={this.onItemClick}
                    onKeyPress={this.onKeyPress}
                    data-type={accordion ? 'accordion' : 'normal'}
                    tabIndex={id}
                    onBlur={this.onBlur}
                >
                    {iconNode}
                    {header || null}
                </div>
                <Content
                    prefixCls={prefixCls}
                    isActive={isActive}
                    destroyNotActivePanel={destroyNotActivePanel}
                    renderDomWhenHide={renderDomWhenHide}
                >
                    {children}
                </Content>
            </div>
        );
    }
}
