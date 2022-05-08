import { useEffect, useState } from 'react';

const getInitInputsState = (inputs) => {
  return Object.keys(inputs).reduce(
    (form, name) => ({
      ...form,
      [name]: {
        ...inputs[name],
        required: inputs[name].required ?? true,
        wasChanged: false,
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
  const [tempErrors, setTempErrors] = useState(getInitErrorsState(config));

  // Setters
  const setInput = (name, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: {
        ...prevInputs[name],
        value,
        wasChanged: true,
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

  const addTempError = (name, error) => {
    setTempErrors((prevErrors) => {
      if (prevErrors[name].includes(error)) return;

      return {
        ...prevErrors,
        [name]: [...prevErrors[name], error],
      };
    });
  };

  const removeTempErrors = (name) => {
    setTempErrors((prevErrors) => {
      return {
        ...prevErrors,
        [name]: [],
      };
    });
  };

  // Validators
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

  const checkMin = () => {
    const error = 'Not enough!';

    for (const name in inputs) {
      const min = inputs[name].min;
      if (min === undefined || min === null) continue;
      if (inputs[name].value >= min) {
        removeError(name, error);
      } else {
        addError(name, error);
      }
    }
  };

  const checkMax = () => {
    const error = 'Too much!';

    for (const name in inputs) {
      const max = inputs[name].max;
      if (max === undefined || max === null) continue;
      if (inputs[name].value <= max) {
        removeError(name, error);
      } else {
        addError(name, error);
      }
    }
  };

  const validate = () => {
    setInputs((prevInputs) =>
      Object.keys(inputs).reduce(
        (prev, name) => ({
          ...prev,
          [name]: {
            ...prevInputs[name],
            wasChanged: true,
          },
        }),
        {}
      )
    );
  };

  // Validate when form changes
  useEffect(() => {
    checkRequired();
    checkValues();
    checkMin();
    checkMax();
  }, [inputs]);

  const formData = Object.keys(inputs).reduce((prev, name) => {
    const inputErrors = inputs[name].wasChanged === true ? errors[name] : [];
    const inputTempErrors = tempErrors[name];
    return {
      ...prev,
      [name]: {
        ...inputs[name],
        setValue: (value) => setInput(name, value),
        errors: [...inputErrors, ...inputTempErrors],
      },
    };
  }, {});

  return {
    ...formData,
    validate() {
      validate();
      return this.hasErrors;
    },
    hasErrors: Object.keys(inputs).some((name) => errors[name].length),
    addTempError,
    removeTempErrors,
  };
};

export default useForm;
