import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import omit from 'omit.js';
import {polyfill} from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import Icon from '../icon';

class Tag extends PureComponent {
    static propTypes = {
        /**
         * tag类名前缀
         */
        prefixCls: PropTypes.string,
        /**
         * 自定义tag类名
         */
        className: PropTypes.string,
        /**
         * tag是否可以关闭
         */
        closable: PropTypes.bool,
        /**
         * tag点击关闭时的回调
         */
        onClose: PropTypes.func,
        /**
         * 自定义tag的样式
         */
        style: PropTypes.object,
        /**
         * tag的children
         */
        children: PropTypes.any,
        /**
         * 自定义tag的颜色
         */
        color: PropTypes.string,
        /**
         * 尺寸
         */
        size: PropTypes.oneOf(['small', 'medium']),
        disabled: PropTypes.bool,
        /**
         * 以下是可点击的tag属性(选中)
         */
        /**
         * 是否可点击
         */
        checkable: PropTypes.bool,
        /**
         * checkable为true的时候的回调函数，暴露checked
         */
        onChange: PropTypes.func,
        /**
         * checked 是否被选中，checkable为true的时候才生效
         */
        checked: PropTypes.bool

    }

    static defaultProps = {
        prefixCls: 'new-fc-one-tag',
        closable: false,
        size: 'small',
        disabled: false,
        checkable: false,
        onChange() {}
    };

    constructor(props) {
        super(props);
        this.state = {
            closed: false,
            checked: props.checked
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if ('checked' in nextProps
        && nextProps.checked !== prevState.checked) {
            return {
                checked: nextProps.checked
            };
        }
        return null;
    }

    close = e => {
        const onClose = this.props.onClose;
        if (onClose) {
            onClose(e);
        }
        if (e.defaultPrevented) {
            return;
        }
        const dom = ReactDOM.findDOMNode(this);
        dom.style.width = `${dom.getBoundingClientRect().width}px`;
        this.setState({
            closed: true
        });
    }

    isPresetColor = color => {
        if (!color) {
            return false;
        }
        return /^(pink|red|yellow|orange|cyan|green|blue|purple)(-inverse)?$/.test(color);
    }

    onClickTag = () => {
        const checked = !this.state.checked;
        const {onChange, disabled} = this.props;
        if (disabled) {
            return;
        }
        if (!('checked' in this.props)) {
            this.setState({
                checked
            });
        }
        onChange(checked);
    }

    render() {
        const {
            prefixCls,
            closable,
            className,
            children,
            style,
            color,
            size,
            disabled,
            checkable,
            ...otherProps
        } = this.props;
        const checked = checkable && this.state.checked;
        const closeIcon = closable ? <Icon type="close" onClick={this.close} /> : '';
        const isPresetColor = this.isPresetColor(color);
        const classString = classNames(prefixCls, className, `${prefixCls}-${size}`, {
            [`${prefixCls}-${color}`]: isPresetColor,
            [`${prefixCls}-has-color`]: (color && !isPresetColor),
            [`${prefixCls}-can-closable`]: closable,
            [`${prefixCls}-inverse`]: checked,
            [`${prefixCls}-${color}-inverse`]: checked && isPresetColor,
            [`${prefixCls}-checkable`]: checkable,
            [`${prefixCls}-disabled`]: disabled
        });
        const divProps = omit(otherProps, [
            'onClose'
        ]);
        if (checkable) {
            divProps.onClick = this.onClickTag;
        }
        const tagStyle = {
            backgroundColor: (color && !isPresetColor) ? color : null,
            ...style
        };
        const tag = this.state.closed ? null : (
            <div
                data-show={!this.state.closed}
                {...divProps}
                className={classString}
                style={tagStyle}
            >
                <span className={`${prefixCls}-text`}>{children}</span>
                {closeIcon}
            </div>
        );
        return tag;
    }
}

polyfill(Tag);

export default Tag;
