import React, { useRef } from 'react';

class FormStore {
  private store: any = {};
  private fieldEntities: any = [];

  constructor() {}

  getFieldValue = (name: string) => {
    return this.store[name];
  };

  getFieldsValue = () => {
    return this.store;
  };

  setFieldsValue = (newStore: any) => {
    this.store = {
      ...this.store,
      ...newStore,
    };
    this.fieldEntities.forEach((entity: any) => {
      const { name } = entity.props;
      Object.keys(newStore).forEach(key => {
        if (key === name) {
          entity.onStoreChange();
        }
      });
    });
  };

  registerField = (entity: any) => {
    this.fieldEntities.push(entity);
    return () => {
      this.fieldEntities = this.fieldEntities.filter(
        (item: any) => item !== entity,
      );
      delete this.store[entity.props.name];
    };
  };

  submit = () => {
    console.log(this.getFieldsValue());
  };

  getForm = (): any => ({
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    registerField: this.registerField,
    submit: this.submit,
  });
}

export default function useForm(form: any) {
  const formRef = useRef();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm() as any;
    }
  }
  return [formRef.current];
}
