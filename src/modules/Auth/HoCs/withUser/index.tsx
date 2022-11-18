import { ComponentType } from 'react';
import useAuth from '../../useAuth';

/**
 * @deprecated use `useAuth` hook instead
 */
const withUser = (WrappedComponent: ComponentType) => (props: any) => {
  const { user } = useAuth();

  return <WrappedComponent {...props} user={user} />;
};

export default withUser;
