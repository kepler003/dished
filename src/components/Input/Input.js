import { useEffect, useRef } from 'react';
import InputBox from '../InputBox/InputBox';
import cls from './Input.module.css';

const Input = ({
  label,
  errors,
  type,
  name,
  id,
  getFocus,
  className,
  ...props
}) => {
  const tag = name || id || undefined;
  const ref = useRef();

  useEffect(() => {
    if (!getFocus) return;
    ref.current.focus();
  }, [getFocus]);

  return (
    <InputBox label={label} labelFor={tag} errors={errors}>
      <input
        type={type || 'text'}
        name={tag}
        id={tag}
        ref={ref}
        className={cls.input}
        {...props}
      />
    </InputBox>
  );
};

export default Input;
