'use client';
import { emailValiate, phoneValidate } from '@/utils/validate';
import { Button, Form, Input, message } from 'antd';
import React, { useRef } from 'react';

function Index() {
  const formRef = useRef(null);
  return (
    <div className="container_fluid px-8 py-5 md:px-2">
      <div className="grid gap-2 md:gap-0 md:grid-cols-1 grid-cols-2">
        <div className="w-full h-full md:h-[32rem]">
          <iframe
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Fafim%20Ng%C3%A3%20T%C6%B0%20S%E1%BB%9F,%2019%20Nguy%E1%BB%85n%20Tr%C3%A3i,%20Ng%C3%A3%20T%C6%B0%20S%E1%BB%9F,%20%C4%90%E1%BB%91ng%20%C4%90a,%20H%C3%A0%20N%E1%BB%99i,%20Vi%E1%BB%87t%20Nam+(my%20address)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            className="w-full h-full"
          />
        </div>
        <div className="p-5 bg-white w-full md:mt-8">
          <h1 className="text-sky-500 text-2xl font-bold relative pb-[30px] after:content-[''] after:absolute after:w-[50px] after:h-1 after:bottom-[15px] after:left-0 after:bg-black ">
            Liên hệ
          </h1>

          <div className="box-info-contact">
            <ul className="list-info">
              <li className="py-4">
                <p className="text-sm text-slate-500">Địa chỉ chúng tôi</p>
                <p>
                  <strong className="text-md text-slate-600">
                    Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành,
                    phường 15, quận 11, Tp. Hồ Chí Minh.
                  </strong>
                </p>
              </li>
              <li className="py-4">
                <p className="text-sm text-slate-500">Email chúng tôi</p>
                <p>
                  <strong className="text-md text-slate-600">
                    hi@haravan.com
                  </strong>
                </p>
              </li>
              <li className="py-4">
                <p className="text-sm text-slate-500">Điện thoại</p>
                <p>
                  <strong className="text-md text-slate-600">
                    1900.636.099
                  </strong>
                </p>
              </li>
              <li className="py-4">
                <p className="text-sm text-slate-500">Thời gian làm việc</p>
                <p>
                  <strong className="text-md text-slate-600">
                    Thứ 2 đến Thứ 6 từ 8h đến 18h; Thứ 7 và Chủ nhật từ 8h00 đến
                    17h00
                  </strong>
                </p>
              </li>
            </ul>
          </div>
          <div className="py-3">
            <h2 className="text-2xl text-sky-500 font-bold relative pb-[30px] after:content-[''] after:absolute after:w-[30px] after:h-[3px] after:bottom-[15px] after:left-0 after:bg-black ">
              Gửi thắc mắc cho chúng tôi
            </h2>
            <div className="pt-5">
              <Form
                ref={formRef}
                onFinish={(value) =>
                  message
                    .loading({ content: 'sending...' })
                    //@ts-ignore
                    .then(() => formRef?.current?.resetFields())
                }
                onFinishFailed={(e) => console.log(e)}
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên của bạn!',
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Tên của bạn"
                    className="!p-2 1 !rounded-none"
                  />
                </Form.Item>
                <div className="grid md:grid-cols-1 md:gap-0 gap-2  grid-cols-2">
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value || value.trim() === '') {
                            return Promise.reject(
                              'Vui lòng điền thông tin email!'
                            );
                          }
                          if (!emailValiate(value)) {
                            return Promise.reject(
                              'vui lòng nhập đúng định dạng email!'
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Email của bạn"
                      className="!p-2 1 !rounded-none !ml-0"
                    />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value || value.trim() === '') {
                            return Promise.reject(
                              'Vui lòng điền thông tin số điện thoại!'
                            );
                          }
                          if (!phoneValidate(value)) {
                            return Promise.reject(
                              'vui lòng nhập đúng định dạng số điện thoại!'
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Số điện thoại của bạn"
                      className="!p-2 1 !rounded-none"
                    />
                  </Form.Item>
                </div>
                <Form.Item name="content">
                  <Input.TextArea
                    rows={4}
                    placeholder="Nội dung"
                    className="!p-2 1 !resize-none !overflow-y-scroll !rounded-none"
                  />
                </Form.Item>
                <div>
                  <Button
                    type="primary"
                    className="!w-auto !h-auto !rounded-none !p-3"
                    htmlType="submit"
                    title="Gửi cho chúng tôi"
                  >
                    Gửi cho chúng tôi
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
