import { Context, createContext, useContext, useEffect, useState } from 'react';
import { fetchNui } from '../utils/fetchNui';

interface Config {
  soundVolume: number;
  useSoundJob: boolean;
  useSoundSimple: boolean;
}

interface ConfigCtxValue {
  config: Config;
  setConfig: (config: Config) => void;
}

const ConfigCtx = createContext<{ config: Config; setConfig: (config: Config) => void } | null>(null);

const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<Config>({
    soundVolume: 0.25,
    useSoundJob: false,
    useSoundSimple: true,
  });

  useEffect(() => {
    fetchNui<Config>('getConfig').then((data) => {
      console.log(data)
      setConfig(data)
    });
  }, []);

  return <ConfigCtx.Provider value={{ config, setConfig }}>{children}</ConfigCtx.Provider>;
};

export default ConfigProvider;

export const useConfig = () => useContext<ConfigCtxValue>(ConfigCtx as Context<ConfigCtxValue>);
