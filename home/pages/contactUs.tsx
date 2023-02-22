

import HeadComponent from '@/src/components/head'
import { wrapper, } from '@/src/redux/store';
import { GetServerSideProps, NextPageContext } from 'next';
import { hasCookie, getCookie, setCookie } from 'cookies-next';

import Button from '@mui/material/Button';

import useShallowTranslation from '@/hookes/useShallowTranslation'
import { useRouter } from 'next/router';
import ContactUs from '@/src/components/pages/ContactUs';
import { getHomeTheme } from 'apiCalls/getHomeTheme';



export default function ContactUsPage() {
  const { t, lang } = useShallowTranslation('common');
  const router = useRouter();

  return (
    <>
      <HeadComponent title={t('title')} />
      <ContactUs />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    let props = {}
    const homeTheme = await getHomeTheme();
    setCookie('homeThemeType', hasCookie('homeThemeType', ctx) ? getCookie('homeThemeType', ctx) : 'dark', ctx)
    setCookie('homeThemeName', homeTheme?.['name'], ctx)
    setCookie('i18nextLng', hasCookie('i18nextLng', ctx) ? getCookie('i18nextLng', ctx) : 'en', ctx);
    setCookie('galleryImageModel', hasCookie('galleryImageModel', ctx) ? getCookie('galleryImageModel', ctx) : 'bell', ctx);
    props = {
      ...(await store.dispatch({
        type: 'ADMIN_ACCESS_TOKEN',
        payload: getCookie('adminAccessToken') || null,
      })),
      ...(store.dispatch({
        type: 'HOME_LOADINGBAR',
        payload: 100,
      })),
      ...(await store.dispatch({
        type: 'HOME_THEMETYPE',
        payload: getCookie('homeThemeType', ctx),
      })),
      ...(await store.dispatch({
        type: 'HOME_THEMENAME',
        payload: getCookie('homeThemeName', ctx),
      })),
    }
    return {
      props
    }
  }
)