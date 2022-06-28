import React, {PureComponent} from 'react';
import {polyfill} from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import partial from 'lodash/partial';
import classNames from 'classnames';
import {IconAngleRight, IconAngleLeft} from '@baidu/one-ui-icon';

class AlertPage extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        dataSource: PropTypes.arrayOf(PropTypes.node),
        defaultDataSource: PropTypes.arrayOf(PropTypes.node),
        onClose: PropTypes.func,
        initialSlide: PropTypes.number,
        slider: PropTypes.number,
        size: PropTypes.oneOf(['small', 'medium']),
        onPrevChange: PropTypes.func,
        onNextChange: PropTypes.func
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-alert-page',
        className: '',
        style: {},
        onClose() {},
        initialSlide: 0,
        size: 'medium',
        onPrevChange() {},
        onNextChange() {}
    }

    constructor(props) {
        super(props);
        const {dataSource, defaultDataSource, slider, initialSlide} = props;
        this.state = {
            dataSource: dataSource || defaultDataSource || [],
            slider: slider || initialSlide
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const newState = {};
        if ('dataSource' in nextProps) {
            newState.dataSource = [...nextProps.dataSource];
        }
        if ('slider' in nextProps && nextProps.slider !== prevState.slider) {
            newState.slider = nextProps.slider;
        }
        return newState;
    }

    onClose = (closeFunc, index, e) => {
        // 全局的
        this.props.onClose(index);
        // 每一个alert自身的onClose
        closeFunc(e);
        if (!('dataSource' in this.props)) {
            // 移除
            const {dataSource} = this.state;
            dataSource.splice(index, 1);
            this.setState({dataSource: [...dataSource]});
        }
    }

    getItems = () => {
        const dataSource = [...this.state.dataSource];
        const children = dataSource.map((child, index) => {
            if (!child) {
                return null;
            }
            const prefixCls = this.props.prefixCls;
            const key = child.key || String(index);
            const props = {
                key,
                ...child.props,
                onClose: partial(this.onClose, child.props.onClose, index),
                visible: true
            };
            return <span className={`${prefixCls}-slick-item`} key={key}>{React.cloneElement(child, props)}</span>;
        });
        return children;
    }

    saveRef = ref => {
        this.alertPageRef = ref;
    };

    prevChange = () => {
        const current = this.state.slider;
        if (current === 0) {
            return;
        }
        const prevSlider = current - 1;
        if (!('slider' in this.props)) {
            this.setState({
                slider: prevSlider
            });
        }

        this.props.onPrevChange(prevSlider);
    }

    nextChange = childrenLength => {
        const current = this.state.slider;
        if (current === childrenLength - 1) {
            return;
        }
        const nextSlider = current + 1;
        if (!('slider' in this.props)) {
            this.setState({
                slider: nextSlider
            });
        }

        this.props.onNextChange(nextSlider);
    }

    render() {
        const {prefixCls, className, style, size} = this.props;
        const {dataSource, slider} = this.state;
        if (!dataSource.length) {
            return null;
        }
        const children = this.getItems();
        const alertClassNames = classNames(prefixCls, className, `${prefixCls}-${size}`, {
            [`${prefixCls}-first-page`]: slider === 0,
            [`${prefixCls}-last-page`]: slider === children.length - 1
        });
        return (
            <div ref={this.saveRef} className={alertClassNames} style={style}>
                {children[slider]}
                <div className={`${prefixCls}-count`}>
                    <IconAngleLeft onClick={this.prevChange} />
                    <span>
                        {slider + 1}
                        /
                        {children.length}
                    </span>
                    <IconAngleRight onClick={partial(this.nextChange, children.length)} />
                </div>
            </div>
        );
    }
}

polyfill(AlertPage);

export default AlertPage;
