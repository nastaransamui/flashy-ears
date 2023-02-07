import Image from 'next/image'
import { FC, useState } from 'react'
import socialMediaStyle from './social-media-style'
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import useShallowTranslation from '@/hookes/useShallowTranslation';
const SocialMedia = (() => {
  const { classes, theme, cx } = socialMediaStyle({})
  const { lang } = useShallowTranslation('common')
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  return (
    <div >
      <nav className="menu">
        <input type="checkbox" className="menu-open" name="menu-open" id="menu-open" onClick={() => {
          setMenuOpen((prev) => !prev)
        }} />
        <label className={` menu-open-button ${classes.menuItem}`} htmlFor="menu-open">
          {menuOpen ? <CloseIcon sx={{ fontSize: '2em', marginTop: '19px' }} /> : <ShareIcon sx={{ fontSize: '2em', marginTop: '19px' }} />}
        </label>

        <a href="https://twitter.com/FlashyEarsT" target='_blank' rel='noreferrer noopener' className={`menu-item ${classes.menuItem}`} > <i className="fa fa-twitter"></i> </a>
        <a href="https://www.facebook.com/FlashyEarsFb/" target='_blank' rel='noreferrer noopener' className={`menu-item ${classes.menuItem}`}> <i className="fa fa-facebook"></i> </a>
        <a href="https://www.instagram.com/flashyearsi/" target='_blank' rel='noreferrer noopener' className={`menu-item ${classes.menuItem}`}> <i className="fa fa-instagram"></i> </a>
        <a href="https://www.youtube.com/@flashyears" target='_blank' rel='noreferrer noopener' className={`menu-item ${classes.menuItem}`}> <i className="fa fa-youtube-play"></i> </a>
        <Link href="/contactUs" locale={lang} className={`menu-item ${classes.menuItem}`}> <i className="fa fa-envelope"></i> </Link>

      </nav>


      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="shadowed-goo">

            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
            <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            <feBlend in2="shadow" in="goo" result="goo" />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>
    </div>
  )
})

export default SocialMedia