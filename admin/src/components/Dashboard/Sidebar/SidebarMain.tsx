import React, { createRef, useState, FC, useEffect } from 'react'
import mainSidebarStyle from './main-sidebar-style'
import Drawer from '@mui/material/Drawer'
import useMediaQuery from '@mui/material/useMediaQuery';
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
import { useQuery } from "@/src/components/Dashboard/ReactRouter";


const SidebarMain: FC<ProDashboardProps> = (props: ProDashboardProps) => {
  const { classes, cx, theme } = mainSidebarStyle({})
  const { rtlActive,
    sidebarOpen,
    handleDrawerToggle,
    sideBarbgColor,
    routes,
    state,
    setState,
    getCollapseInitialState } = props;
  const router = useRouter()
  const location = useLocation()
  const { propsMiniActive, profile } = useSelector<State, State>(state => state)

  let query = useQuery();
  const _id = query.get('_id');


  const mainPanel = createRef();

  //Open user if in profile

  useEffect(() => {
    if (_id == profile._id) {
      openCollapse('openAvatar')
    }
  }, [_id])


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
    setState((oldState: DrawerStateType) => ({ ...oldState, ...st }));
  };
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <div ref={mainPanel as React.RefObject<HTMLDivElement>}>
      {
        isLargeScreen ? <>
          <Drawer
            data-testid="drawer"
            onMouseOver={() => { setState((oldState: DrawerStateType) => ({ ...oldState, stateMiniActive: false })) }}
            onMouseOut={() => { setState((oldState: DrawerStateType) => ({ ...oldState, stateMiniActive: true })) }}
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
                openCollapse={openCollapse}
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
          </Drawer></> : <><Drawer
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
                openCollapse={openCollapse}
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
          </Drawer></>
      }

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