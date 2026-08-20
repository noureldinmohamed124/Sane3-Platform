import React from 'react';
import { cn } from '../../utils/cn';

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn('rounded-2xl border border-[var(--line)] bg-[var(--card-bg)] p-6 shadow-sm transition-all duration-200 hover:shadow-md', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return <div className={cn('mb-4 space-y-1.5', className)} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }) {
  return <h3 className={cn('font-rakkas text-2xl text-[var(--ink)]', className)} {...props}>{children}</h3>;
}

export function CardDescription({ className, children, ...props }) {
  return <p className={cn('text-sm text-[var(--ink-soft)]', className)} {...props}>{children}</p>;
}

export function CardContent({ className, children, ...props }) {
  return <div className={cn('space-y-3', className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }) {
  return <div className={cn('mt-6 flex items-center pt-4 border-t border-[var(--line)]', className)} {...props}>{children}</div>;
}
