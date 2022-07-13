import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {polyfill} from 'react-lifecycles-compat';

class Checkbox extends PureComponent {
    static propTypes ={
        prefixCls: PropTypes.string.isRequired,
        className: PropTypes.string,
        style: PropTypes.object,
        type: PropTypes.string,
        defaultChecked: PropTypes.bool,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        inputOriginProps: PropTypes.object
    }

    static defaultProps = {
        className: '',
        style: {},
        type: 'checkbox',
        defaultChecked: false,
        onFocus() {},
        onBlur() {},
        onChange() {}
    };

    constructor(props) {
        super(props);
        const checked = 'checked' in props ? props.checked : props.defaultChecked;
        this.state = {
            checked
        };
    }

    static getDerivedStateFromProps = nextProps => {
        if ('checked' in nextProps) {
            return {
                checked: nextProps.checked
            };
        }
        return null;
    }

    focus() {
        this.input.focus();
    }

    blur() {
        this.input.blur();
    }

    saveInput = node => {
        this.input = node;
    }

    onHandleChange = e => {
        const {disabled, onChange} = this.props;
        if (disabled) {
            return;
        }
        const checked = e.target.checked;
        if (!('checked' in this.props)) {
            this.setState({
                checked
            });
        }
        if (onChange) {
            onChange({
                target: {
                    ...this.props,
                    checked
                },
                stopPropagation() {
                    e.stopPropagation();
                },
                preventDefault() {
                    e.preventDefault();
                },
                nativeEvent: e.nativeEvent
            });
        }
    }

    render() {
        const {
            prefixCls,
            className,
            style,
            type,
            disabled,
            onClick,
            onFocus,
            onBlur,
            inputOriginProps
        } = this.props;
        const checked = this.state.checked;
        const classString = classNames(prefixCls, className, {
            [`${prefixCls}-checked`]: checked,
            [`${prefixCls}-disabled`]: disabled
        });
        return (
            <span className={classString} style={style}>
                <input
                    name={name}
                    type={type}
                    disabled={disabled}
                    className={`${prefixCls}-input`}
                    checked={!!checked}
                    onClick={onClick}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={this.onHandleChange}
                    ref={this.saveInput}
                    {...inputOriginProps}
                />
                <span className={`${prefixCls}-inner`} />
            </span>
        );
    }
}

polyfill(Checkbox);
export default Checkbox;
