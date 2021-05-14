import React from 'react';
import PropTypes from 'prop-types';

import spinnerIcon from '../assets/images/icons/spinner.svg';

const Spinner = ({ big }) => {
  return (
    <img
      src={spinnerIcon}
      alt="Icone Spinner"
      className={`${big ? 'w-10 h-10' : 'w-5 h-5'} animate-spin`}
    />
  );
};

Spinner.propTypes = {
  big: PropTypes.bool,
};

Spinner.defaultProps = {
  big: false,
};

export default Spinner;
