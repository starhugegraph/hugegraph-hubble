import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {polyfill} from 'react-lifecycles-compat';
import classNames from 'classnames';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import UploaderAnchor from './common/uploaderAnchor';
import UploaderList from './common/uploaderList';
import Message from '../message';
import {
    checkFileRules,
    originStatus,
    fileUploader,
    getUid,
    UPLOAD_STATUS_MAP
} from '../../core/uploaderTools';

class Uploader extends PureComponent {
    static propTypes = {
        /**
         * 接收的参数
         */
        accept: PropTypes.array,
        /**
         * 上传文件的校验器
         */
        validator: PropTypes.func,
        /**
         * 上传前的钩子，return Promise
         */
        beforeUpload: PropTypes.func,
        /**
         * 上传的url
         */
        uploadResquestUrl: PropTypes.string,
        /**
         * 文件列表的list - 受控属性
         */
        fileList: PropTypes.arrayOf(Object),
        /**
         * 文件列表的list - 非受控属性
         */
        defaultFileList: PropTypes.arrayOf(Object),
        /**
         * 禁用
         */
        disabled: PropTypes.bool,
        /**
         * 请求的headers
         */
        headers: PropTypes.object,
        /**
         * 列表的样式类型
         */
        listType: PropTypes.oneOf(['file', 'image']),
        /**
         * upload请求的延时
         */
        timeout: PropTypes.number,
        /**
         * 是否支持多选
         */
        multiple: PropTypes.bool,
        /**
         * 图片类型中，展示的icon
         */
        showUploadListIcon: PropTypes.object,
        /**
         * 图片类型中可自定义操作icon
         */
        customUploadIcon: PropTypes.node,
        /**
         * 点击预览的回调
         */
        onPreview: PropTypes.func,
        /**
         * 点击删除的回调
         */
        onRemove: PropTypes.func,
        /**
         * 点击重新上传的回调
         */
        onReUpload: PropTypes.func,
        /**
         * 自定义className
         */
        className: PropTypes.string,
        prefixCls: PropTypes.string,
        /**
         * 上传文件的最大尺寸
         */
        maxSize: PropTypes.number,
        /**
         * 最大可并行上传的文件个数
         */
        maxParallelFileNumber: PropTypes.number,
        /**
         * 自定义上传的锚点
         */
        CustomUploadAnchor: PropTypes.node,
        /**
         * 上传input的name
         */
        inputControlName: PropTypes.string,
        /**
         * loading
         */
        loading: PropTypes.bool,
        /**
         * helper text位置 right or bottom
         */
        helperTextPostion: PropTypes.oneOf(['right', 'bottom']),
        /**
         * 状态改变时候的回调
         */
        onChange: PropTypes.func,
        /**
         * 自定义上传方法
         */
        uploader: PropTypes.func,
        /**
         * 将origin的File转成所需要的file
         */
        transformFile: PropTypes.func,
        /**
         * 上传请求时是否携带 cookie
         */
        withCredentials: PropTypes.bool,
        /**
         * 请求的方式，默认是post
         */
        method: PropTypes.string,
        /**
         * 请求额外的data
         */
        reqData: PropTypes.object,
        /**
         * listType为image的时候，可以自己定义操作
         */
        customUploadListIcon: PropTypes.node,
        maxFileLength: PropTypes.number,
        maxFileLengthErrorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    }

    static defaultProps = {
        accept: ['*'],
        disabled: false,
        listType: 'file',
        timeout: 3000,
        multiple: false,
        showUploadListIcon: {
            showPreviewIcon: true,
            showReUploadIcon: true,
            showRemoveOnIcon: true
        },
        className: '',
        prefixCls: 'new-fc-one-uploader',
        inputControlName: 'file',
        headers: {},
        loading: false,
        helperTextPostion: 'right',
        onRemove() {},
        onChange() {},
        transformFile: originFile => originFile,
        uploader: fileUploader,
        maxFileLengthErrorMessage: '已超出文件最大上传个数，请删除后重新上传'
    }

