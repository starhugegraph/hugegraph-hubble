import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    IconImageAdd,
    IconEye,
    IconTrash,
    IconUpload
} from '@baidu/one-ui-icon';
import partial from 'lodash/partial';
import Progress from '../../progress';
import Popover from '../../popover';
import Icon from '../../icon';
import {
    originStatus
} from '../../../core/uploaderTools';

export default class FileItem extends PureComponent {
    static propTypes = {
        status: PropTypes.string,
        errorMessage: PropTypes.array,
        name: PropTypes.string,
        progressStep: PropTypes.number,
        onRemove: PropTypes.func.isRequired,
        prefixCls: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        thumbUrl: PropTypes.string,
        customUploadListIcon: PropTypes.node,
        onPreview: PropTypes.func.isRequired,
        onReUpload: PropTypes.func.isRequired,
        showUploadListIcon: PropTypes.object
    }

    static defaultProps = {
        thumbUrl: ''
    }

    render() {
        const {
            prefixCls, status, name, progressStep, thumbUrl, customUploadListIcon,
            errorMessage, onRemove, index, onPreview, onReUpload, showUploadListIcon
        } = this.props;
        const itemClassNames = classNames(`${prefixCls}-image-item`, `${prefixCls}-image-item-${status}`);
        const showPreview = status === originStatus.SUCCESS && thumbUrl && showUploadListIcon && showUploadListIcon.showPreviewIcon;
        const showReUpload = (status === originStatus.SUCCESS || status === originStatus.ERROR) && showUploadListIcon && showUploadListIcon.showReUploadIcon;
        const showDelete = showUploadListIcon && showUploadListIcon.showRemoveOnIcon;
        const iconContainer = customUploadListIcon || (
            <div className={classNames(`${prefixCls}-image-item-card-operation`,
                {
                    [`${prefixCls}-image-item-card-operation-hide`]: !(showPreview || showReUpload || showDelete)
                })}
            >
                <div className={`${prefixCls}-image-item-card-operation-mask`} />
                <div className={`${prefixCls}-image-item-card-operation-icons`}>
                    {
                        showPreview ? (
                            <IconEye onClick={partial(onPreview, index)}/>
                        ) : null
                    }
                    {
                        showReUpload ? (
                            <IconUpload onClick={partial(onReUpload, index)} />
                        ) : null
                    }
                    {
                        showDelete ? (
                            <IconTrash onClick={partial(onRemove, index)}/>
                        ) : null
                    }
                </div>
            </div>
        );
        return (
            <div className={itemClassNames}>
                <div className={classNames(`${prefixCls}-image-item-card`, {
                    [`${prefixCls}-image-item-card-hide`]: !(showPreview || showReUpload || showDelete)
                })}
                >
                    {
                        status === originStatus.WAITING || status === originStatus.ERROR ? (
                            <IconImageAdd />
                        ) : null
                    }
                    {
                        status === originStatus.UPLOADING ? (
                            <div className={`${prefixCls}-image-item-uploading-container`}>
                                <div className={`${prefixCls}-image-item-uploading-text`}>上传中</div>
                                <Progress size="small" percent={progressStep} showInfo={false} className={`${prefixCls}-image-item-progress`} />
                            </div>
                        ) : null
                    }
                    {
                        status === originStatus.SUCCESS ? (
                            <span className={`${prefixCls}-image-item-thumbUrl`}>
                                {
                                    thumbUrl ? (
                                        <img src={thumbUrl} alt={name} className={`${prefixCls}-image-item-thumbUrl-image`} />
                                    ) : <IconImageAdd />
                                }
                            </span>
                        ) : null
                    }
                    {iconContainer}
                </div>
                {
                    errorMessage && errorMessage.length ? (
                        <div className={`${prefixCls}-image-item-error-message`}>
                            <span className={`${prefixCls}-image-item-error-message-tip`}>
                                上传失败原因
                            </span>
                            <Popover content={errorMessage.join('，')} overlayClassName={`${prefixCls}-file-item-popover`}>
                                <Icon type="question" />
                            </Popover>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}
