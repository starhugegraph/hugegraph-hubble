import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';
import Button from '../button';
import PopSelectTrigger from '../select/common/popSelectTrigger';

export default class PopLayer extends PureComponent {
    static propTypes = {
        /**
         * 类名前缀
         */
        prefixCls: PropTypes.string,
        /**
         * 触发方式，hover\click  默认hover
         */
        trigger: PropTypes.string,
        /**
         * popLayer的children
         */
        children: PropTypes.node,
        /**
         * 是否禁用，默认false
         */
        disabled: PropTypes.bool,
        /**
         * 默认是否可视
         */
        visible: PropTypes.bool,
        /**
         * 使用标准触发的按钮的文案
         */
        header: PropTypes.string,
        /**
         * visibleChange的时候触发的函数
         */
        onVisibleChange: PropTypes.func,
        /**
         * 禁止使用的原因
         */
        disabledReason: PropTypes.string,
        /**
         * 是否展示禁止理由
         */
        showDisabledReason: PropTypes.bool,
        /**
         * 使用让popLayer与按钮同宽
         */
        dropdownMatchSelectWidth: PropTypes.bool,
        /**
         * popLayer 挂载的函数
         */
        getPopupContainer: PropTypes.func,
        size: PropTypes.oneOf(['small', 'medium', 'large'])
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-popLayer',
        trigger: 'hover',
        disabled: false,
        header: '',
        onVisibleChange() {},
        disabledReason: '',
        showDisabledReason: false,
        dropdownMatchSelectWidth: true,
        size: 'medium'
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible
        };
    }

    componentWillReceiveProps = nextProps => {
        if ('visible' in nextProps) {
            this.setState({
                visible: nextProps.visible
            });
        }
    }

    onVisibleChange = visible => {
        if (!('visible' in this.props)) {
            this.setState({
                visible
            });
        }
        const onVisibleChange = this.props.onVisibleChange;
        if (onVisibleChange) {
            onVisibleChange(visible);
        }
    }

    renderHeader = () => {
        const {children, prefixCls, disabled, header, size} = this.props;
        const visible = this.state.visible;
        if (children) {
            return children;
        }
        const headerClassName = `${prefixCls}-header`;
        const classes = classNames(headerClassName, {
            [`${headerClassName}-open`]: visible,
            [`${headerClassName}-disabled`]: disabled
        });
        return (
            <span className={classes}>
                <Button
                    icon={<Icon type="angle-down" />}
                    size={size}
                    disabled={disabled}
                >
                    {header}
                </Button>
            </span>
        );
    }

    render() {
        const popLayerProps = {
            ...this.props,
            visible: this.state.visible,
            onVisibleChange: this.onVisibleChange
        };
        const children = this.renderHeader();
        return (
            <PopSelectTrigger {...popLayerProps}>
                {children}
            </PopSelectTrigger>
        );
    }
}
