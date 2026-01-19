import { collection, addDoc, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../components/firebase';

// Example: Add a new user document (already in Signup, but here for reuse)
export const addUser = async (userId, userData) => {
  try {
    await updateDoc(doc(db, 'users', userId), userData);
    console.log('User data updated');
  } catch (e) {
    console.error('Error updating user: ', e);
  }
};

// Example: Get user data
export const getUser = async (userId) => {
  try {
    const docSnap = await getDoc(doc(db, 'users', userId));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (e) {
    console.error('Error getting user: ', e);
  }
};

export const updateUser = async (userId, updates) => {
  try {
    await updateDoc(doc(db, 'users', userId), updates);
    console.log('User updated');
  } catch (e) {
    console.error('Error updating user: ', e);
  }
};