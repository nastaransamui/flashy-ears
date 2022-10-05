import { useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import themeUserStyle from "./theme-user-style";


import { useSelector, useDispatch } from "react-redux";
import { State } from "@/src/redux/store";
import { setCookie } from 'cookies-next';

const useThemeUser = () => {
  const { classes, theme, cx } = themeUserStyle({})
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [tab, setTab] = useState(0);
  const { adminThemeName } = useSelector<State, State>((state) => state);
  const dispatch = useDispatch();

  const handleToggleOpenTheme = () => {
    setOpenDrawer(!openDrawer);
    setTab(0);
  }
  const handleToggleOpen = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleClose = () => {
    setOpenDrawer(false);
  };

  const handleChangeTab = (e: React.SyntheticEvent, selectedTab: number) => {
    setTab(selectedTab);
  };

  const changeAdminTheme = (pallet: string) => {
    setCookie('adminThemeName', pallet);
    dispatch({ type: 'ADMIN_THEMENAME', payload: pallet });
    setOpenDrawer(false);
  };

  const changeHomePageTheme = (pallet: string) => {
    console.log('implement websoket')
  };

  return {
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
    changeAdminTheme,
    changeHomePageTheme
  }
}

export default useThemeUser;