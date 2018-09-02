import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children }) => (
  <button type="button">{children}</button>
);

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
};

export default Button;
