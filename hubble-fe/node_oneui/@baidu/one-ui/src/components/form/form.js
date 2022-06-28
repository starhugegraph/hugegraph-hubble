import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import createDOMForm from './common/createDOMForm';
import createFormField from './common/createFormField';
import FormItem, {FIELD_META_PROP, FIELD_DATA_PROP} from './formItem';
import {FormContext} from './context';

export default class Form extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string,
        layout: PropTypes.oneOf(['horizontal', 'inline', 'vertical']),
        className: PropTypes.string,
        children: PropTypes.any,
        onSubmit: PropTypes.func,
        hideRequiredMark: PropTypes.bool,
        colon: PropTypes.bool,
        wrapperCol: PropTypes.object,
        labelAlign: PropTypes.oneOf(['left', 'right']),
        labelCol: PropTypes.object,
        size: PropTypes.oneOf(['small', 'medium', 'large'])
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-form',
        layout: 'horizontal',
        className: '',
        size: 'medium'
    }

    static Item = FormItem;

    static createFormField = createFormField;

    static create = (
        options = {},
    ) => {
        return createDOMForm({
            fieldNameProp: 'id',
            ...options,
            fieldMetaProp: FIELD_META_PROP,
            fieldDataProp: FIELD_DATA_PROP
        });
    };

    render() {
        const {
            prefixCls,
            className,
            wrapperCol,
            labelAlign,
            labelCol,
            layout,
            colon,
            hideRequiredMark,
            size
        } = this.props;
        const formClassName = classNames(
            prefixCls,
            className,
            [`${prefixCls}-${layout}`],
            {
                [`${prefixCls}-hide-required-mark`]: hideRequiredMark
            },
            [`${prefixCls}-${size}`]
        );
        const formProps = omit(this.props, [
            'prefixCls',
            'className',
            'layout',
            'form',
            'hideRequiredMark',
            'wrapperCol',
            'labelAlign',
            'labelCol',
            'colon',
            'size'
        ]);
        return (
            <FormContext.Provider
                value={{wrapperCol, labelAlign, labelCol, vertical: layout === 'vertical', colon, size}}
            >
                <form {...formProps} className={formClassName} autoComplete="off" />
            </FormContext.Provider>
        );
    }
}
