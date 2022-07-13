import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {polyfill} from 'react-lifecycles-compat';
import {IconAngleLeft, IconAngleRight} from '@baidu/one-ui-icon';
import Select from '../select';
import {transSizeOfDefault} from '../../core/commonTools';
import Button from '../button';
import Input from '../input';

const SelectOption = Select.Option;

const isInteger = value => {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

const calculatePage = (pageSize, total) => {
    return Math.floor((total - 1) / pageSize) + 1;
};

class Pagination extends PureComponent {
    static propTypes = {
        /**
         * 当前总数
         */
        total: PropTypes.number,
        /**
         * 当前页数
         */
        pageNo: PropTypes.number,
        /**
         * 当前页码
         */
        pageSize: PropTypes.number,
        /**
         * 默认的pageNo
         */
        defaultPageNo: PropTypes.number,
        /**
         * 默认的pageSize
         */
        defaultPageSize: PropTypes.number,
        /**
         * 页数change的时候触发的函数， 传出e
         */
        onPageNoChange: PropTypes.func,
        /**
         * 是否隐藏分页器，如果只有一页的情况
         */
        hideOnSinglePage: PropTypes.bool,
        /**
         * 是否展示分页器，页码下拉选择
         */
        showSizeChange: PropTypes.bool,
        /**
         * 页码选项
         */
        pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
        /**
         * 页码改变的时候触发的函数, 传出e
         */
        onPageSizeChange: PropTypes.func,
        /**
         * 分页器尺寸 small, medium, large
         */
        size: PropTypes.oneOf(['xsmall', 'small', 'medium']),
        /**
         * 分页器传入的类名
         */
        className: PropTypes.string,
        /**
         * 类名前缀
         */
        prefixCls: PropTypes.string,
        /**
         * 页码下拉选择器类名前缀
         */
        selectPrefixCls: PropTypes.string,
        /**
         * 是否展示跳页器
         */
        showPageJumper: PropTypes.bool,
        selectWidth: PropTypes.number,
        /**
         * pagination的select的props
         */
        selectProps: PropTypes.object
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-pagination',
        selectPrefixCls: 'new-fc-one-select',
        pageSizeOptions: ['20', '50', '100'],
        total: 0,
        defaultPageSize: 20,
        defaultPageNo: 1,
        size: 'small',
        className: '',
        onPageNoChange() {},
        onPageSizeChange() {},
        hideOnSinglePage: false,
        showSizeChange: true,
        showPageJumper: true,
        selectWidth: 64,
        selectProps: {}
    };

    constructor(props) {
        super(props);
        const pageSize = props.pageSize || props.defaultPageSize;
        const total = props.total;
        this.state = {
            pageSize,
            pageNo: props.pageNo || props.defaultPageNo,
            total,
            lastPage: calculatePage(pageSize, total),
            searchValue: ''
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const newState = {};
        if ('pageNo' in nextProps && nextProps.pageNo !== prevState.pageNo) {
            newState.pageNo = nextProps.pageNo;
        }
        if ('pageSize' in nextProps && nextProps.pageSize !== prevState.pageSize) {
            const pageSize = nextProps.pageSize;
            const newPage = calculatePage(pageSize, prevState.total);
            if (!('pageNo' in nextProps)) {
                // 统一为页码更改，非受控情况下，页码跳转回第一页 (pageSize受控，pageNo不受控)
                newState.pageNo = 1;
            }
            newState.lastPage = newPage;
            newState.pageSize = pageSize;
        }
        if ('total' in nextProps && nextProps.total !== prevState.total) {
            const total = nextProps.total;
            const pageSize = prevState.pageSize;
            const newPage = calculatePage(pageSize, total);
            if (!('pageNo' in nextProps)) {
                newState.pageNo = 1;
            }
            newState.lastPage = newPage;
            newState.total = total;
        }
        return newState;
    }

    getPaginationContainer = ref => {
        this.paginationNode = ref;
    }

    getOptionByList = () => {
        const pageSizeOptions = this.props.pageSizeOptions;
        const options = [];
        pageSizeOptions.forEach(option => {
            options.push({
                value: option,
                label: option
            });
        });
        return options;
    }

    isValidPage = page => {
        return isInteger(page) && page >= 1 && page !== this.state.pageNo;
    }

    handlePageSizeChange = pageSize => {
        const size = +pageSize;
        const newPage = calculatePage(size, this.state.total);
        const newState = {};
        if (!('pageSize' in this.props)) {
            newState.pageSize = size;
        }
        if (!('pageNo' in this.props)) {
            // 统一为页码更改，非受控情况下，页码跳转回第一页
            newState.pageNo = 1;
        }
        newState.lastPage = newPage;
        this.setState(newState);
        this.props.onPageSizeChange({
            target: {
                value: size
            }
        });
    }

    handleChange = p => {
        let page = p;
        const {pageSize, total} = this.state;
        if (this.isValidPage(page)) {
            const lastPage = calculatePage(pageSize, total);
            if (page > lastPage) {
                page = lastPage;
            }

            if (!('pageNo' in this.props)) {
                this.setState({
                    pageNo: page
                });
            }
            this.props.onPageNoChange({
                target: {
                    value: page
                }
            });
        }
    }

    handleItemPageChange = e => {
        const dataset = e && e.currentTarget && e.currentTarget.dataset;
        const key = dataset && dataset.key;
        if (key) {
            this.handleChange(+key);
        }
    }

    goToPrevPage = () => {
        const pageNo = this.state.pageNo;
        if (pageNo > 1) {
            if (!('pageNo' in this.props)) {
                this.setState({
                    pageNo: (pageNo - 1)
                });
            }
            this.handleChange(pageNo - 1);
        }
    }

    goToNextPage = () => {
        const {pageNo, lastPage} = this.state;
        if (lastPage > pageNo) {
            if (!('pageNo' in this.props)) {
                this.setState({
                    pageNo: (pageNo + 1)
                });
            }
            this.handleChange(pageNo + 1);
        }
    }

    jumpToPrevPage = () => {
        const pageNo = this.state.pageNo;
        const range = 5;
        const newPage = (pageNo - range) > 1 ? (pageNo - range) : 1;
        if (!('pageNo' in this.props)) {
            this.setState({
                pageNo: newPage
            });
        }
        this.handleChange(newPage);
    }

    jumpToNextPage = () => {
        const {pageNo, pageSize, total} = this.state;
        const range = 5;
        const lastPage = calculatePage(pageSize, total);
        const newPage = (pageNo + range) > lastPage ? lastPage : (pageNo + range);
        if (!('pageNo' in this.props)) {
            this.setState({
                pageNo: newPage
            });
        }
        this.handleChange(newPage);
    }

    generateItemRender = () => {
        const {props, state} = this;
        const {prefixCls, size} = props;
        const {lastPage, pageNo} = state;
        const pageBufferSize = 2;
        const itemList = [];
        let hasPrevDot = false;
        let hasNextDot = false;
        const buttonProps = {
            onClick: this.handleItemPageChange,
            size
        };
        if (lastPage < 7) {
            for (let i = 1; i <= lastPage; i++) {
                const itemProps = {
                    className: classNames(`${prefixCls}-pager-item`, {
                        [`${prefixCls}-pager-item-active`]: i === +pageNo
                    }),
                    'data-key': i,
                    key: i,
                    ...buttonProps
                };
                itemList.push(
                    <Button {...itemProps}>
                        {i}
                    </Button>
                );
            }
            return itemList;
        }

        let left = Math.max(1, pageNo - pageBufferSize);
        let right = Math.min(pageNo + pageBufferSize, lastPage);

        if (pageNo - 1 <= pageBufferSize) {
            right = 1 + (pageBufferSize * 2);
        }

        if (lastPage - pageNo <= pageBufferSize) {
            left = lastPage - (pageBufferSize * 2);
        }

        for (let i = left; i <= right; i++) {
            const itemProps = {
                className: classNames(`${prefixCls}-pager-item`, {
                    [`${prefixCls}-pager-item-active`]: i === +pageNo
                }),
                'data-key': i,
                key: i,
                ...buttonProps
            };
            itemList.push(
                <Button {...itemProps}>
                    {i}
                </Button>
            );
        }
        if (pageNo - 1 >= pageBufferSize * 2 && pageNo !== 1 + pageBufferSize) {
            itemList.unshift(
                <span
                    className={`${prefixCls}-pager-item ${prefixCls}-pager-item-dot ${prefixCls}-pager-item-dot-prev`}
                    key="jump-prev"
                    onClick={this.jumpToPrevPage}
                >
                    ...
                </span>
            );
            hasPrevDot = true;
        }

        if (lastPage - pageNo >= pageBufferSize * 2 && pageNo !== lastPage - 2) {
            itemList.push(
                <span
                    className={`${prefixCls}-pager-item ${prefixCls}-pager-item-dot ${prefixCls}-pager-item-dot-next`}
                    key="jump-next"
                    onClick={this.jumpToNextPage}
                >
                    ...
                </span>
            );
            hasNextDot = true;
        }

        if (hasPrevDot && hasNextDot) {
            delete itemList[1];
            delete itemList[itemList.length - 2];
        }

        if (left !== 1) {
            itemList.unshift(
                <Button
                    className={`${prefixCls}-pager-item`}
                    data-key={1}
                    key={1}
                    {...buttonProps}
                >
                    1
                </Button>
            );
        }

        if (right !== lastPage) {
            itemList.push(
                <Button
                    className={`${prefixCls}-pager-item`}
                    data-key={lastPage}
                    key={lastPage}
                    {...buttonProps}
                >
                    {lastPage}
                </Button>
            );
        }
        return itemList;
    }

    onChangeInput = e => {
        const value = e.value;
        this.setState({
            searchValue: value
        });
    }

    onJumpToPager = value => {
        const {pageSize, total} = this.state;
        if (!isInteger(value)) {
            return;
        }
        const lastPage = calculatePage(pageSize, total);
        let jumpToPage = value;
        if (jumpToPage > lastPage) {
            jumpToPage = lastPage;
        }
        if (jumpToPage <= 0) {
            jumpToPage = 1;
        }
        const newState = {
            searchValue: ''
        };
        if (!('pageNo' in this.props)) {
            newState.pageNo = jumpToPage;
        }
        this.setState(newState);
        this.props.onPageNoChange({
            target: {
                value: jumpToPage
            }
        });
    }

    onInputKeyDown = e => {
        const value = +e.value;
        this.onJumpToPager(value);
    }

    onInputKeyConfirm = () => {
        this.onJumpToPager(+this.state.searchValue);
    }

    render() {
        const {
            prefixCls,
            selectPrefixCls,
            hideOnSinglePage,
            showSizeChange,
            className,
            showPageJumper,
            selectWidth,
            selectProps
        } = this.props;
        const {pageNo, pageSize, lastPage, searchValue} = this.state;
        const size = transSizeOfDefault(this.props.size, 'small');
        const paginationProps = {
            className: classNames(`${prefixCls}`, className, {
                [`${prefixCls}-${size}`]: size
            })
        };

        const paginationSelectProps = {
            ...selectProps,
            width: selectWidth,
            onChange: this.handlePageSizeChange,
            value: `${pageSize}`,
            size
        };
        const itemList = this.generateItemRender();
        const itemLength = itemList.length;
        if (itemLength < 2 && hideOnSinglePage) {
            // 只有一页的时候隐藏分页器
            return null;
        }
        const options = this.getOptionByList();
        return (
            <div {...paginationProps}>
                {
                    (showSizeChange && itemLength) ? (
                        <div className={`${prefixCls}-select`}>
                            <span className={`${prefixCls}-select-title`}>
                                每页显示
                            </span>
                            <span className={`${selectPrefixCls}-container ${prefixCls}-select-menu`} ref={this.getPaginationContainer}>
                                <Select {...paginationSelectProps}>
                                    {
                                        options.map(option => {
                                            return (
                                                <SelectOption key={option.value}>
                                                    {option.label}
                                                </SelectOption>
                                            );
                                        })
                                    }
                                </Select>
                            </span>
                        </div>
                    ) : null
                }
                <div className={`${prefixCls}-pager`}>
                    <span className={`${prefixCls}-pager-list`}>
                        {
                            <Button className={`${prefixCls}-pager-item ${prefixCls}-pager-item-jumper`} size={size} disabled={pageNo <= 1} onClick={this.goToPrevPage}>
                                <IconAngleLeft />
                            </Button>
                        }
                        {
                            itemList.map(item => {
                                return item;
                            })
                        }
                        {
                            <Button className={`${prefixCls}-pager-item ${prefixCls}-pager-item-jumper`} size={size} disabled={pageNo >= lastPage} onClick={this.goToNextPage}>
                                <IconAngleRight />
                            </Button>
                        }
                    </span>
                    {
                        showPageJumper && (
                            <div className={`${prefixCls}-jumper`}>
                                <span className={`${prefixCls}-jumper-title`}>
                                    去第
                                </span>
                                <Input
                                    width={40}
                                    className={`${prefixCls}-input`}
                                    size={size}
                                    value={searchValue}
                                    onChange={this.onChangeInput}
                                    onPressEnter={this.onInputKeyDown}
                                />
                                <span className={`${prefixCls}-jumper-title`}>
                                    页
                                </span>
                                <Button className={`${prefixCls}-jumper-confirm`} onClick={this.onInputKeyConfirm} size={size}>
                                    确定
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

polyfill(Pagination);

export default Pagination;
