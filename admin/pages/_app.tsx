// import * as React from 'react';
import { useEffect, useState, ReactNode } from 'react';
import Head from 'next/head';

import { NextProps } from "@/interfaces/next.interface";

//Theme

import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';


import createEmotionCache from '@/src/createEmotionCache';



//Redux
import { wrapper } from '@/src/redux/store';
import { Provider } from 'react-redux';

//Styles
import '@/styles/globals.css'
import '@/styles/top-loading-bar.css';
import '@/styles/ReactToastify.css';
import '@/styles/animate-slider-horizontal.css'

import 'animate.css';
import '../styles/nextjs-material-dashboard-pro.css';
import 'video-react/dist/video-react.css'
import '@react-jvectormap/lib/jquery-jvectormap.css'
import "@/styles/react-image-lightbox.css";

// Translation
import i18next from 'i18next';
import { withTranslation, useTranslation } from 'react-i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { defaultNS, resources } from '@/lib/i18n';
import detector from 'i18next-browser-languagedetector';

import { hasCookie, getCookies } from 'cookies-next';
import Script from 'next/script';
import { Roboto_Condensed } from 'next/font/google'
import { AppProps } from 'next/app';
import { NextComponentType } from 'next';
const roboto = Roboto_Condensed({ weight: ['300', '400', '700'], subsets: ['latin'] })
var toBoolean = require('to-boolean');

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

type CustomAppProps = AppProps & {
  Component: any & { getLayout?: (page: ReactNode) => ReactNode };
};

const isVercel = toBoolean(process.env.NEXT_PUBLIC_SERVERLESS);;

function MyApp({ Component, ...rest }: CustomAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { router, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { t, i18n, ready } = useTranslation('common');


  const getLayout = Component.getLayout ?? ((page: ReactNode) => page)
  useEffect(() => {
    // Load Jquery
    typeof document !== 'undefined'
      ? (window.jQuery = window.$ = require('jquery'))
      : null;
  }, []);


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
      {/* <Script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js' />
      <Script src='https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.5/jquery-jvectormap.min.js' />
      <Script src='/admin/js/jquery-jvectormap-world-mill-en.js' /> */}
      <Provider store={store}>
        <I18nextProvider i18n={i18next}>
          <CssBaseline />
          <div suppressHydrationWarning={true} className={roboto.className}>
            {getLayout(<Component {...pageProps} key={router.route} router={router} isVercel={isVercel} />)}
          </div>
        </I18nextProvider>
      </Provider>
    </CacheProvider>
  );
}


export default withTranslation('common')(MyApp)