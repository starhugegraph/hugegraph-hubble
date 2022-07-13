import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {IconChevronDown, IconClose} from '@baidu/one-ui-icon';
import Button from '../button';
import PopSelectTrigger from './common/popSelectTrigger';
import tools from '../../core';

const {
    saveRef,
    toTitle,
    UNSELECTABLE_STYLE,
    UNSELECTABLE_ATTRIBUTE,
    preventDefaultEvent
} = tools.select;

export default class SelectPopOver extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string,
        overlayClassName: PropTypes.string,
        style: PropTypes.object,
        overlayStyle: PropTypes.object,
        visible: PropTypes.bool,
        onVisibleChange: PropTypes.func,
        mouseEnterDelay: PropTypes.number,
        mouseLeaveDelay: PropTypes.number,
        transitionName: PropTypes.string,
        openClassName: PropTypes.string,
        autoAdjustOverflow: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({
                adjustX: PropTypes.oneOf([0, 1]),
                adjustY: PropTypes.oneOf([0, 1])
            })
        ]),
        getPopupContainer: PropTypes.func,
        overlay: PropTypes.node,
        dropdownMatchSelectWidth: PropTypes.bool,
        onClickConfirm: PropTypes.func,
        onClickCancel: PropTypes.func,
        onRemoveSelected: PropTypes.func,
        titleCallback: PropTypes.shape({
            type: PropTypes.string,
            selectorName: PropTypes.string
        }),
        value: PropTypes.array,
        maxTagCount: PropTypes.number,
        errorMessage: PropTypes.string,
        showConfirmButton: PropTypes.bool,
        showCancelButton: PropTypes.bool
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-select',
        transitionName: 'zoom-big-fast',
        mouseEnterDelay: 0.1,
        mouseLeaveDelay: 0.1,
        autoAdjustOverflow: true,
        dropdownMatchSelectWidth: true,
        titleCallback: {
            type: 'enum', // 三类回填 enum, list, count
            selectorName: '地域选择器'
        },
        value: [],
        showConfirmButton: true,
        showCancelButton: true
    };

    constructor(props) {
        super(props);
        this.saveSelectionRef = saveRef(this, 'selectionRef');
        this.state = {
            visible: !!props.visible,
            value: props.value
        };
    }

    componentWillReceiveProps(nextProps) {
        const newState = {};
        const {value, visible} = this.props;
        if ('visible' in nextProps && visible !== nextProps.visible) {
            newState.visible = nextProps.visible;
        }
        if ('value' in nextProps && value !== nextProps.value) {
            newState.value = nextProps.value;
        }

        this.setState(newState);
    }

    onVisibleChange = visible => {
        const {onVisibleChange} = this.props;
        if (!('visible' in this.props)) {
            this.setState({visible});
        }
        if (onVisibleChange) {
            onVisibleChange(visible);
        }
    };

    onClickConfirm = () => {
        const onClickConfirm = this.props.onClickConfirm;
        this.setState({visible: false});
        if (onClickConfirm) {
            onClickConfirm();
        }
    }

    onClickCancel = () => {
        const onClickCancel = this.props.onClickCancel;
        this.setState({visible: false});
        if (onClickCancel) {
            onClickCancel();
        }
    }

    getContainerLayer = ref => {
        this.selectPopOver = ref;
    };

    getErrorMessage() {
        const {maxTagCount, prefixCls, errorMessage} = this.props;
        if (!maxTagCount && !errorMessage) {
            return null;
        }
        if (errorMessage) {
            return (
                <div className={`${prefixCls}-selection-text-error`}>
                    {errorMessage}
                </div>
            );
        }
        const {value, open} = this.state;
        const valueLength = value && value.length;
        if (valueLength > maxTagCount && !open) {
            const error = `已超过最大可选数量${valueLength - maxTagCount}个`;
            return (
                <div className={`${prefixCls}-selection-text-error`}>
                    {error}
                </div>
            );
        }

        return null;
    }

    removeSelected = (selectedKey, e) => {
        const {onRemoveSelected, titleCallback} = this.props;
        const type = titleCallback.type;
        if (type !== 'list') {
            return;
        }
        // Do not trigger Trigger popup
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        // eslint-disable-next-line react/no-access-state-in-setstate
        const value = this.state.value.filter(singleValue => singleValue !== selectedKey);
        // TODO: 此处是否应该在`setValue`生效以后才调用？
        if (onRemoveSelected) {
            onRemoveSelected(selectedKey, value);
        }
        this.setState({
            value
        });
    }

    renderOverLay() {
        const {
            overlay,
            prefixCls,
            showConfirmButton,
            showCancelButton
        } = this.props;
        const newPrefixCls = `${prefixCls}-popover`;
        const conatiner = (
            <div className={`${newPrefixCls}-inner-container`}>
                <div className={`${newPrefixCls}-inner-container-custom`}>
                    {overlay}
                </div>
                <div className={`${newPrefixCls}-inner-container-button`}>
                    {
                        showConfirmButton ? (
                            <Button className={`${newPrefixCls}-inner-container-button-item`} type="primary" onClick={this.onClickConfirm}>确定</Button>
                        ) : null
                    }
                    {
                        showCancelButton ? (
                            <Button className={`${newPrefixCls}-inner-container-button-item`} type="normal" onClick={this.onClickConfirm}>取消</Button>
                        ) : null
                    }
                </div>
            </div>
        );
        return conatiner;
    }

    renderTopControlNode = () => {
        const {titleCallback, prefixCls} = this.props;
        const {type, selectorName} = titleCallback;
        const {value, visible} = this.state;
        const className = `${prefixCls}-selection__rendered`;
        const valueLength = value.length;
        let label = selectorName;
        let opacity = 1;
        if (type === 'list') {
            let multipleNode = null;
            if (!valueLength) {
                if (visible) {
                    opacity = 0.4;
                }
                multipleNode = (
                    <div
                        key="value"
                        className={`${prefixCls}-selection-selected-value`}
                        title={toTitle(label)}
                        style={{
                            opacity
                        }}
                    >
                        {label}
                    </div>
                );
            } else {
                const selectedValueNodes = value.map((singleValue, index) => {
                    return (
                        <li
                            style={UNSELECTABLE_STYLE}
                            {...UNSELECTABLE_ATTRIBUTE}
                            onMouseDown={preventDefaultEvent}
                            className={`${prefixCls}-selection__choice`}
                            key={`${singleValue}-${index}`}
                            title={toTitle(singleValue)}
                        >
                            <div className={`${prefixCls}-selection__choice__content`}>
                                {singleValue}
                            </div>
                            <span
                                onClick={event => {
                                    this.removeSelected(singleValue, event);
                                }}
                                className={`${prefixCls}-selection__choice__remove`}
                            >
                                <IconClose />
                            </span>
                        </li>
                    );
                });
                multipleNode = selectedValueNodes.length ? (
                    <ul className={`${prefixCls}-search-ul`}>
                        {selectedValueNodes}
                    </ul>
                ) : null;
            }
            return (
                <div className={className} ref={this.saveTopCtrlRef}>
                    {multipleNode}
                </div>
            );
        }
        if (valueLength) {
            label = valueLength === 1
                ? value[0]
                : `${value[0]}、${value[1]}等${valueLength}个`;
            if (type === 'count') {
                label = valueLength === 1
                    ? value[0]
                    : `${selectorName}(${valueLength}个)`;
            }
        }
        if (visible || !valueLength) {
            opacity = 0.4;
        }
        const selectedValue = (
            <div
                key="value"
                className={`${prefixCls}-selection-selected-value`}
                title={toTitle(label)}
                style={{
                    opacity
                }}
            >
                {label}
            </div>
        );
        return (
            <div className={className} ref={this.saveTopCtrlRef}>
                {selectedValue}
            </div>
        );
    }

    renderTotalDom() {
        const {maxTagCount, prefixCls} = this.props;
        const value = this.state.value;
        const valueLength = value.length;
        if (!maxTagCount || !valueLength) {
            return null;
        }
        const totalCountCls = classnames(`${prefixCls}-selection__total_count`, {
            [`${prefixCls}-selection__total_count-error`]: valueLength > maxTagCount
        });
        return (
            <span className={totalCountCls}>
                {valueLength}
/
                {maxTagCount}
            </span>
        );
    }

    render() {
        const {props, state} = this;
        const {prefixCls, getPopupContainer, titleCallback, maxTagCount} = props;
        const {visible, value} = state;
        const type = titleCallback.type;
        const ctrlNode = this.renderTopControlNode();
        const newPrefixCls = `${prefixCls}-popover`;
        const containerCls = classnames(`${newPrefixCls}-container`, {
            [`${newPrefixCls}-container-open`]: visible
        });
        const sectionCls = classnames(`${prefixCls}-selection`, {
            [`${prefixCls}-selection--multiple`]: type === 'list',
            [`${prefixCls}-selection-error`]: maxTagCount && maxTagCount < value.length
        });
        return (
            <PopSelectTrigger
                {...this.props}
                prefixCls={newPrefixCls}
                getPopupContainer={getPopupContainer}
                ref={this.getContainerLayer}
                overlay={this.renderOverLay()}
                visible={visible}
                onVisibleChange={this.onVisibleChange}
                trigger="click"
            >
                <div className={containerCls}>
                    <div
                        ref={this.saveSelectionRef}
                        key="selection"
                        className={sectionCls}
                        type={type}
                    >
                        {ctrlNode}
                        <span
                            key="arrow"
                            className={`${prefixCls}-arrow`}
                            style={UNSELECTABLE_STYLE}
                            {...UNSELECTABLE_ATTRIBUTE}
                            onClick={this.onArrowClick}
                        >
                            <IconChevronDown />
                        </span>
                        {
                            type === 'list' ? (
                                this.renderTotalDom()
                            ) : null
                        }
                    </div>
                    {this.getErrorMessage()}
                </div>
            </PopSelectTrigger>
        );
    }
}
