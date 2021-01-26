import React, { useRef } from 'react';
import { setValues } from './utils/valueUtil';
import { getValue } from './utils/valueUtil';

class FormStore {
  private store: any = {};
  private fieldEntities: any = [];
  private initialValues = {};
  private callbacks = {} as any;

  constructor() {}

  getFieldValue = (name: string) => {
    return this.store[name];
  };

  getFieldsValue = () => {
    return this.store;
  };

  getFieldEntities = () => {
    return this.fieldEntities;
  };

  notifyObservers = (prevStore: any) => {
    this.getFieldEntities().forEach((entity: any) => {
      const { onStoreChange } = entity;
      onStoreChange(prevStore, this.getFieldsValue());
    });
  };

  setFieldsValue = (curStore: any) => {
    const prevStore = this.store;
    if (curStore) {
      this.store = setValues(this.store, curStore);
    }
    this.notifyObservers(prevStore);
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
    const { onFinish } = this.callbacks;
    onFinish(this.getFieldsValue());
  };

  private getInitialValue = (namePath: any) =>
    getValue(this.initialValues, namePath);

  setInitialValues = (initialValues: any, init: boolean) => {
    this.initialValues = initialValues;
    // 初始化的时候，一定要把值同步给store.
    if (init) {
      // setValues 是工具类，不用过多的去关注它，只需要知道它能做什么即可。
      this.store = setValues({}, initialValues, this.store);
    }
  };

  setCallbacks = (callbacks: any) => {
    this.callbacks = callbacks;
  };

  getForm = (): any => ({
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    registerField: this.registerField,
    submit: this.submit,
    getInternalHooks: () => {
      return {
        setInitialValues: this.setInitialValues,
        setCallbacks: this.setCallbacks,
      };
    },
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
