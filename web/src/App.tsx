import { MantineProvider } from '@mantine/core';
import JobNotification from './components/JobNotification';
import SimpleNotification from './components/SimpleNotification';

const App: React.FC = () => {
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        ...{
          colorScheme: 'dark',
          fontFamily: 'Quicksand',
        },
      }}
    >
      <div className="notification">
        <SimpleNotification />
        <JobNotification />
      </div>
    </MantineProvider>
  );
};

export default App;
