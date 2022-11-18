import { useContext } from 'react';

import { AuthContext, AuthContextType } from './types';

const useAuth = (): AuthContextType => useContext(AuthContext);

export default useAuth;
