import { FC, Fragment, createRef, useEffect } from "react";
import Link from 'next/link'
import SiebarStyle from "./sidebar-style";
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import useShallowTranslation from '../Hooks/useShallowTranslation';
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/src/redux/store"
import { setCookie } from "cookies-next";
import { PaletteMode } from "@mui/material";

export interface SideBarProps {

  children: JSX.Element;
}

const SideBar: FC<SideBarProps> = ((props) => {
  const { children, } = props;
  const { lang, t } = useShallowTranslation('common')
  const { classes, cx, theme } = SiebarStyle({ lang: lang })
  const router = useRouter();
  const dispatch = useDispatch()
  const homePageType = useSelector<State, string>(state => state.homePageType)
  const homeThemeType = useSelector<State, PaletteMode | null>(state => state.homeThemeType)

  const navRef = createRef<any>();
  const menuRef = createRef<any>();

  useEffect(() => {
    if (router.asPath !== '/') {
      if (navRef.current !== null) {
        navRef.current.style.display = 'block'
        navRef.current.style.top = `calc(100vh - ${window.scrollY - 20000}px)`
        navRef.current.style.top = 0

      }
      if (menuRef.current !== null) {
        menuRef.current.style.display = 'flex'

      }
    } else {
      if (homePageType == 'landingPage') {
        document.getElementById('main')!.style.padding = `0px 0px`;
        if (navRef.current !== null) {
          navRef.current.style.display = 'block'
          navRef.current.style.top = `calc(100vh - ${window.scrollY - 20000}px)`
          navRef.current.style.top = 0

        }
        if (menuRef.current !== null) {
          menuRef.current.style.display = 'flex'

        }
      } else {
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
            if (window.scrollY > 20400) {
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
      }
    }

  }, [navRef])


  return (
    <Fragment>
      <nav className={`${classes.nav} animate__animated animate__backInUp`} ref={navRef}>
        <ul className={classes.ul}>
          <li><Link className={cx(classes.a, router.asPath == '/' ? classes.currentLink : classes.a)} scroll={false} href="/">{t('home')}</Link></li>
          <li><Link className={cx(classes.a, router.asPath == '/about' ? classes.currentLink : classes.a)} href="/about">{t('about')}</Link></li>
          <li><Link className={cx(classes.a, router.asPath == '/collections' ? classes.currentLink : classes.a)} href="/collections">{t('collections')}</Link></li>
          <li><Link className={cx(classes.a, router.asPath == '/products' ? classes.currentLink : classes.a)} href="/products">{t('products')}</Link></li>
          <li><Link className={cx(classes.a, router.asPath == '/gallery' ? classes.currentLink : classes.a)} href="/gallery">{t('gallery')}</Link></li>
          <li><Link className={cx(classes.a, router.asPath == '/contactUs' ? classes.currentLink : classes.a)} href="/contactUs">{t('contactUs')}</Link></li>
        </ul>
      </nav>

      <article
        className={classes.article}
        id="main">

        <div
          className={`${classes.all} animate__animated animate__backInLeft`}
          ref={menuRef}
          id="menuRef">
          <div className={classes.lefter} onClick={() => {
            dispatch({
              type: 'HOME_THEMETYPE',
              payload: homeThemeType == 'dark' ? 'light' : 'dark'
            })
            setCookie('homeThemeType', homeThemeType == 'dark' ? 'light' : 'dark');
          }}>
            <div
              className={classes.text}
            >{theme.palette.mode == 'dark' ? t('light') : t('dark')}</div>
          </div>
          <div className={classes.left} onClick={() => {
            router.push(router.asPath, router.asPath, { locale: lang == 'en' ? 'th' : 'en', shallow: true, scroll: false });
            setCookie('i18nextLng', lang == 'en' ? 'th' : 'en', {});
          }}>
            <div
              className={classes.text}
            >{lang == "en" ? t("th") : t('en')}</div>
          </div>
          <div className={classes.center} onClick={() => {
          }}>
            <div
              className={classes.explainer}
            ><MenuIcon className={classes.menuIcon} /></div>
            <div
              className={classes.text}
            >{t('cart')}</div>
          </div>
          {/* <div className={classes.right} onClick={() => {
            console.log('BD')
          }}>
            <div className={classes.text} >BD</div>
          </div>
          <div className={classes.righter} onClick={() => {
            console.log('SEO')
          }}>
            <div className={classes.text} >SEO</div>
          </div> */}
        </div>
        {children}
      </article>

    </Fragment>
  )
})

export default SideBar;