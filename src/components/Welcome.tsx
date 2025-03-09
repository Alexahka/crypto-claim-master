
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCcw, Bitcoin, Zap } from 'lucide-react';

const Welcome = () => {
  const { setCurrentState, settings, updateSettings } = useApp();
  const [animationComplete, setAnimationComplete] = useState(false);

  // After 2.5 seconds, mark the animation as complete to enable the button
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (language: 'ru' | 'en') => {
    updateSettings({ language });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      {/* Logo animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 relative"
      >
        <div className="w-24 h-24 rounded-full flex items-center justify-center relative glass-panel">
          <motion.div
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Bitcoin size={48} className="text-primary" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.7, 0], 
              scale: [0.8, 1.2, 0.8] 
            }}
            transition={{ 
              delay: 1, 
              duration: 1.5, 
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="absolute inset-0 rounded-full bg-primary/20"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute -right-2 -bottom-2 w-10 h-10 bg-info rounded-full flex items-center justify-center shadow-lg"
        >
          <Zap size={18} className="text-white" />
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-2 text-center"
      >
        Binance CryptoBox <span className="text-primary">AutoClaimer</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-muted-foreground text-center max-w-lg mb-8"
      >
        {settings.language === 'ru' 
          ? 'Автоматический анализ и активация крипто-боксов из Telegram каналов для ваших Binance аккаунтов'
          : 'Automated analysis and activation of crypto boxes from Telegram channels for your Binance accounts'}
      </motion.p>

      {/* Language selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex space-x-4 mb-12"
      >
        <button
          onClick={() => handleLanguageChange('ru')}
          className={cn(
            "px-4 py-2 rounded-md transition-all",
            settings.language === 'ru' 
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Русский
        </button>
        <button
          onClick={() => handleLanguageChange('en')}
          className={cn(
            "px-4 py-2 rounded-md transition-all",
            settings.language === 'en' 
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          English
        </button>
      </motion.div>

      {/* Start button with loading state */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <Button
          onClick={() => setCurrentState('account-setup')}
          disabled={!animationComplete}
          className="button-primary group relative overflow-hidden"
          size="lg"
        >
          {!animationComplete ? (
            <>
              <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
              <span>
                {settings.language === 'ru' ? 'Загрузка...' : 'Loading...'}
              </span>
            </>
          ) : (
            <>
              <span>
                {settings.language === 'ru' ? 'Начать настройку' : 'Start Setup'}
              </span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
          <span className="absolute bottom-0 left-0 h-1 bg-white/20 group-hover:w-full w-0 transition-all duration-500" />
        </Button>
      </motion.div>
    </div>
  );
};

export default Welcome;
