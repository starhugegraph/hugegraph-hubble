import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {IconImageAdd} from '@baidu/one-ui-icon';
import Loading from '../../loading';

const noop = () => {};

export default class UploaderAnchor extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
        loading: PropTypes.bool,
        prefixCls: PropTypes.string,
        disabled: PropTypes.bool
    }

    render() {
        const {onClick, loading, prefixCls, disabled} = this.props;
        const buttonClassName = classNames(
            `${prefixCls}-anchor-image-button`,
            {
                [`${prefixCls}-anchor-image-button-loading`]: loading,
                [`${prefixCls}-anchor-image-button-disabled`]: disabled
            }
        );
        const buttonProps = {
            className: buttonClassName,
            onClick: (disabled || loading) ? noop : onClick
        };
        return (
            <div {...buttonProps}>
                {
                    loading ? <Loading type="strong" /> : <IconImageAdd />
                }
            </div>
        );
    }
}
