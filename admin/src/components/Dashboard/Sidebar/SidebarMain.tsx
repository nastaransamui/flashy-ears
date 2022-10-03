import React, { createRef, useState, FC } from 'react'
import mainSidebarStyle from './main-sidebar-style'
import Drawer from '@mui/material/Drawer'
import Hidden from '@mui/material/Hidden'

import { ProDashboardProps, RoutesType } from '@/interfaces/react.interface'
import BrandLogo from './BrandLogo'
import SidebarUser from './SidebarUser'
import SidebarLinks from './SidebarLinks'
import { DrawerStateType } from '@/interfaces/react.interface'

import { useRouter } from 'next/router'
import { useLocation } from 'react-router-dom'
const SidebarMain: FC<ProDashboardProps> = (props: ProDashboardProps) => {
  const { classes, cx } = mainSidebarStyle({})
  const { rtlActive, sidebarOpen, handleDrawerToggle, sideBarbgColor, propsMiniActive, handleSideBarBgToggle, routes, } = props;
  const router = useRouter()
  const location = useLocation()
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // console.log(location)
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

  // console.log(state)

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
          anchor='right'
          open={sidebarOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper + ' ' + classes[sideBarbgColor + 'Background' as keyof typeof classes],
          }}
          ModalProps={{ keepMounted: true }}>
          BranLogi
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='css'>
        <Drawer
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
          <BrandLogo
            rtlActive={rtlActive}
            stateMiniActive={state.stateMiniActive}
            propsMiniActive={propsMiniActive}
            sideBarbgColor={sideBarbgColor}
            handleSideBarBgToggle={handleSideBarBgToggle} />
          <span className={sidebarWrapper + ' ' + classes[sideBarbgColor + 'Scroll' as keyof typeof classes]}>
            <SidebarUser
              sideBarbgColor={sideBarbgColor}
              rtlActive={rtlActive}
              openCollapse={openCollapse}
              propsMiniActive={propsMiniActive}
              stateMiniActive={state.stateMiniActive}
              openAvatar={state.openAvatar}
              handleDrawerToggle={handleDrawerToggle} />
            <SidebarLinks
              getCollapseInitialState={getCollapseInitialState}
              routes={routes as RoutesType[]}
              sideBarbgColor={sideBarbgColor}
              rtlActive={rtlActive}
              propsMiniActive={propsMiniActive}
              stateMiniActive={state.stateMiniActive}
              state={state as DrawerStateType}
              setState={setState}
              handleDrawerToggle={handleDrawerToggle} />
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

export default SidebarMain;