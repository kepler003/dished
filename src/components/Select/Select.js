import InputBox from '../InputBox/InputBox';
import inputCls from '../Input/Input.module.css';

const Select = ({
  options,
  label,
  error,
  type,
  name,
  id,
  className,
  ...props
}) => {
  const tag = name || id || undefined;
  return (
    <InputBox label={label} labelFor={tag} error={error}>
      <select name={tag} id={tag} className={inputCls.input} {...props}>
        {options &&
          options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </InputBox>
  );
};

export default Select;
