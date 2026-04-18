import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from './Input';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { id: string; name: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-9 w-full rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-900 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>{opt.name}</option>
        ))}
      </select>
    );
  }
);
Select.displayName = "Select";
