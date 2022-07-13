import React, {PureComponent} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import partial from 'lodash/partial';
import pull from 'lodash/pull';
import {polyfill} from 'react-lifecycles-compat';
import Tag from './tag';

export const dataSourceOption = PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    value: PropTypes.string.isRequired,
    tagProps: PropTypes.object
});

class GroupTag extends PureComponent {

    static propTypes = {
        /**
         * value，区分单选和多选，单选取数组第1个
         */
        value: PropTypes.arrayOf(PropTypes.string),
        defaultValue: PropTypes.arrayOf(PropTypes.string),
        /**
         * mode 单选还是多选
         */
        mode: PropTypes.oneOf(['unique', 'multiple']),
        /**
         * 数据源
         */
        dataSource: PropTypes.arrayOf(dataSourceOption),
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        onChange: PropTypes.func,
        size: PropTypes.oneOf(['small', 'medium'])
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-tag',
        mode: 'unique',
        dataSource: [],
        className: '',
        onChange() {},
        size: 'small'
    }

    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue || props.value || [],
            prevProps: props
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const newState = {
            prevProps: nextProps
        };
        const prevProps = prevState.prevProps;
        if ('value' in nextProps
        && nextProps.value !== prevState.value) {
            newState.value = nextProps.value;
        }

        if ('dataSource' in nextProps
        && nextProps.dataSource !== prevProps.dataSource) {
            newState.dataSource = nextProps.dataSource;
        }
        return newState;
    }

    isUniqueMode = () => this.props.mode === 'unique';

    onChangeGroup = (value, checked) => {
        let selectedValue = [...this.state.value];
        if (checked) {
            // 选中
            if (this.isUniqueMode()) {
                // 单选模式
                selectedValue = [value];
            } else {
                selectedValue.push(value);
            }
        } else if (this.isUniqueMode()) {
            // 没选中，单选模式
            selectedValue = [];
        } else {
            pull(selectedValue, value);
        }
        if (!('value' in this.props)) {
            this.setState({
                value: selectedValue
            });
        }
        const onChange = this.props.onChange;
        onChange(selectedValue);
    }

    render() {
        const {prefixCls, className, dataSource, size} = this.props;
        const value = this.state.value;
        const selectedValue = this.isUniqueMode() ? ((value && value.length && [value[0]]) || []) : value;
        const groupTagClassName = classNames(className, `${prefixCls}-group-wrapper`);
        return (
            <div className={groupTagClassName}>
                {
                    dataSource.map((tag, index) => {
                        const {value, label, tagProps = {}} = tag;
                        const checked = selectedValue.indexOf(value) > -1;
                        const onClose = tagProps.onClose;
                        if (onClose) {
                            tagProps.onClose = partial(onClose, value);
                        }
                        return (
                            <Tag key={index} size={size} checkable checked={checked} onChange={partial(this.onChangeGroup, value)} {...tagProps}>
                                {label}
                            </Tag>
                        );
                    })
                }
            </div>
        );
    }
}

polyfill(GroupTag);

export default GroupTag;
