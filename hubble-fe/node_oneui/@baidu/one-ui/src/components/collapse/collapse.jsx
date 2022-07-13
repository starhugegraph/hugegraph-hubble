import React, {Component, Children} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {isFragment} from 'react-is';
import shallowEqual from 'shallowequal';
import {polyfill} from 'react-lifecycles-compat';

const formatActiveKeyArray = activeKey => {
    let currentKey = activeKey;
    if (!Array.isArray(currentKey)) {
        currentKey = currentKey ? [currentKey] : [];
    }
    return currentKey;
};

class Collapse extends Component {
    static propTypes = {
        size: PropTypes.oneOf(['small', 'medium']),
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        disabled: PropTypes.bool,
        defaultActiveKey: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ]),
        activeKey: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ]),
        onChange: PropTypes.func,
        accordion: PropTypes.bool,
        destroyNotActivePanel: PropTypes.bool,
        children: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number])
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-collapse',
        className: '',
        style: {},
        size: 'small',
        onChange() {}
    }

    constructor(props) {
        super(props);
        const {activeKey, defaultActiveKey} = props;
        let currentKey = defaultActiveKey;
        // 处理受控非受控情况
        if ('activeKey' in props) {
            currentKey = activeKey;
        }

        this.state = {
            activeKey: formatActiveKeyArray(currentKey)
        };
    }

    static getDerivedStateFromProps(nextProps) {
        // 判断受控情况
        if ('activeKey' in nextProps) {
            return {
                activeKey: formatActiveKeyArray(nextProps.activeKey)
            };
        }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }

    onClickItem = key => {
        // 判断是否是手风琴折叠面板
        let activeKey = this.state.activeKey;
        const isAccordion = this.props.accordion;
        if (isAccordion) {
            // 选择已打开的面板 => 关闭，选择其他 => 打开面板，关闭已选择的，是全局永远只有一个打开面板
            activeKey = activeKey[0] === key ? [] : [key];
        } else {
            activeKey = [...activeKey];
            const index = activeKey.indexOf(key);
            const isActive = index > -1;
            if (isActive) {
                activeKey.splice(index, 1);
            } else {
                activeKey.push(key);
            }
        }
        if (!('activeKey' in this.props)) {
            this.setState({activeKey});
        }
        this.props.onChange(isAccordion ? activeKey[0] : activeKey);
    }

    renderPanel = () => {
        const activeKey = this.state.activeKey;
        const {children, prefixCls, accordion, destroyNotActivePanel} = this.props;
        const childList = isFragment(children) ? children.props.children : children;
        const newChildren = Children.map(childList, (child, index) => {
            if (!child) {
                return null;
            }
            // 如果没有key，就用index索引做key
            const key = child.key || String(index);
            const {header, headerClass, disabled} = child.props;
            let isActive = false;
            if (accordion) {
                isActive = activeKey[0] === key;
            } else {
                isActive = activeKey.indexOf(key) > -1;
            }
            const props = {
                key,
                panelKey: key,
                header,
                prefixCls,
                children: child.props.children,
                onItemClick: this.onClickItem,
                headerClass,
                isActive,
                destroyNotActivePanel,
                accordion,
                disabled: this.props.disabled || disabled,
                id: key
            };
            return React.cloneElement(child, props);
        });
        if (isFragment(children)) {
            return (
                <React.Fragment>
                    {newChildren}
                </React.Fragment>
            );
        }
        return newChildren;
    }

    render() {
        const {prefixCls, className, style, size} = this.props;
        const collapseClassName = classNames(prefixCls, className, [`${prefixCls}-${size}`]);
        return (
            <div className={collapseClassName} style={style}>
                {this.renderPanel()}
            </div>
        );
    }
}

polyfill(Collapse);

export default Collapse;
