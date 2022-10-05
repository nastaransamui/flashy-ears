import { useState, SetStateAction } from "react";
import navbarLinksStyle from "./navbar-links-style";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { State } from "@/src/redux/store";
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'react-i18next';
import { setCookie } from "cookies-next";
import { Lang } from '@/interfaces/react.interface'

const useNavbarLinks = () => {
  const { theme } = navbarLinksStyle({})
  const navigate = useNavigate()
  const { profile } = useSelector<State, State>(state => state)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t, i18n } = useTranslation('dashboard')
  const dispatch = useDispatch()

  const [openProfile, setOpenProfile] = useState<any>(null);
  const handleClickProfile = (event: { target: any; currentTarget: SetStateAction<null>; }) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const [openSettings, setOpenSettings] = useState<any>(null);
  const handleClickSettings = (event: { target: any; currentTarget: SetStateAction<null>; }) => {

    if (openSettings && openSettings.contains(event.target)) {
      setOpenSettings(null);
    } else {
      setOpenSettings(event.currentTarget);
    }
  };

  const handleCloseSetting = () => {
    setOpenSettings(null);
  };

  const handleChangeLang = (e: any, lang: Lang) => {
    localStorage.setItem('i18nextLng', lang.LangCode);
    setCookie('i18nextLng', lang.LangCode);
    i18n.changeLanguage(lang.LangCode);
    setOpenSettings(null);
  };

  const handleChangeMode = () => {
    localStorage.setItem(
      'adminThemeType',
      theme.palette.mode == 'light' ? 'dark' : 'light'
    );
    dispatch({
      type: 'ADMIN_THEMETYPE',
      payload: theme.palette.mode == 'light' ? 'dark' : 'light',
    });

    setCookie(
      'adminThemeType',
      theme.palette.mode == 'light' ? 'dark' : 'light'
    );
  };

  const logOut = async () => {
    console.log("Logiout")
  }


  return {
    theme,
    navigate,
    openProfile,
    handleClickProfile,
    handleCloseProfile,
    profile,
    logOut,
    openSettings,
    handleClickSettings,
    handleCloseSetting,
    isMobile,
    t,
    i18n, handleChangeLang, handleChangeMode
  }
}

export default useNavbarLinks;