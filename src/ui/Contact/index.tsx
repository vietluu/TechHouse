'use client';
import { emailValiate, phoneValidate } from '@/utils/validate';
import { Button, Form, Input, message } from 'antd';
import React, { useRef } from 'react';
import { useTranslation } from '@/context/I18nContext';

function Index() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  return (
    <div className="fluid_container py-8 sm:py-4">
      <div className="grid gap-8 sm:gap-4 md:grid-cols-1 grid-cols-2">
        <div className="w-full h-full min-h-[350px] sm:min-h-[220px] rounded-3xl sm:rounded-2xl overflow-hidden shadow-soft border border-slate-150">
          <iframe
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Fafim%20Ng%C3%A3%20T%C6%B0%20S%E1%BB%9F,%2019%20Nguy%E1%BB%85n%20Tr%C3%A3i,%20Ng%C3%A3%20T%C6%B0%20S%E1%BB%9F,%20%C4%90%E1%BB%91ng%20%C4%90a,%20H%C3%A0%20N%E1%BB%99i,%20Vi%E1%BB%87t%20Nam+(my%20address)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            className="w-full h-full min-h-[350px] sm:min-h-[220px]"
            style={{ border: 0 }}
          />
        </div>
        <div className="p-8 sm:p-4 bg-white rounded-3xl sm:rounded-2xl border border-slate-150 shadow-soft">
          <h1 className="text-2xl sm:text-xl font-bold text-slate-800 tracking-tight pb-3 border-b border-slate-100 mb-6 sm:mb-4">
            {t('contact.title')}
          </h1>

          <div className="box-info-contact mb-6">
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <div>
                  <p className="text-xs text-slate-400 font-medium">{t('contact.ourAddressTitle')}</p>
                  <p className="text-slate-700 font-medium">{t('contact.ourAddressValue')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="fas fa-envelope"></i>
                </span>
                <div>
                  <p className="text-xs text-slate-400 font-medium">{t('contact.supportEmailTitle')}</p>
                  <p className="text-slate-700 font-medium">contact@techhouse.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="fas fa-phone-alt"></i>
                </span>
                <div>
                  <p className="text-xs text-slate-400 font-medium">{t('contact.hotlineTitle')}</p>
                  <p className="text-slate-700 font-medium">1900.636.099 (8:00 - 18:00)</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              {t('contact.sendInquiryTitle')}
            </h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={(value) =>
                message
                  .loading({ content: t('contact.sendingMessage') })
                  .then(() => {
                    message.success(t('contact.sendSuccess'));
                    form.resetFields();
                  })
              }
              onFinishFailed={(e) => console.log(e)}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: t('contact.nameRequired'),
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder={t('contact.namePlaceholder')}
                  className="!p-3 !rounded-xl !border-slate-200"
                />
              </Form.Item>
              <div className="grid md:grid-cols-1 gap-3 grid-cols-2">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value || value.trim() === '') {
                          return Promise.reject(
                            t('contact.emailRequired')
                          );
                        }
                        if (!emailValiate(value)) {
                          return Promise.reject(
                            t('contact.emailInvalid')
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder={t('contact.emailPlaceholder')}
                    className="!p-3 !rounded-xl !border-slate-200"
                  />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value || value.trim() === '') {
                          return Promise.reject(
                            t('contact.phoneRequired')
                          );
                        }
                        if (!phoneValidate(value)) {
                          return Promise.reject(
                            t('contact.phoneInvalid')
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder={t('contact.phonePlaceholder')}
                    className="!p-3 !rounded-xl !border-slate-200"
                  />
                </Form.Item>
              </div>
              <Form.Item name="content">
                <Input.TextArea
                  rows={4}
                  placeholder={t('contact.messagePlaceholder')}
                  className="!p-3 !rounded-xl !border-slate-200 !resize-none"
                />
              </Form.Item>
              <div>
                <Button
                  className="!w-full !h-auto !rounded-xl !py-3.5 !bg-sky-600 hover:!bg-sky-700 !text-white font-semibold shadow-md shadow-sky-600/25 transition-all"
                  htmlType="submit"
                  type="primary"
                >
                  {t('contact.sendButton')}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
