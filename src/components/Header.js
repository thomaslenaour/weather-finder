import React from 'react';
import PropTypes from 'prop-types';

import Logo from './Logo';

const Header = ({ user }) => {
  return (
    <header className="flex items-center justify-between pb-5 mb-5 border-b border-gray-200">
      <Logo />
      <button type="button" className="font-medium">
        {user.email}
      </button>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

export default Header;
