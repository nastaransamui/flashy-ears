import { Fragment, FC } from "react";


import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PaletteIcon from '@mui/icons-material/Palette'

import dynamic from 'next/dynamic';

const SwipeableDrawer: any = dynamic(() => import('@mui/material/SwipeableDrawer'), { ssr: false });
import AppBar from '@mui/material/AppBar';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import themeList from '@/theme/palette'


import { useTranslation } from "react-i18next";

import useThemeUser from './useThemeUser'
import { DrawerStateType } from "@/shared/interfaces/react.interface";

import Switch from '@mui/material/Switch';
import palette from "@/theme/palette";
import Loading from "@/shared/Loading";
import { useTheme } from '@mui/material';
export interface ThemeUserTypes {
  rtlActive: boolean;
  state: DrawerStateType
}

export interface TabPanelTypes {
  children: JSX.Element;
  value: number;
  index: number;
}

const TabPanel: FC<TabPanelTypes> = (props: TabPanelTypes) => {
  const { children, value, index, ...other } = props;

  return (
    <div role='tabpanel' hidden={value !== index} {...other}>
      <Box p={3}>{children}</Box>
    </div>
  );
}

const ThemeUser: FC<ThemeUserTypes> = (props: ThemeUserTypes) => {
  const { t } = useTranslation('common');

  const theme = useTheme();
  const { rtlActive, state } = props
  const {
    classes,
    cx,
    isDesktop,
    openDrawer,
    tab,
    handleToggleOpenTheme,
    handleClose,
    handleToggleOpen,
    handleChangeTab,
    adminThemeName,
    homeThemeName,
    changeAdminTheme,
    changeHomePageTheme,
    homePageType,
    changeHomePageType,
    pageTypeLoading
  } = useThemeUser(state)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Fragment>
      <SwipeableDrawer
        anchor={rtlActive ? 'left' : 'right'}
        open={openDrawer}
        onClose={handleClose}
        onOpen={handleToggleOpen}
        SlideProps={{
          direction: rtlActive ? 'right' : 'left'
        }}
        classes={{
          paper: classes.draweBg,
        }}>
        <div className={classes.optWrap}>
          <AppBar
            position='fixed'
            color='default'
            classes={{ root: classes.appbar }}>
            {isSmallScreen && (
              <IconButton onClick={handleClose} className={classes.mobileBack}>
                {rtlActive ? <ArrowBackIcon /> : <ArrowForwardIcon />}
              </IconButton>
            )}
            <Tabs
              value={tab}
              className={classes.tab}
              onChange={handleChangeTab}
              textColor='inherit'
              indicatorColor='secondary'
              centered>
              <Tab
                iconPosition="end"
                label={t('adminTheme')}
                icon={isDesktop ? <PaletteIcon color="primary" /> : ''}
                classes={{ root: classes.wrapper }}
              />
              <Tab
                iconPosition="end"
                icon={isDesktop ? <PaletteIcon sx={{ color: palette[homeThemeName!]['palette']['primary']['main'] }} /> : ''}
                label={t('homeTheme')}
                classes={{ root: classes.wrapper }}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={tab} index={0}>
            <div className={classes.themeColor}>
              <Paper className={classes.paper}>
                <Typography variant='h6'>{t('combination')}</Typography>
                <Grid container className={classes.swatchWrapper}>
                  {Object.keys(themeList).map((pallet, index) => {
                    const primaryDynamicClass = {
                      background: themeList[pallet].palette.primary.main,
                      boxShadow: `0 0 0 6px ${themeList[pallet].palette.primary.light}, 0 0 0 12px ${themeList[pallet].palette.primary.dark}, rgba(0, 0, 0, 0.45) 0px 0px 6px 12px`,
                    }
                    const secondaryDynamicClass = {
                      background: themeList[pallet].palette.secondary.main,
                      boxShadow: `0 0 0 4px ${themeList[pallet].palette.secondary.light}, 0 0 0 8px ${themeList[pallet].palette.secondary.dark}, rgba(0, 0, 0, 0.30) 0px 0px 5px 9px`,
                    }
                    return (
                      <Grid key={index.toString()} item sm={3} xs={4}>
                        <Tooltip title={t(`${pallet}`)} placement='top' arrow>
                          <Button
                            className={classes.swatch + ' ' + cx({
                              [classes.active]: adminThemeName === pallet
                            })}
                            onClick={() => changeAdminTheme(pallet)}>
                            <span className={classes.primary} style={primaryDynamicClass}>
                              &nbsp;
                            </span>
                            <span className={classes.secondary} style={secondaryDynamicClass}>
                              &nbsp;
                            </span>
                          </Button>
                        </Tooltip>
                      </Grid>
                    );
                  })}
                </Grid>
              </Paper>
            </div>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <div className={classes.themeColor}>
              <Paper className={classes.paper}>
                <Typography variant='h6'>{t('combination')} for Home</Typography>
                <Grid container className={classes.swatchWrapper}>
                  {Object.keys(themeList).map((clr, index) => {
                    return (
                      <Grid key={index.toString()} item sm={3} xs={4}>
                        <Tooltip title={t(`${clr}`)} placement='top' arrow>
                          <Button
                            className={classes.swatch + ' ' + cx({
                              [classes.active]: homeThemeName === clr
                            })}
                            onClick={() => changeHomePageTheme(clr)}>
                            <span
                              className={classes.primary}
                              style={{
                                background: themeList[clr].palette.primary.main,
                                boxShadow: `0 0 0 6px ${themeList[clr].palette.primary.light}, 0 0 0 12px ${themeList[clr].palette.primary.dark}, rgba(0, 0, 0, 0.45) 0px 0px 6px 12px`,
                              }}>
                              &nbsp;
                            </span>
                            <span
                              className={classes.secondary}
                              style={{
                                background:
                                  themeList[clr].palette.secondary.main,
                                boxShadow: `0 0 0 4px ${themeList[clr].palette.secondary.light}, 0 0 0 8px ${themeList[clr].palette.secondary.dark}, rgba(0, 0, 0, 0.30) 0px 0px 5px 9px`,
                              }}>
                              &nbsp;
                            </span>
                          </Button>
                        </Tooltip>
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid component="label" container alignItems="center" justifyContent='center' spacing={1}>{t('changeHomeLanding')}</Grid>
                <Grid component="label" container alignItems="center" spacing={1}>
                  {pageTypeLoading ? <Loading color={palette[homeThemeName!]['palette']['primary']['main']} />
                    :
                    <>
                      <Grid item>{t('landingPage')}</Grid>
                      <Grid item>
                        <Switch
                          checked={homePageType == 'imageScroll' ? true : false}
                          onChange={(e) => {
                            changeHomePageType(e.target.value)

                          }}
                          value={homePageType == 'imageScroll' ? 'landingPage' : 'imageScroll'}
                        />
                      </Grid>
                      <Grid item>{t('imageScroll')}</Grid>
                    </>}
                </Grid>
              </Paper>
            </div>
          </TabPanel>
        </div>
      </SwipeableDrawer >
      <div className={classes.btn + ' ' + cx({
        [classes.active]: openDrawer
      })}>
        <Tooltip arrow title={t('theme')} placement='top'>
          <IconButton onClick={handleToggleOpenTheme}>
            <PaletteIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Fragment >
  )
}

export default ThemeUser