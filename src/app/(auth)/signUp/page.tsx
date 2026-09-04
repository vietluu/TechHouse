'use client';
import { api } from '@/utils/api';
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useTranslation } from '@/context/I18nContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

function Page() {
  const router = useRouter();
  const { t } = useTranslation();

  const login = async (data: any) => {
    try {
      const res = await api.post('/auth/login', data);
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('name', res.data.lastName);
        localStorage.setItem('image', res.data.image);
        localStorage.setItem('id', res.data.id);

        Cookies.set('token', res.data.token, {
          expires: 7,
          path: '/',
        });
        Cookies.set('name', res.data.lastName || res.data.username || 'User', { expires: 7, path: '/' });
        Cookies.set('id', res.data.id?.toString() || '1', { expires: 7, path: '/' });
        if (res.data.image) {
          Cookies.set('image', res.data.image, { expires: 7, path: '/' });
        }

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('auth-change'));
        }

        message.success(t('auth.signInSuccess'));
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      message.error(t('auth.signInFailed'));
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 py-12 sm:py-6 px-4 sm:px-3 relative">
      <div className="absolute top-4 right-4 sm:top-3 sm:right-3">
        <LanguageSwitcher variant="transparent" />
      </div>
      <div className="max-w-md w-full bg-white rounded-3xl sm:rounded-2xl shadow-2xl p-8 sm:p-5 border border-slate-150">
        <div className="text-center mb-6 sm:mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl sm:text-xl font-extrabold text-sky-600 mb-2">
            <i className="fas fa-bolt text-amber-500 text-xl sm:text-lg"></i>
            <span>TechHouse</span>
          </Link>
          <h2 className="text-2xl sm:text-xl font-bold text-slate-800 tracking-tight">{t('auth.signUpNow')}</h2>
          <p className="text-slate-500 text-xs mt-1">{t('auth.signInSubtitle')}</p>
        </div>

        <Form
          id="form"
          layout="vertical"
          onFinish={async (value) => {
            await login(value);
          }}
        >
          <Form.Item
            name="username"
            label={<span className="text-xs font-semibold text-slate-700">{t('auth.usernameLabel')}</span>}
            rules={[{ required: true, message: t('auth.usernameRequired') }]}
          >
            <Input id="email" placeholder={t('auth.usernamePlaceholder')} className="!rounded-xl !py-2.5 !px-3.5 !border-slate-200" />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span className="text-xs font-semibold text-slate-700">{t('auth.passwordLabel')}</span>}
            rules={[{ required: true, message: t('auth.passwordRequired') }]}
          >
            <Input.Password placeholder={t('auth.passwordPlaceholder')} className="!rounded-xl !py-2.5 !px-3.5 !border-slate-200" />
          </Form.Item>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              type="primary"
              htmlType="submit"
              className="!w-full !h-11 !rounded-xl !bg-sky-600 hover:!bg-sky-700 font-semibold text-sm shadow-md shadow-sky-600/20"
            >
              {t('auth.signUpNow')}
            </Button>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <Link href="/" className="hover:text-sky-600 transition-colors">
                <i className="fas fa-arrow-left mr-1"></i> {t('auth.backToHome')}
              </Link>
              <div>
                <span>{t('auth.signInTitle')}? </span>
                <Link href="/signIn" className="text-sky-600 font-semibold hover:underline">
                  {t('auth.signInButton')}
                </Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Page;
