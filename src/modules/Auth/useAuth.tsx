import { useDispatch, useSelector } from 'react-redux';
import { selectStateInitLoaded, selectUser } from './selectors';

import { AuthContextType, User } from './types';
import { signOut as signOutAction } from './actions';

const useAuth = (): AuthContextType => {
  const user = useSelector(selectUser()) as User;
  const isInitialized = Boolean(useSelector(selectStateInitLoaded()));
  const dispatch = useDispatch();

  const signOut = () => dispatch(signOutAction());

  return {
    isInitialized,
    user,
    signOut,
  };
};

export default useAuth;
