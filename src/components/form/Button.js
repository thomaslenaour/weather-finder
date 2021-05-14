import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ submit, icon, label, classes, onClick }) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={`px-3 py-2 rounded-md shadow-sm ${
        icon && 'flex items-center justify-center'
      } ${classes}`}
      onClick={onClick}
    >
      {icon && <img src={icon} alt="Icone" className="w-5 h-5 mr-1" />}
      {label}
    </button>
  );
};

Button.propTypes = {
  submit: PropTypes.bool,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  classes: PropTypes.string,
};

Button.defaultProps = {
  submit: false,
  icon: null,
  classes: null,
  onClick: null,
};

export default Button;
