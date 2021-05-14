import React from 'react';

import Logo from './Logo';
import { auth } from '../firebase';

const Header = () => {
  const logout = () => auth.signOut();

  return (
    <header className="sm:flex sm:items-center sm:justify-between pb-5 mb-5 border-b border-gray-200">
      <Logo />
      <button
        type="button"
        className="mt-3 sm:mt-0 font-medium text-red-500"
        onClick={logout}
      >
        Se déconnecter
      </button>
    </header>
  );
};

export default Header;
