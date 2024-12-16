import linkSidebarStyle from "./link-sidebar-style";

import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FC, Fragment, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { RoutesType, } from '@/interfaces/react.interface'
import i18next from "i18next";
import { DrawerStateType, SideBarLinksTypes } from '@/interfaces/react.interface';
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/src/redux/store";
import useCurrentRouteState from "@/hookes/useCurrentRouteState";
import { useTranslation } from "react-i18next";


const SidebarLinks: FC<SideBarLinksTypes> = (props: SideBarLinksTypes) => {
  const { classes, theme, cx } = linkSidebarStyle({})
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { t } = useTranslation('common')
  const {
    getCollapseInitialState,
    routes,
    sideBarbgColor,
    rtlActive,
    state,
    setState,
    handleDrawerToggle,
    openCollapse } = props;
  const { stateMiniActive } = state;
  const propsMiniActive = useSelector<State, boolean>((state) => state.propsMiniActive);
  const currentRouteState = useCurrentRouteState()
  const { modelName } = currentRouteState;
  const { path } = currentRouteState
  useEffect(() => {
    if (location.pathname !== path) {
      dispatch({ type: 'TOTAL_DATA', payload: [] });
      dispatch({ type: 'TOTAL_COUNT', payload: 0 });
      dispatch({ type: 'FIRST_SEARCH', payload: false })
      dispatch({ type: 'FIELD_VALUE', payload: '' })
      dispatch({ type: 'EXPANDED', payload: {} })
      // localStorage.removeItem(`${modelName}_Lookup`)
    }
    return () => { }
  }, [location])


  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      let routeName = `name_${i18next.languages[0]}` as keyof typeof route
      let routeMini = `mini_${i18next.languages[0]}` as keyof typeof route

      if (route.collapse) {
        var st: { [key: string]: boolean; } = {};
        const navLinkClasses =
          classes.itemLink +
          ' ' +
          cx({
            [' ' + classes.collapseActive]: getCollapseInitialState(
              route.views
            ),
          });
        const itemText =
          classes.itemText +
          ' ' +
          cx({
            [classes.itemTextMini]: !propsMiniActive && stateMiniActive,
            [classes.itemTextMiniRTL]:
              rtlActive && !propsMiniActive && stateMiniActive,
            [classes.itemTextRTL]: rtlActive,
          });

        const collapseItemText =
          classes.collapseItemText +
          ' ' +
          cx({
            [classes.collapseItemTextMini]: !propsMiniActive && stateMiniActive,
            [classes.collapseItemTextMiniRTL]:
              rtlActive && !propsMiniActive && stateMiniActive,
            [classes.collapseItemTextRTL]: rtlActive,
          });
        const itemIcon =
          classes.itemIcon +
          ' ' +
          cx({
            [classes.itemIconRTL]: rtlActive,
            [classes.itemIconMini]: !propsMiniActive && stateMiniActive
          });
        const caret =
          classes.caret +
          ' ' +
          cx({
            [classes.caretRTL]: rtlActive,
          });
        const collapseItemMini =
          classes.collapseItemMini +
          ' ' +
          cx({
            [classes.collapseItemMiniRTL]: rtlActive,
          });
        st[route['state']] = !state[route.state];
        return (
          <Fragment key={index}>
            {
              route.access && <ListItem
                className={cx(
                  { [classes.item]: route.icon !== undefined },
                  { [classes.collapseItem]: route.icon === undefined }
                ) + " " + classes[sideBarbgColor + 'Background' as keyof typeof classes]}>
                <a
                  href='#'
                  className={navLinkClasses}
                  onClick={(e) => {
                    e.preventDefault();
                    setState((oldState: DrawerStateType) => ({ ...oldState, ...st }));
                  }}>
                  {route.icon !== undefined ? (
                    typeof route.icon == 'string' && (
                      <SvgIcon className={itemIcon} >
                        <path d={`${route.icon}`} />
                      </SvgIcon>
                    )
                  ) : (
                    <span
                      className={collapseItemMini}
                      style={{
                        display:
                          (rtlActive && propsMiniActive) ||
                            (rtlActive && !stateMiniActive)
                            ? 'none'
                            : 'block',
                      }}>
                      {isMobile ? '\xa0' : route[routeMini] as string}
                    </span>
                  )}
                  <ListItemText
                    primary={route[routeName] as string}
                    secondary={
                      <b
                        style={{
                          marginRight: rtlActive ? 181 : 0,
                        }}
                        className={
                          caret +
                          ' ' +
                          (state[route.state] ? classes.caretActive : '')
                        }
                      />
                    }
                    disableTypography={true}
                    style={{
                      marginLeft: rtlActive ? 128 : 0,
                    }}
                    className={cx(
                      { [itemText]: route.icon !== undefined },
                      { [collapseItemText]: route.icon === undefined }
                    )}
                  />
                </a>
                <Collapse in={state[route.state]} unmountOnExit>
                  <List className={classes.list + ' ' + classes.collapseList}>
                    {createLinks(route.views as RoutesType[])}
                  </List>
                </Collapse>
              </ListItem>
            }
          </Fragment>
        );
      }

      const innerNavLinkClasses =
        classes.collapseItemLink
        +
        ' ' +
        cx({
          [' ' + classes[sideBarbgColor as keyof typeof classes]]: location.pathname == route.path,
          [' ' + classes.editLinkButton]: location.pathname == route?.editUrl
        });
      if (location.search !== '' && location.pathname == route?.editUrl) {

      }
      const collapseItemMini =
        classes.collapseItemMini +
        ' ' +
        cx({
          [classes.collapseItemMiniRTL]: rtlActive,
        });
      const navLinkClasses =
        classes.itemLink
        +
        ' ' +
        cx({
          [' ' + classes[sideBarbgColor as keyof typeof classes]]: location.pathname == route.path,
          [' ' + classes.editLinkButton]: location.pathname == route?.editUrl
        });
      const itemText =
        classes.itemText +
        ' ' +
        cx({
          [classes.itemTextMini]: !propsMiniActive && stateMiniActive,
          [classes.itemTextMiniRTL]:
            rtlActive && !propsMiniActive && stateMiniActive,
          [classes.itemTextRTL]: rtlActive,
        });
      const collapseItemText =
        classes.collapseItemText +
        ' ' +
        cx({
          [classes.collapseItemTextMini]: !propsMiniActive && stateMiniActive,
          [classes.collapseItemTextMiniRTL]:
            propsMiniActive && stateMiniActive,
          [classes.collapseItemTextRTL]: rtlActive,
        });
      const itemIcon =
        classes.itemIcon +
        ' ' +
        cx({
          [classes.itemIconRTL]: rtlActive,
          [classes.itemIconMini]: !propsMiniActive && stateMiniActive
        });

      return (
        <Fragment key={index}>
          {
            route.access &&
            <ListItem

              className={cx(
                { [classes.item]: route.icon !== undefined },
                { [classes.collapseItem]: route.icon === undefined }
              ) + " " + classes[sideBarbgColor + 'Background' as keyof typeof classes]}>
              <Link
                to={route.path}
                onClick={(e) => {
                  isMobile && handleDrawerToggle();
                  dispatch({ type: 'DELETE_IDS', payload: [] });
                  dispatch({ type: 'STATUS_IDS_UPDATE', payload: [] });
                  dispatch({ type: 'EXPANDED', payload: {} });
                  localStorage.removeItem(`${modelName}_Lookup`)
                  state?.openAvatar && openCollapse('openAvatar');
                }}>
                <span
                  className={cx(
                    { [navLinkClasses]: route.icon !== undefined },
                    { [innerNavLinkClasses]: route.icon === undefined }
                  )}>
                  {route.icon !== undefined ? (
                    typeof route.icon === 'string' && (
                      <SvgIcon className={itemIcon} >
                        <path d={`${route.icon}`} />
                      </SvgIcon>
                    )
                  ) : (
                    <span
                      className={collapseItemMini}
                      style={{
                        display:
                          (propsMiniActive) ||
                            (!stateMiniActive)
                            ? 'none'
                            : 'block',
                      }}>
                      {isMobile ? '\xa0' : route[routeMini] as string}
                    </span>
                  )}
                  <ListItemText
                    primary={
                      location.pathname == route?.editUrl && location?.search !== '' ?
                        route[routeName] + t('editSidebar') as string :
                        route[routeName] as string}
                    disableTypography={location.pathname == route?.editUrl && location?.search !== '' ? false : true}
                    primaryTypographyProps={{
                      variant: 'caption'
                    }}
                    style={{ textAlign: rtlActive ? 'right' : 'left' }}
                    className={cx(
                      { [itemText]: route.icon !== undefined },
                      { [collapseItemText]: route.icon === undefined }
                    )}
                  />
                </span>
              </Link>
            </ListItem>
          }
        </Fragment>
      );
    })
  }

  return <List className={
    classes.list + ' ' + classes[sideBarbgColor + 'Background' as keyof typeof classes]
  }>{createLinks(routes)}</List>
}

SidebarLinks.propTypes = {
  getCollapseInitialState: PropTypes.func.isRequired,
  routes: PropTypes.array.isRequired,
  sideBarbgColor: PropTypes.string.isRequired,
  rtlActive: PropTypes.bool.isRequired,
  state: PropTypes.shape({
    stateMiniActive: PropTypes.bool.isRequired,
    openAvatar: PropTypes.bool.isRequired,
  }).isRequired,
  setState: PropTypes.func.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired
}

export default SidebarLinks;