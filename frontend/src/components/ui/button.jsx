import React from 'react';
import { cn } from '../../utils/cn';

export function Button({
  className,
  variant = 'default',
  size = 'default',
  children,
  onClick,
  disabled,
  type = 'button',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full font-bold select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] will-change-transform';
  
  const variants = {
    default: 'bg-gradient-to-r from-[#F58220] to-[#FF9F45] text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:brightness-105 active:brightness-95',
    secondary: 'bg-[#002561] dark:bg-[#1E3A8A] text-white hover:bg-[#013584] dark:hover:bg-[#2563EB] shadow-md hover:brightness-105 active:brightness-95',
    outline: 'bg-white dark:bg-[#152033] border-2 border-[#002561]/30 dark:border-white/30 text-[#002561] dark:text-white hover:bg-white dark:hover:bg-[#1E2D47] hover:border-[var(--orange)] dark:hover:border-[var(--orange)] shadow-md hover:shadow-lg',
    ghost: 'bg-transparent text-[var(--ink)] hover:bg-[var(--paper-2)] dark:hover:bg-white/10 active:bg-[var(--line)]',
  };

  const sizes = {
    default: 'px-6 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base min-h-[44px]',
    sm: 'px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm min-h-[36px]',
    lg: 'px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg min-h-[48px]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
