import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../../button';

export default class UploaderAnchor extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
        loading: PropTypes.bool,
        prefixCls: PropTypes.string,
        disabled: PropTypes.bool,
        maxSize: PropTypes.number,
        helperTextPostion: PropTypes.string.isRequired
    }

    render() {
        const {onClick, loading, prefixCls, disabled, maxSize, helperTextPostion} = this.props;
        const buttonClassName = `${prefixCls}-anchor-file-button`;
        const buttonProps = {
            className: buttonClassName,
            onClick,
            loading,
            disabled,
            icon: 'upload'
        };
        const fileAnchorClassName = classNames(
            `${prefixCls}-anchor-file-container`,
            {
                [`${prefixCls}-anchor-file-container-${helperTextPostion}`]:
                    helperTextPostion === 'right' || helperTextPostion === 'bottom'
            }
        );
        return (
            <span className={fileAnchorClassName}>
                <Button {...buttonProps}>
                    文件上传
                </Button>
                {
                    maxSize ? (
                        <span className={`${prefixCls}-helper-text`}>
                            文件大小不超过
                            {maxSize / (1024 * 1024)}
                            MB
                        </span>
                    ) : null
                }
            </span>
        );
    }
}
