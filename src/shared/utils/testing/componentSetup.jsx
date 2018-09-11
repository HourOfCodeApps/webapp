import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies

const componentSetup = (Component, defaultProps = {}) => (
  (overrides = {}, renderMethod = shallow) => (
    renderMethod(<Component {...defaultProps} {...overrides} />)
  )
);

export default componentSetup;
