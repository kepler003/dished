import { useState, useEffect } from 'react';
import InputBox from '../InputBox/InputBox';
import cls from './Rating.module.css';

const Rating = ({ value = 5, max = 10, label, error, name, id, onChange }) => {
  const [rating, setRating] = useState(value);
  const tag = name || id || undefined;

  // Update state
  const onClickHandler = (e) => {
    setRating(e.target.getAttribute('value'));
    onChange(e);
  };

  // Loose focus when cursor leaves the input
  const onMouseLeaveHandler = () => {
    document.activeElement.blur();
  };

  // Get focus on hover
  const onMouseOverHandler = (e) => {
    e.target.focus();
  };

  const btns = new Array(max).fill(null).map((empty, index) => {
    return (
      <button
        type='button'
        key={index}
        name={tag}
        value={max - index}
        className={cls.btn}
        onClick={onClickHandler}
        onMouseOver={onMouseOverHandler}
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
