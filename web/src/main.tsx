import React from 'react';
import ReactDOM from 'react-dom/client';

import { isEnvBrowser } from './utils/misc';
import App from './App';
import './index.scss';
import ConfigProvider from './providers/ConfigProvider';

if (isEnvBrowser()) {
  const root = document.getElementById('root');
  root!.style.backgroundImage = 'url("https://cdn.discordapp.com/attachments/1128243309115097199/1132773718783971409/image.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}

const root = document.getElementById('root');
ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
