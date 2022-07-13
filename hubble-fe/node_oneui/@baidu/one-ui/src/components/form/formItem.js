import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import Grid from '../grid';
import {intersperseSpace} from '../../core/commonTools';
import {FormContext} from './context';

const {
    Row,
    Col
} = Grid;

export const FIELD_META_PROP = 'data-__meta';
export const FIELD_DATA_PROP = 'data-__field';

export default class FormItem extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        labelAlign: PropTypes.string,
        labelCol: PropTypes.object,
        help: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
        validateStatus: PropTypes.oneOf(['success', 'warning', 'error', 'validating', '']),
        hasFeedback: PropTypes.bool,
        wrapperCol: PropTypes.object,
        className: PropTypes.string,
        htmlFor: PropTypes.string,
        id: PropTypes.string,
        children: PropTypes.node,
        colon: PropTypes.bool,
        style: PropTypes.object,
        extra: PropTypes.node,
        required: PropTypes.bool
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-form',
        className: '',
        style: {},
        hasFeedback: false
    }

    helpShow = false;

    getHelpMessage = () => {
        const help = this.props.help;
        if (help === undefined && this.getOnlyControl()) {
            const errors = this.getField().errors;
            if (errors) {
                return intersperseSpace(
                    errors.map((e, index) => {
                        let node = null;
                        if (React.isValidElement(e)) {
                            node = e;
                        } else if (React.isValidElement(e.message)) {
                            node = e.message;
                        }
                        return node ? React.cloneElement(node, {key: index}) : e.message;
                    })
                );
            }
            return '';
        }
        return help;
    }

    getControls = (children, recursively) => {
        let controls = [];
        const childrenArray = React.Children.toArray(children);
        for (let i = 0; i < childrenArray.length; i++) {
            if (!recursively && controls.length > 0) {
                break;
            }
            const child = childrenArray[i];
            if (
                child.type && (child.type === FormItem || child.type.displayName === 'FormItem')
            ) {
                continue;
            }
            if (!child.props) {
                continue;
            }
            if (FIELD_META_PROP in child.props) {
                controls.push(child);
            } else if (child.props.children) {
                controls = controls.concat(this.getControls(child.props.children, recursively));
            }
        }
        return controls;
    }

    getOnlyControl = () => {
        const child = this.getControls(this.props.children, false)[0];
        return child !== undefined ? child : null;
    }

    getChildProp = prop => {
        const child = this.getOnlyControl();
        return child && child.props && child.props[prop];
    }

    getId = () => {
        return this.getChildProp('id');
    }

    getMeta = () => {
        return this.getChildProp(FIELD_META_PROP);
    }

    getField = () => {
        return this.getChildProp(FIELD_DATA_PROP);
    }

    onHelpAnimEnd = (key, helpShow) => {
        this.helpShow = helpShow;
        if (!helpShow) {
            this.setState({});
        }
    };

    renderHelp = prefixCls => {
        const help = this.getHelpMessage();
        const children = help ? (
            <div className={`${prefixCls}-explain`} key="help">
                {help}
            </div>
        ) : null;
        if (children) {
            this.helpShow = !!children;
        }
        return (
            <Animate
                transitionName="show-help"
                component=""
                transitionAppear
                key="help"
                onEnd={this.onHelpAnimEnd}
            >
                {children}
            </Animate>
        );
    }

    renderExtra = prefixCls => {
        const extra = this.props.extra;
        return extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null;
    }

    getValidateStatus() {
        const onlyControl = this.getOnlyControl();
        if (!onlyControl) {
            return '';
        }
        const field = this.getField();
        if (field.validating) {
            return 'validating';
        }
        if (field.errors) {
            return 'error';
        }
        const fieldValue = 'value' in field ? field.value : this.getMeta().initialValue;
        if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
            return 'success';
        }
        return '';
    }

    renderValidateWrapper = (
        prefixCls,
        c1,
        c2,
        c3
    ) => {
        const props = this.props;
        const hasFeedback = props.hasFeedback;
        const onlyControl = this.getOnlyControl;
        const validateStatus = props.validateStatus === undefined && onlyControl
            ? this.getValidateStatus()
            : props.validateStatus;
        let classes = `${prefixCls}-item-control`;
        if (validateStatus) {
            classes = classNames(`${prefixCls}-item-control`, {
                [`${prefixCls}-has-feedback`]: hasFeedback || validateStatus === 'validating',
                [`${prefixCls}-has-success`]: validateStatus === 'success',
                [`${prefixCls}-has-warning`]: validateStatus === 'warning',
                [`${prefixCls}-has-error`]: validateStatus === 'error',
                [`${prefixCls}-is-validating`]: validateStatus === 'validating'
            });
        }
        // let iconType = '';
        // switch (validateStatus) {
        //     case 'success':
        //         iconType = 'success';
        //         break;
        //     case 'warning':
        //         iconType = 'warning';
        //         break;
        //     case 'error':
        //         iconType = 'fail';
        //         break;
        //     case 'validating':
        //         iconType = 'loading';
        //         break;
        //     default:
        //         iconType = '';
        //         break;
        // }
        // const icon = hasFeedback && iconType ? (
        //     <span className={`${prefixCls}-item-children-icon`}>
        //         <Icon type={iconType} theme={iconType === 'loading' ? 'outlined' : 'filled'} />
        //     </span>
        // ) : null;
        return (
            <div className={classes}>
                <span className={`${prefixCls}-item-children`}>
                    {c1}
                    {/* {icon} */}
                </span>
                {c2}
                {c3}
            </div>
        );
    }

    renderWrapper = (prefixCls, children) => {
        return (
            <FormContext.Consumer key="wrapper">
                {({wrapperCol: contextWrapperCol, vertical}) => {
                    const wrapperCol = this.props.wrapperCol;
                    const mergedWrapperCol = ('wrapperCol' in this.props ? wrapperCol : contextWrapperCol) || {};
                    const className = classNames(
                        `${prefixCls}-item-control-wrapper`,
                        mergedWrapperCol.className,
                    );
                    // No pass FormContext since it's useless
                    return (
                        <FormContext.Provider value={{vertical}}>
                            <Col {...mergedWrapperCol} className={className}>
                                {children}
                            </Col>
                        </FormContext.Provider>
                    );
                }}
            </FormContext.Consumer>
        );
    }

    isRequired = () => {
        const required = this.props.required;
        if (required !== undefined) {
            return required;
        }
        if (this.getOnlyControl()) {
            const meta = this.getMeta() || {};
            const validate = meta.validate || [];
            return validate
                .filter(item => !!item.rules)
                .some(item => {
                    return item.rules.some(rule => rule.required);
                });
        }
        return false;
    }

    onLabelClick = () => {
        const id = this.props.id || this.getId();
        if (!id) {
            return;
        }
        const formItemNode = ReactDOM.findDOMNode(this);
        const control = formItemNode.querySelector(`[id="${id}"]`);
        if (control && control.focus) {
            control.focus();
        }
    };

    renderLabel = prefixCls => {
        return (
            <FormContext.Consumer key="label">
                {
                    ({
                        vertical,
                        labelAlign: contextLabelAlign,
                        labelCol: contextLabelCol,
                        colon: contextColon
                    }) => {
                        const {label, labelCol, labelAlign, colon, id, htmlFor} = this.props;
                        const required = this.isRequired();
                        const mergedLabelCol = ('labelCol' in this.props ? labelCol : contextLabelCol) || {};
                        const mergedLabelAlign = 'labelAlign' in this.props ? labelAlign : contextLabelAlign;
                        const labelClsBasic = `${prefixCls}-item-label`;
                        const labelColClassName = classNames(
                            labelClsBasic,
                            mergedLabelAlign === 'left' && `${labelClsBasic}-left`,
                            mergedLabelCol.className,
                        );
                        let labelChildren = label;
                        // Keep label is original where there should have no colon
                        const computedColon = colon === true || (contextColon !== false && colon !== false);
                        const haveColon = computedColon && !vertical;
                        // Remove duplicated user input colon
                        if (haveColon && typeof label === 'string' && label.trim() !== '') {
                            labelChildren = label.replace(/[：|:]\s*$/, '');
                        }
                        const labelClassName = classNames({
                            [`${prefixCls}-item-required`]: required,
                            [`${prefixCls}-item-no-colon`]: !computedColon
                        });
                        return label ? (
                            <Col {...mergedLabelCol} className={labelColClassName}>
                                <label
                                    htmlFor={htmlFor || id || this.getId()}
                                    className={labelClassName}
                                    title={typeof label === 'string' ? label : ''}
                                    onClick={this.onLabelClick}
                                >
                                    {labelChildren}
                                </label>
                            </Col>
                        ) : null;
                    }
                }
            </FormContext.Consumer>
        );
    }

    renderChildren = prefixCls => {
        const children = this.props.children;
        return [
            this.renderLabel(prefixCls),
            this.renderWrapper(
                prefixCls,
                this.renderValidateWrapper(
                    prefixCls,
                    children,
                    this.renderHelp(prefixCls),
                    this.renderExtra(prefixCls),
                )
            )
        ];
    }

    render() {
        const {prefixCls, style, className} = this.props;
        const children = this.renderChildren(prefixCls);
        const itemClassName = {
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-item-with-help`]: this.helpShow,
            [`${className}`]: !!className
        };
        return (
            <Row className={classNames(itemClassName)} style={style} key="row">
                {children}
            </Row>
        );
    }
}
