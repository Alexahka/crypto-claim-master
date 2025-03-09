
import React from 'react';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, AlertCircle, Users, MessageCircle } from 'lucide-react';

const StatusIndicator = () => {
  const { isRunning, accounts, channels, settings } = useApp();
  
  const activeAccounts = accounts.filter(account => account.isActive);
  const activeChannels = channels.filter(channel => channel.isActive);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel p-4 rounded-xl"
    >
      <div className="flex items-center mb-4">
        <Activity size={18} className="mr-2 text-muted-foreground" />
        <h3 className="font-medium">
          {settings.language === 'ru' ? 'Статус системы' : 'System Status'}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Bot status */}
        <Card className="p-3 border-0 bg-muted/30 flex items-center justify-between">
          <div className="flex items-center">
            {isRunning ? (
              <CheckCircle size={16} className="text-success mr-2" />
            ) : (
              <AlertCircle size={16} className="text-muted-foreground mr-2" />
            )}
            <span className="text-sm">
              {settings.language === 'ru' ? 'Бот' : 'Bot'}
            </span>
          </div>
          <Badge variant={isRunning ? "default" : "outline"} className={isRunning ? "bg-success text-success-foreground" : ""}>
            {isRunning 
              ? (settings.language === 'ru' ? 'Активен' : 'Active')
              : (settings.language === 'ru' ? 'Неактивен' : 'Inactive')
            }
          </Badge>
        </Card>
        
        {/* Accounts status */}
        <Card className="p-3 border-0 bg-muted/30 flex items-center justify-between">
          <div className="flex items-center">
            <Users size={16} className="text-muted-foreground mr-2" />
            <span className="text-sm">
              {settings.language === 'ru' ? 'Аккаунты' : 'Accounts'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className={activeAccounts.length > 0 ? "bg-info/20 text-info-foreground border-info/30" : ""}>
              {activeAccounts.length}/{accounts.length}
            </Badge>
          </div>
        </Card>
        
        {/* Channels status */}
        <Card className="p-3 border-0 bg-muted/30 flex items-center justify-between">
          <div className="flex items-center">
            <MessageCircle size={16} className="text-muted-foreground mr-2" />
            <span className="text-sm">
              {settings.language === 'ru' ? 'Каналы' : 'Channels'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className={activeChannels.length > 0 ? "bg-info/20 text-info-foreground border-info/30" : ""}>
              {activeChannels.length}/{channels.length}
            </Badge>
          </div>
        </Card>
      </div>
      
      {isRunning && (
        <div className="mt-3 text-xs text-muted-foreground flex items-center">
          <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse-subtle" />
          {settings.language === 'ru' 
            ? 'Мониторинг активен, ожидание новых кодов...' 
            : 'Monitoring active, waiting for new codes...'}
        </div>
      )}
    </motion.div>
  );
};

export default StatusIndicator;
