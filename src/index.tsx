import FieldForm from './Form';
import Field from './Field';
import useForm from './useForm';

const Form = FieldForm as any;
Form.Field = Field;
Form.useForm = useForm;

export { Field, useForm };

export default Form;
