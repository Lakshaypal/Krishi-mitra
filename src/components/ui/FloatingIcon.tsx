import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingIconProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FloatingIcon({ children, delay = 0, className }: FloatingIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
      }}
      transition={{ 
        delay,
        duration: 0.5,
      }}
      className={cn(
        'w-16 h-16 rounded-2xl glass flex items-center justify-center animate-float',
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
}
