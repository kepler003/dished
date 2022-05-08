import classes from '../../utils/classes';
import cls from './InputBox.module.css';

const InputBox = ({ label, errors, labelFor, children, className }) => {
  return (
    <div className={classes(className, cls.box)}>
      {label && (
        <label htmlFor={labelFor} className={cls.label}>
          {label}
        </label>
      )}
      {children}
      {errors &&
        errors.map((error) => (
          <span key={error} className={cls.error}>
            {error}
          </span>
        ))}
    </div>
  );
};

export default InputBox;
