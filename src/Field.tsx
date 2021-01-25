import React, { Component } from 'react';
import FieldContext from './FieldContext';

export default class Field extends Component {
  static contextType = FieldContext;

  private cancelRegisterFunc: any;

  componentDidMount() {
    const { registerField } = this.context;
    this.cancelRegisterFunc = registerField(this);
  }

  componentWillUnmount() {
    if (this.cancelRegisterFunc) {
      this.cancelRegisterFunc();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const { name } = this.props as any;
    const { getFieldValue, setFieldsValue } = this.context;
    return {
      value: getFieldValue(name),
      onChange: (event: any) => {
        const newValue = event.target.value;
        setFieldsValue({ [name]: newValue });
      },
    };
  };

  render() {
    const { children } = this.props as any;
    return React.cloneElement(children, this.getControlled());
  }
}
