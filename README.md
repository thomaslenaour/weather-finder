# Weather Finder App

## Getting Started

### Installation

First, you have to clone the repository then go to the folder and install all dependencies.

```sh
git clone https://github.com/thomaslenaour/weather-finder
cd weather-finder
yarn # or npm install
```

### Configuration

Before starting the project, you must configure **environment variables** in order to run the project.

You have a `.env.example` file at the root which is a sample file showing you the environment variables you need to configure

Copy the content of the `.env.example` file and create a `.env` file at the root in which you paste all the variables.

```
REACT_APP_FIREBASE_API_KEY=""
REACT_APP_FIREBASE_AUTH_DOMAIN=""
REACT_APP_FIREBASE_PROJECT_ID=""
REACT_APP_FIREBASE_STORAGE_BUCKET=""
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=""
REACT_APP_FIREBASE_APP_ID=""
REACT_APP_OPENWEATHERMAP_API_KEY=""
REACT_APP_GOOGLE_MAPS_API_KEY=""
```

To populate these environment variables, you need to create:

- a Firebase project with authentication (email / password) enabled and a Firestore database
- an API key on OpenWeatherMap
- an API key Maps JavaScript API on a Google Cloud project

See the **Resources** section.

### Run the project

To start the project, run this command at the root :

```sh
yarn start # or npm start
```

**🎉 Go to `locahost:3000` and enjoy !**

## Démonstration

You can go to this [website](https://weather-finder-db235.web.app) to see a production version of the app.

## Resources

- **Firebase** : https://firebase.google.com
- **Weather API** : https://openweathermap.org
- **Google Maps JavaScript API** : https://developers.google.com/maps/documentation/javascript/cloud-setup
