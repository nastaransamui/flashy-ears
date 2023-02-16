

import HeadComponent from '@/src/components/head'
import { wrapper, } from '@/src/redux/store';
import { GetServerSideProps, NextPageContext } from 'next';
import { getCookies, setCookie } from 'cookies-next';

import useShallowTranslation from '@/hookes/useShallowTranslation'
import { useRouter } from 'next/router';
import About from '@/src/components/pages/About';
import { getHomeTheme } from 'apiCalls/getHomeTheme';



export default function AboutPage() {
  const { t, lang } = useShallowTranslation('common');
  const router = useRouter();

  return (
    <>
      <HeadComponent title={t('title')} />
      <About />
    </>
  )
}

export function isObjectEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}
export async function setPageCookies(ctx: NextPageContext, store: any) {
  // const profile: any =
  //   getCookies(ctx).adminAccessToken !== undefined
  //     ? unHashProfile(getCookies(ctx)?.adminAccessToken as string)
  //     : {};

  const homeTheme = await getHomeTheme();
  return {
    ...(await store.dispatch({
      type: 'ADMIN_ACCESS_TOKEN',
      payload: getCookies(ctx).adminAccessToken || null,
    })),
    ...(await store.dispatch({
      type: 'HOME_THEMETYPE',
      payload: getCookies(ctx).homeThemeType || 'dark',
    })),
    ...(await store.dispatch({
      type: 'HOME_THEMENAME',
      payload: homeTheme?.['name'] || 'oceanBlue',
    })),
    ...(await store.dispatch({
      type: 'HOME_LOADINGBAR',
      payload: 100,
    })),
  };
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    let props = {}
    const homeTheme = await getHomeTheme();
    if (!isObjectEmpty(getCookies(ctx))) {

      props = {
        ...(await setPageCookies(ctx as any, store as any)),
      }
    } else {
      setCookie('homeThemeType', 'dark', ctx);
      // setCookie('homeThemeName', homeTheme?.['name'], ctx);
      setCookie('i18nextLng', 'en', ctx);
      props = {
        ...(store.dispatch({
          type: 'HOME_LOADINGBAR',
          payload: 100,
        })),
        ...(await store.dispatch({
          type: 'HOME_THEMENAME',
          payload: homeTheme?.['name'],
        })),
      }
    }
    return {
      props
    }
  }
)