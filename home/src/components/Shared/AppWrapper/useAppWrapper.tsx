import { useEffect, useState } from 'react'

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { State } from '@/src/redux/store';
import appTheme from '@/theme/appTheme';
import { PaletteMode, } from '@mui/material';
import { hasCookie, getCookies } from 'cookies-next';

import { create } from 'jss';
import { jssPreset } from '@mui/styles'
import rtl from 'jss-rtl';

const useWrapper = () => {
  const homeThemeName = useSelector<State, string | null>(state => state.homeThemeName)
  const homeFormSubmit = useSelector<State, boolean>(state => state.homeFormSubmit)
  const homeLoadingBar = useSelector<State, number>(state => state.homeLoadingBar)
  const homeThemeType = useSelector<State, PaletteMode | null>(state => state.homeThemeType)

  const dispatch = useDispatch();
  const [homeTheme, setHomeTheme] = useState({
    ...appTheme(homeThemeName as string,
      homeThemeType as PaletteMode,
      'ltr'
    ),
  });
  useEffect(() => {
    // Refresh JSS in SSR
    // const jssStyles = document.querySelector('#jss-server-side');
    // if (jssStyles) {
    //   jssStyles?.parentNode?.removeChild(jssStyles);
    // }

    //Update direction
    // document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
    //Update theme

    if (homeThemeName !== undefined && homeThemeType !== undefined) {
      setHomeTheme({
        ...appTheme(
          homeThemeName as string,
          homeThemeType as PaletteMode,
          'ltr'
        )
      })
    }

    // Remove loading bar
    dispatch({
      type: 'HOME_LOADINGBAR',
      payload: 100,
    });
    return () => { }
  }, [homeThemeName, homeThemeType, homeLoadingBar])

  useEffect(() => {
    // Remove preloader or show javascript disabled warning
    // const preloader = document.getElementById('preloader');

    // if (preloader !== null || undefined) {
    //   preloader?.remove();
    // }
  }, [])

  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  return {
    homeTheme,
    jss,
    homeFormSubmit,
    homeLoadingBar,
    homeThemeType
  }
}

export default useWrapper;