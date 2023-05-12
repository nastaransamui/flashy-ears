


import HeadComponent from '@/src/components/head'
import { wrapper, } from '@/src/redux/store';
import { GetServerSideProps, NextPageContext } from 'next';
import { hasCookie, getCookie, setCookie } from 'cookies-next';


import useShallowTranslation from '@/hookes/useShallowTranslation'
import MainPage from '@/src/components/pages/MainPage';
import { getHomeSlides } from 'apiCalls/getHomeSlides';
import { getHomeTheme } from 'apiCalls/getHomeTheme';
import { getProductItems } from 'apiCalls/getProductItems';



export default function Home() {
  const { t } = useShallowTranslation('common');

  return (
    <>
      <HeadComponent title={t('title')} />
      <MainPage />

    </>
  )
}



export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    let props = {}
    const homeSlides = await getHomeSlides();
    const homeTheme = await getHomeTheme();
    const productItems = await getProductItems({});
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
        type: 'SLIDES',
        payload: homeSlides,
      })),
      ...(store.dispatch({
        type: 'HOME_PAGE_TYPE',
        payload: homeTheme?.['homePageType'],
      })),
      ...(store.dispatch({
        type: 'PRODUCT_ITEMS',
        payload: productItems,
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