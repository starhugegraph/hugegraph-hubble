import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {polyfill} from 'react-lifecycles-compat';

class Switch extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        prefixCls: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        checkedChildren: PropTypes.node,
        unCheckedChildren: PropTypes.node,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        tabIndex: PropTypes.number,
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        style: PropTypes.object,
        loadingIcon: PropTypes.node
    }

    static defaultProps = {
        checkedChildren: null,
        unCheckedChildren: null,
        className: '',
        defaultChecked: false
    }

    constructor(props) {
        super(props);
        let checked = false;
        if ('checked' in props) {
            checked = !!props.checked;
        } else {
            checked = !!props.defaultChecked;
        }
        this.state = {
            checked
        };
    }

    static getDerivedStateFromProps = nextProps => {
        const newState = {};
        if ('checked' in nextProps) {
            newState.checked = !!nextProps.checked;
        }
        return newState;
    }

    setChecked(checked, e) {
        const {disabled, onChange} = this.props;
        if (disabled) {
            return;
        }
        if (!('checked' in this.props)) {
            this.setState({
                checked
            });
        }
        if (onChange) {
            onChange(checked, e);
        }
    }

    onHandleClick = e => {
        const checked = this.state.checked;
        const onClick = this.props.onClick;
        const newChecked = !checked;
        this.setChecked(newChecked, e);
        if (onClick) {
            onClick(newChecked, e);
        }
    };

    onHandleKeyDown = e => {
        if (e.keyCode === 37) {
            // Left
            this.setChecked(false, e);
        } else if (e.keyCode === 39) {
            // Right
            this.setChecked(true, e);
        }
    };

    saveRef = ref => {
        this.switchRef = ref;
    }

    focus() {
        if (this.switchRef) {
            this.switchRef.focus();
        }
    }

    blur() {
        if (this.switchRef) {
            this.switchRef.blur();
        }
    }

    render() {
        const {
            className,
            prefixCls,
            disabled,
            loadingIcon,
            checkedChildren,
            unCheckedChildren,
            onChange,
            ...restProps
        } = this.props;
        const checked = this.state.checked;
        const switchClassName = classNames(prefixCls, {
            [`${prefixCls}-checked`]: checked,
            [`${prefixCls}-disabled`]: disabled
        }, className);
        return (
            <button
                {...restProps}
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                className={switchClassName}
                onKeyDown={this.onHandleKeyDown}
                onClick={this.onHandleClick}
                ref={this.saveRef}
            >
                {loadingIcon}
                <span className={`${prefixCls}-inner`}>
                    {checked ? checkedChildren : unCheckedChildren}
                </span>
            </button>
        );
    }

}

polyfill(Switch);

export default Switch;
