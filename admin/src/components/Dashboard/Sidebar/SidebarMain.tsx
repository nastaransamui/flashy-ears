import React, { createRef, useState, FC } from 'react'
import mainSidebarStyle from './main-sidebar-style'
import Drawer from '@mui/material/Drawer'
import Hidden from '@mui/material/Hidden'
import PropTypes from 'prop-types'

import { ProDashboardProps, RoutesType } from '@/interfaces/react.interface'
import BrandLogo from './BrandLogo'
import SidebarUser from './SidebarUser'
import SidebarLinks from './SidebarLinks'
import { DrawerStateType } from '@/interfaces/react.interface'
import NavbarLinks from '../Navbar/NavbarLinks'

import { useRouter } from 'next/router'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { State } from '@/src/redux/store'

const SidebarMain: FC<ProDashboardProps> = (props: ProDashboardProps) => {
  const { classes, cx } = mainSidebarStyle({})
  const { rtlActive,
    sidebarOpen,
    handleDrawerToggle,
    sideBarbgColor,
    routes, } = props;
  const router = useRouter()
  const location = useLocation()
  const { propsMiniActive } = useSelector<State, State>(state => state)
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,

  const getCollapseInitialState = (routes: RoutesType[]) => {
    for (let i = 0; i < routes?.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views as RoutesType[])) {
        return true;
      } else if (typeof routes[i].path !== 'undefined' && routes[i].path.endsWith(location.pathname)) {
        return true;
      }
    }
    return false;
  };
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes

  const getCollapseStates = (routes: RoutesType[]) => {
    let initialState = {};
    routes.map((prop) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop?.views as RoutesType[]),
          ...getCollapseStates(prop?.views as RoutesType[]),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };

  const mainPanel = createRef();
  const [state, setState] = useState<DrawerStateType>({
    stateMiniActive: true,
    openAvatar: false,
    ...getCollapseStates(routes as RoutesType[])
  });


  const sidebarWrapper =
    classes.sidebarWrapper +
    ' ' +
    cx({
      [classes.drawerPaperMini]: !propsMiniActive && state.stateMiniActive,
      [classes.sidebarWrapperWithPerfectScrollbar]: false,
    });


  const openCollapse = (collapse: string) => {
    var st: { [key: string]: boolean; } = {};
    st[collapse] = !state[collapse as keyof typeof state];
    setState((oldState) => ({ ...oldState, ...st }));
  };

  return (
    <div ref={mainPanel as React.RefObject<HTMLDivElement>}>
      <Hidden mdUp implementation='css'>
        {/* Mobile Drawer */}
        <Drawer
          variant='temporary'
          anchor='left'
          open={sidebarOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper + ' ' + classes[sideBarbgColor + 'Background' as keyof typeof classes],
          }}
          ModalProps={{ keepMounted: true }}>
          <BrandLogo {...props} stateMiniActive={state.stateMiniActive} />
          <span className={sidebarWrapper + ' ' + classes[sideBarbgColor + 'Scroll' as keyof typeof classes]}>
            <SidebarUser openCollapse={openCollapse} {...props} stateMiniActive={state.stateMiniActive} openAvatar={state.openAvatar!} />
            <NavbarLinks {...props} />
            <SidebarLinks
              getCollapseInitialState={getCollapseInitialState}
              routes={routes as RoutesType[]}
              {...props}
              state={state as DrawerStateType}
              setState={setState}
            />
          </span>
          <div
            className={classes.background}
            style={{
              backgroundImage: `url(/admin/images/sidebar/sidebar-${sideBarbgColor == 'black' ? '1' : '4'}.jpg)`,
            }}
          />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='css'>
        <Drawer
          data-testid="drawer"
          onMouseOver={() => { setState((oldState) => ({ ...oldState, stateMiniActive: false })) }}
          onMouseOut={() => { setState((oldState) => ({ ...oldState, stateMiniActive: true })) }}
          anchor={rtlActive ? 'right' : 'left'}
          variant="permanent"
          open
          classes={{
            paper:
              classes.drawerPaper + " " +
              cx({ [classes.drawerPaperMini]: !propsMiniActive && state.stateMiniActive }) + ' ' +
              classes[sideBarbgColor + 'Background' as keyof typeof classes],
          }}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}>
          <BrandLogo {...props} stateMiniActive={state.stateMiniActive} />
          <span className={sidebarWrapper + ' ' + classes[sideBarbgColor + 'Scroll' as keyof typeof classes]}>
            <SidebarUser openCollapse={openCollapse} {...props} stateMiniActive={state.stateMiniActive} openAvatar={state.openAvatar!} />
            <SidebarLinks
              getCollapseInitialState={getCollapseInitialState}
              routes={routes as RoutesType[]}
              {...props}
              state={state as DrawerStateType}
              setState={setState} />
          </span>
          <div
            className={classes.background}
            style={{
              backgroundImage: `url(/admin/images/sidebar/sidebar-${sideBarbgColor == 'black' ? '1' : '4'}.jpg)`,
            }}
          />
        </Drawer>
      </Hidden>
    </div>

  )
}

SidebarMain.propTypes = {
  rtlActive: PropTypes.bool.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  sideBarbgColor: PropTypes.string.isRequired,
  handleSideBarBgToggle: PropTypes.func.isRequired,
  routes: PropTypes.array.isRequired,
}

export default SidebarMain;