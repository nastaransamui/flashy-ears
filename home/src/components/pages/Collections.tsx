import { FC, Fragment } from "react";

import Image from "next/image";
import useShallowTranslation from '@/hookes/useShallowTranslation'
import { useRouter } from 'next/router';
import SideBar from "@/shared/SideBar";
import CollectionComponent from "@/shared/CollectionsPage/CollectionComponent";
import { useTheme } from "@mui/material";
import ScrollIntoView from 'react-scroll-into-view'
const Collections: FC = (() => {
  const { t, lang } = useShallowTranslation('common');
  const router = useRouter();
  const theme = useTheme();
  return (
    <SideBar >
      <Fragment>


        <h1 id="top">Shopping Menu</h1>
        <Image
          src={`/images/logo_${theme.palette.mode}.png`}
          alt="13"
          width={150}
          height={150}
          style={{ cursor: 'pointer' }}
          priority
          onClick={() => {
            router.push('/')
          }}
        />
        <CollectionComponent />
        <ScrollIntoView selector="#top" alignToTop smooth>
          <span style={{ cursor: 'pointer' }}>Back to top</span>
        </ScrollIntoView>
      </Fragment>
    </SideBar>
  )
})

export default Collections;