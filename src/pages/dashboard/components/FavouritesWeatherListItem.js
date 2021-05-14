import React from 'react';
import PropTypes from 'prop-types';

import deleteIcon from '../../../assets/images/icons/delete.svg';

const FavouritesWeatherListItem = ({ data, onDelete }) => {
  return (
    <div className="bg-green-500 rounded-md shadow-sm text-white p-5 relative">
      <h3 className="font-medium text-2xl">{data.name}</h3>
      <div>
        <p className="uppercase text-xl">{data.main.temp} °C</p>
        <small>Ressenti : {data.main.feels_like} °C</small>
      </div>
      <button
        type="button"
        className="absolute top-0 right-0 -mt-2 -mr-2 text-black"
        onClick={() => onDelete(data.name)}
      >
        <img
          src={deleteIcon}
          alt="Icone supprimer"
          className="w-5 h-5 bg-white rounded-full"
        />
      </button>
    </div>
  );
};

FavouritesWeatherListItem.propTypes = {
  data: PropTypes.shape({
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
    }),
    name: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
};

export default FavouritesWeatherListItem;
