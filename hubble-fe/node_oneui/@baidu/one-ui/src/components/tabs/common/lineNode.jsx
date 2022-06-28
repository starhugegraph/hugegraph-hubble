import React, {PureComponent} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {IconClose} from '@baidu/one-ui-icon';

export default class LineNode extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string.isRequired,
        size: PropTypes.oneOf(['small', 'medium']).isRequired,
        activeKey: PropTypes.string,
        currentKey: PropTypes.string,
        tab: PropTypes.node.isRequired,
        Icon: PropTypes.node,
        closable: PropTypes.bool,
        disabled: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired
    }

    static defaultProps = {
        Icon: null,
        closable: false,
        disabled: false
    }

    render() {
        const {
            prefixCls, size, activeKey, currentKey,
            tab, Icon, closable, disabled, onClick, onDelete
        } = this.props;
        const tabClassName = classNames(`${prefixCls}-title`, {
            [`${prefixCls}-title-is-active`]: activeKey && activeKey === currentKey,
            [`${prefixCls}-title-disabled`]: disabled,
            [`${prefixCls}-title-has-icon`]: Icon,
            [`${prefixCls}-title-closable`]: closable
        }, [`${prefixCls}-title-${size}`]);
        return (
            <span className={tabClassName} onClick={onClick}>
                {Icon || null}
                <span className={`${prefixCls}-title-inline-text`}>{tab}</span>
                {closable ? (
                    <IconClose onClick={onDelete}/>
                ) : null}
            </span>
        );
    }
}
