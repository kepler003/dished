import { useState, useEffect } from 'react';
import InputBox from '../InputBox/InputBox';
import cls from './Rating.module.css';

const Rating = ({ value = 5, max = 10, label, error, name, id, onChange }) => {
  const [rating, setRating] = useState(value);
  const tag = name || id || undefined;

  // Lift state up
  useEffect(() => onChange && onChange(rating), [rating]);

  // Update state
  const onClickHandler = (e) => {
    setRating(e.target.getAttribute('value'));
  };

  // Loose focus when cursor leaves the input
  const onMouseLeaveHandler = () => {
    document.activeElement.blur();
  };

  const btns = new Array(max).fill(null).map((empty, index) => {
    return (
      <button
        key={index}
        value={max - index}
        className={cls.btn}
        onClick={onClickHandler}
      >
        {max - index <= rating ? '★' : '☆'}
      </button>
    );
  });

  return (
    <InputBox label={label} labelFor={tag} error={error}>
      <div className={cls.btnBox} onMouseLeave={onMouseLeaveHandler}>
        {btns}
      </div>
    </InputBox>
  );
};

export default Rating;
