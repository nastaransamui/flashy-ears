import { FC, createRef, useEffect } from "react";

import Button from '@mui/material/Button';

import useShallowTranslation from '@/hookes/useShallowTranslation'
import { useRouter } from 'next/router';
import SideBar from "@/shared/SideBar";
const About: FC = (() => {
  const { t, lang } = useShallowTranslation('common');
  const navRef = createRef<any>();
  const menuRef = createRef<any>();
  const router = useRouter();

  useEffect(() => {
    if (navRef.current !== null && menuRef.current !== null) {
      navRef.current.style.display = 'block'
      menuRef.current.style.display = 'flex'
    }
  }, [navRef])
  return (
    <SideBar navRef={navRef} menuRef={menuRef}>
      <span style={{ display: 'flex', height: '200vh' }}>
        {t('aboutPage')}
      </span>
    </SideBar>
  )
})

export default About;