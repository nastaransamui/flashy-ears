// import '@/styles/scroll.css'
import '@/styles/base.css'
import '@/styles/particles.css'
// import '@/styles/globals.css'
import '@/styles/social-media.scss'
import '@/styles/react-animated-slider/horizontal.css'
// import '@/styles/landingPage/style.css'
// import '@/styles/progress/normalize.css'
// import '@/styles/progress/demo.css'
import '@/styles/progress/component.css'
import '@/styles/progress/custom-bars.css'
import Head from 'next/head';
import 'animate.css'
import '@/styles/top-loading-bar.css';
import '@/styles/font-awesome.min.css'
import { useEffect, ReactNode } from 'react';
import "@/styles/react-image-lightbox.css";
//Redux
import { wrapper } from '@/src/redux/store';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';

import { NextProps } from "@/interfaces/next.interface";
import createEmotionCache from '@/src/createEmotionCache';

var toBoolean = require('to-boolean');

const clientSideEmotionCache = createEmotionCache();

const isVercel = toBoolean(process.env.NEXT_PUBLIC_SERVERLESS);
import AppWrapper from '@/shared/AppWrapper/AppWrapper';

export default function MyApp({ Component, ...rest }: NextProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { router, emotionCache = clientSideEmotionCache, pageProps } = props;

  // useEffect(() => {
  //   // Remove preloader or show javascript disabled warning
  //   const preloader = document.getElementById('preloader');
  //   if (preloader !== null || undefined) {
  //     preloader?.remove();
  //   }
  // }, [])

  useEffect(() => {
    // Load Jquery
    typeof document !== 'undefined'
      ? (window.jQuery = window.$ = require('jquery'))
      : null;
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <CssBaseline />
        <AppWrapper>
          <Component {...pageProps} key={router.route} router={router} isVercel={isVercel} />
        </AppWrapper>
      </Provider>
    </CacheProvider>
  )
}
