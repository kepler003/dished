import { useState, useEffect } from 'react';
import useForm from '../../hooks/useForm';
import Input from '../Input/Input';
import Select from '../Select/Select';
import Rating from '../Rating/Rating';
import Button from '../Button/Button';
import cls from './Form.module.css';

const Form = () => {
  const form = useForm({
    name: {
      id: 'name',
      value: '',
    },
    prepTime: {
      id: 'preparation_time',
      value: '00:00:00',
    },
    type: {
      id: 'type',
      value: 'Pizza',
      values: ['Pizza', 'Soup', 'Sandwich'],
    },
    pizzaSlices: {
      id: 'no_of_slices',
      value: 6,
      min: 1,
      max: 16,
    },
    diameter: {
      id: 'diameter',
      value: 20,
      min: 20,
      max: 60,
    },
    spiciness: {
      id: 'spiciness_scale',
      value: 5,
      min: 1,
      max: 10,
    },
    breadSlices: {
      id: 'slices_of_bread',
      value: 4,
      min: 1,
    },
  });

  const {
    name,
    prepTime,
    type,
    pizzaSlices,
    diameter,
    spiciness,
    breadSlices,
  } = form;

  const onChangeHandler = (e) => {
    if (!e.target) return;
    const name = e.target.getAttribute('name');
    form[name].setValue(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    form.validate();
  };

  return (
    <div className={cls.card}>
      <h1 className={cls.heading}>Add a new dish</h1>
      <form onSubmit={onSubmitHandler} noValidate>
        <Input
          label='Dish name'
          name='name'
          value={name.value}
          errors={name.errors}
          onChange={onChangeHandler}
        />
        <Input
          label='Preparation time'
          name='prepTime'
          type='time'
          step='1'
          value={prepTime.value}
          errors={prepTime.errors}
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
        {type.value === 'Pizza' && (
          <>
            <Input
              label='Slices of pizza'
              name='pizzaSlices'
              type='number'
              step='1'
              min='1'
              max='16'
              value={pizzaSlices.value}
              errors={pizzaSlices.errors}
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
        {type.value === 'Soup' && (
          <Rating
            label='Spiciness'
            name='spiciness'
            value={spiciness.value}
            errors={spiciness.errors}
            onChange={onChangeHandler}
          />
        )}
        {type.value === 'Sandwich' && (
          <Input
            label='Slices of bread'
            name='breadSlices'
            type='number'
            step='1'
            min='1'
            value={breadSlices.value}
            errors={breadSlices.errors}
            onChange={onChangeHandler}
          />
        )}
        <Button type='submit' className={cls.submitBtn}>
          Add +
        </Button>
      </form>
    </div>
  );
};

export default Form;
