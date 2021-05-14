import React, { useContext, useEffect, useState } from 'react';

import UserContext from '../../contexts/UserContext';
import Header from '../../components/Header';
import Input from '../../components/form/Input';
import Button from '../../components/form/Button';
import Spinner from '../../components/Spinner';

import {
  addWeatherLocation,
  getUserLocations,
  removeWeatherLocation,
} from '../../services/user';
import {
  getWeatherLocation,
  getWeatherLocations,
} from '../../services/weather';

import searchIcon from '../../assets/images/icons/search.svg';
import imgSunny from '../../assets/images/sunny.svg';
import FavouritesWeatherList from './components/FavouritesWeatherList';
import SearchResultSection from './components/SearchResultSection';

const DashboardPage = () => {
  const { user } = useContext(UserContext);

  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchResultIsLoading, setSearchResultIsLoading] = useState(false);
  const [favouritesWeather, setFavouritesWeather] = useState([]);
  const [favouritesWeatherIsLoading, setFavouritesWeatherIsLoading] =
    useState(false);
  const [isInFavourite, setIsInFavourite] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchResult(null);
    setError('');

    if (!searchInput) {
      setError('Merci de rentrer un nom de ville.');
      return;
    }

    setSearchResultIsLoading(true);

    try {
      const result = await getWeatherLocation(searchInput);
      setIsInFavourite(
        favouritesWeather.some(
          (loc) => loc.name.toLowerCase() === searchInput.toLowerCase()
        )
      );
      setSearchResultIsLoading(false);
      setSearchResult(result);
      setSearchInput('');
    } catch (err) {
      if (err.message === 'city not found') {
        setError("Cette ville n'existe pas.");
      } else {
        setError('Impossible de récupérer les informations pour le moment.');
      }
      setSearchResultIsLoading(false);
    }
  };

  const handleAddFavourite = async (location) => {
    try {
      await addWeatherLocation(user.uid, location);
      setIsInFavourite(true);
      setFavouritesWeather([...favouritesWeather, searchResult]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteFavourite = async (location) => {
    try {
      await removeWeatherLocation(user.uid, location);
      if (searchResult?.name.toLowerCase() === location.toLowerCase()) {
        setIsInFavourite(false);
      }
      setFavouritesWeather(
        favouritesWeather.filter((loc) => loc.name !== location)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getFavouritesWeather = async () => {
    setFavouritesWeatherIsLoading(true);
    try {
      const locations = await getUserLocations(user.uid);
      const favouritesLocations = await getWeatherLocations(locations);
      setFavouritesWeather(favouritesLocations);
      setFavouritesWeatherIsLoading(false);
    } catch (err) {
      console.error(err);
      setFavouritesWeatherIsLoading(false);
    }
  };

  useEffect(() => {
    getFavouritesWeather();
  }, []);

  return (
    <div className="main-container my-10">
      <div className="max-w-6xl mx-auto">
        <Header />
        <div className="grid md:grid-cols-2 gap-8 my-5">
          <div>
            <h1 className="font-bold text-3xl mb-3">
              Quel temps fait-il aujourd&apos;hui ?
            </h1>
            <p className="mb-3">
              Vous préparez une activité ? Regardez la météo avant de sortir !
            </p>
            <form onSubmit={handleSearch}>
              <Input
                type="text"
                name="search"
                label="Recherchez une ville"
                placeholder="Exemple : Bordeaux"
                value={searchInput}
                onChange={(e) => setSearchInput(e.currentTarget.value)}
                required
              />
              {error && <p className="text-red-500 mb-3">{error}</p>}
              <Button
                submit
                icon={searchIcon}
                label="Rechercher"
                classes="text-white bg-indigo-500 hover:bg-indigo-400 w-full"
              />
            </form>
          </div>
          <img
            src={imgSunny}
            alt="Illustration soleil"
            className="w-2/3 place-self-center"
          />
        </div>

        {searchResultIsLoading && <Spinner big />}
        {searchResult && !searchResultIsLoading && (
          <SearchResultSection
            data={searchResult}
            onAddFavourite={handleAddFavourite}
            onDeleteFavourite={handleDeleteFavourite}
            isInFavourite={isInFavourite}
          />
        )}

        <section>
          <h2 className="font-bold text-3xl mb-3">Vos lieux favoris</h2>
          {favouritesWeatherIsLoading && <Spinner big />}
          {favouritesWeather.length > 0 && !favouritesWeatherIsLoading && (
            <FavouritesWeatherList
              data={favouritesWeather}
              onDeleteFavourite={handleDeleteFavourite}
            />
          )}
          {favouritesWeather.length < 1 && !favouritesWeatherIsLoading && (
            <p>Aucun lieu favori enregistré.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
