import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({ className, variant = 'default', children, ...props }) {
  const base = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-colors';
  const variants = {
    default: 'bg-[#E9EDF6] text-[#002561]',
    orange: 'bg-[#FFE4C7] text-[#C0620F]',
    accent: 'bg-[#3B6FD1]/10 text-[#3B6FD1]',
    dark: 'bg-[#002561] text-white',
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
