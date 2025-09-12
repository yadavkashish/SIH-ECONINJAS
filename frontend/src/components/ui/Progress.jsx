import React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

// Utility for merging classes
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Progress({ className, value = 0, ...props }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-gray-200 relative h-4 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-gray-400 h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
