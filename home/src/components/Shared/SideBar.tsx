import { FC, Fragment } from "react";
import Link from 'next/link'
import SiebarStyle from "./sidebar-style";
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import useShallowTranslation from '../Hooks/useShallowTranslation';
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/src/redux/store"
import { setCookie } from "cookies-next";


export interface SideBarProps {
  navRef: any;
  menuRef: any;
  children: JSX.Element;
}

const SideBar: FC<SideBarProps> = ((props) => {
  const { navRef, children, menuRef } = props;
  const { lang, t } = useShallowTranslation('common')
  const { classes, cx, theme } = SiebarStyle({ lang: lang })
  const router = useRouter();
  const hasQuery = router.asPath.includes('?');
  const dispatch = useDispatch()
  const { homeThemeType } = useSelector<State, State>((state) => state);


  return (
    <Fragment>
      <nav className={classes.nav} ref={navRef}>
        <ul className={classes.ul}>
          <li><Link className={cx(classes.a, router.asPath == '/' && classes.currentLink)} scroll={false} href="/">Home</Link></li>
          <li><Link className={cx(classes.a, router.asPath == '/about' && classes.currentLink)} href="/about">About</Link></li>
          {/* <li><a className={classes.a} href="http://www.amazon.com">Amazon</a></li>
          <li><a className={classes.a} href="http://www.zappos.com">Zappos</a></li>
          <li><a className={classes.a} href="http://www.threadless.com">Threadless</a></li> */}
        </ul>
      </nav>

      <article
        className={classes.article}
        id="main">

        <div className={classes.all} ref={menuRef}>
          <div className={classes.lefter} onClick={() => {
            dispatch({
              type: 'HOME_THEMETYPE',
              payload: homeThemeType == 'dark' ? 'light' : 'dark'
            })
            setCookie('homeThemeType', homeThemeType == 'dark' ? 'light' : 'dark');
          }}>
            <div className={classes.text} >{theme.palette.mode}</div>
          </div>
          <div className={classes.left} onClick={() => {
            router.push(router.asPath, router.asPath, { locale: lang == 'en' ? 'th' : 'en', shallow: true, scroll: false });
          }}>
            <div className={classes.text} >Language</div>
          </div>
          <div className={classes.center} onClick={() => {
            console.log('FD')
          }}>
            <div className={classes.explainer}><MenuIcon className={classes.menuIcon} /></div>
            <div className={classes.text} >Cart</div>
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