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

  const deleteHandle = (productID) => {
    // console.log(productID);
    destroy(route('categories.destroy', { id: productID }));
  }

  const columns = [
      {
          accessorKey: "key",
          header: "Key",
      },
      {
          accessorKey: "title",
          header: "Title",
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
                  <Link href={route('categories.edit', {id: row.original.id})}>
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:cursor-pointer" onClick={() => { deleteHandle(row.original.id) }} disabled={processing}>
                    Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
              )
          },
      }
  ];

  return (
      <>
        <DataTable data={data} meta={meta} columns={columns} pagination={true} expanded={true} additionalComponentTopRight={<>
          <Button asChild variant="outline" size="sm">
            <Link href={route('categories.create')}><CirclePlus /> Add</Link>
          </Button>
        </>} />
      </>
  );
}

export default Table;