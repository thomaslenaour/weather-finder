import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/form/Button';

import closeIcon from '../../../assets/images/icons/close.svg';
import plusIcon from '../../../assets/images/icons/plus.svg';
import SearchResultMap from './SearchResultMap';

const SearchResultSection = ({
  data,
  isInFavourite,
  onAddFavourite,
  onDeleteFavourite,
}) => {
  const convertWindSpeedToKmH = (speed) => parseFloat((speed * 3.6).toFixed());

  return (
    <div>
      <h2 className="font-bold text-3xl mb-3">Actuellement, à {data.name}</h2>
      <div className="grid md:grid-cols-2 gap-8 my-5">
        <div className="bg-yellow-500 rounded-md divide-y divide-yellow-600 text-white shadow-sm">
          <div className="flex items-center justify-between p-5">
            <h3 className="font-medium text-2xl">{data.name}</h3>
            <div>
              <p className="uppercase text-3xl">{data.main.temp} °C</p>
              <small>Ressenti : {data.main.feels_like} °C</small>
            </div>
          </div>
          <div className="p-5 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-4 grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-xl">Vent</p>
              <p>{convertWindSpeedToKmH(data.wind.speed)} km/h</p>
            </div>
            <div>
              <p className="font-medium text-xl">Minimum</p>
              <p>{data.main.temp_min} °C</p>
            </div>
            <div>
              <p className="font-medium text-xl">Maximum</p>
              <p>{data.main.temp_max} °C</p>
            </div>
            <div>
              <p className="font-medium text-xl">Pression</p>
              <p>{data.main.pressure} hPa</p>
            </div>
          </div>
          <div className="p-5">
            <Button
              icon={isInFavourite ? closeIcon : plusIcon}
              label={
                isInFavourite ? 'Supprimer des favoris' : 'Ajouter aux favoris'
              }
              onClick={
                isInFavourite
                  ? () => onDeleteFavourite(data.name)
                  : () => onAddFavourite(data.name)
              }
              classes="bg-gray-50 hover:bg-white text-black"
            />
          </div>
        </div>
        <SearchResultMap lat={data.coord.lat} lng={data.coord.lon} />
      </div>
    </div>
  );
};

SearchResultSection.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    }),
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }),
    coord: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    }),
  }),
  isInFavourite: PropTypes.bool.isRequired,
  onDeleteFavourite: PropTypes.func.isRequired,
  onAddFavourite: PropTypes.func.isRequired,
};

export default SearchResultSection;
