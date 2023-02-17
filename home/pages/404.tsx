import HeadComponent from "@/src/components/head";
import { Fragment } from "react";

import { hasCookie, getCookie, setCookie } from 'cookies-next';

import { useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import useShallowTranslation from "@/src/components/Hooks/useShallowTranslation";
import ErrorPage from '@/src/components/pages/ErrorPage'
import { useDispatch } from 'react-redux';
import { getCookies, } from 'cookies-next';
import { getHomeTheme } from 'apiCalls/getHomeTheme';
import { wrapper } from "@/src/redux/store";

const Custom404: NextPage = (props: any) => {
  const { t, } = useShallowTranslation('404');
  const errorCode = props.router.route.substring(1);
  // const [themeName, setThemeName] = useState<any>(null)
  const dispatch = useDispatch();
  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     const homeTheme = await getHomeTheme();
  //     setThemeName(homeTheme?.['name'])
  //   }

  //   fetchMyAPI()
  // }, [])

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      dispatch(
        {
          type: 'ADMIN_ACCESS_TOKEN',
          payload: getCookie('adminAccessToken') || null
        }
      );
      dispatch({
        type: 'HOME_THEMETYPE',
        payload: getCookie('homeThemeType') || 'dark',
      });
      dispatch({
        type: 'HOME_THEMENAME',
        payload: getCookie('homeThemeName') || 'oceanBlue',
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

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async (ctx) => {
    let props = {}
    const homeTheme = await getHomeTheme();
    setCookie('homeThemeType', 'dark')
    setCookie('homeThemeName', homeTheme?.['name'], {})
    setCookie('i18nextLng', 'en');
    setCookie('galleryImageModel', 'bell');
    return { props }
  }
)