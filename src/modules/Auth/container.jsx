import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import { Btn } from 'styled-components/AtomsStyled';
import { AuthContainer, AuthLoginBox } from 'styled-components/AuthStyled'

import {
  login,
} from './actions';

import { selectUser } from './selectors';

const Auth = ({ classes, onLogin }) => (
  <AuthContainer>
    <AuthLoginBox>
      <Btn onClick={onLogin}>Login with Google</Btn>
      <Btn disabled>Login with Facebook</Btn>
      <Btn disabled>Login with Phone</Btn>
    </AuthLoginBox>
  </AuthContainer>
);

Auth.propTypes = {
  classes: PropTypes.shape(PropTypes.object).isRequired,
  onLogin: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  selectUser(),
  user => ({ user }),
);

const mapDispatchToProps = {
  onLogin: login,
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
