import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import RcSlider from 'rc-slider/lib/Slider';
import RcRange from 'rc-slider/lib/Range';
import RcHandle from 'rc-slider/lib/Handle';
import Tooltip from '../tooltip';

const markType = PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.shape({
        style: PropTypes.object,
        label: PropTypes.node
    }), PropTypes.node])
);

export default class Slider extends PureComponent {
    static propTypes = {
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 提示类名前缀 */
        tooltipPrefixCls: PropTypes.string,
        /** 双滑块模式 */
        range: PropTypes.bool,
        /** 最大值 */
        max: PropTypes.number,
        /** 最小值 */
        min: PropTypes.number,
        /** 步长，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时 Slider 的可选值仅有 marks 标出来的部分。 */
        step: PropTypes.number,
        /** 刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式 */
        marks: markType,
        /** 是否只能拖拽到刻度上 */
        dots: PropTypes.bool,
        /** 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number] */
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
        /** 设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number] */
        defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
        /** marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列 */
        included: PropTypes.bool,
        /** 值为 true 时，滑块为禁用状态 */
        disabled: PropTypes.bool,
        /** 当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入。 */
        onChange: PropTypes.func,
        /** 与 onmouseup 触发时机一致，把当前值作为参数传入。 */
        onAfterChange: PropTypes.func,
        /** Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值，若为 null，则隐藏 Tooltip。 */
        tipFormatter: PropTypes.func,
        /** 值为true时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时。 */
        tooltipVisible: PropTypes.bool,
        /** 设置 Tooltip 展示位置 */
        tooltipPlacement: PropTypes.string,
        /** Tooltip 渲染父节点，默认渲染到 body 上。 */
        getTooltipPopupContainer: PropTypes.func,
        size: PropTypes.oneOf(['small', 'medium']),
        readOnly: PropTypes.bool
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-slider',
        tooltipPrefixCls: 'new-fc-one-tooltip',
        defaultValue: 0,
        disabled: false,
        readOnly: false,
        dots: false,
        included: true,
        max: 100,
        min: 0,
        range: false,
        step: 1,
        onChange: _.noop,
        onAfterChange: _.noop,
        tipFormatter: value => value.toString(),
        tooltipPlacement: 'top',
        getTooltipPopupContainer: () => document.body,
        size: 'medium'
    }

    constructor(props) {
        super(props);
        this.state = {
            visibles: {}
        };
    }

    toggleTooltipVisible = (index, visible) => {
        this.setState(({visibles}) => ({
            visibles: {
                ...visibles,
                [index]: visible
            }
        }));
    };

    getTooltipRef = ref => {
        this.tooltipRef = ref;
    }

    onChange = props => {
        this.props.onChange(props);
        if (this.tooltipRef
            && this.tooltipRef.tooltipRef
            && this.tooltipRef.tooltipRef.trigger
            && this.tooltipRef.tooltipRef.trigger.forcePopupAlign
            && typeof this.tooltipRef.tooltipRef.trigger.forcePopupAlign === 'function'
        ) {
            this.tooltipRef.tooltipRef.trigger.forcePopupAlign();
        }
    }

    handleWithTooltip(
        tooltipPrefixCls,
        {value, dragging, index, ...restProps}
    ) {
        const {tipFormatter, tooltipVisible, tooltipPlacement, getTooltipPopupContainer} = this.props;
        const {visibles} = this.state;
        const isTipFormatter = tipFormatter ? visibles[index] || dragging : false;
        const visible = tooltipVisible || (tooltipVisible === undefined && isTipFormatter);
        return (
            <Tooltip
                prefixCls={tooltipPrefixCls}
                title={tipFormatter ? tipFormatter(value) : ''}
                visible={visible}
                placement={tooltipPlacement || 'top'}
                transitionName="zoom-down"
                key={index}
                getPopupContainer={getTooltipPopupContainer}
                type="dark"
                ref={this.getTooltipRef}
            >
                <RcHandle
                    {...restProps}
                    value={value}
                    onMouseEnter={() => this.toggleTooltipVisible(index, true)}
                    onMouseLeave={() => this.toggleTooltipVisible(index, false)}
                    onChange={this.onChange}
                />
            </Tooltip>
        );
    }

    focus() {
        this.rcSlider.focus();
    }

    blur() {
        this.rcSlider.blur();
    }

    saveSlider = node => {
        this.rcSlider = node;
    };

    render() {
        const {
            prefixCls: customizePrefixCls,
            size,
            tooltipPrefixCls: customizeTooltipPrefixCls,
            range,
            readOnly,
            disabled,
            ...restProps
        } = this.props;
        const className = classNames(
            `${customizePrefixCls}-${size}`,
            {
                [`${customizePrefixCls}-readOnly`]: readOnly
            }
        );
        if (range) {
            return (
                <RcRange
                    {...restProps}
                    ref={this.saveSlider}
                    handle={info => this.handleWithTooltip(customizeTooltipPrefixCls, info)}
                    prefixCls={customizePrefixCls}
                    className={className}
                    tooltipPrefixCls={customizeTooltipPrefixCls}
                    disabled={disabled || readOnly}
                    onChange={this.onChange}
                />
            );
        }
        return (
            <RcSlider
                {...restProps}
                ref={this.saveSlider}
                handle={info => this.handleWithTooltip(customizeTooltipPrefixCls, info)}
                prefixCls={customizePrefixCls}
                className={className}
                tooltipPrefixCls={customizeTooltipPrefixCls}
                disabled={disabled || readOnly}
                onChange={this.onChange}
            />
        );
    }
}
