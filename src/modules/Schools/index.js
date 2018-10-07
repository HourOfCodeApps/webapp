import container from './container';
import School from './containers/School';
import SchoolEdit from './containers/SchoolEdit';

import withSchools from './HoCs/withSchools';

import sagas from './sagas';
import reducer from './reducer';

export default container;
export {
  reducer,
  sagas,
  withSchools,
  School,
  SchoolEdit,
};
