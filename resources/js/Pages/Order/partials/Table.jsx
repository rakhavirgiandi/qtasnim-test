import React from 'react';
import { MoreHorizontal, CirclePlus, Download } from "lucide-react"
import { Button } from "@/Components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import DataTable from '@/Components/data-table/DataTable';
import { Link, useForm } from '@inertiajs/react';

const Table = (props) => {

  const { data, meta } = props;

  const { delete: destroy, errors, processing, recentlySuccessful } = useForm();

  const deleteHandle = (orderID) => {
    destroy(route('orders.destroy', { id: orderID }));
  }

  const columns = [
      {
          accessorKey: "no",
          header: "No",
          cell: ({ row, cell }) => {
            const currentPage = meta?.currentPage ? meta.currentPage : 0;
            const numberOfRow = currentPage * (row.index + 1);
            
            return numberOfRow;
          },
      },
      {
          accessorKey: "name",
          isServerSideSorting: true,
          headerText: "Name",
          cell: ({ row, cell }) => {
            return row.original.product?.name
          },
      },
      {
          accessorKey: "stock",
          header: "Stock",
          cell: ({row}) => {
            return row.original.previous_stock         
          }
      },
      {
          accessorKey: "order_date",
          isServerSideSorting: true,
          headerText: "Order Date",
          cell: ({row}) => {
              return row.original.order_date;
          }
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({row}) => {
          return row.original.product?.category?.title            
        }
      },
      {
          id: "actions",
          cell: ({row}) => {
              return (
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="hover:cursor-pointer" onClick={() => { deleteHandle(row.original.id) }} disabled={processing}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
              )
          },
      }
  ];

  return (
      <>
        <DataTable searchable={true} data={data} meta={meta} columns={columns} pagination={true} additionalComponentTopRight={<>
          <Button asChild variant="outline" size="sm">
            <Link href={route('orders.create')}><CirclePlus /> Add</Link>
          </Button>
        </>} />
      </>
  );
}

export default Table;