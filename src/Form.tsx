import React from 'react';
import useForm from './useForm';
import FieldContext from './FieldContext';

export default React.forwardRef((props: any, ref) => {
  const { form, children, onFinish, onFinishFailed, ...restProps } = props;
  const [formInstance] = useForm(form) as any;

  React.useImperativeHandle(ref, () => formInstance);

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
});
