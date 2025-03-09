
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type AppState = "welcome" | "account-setup" | "channel-setup" | "dashboard";

type Account = {
  id: string;
  name: string;
  apiKey: string;
  secretKey: string;
  isActive: boolean;
};

type Channel = {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
};

type LogEntry = {
  id: string;
  timestamp: Date;
  message: string;
  status: "success" | "error" | "info";
  accountId?: string;
  channelId?: string;
};

type CryptoBox = {
  id: string;
  timestamp: Date;
  coinName: string;
  amount: number;
  accountId: string;
};

type Settings = {
  language: "ru" | "en";
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  notificationsEnabled: boolean;
};

interface AppContextType {
  currentState: AppState;
  setCurrentState: (state: AppState) => void;
  accounts: Account[];
  addAccount: (account: Omit<Account, "id">) => void;
  removeAccount: (id: string) => void;
  toggleAccountActive: (id: string) => void;
  channels: Channel[];
  addChannel: (channel: Omit<Channel, "id">) => void;
  removeChannel: (id: string) => void;
  toggleChannelActive: (id: string) => void;
  logs: LogEntry[];
  addLog: (log: Omit<LogEntry, "id" | "timestamp">) => void;
  clearLogs: () => void;
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
  isRunning: boolean;
  toggleRunning: () => void;
  cryptoBoxes: CryptoBox[];
  addCryptoBox: (cryptoBox: Omit<CryptoBox, "id" | "timestamp">) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [currentState, setCurrentState] = useState<AppState>("welcome");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [cryptoBoxes, setCryptoBoxes] = useState<CryptoBox[]>([]);
  const [settings, setSettings] = useState<Settings>({
    language: "ru",
    soundEnabled: true,
    vibrationEnabled: false,
    notificationsEnabled: true
  });
  const [isRunning, setIsRunning] = useState(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    const loadedAccounts = localStorage.getItem("accounts");
    const loadedChannels = localStorage.getItem("channels");
    const loadedSettings = localStorage.getItem("settings");
    const loadedLogs = localStorage.getItem("logs");
    const loadedCryptoBoxes = localStorage.getItem("cryptoBoxes");

    if (loadedAccounts) {
      setAccounts(JSON.parse(loadedAccounts));
    }
    if (loadedChannels) {
      setChannels(JSON.parse(loadedChannels));
    }
    if (loadedSettings) {
      setSettings(JSON.parse(loadedSettings));
    }
    if (loadedLogs) {
      setLogs(JSON.parse(loadedLogs));
    }
    if (loadedCryptoBoxes) {
      setCryptoBoxes(JSON.parse(loadedCryptoBoxes));
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem("channels", JSON.stringify(channels));
  }, [channels]);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs.slice(-100))); // Keep only last 100 logs
  }, [logs]);

  useEffect(() => {
    localStorage.setItem("cryptoBoxes", JSON.stringify(cryptoBoxes.slice(-50))); // Keep only last 50 crypto boxes
  }, [cryptoBoxes]);

  // Determine the initial app state based on setup progress
  useEffect(() => {
    if (accounts.length === 0) {
      setCurrentState("welcome");
    } else if (channels.length === 0) {
      setCurrentState("channel-setup");
    } else if (currentState === "welcome") {
      setCurrentState("dashboard");
    }
  }, [accounts.length, channels.length]);

  // Auto-transition from welcome to account setup
  useEffect(() => {
    if (currentState === "welcome") {
      const timer = setTimeout(() => {
        setCurrentState("account-setup");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentState]);

  const addAccount = (account: Omit<Account, "id">) => {
    const newAccount = {
      ...account,
      id: `account-${Date.now()}`
    };
    setAccounts([...accounts, newAccount]);
    toast({
      title: "Аккаунт добавлен",
      description: `${newAccount.name} успешно добавлен`,
    });
  };

  const removeAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
    toast({
      title: "Аккаунт удален",
      description: "Аккаунт успешно удален из системы",
    });
  };

  const toggleAccountActive = (id: string) => {
    setAccounts(
      accounts.map(account =>
        account.id === id ? { ...account, isActive: !account.isActive } : account
      )
    );
  };

  const addChannel = (channel: Omit<Channel, "id">) => {
    const newChannel = {
      ...channel,
      id: `channel-${Date.now()}`
    };
    setChannels([...channels, newChannel]);
    toast({
      title: "Канал добавлен",
      description: `${newChannel.name} успешно добавлен`,
    });
  };

  const removeChannel = (id: string) => {
    setChannels(channels.filter(channel => channel.id !== id));
    toast({
      title: "Канал удален",
      description: "Канал успешно удален из системы",
    });
  };

  const toggleChannelActive = (id: string) => {
    setChannels(
      channels.map(channel =>
        channel.id === id ? { ...channel, isActive: !channel.isActive } : channel
      )
    );
  };

  const addLog = (log: Omit<LogEntry, "id" | "timestamp">) => {
    const newLog = {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: new Date()
    };
    setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 99)]);
    
    // Show toast for important events
    if (log.status === "success") {
      toast({
        title: "Успешно",
        description: log.message,
        variant: "default",
      });
    } else if (log.status === "error") {
      toast({
        title: "Ошибка",
        description: log.message,
        variant: "destructive",
      });
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
  };

  const toggleRunning = () => {
    const newRunningState = !isRunning;
    setIsRunning(newRunningState);
    
    addLog({
      message: newRunningState 
        ? "Мониторинг криптобоксов запущен" 
        : "Мониторинг криптобоксов остановлен",
      status: "info"
    });
    
    toast({
      title: newRunningState ? "Мониторинг запущен" : "Мониторинг остановлен",
      description: newRunningState 
        ? "Ваши аккаунты активно проверяют криптобоксы" 
        : "Мониторинг приостановлен",
    });
  };

  const addCryptoBox = (cryptoBox: Omit<CryptoBox, "id" | "timestamp">) => {
    const newCryptoBox = {
      ...cryptoBox,
      id: `box-${Date.now()}`,
      timestamp: new Date()
    };
    setCryptoBoxes(prevBoxes => [newCryptoBox, ...prevBoxes.slice(0, 49)]);
    
    // Add a success log entry
    addLog({
      message: `Добыт криптобокс: ${cryptoBox.coinName} (${cryptoBox.amount})`,
      status: "success",
      accountId: cryptoBox.accountId
    });
    
    // Show toast notification
    toast({
      title: "Криптобокс активирован",
      description: `${cryptoBox.coinName}: ${cryptoBox.amount} получено`,
      variant: "default",
    });
  };

  const contextValue: AppContextType = {
    currentState,
    setCurrentState,
    accounts,
    addAccount,
    removeAccount,
    toggleAccountActive,
    channels,
    addChannel,
    removeChannel,
    toggleChannelActive,
    logs,
    addLog,
    clearLogs,
    settings,
    updateSettings,
    isRunning,
    toggleRunning,
    cryptoBoxes,
    addCryptoBox
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
