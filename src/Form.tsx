import React from 'react';
import useForm from './useForm';
import FieldContext from './FieldContext';

export default function Form(props: any) {
  const { form, children, onFinish, onFinishFailed, ...restProps } = props;
  const [formInstance] = useForm(form) as any;

  return (
    <form
      {...restProps}
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
