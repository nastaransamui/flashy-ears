import { useState, useEffect } from 'react';

import authStyles from './auth-style';

import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';
import { State } from '@/src/redux/store';
import { setCookie } from 'cookies-next';

const useLangPack = () => {
  const { classes } = authStyles({});
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const { adminThemeName, adminThemeType } = useSelector<State, State>(
    (state) => state
  );
  const [values, setValues] = useState({
    lang: i18n.language,
    paletteName: adminThemeName,
    mode: adminThemeType,
  });
  useEffect(() => {
    let isMount = true;
    if (isMount) {
      setValues((oldValues) => ({
        ...oldValues,
        lang: i18n.language,
        paletteName: adminThemeName,
        mode: adminThemeType,
      }));
    }
    return () => {
      isMount = false;
    };
  }, [adminThemeName, adminThemeType, i18n.language]);

  const handleLanguage = (lang: string) => {
    localStorage.setItem('i18nextLng', lang);
    i18n.changeLanguage(lang);
    setCookie('i18nextLng', lang);
  };

  const handleThemeName = (pallet: string) => {
    localStorage.setItem('adminThemeName', pallet);
    dispatch({ type: 'ADMIN_THEMENAME', payload: pallet });
  };

  const handleMode = (modeType: string) => {
    localStorage.setItem('adminThemeType', modeType);
    dispatch({ type: 'ADMIN_THEMETYPE', payload: modeType });
  };

  return {
    classes,
    values,
    t,
    adminThemeType,
    handleLanguage,
    handleThemeName,
    handleMode,
  };
};

export default useLangPack;
