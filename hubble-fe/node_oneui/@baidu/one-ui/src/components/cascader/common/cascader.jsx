import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import KeyCode from 'rc-util/lib/KeyCode';
import arrayTreeFilter from 'array-tree-filter';
import shallowEqual from 'shallowequal';
import Menus from './menus';

const BUILT_IN_PLACEMENTS = {
    bottomLeft: {
        points: ['tl', 'bl'],
        offset: [0, 4],
        overflow: {
            adjustX: 1,
            adjustY: 1
        }
    },
    topLeft: {
        points: ['bl', 'tl'],
        offset: [0, -4],
        overflow: {
            adjustX: 1,
            adjustY: 1
        }
    },
    bottomRight: {
        points: ['tr', 'br'],
        offset: [0, 4],
        overflow: {
            adjustX: 1,
            adjustY: 1
        }
    },
    topRight: {
        points: ['br', 'tr'],
        offset: [0, -4],
        overflow: {
            adjustX: 1,
            adjustY: 1
        }
    }
};

export default class CascaderComponent extends Component {
    static propTypes = {
        value: PropTypes.array,
        defaultValue: PropTypes.array,
        options: PropTypes.array,
        onChange: PropTypes.func,
        onPopupVisibleChange: PropTypes.func,
        popupVisible: PropTypes.bool,
        disabled: PropTypes.bool,
        transitionName: PropTypes.string,
        popupClassName: PropTypes.string,
        popupPlacement: PropTypes.string,
        prefixCls: PropTypes.string,
        dropdownMenuColumnStyle: PropTypes.object,
        builtinPlacements: PropTypes.object,
        loadData: PropTypes.func,
        changeOnSelect: PropTypes.bool,
        children: PropTypes.node,
        onKeyDown: PropTypes.func,
        expandTrigger: PropTypes.string,
        fieldNames: PropTypes.object,
        expandIcon: PropTypes.node,
        loadingIcon: PropTypes.node
    }

    static defaultProps = {
        onChange() {},
        onPopupVisibleChange() {},
        disabled: false,
        transitionName: '',
        prefixCls: 'new-fc-one-cascader',
        popupClassName: '',
        popupPlacement: 'bottomLeft',
        builtinPlacements: BUILT_IN_PLACEMENTS,
        expandTrigger: 'click',
        fieldNames: {label: 'label', value: 'value', children: 'children', icon: 'icon'},
        expandIcon: '>',
        options: []
    }

    constructor(props) {
        super(props);
        let initialValue = [];
        if ('value' in props) {
            initialValue = props.value || [];
        } else if ('defaultValue' in props) {
            initialValue = props.defaultValue || [];
        }
        this.state = {
            popupVisible: props.popupVisible,
            activeValue: initialValue,
            value: initialValue,
            prevProps: props
        };
        this.defaultFieldNames = {label: 'label', value: 'value', children: 'children'};
    }

    componentWillReceiveProps(nextProps) {
        const {prevProps = {}} = this.state;
        const newState = {
            prevProps: nextProps
        };
        if ('value' in nextProps && !shallowEqual(prevProps.value, nextProps.value)) {
            newState.value = nextProps.value || [];
            if (!('loadData' in nextProps)) {
                newState.activeValue = nextProps.value || [];
            }
        }
        if ('popupVisible' in nextProps) {
            newState.popupVisible = nextProps.popupVisible;
        }
        this.setState(newState);
    }

    getPopupDOMNode() {
        return this.trigger.getPopupDomNode();
    }

    getFieldName(name) {
        const {defaultFieldNames} = this;
        const fieldNames = this.props.fieldNames;
        return fieldNames[name] || defaultFieldNames[name];
    }

    getFieldNames() {
        const fieldNames = this.props.fieldNames;
        return fieldNames;
    }

    getCurrentLevelOptions() {
        const {options = []} = this.props;
        const {activeValue = []} = this.state;
        const result = arrayTreeFilter(
            options,
            (o, level) => o[this.getFieldName('value')] === activeValue[level],
            {childrenKeyName: this.getFieldName('children')}
        );
        if (result[result.length - 2]) {
            return result[result.length - 2][this.getFieldName('children')];
        }
        return [...options].filter(o => !o.disabled);
    }

    getActiveOptions(activeValue) {
        return arrayTreeFilter(
            this.props.options || [],
            (o, level) => o[this.getFieldName('value')] === activeValue[level],
            {childrenKeyName: this.getFieldName('children')}
        );
    }

    setPopupVisible = popupVisible => {
        if (!('popupVisible' in this.props)) {
            this.setState({popupVisible});
        }
        // sync activeValue with value when panel open
        if (popupVisible && !this.state.popupVisible) {
            this.setState(({value}) => ({activeValue: value}));
        }
        this.props.onPopupVisibleChange(popupVisible);
    };

    handleChange = (options, setProps, e) => {
        if (e.type !== 'keydown' || e.keyCode === KeyCode.ENTER) {
            this.props.onChange(options.map(o => o[this.getFieldName('value')]), options);
            this.setPopupVisible(setProps.visible);
        }
    };

    handlePopupVisibleChange = popupVisible => {
        this.setPopupVisible(popupVisible);
    };

