import { FC, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';


import Icon from '@mui/material/Icon';
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

import Loading from '@/shared/Loading';

const FirstRow: FC = (() => {

  const theme = useTheme();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={6} lg={12} >
        {/* <Loading color={theme.palette.secondary.main} /> */}
      </Grid>
    </Grid>
  )
});

export default FirstRow;