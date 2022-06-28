import React, {PureComponent} from 'react';
import {Item} from 'rc-menu';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';

export default class MenuItem extends PureComponent {
    static isMenuItem = true;

    static contextTypes = {
        inlineCollapsed: PropTypes.bool
    };

    render() {
        const {inlineCollapsed} = this.context;
        const props = this.props;
        const children = props.children;
        const ItemProps = {...props};
        ItemProps.children = (
            <span className={`${props.rootPrefixCls}-item-span`}>
                {children}
            </span>
        );
        return (
            <Tooltip
                title={inlineCollapsed && props.level === 1 ? props.children : ''}
                placement="right"
                overlayClassName={`${props.rootPrefixCls}-inline-collapsed-tooltip`}
            >
                <Item {...ItemProps} />
            </Tooltip>
        );
    }
}