    handleMenuSelect = (targetOption, menuIndex, e) => {
        // Keep focused state for keyboard support
        const triggerNode = this.trigger.getRootDomNode();
        if (triggerNode && triggerNode.focus) {
            triggerNode.focus();
        }
        const {changeOnSelect, loadData, expandTrigger} = this.props;
        if (!targetOption || targetOption.disabled) {
            return;
        }
        let activeValue = this.state.activeValue;
        activeValue = activeValue.slice(0, menuIndex + 1);
        activeValue[menuIndex] = targetOption[this.getFieldName('value')];
        const activeOptions = this.getActiveOptions(activeValue);
        if (targetOption.isLeaf === false && !targetOption[this.getFieldName('children')] && loadData) {
            if (changeOnSelect) {
                this.handleChange(activeOptions, {visible: true}, e);
            }
            this.setState({activeValue});
            loadData(activeOptions);
            return;
        }
        const newState = {};
        if (
            !targetOption[this.getFieldName('children')]
            || !targetOption[this.getFieldName('children')].length
        ) {
            this.handleChange(activeOptions, {visible: false}, e);
            // set value to activeValue when select leaf option
            newState.value = activeValue;
            // add e.type judgement to prevent `onChange` being triggered by mouseEnter
        } else if (changeOnSelect && (e.type === 'click' || e.type === 'keydown')) {
            if (expandTrigger === 'hover') {
                this.handleChange(activeOptions, {visible: false}, e);
            } else {
                this.handleChange(activeOptions, {visible: true}, e);
            }
            // set value to activeValue on every select
            newState.value = activeValue;
        }
        newState.activeValue = activeValue;
        //  not change the value by keyboard
        if ('value' in this.props || (e.type === 'keydown' && e.keyCode !== KeyCode.ENTER)) {
            delete newState.value;
        }
        this.setState(newState);
    }

    handleItemDoubleClick = () => {
        const changeOnSelect = this.props.changeOnSelect;
        if (changeOnSelect) {
            this.setPopupVisible(false);
        }
    };

    handleKeyDown = e => {
        const {children} = this.props;
        if (children && children.props.onKeyDown) {
            children.props.onKeyDown(e);
            return;
        }
        const activeValue = [...this.state.activeValue];
        const currentLevel = activeValue.length - 1 < 0 ? 0 : activeValue.length - 1;
        const currentOptions = this.getCurrentLevelOptions();
        const currentIndex = currentOptions
            .map(o => o[this.getFieldName('value')])
            .indexOf(activeValue[currentLevel]);
        if (
            e.keyCode !== KeyCode.DOWN
            && e.keyCode !== KeyCode.UP
            && e.keyCode !== KeyCode.ENTER
            && e.keyCode !== KeyCode.ESC
        ) {
            return;
        }
        // Press any keys above to reopen menu
        if (
            !this.state.popupVisible
            && e.keyCode !== KeyCode.ESC
        ) {
            this.setPopupVisible(true);
            return;
        }
        if (e.keyCode === KeyCode.DOWN || e.keyCode === KeyCode.UP) {
            e.preventDefault();
            let nextIndex = currentIndex;
            if (nextIndex !== -1) {
                if (e.keyCode === KeyCode.DOWN) {
                    nextIndex += 1;
                    nextIndex = nextIndex >= currentOptions.length ? 0 : nextIndex;
                } else {
                    nextIndex -= 1;
                    nextIndex = nextIndex < 0 ? currentOptions.length - 1 : nextIndex;
                }
            } else {
                nextIndex = 0;
            }
            activeValue[currentLevel] = currentOptions[nextIndex][this.getFieldName('value')];
        } else if (e.keyCode === KeyCode.ESC) {
            this.setPopupVisible(false);
            return;
        }
        if (!activeValue || activeValue.length === 0) {
            this.setPopupVisible(false);
        }
        const activeOptions = this.getActiveOptions(activeValue);
        const targetOption = activeOptions[activeOptions.length - 1];
        this.handleMenuSelect(targetOption, activeOptions.length - 1, e);
        if (this.props.onKeyDown) {
            this.props.onKeyDown(e);
        }
    }

    saveTrigger = node => {
        this.trigger = node;
    };

    render() {
        const {
            prefixCls,
            transitionName,
            popupClassName,
            options = [],
            disabled,
            builtinPlacements,
            popupPlacement,
            children,
            ...restProps
        } = this.props;
        let menus = <div />;
        let emptyMenuClassName = '';
        if (options && options.length > 0) {
            menus = (
                <Menus
                    {...this.props}
                    fieldNames={this.getFieldNames()}
                    defaultFieldNames={this.defaultFieldNames}
                    activeValue={this.state.activeValue}
                    onSelect={this.handleMenuSelect}
                    onItemDoubleClick={this.handleItemDoubleClick}
                    visible={this.state.popupVisible}
                />
            );
        } else {
            emptyMenuClassName = ` ${prefixCls}-menus-empty`;
        }
        return (
            <Trigger
                ref={this.saveTrigger}
                {...restProps}
                options={options}
                disabled={disabled}
                popupPlacement={popupPlacement}
                builtinPlacements={builtinPlacements}
                popupTransitionName={transitionName}
                action={disabled ? [] : ['click']}
                popupVisible={disabled ? false : this.state.popupVisible}
                onPopupVisibleChange={this.handlePopupVisibleChange}
                prefixCls={`${prefixCls}-menus`}
                popupClassName={popupClassName + emptyMenuClassName}
                popup={menus}
            >
                {cloneElement(children, {
                    onKeyDown: this.handleKeyDown,
                    tabIndex: disabled ? undefined : 0
                })}
            </Trigger>
        );
    }
}
