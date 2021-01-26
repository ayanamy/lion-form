import React, { useEffect } from 'react';
import Form, { Field } from 'lion-form';
import Input from './Component/Input';

export default () => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ username: 'lion' });
    form.setFieldsValue({ password: '123' });
  }, []);

  return (
    <Form form={form}>
      <Field name="username">
        <Input placeholder="请输入姓名" />
      </Field>
      <Field name="password">
        <Input placeholder="请输入密码" />
      </Field>
      <button>提交</button>
    </Form>
  );
};
