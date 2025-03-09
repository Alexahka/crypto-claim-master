
import React from 'react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const { currentState } = useApp();
  
  // Generate a background class based on the current state
  const getBgClass = () => {
    switch (currentState) {
      case 'welcome':
        return 'bg-gradient-radial from-muted/30 to-background';
      case 'account-setup':
      case 'channel-setup':
        return 'bg-gradient-to-br from-background to-muted/50';
      case 'dashboard':
        return 'bg-noise';
      default:
        return '';
    }
  };

  return (
    <div 
      className={cn(
        "min-h-screen flex flex-col items-center justify-center w-full p-4 md:p-6 transition-all duration-1000",
        getBgClass(),
        className
      )}
    >
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
      <div className="w-full max-w-6xl mx-auto z-10 relative">
        {children}
      </div>
    </div>
  );
};

export default Layout;
