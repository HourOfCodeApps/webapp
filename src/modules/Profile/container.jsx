import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Typography from 'shared/components/Typography';
import { toast } from 'react-toastify';

import {
  selectMe,
  selectMeFetching,
  selectMeFetchingError,
  selectMeUpdating,
  selectMeUpdatingError,
} from './selectors';

import {
  fetchMe,
  updateMe,
} from './actions';

import ProfileForm from './components/ProfileForm';

class Profile extends React.Component {
  componentDidMount() {
    this.props.onFetchMe();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.meUpdating && !this.props.meUpdating) {
      if (this.props.meUpdatingError) {
        toast.error(this.props.meUpdatingError.message);
      } else {
        toast.success('Дані успішно оновлено');
      }
    }
  }

  handleSubmit = (formData) => {
    this.props.onUpdateMe(formData);
  };

  render() {
    const {
      handleSubmit,
      props: {
        me,
        meFetching,
        meFetchingError,
        meUpdating,
        meUpdatingError,
      },
    } = this;

    return (
      <div>
        <Typography
          variant="display1"
          gutterBottom
        >
          Мої дані
        </Typography>
        {meFetching && (
          <Typography variant="caption" gutterBottom>Завантаження</Typography>
        )}

        {meUpdating && (
          <Typography variant="caption" gutterBottom>Оновлення</Typography>
        )}

        {meFetchingError && (
          <Typography variant="caption" gutterBottom style={{ color: 'red' }}>{meFetchingError.message}</Typography>
        )}

        {meUpdatingError && (
          <Typography variant="caption" gutterBottom style={{ color: 'red' }}>{meUpdatingError.message}</Typography>
        )}

        {!meFetching && !meFetchingError && me && (
          <div style={{ maxWidth: 600 }}>
            <ProfileForm
              initialValues={me}
              disabled={meUpdating}
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  onFetchMe: PropTypes.func.isRequired,
  onUpdateMe: PropTypes.func.isRequired,
  me: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
  meFetching: PropTypes.bool.isRequired,
  meFetchingError: PropTypes.instanceOf(Object),
  meUpdating: PropTypes.bool.isRequired,
  meUpdatingError: PropTypes.instanceOf(Object),
};

Profile.defaultProps = {
  me: null,
  meFetchingError: null,
  meUpdatingError: null,
};

const mapStateToProps = createSelector(
  selectMe(),
  selectMeFetching(),
  selectMeFetchingError(),
  selectMeUpdating(),
  selectMeUpdatingError(),
  (
    me, meFetching, meFetchingError, meUpdating, meUpdatingError,
  ) => ({
    me, meFetching, meFetchingError, meUpdating, meUpdatingError,
  }),
);

const mapDispatchToProps = {
  onFetchMe: fetchMe,
  onUpdateMe: updateMe,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
