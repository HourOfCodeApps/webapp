import { createSelector } from 'reselect';

const selectConfigDomain = () => state => state.config;

const selectConfig = () => createSelector(
  selectConfigDomain(),
  substate => substate.config,
);

const selectConfigFetching = () => createSelector(
  selectConfigDomain(),
  substate => substate.isConfigFetching,
);

const selectConfigLoaded = () => createSelector(
  selectConfigDomain(),
  substate => substate.isConfigLoaded,
);

const selectConfigFetchingError = () => createSelector(
  selectConfigDomain(),
  substate => substate.configFetchingError,
);

export {
  selectConfig,
  selectConfigFetching,
  selectConfigFetchingError,
  selectConfigLoaded,
  selectConfigDomain,
};
