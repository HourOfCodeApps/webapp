import React from 'react';
import PropTypes from 'prop-types';
import withTheme from '@material-ui/core/styles/withTheme';
import { Range as VendorRange } from 'rc-slider';

import 'rc-slider/assets/index.css';

const Range = ({ theme, ...props }) => {
  const colors = {
    primary: theme.palette.primary.main,
    disabled: theme.palette.grey[400],
  };

  const style = {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  };

  return (
    <VendorRange
      {...props}
      activeDotStyle={style}
      handleStyle={[style, style]}
      trackStyle={[style]}
      railStyle={{ ...style, opacity: 0.24 }}
    />
  );
};

Range.propTypes = {
  theme: PropTypes.shape({ pallette: PropTypes.object.isRequired }).isRequired,
};

export default withTheme(Range);
