// import * as React from 'react';
import { useEffect, useState, ReactNode } from 'react';
import Head from 'next/head';

import { NextProps } from "@/interfaces/next.interface";

//Theme

import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';


import createEmotionCache from '@/src/createEmotionCache';



//Redux
import { wrapper} from '@/src/redux/store';
import { Provider } from 'react-redux';

//Styles
import '@/styles/globals.css'
import '@/styles/top-loading-bar.css';
import '@/styles/ReactToastify.css';

// Translation
import i18next from 'i18next';
import { withTranslation, useTranslation } from 'react-i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { defaultNS, resources } from '@/lib/i18n';
import detector from 'i18next-browser-languagedetector';

import { hasCookie, getCookies } from 'cookies-next';


i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    returnObjects: true,
    lng: hasCookie('i18nextLng') ? getCookies().i18nextLng : 'en',
    fallbackLng: 'en',
    keySeparator: false,
    defaultNS: defaultNS,
    resources: resources
  });
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();


const isVercel = process.env.NEXT_PUBLIC_SERVERLESS;

function MyApp({ Component, ...rest }: NextProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { router, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { t, i18n, ready } = useTranslation('common');


  const getLayout = Component.getLayout ?? ((page: ReactNode) => page)

  useEffect(() => {

    if (!navigator.cookieEnabled) {
      let cookiesAlert = 'Please allow cookies';
      if (navigator?.language.substring(0, 2) == 'fa') {
        cookiesAlert = 'لطفا کوکی ها را مجاز کنید';
      }
      if (confirm(cookiesAlert)) {
        if (!navigator.cookieEnabled) {
          document.body.style.display = 'none';
        } else {
          location.reload();
        }
      } else {
        document.body.style.display = 'none';
      }
    } else if (window.localStorage === undefined) {
      let localStorageAlert =
        'Your browser is outdated and not support localStorage!';
      if (navigator?.language.substring(0, 2) == 'fa') {
        localStorageAlert =
          'مرورگر شما قدیمی است و از localStorage پشتیبانی نمی کند!';
      }
      alert(localStorageAlert);
    }
  }, [i18n])


  


  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
            <I18nextProvider i18n={i18next}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />

              <div suppressHydrationWarning={true}>
                {/* {typeof window === 'undefined' ? nul */}
                {getLayout(<Component {...pageProps} t={t} i18n={i18n} ready={ready} key={router.route} router={router} isVercel={isVercel} />)}
                {/* {typeof window === 'undefined' ? null : (
                <Component suppressHydrationWarning={true}
                  router={router}
                  {...pageProps}
                  key={router.route}
                  t={t}
                  i18n={i18n}
                  isVercel={isVercel}
                />
              )} */}
              </div>
            </I18nextProvider>
      </Provider>
    </CacheProvider>
  );
}


export default withTranslation('common')(MyApp)