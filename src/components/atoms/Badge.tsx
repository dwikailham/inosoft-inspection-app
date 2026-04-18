import { cn } from './Input';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: string;
}

export function Badge({ status, className, ...props }: BadgeProps) {
  const getColors = (s: string) => {
    const l = s.toLowerCase();
    if (l === 'completed') return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (l === 'open') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (l === 'for review') return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-neutral-100 text-neutral-800 border-neutral-200';
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        getColors(status),
        className
      )}
      {...props}
    >
      {status}
    </div>
  );
}
