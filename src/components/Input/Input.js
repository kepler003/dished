import InputBox from '../InputBox/InputBox';
import cls from './Input.module.css';

const Input = ({ label, error, type, name, id, className, ...props }) => {
  const tag = name || id || undefined;
  return (
    <InputBox label={label} labelFor={tag} error={error}>
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
