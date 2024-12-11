import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
  } from "@radix-ui/react-icons";
  import { Button } from "./../ui/button"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "./../ui/select";
  import PropTypes from 'prop-types';
import { useState } from "react";
import { router } from '@inertiajs/react'
  
export function DataTablePagination({
  limitOptions = [10, 25, 50, 100],
  meta
}) {
  if (!meta.pageQuery) meta.pageQuery = 'page';
  if (!meta.rowsSelected) meta.rowsSelected = 0;

  const { path, firstPage, currentPage, lastPage, limit, from, to, totalRowCurrent, total, rowsSelected, pageQuery } = meta;
  const params = route().params;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const paginateAction = {
    action: (pageNumber) => {
      let queryParams = { ...params, [pageQuery]: pageNumber };
      if (pageNumber == "prev_page") {
        queryParams = { ...params, [pageQuery]: prevPage };
      } else if (pageNumber == "next_page") {
        queryParams = { ...params, [pageQuery]: nextPage };
      }
      router.get(path, queryParams, {replace: true, preserveState: true});
    },
    isDisabled: (pageNumber) => {
      if (pageNumber == "prev_page" && firstPage == currentPage) {
        return true;
      } else if (pageNumber == "next_page" && lastPage == currentPage) {
        return true;
      }
      if (currentPage == pageNumber) {
        return true;
      }
      return false;
    }
  };
  
  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8 mt-3">
      <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
        {
          rowsSelected > 0 ? 
          `${rowsSelected} of ${totalRowCurrent} row(s) selected.`
          :
          `Showing ${from ? from : "0"} to ${to ? to : "0"} of ${total} entries`
        }
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
          <Select
            value={`${limit}`}
            onValueChange={(value) => {
              const queryParams = { ...params, limit: value };
              router.get(path, queryParams, {replace: true, preserveState: true});
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              {/* <SelectValue placeholder={table.getState().pagination.limit} /> */}
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {limitOptions.map((limit) => (
                <SelectItem key={limit} value={`${limit}`}>
                  {limit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          Page {currentPage} of{" "}
          {lastPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => paginateAction.action(firstPage)}
            disabled={paginateAction.isDisabled(firstPage)}
          >
            <DoubleArrowLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => paginateAction.action(["prev_page"])}
            disabled={paginateAction.isDisabled("prev_page")}
          >
            <ChevronLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => paginateAction.action(["next_page"])}
            disabled={paginateAction.isDisabled("next_page")}
          >
            <ChevronRightIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => paginateAction.action([lastPage])}
            disabled={paginateAction.isDisabled(lastPage)}
          >
            <DoubleArrowRightIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}

DataTablePagination.propTypes = {
  meta: PropTypes.shape({
    path: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    firstPage: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    from: PropTypes.number,
    to: PropTypes.number,
    totalRowCurrent: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    rowsSelected: PropTypes.number,
    pageQuery: PropTypes.string
  })
}
