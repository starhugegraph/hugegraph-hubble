import React, {PureComponent} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import partial from 'lodash/partial';
import {polyfill} from 'react-lifecycles-compat';
import LineNode from './common/lineNode';
import CardNode from './common/cardNode';
import ScrollBar from './common/scrollBar';
import ScrollContainer from './common/scrollContainer';

class Tabs extends PureComponent {
    static propTypes = {
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 开关的样式 */
        size: PropTypes.oneOf(['small', 'medium']),
        /** 自定义类名 */
        className: PropTypes.string,
        /** 当前被选中的key - 受控 */
        activeKey: PropTypes.string,
        /** 默认当前被选中的key - 非受控 */
        defaultActiveKey: PropTypes.string,
        /** 是否展示添加按钮 */
        showAdd: PropTypes.bool,
        type: PropTypes.oneOf(['line', 'card']),
        onChange: PropTypes.func,
        onNextClick: PropTypes.func,
        onPrevClick: PropTypes.func,
        onTabClick: PropTypes.func,
        children: PropTypes.node,
        showAddDisabled: PropTypes.bool,
        onDelete: PropTypes.func,
        onAdd: PropTypes.func,
        /** 线性按钮支持自定义添加按钮文案 */
        addButtonText: PropTypes.string
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-tabs',
        className: '',
        size: 'small',
        showAdd: false,
        type: 'line',
        onTabClick() {},
        onChange() {},
        onDelete() {},
        onAdd() {},
        showAddDisabled: false,
        addButtonText: '添加标签'
    }

    constructor(props) {
        super(props);
        const activeKey = props.activeKey || props.defaultActiveKey || null;
        this.state = {
            activeKey
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const newState = {};
        if ('activeKey' in nextProps && nextProps.activeKey !== prevState.activeKey) {
            newState.activeKey = nextProps.activeKey;
        }
        return newState;
    }

    onClick = (key, props) => {
        if (props.disabled) {
            return;
        }
        if (!('activeKey' in this.props)) {
            // 非受控
            this.setState({
                activeKey: key
            });
        }
        this.props.onTabClick(key);
        this.onChange(key);
    }

    onDelete = (key, props, e) => {
        if (props.disabled) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        this.props.onDelete(key);
    }

    onAdd = () => {
        this.props.onAdd(this.state.activeKey);
    }

    onChange = currentKey => {
        if (this.state.activeKey !== currentKey) {
            this.props.onChange(currentKey);
        }
    }

    renderChildren = () => {
        const newTitleChildren = [];
        const newPaneChildren = [];
        const {children, prefixCls, size, type} = this.props;
        const activeKey = this.state.activeKey;
        React.Children.forEach(children, child => {
            const {props = {}, key} = child;
            const nodeProps = {
                ...props,
                key,
                currentKey: key,
                activeKey,
                prefixCls,
                size,
                onClick: partial(this.onClick, key, props),
                onDelete: partial(this.onDelete, key, props)
            };
            const LineNodeDom = type === 'line' ? <LineNode {...nodeProps}/> : <CardNode {...nodeProps}/>;
            newTitleChildren.push(LineNodeDom);
            const paneClassName = classNames(`${prefixCls}-tab-pane`, {
                [`${prefixCls}-tab-pane-is-active`]: activeKey === key,
                [`${prefixCls}-tab-pane-is-inactive`]: activeKey !== key
            });
            newPaneChildren.push(<div key={key} className={paneClassName}>{child}</div>);
        });
        return {
            newTitleChildren,
            newPaneChildren
        };
    }

    getScrollBarRef = ref => {
        this.scrollBarRef = ref;
    }

    render() {
        const {
            prefixCls, size, className,
            type, showAdd, showAddDisabled,
            onNextClick, onPrevClick, addButtonText
        } = this.props;
        const activeKey = this.state.activeKey;
        const tabsClassNames = classNames(prefixCls,
            `${prefixCls}-${size}`,
            `${prefixCls}-${type}`,
            className
        );
        const {
            newTitleChildren,
            newPaneChildren
        } = this.renderChildren();
        return (
            <div className={tabsClassNames}>
                <ScrollBar
                    content={newTitleChildren}
                    prefixCls={prefixCls}
                    showAdd={showAdd}
                    type={type}
                    onAdd={this.onAdd}
                    activeKey={activeKey}
                    showAddDisabled={showAddDisabled}
                    ref={this.getScrollBarRef}
                    onNextClick={onNextClick}
                    onPrevClick={onPrevClick}
                    addButtonText={addButtonText}
                />
                <ScrollContainer
                    content={newPaneChildren}
                    prefixCls={prefixCls}
                    title={newTitleChildren}
                    activeKey={activeKey}
                />
            </div>
        );
    }
}

polyfill(Tabs);

export default Tabs;
