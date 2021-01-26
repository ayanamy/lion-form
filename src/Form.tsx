import React, { useRef } from 'react';
import useForm from './useForm';
import FieldContext from './FieldContext';

export default React.forwardRef((props: any, ref) => {
  const { form, children, initialValues, onFinish, ...restProps } = props;
  const [formInstance] = useForm(form) as any;

  const { setInitialValues, setCallbacks } = formInstance.getInternalHooks();

  React.useImperativeHandle(ref, () => formInstance);

  // 第一次渲染时初始化表单的值
  const mountRef = useRef(null) as any;
  setInitialValues(initialValues, !mountRef.current);
  if (!mountRef.current) {
    mountRef.current = true;
  }

  setCallbacks({
    onFinish,
  });

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
