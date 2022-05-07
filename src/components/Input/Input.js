import cls from './Input.module.css';

const Input = ({
  label,
  error,
  type,
  name,
  id,
  className,
  children,
  ...props
}) => {
  const tag = name || id || undefined;

  const elements = {
    label: (
      <label htmlFor={tag} className={cls.label}>
        {label}
      </label>
    ),
    error: <span className={cls.error}>{error}</span>,
    input: (
      <input
        type={type || 'text'}
        name={tag}
        id={tag}
        className={cls.input}
        {...props}
      />
    ),
  };

  return (
    <div className={cls.box}>
      {label && elements.label}
      {children || elements.input}
      {error && elements.label}
    </div>
  );
};

export default Input;
