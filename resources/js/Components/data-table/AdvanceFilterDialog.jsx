import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogBody } from "@/components/ui/dialog";
import { Button } from '@/Components/ui/button';
import { Plus } from 'lucide-react';
import InputFilter from './InputFilter';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { router } from '@inertiajs/react';


function toSnakeCase(obj) {
    if (Array.isArray(obj)) {
        return obj.map(item => toSnakeCase(item));
    } else if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj).reduce((acc, key) => {
            const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
            acc[snakeKey] = toSnakeCase(obj[key]);
            return acc;
        }, {});
    } else {
        return obj;
    }
}

const AdvanceFilterDialog = ({open, onOpenChange, columnsFilter, onFilterApplied, ...props}) => {

    const params = route().params;
    const filterQueryParams = params.filters;
    
    const getFilterQueryParams = () => {
        if (filterQueryParams) {   
            const decoded = atob(filterQueryParams);
            try {
                const data = JSON.parse(decoded);
                const dataWithId = data.map((item, index) => ({
                    id: index + 1,
                    ...item
                  }));
                return dataWithId;
            } catch (error) {
                return {error: 'filter is invalid'}
            }
        }

        return undefined;
    }

    const [items, setItems] = useState([]);

    const addItem = () => {
        setItems(prevData => [...prevData, { id: items.length + 1}]);
    }

    const removeItem = (key) => {
        setItems(prevData => prevData.filter(item => item.id !== key))
    }

    const clearItem = () => {
        setItems([]);
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems(val => {
                
                const oldIndex = val.findIndex(values => values.id === active.id);
                const newIndex = val.findIndex(values => values.id === over.id);
                return arrayMove(val, oldIndex, newIndex);
            });
        }
    }
    
    const itemIds = items.map(item => item.id);

    const setValueToInputHandle = (value, id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, ...value } : item
            )
        );
    };

    const renderInput = useCallback((value, index) => {
        return (
            <InputFilter
              key={index}
              id={value.id}
              removeInput={removeItem}
              valuesOnChange={(val) => {setValueToInputHandle(val, value.id)}}
              values={{
                logicalOperator: value.logicalOperator,
                column: value.column,
                comparisonOperator: value.comparisonOperator,
                value: value.value
              }}
              isFirst={index === 0 ? true : false}
              columns={columnsFilter}
          />
        )
    }, [items.length]);

    useEffect(() => {
        if (open === false) {
            if (!filterQueryParams) {
                setItems([]);
            } else {
                setItems(getFilterQueryParams());
            }
        }
    }, [open]);

    useEffect(() => {
        if (!getFilterQueryParams() || getFilterQueryParams().error) {
            setItems([]);
        } else {
            setItems(getFilterQueryParams());
        }
    }, [filterQueryParams]);

    const submit = (e) => {
        e.preventDefault()
        const queryParamsRaw = items.map(({ id, ...rest }) => rest);
        const queryParams = { filters: btoa(JSON.stringify((toSnakeCase(queryParamsRaw)))) };
        const url = route(route().current());

        if (onFilterApplied && typeof onFilterApplied === 'function') {
            onFilterApplied();
        }
        
        router.get(url, queryParams, {replace: true, preserveState: true});

    };

    return (
        <>
        <Dialog open={open} onOpenChange={(val) => onOpenChange(val)} {...props}>
          <DialogContent center size="2xl">
            <DialogHeader>
              <DialogTitle>Advance Filter</DialogTitle>
              <DialogDescription>
              </DialogDescription>
            </DialogHeader>
            <DialogBody className="max-md:overflow-x-auto">
                <form onSubmit={submit}>

              <div className="flex flex-row flex-wrap gap-y-4 md:gap-y-2 mb-4">
                { items.length > 0 ?
                <>
                  <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                    <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
                        {items.map((value, index) => renderInput(value, index) )}
                    </SortableContext>
                  </DndContext>
                  <Button type="button" variant="outline" onClick={addItem} className="w-full text-gray-400 border-gray-400 border-2 border-dashed hover:bg-background hover:text-gray-400" tabIndex={-1}><Plus/> Add Filter</Button>
                </>
                : 
                <>
                  <div className="w-full text-center">
                      <p className="font-bold">No filters applied</p>
                      <p>Add filters to refine your results.</p>
                      <Button type="button" variant="outline" size="sm" className="mt-3" onClick={addItem}>Add Filter</Button>
                  </div>
                  </>
                }
              </div>
              { items.length > 0 ?
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" className="w-fit" onClick={clearItem}>Reset</Button>
                <Button type="submit" variant="default" className="w-fit">Apply</Button>
              </div>
              : ""}
              </form>
            </DialogBody>
          </DialogContent>
        </Dialog>
        </>
    );
}

export default AdvanceFilterDialog;
