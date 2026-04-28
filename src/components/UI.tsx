import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GlassCard = ({ children, className, border }: { children: React.ReactNode, className?: string, border?: string }) => (
  <div className={cn(
    "bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-6 shadow-2xl",
    border && `border-${border}`,
    className
  )}>
    {children}
  </div>
);

export const ModernButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className,
  disabled
}: { 
  children: React.ReactNode, 
  onClick?: () => void, 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost',
  className?: string,
  disabled?: boolean
}) => {
  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20",
    secondary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
    outline: "border border-slate-700 text-slate-100 hover:bg-slate-800",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
};