    constructor(props) {
        super(props);
        const _fileList = props.fileList || props.defaultFileList || [];
        this.state = {
            fileList: _fileList,
            insertImage: false,
            insetIndex: 0
        };
        this._fileList = _fileList;
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if ('fileList' in nextProps && nextProps.fileList !== prevState.fileList) {
            return {
                fileList: nextProps.fileList
            };
        }
        return null;
    }

    onInputChange = e => {
        const files = e.target.files;
        const postFiles = Array.prototype.slice.call(files);
        const tempFiles = [];
        const {maxParallelFileNumber, maxFileLength, maxFileLengthErrorMessage} = this.props;
        const {insertImage, insetIndex} = this.state;
        if (maxParallelFileNumber && postFiles.length > maxParallelFileNumber) {
            Message.error({
                content: '超过最大上传个数， 请重新选择...'
            });
            return;
        }
        if (maxFileLength && maxFileLength === this.state.fileList.length && !insertImage) {
            // 存在限制文件上传的个数，并且不是图片重新上传的情况下，进行报错return
            Message.error({
                content: `${maxFileLengthErrorMessage}`
            });
            return;
        }
        postFiles.forEach((file, index) => {
            tempFiles.push({
                status: originStatus.WAITING,
                name: file.name,
                isNewUpload: true,
                originFile: file,
                uid: getUid(index)
            });
        });
        let newFileList = this._fileList.concat(tempFiles);
        if (insertImage) {
            // 从中间插入
            newFileList = [...this._fileList];
            newFileList.splice(insetIndex, 1, ...tempFiles);
        }
        const {_fileList, allFailures} = this.onValidatorFiles(newFileList);
        this._fileList = _fileList;
        if (allFailures) {
            return;
        }
        const newUploadingFiles = _fileList.filter(file => file.status === originStatus.WAITING && file.isNewUpload);
        newUploadingFiles.forEach(file => {
            this.upload(file, newUploadingFiles);
        });
    }

