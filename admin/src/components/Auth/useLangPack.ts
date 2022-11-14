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
    setValues((oldValues) => ({
      ...oldValues,
      lang: i18n.language,
      paletteName: adminThemeName,
      mode: adminThemeType,
    }));
    return () => {};
  }, [adminThemeName, adminThemeType, i18n.language]);

  const handleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCookie('i18nextLng', lang);
    dispatch({
      type: 'ADMIN_LOADINGBAR',
      payload: 0,
    });
  };

  const handleThemeName = (pallet: string) => {
    dispatch({ type: 'ADMIN_THEMENAME', payload: pallet });
    setCookie('adminThemeName', pallet);
    dispatch({
      type: 'ADMIN_LOADINGBAR',
      payload: 0,
    });
  };

  const handleMode = (modeType: string) => {
    dispatch({ type: 'ADMIN_THEMETYPE', payload: modeType });
    setCookie('adminThemeType', modeType);
    dispatch({
      type: 'ADMIN_LOADINGBAR',
      payload: 0,
    });
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
