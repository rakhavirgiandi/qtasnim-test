import * as React from "react"

import { cn } from "@/../../lib/utils"

const Input = React.forwardRef(({ className, type, isNumber, ...props }, ref) => {

  const { onChange, value } = props;

  const onChangeHandle = (e) => {
    if (isNumber) {
      const value = e.target.value;
      e.target.value = value.replace(/[^0-9]/g, "");
    }
    if (onChange && typeof onChange === 'function') {
      onChange(e);
    }
  }

  props.onChange = (e) => {
    onChangeHandle(e);
  }

  return (
    (<input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props} />)
  );
})

Input.displayName = "Input"

export { Input }
