
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Key, Plus, Trash2, ExternalLink, CheckCircle2, XCircle } from 'lucide-react';
import Tooltip from './Tooltip';

const AccountSetup = () => {
  const { accounts, addAccount, removeAccount, settings, setCurrentState } = useApp();
  const [name, setName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const resetForm = () => {
    setName('');
    setApiKey('');
    setSecretKey('');
    setValidationStatus('idle');
  };

  const validateApiKey = () => {
    if (!apiKey || !secretKey) return;

    setIsValidating(true);
    setValidationStatus('idle');

    // Simulate API validation with timeout
    setTimeout(() => {
      setIsValidating(false);
      setValidationStatus('success');
      // In a real app, this would make an actual API call to validate the keys
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !apiKey || !secretKey) return;
    
    addAccount({
      name,
      apiKey,
      secretKey,
      isActive: true
    });
    
    resetForm();
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    setValidationStatus('idle'); // Reset validation on changes
  };

  const goToNext = () => {
    setCurrentState('channel-setup');
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
            onClick={() => setCurrentState('welcome')}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>{settings.language === 'ru' ? 'Назад' : 'Back'}</span>
          </Button>
          
          {accounts.length > 0 && (
            <Button 
              className="button-primary" 
              onClick={goToNext}
            >
              <span>
                {settings.language === 'ru' ? 'Продолжить' : 'Continue'}
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
          {settings.language === 'ru' ? 'Добавьте Binance-аккаунт' : 'Add Binance Account'}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-4"
        >
          {settings.language === 'ru' 
            ? 'Для работы приложения необходимо добавить API-ключи от вашего аккаунта Binance' 
            : 'To use the application, you need to add API keys from your Binance account'}
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
                {settings.language === 'ru' ? 'Название аккаунта' : 'Account Name'}
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={settings.language === 'ru' ? 'Основной аккаунт' : 'Main Account'}
                className="input-field"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium">
                  {settings.language === 'ru' ? 'API-ключ' : 'API Key'}
                </label>
                <Tooltip 
                  content={
                    settings.language === 'ru'
                      ? "API-ключ можно создать в настройках безопасности аккаунта Binance"
                      : "API key can be created in the security settings of your Binance account"
                  }
                  useHelpIcon
                />
              </div>
              <div className="relative">
                <Input
                  type="text"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="input-field pr-10"
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Key size={16} className="text-muted-foreground" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium">
                  {settings.language === 'ru' ? 'Секретный ключ' : 'Secret Key'}
                </label>
                <Tooltip
                  content={
                    settings.language === 'ru'
                      ? "Секретный ключ выдается при создании API-ключа. Храните его в надежном месте!"
                      : "Secret key is provided when creating an API key. Keep it in a safe place!"
                  }
                  useHelpIcon
                />
              </div>
              <Input
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="••••••••••••••••••••••"
                className="input-field"
                required
              />
            </div>

            <div className="flex items-center justify-between mt-1">
              <a 
                href="https://www.binance.com/en/my/settings/api-management" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm flex items-center text-info hover:text-info-hover transition-colors"
              >
                <ExternalLink size={14} className="mr-1" />
                {settings.language === 'ru' ? 'Создать API-ключ на Binance' : 'Create API Key on Binance'}
              </a>

              {/* API key validation display */}
              {apiKey && (
                <div className="flex items-center">
                  {isValidating ? (
                    <div className="text-sm text-muted-foreground flex items-center">
                      <div className="animate-spin h-4 w-4 border-2 border-info border-t-transparent rounded-full mr-2" />
                      {settings.language === 'ru' ? 'Проверка...' : 'Validating...'}
                    </div>
                  ) : validationStatus === 'success' ? (
                    <div className="text-sm text-success flex items-center">
                      <CheckCircle2 size={16} className="mr-1" />
                      {settings.language === 'ru' ? 'Ключ валидный' : 'Valid key'}
                    </div>
                  ) : validationStatus === 'error' ? (
                    <div className="text-sm text-danger flex items-center">
                      <XCircle size={16} className="mr-1" />
                      {settings.language === 'ru' ? 'Неверный ключ' : 'Invalid key'}
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-2">
              {apiKey && secretKey && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={validateApiKey}
                  disabled={isValidating}
                  className="flex-1"
                >
                  {settings.language === 'ru' ? 'Проверить' : 'Validate'}
                </Button>
              )}
              <Button 
                type="submit" 
                className="button-primary flex-1"
                disabled={!name || !apiKey || !secretKey}
              >
                <Plus size={16} className="mr-2" />
                {settings.language === 'ru' ? 'Добавить аккаунт' : 'Add Account'}
              </Button>
            </div>
          </div>
        </motion.form>

        {/* Account list */}
        {accounts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium">
              {settings.language === 'ru' ? 'Добавленные аккаунты' : 'Added Accounts'}
            </h3>
            
            <div className="space-y-3">
              {accounts.map((account, index) => (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-panel rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-medium">{account.name}</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Key size={14} className="mr-1" />
                      <span className="tracking-wider">
                        {account.apiKey.substring(0, 6)}...{account.apiKey.substring(account.apiKey.length - 4)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAccount(account.id)}
                    className="text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors p-2 h-auto"
                  >
                    <Trash2 size={18} />
                  </Button>
                </motion.div>
              ))}
            </div>
            
            {accounts.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={goToNext} 
                  className="button-primary"
                >
                  <span>
                    {settings.language === 'ru' ? 'Продолжить настройку' : 'Continue Setup'}
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

export default AccountSetup;
