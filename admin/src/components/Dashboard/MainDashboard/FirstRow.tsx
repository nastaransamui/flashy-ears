import { FC, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';


import Icon from '@mui/material/Icon';
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

import Loading from '@/shared/Loading';
import { useSelector } from 'react-redux';
import { State } from '@/src/redux/store';

var _ = require('lodash');

const FirstRow: FC = (() => {

  const theme = useTheme();
  const { firstRow } = useSelector<State, State>((state) => state);



  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={6} lg={12} >
        {_.isEmpty(firstRow) ?
          <Loading color={theme.palette.secondary.main} /> :
          <div>{JSON.stringify(firstRow)}</div>
        }
      </Grid>
    </Grid>
  )
});

export default FirstRow;