

import HeadComponent from '@/src/components/head'
import { wrapper, } from '@/src/redux/store';
import { GetServerSideProps, NextPageContext } from 'next';
import { getCookies, setCookie } from 'cookies-next';

import useShallowTranslation from '@/hookes/useShallowTranslation'
import { useRouter } from 'next/router';
import Gallery from '@/src/components/pages/Gallery';



export default function GalleryPage() {
  const { t, lang } = useShallowTranslation('common');
  const router = useRouter();

  return (
    <>
      <HeadComponent title={t('title')} />
      <Gallery />
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
    if (!isObjectEmpty(getCookies(ctx))) {

      props = {
        ...(await setPageCookies(ctx as any, store as any)),
      }
    } else {
      setCookie('homeThemeType', 'dark', ctx);
      setCookie('homeThemeName', 'oceanBlue', ctx);
      setCookie('i18nextLng', 'en', ctx);
      props = {
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