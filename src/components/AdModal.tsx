'use client';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

import { useTranslation } from '@/context/I18nContext';

const AdModal = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('isModalOpen') !== null) {
      return;
    }
    setIsModalOpen(true);
    return () => setIsModalOpen(false);
  }, []);

  return (
    <>
      <Modal
        title={
          <div className="flex items-center gap-2 text-sky-600 font-bold text-base">
            <i className="fas fa-info-circle text-lg"></i>
            <span>{t('common.noticeTitle')}</span>
          </div>
        }
        open={isModalOpen}
        onCancel={(e) => setIsModalOpen(false)}
        footer={null}
        afterOpenChange={(e) => localStorage.setItem('isModalOpen', 'true')}
        centered={true}
      >
        <div className="py-3 text-slate-600 text-sm leading-relaxed">
          <p>
            {t('common.welcomeNotice')}
          </p>
        </div>
      </Modal>
    </>
  );
};

export default AdModal;
