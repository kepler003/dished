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
      if (!inputs[name].required) continue;
      if (inputs[name].value.toString().trim()) {
        removeError(name, error);
      } else {
        addError(name, error);
      }
    }
  };

  const checkValues = () => {
    const error = 'Invalid value!';

    for (const name in inputs) {
      if (!inputs[name].values) continue;
      if (inputs[name].values.includes(inputs[name].value.toString().trim())) {
        removeError(name, error);
      } else {
        addError(name, error);
      }
    }
  };

  useEffect(() => {
    checkRequired();
    checkValues();
  }, [inputs]);

  return Object.keys(inputs).reduce(
    (prev, name) => ({
      ...prev,
      [name]: {
        ...inputs[name],
        setValue: (value) => setInput(name, value),
        errors: errors[name],
      },
    }),
    {}
  );
};

export default useForm;
