import React, { Component } from 'react';
import FieldContext from './FieldContext';
import RawAsyncValidator from 'async-validator';

export default class Field extends Component {
  static contextType = FieldContext;

  private cancelRegisterFunc: any;
  private validatePromise: Promise<string[]> | null = null;
  private errors: string[] = [];

  componentDidMount() {
    const { registerField } = this.context;
    this.cancelRegisterFunc = registerField(this);
  }

  componentWillUnmount() {
    if (this.cancelRegisterFunc) {
      this.cancelRegisterFunc();
    }
  }

  public getRules = () => {
    const { rules = [] } = this.props as any;
    return rules.map((rule: any) => {
      if (typeof rule === 'function') {
        return rule(this.context);
      }
      return rule;
    });
  };

  validateRule = async (name: any, value: any, rule: any) => {
    const cloneRule = { ...rule };
    const validator = new RawAsyncValidator({
      [name]: [cloneRule],
    });
    let result = [];
    try {
      await Promise.resolve(validator.validate({ [name]: value }));
    } catch (e) {
      if (e.errors) {
        result = e.errors.map((c: any) => c.message);
      }
    }
    return result;
  };

  executeValidate = (namePath: any, value: any, rules: any) => {
    let summaryPromise: Promise<string[]>;
    summaryPromise = new Promise(async (resolve, reject) => {
      for (let i = 0; i < rules.length; i += 1) {
        const errors = await this.validateRule(namePath, value, rules[i]);
        if (errors.length) {
          reject(errors);
          return;
        }
      }
      resolve([]);
    });
    return summaryPromise;
  };

  validateRules = () => {
    const { getFieldValue } = this.context;
    const { name } = this.props as any;
    const currentValue = getFieldValue(name);
    const rootPromise = Promise.resolve().then(() => {
      let filteredRules = this.getRules();
      const promise = this.executeValidate(name, currentValue, filteredRules);
      promise
        .catch(e => e)
        .then((errors: string[] = []) => {
          if (this.validatePromise === rootPromise) {
            this.validatePromise = null;
            this.errors = errors;
            this.forceUpdate();
          }
        });
      return promise;
    });
    this.validatePromise = rootPromise;
    return rootPromise;
  };

  onStoreChange = (prevStore: any, curStore: any) => {
    const { shouldUpdate } = this.props as any;
    if (typeof shouldUpdate === 'function') {
      if (shouldUpdate(prevStore, curStore)) {
        this.forceUpdate();
      }
    } else {
      this.forceUpdate();
    }
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
