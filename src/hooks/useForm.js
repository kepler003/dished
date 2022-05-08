import { useEffect, useState } from 'react';

const getInitInputsState = (inputs) => {
  return Object.keys(inputs).reduce(
    (form, name) => ({
      ...form,
      [name]: {
        ...inputs[name],
        required: inputs[name].required ?? true,
      },
    }),
    {}
  );
};

const getInitErrorsState = (inputs) => {
  return Object.fromEntries(Object.keys(inputs).map((name) => [name, []]));
};

const useForm = (config) => {
  const [inputs, setInputs] = useState(getInitInputsState(config));
  const [errors, setErrors] = useState(getInitErrorsState(config));

  const setInput = (name, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: {
        ...prevInputs[name],
        value,
      },
    }));
  };

  const addError = (name, error) => {
    setErrors((prevErrors) => {
      const prevInputErrors = prevErrors[name];

      if (prevInputErrors.includes(error)) {
        return prevErrors;
      } else {
        return {
          ...prevErrors,
          [name]: [...prevInputErrors, error],
        };
      }
    });
  };

  const removeError = (name, error) => {
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        [name]: prevErrors[name].filter((prevError) => prevError !== error),
      };
    });
  };

  const checkRequired = () => {
    const error = 'This field is required!';

    for (const name in inputs) {
      if (!inputs[name].required) return;
      if (!inputs[name].value.toString().trim()) {
        addError(name, error);
      } else {
        removeError(name, error);
      }
    }
  };

  useEffect(() => {
    checkRequired();
  }, [inputs]);

  return Object.keys(inputs).reduce(
    (prev, name) => ({
      ...prev,
      [name]: {
        value: inputs[name].value,
        setValue: (value) => setInput(name, value),
        errors: errors[name],
      },
    }),
    {}
  );
};

export default useForm;
