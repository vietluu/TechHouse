'use client';
import { notification } from 'antd';
import { useLayoutEffect, useState, useSyncExternalStore } from 'react';
import { useTranslation } from '@/context/I18nContext';

export default function Template({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const isOnline = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const [firstOnline, setFirstOnline] = useState(true);
  function getSnapshot() {
    return navigator.onLine;
  }
  function getServerSnapshot() {
    return true;
  }

  function subscribe(callback: any) {
    window.addEventListener('online', callback);
    window.addEventListener('offline', callback);
    return () => {
      window.removeEventListener('online', callback);
      window.removeEventListener('offline', callback);
    };
  }

  useLayoutEffect(() => {
    notification.destroy();
    if (isOnline && !firstOnline) {
      setFirstOnline(true);
      notification.success({
        message: t('common.internetOnline'),
        closeIcon: true,
        duration: 4,
      });
    }
    if (!isOnline && firstOnline) {
      setFirstOnline(false);
      notification.error({
        message: t('common.internetOffline'),
        closeIcon: true,
        duration: 4,
      });
    }
  }, [isOnline, t]);
  return <>{children}</>;
}
