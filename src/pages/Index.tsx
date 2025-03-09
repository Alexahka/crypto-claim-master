
import React, { useEffect } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import Layout from '@/components/Layout';
import Welcome from '@/components/Welcome';
import AccountSetup from '@/components/AccountSetup';
import ChannelSetup from '@/components/ChannelSetup';
import Dashboard from '@/components/Dashboard';

// Framer Motion for React is needed for animations
import { motion, AnimatePresence } from 'framer-motion';

const AppContent = () => {
  const { currentState, accounts, addCryptoBox, isRunning } = useApp();
  
  // Demo effect to simulate receiving crypto boxes (only for demonstration)
  useEffect(() => {
    if (isRunning && accounts.length > 0) {
      const demoInterval = setInterval(() => {
        const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];
        const coins = ["BTC", "ETH", "BNB", "SOL", "ADA", "DOT"];
        const randomCoin = coins[Math.floor(Math.random() * coins.length)];
        const randomAmount = (Math.random() * 0.1).toFixed(6);
        
        console.log('Generating demo cryptobox:', randomCoin, randomAmount, randomAccount.id);
        
        addCryptoBox({
          coinName: randomCoin,
          amount: parseFloat(randomAmount),
          accountId: randomAccount.id
        });
      }, 10000); // Изменено с 20000 на 10000 мс для более быстрой демонстрации
      
      return () => clearInterval(demoInterval);
    }
  }, [isRunning, accounts, addCryptoBox]);
  
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentState}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {currentState === 'welcome' && <Welcome />}
          {currentState === 'account-setup' && <AccountSetup />}
          {currentState === 'channel-setup' && <ChannelSetup />}
          {currentState === 'dashboard' && <Dashboard />}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

const Index = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
