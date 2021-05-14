const API_URL = `https://api.openweathermap.org/data/2.5/weather?&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric&lang=fr&q=`;

// get the weather for this location
export const getWeatherLocation = async (location) => {
  const response = await fetch(`${API_URL}${encodeURI(location)}`);
  const responseData = await response.json();

  if (!response.ok) throw new Error(responseData.message);

  return responseData;
};

// get the weather informations for each location in the `locations` array
export const getWeatherLocations = (locations) => {
  return Promise.all(
    locations.map(async (location) => {
      const weatherData = await getWeatherLocation(location);
      return weatherData;
    })
  );
};
