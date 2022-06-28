import React, {PureComponent} from 'react';
import {SubMenu as RcSubMenu} from 'rc-menu';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';

const sizeArray = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
export default class SubMenu extends PureComponent {
    static propTypes = {
        rootPrefixCls: PropTypes.string,
        placements: PropTypes.object,
        theme: PropTypes.string,
        mode: PropTypes.string,
        popupClassName: PropTypes.string,
        size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
        icon: PropTypes.node,
        title: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
    }

    static defaultProps = {
        placements: {},
        theme: 'light',
        popupClassName: '',
        size: 'medium'
    }

    static isSubMenu = true;

    render() {
        const {
            placements, mode, rootPrefixCls,
            size, popupClassName, icon, title
        } = this.props;
        let alreadyHasSizeClassName = false;
        sizeArray.forEach(string => {
            if (popupClassName.indexOf(`${rootPrefixCls}-submenu-${string}`) > -1) {
                alreadyHasSizeClassName = true;
                return false;
            }
        });
        const newTitleNode = [title];
        const hasIcon = icon && React.isValidElement(icon);
        if (hasIcon) {
            newTitleNode.unshift(<span className={`${rootPrefixCls}-submenu-custom-icon`}>{icon}</span>);
        }
        const props = {
            ...this.props,
            inlineIndent: 16,
            builtinPlacements: placements,
            expandIcon: mode !== 'vertical' ? <Icon type="angle-down"/> : <Icon type="angle-right"/>,
            popupClassName: classNames(popupClassName, {
                [`${rootPrefixCls}-submenu-${size}`]: !!rootPrefixCls && !alreadyHasSizeClassName
            }),
            className: classNames({
                [`${rootPrefixCls}-submenu-has-icon`]: mode === 'inline' && hasIcon
            }),
            title: newTitleNode
        };
        delete props.placements;
        delete props.icon;
        return (
            <RcSubMenu
                {...props}
            />
        );
    }
}
