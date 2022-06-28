import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import {transSizeOfDefault} from '../../core/commonTools';
import CommoneCheckbox from './common/checkbox';

export default class Checkbox extends Component {
    static propTypes = {
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        size: PropTypes.oneOf(['medium', 'small']), // size不能有默认值，否则就没办法确认这个size是来自checkbox还是来自group
        /** 自定义类名 */
        className: PropTypes.string,
        /** 自定义选中或者不选中 */
        checked: PropTypes.bool,
        /** 自定义style */
        style: PropTypes.object,
        /** 失效状态 */
        disabled: PropTypes.bool,
        /** 变化时候的回调 */
        onChange: PropTypes.func,
        /** 鼠标移入触发 */
        onMouseEnter: PropTypes.func,
        /** 鼠标移出触发 */
        onMouseLeave: PropTypes.func,
        /** optionGroup下指定选中的选项 */
        value: PropTypes.any,
        /** children Node */
        children: PropTypes.node,
        /** 设置 indeterminate 状态，只负责样式控制 */
        indeterminate: PropTypes.bool,
        direction: PropTypes.string, // 水平方向row还是垂直方向column
        /** checkbox 的mode, 内部使用，basic为普通多选，strong为加强多选 */
        mode: PropTypes.oneOf(['basic', 'strong'])
    };

    static contextTypes = {
        checkboxGroup: PropTypes.any
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-checkbox',
        indeterminate: false,
        direction: 'row',
        mode: 'basic'
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !shallowEqual(this.props, nextProps)
            || !shallowEqual(this.state, nextState)
            || !shallowEqual(this.context.checkboxGroup, nextContext.checkboxGroup);
    }

    render() {
        const {props, context} = this;
        const {
            prefixCls,
            className,
            children,
            indeterminate,
            style,
            onMouseEnter,
            onMouseLeave,
            direction,
            size,
            mode,
            ...restProps
        } = props;
        const {checkboxGroup} = context;
        const checkboxProps = {...restProps};
        let realSize = size;
        if (checkboxGroup) {
            const {value, disabled, checked} = props;
            const {toggleOption, value: checkboxValue, disabled: checkboxDisabled, size: groupSize} = checkboxGroup;
            realSize = realSize || groupSize;
            checkboxProps.onChange = () => toggleOption({label: children, value});
            checkboxProps.checked = checkboxValue != null ? checkboxValue.indexOf(value) !== -1 : checked;
            checkboxProps.disabled = disabled || checkboxDisabled;
        }
        realSize = transSizeOfDefault(realSize, 'medium');
        const wrapperClass = `${prefixCls}-wrapper`;
        const {checked, disabled} = checkboxProps;
        const classString = classNames({
            [`${wrapperClass}`]: true,
            [`${wrapperClass}-checked`]: checked,
            [`${wrapperClass}-disabled`]: disabled,
            [`${wrapperClass}-checked-disabled`]: checked && disabled,
            [`${wrapperClass}-${direction}`]: direction,
            [`${wrapperClass}-${realSize}`]: realSize
        }, className);
        const checkboxClass = classNames({
            [`${prefixCls}-indeterminate`]: indeterminate
        });
        const itemProps = {
            className: classNames(
                `${prefixCls}-item`,
            )
        };
        const otherProps = {};
        if (mode === 'strong') {
            otherProps.tabIndex = disabled ? -1 : 0;
        }
        return (
            <label
                className={classString}
                style={style}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                {...otherProps}
            >
                <CommoneCheckbox
                    {...checkboxProps}
                    prefixCls={prefixCls}
                    className={checkboxClass}
                />
                {children != null ? <span {...itemProps}>{children}</span> : null}
                {
                    mode === 'strong' && <i className={`${wrapperClass}-strong-icon`} />
                }
            </label>
        );
    }
}
