import Image from "next/image";
import { FC, Fragment } from "react";
import styles from '@/styles/Home.module.css'
import { Inter } from '@next/font/google'
import Button from '@mui/material/Button';

import ScrollIntoView from 'react-scroll-into-view'
import useShallowTranslation from '@/hookes/useShallowTranslation'
import { useRouter } from 'next/router';
import Link from 'next/link'
import ImageComponet from "@/shared/MainPage/ImageComponent";

const inter = Inter({ subsets: ['latin'] })

const MainPage: FC = (() => {

  const { t, lang } = useShallowTranslation('common');
  const router = useRouter();
  const hasQuery = router.asPath.includes('?');

  return (
    <Fragment>
      <ImageComponet />
      <main className={styles.main} id="main">

        <div className={styles.thirteen}>
          <Image
            src="/images/logo_white.png"
            alt="13"
            width={150}
            height={150}
            priority
          />
        </div>
        <p className={inter.className}>
          {t('soon')}
        </p>
        <div className="lang-menu " >
          <div className={`selected-lang  ${lang}`}>
            {t(lang)}
          </div>
          <ul>
            <li>
              <Link
                href={{
                  pathname: hasQuery ? router.route : router.asPath,
                  query: router.query,
                }}
                replace locale={lang == 'en' ? 'th' : 'en'} scroll={false} shallow={true} legacyBehavior>
                <a role="button" className={lang == 'en' ? 'th' : 'en'}>{lang == 'en' ? t('th') : t('en')}</a>
              </Link>
            </li>
          </ul>
        </div>
        <Button
          variant='outlined'
          size='large'
          color='primary'
          onClick={() => {
            router.push('/about', '/about', { locale: lang, shallow: true, scroll: false });
          }}>
          about
        </Button>
        <ScrollIntoView selector="#slidesComponent" alignToTop smooth>
          <span style={{ cursor: 'pointer' }}>Back to top</span>
        </ScrollIntoView>
      </main>
    </Fragment>
  )
})

export default MainPage