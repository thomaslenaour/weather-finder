import React, { useContext } from 'react';

import { auth } from '../../firebase';

import UserContext from '../../contexts/UserContext';
import Header from '../../components/Header';

import imgSunny from '../../assets/images/sunny.svg';

const DashboardPage = () => {
  const { user } = useContext(UserContext);

  const logout = () => auth.signOut();

  return (
    <div className="main-container my-10">
      <div className="max-w-6xl mx-auto">
        <Header user={user} />
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h1 className="font-bold text-3xl mb-3">
              Quelle temps fait-il aujourd&apos;hui ?
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur,
              eius.
            </p>
          </div>
          <img
            src={imgSunny}
            alt="Illustration soleil"
            className="w-2/3 place-self-center"
          />
        </div>

        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
