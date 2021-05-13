import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  classes,
  required,
}) => {
  return (
    <label htmlFor={name} className="flex flex-col mb-3">
      <span className="mb-1 font-medium">{label}</span>
      <input
        type={type}
        className={`border border-gray-200 rounded-sm px-3 py-2 focus:border-indigo-500 ${classes}`}
        placeholder={placeholder}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </label>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  classes: PropTypes.string,
  required: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: '',
  classes: '',
  required: false,
};

export default Input;
