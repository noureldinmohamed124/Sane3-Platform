import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export function Button({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-gradient-to-r from-[#F58220] to-[#FF9F45] text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5',
    secondary: 'bg-[#002561] text-white hover:bg-[#013584] hover:-translate-y-0.5 shadow-md',
    outline: 'bg-white/80 backdrop-blur-md border border-[#DCE3F1] text-[#002561] hover:bg-white hover:shadow-md hover:-translate-y-0.5',
    ghost: 'bg-transparent text-[#002561] hover:bg-[#E9EDF6]',
  };

  const sizes = {
    default: 'px-7 py-3 text-base',
    sm: 'px-4 py-2 text-sm',
    lg: 'px-9 py-4 text-lg',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
