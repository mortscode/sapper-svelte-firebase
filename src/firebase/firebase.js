import firebase from 'firebase/app';
import auth from './auth.js';

export const loginWithEmail = async (email, password) => {
    console.log('logging in under ', email, password);

    let promise = auth.signInWithEmailAndPassword(email, password);

    promise
        .then(data => console.log('finished logging in:', data))
        .catch(e => console.error(e));

    return promise;
};

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const loginWithPopup = async () => {
    let promise = auth.signInWithPopup(googleProvider);

    promise
        .then(data => console.log('finished logging in:', data))
        .catch(e => console.error(e));

    return promise;
};

export const logout = () => {
    console.log('logging out');
    return auth.signOut();
};
