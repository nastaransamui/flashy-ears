import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '@/src/createEmotionCache';
import appTheme from '@/theme/appTheme';
import { getCookies, hasCookie } from 'cookies-next';
import Script from 'next/script';
import { getHomeTheme } from 'apiCalls/getHomeTheme';
interface Props {
  homeThemeName?: any;
  homeThemeType?: any;
  i18nextLng?: any;
}


class MyDocument extends Document<Props> {
  render() {
    const theme = appTheme(
      this.props.homeThemeName,
      this.props.homeThemeType,
      'ltr'
    )

    return (
      <Html >
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          {/* <link rel="stylesheet" href="https://use.typekit.net/gyf5muf.css" /> */}
          {/* <link
            href='https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css'
            rel='stylesheet'
          />
          <link
            href='https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css'
            rel='stylesheet'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/icon?family=Material+Icons'
          />
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.5/jquery-jvectormap.css'
            type='text/css'
            media='screen'
          /> */}
          {/* <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel='stylesheet'
            href='//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css'
          />
          <script src='//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js'></script>
          <script src='//cdn.jsdelivr.net/npm/sweetalert2@11'></script>
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.4/jquery-jvectormap.css'
            type='text/css'
            media='screen'
          />
          <link
            rel='stylesheet'
            href='//cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css'
            type='text/css'
            media='screen'
          />
          <link
            href='https://use.fontawesome.com/releases/v5.0.7/css/all.css'
            rel='stylesheet'
          />
          <link
            rel='stylesheet'
            type='text/css'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
          />
          <link
            href='https://fonts.googleapis.com/icon?family=Material+Icons'
            rel='stylesheet'
          />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/icon?family=Material+Icons'
          /> */}
          <meta name="emotion-insertion-point" content="" />
          {(this.props as any).emotionStyleTags}
          {/* <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js"></script>
          <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js"></script>
          <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.js"></script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  const homeTheme = await getHomeTheme();

  return {
    ...initialProps,
    emotionStyleTags,
    homeThemeType: hasCookie('homeThemeType', ctx) ? getCookies(ctx).homeThemeType : 'dark',
    homeThemeName: homeTheme?.['name'],
    i18nextLng: hasCookie('i18nextLng', ctx) ? getCookies(ctx).i18nextLng : 'en',
  };
};

export default MyDocument;