import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {polyfill} from 'react-lifecycles-compat';
import ImageItem from './imageItem';
import Modal from '../../modal';
import FileItem from './fileItem';

class UploadList extends PureComponent {
    static propTypes = {
        fileList: PropTypes.arrayOf(Object),
        defaultFileList: PropTypes.arrayOf(Object),
        prefixCls: PropTypes.string.isRequired,
        listType: PropTypes.oneOf(['file', 'image']).isRequired,
        onRemove: PropTypes.func.isRequired,
        onPreview: PropTypes.func,
        onInsertImage: PropTypes.func,
        onReUpload: PropTypes.func,
        showUploadListIcon: PropTypes.object
    }

    static defaultProps = {
        onPreview() {},
        onInsertImage() {},
        onReUpload() {}
    }

    onRemove = index => {
        const fileList = [...this.props.fileList];
        fileList.splice(index, 1);
        this.props.onRemove({
            fileList,
            index
        });
    }

    onPreview = index => {
        const {fileList, prefixCls, onPreview} = this.props;
        const currentItem = fileList[index];
        const preview = onPreview({
            file: currentItem,
            fileList,
            index
        });
        if (preview !== false) {
            Modal.confirm({
                content: (
                    <span className={`${this.props.prefixCls}-modal-blank`}>
                        <img src={currentItem.thumbUrl} alt={currentItem.name} className={`${prefixCls}-modal-image`}/>
                    </span>
                ),
                className: `${prefixCls}-modal`
            });
        }
    }

    onReUpload = index => {
        const {fileList, onInsertImage, onReUpload} = this.props;
        const currentItem = fileList[index];
        const reUpload = onReUpload({
            file: currentItem,
            fileList,
            index
        });
        if (reUpload !== false) {
            onInsertImage(true, index);
        }
    }

    render() {
        const {prefixCls, listType, fileList, showUploadListIcon} = this.props;
        const uploadListClassNames = classNames(
            `${prefixCls}-list`,
            `${prefixCls}-list-${listType}`
        );
        const Item = listType === 'file' ? FileItem : ImageItem;
        return (
            <div className={uploadListClassNames}>
                {
                    fileList.map((item, index) => {
                        return (
                            <Item
                                {...item}
                                key={index}
                                index={index}
                                onRemove={this.onRemove}
                                onPreview={this.onPreview}
                                prefixCls={prefixCls}
                                onReUpload={this.onReUpload}
                                showUploadListIcon={showUploadListIcon}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

polyfill(UploadList);

export default UploadList;
