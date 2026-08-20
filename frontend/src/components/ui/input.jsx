import React from 'react';
import { cn } from '../../utils/cn';

export function Input({ className, type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={cn(
        'flex w-full h-12 rounded-xl border border-[var(--line)] bg-[var(--card-bg)] px-4 py-3 text-sm sm:text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--blue-accent)] focus:ring-2 focus:ring-[var(--blue-accent)]/20 outline-none transition-all shadow-xs',
        className
      )}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        'flex w-full h-12 rounded-xl border border-[var(--line)] bg-[var(--card-bg)] px-4 py-3 text-sm sm:text-base text-[var(--ink)] focus:border-[var(--blue-accent)] focus:ring-2 focus:ring-[var(--blue-accent)]/20 outline-none transition-all cursor-pointer shadow-xs font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Label({ className, children, ...props }) {
  return (
    <label
      className={cn('block text-sm sm:text-base font-bold text-[var(--ink)] mb-2 leading-tight', className)}
      {...props}
    >
      {children}
    </label>
  );
}
