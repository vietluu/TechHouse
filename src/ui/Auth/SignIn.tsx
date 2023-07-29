'use client';
import { api } from '@/utils/api';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

function SignIn({ callback }: { callback: string | undefined }) {
  const router = useRouter();
  const login = async (data: any) => {
    const res = await api.post('/auth/login', data);
    if (res.status === 200) {
      console.log(res.data.token);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.lastName);
      localStorage.setItem('image', res.data.image);
      localStorage.setItem('id', res.data.id);

      Cookies.set('token', res.data.token, {
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
        <Form.Item name="username" label="UserName">
          <Input id="email" className="w-full" />
        </Form.Item>

        <Form.Item name="password" label="mat khau" className="w-full">
          <Input.Password />
        </Form.Item>
        <Button htmlType="submit">Sign In</Button>
      </Form>

      <p className="mt-2">
        <span>Chưa có tài khoản?</span> <a> Đăng Ký tại đây!</a>
      </p>
    </div>
  );
}

export default SignIn;
