/**
 * @file 单选组
 * @author shanqianmin
 * @date 2018/08/23
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Radio from './radio';
import {transSizeOfDefault} from '../../core/commonTools';
import {getCheckedValue, getRealValue} from '../../core/radioAndCheckboxTools';

const CheckboxValueType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);

const CheckboxOptionType = PropTypes.shape({
    label: PropTypes.string,
    value: CheckboxValueType,
    disabled: PropTypes.bool
});

export default class RadioGroup extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.oneOfType([
            CheckboxOptionType,
            PropTypes.string
        ])),
        disabled: PropTypes.bool,
        style: PropTypes.object,
        value: PropTypes.any,
        onChange: PropTypes.func,
        size: PropTypes.oneOf(['medium', 'small']),
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        name: PropTypes.string,
        children: PropTypes.node,
        direction: PropTypes.string, // 水平方向row还是垂直方向column
        radioPrefixCls: PropTypes.string
    };

    static childContextTypes = {
        radioGroup: PropTypes.any
    };

    static defaultProps = {
        disabled: false,
        prefixCls: 'new-fc-one-radio-group',
        className: '',
        direction: 'row',
        size: 'medium',
        radioPrefixCls: 'new-fc-one-radio'
    };

    constructor(props) {
        super(props);
        this.state = {
            value: getRealValue(props, true)
        };
    }

    getChildContext() {
        const {disabled, name} = this.props;
        return {
            radioGroup: {
                onChange: this.onRadioChange,
                value: this.state.value,
                disabled,
                name
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        const {value, children} = nextProps;
        const newValue = value == null ? getCheckedValue(children)[0] : value;
        if (newValue != null && this.state.value !== newValue) {
            this.setState({
                value
            });
        }
    }

    onRadioChange = ev => {
        const lastValue = this.state.value;
        const newValue = ev.target.value;
        if (newValue !== lastValue) {
            const {value, onChange} = this.props;
            if (value == null) {
                this.setState({
                    value: newValue
                });
            }
            if (onChange) {
                onChange(ev);
            }
        }
    }

    render() {
        const {
            prefixCls,
            className,
            options,
            disabled,
            style,
            onMouseEnter,
            onMouseLeave,
            direction,
            radioPrefixCls
        } = this.props;
        let children = this.props.children;
        const value = this.state.value;
        const size = transSizeOfDefault(this.props.size, 'small');
        const classString = classNames(prefixCls, {
            [`${prefixCls}-${size}`]: size,
            [`${prefixCls}-${direction}`]: direction
        }, className);

        // 如果存在 options, 优先使用
        if (options && options.length > 0) {
            children = options.map((option, index) => {
                if (typeof option === 'string') { // 此处类型自动推导为 string
                    option = {label: option, value: option};
                }
                const {value: optionValue, disabled: optionDisabled, label} = option;
                // 此处类型自动推导为 { label: string, value: string }
                return (
                    <Radio
                        key={index}
                        disabled={optionDisabled || disabled}
                        value={optionValue}
                        onChange={this.onRadioChange}
                        checked={value === optionValue}
                        size={size}
                        prefixCls={radioPrefixCls}
                    >
                        {label}
                    </Radio>
                );
            });
        }

        return (
            <div
                className={classString}
                style={style}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {children}
            </div>
        );
    }
}
