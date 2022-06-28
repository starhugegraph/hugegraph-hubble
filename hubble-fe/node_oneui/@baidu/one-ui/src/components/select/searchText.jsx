import React, {PureComponent} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class SearchText extends PureComponent {
    static propTypes = {
        text: PropTypes.string,
        showSearch: PropTypes.bool,
        searchValue: PropTypes.string,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        prefixCls: PropTypes.string
    }

    static defaultProps = {
        className: '',
        disabled: false,
        prefixCls: 'new-fc-one-select'
    }

    constructor(props) {
        super(props);
        this.state = {
            searchValue: props.searchValue || ''
        };
    }

    componentWillReceiveProps(nextProps) {
        const searchValue = nextProps.searchValue;
        const currentSearchValue = this.state.searchValue;
        if (searchValue !== currentSearchValue) {
            this.setState({searchValue});
        }
    }

    formatTextWithColor = (text, searchValue) => {
        const pivolIndex = text.indexOf(searchValue);
        const prefixCls = this.props.prefixCls;
        if (pivolIndex < 0) {
            return <span>{text}</span>;
        }
        const textArray = _.flattenDeep(text.split(searchValue).map((node, index) => {
            return index === 0
                ? [<span key={index}>{node}</span>]
                : [
                    <span key={`${index}-highlight`} className={`${prefixCls}-search-text-highlight`}>{searchValue}</span>,
                    <span key={index}>{node}</span>
                ];
        }));

        const strDom = (
            <span>
                {
                    textArray.map(node => {
                        return node;
                    })
                }
            </span>
        );
        return strDom;
    }

    render() {
        const {
            text,
            showSearch,
            className,
            prefixCls,
            disabled
        } = this.props;
        const searchValue = this.state.searchValue;
        const searchTextClassName = classNames({
            [`${prefixCls}-search-text-disabled`]: disabled
        }, className);
        if (!showSearch || !searchValue) {
            return <span className={className}>{text}</span>;
        }
        return (
            <span className={searchTextClassName}>
                {this.formatTextWithColor(text, searchValue)}
            </span>
        );
    }
}
