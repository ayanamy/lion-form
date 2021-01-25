import * as React from 'react';

const fun: any = () => {};

const Context = React.createContext<any>({
  getFieldValue: fun,
  getFieldsValue: fun,
  setFieldsValue: fun,
  registerField: fun,
  submit: fun,
});

export default Context;
