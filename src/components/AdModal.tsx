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
            Giao diện được sử dụng bởi API có sẵn nên sẽ không khớp với chủ đề
            giao diện hiện tại. API đang được cập nhật bổ sung để phù hợp với
            chủ đề.
          </p>
          <p>các chức năng có thể sử dụng:</p>
          <ol>
            <li>Đăng nhập -{'>'} username: kminchelle, password: 0lelplR</li>
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
