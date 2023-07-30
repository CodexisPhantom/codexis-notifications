import { useState } from 'react';
import { ActionIcon } from '@mantine/core';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { SimpleNotificationProps } from '../typings/notifications';

import { BiErrorAlt } from 'react-icons/bi';
import { BsCheck2All } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';

import useSound from 'use-sound';
import { useConfig } from '../providers/ConfigProvider';

const SimpleNotification: React.FC = () => {
  const { config } = useConfig();
  const [play] = useSound('./notification.mp3', {
    volume: config.soundVolume
  });
  const [notifications, setNotifications] = useState<SimpleNotificationProps[]>([]);

  const addNotification = (data: SimpleNotificationProps) => {
    setNotifications((prev) => [...prev, data]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== data.id));
    }, data.duration);
  };

  useNuiEvent<SimpleNotificationProps>('simpleNotification', (data) => {
    if (config.useSoundSimple) {
      play();
    }
    addNotification(data);
  });

  return (
    <>
      {notifications.map((item, key) => (
        <div className="simple-notification">
          {item.type == 'success' && (
            <ActionIcon color="green" size="md" radius="xl" variant="light">
              <BsCheck2All size="1.125rem" />
            </ActionIcon>
          )}
          {item.type == 'error' && (
            <ActionIcon color="red" size="md" radius="xl" variant="light">
              <BiErrorAlt size="1.125rem" />
            </ActionIcon>
          )}
          {item.type == 'info' && (
            <ActionIcon color="yellow" size="md" radius="xl" variant="light">
              <AiOutlineInfoCircle size="1.125rem" />
            </ActionIcon>
          )}
          {item.type == 'debug' && (
            <ActionIcon color="blue" size="md" radius="xl" variant="light">
              <HiOutlineWrenchScrewdriver size="1.125rem" />
            </ActionIcon>
          )}
          <p className="simple-notification-text">{item.message}</p>
        </div>
      ))}
    </>
  );
};

export default SimpleNotification;