    upload = (file, fileList) => {
        if (!this.props.beforeUpload) {
            return setTimeout(() => this.post(file), 0);
        }
        const before = this.props.beforeUpload(file, fileList);
        if (before && before.then) {
            before.then(processedFile => {
                const processedFileType = Object.prototype.toString.call(processedFile);
                if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
                    return this.post(processedFile);
                }
                return this.post(file);
            }).catch(e => {
                console && console.log(e); // eslint-disable-line
            });
        } else if (before !== false) {
            setTimeout(() => this.post(file), 0);
        }
    }

    post = file => {
        return new Promise(() => {
            const {
                uploadResquestUrl, transformFile, uploader,
                headers, withCredentials = false, method = 'post', reqData
            } = this.props;
            const transform = Promise.resolve(transformFile(file));
            transform.then(transformedFile => {
                const requestOption = {
                    action: uploadResquestUrl,
                    filename: file.name,
                    reqData,
                    file: transformedFile,
                    headers,
                    withCredentials,
                    method: method || 'post',
                    onProgress: e => {
                        this.onProgress(e, file);
                    },
                    onSuccess: (ret, xhr) => {
                        this.onSuccess(ret, file, xhr);
                    },
                    onError: (err, ret) => {
                        this.onError(err, ret, file);
                    }
                };
                uploader(requestOption);
                this.onStart(file);
            });
        });
    }

    getFileIndex = file => {
        const uid = file.uid;
        const fileList = [...this.state.fileList];
        const currentFileIndex = findIndex(fileList, file => file.uid === uid);
        return currentFileIndex;
    }

    onProgress = (e, file) => {
        const percent = e.percent;
        const fileList = [...this.state.fileList];
        const currentFileIndex = this.getFileIndex(file);
        fileList[currentFileIndex].progressStep = percent - 1;
        this.props.onChange({
            file,
            fileList
        });
        if (!('fileList' in this.props)) {
            this.setState({
                fileList
            });
        }
    }

    onSuccess = (ret, file) => {
        const fileList = [...this.state.fileList];
        const currentFileIndex = this.getFileIndex(file);
        fileList[currentFileIndex].status = originStatus.SUCCESS;
        this.props.onChange({
            file,
            fileList,
            response: ret
        });
        if (!('fileList' in this.props)) {
            this.setState({
                fileList
            });
        }
    }

    onError = (err, ret, file) => {
        const fileList = [...this.state.fileList];
        const currentFileIndex = this.getFileIndex(file);
        fileList[currentFileIndex].status = originStatus.ERROR;
        fileList[currentFileIndex].errorMessage = [UPLOAD_STATUS_MAP.UPLOAD_ERROR.error.msg];
        this.props.onChange({
            file,
            fileList,
            err,
            response: ret
        });
        if (!('fileList' in this.props)) {
            this.setState({
                fileList
            });
        }
    }

    onStart = file => {
        const fileList = [...this.state.fileList];
        const currentFileIndex = this.getFileIndex(file);
        fileList[currentFileIndex].status = originStatus.UPLOADING;
        fileList[currentFileIndex].progressStep = 0;
        this.props.onChange({
            file,
            fileList
        });
        if (!('fileList' in this.props)) {
            this.setState({
                fileList
            });
        }
    }

    onValidatorFiles = files => {
        const _fileList = [...files];
        let allFailures = true;
        _fileList.forEach((file, index) => {
            if (file.status === originStatus.WAITING && file.isNewUpload) {
                const errors = this.onValidatorSingleFile(file.originFile);
                const hasError = errors.length;
                _fileList[index] = {
                    ..._fileList[index],
                    status: hasError ? originStatus.ERROR : originStatus.WAITING
                };
                if (hasError) {
                    _fileList[index].errorMessage = errors;
                } else {
                    _fileList[index].progressStep = 0;
                }
                this.props.onChange({
                    fileList: _fileList,
                    file: _fileList[index].originFile
                });
                if (!hasError) {
                    allFailures = false;
                }
            }
        });
        if (!('fileList' in this.props)) {
            this.setState({
                fileList: _fileList
            });
        }
        return {
            allFailures,
            _fileList
        };
    }

    onValidatorSingleFile = file => {
        const errorMessages = [];
        const {accept, maxSize, validator} = this.props;
        map(checkFileRules, checkFileRule => {
            if (checkFileRule.match({
                file,
                options: {
                    accept,
                    maxSize
                }
            })) {
                errorMessages.push(checkFileRule.error.error.msg);
            }
        });
        if (validator && validator(file)) {
            errorMessages.push(validator(file));
        }
        return errorMessages;
    };

    onRemove = ({fileList, index}) => {
        if (!('fileList' in this.props)) {
            this.setState({
                fileList
            });
        }
        this._fileList = [...fileList];
        this.props.onRemove({
            fileList,
            index
        });
    }

    onInsertImage = (insertImage, index) => {
        this.setState({
            insertImage,
            insetIndex: index
        });
        this.uploaderAnchorRef.uploadInputRef.value = '';
        this.uploaderAnchorRef.uploadInputRef.click();
    };

    onClickAnchor = () => {
        this.setState({
            insertImage: false
        });
    }

    uploadAnchorRef = ref => {
        this.uploaderAnchorRef = ref;
    }

    render() {
        const {
            prefixCls,
            className,
            listType,
            onPreview,
            onReUpload
        } = this.props;
        const fileList = this.state.fileList;
        const uploadClassNames = classNames(prefixCls, `${prefixCls}-image`, className);
        if (listType === 'image') {
            return (
                <div className={uploadClassNames}>
                    <UploaderList
                        {...this.props}
                        fileList={fileList}
                        onRemove={this.onRemove}
                        onPreview={onPreview}
                        onReUpload={onReUpload}
                        onInsertImage={this.onInsertImage}
                    />
                    <UploaderAnchor
                        {...this.props}
                        ref={this.uploadAnchorRef}
                        onChange={this.onInputChange}
                        onClickAnchor={this.onClickAnchor}
                    />
                </div>
            );
        }
        return (
            <div className={uploadClassNames}>
                <UploaderAnchor
                    {...this.props}
                    onChange={this.onInputChange}
                    ref={this.uploadAnchorRef}
                />
                <UploaderList
                    {...this.props}
                    fileList={fileList}
                    onRemove={this.onRemove}
                />
            </div>
        );
    }

}

polyfill(Uploader);

export default Uploader;
