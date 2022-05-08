import classes from '../../utils/classes';
import cls from './InputBox.module.css';

const InputBox = ({ label, errors, labelFor, children, className }) => {
  const labelElem = label && (
    <label htmlFor={labelFor} className={cls.label}>
      {label}
    </label>
  );

  const errorElems =
    errors &&
    errors.map((error) => (
      <span key={error} className={cls.error}>
        {error}
      </span>
    ));

  return (
    <div className={classes(className, cls.box)}>
      {labelElem}
      {children}
      {errorElems}
    </div>
  );
};

export default InputBox;
