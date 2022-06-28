import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import {IconCheck, IconClose} from '@baidu/one-ui-icon';
import {transSizeOfDefault} from '../../core/commonTools';
import CommonSwitch from './common/switch';

export default class Switch extends PureComponent {
    static propTypes = {
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 开关的样式 */
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        /** 自定义类名 */
        className: PropTypes.string,
        /** 是否loading */
        loading: PropTypes.bool,
        /** 当前是否被选中 */
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        /** 变化时回调 */
        onChange: PropTypes.func,
        /** disabled */
        disabled: PropTypes.bool,
        /** 内部是否带图标 */
        showInnerIcon: PropTypes.bool,
        /** 内部是否带文字 */
        showInnerLabel: PropTypes.bool,
        checkedChildren: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        unCheckedChildren: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-switch',
        loading: false,
        size: 'medium',
        showInnerIcon: false,
        showInnerLabel: false
    }

    focus() {
        this.rcSwitch.focus();
    }

    blur() {
        this.rcSwitch.blur();
    }

    saveSwitch = node => {
        this.rcSwitch = node;
    }

    render() {
        const {prefixCls, loading, className = '', checkedChildren, unCheckedChildren, showInnerIcon, showInnerLabel} = this.props;
        const size = transSizeOfDefault(this.props.size, 'medium');
        const classes = classNames(className, {
            [`${prefixCls}-${size}`]: size,
            [`${prefixCls}-loading`]: loading
        });
        let defaultCheckedChildren = checkedChildren;
        let defaultUnCheckedChildren = unCheckedChildren;
        if (showInnerIcon) {
            if (!checkedChildren) {
                defaultCheckedChildren = <IconCheck className={`${prefixCls}-checked-icon`} />;
            }
            if (!unCheckedChildren) {
                defaultUnCheckedChildren = <IconClose className={`${prefixCls}-closed-icon`} />;
            }
        } else if (showInnerLabel) {
            if (!checkedChildren) {
                defaultCheckedChildren = '开';
            }
            if (!unCheckedChildren) {
                defaultUnCheckedChildren = '关';
            }
        }
        let otherProps = {
            className: classes,
            ref: this.saveSwitch
        };
        if (defaultCheckedChildren && defaultUnCheckedChildren && size === 'large') {
            otherProps = {
                ...otherProps,
                checkedChildren: defaultCheckedChildren,
                unCheckedChildren: defaultUnCheckedChildren
            };
        }
        return (
            <CommonSwitch
                {...omit(this.props, ['loading', 'showInnerLabel', 'showInnerIcon', 'size'])}
                {...otherProps}
            />
        );
    }
}
