import React, {PureComponent} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ImageAnchor from './imageAnchor';
import FileAnchor from './fileAnchor';

export default class UploaderAnchor extends PureComponent {
    static propTypes = {
        accept: PropTypes.array,
        onChange: PropTypes.func,
        inputControlName: PropTypes.string.isRequired,
        multiple: PropTypes.bool.isRequired,
        CustomUploadAnchor: PropTypes.node,
        listType: PropTypes.string.isRequired,
        prefixCls: PropTypes.string.isRequired,
        disabled: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        maxSize: PropTypes.number,
        helperTextPostion: PropTypes.string.isRequired,
        onClickAnchor: PropTypes.func
    }

    static defaultProps = {
        onClickAnchor() {}
    };

    inputRef = ref => {
        this.uploadInputRef = ref;
    }

    onClickAnchor = () => {
        this.uploadInputRef.value = '';
        this.uploadInputRef.click();
        this.props.onClickAnchor();
    }

    render() {
        const {
            prefixCls, disabled, listType, CustomUploadAnchor, helperTextPostion,
            inputControlName, accept, multiple, onChange, loading, maxSize
        } = this.props;
        const uploadAnchorClassName = classNames(`${prefixCls}-anchor`, {
            [`${prefixCls}-anchor-disabled`]: disabled
        }, `${prefixCls}-anchor-${listType}`);
        const inputClassName = classNames(`${prefixCls}-input`, {
            [`${prefixCls}-input-disabled`]: disabled
        });
        let AnchorDom = listType === 'file' ? FileAnchor : ImageAnchor;
        if (CustomUploadAnchor) {
            AnchorDom = CustomUploadAnchor;
        }
        const inputProps = {
            ref: this.inputRef,
            type: 'file',
            name: inputControlName,
            className: inputClassName,
            multiple,
            onChange,
            disabled,
            accept: accept.join(',')
        };
        if (accept.length === 1 && accept[0] === '*') {
            delete inputProps.accept;
        }
        const anchorProps = {
            onClick: this.onClickAnchor,
            loading,
            disabled,
            prefixCls,
            maxSize,
            helperTextPostion
        };
        return (
            <div className={uploadAnchorClassName}>
                <AnchorDom {...anchorProps} />
                <input
                    {...inputProps}
                />
            </div>
        );
    }
}
