import React from 'react';
import PropTypes from 'prop-types';
import Map from 'google-map-react';

const SearchResultMap = ({ lat, lng }) => {
  return (
    <div className="h-72 w-full md:h-full">
      <Map
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={{ lat, lng }}
        defaultZoom={10}
      />
    </div>
  );
};

SearchResultMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default SearchResultMap;
