import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {IconChevronDown, IconLoading} from '@baidu/one-ui-icon';
import RcTree from 'rc-tree';
import TreeNode from './common/treeNode';

export default class Tree extends Component {
    static TreeNode = TreeNode;

    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        showIcon: PropTypes.bool,
        checkStrictly: PropTypes.bool,
        checkable: PropTypes.bool,
        defaultExpandAll: PropTypes.bool,
        defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
        expandedKeys: PropTypes.arrayOf(PropTypes.string),
        checkedKeys: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.shape({
                checked: PropTypes.arrayOf(PropTypes.string),
                halfChecked: PropTypes.arrayOf(PropTypes.string)
            })
        ]),
        defaultCheckedKeys: PropTypes.arrayOf(PropTypes.string),
        selectedKeys: PropTypes.arrayOf(PropTypes.string),
        defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
        onExpand: PropTypes.func,
        onCheck: PropTypes.func,
        onSelect: PropTypes.func,
        loadData: PropTypes.func,
        style: PropTypes.object,
        filterTreeNode: PropTypes.func,
        children: PropTypes.node,
        switcherIcon: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
        size: PropTypes.oneOf(['small', 'medium'])
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-tree',
        checkable: false,
        showIcon: false,
        checkStrictly: false,
        size: 'small'
    };

    renderSwitcherIcon = ({isLeaf, loading}) => {
        const {prefixCls, switcherIcon} = this.props;
        if (loading) {
            return <IconLoading className={`${prefixCls}-switcher-loading-icon`} />;
        }
        if (isLeaf) {
            return null;
        }
        const switcherCls = `${prefixCls}-switcher-icon`;
        if (switcherIcon) {
            const switcherOriginCls = (switcherIcon.props && switcherIcon.props.className) || '';
            return React.cloneElement(switcherIcon, {
                className: classNames(switcherOriginCls, switcherCls)
            });
        }
        return <IconChevronDown className={switcherCls} />;
    }

    setTreeRef = node => {
        this.treeRef = node;
    };

    render() {
        const props = this.props;
        const {prefixCls, className, checkable, showIcon, size, switcherIcon} = props;
        return (
            <RcTree
                ref={this.setTreeRef}
                {...props}
                className={classNames(className, {
                    [`${prefixCls}-icon-hide`]: !showIcon
                }, `${prefixCls}-${size}`)}
                checkable={checkable}
                switcherIcon={switcherIcon && typeof switcherIcon === 'function'
                    ? switcherIcon
                    : nodeProps => this.renderSwitcherIcon(nodeProps)}
            >
                {this.props.children}
            </RcTree>
        );
    }
}
