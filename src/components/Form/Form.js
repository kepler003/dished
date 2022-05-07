import Input from '../Input/Input';
import Button from '../Button/Button';
import cls from './Form.module.css';

const Form = () => {
  return (
    <div className={cls.card}>
      <h1 className={cls.heading}>Add a new dish</h1>
      <form>
        <Input label='Dish name' name='name' />
        <Input label='Preparation time' name='preparation_time' />
        <Input label='Dish type' name='type' />
        <Button type='submit' className={cls.submitBtn}>
          Add +
        </Button>
      </form>
    </div>
  );
};

export default Form;
