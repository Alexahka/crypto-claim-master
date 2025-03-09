
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { Clock, CheckCircle, XCircle, Info, Trash2 } from 'lucide-react';

const ActivityLog = () => {
  const { logs, clearLogs, settings } = useApp();
  const [expanded, setExpanded] = useState(false);
  
  const getLocale = () => {
    return settings.language === 'ru' ? ru : enUS;
  };
  
  const formatTime = (date: Date) => {
    return format(new Date(date), 'HH:mm:ss', { locale: getLocale() });
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className="text-success flex-shrink-0" />;
      case 'error':
        return <XCircle size={16} className="text-danger flex-shrink-0" />;
      case 'info':
      default:
        return <Info size={16} className="text-info flex-shrink-0" />;
    }
  };
  
  const getMessageClass = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-success-foreground bg-success/10 border-success/20';
      case 'error':
        return 'text-danger-foreground bg-danger/10 border-danger/20';
      case 'info':
      default:
        return 'text-info-foreground bg-info/10 border-info/20';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`glass-panel rounded-xl transition-all duration-300 ${expanded ? 'h-[400px]' : 'h-[280px]'}`}
    >
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center">
          <Clock size={18} className="mr-2 text-muted-foreground" />
          <h3 className="font-medium">
            {settings.language === 'ru' ? 'Журнал событий' : 'Activity Log'}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="text-xs h-7 px-2"
          >
            {expanded 
              ? (settings.language === 'ru' ? 'Свернуть' : 'Collapse')
              : (settings.language === 'ru' ? 'Развернуть' : 'Expand')
            }
          </Button>
          {logs.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearLogs}
              className="text-muted-foreground hover:text-danger hover:bg-danger/10 h-7 w-7 p-0"
            >
              <Trash2 size={14} />
            </Button>
          )}
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100%-52px)]">
        <div className="p-2">
          {logs.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
              {settings.language === 'ru' 
                ? 'События будут отображаться здесь' 
                : 'Events will be displayed here'}
            </div>
          ) : (
            <div className="space-y-2">
              {logs.map(log => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-2 rounded border text-sm flex items-start ${getMessageClass(log.status)}`}
                >
                  <div className="mr-2 mt-0.5">
                    {getStatusIcon(log.status)}
                  </div>
                  <div className="flex-1">
                    <p className="break-words">{log.message}</p>
                    <div className="mt-1 text-xs opacity-70">
                      {formatTime(log.timestamp)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default ActivityLog;
