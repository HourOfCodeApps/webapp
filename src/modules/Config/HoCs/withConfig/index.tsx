import useConfig from 'modules/Config/useConfig';
import { ComponentType } from 'react';

/**
 * @deprecated use `useConfig` hook instead
 */
const withConfig = (WrappedComponent: ComponentType) => (props: any) => {
  const config = useConfig();

  return <WrappedComponent {...props} config={config} />;
};

export default withConfig;
