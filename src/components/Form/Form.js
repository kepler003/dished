import { useState, useEffect } from 'react';
import useForm from '../../hooks/useForm';
import Input from '../Input/Input';
import Select from '../Select/Select';
import Rating from '../Rating/Rating';
import Button from '../Button/Button';
import cls from './Form.module.css';

const Form = () => {
  const [sending, setSending] = useState(false);
  const form = useForm({
    name: {
      value: '',
    },
    preparation_time: {
      value: '00:00:00',
    },
    type: {
      value: 'pizza',
      values: ['pizza', 'soup', 'sandwich'],
    },
    no_of_slices: {
      value: 6,
      min: 1,
      max: 16,
    },
    diameter: {
      value: 20,
      min: 20,
      max: 60,
    },
    spiciness_scale: {
      value: 5,
      min: 1,
      max: 10,
    },
    slices_of_bread: {
      value: 4,
      min: 1,
    },
  });

  const {
    name,
    preparation_time,
    type,
    no_of_slices,
    diameter,
    spiciness_scale,
    slices_of_bread,
  } = form;

  // Handlers
  const onChangeHandler = (e) => {
    const name = e.target.getAttribute('name');
    form[name].setValue(e.target.value);
    form.removeOutsideErrors(name);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const isValid = form.validate();
    if (!isValid) return;

    send({
      name: name.value,
      preparation_time: preparation_time.value,
      type: type.value,
      ...(type.value === 'pizza' && { no_of_slices: +no_of_slices.value }),
      ...(type.value === 'pizza' && { diameter: +diameter.value }),
      ...(type.value === 'soup' && { spiciness_scale: +spiciness_scale.value }),
      ...(type.value === 'sandwich' && {
        slices_of_bread: +slices_of_bread.value,
      }),
    });
  };

  const onSendErrorHandler = (response) => {
    const name = Object.keys(response)[0];
    const error = response[name];
    form.addOutsideError(name, error);
  };

  const send = async (data) => {
    try {
      setSending(true);

      let responseJSON = await fetch(
        'https://frosty-wood-6558.getsandbox.com:443/dishes',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await responseJSON.json();

      if (!responseJSON.ok) onSendErrorHandler(response);
    } catch (err) {
      console.log(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={cls.card}>
      <h1 className={cls.heading}>Add a new dish</h1>
      <form onSubmit={onSubmitHandler} noValidate>
        <Input
          label='Dish name'
          name='name'
          getFocus={true}
          value={name.value}
          errors={name.errors}
          onChange={onChangeHandler}
        />
        <Input
          label='Preparation time'
          name='preparation_time'
          type='time'
          step='1'
          value={preparation_time.value}
          errors={preparation_time.errors}
          onChange={onChangeHandler}
        />
        <Select
          label='Dish type'
          name='type'
          options={type.values}
          value={type.value}
          errors={type.errors}
          onChange={onChangeHandler}
        />
        {type.value === 'pizza' && (
          <>
            <Input
              label='Slices of pizza'
              name='no_of_slices'
              type='number'
              step='1'
              min='1'
              max='16'
              value={no_of_slices.value}
              errors={no_of_slices.errors}
              onChange={onChangeHandler}
            />
            <Input
              label='Diameter [cm]'
              name='diameter'
              type='number'
              step='0.1'
              min='20'
              max='60'
              value={diameter.value}
              errors={diameter.errors}
              onChange={onChangeHandler}
            />
          </>
        )}
        {type.value === 'soup' && (
          <Rating
            label='Spiciness'
            name='spiciness_scale'
            value={spiciness_scale.value}
            errors={spiciness_scale.errors}
            onChange={onChangeHandler}
          />
        )}
        {type.value === 'sandwich' && (
          <Input
            label='Slices of bread'
            name='slices_of_bread'
            type='number'
            step='1'
            min='1'
            value={slices_of_bread.value}
            errors={slices_of_bread.errors}
            onChange={onChangeHandler}
          />
        )}
        <Button type='submit' className={cls.submitBtn} disabled={sending}>
          {sending ? 'Adding...' : 'Add +'}
        </Button>
      </form>
    </div>
  );
};

export default Form;
