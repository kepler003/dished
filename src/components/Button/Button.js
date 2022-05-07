import classes from '../../utils/classes';
import cls from './Button.module.css';

const Button = ({ className, type = 'button', children, ...props }) => {
  const onClickHandler = (e) => e.target.blur();

  return (
    <button
      className={classes(className, cls.button)}
      type={type}
      {...props}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
