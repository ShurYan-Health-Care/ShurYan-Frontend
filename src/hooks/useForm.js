import { useState } from 'react';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (validate && validate[name]) {
      const error = validate[name](value);
      setErrors({
        ...errors,
        [name]: error
      });
    }
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (validate) {
      const newErrors = {};
      Object.keys(validate).forEach(key => {
        const error = validate[key](values[key]);
        if (error) {
          newErrors[key] = error;
        }
      });
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }
    
    setIsSubmitting(true);
    onSubmit(values)
      .then(() => {
        setIsSubmitting(false);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setErrors({ ...errors, form: error.message });
      });
  };

  const resetForm = () => {
    setValues(initialValues || {});
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setErrors
  };
};

export default useForm;