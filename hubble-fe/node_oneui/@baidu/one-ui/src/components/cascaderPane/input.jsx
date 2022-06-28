import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {polyfill} from 'react-lifecycles-compat';
import Input from '../input';

class CascaderInput extends PureComponent {
    static propTypes = {
        /** 输入框的value */
        value: PropTypes.string,
        /** default value */
        defaultValue: PropTypes.string,
        /** 搜索框的props */
        searchProps: PropTypes.object,
        /** input onChange */
        onInputChange: PropTypes.func,
        /** 搜索框的宽度 */
        width: PropTypes.number
    }

    static defaultProps = {
        searchProps: {
            placeholder: '请输入...'
        },
        onInputChange() {},
        width: 360
    }

    constructor(props) {
        super(props);
        this.state = {
            value: props.value || props.defaultValue || undefined
        };
    }

    static getDerivedStateFromProps(nextProps) {
        const newState = {};
        if ('value' in nextProps) {
            newState.value = nextProps.value;
        }
        return newState;
    }

    onInputChange = e => {
        const value = e.value;
        if (!('value' in this.props)) {
            this.setState({
                value
            });
        }
        this.props.onInputChange(e);
    }

    render() {
        const {searchProps, width} = this.props;
        const value = this.state.value;
        return (
            <Input
                {...searchProps}
                value={value}
                onChange={this.onInputChange}
                width={width}
            />
        );
    }
}

polyfill(CascaderInput);

export default CascaderInput;
