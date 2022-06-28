import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import partial from 'lodash/partial';
import {polyfill} from 'react-lifecycles-compat';
import Tag from './tag';
import {dataSourceOption} from './group';
import Tooltip from '../tooltip';
import Input from '../input';

const inputWidth = 58;

class EditableGroup extends PureComponent {
    static propTypes = {
        dataSource: PropTypes.arrayOf(dataSourceOption),
        defaultDataSource: PropTypes.arrayOf(dataSourceOption),
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        onClose: PropTypes.func,
        size: PropTypes.oneOf(['small', 'medium']),
        onInputConfirm: PropTypes.func
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-tag',
        className: '',
        size: 'small',
        onClose() {},
        onInputConfirm() {}
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: props.defaultDataSource || props.dataSource || [],
            inputVisible: false,
            inputValue: ''
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if ('dataSource' in nextProps
        && nextProps.dataSource !== prevState.dataSource) {
            return {dataSource: nextProps.dataSource};
        }
        return null;
    }

    handleClose = value => {
        let dataSource = this.state.dataSource;
        const onClose = this.props.onClose;
        onClose(dataSource, value);
        if (!('dataSource' in this.props)) {
            dataSource = dataSource.filter(tag => tag.value !== value);
            this.setState({
                dataSource
            });
        }
    };

    showInput = () => {
        this.setState({inputVisible: true}, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({inputValue: e.value});
    };

    handleInputConfirm = () => {
        const {dataSource, inputValue} = this.state;
        const onInputConfirm = this.props.onInputConfirm;
        onInputConfirm(dataSource, inputValue);
        const newState = {
            inputVisible: false,
            inputValue: ''
        };
        if (!('dataSource' in this.props)) {
            let currentTags = dataSource;
            if (inputValue && currentTags.indexOf(inputValue) === -1) {
                currentTags = [...currentTags, {
                    label: inputValue,
                    value: inputValue
                }];
            }
            newState.dataSource = currentTags;
        }
        this.setState(newState);
    };

    saveInputRef = input => {
        this.input = input;
    };

    render() {
        const {className, prefixCls, size} = this.props;
        const {dataSource, inputVisible, inputValue} = this.state;
        const groupTagClassName = classNames(className, `${prefixCls}-group-wrapper`);
        return (
            <div className={groupTagClassName}>
                {dataSource.map((tag, index) => {
                    const {label, value, tagProps} = tag;
                    const isLongTag = label.length > 20;
                    const tagElem = (
                        <Tag key={index} closable onClose={partial(this.handleClose, value)} {...tagProps}>
                            {isLongTag ? `${label.slice(0, 20)}...` : label}
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={index}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
                {inputVisible && (
                    <Input
                        inputRef={this.saveInputRef}
                        size={size}
                        style={{width: inputWidth}}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag onClick={this.showInput} className={`${prefixCls}-add-tag`}>
                        + 添加
                    </Tag>
                )}
            </div>
        );
    }
}

polyfill(EditableGroup);

export default EditableGroup;
