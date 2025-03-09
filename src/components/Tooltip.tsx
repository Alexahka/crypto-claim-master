
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  useHelpIcon?: boolean;
  iconSize?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  className,
  position = 'top',
  useHelpIcon = false,
  iconSize = 16
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };
  
  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-muted border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-muted border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-muted border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-muted border-y-transparent border-l-transparent',
  };

  // Handle click outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current && 
        triggerRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        className={cn("tooltip-trigger", className)}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {useHelpIcon ? (
          <HelpCircle 
            size={iconSize} 
            className="text-muted-foreground cursor-help hover:text-foreground transition-colors" 
          />
        ) : (
          children
        )}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            "absolute z-50 w-max max-w-xs rounded-md bg-muted p-2 text-sm text-muted-foreground shadow-md animate-fade-in",
            positionClasses[position]
          )}
        >
          {content}
          <div 
            className={cn(
              "absolute w-0 h-0 border-4", 
              arrowClasses[position]
            )} 
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
