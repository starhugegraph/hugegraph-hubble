import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import SearchText from './searchText';
import Checkbox from '../checkbox';
import Tooltip from '../tooltip';

export default class CheckboxText extends PureComponent {
    static isCheckboxText = true;

    static propTypes = {
        searchValue: PropTypes.string,
        text: PropTypes.string,
        source: PropTypes.array,
        value: PropTypes.string,
        label: PropTypes.string,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        disabledReason: PropTypes.string,
        disablePlacement: PropTypes.string
    }

    static defaultProps = {
        searchValue: '',
        source: [],
        disablePlacement: 'right',
        disabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            searchValue: props.searchValue,
            source: props.source,
            checked: false
        };
    }

    componentWillReceiveProps = nextProps => {
        const searchValue = this.state.searchValue;
        const newState = {};
        if ('searchValue' in nextProps && searchValue !== nextProps.searchValue) {
            newState.searchValue = nextProps.searchValue;
        }
        if ('source' in nextProps) {
            newState.source = nextProps.source;
        }
        if ('checked' in nextProps) {
            newState.checked = nextProps.checked;
        }
        this.setState(newState);
    }

    render() {
        const {text, value, label, disabled, disabledReason, disablePlacement} = this.props;
        const searchLabel = text || label;
        const {searchValue, source} = this.state;
        const searchTextProps = {
            text: searchLabel,
            showSearch: true,
            searchValue
        };
        let checked = false;
        if (source.indexOf(value) > -1) {
            checked = true;
        }
        if ('checked' in this.props) {
            checked = this.state.checked;
        }
        const checkboxTextDom = (
            <span>
                <Checkbox checked={checked} disabled={disabled}/>
                <SearchText
                    {...searchTextProps}
                    disabled={disabled}
                />
            </span>
        );
        return (disabled && disabledReason) ? (
            <Tooltip title={disabledReason} placement={disablePlacement}>
                {checkboxTextDom}
            </Tooltip>
        ) : checkboxTextDom;
    }
}
