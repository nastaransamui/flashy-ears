


import HeadComponent from '@/src/components/head'
import { wrapper, } from '@/src/redux/store';
import { GetServerSideProps, NextPageContext } from 'next';
import { hasCookie, getCookies } from 'cookies-next';


import useShallowTranslation from '@/hookes/useShallowTranslation'
import MainPage from '@/src/components/pages/MainPage';
import { getHomeSlides } from 'apiCalls/getHomeSlides';




export default function Home() {
  const { t } = useShallowTranslation('common');

  return (
    <>
      <HeadComponent title={t('title')} />
      <MainPage />

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
      payload: getCookies(ctx).homeThemeName || 'oceanBlue',
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
    const homeSlides = await getHomeSlides();
    if (!isObjectEmpty(getCookies(ctx))) {
      props = {
        ...(await setPageCookies(ctx as any, store as any)),
        ...(store.dispatch({
          type: 'SLIDES',
          payload: homeSlides,
        })),
        ...(store.dispatch({
          type: 'HOME_LOADINGBAR',
          payload: 100,
        })),
      }
    } else {
      props = {
        ...(store.dispatch({
          type: 'SLIDES',
          payload: homeSlides,
        })),
        ...(store.dispatch({
          type: 'HOME_LOADINGBAR',
          payload: 100,
        })),
      }
    }
    return {
      props
    }
  }
)