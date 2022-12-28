import { FC, createRef } from "react";
import { ProDashboardProps } from "@/interfaces/react.interface";
import navbarMainStyle from "./navbar-main-style";
import AppBar from '@mui/material/AppBar'
import PropTypes from 'prop-types'
import MoreVert from '@mui/icons-material/MoreVert'
import ViewList from '@mui/icons-material/ViewList'
import Menu from '@mui/icons-material/Menu'
import Hidden from '@mui/material/Hidden'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import brand from '@/public/text/brand'
import { useLocation } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";

import { useTranslation } from "react-i18next";
import { RoutesType, } from '@/interfaces/react.interface'
import { Typography } from "@mui/material";
import { ActiveRouteType } from '@/interfaces/react.interface'
import { useSelector } from "react-redux";
import { State } from "@/src/redux/store";
import { useQuery } from "@/src/components/Dashboard/ReactRouter";

const NavbarMain: FC<ProDashboardProps> = (props: ProDashboardProps) => {
  const { routes, handleDrawerToggle, sidebarMinimizeFunc } =
    props;
  const location = useLocation();
  const { propsMiniActive, profile } = useSelector<State, State>(state => state)
  const { t, i18n } = useTranslation()
  const { classes, cx } = navbarMainStyle({});
  const mainPanel = createRef();

  let query = useQuery();
  const _id = query.get('_id');
  const mainPanelClasses =
    classes.mainPanel +
    ' ' +
    cx({
      [classes.mainPanelSidebarMini]: propsMiniActive,
    });

  const sidebarMinimize =
    classes.sidebarMinimize +
    ' ' +
    cx({
      [classes.sidebarHandlemainOpen]: propsMiniActive,
      [classes.sidebarHandlemainClose]: !propsMiniActive,
    });

  /**
   * 
   * @param routes 
   * @returns 
   * Recursive map throw routes and find the name of active route
   */

  const getActiveRoute = (routes: RoutesType[]) => {
    let activeRoute = brand[`name_${i18n.language}` as keyof typeof brand]
    let allAccess: ActiveRouteType[] = [];
    routes.map(function iter(a) {
      let objectRoute = {
        name_en: a.name_en,
        name_fa: a.name_fa,
        path: a.path,
        editUrl: a?.editUrl
      }
      allAccess.push(objectRoute);
      Array.isArray(a.views) && a.views.map(iter as any);
    });
    for (let index = 0; index < allAccess.length; index++) {
      const element = allAccess[index];
      if (element.path == location.pathname) {
        activeRoute = element[`name_${i18n.language}` as keyof typeof element]
        if (location?.search !== '') {
          activeRoute = _id == profile?._id ? profile.userName as string : element[`name_${i18n.language}` as keyof typeof element] + t('editSidebar') as string
        }
      } else {
        if (location?.search !== '') {
          if (element.editUrl == location.pathname) {
            activeRoute = element[`name_${i18n.language}` as keyof typeof element] + t('editSidebar') as string
          }
        }
      }
    }
    return activeRoute;
  }

  return (
    <div className={mainPanelClasses} ref={mainPanel as React.RefObject<HTMLDivElement>}>
      <AppBar className={classes.appBar} color="default">
        <Toolbar>
          <Hidden smDown implementation='css'>
            <div className={sidebarMinimize}>
              <div className={sidebarMinimize}>
                {propsMiniActive ? (
                  <IconButton onClick={sidebarMinimizeFunc} className={classes.justIcon} disableFocusRipple disableRipple>
                    <ViewList className={classes.sidebarMiniIcon} />
                  </IconButton>
                ) : (
                  <IconButton onClick={sidebarMinimizeFunc} className={classes.justIcon} disableFocusRipple disableRipple>
                    <MoreVert className={classes.sidebarMiniIcon} />
                  </IconButton>
                )}
              </div>
            </div>
          </Hidden>
          <div className={classes.flex}>
            <Typography className={classes.title} sx={{ padding: 2 }}>
              {getActiveRoute(routes as RoutesType[])}
            </Typography>
          </div>
          <Hidden smDown implementation='css'>
            <NavbarLinks {...props} />
          </Hidden>
          <Hidden smUp implementation='css'>
            <IconButton onClick={handleDrawerToggle}>
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  )
}

NavbarMain.propTypes = {
  routes: PropTypes.array.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  sidebarMinimizeFunc: PropTypes.func.isRequired
}

export default NavbarMain;