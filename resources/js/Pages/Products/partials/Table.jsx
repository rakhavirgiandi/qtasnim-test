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
import { Link } from '@inertiajs/react';

const Table = (props) => {

  const { data, meta } = props;

  const columns = [
      {
          accessorKey: "name",
          headerText: "Name",
      },
      {
          accessorKey: "category",
          headerText: "Category",
          cell: ({row}) => {
            return row.original.category?.title;
            
          }
      },
      {
          accessorKey: "price",
          headerText: "Price",
          cell: ({row}) => {
            if (row.original) {
              return row.original.full_price;
            }
          }
      },
      {
          accessorKey: "stock",
          headerText: "Stock",
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
                <DropdownMenuItem asChild className="hover:cursor-pointer">
                  <Link href={route('products.edit', {id: row.original.id})}>
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
              )
          },
      }
  ];

  return (
      <>
        <DataTable data={data} meta={meta} columns={columns} pagination={true} expanded={true} table={{getSubRows: row => row.products, enableSubRowSelection: false}} additionalComponentTopRight={<>
          <Button asChild variant="outline" size="sm">
            <Link href={route('products.create')}><CirclePlus /> Add</Link>
          </Button>
        </>} />
      </>
  );
}

export default Table;