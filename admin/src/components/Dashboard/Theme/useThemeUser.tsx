import { useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import themeUserStyle from "./theme-user-style";


import { useSelector, useDispatch } from "react-redux";
import { State } from "@/src/redux/store";
import { setCookie } from 'cookies-next';
import { DrawerStateType } from "@/shared/interfaces/react.interface";
import axios from "axios";

import { toast } from 'react-toastify';
import { ToastMessage } from '@/shared/CustomToaster/CustomToaster';
let updateHomeTheme = '/admin/api/home/themeUpdate'

const useThemeUser = (state: DrawerStateType) => {
  const { adminThemeName, propsMiniActive, homeThemeName, adminAccessToken } = useSelector<State, State>((state) => state);
  let drawerOpen = !propsMiniActive && propsMiniActive ? false : !propsMiniActive && !state.stateMiniActive ? true : state.stateMiniActive && !propsMiniActive ? false : true
  const { classes, theme, cx } = themeUserStyle({ drawerOpen })
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [tab, setTab] = useState(0);
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
    console.log(pallet)
    axios.post(updateHomeTheme, { themeName: pallet },
      {
        headers: {
          'Content-Type': 'application/json',
          token: `Brearer ${adminAccessToken}`,
        }
      }
    ).then((resp) => {
      const { success, data, error } = resp.data;
      if (success) {
        dispatch({ type: 'HOME_THEMENAME', payload: pallet });
      } else {
        toast(<ToastMessage >{error}</ToastMessage>, {
          onClose: () => {
            dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
            toast.dismiss()
          },
          toastId: `theme_toastId`
        })
      }
    }).catch(function (error) {
      toast(<ToastMessage >{error?.response?.data?.Error || error.message}</ToastMessage>, {
        onClose: () => {
          dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
          dispatch({
            type: "RERUN_SINGLE_GET",
            payload: false,
          })
          toast.dismiss()
        },
        toastId: `theme_toastId`
      })
    });
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
    homeThemeName,
    changeAdminTheme,
    changeHomePageTheme
  }
}

export default useThemeUser;