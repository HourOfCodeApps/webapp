import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Loading from 'shared/components/Loading';

import { fetchConfig } from '../../actions';

import {
  selectConfig,
  selectConfigFetching,
  selectConfigLoaded,
} from '../../selectors';

const withConfig = WrappedComponent => class withConfigHoC extends React.Component {
  componentDidMount() {
    const { isConfigFetching, isConfigLoaded, onFetchConfig } = this.props;
    if (!isConfigLoaded && !isConfigFetching) {
      onFetchConfig();
    }
  }

  render() {
    const {
      isConfigFetching, isConfigLoaded, onFetchConfig, config, ...props
    } = this.props;
    if (!isConfigLoaded || isConfigFetching) {
      return <Loading />;
    }

    return <WrappedComponent {...props} config={config} />;
  }
};

const mapDispatchToProps = {
  onFetchConfig: fetchConfig,
};

const mapStateToProps = createSelector(
  selectConfig(),
  selectConfigLoaded(),
  selectConfigFetching(),
  (config, isConfigLoaded, isConfigFetching) => ({ config, isConfigLoaded, isConfigFetching }),
);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withConfig,
);

export { withConfig as withConfigHoC };
