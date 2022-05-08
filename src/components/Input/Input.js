import InputBox from '../InputBox/InputBox';
import cls from './Input.module.css';

const Input = ({ label, errors, type, name, id, className, ...props }) => {
  const tag = name || id || undefined;
  return (
    <InputBox label={label} labelFor={tag} errors={errors}>
      <input
        type={type || 'text'}
        name={tag}
        id={tag}
        className={cls.input}
        {...props}
      />
    </InputBox>
  );
};

export default Input;
