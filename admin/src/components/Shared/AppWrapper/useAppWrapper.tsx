import { useEffect, useState } from 'react'

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { State } from '@/src/redux/store';

import appTheme from '@/theme/appTheme';
import { PaletteMode, } from '@mui/material';

import { hasCookie, getCookies } from 'cookies-next';
import { useTranslation } from "react-i18next";
import { create } from 'jss';
import rtl from 'jss-rtl';

import { jssPreset } from '@mui/styles'

const useWrapper = () => {
  const adminLoadingBar = useSelector<State, number>((state) => state.adminLoadingBar);
  const adminFormSubmit = useSelector<State, boolean>((state) => state.adminFormSubmit);
  const adminThemeType = useSelector<State, string>((state) => state.adminThemeType);
  const adminThemeName = useSelector<State, PaletteMode>((state) => state.adminThemeName as PaletteMode);
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();

  const [adminTheme, setAdminTheme] = useState({
    ...appTheme(
      hasCookie('adminThemeName') ? getCookies().adminThemeName as string : 'grayscale' as string,
      hasCookie('adminThemeType') ? getCookies().adminThemeType as PaletteMode : 'dark' as PaletteMode,
      i18n.language.startsWith('fa') ? 'rtl' : 'ltr'
    ),
  });

  useEffect(() => {
    // Refresh JSS in SSR
    // const jssStyles = document.querySelector('#jss-server-side');
    // if (jssStyles) {
    //   jssStyles?.parentNode?.removeChild(jssStyles);
    // }

    //Update direction
    document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
    //Update theme
    setAdminTheme({
      ...appTheme(
        adminThemeName as string,
        adminThemeType as PaletteMode,
        i18n.language.startsWith('fa') ? 'rtl' : 'ltr'
      )
    })

    // Remove loading bar
    dispatch({
      type: 'ADMIN_LOADINGBAR',
      payload: 100,
    });

    return () => { }
  }, [adminThemeName, adminThemeType, i18n.language])

  useEffect(() => {
    // Remove preloader or show javascript disabled warning
    const preloader = document.getElementById('preloader');
    if (preloader !== null || undefined) {
      preloader?.remove();
    }
  }, [])

  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  return {
    adminTheme,
    jss,
    adminFormSubmit,
    adminLoadingBar,
  }

}

export default useWrapper;