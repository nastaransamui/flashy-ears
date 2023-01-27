import { FC, Fragment, useEffect, createRef } from "react";
import Button from '@mui/material/Button';
import styles from '@/styles/Home.module.css'
import Image from "next/image";
import { Inter } from '@next/font/google'
import ScrollIntoView from 'react-scroll-into-view'
import useShallowTranslation from '@/hookes/useShallowTranslation'
import { useRouter } from 'next/router';
import Link from 'next/link'
import dynamic from "next/dynamic";
import PageStyle from "./Page-style";
const SideBar = dynamic(() => import("@/shared/SideBar"), { ssr: false });


const inter = Inter({ subsets: ['latin'] })

const PageComponent: FC = (() => {

  const { t, lang } = useShallowTranslation('common');
  const router = useRouter();
  const hasQuery = router.asPath.includes('?');
  const { classes, cx } = PageStyle({})
  const navRef = createRef<any>();
  const menuRef = createRef<any>();

  useEffect(() => {
    const handleScroll = (event: any) => {
      if (navRef.current !== null) {
        if (window.scrollY > 20000) {
          navRef.current.style.display = 'block'
          navRef.current.style.top = `calc(100vh - ${window.scrollY - 20000}px)`
          if (window.scrollY > 20000 + window.innerHeight) {
            navRef.current.style.top = 0
          }
        } else {
          navRef.current.style.display = 'none'
        }
      }
      if (menuRef.current !== null) {
        if (window.scrollY > 20460) {
          menuRef.current.style.display = 'flex'
        } else {
          menuRef.current.style.display = 'none'

        }

      }
    }
    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [navRef])

  return (

    <SideBar navRef={navRef} menuRef={menuRef}>
      <Fragment>


        <h1>Shopping Menu</h1>
        <Image
          src="/images/logo_white.png"
          alt="13"
          width={150}
          height={150}
          priority
        />
        <p className={classes.lead}>{t('mainPageFirstP')}</p>
        <p>{t('MainPageSecondP')}</p>
        <ScrollIntoView selector="#slidesComponent" alignToTop smooth>
          <span style={{ cursor: 'pointer' }}>Back to top</span>
        </ScrollIntoView>
      </Fragment>
    </SideBar>
  )
})

export default PageComponent;