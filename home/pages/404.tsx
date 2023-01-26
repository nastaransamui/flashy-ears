import HeadComponent from "@/src/components/head";
import { Fragment } from "react";


import { useEffect } from "react";
import { NextPage } from "next";
import useShallowTranslation from "@/src/components/Hooks/useShallowTranslation";
import ErrorPage from '@/src/components/pages/ErrorPage'
import { useDispatch } from 'react-redux';
import { getCookies, } from 'cookies-next';

const Custom404: NextPage = (props: any) => {
  const { t, } = useShallowTranslation('404');
  const errorCode = props.router.route.substring(1);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      dispatch(
        {
          type: 'ADMIN_ACCESS_TOKEN',
          payload: getCookies().adminAccessToken || null
        }
      );
      dispatch({
        type: 'HOME_THEMETYPE',
        payload: getCookies().homeThemeType || 'dark',
      });
      dispatch({
        type: 'HOME_THEMENAME',
        payload: getCookies().homeThemeName || 'oceanBlue',
      });
    }
    return () => {
      isMount = false;
    };
  }, []);
  return (
    <Fragment>
      <HeadComponent title={t('title')} />
      <ErrorPage t={t} errorCode={errorCode} />
    </Fragment>
  );
}


export default Custom404

