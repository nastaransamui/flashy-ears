import HeadComponent from "@/src/components/head";
import { Fragment } from "react";


import { useEffect, useState } from "react";
import { NextPage } from "next";
import useShallowTranslation from "@/src/components/Hooks/useShallowTranslation";
import ErrorPage from '@/src/components/pages/ErrorPage'
import { useDispatch } from 'react-redux';
import { getCookies, } from 'cookies-next';
import { getHomeTheme } from 'apiCalls/getHomeTheme';

const Custom404: NextPage = (props: any) => {
  const { t, } = useShallowTranslation('404');
  const errorCode = props.router.route.substring(1);
  const [themeName, setThemeName] = useState<any>(null)
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchMyAPI() {
      const homeTheme = await getHomeTheme();
      setThemeName(homeTheme?.['name'])
    }

    fetchMyAPI()
  }, [])

  useEffect(() => {
    let isMount = true;
    if (themeName !== null) {
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
        payload: themeName,
      });
    }
    return () => {
      isMount = false;
    };
  }, [themeName]);
  return (
    <Fragment>
      <HeadComponent title={t('title')} />
      <ErrorPage t={t} errorCode={errorCode} />
    </Fragment>
  );
}


export default Custom404

