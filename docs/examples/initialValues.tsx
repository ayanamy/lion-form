import React from 'react';
import Form, { Field } from 'lion-form';
import Input from './Component/Input';

export default class extends React.Component {
  render() {
    return (
      <Form initialValues={{ username: 'lion', password: '123456' }}>
        <Field name="username">
          <Input />
        </Field>
        <Field name="password">
          <Input type="password" />
        </Field>
        <button>提交</button>
      </Form>
    );
  }
}
