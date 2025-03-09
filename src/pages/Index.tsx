
import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import Layout from '@/components/Layout';
import Welcome from '@/components/Welcome';
import AccountSetup from '@/components/AccountSetup';
import ChannelSetup from '@/components/ChannelSetup';
import Dashboard from '@/components/Dashboard';

// Framer Motion for React is needed for animations
import { motion, AnimatePresence } from 'framer-motion';

// Add framer-motion package
import { lov-add-dependency } from 'lovable-dev';

const AppContent = () => {
  const { currentState } = useApp();
  
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
</lov-add-dependency>

Let's install the necessary framer-motion package:
<lov-add-dependency>framer-motion@latest</lov-add-dependency>
