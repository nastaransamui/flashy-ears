import {useEffect, useState} from 'react'

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { State } from '@/src/redux/store';

import { useTheme } from '@mui/material';
import appTheme from '@/theme/appTheme';
import { PaletteMode, } from '@mui/material';


import { useTranslation } from "react-i18next";
import { create } from 'jss';
import rtl from 'jss-rtl';

import { jssPreset} from '@mui/styles'

const useWrapper = ()=>{
  const theme = useTheme();
  const { adminLoadingBar, adminFormSubmit, adminThemeName, adminThemeType } = useSelector<State, State>(
    (state) => state
  );
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();


  const [adminTheme, setAdminTheme] = useState({
    ...appTheme(
      'cloud',
      'dark' as PaletteMode,
      i18n.language.startsWith('fa') ? 'rtl' : 'ltr'
    ),
  });

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      // Refresh JSS in SSR
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles?.parentNode?.removeChild(jssStyles);
      }

      //Update direction
      document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
      //Update theme
      setAdminTheme({
        ...appTheme(
          localStorage.getItem('adminThemeName') !== null ?  localStorage.getItem('adminThemeName') as string : 'cloud',
          localStorage.getItem('adminThemeType') as PaletteMode !== null ? localStorage.getItem('adminThemeType') as PaletteMode : 'dark' as PaletteMode,
          i18n.language.startsWith('fa') ? 'rtl' : 'ltr'
        )
      })

      // Remove loading bar
      dispatch({
        type: 'ADMIN_LOADINGBAR',
        payload: 100,
      });
    }



    return () => {
      isMount = false;
    }
  }, [adminThemeName, adminThemeType, i18n.language])

  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  return{
    adminTheme,
    jss,
    adminFormSubmit,
    theme,
    adminLoadingBar,
  }

}

export default useWrapper;