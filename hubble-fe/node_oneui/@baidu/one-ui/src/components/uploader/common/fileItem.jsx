import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import partial from 'lodash/partial';
import Icon from '../../icon';
import Progress from '../../progress';
import Popover from '../../popover';
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
        index: PropTypes.number.isRequired
    }

    render() {
        const {prefixCls, status, name, progressStep, errorMessage, onRemove, index} = this.props;
        const itemClassNames = classNames(`${prefixCls}-file-item`, `${prefixCls}-file-item-${status}`);
        let flagIcon = null;
        if (status === originStatus.SUCCESS) {
            flagIcon = <Icon className={`${prefixCls}-file-item-success-icon`} type="success" />;
        } else if (status === originStatus.ERROR) {
            flagIcon = <Icon className={`${prefixCls}-file-item-fail-icon`} type="fail" />;
        }
        const item = (
            <div className={itemClassNames}>
                <Icon className={`${prefixCls}-file-item-file-icon`} type="file" />
                {name}
                {
                    status === originStatus.UPLOADING
                        ? <Progress size="small" percent={progressStep} showInfo={false} className={`${prefixCls}-file-item-progress`} />
                        : null
                }
                <span className={`${prefixCls}-file-item-flag`}>
                    {flagIcon}
                </span>
                <span className={`${prefixCls}-file-item-close`} onClick={partial(onRemove, index)}>
                    <Icon className={`${prefixCls}-file-item-close-icon`} type="close" />
                </span>
            </div>
        );
        return status === originStatus.ERROR && errorMessage && errorMessage.length ? (
            <Popover content={errorMessage.join('，')} overlayClassName={`${prefixCls}-file-item-popover`}>
                {item}
            </Popover>
        ) : item;
    }
}
