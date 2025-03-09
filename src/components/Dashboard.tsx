
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import StatusIndicator from './StatusIndicator';
import ActivityLog from './ActivityLog';
import SettingsModal from './SettingsModal';
import { Settings, Play, Pause, ArrowLeft } from 'lucide-react';

const Dashboard = () => {
  const { isRunning, toggleRunning, accounts, channels, addLog, settings, setCurrentState } = useApp();
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const handleToggleRunning = () => {
    // Validation before starting
    if (!isRunning) {
      const activeAccounts = accounts.filter(account => account.isActive);
      const activeChannels = channels.filter(channel => channel.isActive);
      
      if (activeAccounts.length === 0) {
        addLog({
          message: settings.language === 'ru' 
            ? 'Нет активных аккаунтов для мониторинга' 
            : 'No active accounts for monitoring',
          status: 'error'
        });
        return;
      }
      
      if (activeChannels.length === 0) {
        addLog({
          message: settings.language === 'ru' 
            ? 'Нет активных каналов для мониторинга' 
            : 'No active channels for monitoring',
          status: 'error'
        });
        return;
      }
    }
    
    toggleRunning();
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-6"
      >
        {/* Header bar */}
        <div className="flex justify-between items-center mb-2">
          <Button 
            variant="ghost" 
            className="group flex items-center gap-2" 
            onClick={() => setCurrentState('channel-setup')}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>{settings.language === 'ru' ? 'Настройки каналов' : 'Channel Setup'}</span>
          </Button>
          
          <Button 
            variant="outline"
            size="icon"
            onClick={() => setSettingsOpen(true)}
            className="rounded-full h-10 w-10 bg-muted/50 hover:bg-muted"
          >
            <Settings size={18} />
          </Button>
        </div>
        
        {/* Main grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Status panel - left column on large screens, top on small */}
          <div className="lg:col-span-2">
            <StatusIndicator />
          </div>
          
          {/* Log panel - right column on large screens, bottom on small */}
          <div className="lg:col-span-3">
            <ActivityLog />
          </div>
        </div>
        
        {/* Main action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 flex justify-center"
        >
          <Button
            onClick={handleToggleRunning}
            className={`button-base rounded-xl px-8 py-6 relative overflow-hidden ${
              isRunning ? 'bg-danger hover:bg-danger-hover' : 'bg-success hover:bg-success-hover'
            } text-white shadow-lg transition-all duration-300 min-w-[250px] group`}
            size="lg"
          >
            <div className="flex items-center justify-center">
              {isRunning ? (
                <>
                  <Pause size={22} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-lg">
                    {settings.language === 'ru' ? 'Остановить' : 'Stop'}
                  </span>
                </>
              ) : (
                <>
                  <Play size={22} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-lg">
                    {settings.language === 'ru' ? 'Запустить' : 'Start'}
                  </span>
                </>
              )}
            </div>
            
            {/* Animated bottom bar */}
            <span className="absolute bottom-0 left-0 h-1 bg-white/20 group-hover:w-full w-0 transition-all duration-500" />
          </Button>
        </motion.div>
        
        {/* System status text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-2 text-center text-sm text-muted-foreground"
        >
          {isRunning ? (
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse-subtle" />
              {settings.language === 'ru' 
                ? 'Система активно отслеживает новые крипто-боксы' 
                : 'System is actively monitoring for new crypto boxes'}
            </div>
          ) : (
            <div>
              {settings.language === 'ru' 
                ? 'Система в режиме ожидания' 
                : 'System is in standby mode'}
            </div>
          )}
        </motion.div>
      </motion.div>
      
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};

export default Dashboard;
