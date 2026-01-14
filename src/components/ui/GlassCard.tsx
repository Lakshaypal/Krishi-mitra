import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  variant?: 'default' | 'strong' | 'subtle' | 'neon';
  hover?: boolean;
  className?: string;
}

export function GlassCard({ 
  children, 
  variant = 'default', 
  hover = true,
  className, 
  ...props 
}: GlassCardProps) {
  const variants = {
    default: 'glass',
    strong: 'glass-strong',
    subtle: 'glass-subtle',
    neon: 'glass neon-border',
  };

  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        variants[variant],
        'rounded-2xl p-6 holo-card',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
