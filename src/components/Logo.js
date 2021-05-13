import React from 'react';

import logo from '../assets/images/logo.svg';

const Logo = () => {
  return (
    <div className="flex items-center">
      <img src={logo} alt="" className="w-16 h-16 mr-2 text-indigo-500" />
      <span className="text-3xl font-bold">Weather Finder</span>
    </div>
  );
};

export default Logo;
