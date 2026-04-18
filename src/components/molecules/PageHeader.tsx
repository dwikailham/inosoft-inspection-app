import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: string;
}

export function PageHeader({ breadcrumbs, title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6 space-y-2">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm font-medium text-neutral-500 mb-4">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <React.Fragment key={index}>
              {item.href ? (
                <Link href={item.href} className="hover:text-emerald-600 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-neutral-900 font-semibold" : ""}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="w-4 h-4 mx-2 opacity-50" />}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">{title}</h1>
        {subtitle && <p className="text-neutral-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
