import { useEffect, useState } from 'react';
import { AuthContextType, User } from './types';

import firebase from 'firebase/app';
import 'firebase/auth';
import loadUserInfo from './helpers/loadUserInfo';

const useInitAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const unlisten = firebase.auth().onIdTokenChanged(async (fbUser) => {
      if (!fbUser) {
        setUser(null);
      } else {
        const user = await loadUserInfo();
        setUser(user);
      }

      if (!isInitialized) {
        setIsInitialized(true);
      }
    });

    return () => {
      unlisten();
    };
  }, []);

  const signOut = () => {
    firebase.auth().signOut();
  };

  return {
    user,
    isInitialized,
    signOut,
  };
};

export default useInitAuth;
