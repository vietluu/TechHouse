'use client';
import { api } from '@/utils/api';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@/redux/hooks';
import { signIn } from '@/redux/slice/profile';

function SignIn({ callback }: { callback: string | undefined }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = async (data: any) => {
    const res = await dispatch(signIn(data));
    if (res.payload.status == 200) {
      let token = res.payload.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('name', res.payload.data.lastName);
      localStorage.setItem('image', res.payload.data.image);
      localStorage.setItem('id', res.payload.data.id);

      Cookies.set('token', token, {
        secure: true,
        sameSite: 'strict',
      });
      if (callback) {
        return router.push(callback);
      }
      router.push('/');
    }
  };

  return (
    <div className="container_form">
      <Form
        id="form"
        layout="vertical"
        onFinish={async (value) => {
          await login(value);
        }}
      >
        <h1 className="text-2xl text-center">Đăng Nhập</h1>
        <Form.Item name="username" label="Tài khoản">
          <Input id="email" className="w-full" />
        </Form.Item>

        <Form.Item name="password" label="Mật khẩu" className="w-full">
          <Input.Password />
        </Form.Item>
        <Button htmlType="submit">Đăng nhập</Button>
      </Form>

      <p className="mt-2">
        <span>Chưa có tài khoản?</span> <a> Đăng Ký tại đây!</a>
      </p>
    </div>
  );
}

export default SignIn;
