import PropTypes from 'prop-types'
import { FC, Fragment, } from 'react';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles';
import dataShowStyle from '../data-show-style';

import { useTranslation } from 'react-i18next';

import ViewType from './ViewType';
import SearchHeader from './SearchHeader';
import IconsHeader from './IconsHeader';

export const StyledBox = styled(Container)(({ theme }) => ({
  border: '3px solid ',
  marginTop: 10,
  borderColor: theme.palette.secondary.main,
  borderRadius: 5,
  marginBottom: 10,
  minWidth: '100%',
  minHeight: '10vh',
  [theme.breakpoints.only('lg')]: {
    minHeight: 80,
  },
  [theme.breakpoints.only('md')]: {
    minHeight: 80,
  },
  display: 'flex',
}));

export interface MainHeaderTypes {

}


const MainHeader: FC<MainHeaderTypes> = ((props: MainHeaderTypes) => {
  const { t } = useTranslation()
  const { classes } = dataShowStyle({})

  return (
    <Fragment>
      <StyledBox
        disableGutters
        maxWidth='xl'
        className='animate__animated animate__zoomIn'>
        <Grid container >
          <Grid item xl={2} lg={3} md={3} sm={12} xs={12} className={classes.viewTypeGrid}>
            <ViewType />
          </Grid>
          <Grid item xl={8} lg={6} md={6} sm={12} xs={12} className={classes.searchGrid}>
            <SearchHeader />
          </Grid>
          <Grid item xl={2} lg={3} md={3} sm={12} xs={12} className={classes.iconGrid}>
            <IconsHeader />
          </Grid>
        </Grid>
      </StyledBox>
    </Fragment>
  )
})

MainHeader.propTypes = {

}

export default MainHeader;