import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { GripVertical, Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const InputFilter = ({ id, removeInput, valuesOnChange, isFirst, columns, ...props }) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef
  } = useSortable({id: id, animateLayoutChanges: () => false});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { value:initialValue } = props.values;

  let { column, logicalOperator:logicalOperatorInitialValue, comparisonOperator:comparisonOperatorInitialValue } = props.values;

  if (!column) {
    if (columns?.length > 0) {
      column = columns[0]?.name;
    }
  }

  if (!logicalOperatorInitialValue) {
    logicalOperatorInitialValue = 'and';
    if (isFirst) {
      logicalOperatorInitialValue = undefined;
    }
  }

  if (!comparisonOperatorInitialValue) {
    comparisonOperatorInitialValue = 'contains';
  }

  const removeInputHandle = (id) => {
    if (removeInput) {
      removeInput(id);
    }
  }

  const isHasValidOptions = (columName) => {
    return columns?.some(column => column.name === columName && column.options && typeof column.options === 'object' && column.options.length > 0);
  }

  const getColumnByName = (columName) => {
    return columns?.find(column => column.name === columName);
  }

  const valuesOnChangeHandle = (column, value) => {
    if (valuesOnChange) {
      valuesOnChange({ ...props.values, [column]: value })
    }
  }

  useEffect(() => {
    valuesOnChangeHandle("value", "")
  }, [column]);

  useEffect(() => {
    valuesOnChange(
      { 
        ...props.values,
        value: initialValue,
        logicalOperator: isFirst ? undefined :logicalOperatorInitialValue,
        column: column,
        comparisonOperator: comparisonOperatorInitialValue
      }
    )
  }, [initialValue, logicalOperatorInitialValue, column, comparisonOperatorInitialValue])

  return (
      <>
        <div className="flex flex-wrap gap-2 w-full" ref={setNodeRef} style={{...style, cursor: 'default'}} {...attributes} {...props} tabIndex={-1}>
          {isFirst ? 
            <Button type="button" variant="ghost" className="cursor-default w-[calc(33.33%-calc(1rem/3))] md:w-[calc(calc(50%/3)-calc(1rem/3))]" tabIndex={-1} disabled>Where</Button>
          :
          <Select value={logicalOperatorInitialValue} onValueChange={(val) => valuesOnChangeHandle("logicalOperator", val)}>
            <SelectTrigger className="w-[calc(33.33%-calc(1rem/3))] md:w-[calc(calc(50%/3)-calc(1rem/3))]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="and">and</SelectItem>
              <SelectItem value="or">or</SelectItem>
            </SelectContent>
          </Select>
          }
          <Select {...{ value: column }} onValueChange={(val) => valuesOnChangeHandle("column", val)}>
            <SelectTrigger className="w-[calc(33.33%-calc(1rem/3))] md:w-[calc(calc(50%/3)-calc(1rem/3))]">
              <SelectValue  />
            </SelectTrigger>
            <SelectContent>
              { columns?.length > 0 ?
                <>
                {columns.map((val, index) => {
                  return (
                    <SelectItem value={val.name} key={index}>{val.title}</SelectItem>
                  )
                })}
                </>
              : ""}
            </SelectContent>
          </Select>
          <Select value={comparisonOperatorInitialValue ? comparisonOperatorInitialValue : "contains"} onValueChange={(val) => valuesOnChangeHandle("comparisonOperator", val)}>
            <SelectTrigger className="w-[calc(33.33%-calc(1rem/3))] md:w-[calc(calc(50%/3)-calc(1rem/3))]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="contains">Contains</SelectItem>
              <SelectItem value="does-not-contains">Does Not Contains</SelectItem>
              <SelectItem value="is">Is</SelectItem>
              <SelectItem value="is-not">Is not</SelectItem>
              <SelectItem value="is-empty">Is empty</SelectItem>
              <SelectItem value="is-not-empty">Is not empty</SelectItem>
            </SelectContent>
          </Select>
           {
            isHasValidOptions(column) ?
            <Select value={initialValue ? initialValue : ""} onValueChange={(val) => valuesOnChangeHandle("value", val)} disabled={comparisonOperatorInitialValue === "is-empty" || comparisonOperatorInitialValue === "is-not-empty" ? true : false}>
              <SelectTrigger className="w-[calc(65%-calc(1rem/3))] md:w-[calc(34%-calc(1rem/2))]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                  {getColumnByName(column).options.map((val, index) => {
                    return (
                      <SelectItem value={val.value} key={index}>{val.title}</SelectItem>
                    )
                  })}
              </SelectContent>
            </Select>
            :
            <Input type="text" className="w-[calc(65%-calc(1rem/3))] md:w-[calc(34%-calc(1rem/2))]" value={initialValue ? initialValue : ""} placeholder="Enter a value" onChange={(e) => {valuesOnChangeHandle("value", e.target.value)}} disabled={comparisonOperatorInitialValue === "is-empty" || comparisonOperatorInitialValue === "is-not-empty" ? true : false} />
          }
          <Button variant="outline" className="w-[calc(calc(35%/2)-calc(1rem/3))] md:w-[calc(8%-calc(1rem/2))]" onClick={() => removeInputHandle(id)}><Trash2 /></Button>
          <Button type="button" variant="outline" className="w-[calc(calc(35%/2)-calc(1rem/3))] md:w-[calc(8%-calc(1rem/2))] cursor-grab" ref={setActivatorNodeRef} {...listeners}><GripVertical /></Button>
        </div>
      </>
  );
}

export default InputFilter;
