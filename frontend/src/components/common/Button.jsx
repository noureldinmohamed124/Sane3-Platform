import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'normal',
  href,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const baseClass = 'btn';
  const variantClass = variant === 'ghost' ? 'btn-ghost' : 'btn-primary';
  const sizeClass = size === 'sm' ? 'btn-sm' : '';
  const combinedClasses = `${baseClass} ${variantClass} ${sizeClass} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={combinedClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
