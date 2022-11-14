import { useState, SetStateAction } from "react";
import navbarLinksStyle from "./navbar-links-style";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { State } from "@/src/redux/store";
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'react-i18next';
import { setCookie, deleteCookie, removeCookies } from "cookies-next";
import { Lang } from '@/interfaces/react.interface'
import axios from "axios";
import { ToastMessage } from '@/src/components/Shared/CustomToaster/CustomToaster';
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import { db } from '@/src/browserDb';
import Dexie, { Table } from 'dexie';

const api = `/admin/api/auth/logout`


const useNavbarLinks = () => {
  const { theme } = navbarLinksStyle({})
  const navigate = useNavigate()
  const { profile } = useSelector<State, State>(state => state)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t, i18n } = useTranslation('dashboard')
  const dispatch = useDispatch();
  const router = useRouter()

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
    dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: true });
    axios.post(api, { _id: profile._id })
      .then((resp) => {
        const { success, error } = resp.data
        if (!success) {
          toast(<ToastMessage >{error}</ToastMessage>, {
            onClose: () => {
              dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
            }
          })
        } else {
          handleCloseProfile()
          deleteCookie('adminAccessToken')
          dispatch({
            type: 'ADMIN_ACCESS_TOKEN',
            payload: null,
          });
          dispatch({
            type: 'ADMIN_PROFILE',
            payload: {},
          });
          Dexie.delete('routesDatabase')
          db.close()
          dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false });
          router.push('/');
          localStorage.clear();
          dispatch({ type: 'TOTAL_DATA', payload: [] });
          dispatch({ type: 'TOTAL_COUNT', payload: 0 });
          dispatch({ type: 'DELETE_IDS', payload: [] });
          dispatch({ type: 'FIRST_SEARCH', payload: false })
          dispatch({ type: 'FIELD_VALUE', payload: '' })
        }
      })
      .catch((error) => {
        toast(<ToastMessage >{t(`${error.response.data.error}`)}</ToastMessage>, {
          onClose: () => {
            dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
          }
        })
      })
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