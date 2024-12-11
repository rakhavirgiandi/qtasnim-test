import React, { useRef, useState } from 'react';
import { router } from '@inertiajs/react'
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Settings2, Trash2, X } from "lucide-react"

const Header = ({searchable, searchQueryParam, rowSelection, dialogFilterOnOpen, advanceFilter, filterQueryParamName, additionalComponentTopRight}) => {

    const params = route().params;
    const currentRoute = route().current();

    if (!searchQueryParam) {
        searchQueryParam = 'search';
    }

    if (!filterQueryParamName) {
        filterQueryParamName = 'filters';
    }

    const [searchQuery, setSearchQuery] = useState(params[searchQueryParam] ? params[searchQueryParam] : '');
    const searchRef = useRef(null);

    const clearSearchQuery = () => {
        const queryParams = { ...params };
        setSearchQuery('');
        delete queryParams[searchQueryParam];
        const url = route(currentRoute);
        router.get(url, queryParams, {replace: true, preserveState: true});
      }
    
    const searchAction = (e) => {
      setSearchQuery(e.target.value);
      const queryParams = { ...params, [searchQueryParam]: e.target.value };
      delete queryParams.page;
      if (e.target.value === '') {
        delete queryParams[searchQueryParam];
      }
      const url = route(currentRoute);
      router.get(url, queryParams, {replace: true, preserveState: true});
    }

    const dialogFilterOnOpenHandle = () => {
        if (dialogFilterOnOpen && typeof dialogFilterOnOpen === 'function') {
            dialogFilterOnOpen()
        }
    }

    const resetFilters = () => {
        const queryParams = { ...params };
        delete queryParams[filterQueryParamName];
        const url = route(currentRoute);
        router.get(url, queryParams, {replace: true, preserveState: true});
    }

    return (
        <>
          <div className="block flex flex-col-reverse md:flex-row justify-between mb-4 gap-x-2">
            <div className="flex gap-x-0.5">
              {
                searchable ? 
                <>
              <Input type="text" id="search" ref={searchRef} name="search" placeholder="Search names..." value={searchQuery} className="h-8 max-md:w-full py-1 px-3 ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
              onChange={searchAction} autoComplete="off" />
              {searchQuery ? 
                <Button type="button" variant="ghost" onClick={clearSearchQuery} className="h-8 w-8 focus:ring-0 transition-colors focus:ring-offset-0"><X size={32} strokeWidth={3} /></Button>
                : ""}
                </>
                : ""
              }
            </div>
            <div className="flex overflow-x-auto md:overflow-visible items-center gap-x-2 md:mb-0 h-12 md:h-fit">
              {rowSelection?.length > 0 ? 
              <Button type="button" variant="outline" size="sm" className="max-md:fixed max-md:bottom-5 max-md:z-10 max-md:shadow-lg max-md:left-1/2 max-md:translate-x-[-50%]"><Trash2 /> Delete ({rowSelection.length})</Button>
              : ""}
              {advanceFilter ?
                <>
                {params[filterQueryParamName] ?
                  <Button type="button" variant="outline" size="sm" onClick={resetFilters}><X /> Reset Filters</Button>
                : ""}
                  <Button type="button" variant="outline" size="sm" onClick={dialogFilterOnOpenHandle}><Settings2 /> Advance Filter</Button>
                </>
                  :""
              }
              {additionalComponentTopRight}
            </div>
          </div>
        </>
    );
}

export default Header;
