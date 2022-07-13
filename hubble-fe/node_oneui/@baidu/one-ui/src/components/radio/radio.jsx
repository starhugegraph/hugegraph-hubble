/**
 * @file 单选
 * @author shanqianmin
 * @date 2018/08/23
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import {transSizeOfDefault} from '../../core/commonTools';
import CommonCheckbox from '../checkbox/common/checkbox';

export default class Radio extends Component {
    static propTypes = {
        type: PropTypes.string,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        checked: PropTypes.bool,
        style: PropTypes.object,
        disabled: PropTypes.bool,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        value: PropTypes.any,
        name: PropTypes.string,
        children: PropTypes.node,
        direction: PropTypes.string, // 水平方向row还是垂直方向column,
        size: PropTypes.oneOf(['small', 'medium'])
    };

    static contextTypes = {
        radioGroup: PropTypes.any
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-radio',
        type: 'radio',
        direction: 'row'
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !shallowEqual(this.props, nextProps)
            || !shallowEqual(this.state, nextState)
            || !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
    }

    render() {
        const {props, context} = this;
        const {
            prefixCls,
            className,
            children,
            style,
            direction,
            size,
            ...restProps
        } = props;
        const radioGroup = context.radioGroup;
        const radioProps = {...restProps};
        if (radioGroup) {
            const {value, disabled} = radioGroup;
            radioProps.name = radioGroup.name;
            radioProps.onChange = radioGroup.onChange;
            radioProps.checked = value != null ? props.value === value : props.checked;
            radioProps.disabled = props.disabled || disabled;
        }
        const {checked, disabled} = radioProps;
        let newSize = size || 'medium';
        newSize = transSizeOfDefault(newSize, 'medium');
        const wrapperClassString = classNames(className, `${prefixCls}-wrapper-${newSize}`, {
            [`${prefixCls}-wrapper`]: true,
            [`${prefixCls}-wrapper-checked`]: checked,
            [`${prefixCls}-wrapper-disabled`]: disabled,
            [`${prefixCls}-wrapper-checked-disabled`]: checked && disabled,
            [`${prefixCls}-wrapper-${direction}`]: direction
        });

        return (
            <label
                className={wrapperClassString}
                style={style}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
            >
                <CommonCheckbox
                    {...radioProps}
                    prefixCls={prefixCls}
                />
                {children != null ? <span>{children}</span> : null}
            </label>
        );
    }
}
