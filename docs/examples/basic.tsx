import React, { Component, useEffect } from 'react';
import Form, { Field } from 'lion-form';

const Input = props => {
  const { value, ...restProps } = props;
  return <input {...restProps} value={value} />;
};

export default function BasicForm(props) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ username: 'lion' });
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
}
