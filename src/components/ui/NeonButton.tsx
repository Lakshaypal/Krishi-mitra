import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function NeonButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className,
  type = 'button',
}: NeonButtonProps) {
  const baseStyles = 'relative overflow-hidden rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-[0_0_30px_rgba(0,255,157,0.5)]',
    secondary: 'glass neon-border text-primary hover:bg-primary/10',
    ghost: 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {/* Shine effect */}
      <span className="absolute inset-0 overflow-hidden rounded-xl">
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
      </span>
      <span className="relative">{children}</span>
    </motion.button>
  );
}
