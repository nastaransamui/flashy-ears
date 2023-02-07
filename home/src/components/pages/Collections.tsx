import { FC, Fragment } from "react";

import Image from "next/image";
import useShallowTranslation from '@/hookes/useShallowTranslation'
import { useRouter } from 'next/router';
import SideBar from "@/shared/SideBar";
import CollectionComponent from "@/shared/CollectionsPage/CollectionComponent";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Fab from '@mui/material/Fab';
import ScrollIntoView from 'react-scroll-into-view'
import useStyles from "./collections-style";
const Collections: FC = (() => {
  const { t, lang } = useShallowTranslation('common');
  const router = useRouter();

  const { classes, theme } = useStyles({})
  return (
    <SideBar >
      <Fragment>


        <h2 id="top" className={classes.title}>{t('titleCollection')}</h2>
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
        <ScrollIntoView selector="#top" alignToTop smooth className={classes.backToTop}>
          {/* <span style={{ cursor: 'pointer' }}>Back to top</span> */}
          <Fab color="primary" aria-label="add">
            <ArrowUpwardIcon />
          </Fab>
        </ScrollIntoView>
      </Fragment>
    </SideBar>
  )
})

export default Collections;