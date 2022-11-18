import { useQuery } from '@tanstack/react-query';

import { fetchConfig } from './api';

const useFetchConfig = () => {
  const { data: config, isFetched, error } = useQuery({
    queryKey: ['config'],
    queryFn: fetchConfig,
    refetchOnMount: false,
    refetchInterval: false,
  });

  return {
    config,
    isFetched,
    error,
  };
};

export default useFetchConfig;
