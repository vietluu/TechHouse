'use client';
import { api } from '@/utils/api';
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@/redux/hooks';
import { signIn } from '@/redux/slice/profile';

function SignIn({ callback }: { callback: string | undefined }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = async (data: any) => {
    message.loading({
      key: 'loadind',
      duration: 3,
      content: 'Đang đăng nhập...',
    });
    const res = await dispatch(signIn(data));
    message.destroy();
    if (res.payload.status == 200) {
      message.success({
        content: 'Đăng nhập thành công!',
      });
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
    } else {
      message.error({
        content: 'Đăng nhập thất bại!',
      });
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

      <div className="mt-2 flex flex-row ">
        <span>Chưa có tài khoản?</span> <a> Đăng Ký tại đây!</a>
      </div>
    </div>
  );
}

export default SignIn;
