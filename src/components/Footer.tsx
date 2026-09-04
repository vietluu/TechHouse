'use client';
import { emailValiate } from '@/utils/validate';
import { Button, Form, Input, message } from 'antd';
import { useRef } from 'react';
import { useTranslation } from '@/context/I18nContext';

export default function Footer() {
  const { t } = useTranslation();
  const formRef = useRef(null);
  return (
    <footer className="pt-12 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-8">
        {/* Newsletter Section */}
        <div className="newsletter-section w-full text-center py-12 sm:py-8 px-6 sm:px-3.5 bg-gradient-to-br from-sky-50 via-blue-50/60 to-sky-50 rounded-3xl sm:rounded-2xl border border-sky-100/80 shadow-soft mb-12 sm:mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 bg-white px-3.5 py-1.5 rounded-full shadow-xs inline-block mb-3">
            {t('newsletter.badge')}
          </span>
          <h2 className="text-2xl sm:text-xl text-slate-800 font-bold tracking-tight">
            {t('newsletter.title')}
          </h2>
          <p className="pt-2 pb-6 sm:pb-4 text-sm sm:text-xs text-slate-500 max-w-xl mx-auto">
            {t('newsletter.desc')}
          </p>

          <div className="w-full max-w-2xl mx-auto">
            <Form
              ref={formRef}
              onFinish={(value) => {
                message.loading({ content: t('newsletter.sending') }).then(() =>
                  formRef?.current
                    //@ts-ignore
                    ?.resetFields()
                );
              }}
              onFinishFailed={(e) => console.log(e)}
              className="newsletter-form !w-full flex flex-row sm:flex-col items-stretch gap-2.5"
            >
              <Form.Item
                name="email"
                className="!flex-1 !w-full !mb-0"
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value || value.trim() === '') {
                        return Promise.reject(t('newsletter.emptyEmailErr'));
                      }
                      if (!emailValiate(value)) {
                        return Promise.reject(t('newsletter.invalidEmailErr'));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder={t('newsletter.placeholder')}
                  className="!w-full !rounded-full !py-3.5 sm:!py-2.5 !px-6 sm:!px-4 !border-slate-200 focus:!border-sky-500 shadow-xs text-sm"
                />
              </Form.Item>
              <Form.Item className="!mb-0 !flex-shrink-0">
                <Button
                  htmlType="submit"
                  type="primary"
                  className="!w-full sm:!w-full !px-8 !py-3.5 sm:!py-2.5 !bg-sky-600 hover:!bg-sky-700 !rounded-full !h-auto font-semibold shadow-md shadow-sky-600/20 transition-all flex items-center justify-center text-sm"
                >
                  {t('newsletter.sendButton')}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        {/* Policy Badges */}
        <div className="grid grid-cols-3 sm:grid-cols-1 gap-6 sm:gap-3 my-10 sm:my-6">
          <div className="p-6 sm:p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-xs">
              <img src="/assets/Image/policy_icon_1.png" alt="Delivery" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h5 className="font-semibold text-slate-800 text-base sm:text-sm mb-1">{t('common.policyFastDelivery')}</h5>
              <p className="text-slate-500 text-xs">{t('common.policyFastDeliveryDesc')}</p>
            </div>
          </div>

          <div className="p-6 sm:p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-xs">
              <img src="/assets/Image/policy_icon_2.png" alt="Warranty" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h5 className="font-semibold text-slate-800 text-base sm:text-sm mb-1">{t('common.policyWarranty')}</h5>
              <p className="text-slate-500 text-xs">{t('common.policyWarrantyDesc')}</p>
            </div>
          </div>

          <div className="p-6 sm:p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-xs">
              <img src="/assets/Image/policy_icon_3.png" alt="Support" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h5 className="font-semibold text-slate-800 text-base sm:text-sm mb-1">{t('common.policySupport')}</h5>
              <p className="text-slate-500 text-xs">{t('common.policySupportDesc')}</p>
            </div>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-8 sm:gap-6 py-10 sm:py-6 border-t border-slate-100 text-left">
          <div className="footer__content1">
            <h4>{t('common.brandName')}</h4>
            <p className="text-sm text-slate-500 leading-relaxed pr-4">
              {t('about.introDesc1')}
            </p>
            <img
              className="mt-3 max-w-[10rem] w-full"
              src="/assets/Image/logo_bocongthuong.png"
              alt={t('footer.ministryOfCommerce')}
            />
          </div>

          <div className="footer__content2">
            <h4>{t('common.quickLinks')}</h4>
            <ul>
              <li>
                <a href="/product">
                  <i className="fas fa-chevron-right"></i> {t('common.allProducts')}
                </a>
              </li>
              <li>
                <a href="/about">
                  <i className="fas fa-chevron-right"></i> {t('common.about')}
                </a>
              </li>
              <li>
                <a href="/contact">
                  <i className="fas fa-chevron-right"></i> {t('common.contact')}
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> {t('common.returnPolicy')}
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> {t('common.privacyPolicy')}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__content3">
            <h4>{t('common.contactInfo')}</h4>
            <ul>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <i className="fas fa-map-marker-alt text-sky-600 w-4"></i>
                <span>{t('common.address')}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <i className="fas fa-phone-alt text-sky-600 w-4"></i>
                <span>0963.638.362</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <i className="fas fa-envelope text-sky-600 w-4"></i>
                <span>contact@techhouse.com</span>
              </li>
            </ul>

            <ul className="social">
              <li>
                <i className="fab fa-facebook-f"></i>
              </li>
              <li>
                <i className="fab fa-twitter"></i>
              </li>
              <li>
                <i className="fab fa-instagram"></i>
              </li>
              <li>
                <i className="fab fa-youtube"></i>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 text-base mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-sky-600">
              {t('common.fanPage')}
            </h4>
            <div className="rounded-xl overflow-hidden shadow-xs border border-slate-100">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61550311406566&tabs&width=350&height=220&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=978312696721588"
                style={{ border: 'none', overflow: 'hidden', width: '100%', height: '220px' }}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright text-center py-4 border-t border-slate-100 text-xs text-slate-400">
        {t('common.copyright')}
      </div>
    </footer>
  );
}
