import { useState } from 'react';
import { Box, createStyles } from '@mantine/core';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { useConfig } from '../providers/ConfigProvider';
import { JobNotificationProps } from '../typings/notifications';

import useSound from 'use-sound';
import { BsTelephone } from 'react-icons/bs';

const useStyles = createStyles((theme) => ({
  image: {
    position: 'absolute',
    top: '12px',
    left: '0px',
    marginLeft: '8px',
    borderRadius: 8,
  },
  type: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#000',
    padding: '1px 8px',
    borderRadius: '4px',
    width: '112px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const JobNotification: React.FC = () => {
  const { classes } = useStyles();
  const { config } = useConfig();
  const [play] = useSound('./notification.mp3', {
    volume: config.soundVolume
  });
  const [notifications, setNotifications] = useState<JobNotificationProps[]>([]);

  const addNotification = (data: JobNotificationProps) => {
    setNotifications((prev) => [...prev, data]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== data.id));
    }, data.duration);
  };

  useNuiEvent<JobNotificationProps>('jobNotification', (data) => {
    if (config.useSoundJob) {
      play();
    }
    addNotification(data);
  });

  return (
    <>
      {notifications.map((item, key) => (
        <div className='job-notification'>
          <p className='job-notification-title'>{item.name}</p>

          <Box className={classes.image} sx={{ backgroundColor: item.color }}>
            <img className='job-notification-image' src={`images/${item.job}.png`} />
          </Box>

          {item.type == 'opening' && (
            <div className='job-notification-info'>
              <Box className={classes.type} sx={{ backgroundColor: 'green' }}>
                <p>OUVERTURE</p>
              </Box>
            </div>
          )}

          {item.type == 'information' && (
            <div className='job-notification-info'>
              <Box className={classes.type} sx={{ backgroundColor: 'yellow' }}>
                <p>INFORMATION</p>
              </Box>
            </div>
          )}

          {item.type == 'closing' && (
            <div className='job-notification-info'>
              <Box className={classes.type} sx={{ backgroundColor: 'red' }}>
                <p>FERMETURE</p>
              </Box>
            </div>
          )}

          {item.number && (
            <div className='job-notification-number-container'>
              <div className='job-notification-number'>
                <p>{item.number}</p>
              </div>
              <BsTelephone color='green' size={22} />
            </div>
          )}

          <div className='job-notification-message'>
            <p>{item.message}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobNotification;
