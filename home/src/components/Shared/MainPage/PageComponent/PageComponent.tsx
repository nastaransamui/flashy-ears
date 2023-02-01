import { FC, Fragment, useEffect, createRef } from "react";
import Button from '@mui/material/Button';
import styles from '@/styles/Home.module.css'
import Image from "next/image";
import { Inter } from '@next/font/google'
import ScrollIntoView from 'react-scroll-into-view'
import useShallowTranslation from '@/hookes/useShallowTranslation'
import { useRouter } from 'next/router';
import Link from 'next/link'
// import dynamic from "next/dynamic";
import PageStyle from "./Page-style";
import CollectionComponent from "@/shared/MainPage/ColletionComponent/CollectionComponent";
// const SideBar = dynamic(() => import("@/shared/SideBar"), { ssr: false });
import SideBar from "@/shared/SideBar";


const inter = Inter({ subsets: ['latin'] })

const PageComponent: FC = (() => {

  const { t, lang } = useShallowTranslation('common');
  const router = useRouter();
  const hasQuery = router.asPath.includes('?');
  const { classes, cx, theme } = PageStyle({})


  return (

    <SideBar >
      <Fragment>


        <h1>Shopping Menu</h1>
        <Image
          src={`/images/logo_${theme.palette.mode}.png`}
          alt="13"
          width={150}
          height={150}
          priority
        />
        <CollectionComponent />
        <ScrollIntoView selector="#slidesComponent" alignToTop smooth>
          <span style={{ cursor: 'pointer' }}>Back to top</span>
        </ScrollIntoView>
      </Fragment>
    </SideBar>
  )
})

export default PageComponent;