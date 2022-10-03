import linkSidebarStyle from "./link-sidebar-style";

import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FC, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { RoutesType, } from '@/interfaces/react.interface'
import i18next from "i18next";
import { DrawerStateType, SideBarLinksTypes } from '@/interfaces/react.interface';


const SidebarLinks: FC<SideBarLinksTypes> = (props: SideBarLinksTypes) => {
  const { classes, theme, cx } = linkSidebarStyle({})
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { getCollapseInitialState, routes, sideBarbgColor, rtlActive, propsMiniActive, stateMiniActive, state, setState, handleDrawerToggle } = props;

  // useEffect(() => {
  //   let isMount = true;
  //   if (isMount) {
  //     let nst = {};
  //     routes.map((route, index) => {
  //       if (!route?.collapse) {
  //         console.log(route.path)
  //         if (location.pathname == route.path) {
  //           // console.log(location)
  //         }
  //       }
  //     })
  //   }
  //   return () => {
  //     isMount = false;
  //   }
  // }, [])

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
          <ListItem
            key={index}
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
        );
      }

      const innerNavLinkClasses =
        classes.collapseItemLink
        +
        ' ' +
        cx({
          [' ' + classes[sideBarbgColor as keyof typeof classes]]: location.pathname == route.path,
        });

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
            rtlActive && propsMiniActive && stateMiniActive,
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
        <ListItem
          key={index}
          className={cx(
            { [classes.item]: route.icon !== undefined },
            { [classes.collapseItem]: route.icon === undefined }
          ) + " " + classes[sideBarbgColor + 'Background' as keyof typeof classes]}>
          <Link
            to={route.path}
            onClick={(e) => {
              isMobile && handleDrawerToggle();
              console.log(route.path)
              // router.asPath = route.layout + route.path;
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
                disableTypography={true}
                style={{ textAlign: rtlActive ? 'right' : 'left' }}
                className={cx(
                  { [itemText]: route.icon !== undefined },
                  { [collapseItemText]: route.icon === undefined }
                )}
              />
            </span>
          </Link>
        </ListItem>
      );
    })
  }

  return <List className={
    classes.list + ' ' + classes[sideBarbgColor + 'Background' as keyof typeof classes]
  }>{createLinks(routes)}</List>
}

export default SidebarLinks;