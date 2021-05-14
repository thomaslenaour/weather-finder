import React from 'react';
import PropTypes from 'prop-types';

import FavouritesWeatherListItem from './FavouritesWeatherListItem';

const FavouritesWeatherList = ({ data, onDeleteFavourite }) => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-3 my-5 pr-3 gap-6">
      {data.map((weatherLocation) => (
        <FavouritesWeatherListItem
          key={weatherLocation.id}
          data={weatherLocation}
          onDelete={onDeleteFavourite}
        />
      ))}
    </div>
  );
};

FavouritesWeatherList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteFavourite: PropTypes.func.isRequired,
};

export default FavouritesWeatherList;
