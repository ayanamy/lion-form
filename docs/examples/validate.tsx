import React, { useEffect } from 'react';
import Form, { Field } from 'lion-form';
import Input from './Component/Input';

export default () => {
  const [form] = Form.useForm();

  const onFinish = value => {
    console.log('onFinish', value);
  };

  const onFinishFailed = err => {
    console.log('onFinishFailed', err);
  };

  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Field
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="请输入姓名" />
      </Field>
      <Field
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { pattern: /^\w{6}$/, message: 'password is invalid' },
        ]}
      >
        <Input placeholder="请输入密码" />
      </Field>
      <button>提交</button>
    </Form>
  );
};
