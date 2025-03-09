
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, ArrowLeft, Trash2, Link, Plus, MessageCircle } from 'lucide-react';
import Tooltip from './Tooltip';

const ChannelSetup = () => {
  const { channels, addChannel, removeChannel, toggleChannelActive, settings, setCurrentState } = useApp();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const resetForm = () => {
    setName('');
    setUrl('');
  };

  const extractChannelName = (url: string): string => {
    try {
      // Try to extract channel name from url if possible
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('t.me') || urlObj.hostname.includes('telegram.me')) {
        const pathParts = urlObj.pathname.split('/').filter(Boolean);
        if (pathParts.length > 0) {
          return pathParts[0];
        }
      }
    } catch (e) {
      // If it's not a valid URL, just use the raw string
    }
    return url;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    // If name is empty, try to auto-fill it from the URL
    if (!name && newUrl) {
      const extractedName = extractChannelName(newUrl);
      if (extractedName) {
        setName(extractedName);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !url) return;
    
    addChannel({
      name,
      url,
      isActive: true
    });
    
    resetForm();
  };

  const goToNext = () => {
    setCurrentState('dashboard');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <Button 
            variant="ghost" 
            className="group flex items-center gap-2" 
            onClick={() => setCurrentState('account-setup')}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>{settings.language === 'ru' ? 'Назад' : 'Back'}</span>
          </Button>
          
          {channels.length > 0 && (
            <Button 
              className="button-primary" 
              onClick={goToNext}
            >
              <span>
                {settings.language === 'ru' ? 'Перейти к мониторингу' : 'Go to Dashboard'}
              </span>
              <ArrowRight size={16} className="ml-2" />
            </Button>
          )}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-1"
        >
          {settings.language === 'ru' ? 'Добавьте Telegram-каналы' : 'Add Telegram Channels'}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-4"
        >
          {settings.language === 'ru' 
            ? 'Добавьте каналы, в которых публикуются коды для крипто-боксов' 
            : 'Add channels where crypto box codes are published'}
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="card-container mb-6"
        >
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {settings.language === 'ru' ? 'Название канала' : 'Channel Name'}
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={settings.language === 'ru' ? 'Binance Русский' : 'Binance Announcements'}
                className="input-field"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium">
                  {settings.language === 'ru' ? 'Ссылка на канал' : 'Channel Link'}
                </label>
                <Tooltip 
                  content={
                    settings.language === 'ru'
                      ? "Вставьте ссылку на Telegram-канал (t.me/...)"
                      : "Insert the link to the Telegram channel (t.me/...)"
                  }
                  useHelpIcon
                />
              </div>
              <div className="relative">
                <Input
                  type="text"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder="https://t.me/binance_russian"
                  className="input-field pl-10"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Link size={16} className="text-muted-foreground" />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="button-primary mt-2"
              disabled={!name || !url}
            >
              <Plus size={16} className="mr-2" />
              {settings.language === 'ru' ? 'Добавить канал' : 'Add Channel'}
            </Button>
          </div>
        </motion.form>

        {/* Channel list */}
        {channels.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium flex items-center">
              <MessageCircle size={18} className="mr-2 text-primary" />
              {settings.language === 'ru' ? 'Добавленные каналы' : 'Added Channels'}
            </h3>
            
            <div className="space-y-3">
              {channels.map((channel, index) => (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-panel rounded-lg p-4 flex justify-between items-center"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{channel.name}</h4>
                    <a 
                      href={channel.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-info hover:text-info-hover transition-colors flex items-center mt-1"
                    >
                      <Link size={14} className="mr-1" />
                      <span className="truncate">{channel.url}</span>
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Switch
                        checked={channel.isActive}
                        onCheckedChange={() => toggleChannelActive(channel.id)}
                        className="mr-3"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeChannel(channel.id)}
                      className="text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors p-2 h-auto"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-muted/30 border border-border/50 rounded-lg">
              <p className="text-sm">
                {settings.language === 'ru' 
                  ? 'Вы можете добавить несколько каналов. Бот начнёт мониторинг автоматически, как только вы перейдёте на главный экран.' 
                  : 'You can add multiple channels. The bot will start monitoring automatically once you go to the main dashboard.'}
              </p>
            </div>
            
            {channels.length > 0 && (
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={goToNext} 
                  className="button-primary"
                >
                  <span>
                    {settings.language === 'ru' ? 'Перейти к мониторингу' : 'Go to Dashboard'}
                  </span>
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ChannelSetup;
