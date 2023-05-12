

import HeadComponent from '@/src/components/head'
import { wrapper, } from '@/src/redux/store';
import { GetServerSideProps, NextPageContext } from 'next';
import { hasCookie, getCookie, setCookie } from 'cookies-next';

import Button from '@mui/material/Button';

import useShallowTranslation from '@/hookes/useShallowTranslation'
import { useRouter } from 'next/router';
import About from '@/src/components/pages/About';
import Collections from '@/src/components/pages/Collections';
import { getProductItems } from 'apiCalls/getProductItems';
import { getHomeTheme } from 'apiCalls/getHomeTheme';
import { getCollectionItems } from 'apiCalls/getCollectionItems';



export default function AboutPage() {
  const { t, lang } = useShallowTranslation('common');
  const router = useRouter();

  return (
    <>
      <HeadComponent title={t('title')} />
      <Collections />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    let props = {}
    // const productItems = await getProductItems();
    const collectionItems = await getCollectionItems();
    const homeTheme = await getHomeTheme();
    console.log(ctx.query)
    setCookie('homeThemeType', hasCookie('homeThemeType', ctx) ? getCookie('homeThemeType', ctx) : 'dark', ctx)
    setCookie('homeThemeName', homeTheme?.['name'], ctx)
    setCookie('i18nextLng', hasCookie('i18nextLng', ctx) ? getCookie('i18nextLng', ctx) : 'en', ctx);
    setCookie('galleryImageModel', hasCookie('galleryImageModel', ctx) ? getCookie('galleryImageModel', ctx) : 'bell', ctx);
    props = {
      ...(await store.dispatch({
        type: 'ADMIN_ACCESS_TOKEN',
        payload: getCookie('adminAccessToken') || null,
      })),
      // ...(store.dispatch({
      //   type: 'PRODUCT_ITEMS',
      //   payload: productItems,
      // })),
      ...(store.dispatch({
        type: 'COLLECTION_ITEMS',
        payload: collectionItems,
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