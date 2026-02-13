import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface BentoItemProps {
  className?: string;
  children: React.ReactNode;
}

export const BentoItem = ({ className, children }: BentoItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      item.style.setProperty('--mouse-x', `${x}px`);
      item.style.setProperty('--mouse-y', `${y}px`);
    };

    item.addEventListener('mousemove', handleMouseMove);
    return () => item.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={itemRef}
      className={cn(
        'bento-item group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/30',
        className
      )}
    >
      <div className="bento-item-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
