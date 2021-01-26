import React from 'react';
import Form, { Field } from 'lion-form';
import Input from './Component/Input';

export default class extends React.Component {
  onFinish(value) {
    console.log('onFinish', value);
  }

  render() {
    return (
      <Form onFinish={this.onFinish}>
        <Field name="username">
          <Input />
        </Field>
        <Field name="password">
          <Input />
        </Field>
        <button>提交</button>
      </Form>
    );
  }
}
