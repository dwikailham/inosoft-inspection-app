import { ReactNode } from 'react';
import { cn } from '../atoms/Input';

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, error, children, className }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5", className)}>
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-700">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[0.8rem] font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
