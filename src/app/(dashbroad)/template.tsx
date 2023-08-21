'use client';
import { notification } from 'antd';
import { useLayoutEffect, useState, useSyncExternalStore } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
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
        message: 'Đã có kết nối internet!',
        closeIcon: true,
        duration: 4,
      });
    }
    if (!isOnline && firstOnline) {
      setFirstOnline(false);
      notification.error({
        message: 'Đã mất kết nối internet!',
        closeIcon: true,
        duration: 4,
      });
    }
  }, [isOnline]);
  return <>{children}</>;
}
