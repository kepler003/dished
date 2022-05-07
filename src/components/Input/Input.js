import cls from './Input.module.css';

const Input = ({ label, error, type, name, id, className, ...props }) => {
  const tag = name || id || undefined;

  const elements = {
    label: (
      <label htmlFor={tag} className={cls.label}>
        {label}
      </label>
    ),
    error: <span className={cls.error}>{error}</span>,
  };

  return (
    <div className={cls.box}>
      {label && elements.label}
      <input
        type={type || 'text'}
        name={tag}
        id={tag}
        className={cls.input}
        {...props}
      />
      {error && elements.label}
    </div>
  );
};

export default Input;
