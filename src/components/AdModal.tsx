'use client';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

const AdModal = () => {
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
        title="Thông báo"
        open={isModalOpen}
        onCancel={(e) => setIsModalOpen(false)}
        footer={null}
        afterOpenChange={(e) => localStorage.setItem('isModalOpen', 'true')}
        centered={true}
      >
        <div className="text-lg">
          <p>
            Giao diện được sử dụng json-server để lưu trữ dữ liệu, vì vậy một số
            tính năng không hoạt động như mong muốn!
          </p>
        </div>
      </Modal>
    </>
  );
};

export default AdModal;
