
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper'
import Grow from '@mui/material/Grow'
import Hidden from '@mui/material/Hidden'
import Popper from '@mui/material/Popper'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Lang } from '@/interfaces/react.interface'
import { FC } from 'react';
import PropTypes from 'prop-types'

import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import CheckIcon from '@mui/icons-material/Check';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import langName from '@/public/text/langNames';
import Dashboard from '@mui/icons-material/Dashboard';
import { CustomPropsTypes } from '@/interfaces/react.interface';
import useNavbarLinks from './useNavbarLinks'
import navbarLinksStyle from './navbar-links-style';
import useCurrentRouteState from '@/hookes/useCurrentRouteState';

export interface NavbarLinksTypes extends CustomPropsTypes {
  rtlActive: boolean;
  handleDrawerToggle: () => void;
  sideBarbgColor: string;
}
type SidebarColor = 'white' | 'black'
const NavbarLinks: FC<NavbarLinksTypes> = (props: NavbarLinksTypes) => {
  const { navigate, openProfile,
    handleClickProfile, handleCloseProfile, profile, logOut, openSettings,
    handleClickSettings, handleCloseSetting, t, i18n, isMobile, handleChangeLang, handleChangeMode } = useNavbarLinks();
  const { rtlActive, handleDrawerToggle, sideBarbgColor } = props;
  const { classes, cx, theme } = navbarLinksStyle({ sideBarbgColor: sideBarbgColor as SidebarColor })

  const currentRouteState = useCurrentRouteState();
  const { modelName } = currentRouteState;
  const wrapper =
    classes.wrapper +
    ' ' +
    cx({
      [classes.wrapperRTL]: rtlActive,
    });

  const dropdownItem = cx(classes.dropdownItem, classes.primaryHover, {
    [classes.dropdownItemRTL]: rtlActive,
  });


  return (
    <div className={wrapper}>
      <div className={classes.managerClasses}>
        {!isMobile && (
          <IconButton
            onClick={() => {
              localStorage.removeItem(`${modelName}_Lookup`)
              navigate('/');
            }}
            className={classes.buttonLink}>
            <Dashboard
              className={
                classes.headerLinksSvg +
                ' ' +
                (rtlActive
                  ? classes.links
                  : classes.links)
              }
            />
          </IconButton>
        )}
      </div>
      <div className={classes.managerClasses}>
        <IconButton
          disableFocusRipple
          disableRipple
          aria-owns={openProfile ? 'profile-menu-list' : 'null'}
          aria-haspopup='true'
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            handleClickProfile(event as any)
          }}
          className={classes.buttonLink}
        >
          <PersonIcon
            className={
              classes.headerLinksSvg +
              ' ' + classes.links
            }
          />
          <Hidden smUp implementation='css'>
            <span onClick={(event: React.MouseEvent<HTMLElement>) => {
              handleClickProfile((event as any))
            }} className={classes.linkText + " " + classes[sideBarbgColor + 'Background' as keyof typeof classes]}>
              {t('MyProfile')}
            </span>
          </Hidden>
        </IconButton>
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          placement='bottom-end'
          className={cx({
            [classes.popperClose]: !openProfile,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true,
          })}>
          {({ TransitionProps }) => {
            return (
              <Grow
                {...TransitionProps}
                id='profile-menu-list'
                className={classes.langGrow}>
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={handleCloseProfile}>
                    <List
                      component='nav'
                      aria-label='profile-menu-list'>
                      <ListItem
                        style={{ display: 'flex', flexDirection: 'row' }}
                        role={undefined}
                        dense
                        className={dropdownItem + ' ' + classes.languagePack}
                        onClick={() => {
                          handleCloseProfile();
                          isMobile && handleDrawerToggle();
                          localStorage.removeItem(`${modelName}_Lookup`)
                          navigate(`/users-page/User?_id=${profile._id}`, {
                            state: profile,
                          })
                        }}>
                        <img
                          src={profile?.profileImage || '/admin/images/faces/avatar1.jpg'}
                          className={classes.avatarImg}
                          alt='...'
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <ListItemText primary={t('Profile')} />
                      </ListItem>
                      <ListItem
                        style={{ display: 'flex', flexDirection: 'row' }}
                        role={undefined}
                        dense
                        button
                        className={dropdownItem + ' ' + classes.languagePack}
                        onClick={() => {
                          isMobile && handleDrawerToggle();
                          localStorage.removeItem(`${modelName}_Lookup`)
                          logOut();
                        }}>
                        <LogoutIcon color='primary' />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <ListItemText primary={t('Log out')} />
                      </ListItem>
                    </List>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            );
          }}
        </Popper>
      </div>
      <div className={classes.managerClasses}>
        <IconButton
          disableFocusRipple
          disableRipple
          aria-owns={openSettings ? 'settings-menu-list' : "null"}
          aria-haspopup='true'
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            handleClickSettings((event as any))
          }}
          className={classes.buttonLink}
        >
          <LanguageIcon
            className={
              classes.headerLinksSvg +
              ' ' + classes.links
            }
          />
          <Hidden smUp implementation='css'>
            <span onClick={(event: React.MouseEvent<HTMLElement>) => {
              handleClickSettings((event as any))
            }} className={classes.linkText + " " + classes[sideBarbgColor + 'Background' as keyof typeof classes]}>
              {t('header')[`header_language` as keyof typeof t]}
            </span>
          </Hidden>
        </IconButton>
        <Popper
          open={Boolean(openSettings)}
          anchorEl={openSettings}
          transition
          disablePortal
          placement='bottom'
          className={cx({
            [classes.popperClose]: !openSettings,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true,
          })}>
          {({ TransitionProps }) => {
            return (
              <Grow
                {...TransitionProps}
                id='Language-menu'
                className={classes.langGrow}>
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={handleCloseSetting}>
                    <List
                      aria-label='Language-menu'>
                      {langName.map((item, i) => {
                        return (
                          <ListItem
                            secondaryAction={
                              i18n.language === item.LangCode && (
                                <IconButton
                                  edge='end'
                                  aria-label='comments'>
                                  <CheckIcon color='primary' />
                                </IconButton>
                              )
                            }
                            key={i.toString()}
                            role={undefined}
                            dense
                            button
                            className={
                              dropdownItem + ' ' + classes.languagePack
                            }
                            onClick={(e) => handleChangeLang(e, item as Lang)} >
                            <img
                              src={`/admin/images/langs/${item.Flag}`}
                              alt={item.Lang}
                              style={{ width: 20, height: 20 }}
                            />{' '}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <ListItemText
                              primary={item[`title_${i18n.language}` as keyof typeof item]}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            );
          }}
        </Popper>
      </div>
      <IconButton
        disableFocusRipple
        disableRipple
        className={classes.buttonLink}
        // classes={{ label: rtlActive ? classes.labelRTL : '' }}
        onClick={handleChangeMode}>
        {theme.palette.mode == 'light' ? (
          <DarkModeIcon
            className={
              classes.headerLinksSvg + ' ' + classes.links
            }
          />
        ) : (
          <LightModeIcon
            className={
              classes.headerLinksSvg + ' ' + classes.links
            }
          />
        )}
        <Hidden smUp implementation='css'>
          <span className={classes.linkText + " " + classes[sideBarbgColor + 'Background' as keyof typeof classes]}>
            {theme.palette.mode == 'light'
              ? t('header')[`header_dark` as keyof typeof t]
              : t('header')[`header_light` as keyof typeof t]}
          </span>
        </Hidden>
      </IconButton>
    </div>
  )
}

NavbarLinks.propTypes = {
  rtlActive: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  sideBarbgColor: PropTypes.string.isRequired,
}

export default NavbarLinks