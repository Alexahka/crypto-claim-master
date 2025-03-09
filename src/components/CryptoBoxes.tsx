
import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Coins, Calendar, User } from 'lucide-react';

const CryptoBoxes = () => {
  const { cryptoBoxes, accounts, settings } = useApp();
  
  // Format date based on selected language
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: '2-digit', 
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return new Intl.DateTimeFormat(
      settings.language === 'ru' ? 'ru-RU' : 'en-US', 
      options
    ).format(date);
  };
  
  // Get account name by ID
  const getAccountName = (accountId: string): string => {
    const account = accounts.find(acc => acc.id === accountId);
    return account ? account.name : 'Unknown';
  };
  
  // If no crypto boxes yet
  if (cryptoBoxes.length === 0) {
    return (
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>
            {settings.language === 'ru' ? 'Активированные криптобоксы' : 'Activated CryptoBoxes'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground py-8">
          {settings.language === 'ru' 
            ? 'Здесь будут отображаться добытые криптобоксы' 
            : 'Claimed CryptoBoxes will appear here'}
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{settings.language === 'ru' ? 'Активированные криптобоксы' : 'Activated CryptoBoxes'}</span>
          <span className="text-sm font-normal bg-muted py-1 px-3 rounded-full">
            {cryptoBoxes.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
        {cryptoBoxes.map((box, index) => (
          <motion.div
            key={box.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-all"
          >
            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/20 text-primary">
              <Coins size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium">{box.coinName}</p>
                <p className="font-bold text-primary">{box.amount}</p>
              </div>
              
              <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User size={12} />
                  {getAccountName(box.accountId)}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {formatDate(new Date(box.timestamp))}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CryptoBoxes;
