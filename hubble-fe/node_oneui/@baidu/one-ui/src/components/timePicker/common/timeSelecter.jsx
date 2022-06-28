import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import classnames from 'classnames';
import {scrollTo} from '../../../core/pickTimeTools';

export default class TimeSelecter extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        options: PropTypes.array,
        selectedIndex: PropTypes.number,
        type: PropTypes.string,
        onSelect: PropTypes.func,
        onMouseEnter: PropTypes.func
    };

    state = {
        active: false
    };

    componentDidMount() {
        // jump to selected option
        this.scrollToSelected(0);
    }

    componentDidUpdate(prevProps) {
        // smooth scroll to selected option
        if (prevProps.selectedIndex !== this.props.selectedIndex) {
            this.scrollToSelected(120);
        }
    }

    onSelect = value => {
        const {onSelect, type} = this.props;
        onSelect(type, value);
    };

    getOptions = () => {
        const {options, selectedIndex, prefixCls} = this.props;
        return options.map((item, index) => {
            const cls = classnames({
                [`${prefixCls}-select-option-selected`]: selectedIndex === index,
                [`${prefixCls}-select-option-disabled`]: item.disabled
            });
            const onClick = item.disabled
                ? undefined
                : () => {
                    this.onSelect(item.value);
                };
            return (
                <li onClick={onClick} className={cls} key={index} disabled={item.disabled}>
                    {item.value}
                </li>
            );
        });
    }

    handleMouseEnter = e => {
        this.setState({active: true});
        this.props.onMouseEnter(e);
    };

    handleMouseLeave = () => {
        this.setState({active: false});
    };

    saveList = node => {
        this.list = node;
    };

    scrollToSelected = duration => {
        // move to selected item
        const select = ReactDom.findDOMNode(this);
        const list = ReactDom.findDOMNode(this.list);
        if (!list) {
            return;
        }
        let index = this.props.selectedIndex;
        if (index < 0) {
            index = 0;
        }
        const topOption = list.children[index];
        const to = topOption.offsetTop;
        scrollTo(select, to, duration);
    }

    render() {
        const {prefixCls, options} = this.props;
        if (options.length === 0) {
            return null;
        }
        const cls = classnames(
            `${prefixCls}-select`,
            {
                [`${prefixCls}-select-active`]: this.state.active
            }
        );
        return (
            <div
                className={cls}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <ul ref={this.saveList}>{this.getOptions()}</ul>
            </div>
        );
    }
}
