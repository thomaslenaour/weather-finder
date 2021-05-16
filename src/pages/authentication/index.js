import React, { useState } from 'react';
import { Notyf } from 'notyf';

import { auth } from '../../firebase';

import Logo from '../../components/Logo';
import Input from '../../components/form/Input';
import Button from '../../components/form/Button';

import { doesEmailExists, createUser } from '../../services/user';

import imgSeasons from '../../assets/images/seasons.svg';
import registerIcon from '../../assets/images/icons/register.svg';
import unlockIcon from '../../assets/images/icons/unlock.svg';

const AuthenticationPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const clearInputs = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const switchMode = () => {
    clearInputs();
    setError('');
    setIsLoginMode(!isLoginMode);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Merci de remplir tous les champs.');
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password).then(() => {
        const notyf = new Notyf();
        notyf.success(`Connexion réussie`);
        clearInputs();
      });
    } catch (err) {
      setError('Adresse email ou mot de passe invalide.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email) {
      setError('Merci de remplir tous les champs.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    const emailExists = await doesEmailExists(email);
    if (emailExists) {
      setError("L'adresse email est déjà utilisée.");
      return;
    }

    try {
      const createdUser = await auth
        .createUserWithEmailAndPassword(email, password)
        .then((currentUser) => {
          const notyf = new Notyf();
          notyf.success(`Inscription réussie`);
          clearInputs();
          return currentUser;
        });
      await createdUser.user.updateProfile({ displayName: fullName });
      await createUser(createdUser.user.uid, fullName, email);
    } catch (err) {
      setError("Impossile de s'inscrire pour le moment.");
    }
  };

  return (
    <div className="main-container">
      <div className="md:flex md:items-center md:justify-center md:h-screen py-5">
        <div className="grid md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
          <div>
            <Logo />
            <h1 className="font-bold text-2xl my-4">
              {isLoginMode ? 'Connectez-vous' : 'Inscrivez-vous'}
            </h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={isLoginMode ? handleLogin : handleRegister}>
              {!isLoginMode && (
                <Input
                  label="Prénom et Nom"
                  name="fullname"
                  placeholder="John Doe"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.currentTarget.value)}
                  required
                />
              )}
              <Input
                label="Adresse email"
                name="email"
                placeholder="Adresse email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
              />
              <Input
                label="Mot de passe"
                name="password"
                placeholder={
                  isLoginMode
                    ? 'Mot de passe'
                    : 'Mot de passe (min. 6 caractères)'
                }
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
              />
              {!isLoginMode && (
                <Input
                  label="Retapez votre mot de passe"
                  name="passwordConfirme"
                  placeholder="Retapez votre mot de passe"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                  required
                />
              )}
              <Button
                submit
                icon={isLoginMode ? unlockIcon : registerIcon}
                label={isLoginMode ? 'Se connecter' : "S'inscrire"}
                classes="bg-indigo-500 hover:bg-indigo-400 w-full text-white"
              />
            </form>
            <div className="mt-4 font-medium">
              {isLoginMode ? (
                <p>
                  Pas encore de compte ?{' '}
                  <button
                    type="button"
                    className="text-indigo-500"
                    onClick={switchMode}
                  >
                    Inscrivez-vous
                  </button>
                </p>
              ) : (
                <p>
                  Déjà un compte ?{' '}
                  <button
                    type="button"
                    className="text-indigo-500"
                    onClick={switchMode}
                  >
                    Connectez-vous
                  </button>
                </p>
              )}
            </div>
          </div>
          <img src={imgSeasons} alt="Illustration saisons" />
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
