import React, { useState } from 'react';
import { getExpandedRowModel, getSortedRowModel } from "@tanstack/react-table";
import Header from '@/Components/data-table/Header';
import { DataTablePagination } from '@/Components/data-table/Pagination';
import PropTypes from 'prop-types';
import { Table } from './Table';

const DataTable = ({data, meta, columns, columnsFilter, onRowSelection, searchable, pagination, advanceFilter, enableRowSelection, renderSubComponent, expanded, additionalComponentTopRight, ...props }) => {

    const [rowSelection, setRowSelection] = useState([]);

    let { table } = props;

    const [rowExpanded,setRowExpanded] = useState();

    const onRowSelected = (value) => {
        setRowSelection(value);
        if (onRowSelection && typeof onRowSelection === "function") {
            onRowSelection(value)
        }
    }

    meta.totalRowCurrent = data.length;

    const [isAdvanceFilterDialogOpen, setIsAdvanceFilterDialogOpen] = useState(false);

    const onFilterAppliedHandle = () => {
        setIsAdvanceFilterDialogOpen(false)
    }

    let state = {};

    if (expanded) {
      state.expanded = rowExpanded;
      table = {...table, getExpandedRowModel: getExpandedRowModel(), onExpandedChange: setRowExpanded};
    }
    return (
        <>
          <Header searchable={searchable} advanceFilter={advanceFilter} rowSelection={rowSelection} dialogFilterOnOpen={() => { setIsAdvanceFilterDialogOpen(true) }} additionalComponentTopRight={additionalComponentTopRight} />
          <Table data={data} meta={meta} columns={columns} rowSelection={onRowSelected} enableRowSelection={enableRowSelection} getSortedRowModel={getSortedRowModel()} state={state} initialState={{columnPinning: { right: ["actions"] }}} {...table}/>
          {pagination && meta ?
            <DataTablePagination meta={meta}  />
            : ""}
          {/* {advanceFilter && columnsFilter ?
            <AdvanceFilterDialog open={isAdvanceFilterDialogOpen} onOpenChange={(val) => setIsAdvanceFilterDialogOpen(val)} columnsFilter={columnsFilter} onFilterApplied={onFilterAppliedHandle} />
          : ""} */}
        </>
    );
}

export default DataTable;

DataTable.propTypes = {
    meta: PropTypes.shape({
      path: PropTypes.string.isRequired,
      currentPage: PropTypes.number.isRequired,
      lastPage: PropTypes.number.isRequired,
      firstPage: PropTypes.number.isRequired,
      limit: PropTypes.number.isRequired,
      from: PropTypes.number,
      to: PropTypes.number,
      total: PropTypes.number.isRequired,
      pageQuery: PropTypes.string
    }).isRequired,
    data: PropTypes.array,
    columns: PropTypes.array.isRequired,
    columnsFilter: PropTypes.array,
    onRowSelection: PropTypes.func,
    searchable: PropTypes.bool,
    pagination: PropTypes.bool,
    advanceFilter: PropTypes.bool
  }
