import { useContext } from 'react';

import { ConfigContext, Config } from './types';

const useConfig = (): Config => useContext(ConfigContext);

export default useConfig;
