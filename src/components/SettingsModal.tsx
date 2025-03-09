
import React from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, VolumeX, Volume2, Vibrate, Moon, Languages, Settings2 } from 'lucide-react';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const { settings, updateSettings } = useApp();
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Settings2 size={18} className="mr-2 text-primary" />
            {settings.language === 'ru' ? 'Настройки' : 'Settings'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="notifications" className="mt-4">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="notifications" className="flex items-center gap-1">
              <Bell size={14} />
              <span>{settings.language === 'ru' ? 'Уведомления' : 'Notifications'}</span>
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-1">
              <Languages size={14} />
              <span>{settings.language === 'ru' ? 'Общие' : 'General'}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications" className="space-y-4 min-h-[200px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center">
                    <Bell size={16} className="mr-2 text-muted-foreground" />
                    {settings.language === 'ru' ? 'Уведомления' : 'Notifications'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {settings.language === 'ru' 
                      ? 'Показывать всплывающие уведомления' 
                      : 'Show popup notifications'}
                  </p>
                </div>
                <Switch
                  checked={settings.notificationsEnabled}
                  onCheckedChange={(value) => updateSettings({ notificationsEnabled: value })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center">
                    <Volume2 size={16} className="mr-2 text-muted-foreground" />
                    {settings.language === 'ru' ? 'Звук' : 'Sound'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {settings.language === 'ru' 
                      ? 'Звуковое оповещение при активации' 
                      : 'Sound alert on activation'}
                  </p>
                </div>
                <Switch
                  checked={settings.soundEnabled}
                  onCheckedChange={(value) => updateSettings({ soundEnabled: value })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center">
                    <Vibrate size={16} className="mr-2 text-muted-foreground" />
                    {settings.language === 'ru' ? 'Вибрация' : 'Vibration'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {settings.language === 'ru' 
                      ? 'Вибрация при активации (мобильные)' 
                      : 'Vibrate on activation (mobile)'}
                  </p>
                </div>
                <Switch
                  checked={settings.vibrationEnabled}
                  onCheckedChange={(value) => updateSettings({ vibrationEnabled: value })}
                />
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="general" className="space-y-4 min-h-[200px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label className="text-base flex items-center">
                  <Languages size={16} className="mr-2 text-muted-foreground" />
                  {settings.language === 'ru' ? 'Язык интерфейса' : 'Interface Language'}
                </Label>
                <div className="flex space-x-2">
                  <Button
                    variant={settings.language === 'ru' ? 'default' : 'outline'}
                    className={settings.language === 'ru' ? 'bg-primary text-primary-foreground' : ''}
                    onClick={() => updateSettings({ language: 'ru' })}
                  >
                    Русский
                  </Button>
                  <Button
                    variant={settings.language === 'en' ? 'default' : 'outline'}
                    className={settings.language === 'en' ? 'bg-primary text-primary-foreground' : ''}
                    onClick={() => updateSettings({ language: 'en' })}
                  >
                    English
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  {settings.language === 'ru' 
                    ? 'Binance CryptoBox AutoClaimer v1.0' 
                    : 'Binance CryptoBox AutoClaimer v1.0'}
                </p>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <Button onClick={onClose} className="button-primary">
            {settings.language === 'ru' ? 'Готово' : 'Done'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
