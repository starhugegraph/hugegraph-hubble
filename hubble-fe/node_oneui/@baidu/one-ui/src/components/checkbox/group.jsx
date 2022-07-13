import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from './checkbox';
import {getRealValue} from '../../core/radioAndCheckboxTools';
import {transSizeOfDefault} from '../../core/commonTools';

const CheckboxValueType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);

const CheckboxOptionType = PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    value: CheckboxValueType,
    disabled: PropTypes.bool
});

export default class CheckboxGroup extends PureComponent {
    static propTypes = {
        value: PropTypes.arrayOf(CheckboxValueType),
        onChange: PropTypes.func,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.oneOfType([
            CheckboxOptionType,
            PropTypes.string
        ])),
        size: PropTypes.oneOf(['small', 'medium']),
        disabled: PropTypes.bool,
        children: PropTypes.node,
        direction: PropTypes.string, // 水平方向row还是垂直方向column
        checkboxPrefixCls: PropTypes.string
    };

    static childContextTypes = {
        checkboxGroup: PropTypes.any
    };

    static defaultProps = {
        options: [],
        prefixCls: 'new-fc-one-checkbox-group',
        direction: 'row',
        size: 'medium',
        checkboxPrefixCls: 'new-fc-one-checkbox'
    };

    constructor(props) {
        super(props);
        this.state = {
            value: getRealValue(props)
        };
    }

    getChildContext() {
        return {
            checkboxGroup: {
                toggleOption: this.toggleOption,
                value: this.state.value,
                disabled: this.props.disabled,
                size: this.props.size
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        const value = nextProps.value;
        if (value != null) {
            this.setState({value});
        }
    }

    getOptions() {
        return this.props.options.map(option => {
            if (typeof option === 'string') {
                return {
                    label: option,
                    value: option
                };
            }
            return option;
        });
    }

    toggleOption = option => {
        const stateValue = this.state.value || [];
        const optionValue = option.value;
        const optionIndex = stateValue.indexOf(optionValue);
        const value = [...stateValue];
        if (optionIndex === -1) {
            value.push(optionValue);
        } else {
            value.splice(optionIndex, 1);
        }
        const {value: propsValue, onChange} = this.props;
        if (propsValue == null) {
            this.setState({value});
        }
        if (onChange) {
            onChange(value);
        }
    };

    render() {
        const {
            prefixCls, className, options,
            disabled, direction, size, checkboxPrefixCls
        } = this.props;
        let children = this.props.children;
        if (options && options.length > 0) {
            children = this.getOptions().map(option => {
                const {value, label, disabled: optionDisable} = option;
                const stateValue = this.state.value || [];
                return (
                    <Checkbox
                        key={value}
                        disabled={optionDisable != null ? optionDisable : disabled}
                        value={value}
                        checked={stateValue.indexOf(value) !== -1}
                        onChange={() => this.toggleOption(option)}
                        className={`${prefixCls}-item`}
                        prefixCls={checkboxPrefixCls}
                    >
                        {label}
                    </Checkbox>
                );
            });
        }
        const newSize = transSizeOfDefault(size, 'medium');
        const classString = classNames(
            prefixCls,
            className,
            {
                [`${prefixCls}-${newSize}`]: newSize,
                [`${prefixCls}-${direction}`]: direction
            }
        );
        return (
            <div className={classString}>
                {children}
            </div>
        );
    }
}
