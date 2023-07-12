'use client'
import { api } from '@/utils/api';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {getCookie, setCookie} from 'cookies-next'
import { useLayoutEffect } from 'react';
import { useAppDispatch ,useAppSelector} from '@/redux/hooks';
import { SignIn } from '@/redux/slice/profile';
function page() {
  const router = useRouter();
  const data = useAppSelector(state => state.AuthSlice.data)
  console.log(data)
  const dispatch = useAppDispatch()
  const login = async (data: any) => {
    const res = await dispatch(SignIn(data))
    if (res.payload.status === 200) {
      
        console.log(res.payload.data.token)
        localStorage.setItem('token', res.payload.data.token);
  
        Cookies.set('token', res.payload.data.token, {
          secure: true,
          sameSite: 'strict',
        
        })
      
      router.push('/')
    }
  };

  return (
    <div className="container_form">
      <Form id="form" layout="vertical" onFinish={async (value) => {
        await login(value)
      }}>
        <h1 className='text-2xl text-center'>Đăng Nhập</h1>
        <Form.Item name="username" label="UserName">
          <Input id="email" className='w-full'/>
        </Form.Item>

        <Form.Item name="password" label="mat khau" className='w-full'>
          <Input.Password/>
        </Form.Item>
        <Button htmlType="submit">Sign Up</Button>
      </Form>

      <p>
        <span>Chưa có tài khoản?</span> <a> Đăng Ký tại đây!</a>
      </p>
    </div>
  );
}

export default page;
