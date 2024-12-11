import React, { useEffect, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { router, usePage } from '@inertiajs/react'
import { Checkbox } from "@/Components/ui/checkbox"
import { Button } from "@/Components/ui/button"
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import { getCommonPinningStyles } from "@/../../lib/datatable"

function IndeterminateCheckbox({ indeterminate, className = '', ...rest }) {
  const ref = React.useRef(null);
  
  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);
  

  return (
    <Checkbox
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}

export function Table(props) {

  const {
    columns,
    data,
    enableRowSelection,
    meta
  } = props;
  
  let columnsTable = columns;
  
  const page = usePage();
  const params = route().params;

  const tableOptions = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...props,
  }  
  
  const [rowSelection, setRowSelection] = useState([]);

  if (enableRowSelection) {
    const onSelectionChecked = (value, index) => {{
      if (value === true) { 
        setRowSelection([
          ...rowSelection,
          index
        ]);
      } else {
        setRowSelection(val => rowSelection.filter(item => item !== index));
      }
    }};

    const isAllRowSelected = (table) => {
      const rows = table.getRowModel().rows;
      if (rowSelection.length > 0) {
          return rows.every(item => rowSelection.includes(item.index));
      }

      return false;
    }

    const onHeaderSelectionChecked = (table, value) => {
      const rows = table.getRowModel().rows;
      if (value === true) {
        let selectedRows = rows
        .filter(item => !rowSelection.includes(item.index))
        .map(item => {
          return item.index;
        });

        if (table.options.enableSubRowSelection === false) {
          selectedRows = rows
          .filter(item => !rowSelection.includes(item.index))
          .filter(item => item.depth === 0)
          .map(item => {
            return item.index;
          });
        }
        
        setRowSelection(prevState => [...prevState, ...selectedRows]);
        rowSelection.sort();
      } else {
        setRowSelection([])
      }
    }

    const isSelectionChecked = (index) => {
      if (rowSelection.includes(index)) {
        return true;
      } else {
        return false;
      }
    }

    tableOptions.columns = [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: isAllRowSelected(table),
              onCheckedChange:(value) => {
                onHeaderSelectionChecked(table, value)
              }
            }}
          />
        ),
        cell: ({ row, table }) => {
          
          return (
            <>
            {row.depth === 0 || row.getCanSelectSubRows() === true ?
            <IndeterminateCheckbox
            {...{
              checked: isSelectionChecked(row.index),
              onCheckedChange: (value) => {
                onSelectionChecked(value, row.index);
              },
            }}
            />
            : ""}
          </>
        )},
        enableSorting: false,
        enableHiding: false,
      }, ...columns
    ];

    meta.rowsSelected = rowSelection.length;
    
    useEffect(() => {
      if (rowSelection.length > 0) { 
        setRowSelection([]);
      }

    }, [JSON.stringify(page.url)]);


    useEffect(() => {
      if (props.rowSelection && typeof props.rowSelection === 'function') {
        props.rowSelection(rowSelection);
      }
    }, [rowSelection]);

  };
  
  columns.map((val, i) => {
    const key = val.accessorKey ? val.accessorKey : val.id ? val.id : false;
    const headerText = val.headerText ? val.headerText : key;

    if (key && val.isServerSideSorting) {
      columns[i].header = () => {
        
        return (
          <div className="flex items-center space-x-2">
          <Button
          variant="ghost"
          className="h-8 py-0 px-3 focus:ring-0 -ml-3 transition-colors focus:ring-offset-0"
          onClick={() => {
            if (params['sort-type'] === 'desc') {
              const _query = { ...params, sort: key, 'sort-type': 'asc' };
              const url = route(route().current());
              router.get(url, _query, {replace: true, preserveState: true});
            } else {
              const _query = { ...params, sort: key, 'sort-type': 'desc' };
              const url = route(route().current());
              router.get(url, _query, {replace: true, preserveState: true});
            } 
          }}>
            {headerText}
            {params.sort === key && params['sort-type'] === 'asc' ?
              <ChevronUp className=" h-4 w-4" />
            : params.sort === key && params['sort-type'] === 'desc' ?
              <ChevronDown className=" h-4 w-4" /> 
            : <ChevronsUpDown className=" h-4 w-4" />}
          </Button>
        </div>
        )
      };
    }
  })
  
  const table = useReactTable(tableOptions);

  useEffect(() => {
    if (props.onExpandedChange && typeof props.onExpandedChange === 'function') {
      props.onExpandedChange();
    }
  }, [data]);

  return (
    <>
    <div className="rounded-md border">
      <TableComponent>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} style={{
                    ...getCommonPinningStyles({ column: header.column }),
                  }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{
                    ...getCommonPinningStyles({ column: cell.column }),
                  }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
              {row.getIsExpanded() && table.renderSubComponent && (
                <TableRow>
                {/* 2nd row is a custom 1 cell row */}
                <TableCell colSpan={row.getVisibleCells().length} >
                {
                  props.renderSubComponent && typeof props.renderSubComponent === 'function' ?
                  props.renderSubComponent({ row })
                  : ""
                }
                </TableCell>
                </TableRow>
              )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnsTable.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableComponent>
    </div>
    </>
  )
}


