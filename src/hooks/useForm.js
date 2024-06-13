import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setValues({
      ...values,
      [event.target.name]: value
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return [values, setValues, handleChange, resetForm];
}

export default useForm;