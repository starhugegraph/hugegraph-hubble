import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'mini-store';
import ExpandIcon from './expandIcon';

class ExpandableRow extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string.isRequired,
        rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        record: PropTypes.object.isRequired,
        indentSize: PropTypes.number,
        needIndentSpaced: PropTypes.bool.isRequired,
        expandRowByClick: PropTypes.bool,
        expanded: PropTypes.bool.isRequired,
        expandIconAsCell: PropTypes.bool,
        expandIconColumnIndex: PropTypes.number,
        childrenColumnName: PropTypes.string,
        expandedRowRender: PropTypes.func,
        onExpandedChange: PropTypes.func.isRequired,
        onRowClick: PropTypes.func,
        children: PropTypes.func.isRequired,
        indent: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired
    };

    componentWillUnmount() {
        this.handleDestroy();
    }

    hasExpandIcon = columnIndex => {
        const expandRowByClick = this.props.expandRowByClick;
        return (
            !this.expandIconAsCell && !expandRowByClick && columnIndex === this.expandIconColumnIndex
        );
    };

    handleExpandChange = (record, event) => {
        const {onExpandedChange, expanded, rowKey} = this.props;
        if (this.expandable) {
            onExpandedChange(!expanded, record, event, rowKey);
        }
    };

    handleDestroy() {
        const {onExpandedChange, rowKey, record} = this.props;
        if (this.expandable) {
            onExpandedChange(false, record, null, rowKey, true);
        }
    }

    handleRowClick = (record, index, event) => {
        const {expandRowByClick, onRowClick} = this.props;
        if (expandRowByClick) {
            this.handleExpandChange(record, event);
        }
        if (onRowClick) {
            onRowClick(record, index, event);
        }
    };

    renderExpandIcon = newExpanded => {
        const {prefixCls, record, expanded, needIndentSpaced} = this.props;
        const currentExpanded = newExpanded || expanded;

        return (
            <ExpandIcon
                expandable={this.expandable}
                prefixCls={prefixCls}
                onExpand={this.handleExpandChange}
                needIndentSpaced={needIndentSpaced}
                expanded={currentExpanded}
                record={record}
            />
        );
    };

    renderExpandIconCell = cells => {
        if (!this.expandIconAsCell) {
            return;
        }
        const prefixCls = this.props.prefixCls;

        cells.push(
            <td className={`${prefixCls}-expand-icon-cell`} key="new-fc-one-table-expand-icon-cell">
                {this.renderExpandIcon()}
            </td>,
        );
    };

    render() {
        const {
            childrenColumnName, expandedRowRender, indentSize,
            record, fixed, expanded, index, indent
        } = this.props;

        this.expandIconAsCell = fixed !== 'right' ? this.props.expandIconAsCell : false;
        this.expandIconColumnIndex = fixed !== 'right' ? this.props.expandIconColumnIndex : -1;
        const childrenData = record[childrenColumnName];
        // eslint-disable-next-line no-bitwise
        this.expandable = !!(childrenData || (expandedRowRender && expandedRowRender(record, index, indent, expanded)));

        const expandableRowProps = {
            indentSize,
            onRowClick: this.handleRowClick,
            hasExpandIcon: this.hasExpandIcon,
            renderExpandIcon: this.renderExpandIcon,
            renderExpandIconCell: this.renderExpandIconCell,
            expanded
        };

        return this.props.children(expandableRowProps);
    }
}

export default connect(({expandedRowKeys}, {rowKey}) => ({
    // eslint-disable-next-line no-bitwise
    expanded: !!~expandedRowKeys.indexOf(rowKey)
}))(ExpandableRow);
