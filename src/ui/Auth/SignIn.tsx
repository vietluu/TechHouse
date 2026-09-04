'use client';
import { api } from '@/utils/api';
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { signIn } from '@/redux/slice/profile';
import { useTranslation } from '@/context/I18nContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const DEMO_ACCOUNT = {
  username: 'emilys',
  password: 'emilyspass',
};

const SignIn = ({ callback }: { callback: string | undefined }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.AuthSlice);

  const login = async (data: any) => {
    message.destroy();
    message.loading({
      key: 'loading',
      duration: 3,
      content: t('auth.signingIn'),
    });
    const res = await dispatch(signIn(data));
    message.destroy();

    if (res.payload?.status === 200 && res.payload?.data) {
      message.success({
        content: t('auth.signInSuccess'),
      });
      const token =
        res.payload.data.token || res.payload.data.accessToken;
      const userName =
        res.payload.data.lastName ||
        res.payload.data.firstName ||
        res.payload.data.username;

      if (token) {
        localStorage.setItem('token', token);
        Cookies.set('token', token, {
          expires: 7,
          path: '/',
        });
      }
      localStorage.setItem('name', userName);
      localStorage.setItem('image', res.payload.data.image || '');
      localStorage.setItem('id', res.payload.data.id?.toString() || '1');
      Cookies.set('name', userName, { expires: 7, path: '/' });
      Cookies.set('id', res.payload.data.id?.toString() || '1', { expires: 7, path: '/' });
      if (res.payload.data.image) {
        Cookies.set('image', res.payload.data.image, { expires: 7, path: '/' });
      }

      // Dispatch auth-change event so Header and UI sync immediately
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth-change'));
      }

      if (callback) {
        router.push(callback);
      } else {
        router.push('/');
      }
      router.refresh();
    } else {
      message.error({
        content: t('auth.signInFailed'),
      });
    }
  };

  const handleQuickLogin = async () => {
    form.setFieldsValue(DEMO_ACCOUNT);
    await login(DEMO_ACCOUNT);
  };

  const handleFillDemo = () => {
    form.setFieldsValue(DEMO_ACCOUNT);
    message.info(t('auth.filledDemoMessage'));
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
          <h2 className="text-2xl sm:text-xl font-bold text-slate-800 tracking-tight">{t('auth.signInTitle')}</h2>
          <p className="text-slate-500 text-xs mt-1">{t('auth.signInSubtitle')}</p>
        </div>

        {/* Demo Account Box */}
        <div className="bg-sky-50/80 border border-sky-200/80 rounded-2xl p-3.5 mb-6 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-700">
            <span className="font-semibold text-sky-700 block mb-0.5">
              <i className="fas fa-key mr-1"></i> {t('auth.demoAccountBox')}
            </span>
            <div className="font-mono text-[11px] text-slate-600">
              {t('auth.demoAccountHint')}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Button
              size="small"
              onClick={handleFillDemo}
              className="!text-xs !px-2.5 !h-7 !rounded-lg !border-sky-300 !text-sky-700 hover:!bg-sky-100 font-medium"
            >
              {t('auth.fillDemoButton')}
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={handleQuickLogin}
              loading={isLoading[signIn.typePrefix]}
              className="!text-xs !px-2.5 !h-7 !rounded-lg !bg-sky-600 hover:!bg-sky-700 font-medium shadow-xs"
            >
              {t('auth.oneClickLoginButton')}
            </Button>
          </div>
        </div>

        <Form
          form={form}
          id="form"
          layout="vertical"
          onFinish={async (value) => {
            await login(value);
          }}
          initialValues={DEMO_ACCOUNT}
        >
          <Form.Item
            name="username"
            label={<span className="text-xs font-semibold text-slate-700">{t('auth.usernameLabel')}</span>}
            rules={[{ required: true, message: t('auth.usernameRequired') }]}
          >
            <Input
              id="email"
              placeholder={t('auth.usernamePlaceholder')}
              className="!rounded-xl !py-2.5 !px-3.5 !border-slate-200 focus:!border-sky-500 text-sm shadow-xs"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span className="text-xs font-semibold text-slate-700">{t('auth.passwordLabel')}</span>}
            rules={[{ required: true, message: t('auth.passwordRequired') }]}
          >
            <Input.Password
              allowClear
              visibilityToggle
              placeholder={t('auth.passwordPlaceholder')}
              className="!rounded-xl !py-2.5 !px-3.5 !border-slate-200 focus:!border-sky-500 text-sm shadow-xs"
            />
          </Form.Item>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              htmlType="submit"
              type="primary"
              loading={isLoading[signIn.typePrefix]}
              className="!w-full !h-11 !rounded-xl !bg-sky-600 hover:!bg-sky-700 font-semibold text-sm shadow-md shadow-sky-600/20 transition-all"
            >
              {t('auth.signInButton')}
            </Button>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <Link href="/" className="hover:text-sky-600 transition-colors">
                <i className="fas fa-arrow-left mr-1"></i> {t('auth.backToHome')}
              </Link>
              <div>
                <span>{t('auth.noAccount')} </span>
                <Link href="/signUp" className="text-sky-600 font-semibold hover:underline">
                  {t('auth.signUpNow')}
                </Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
