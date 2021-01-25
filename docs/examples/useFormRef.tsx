import React from 'react';
import Form, { Field } from 'lion-form';
import Input from './Component/Input';

export default class extends React.Component {
  formRef = React.createRef();

  componentDidMount() {
    this.formRef.current.setFieldsValue({ username: 'lion' });
  }

  render() {
    return (
      <Form ref={this.formRef}>
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
