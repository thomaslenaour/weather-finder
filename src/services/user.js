import { db, FieldValue } from '../firebase';

// check if email is already taken
export const doesEmailExists = async (email) => {
  const result = await db
    .collection('users')
    .where('email', '==', email.toLowerCase())
    .get();

  return result.docs.length > 0;
};

// create a user in `users` collection in firestore
export const createUser = async (userId, fullName, email) => {
  return db.collection('users').doc(userId).set({
    userId,
    fullName,
    email: email.toLowerCase(),
    weatherLocations: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
};

// get an array with all user weather favourites locations
export const getUserLocations = async (userId) => {
  const user = await db.collection('users').doc(userId).get();

  return user.data()?.weatherLocations || [];
};

// add a new location in the user's weather locations array
export const addWeatherLocation = (userId, location) => {
  return db
    .collection('users')
    .doc(userId)
    .update({
      weatherLocations: FieldValue.arrayUnion(location),
    });
};

// remove a location in the user's weather locations array
export const removeWeatherLocation = (userId, location) => {
  return db
    .collection('users')
    .doc(userId)
    .update({
      weatherLocations: FieldValue.arrayRemove(location),
    });
};
