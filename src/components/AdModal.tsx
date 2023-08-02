'use client';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

const AdModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
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
        centered={true}
      >
        <div className="text-lg">
          <p>
            Giao diện được sử dụng bởi API có sắn nên sẽ không khớp với giao
            diện hiện tại .Tích hợp hiện tại cho đăng nhập và sản phẩm.
          </p>
          <p>các chức năng có thể sử dụng:</p>
          <ol>
            <li>Đăng nhập</li>
            <li>Tìm kiếm</li>
            <li>Thêm giỏ hàng (có thể xử lí nhưng api không lưu lại)</li>
            <li>một số chức năng đang triển khai...</li>
          </ol>
        </div>
      </Modal>
    </>
  );
};

export default AdModal;
