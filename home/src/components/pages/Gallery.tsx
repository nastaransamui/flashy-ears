import { FC, Fragment } from "react";

import Image from "next/image";
import useShallowTranslation from '@/hookes/useShallowTranslation'
import { useRouter } from 'next/router';
import SideBar from "@/shared/SideBar";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Fab from '@mui/material/Fab';
import ScrollIntoView from 'react-scroll-into-view'
import useStyles from "./collections-style";
import GalleryComponent from "../Shared/CollectionsPage/GalleryComponent";
const Gallery: FC = (() => {
  const { t, lang } = useShallowTranslation('common');
  const router = useRouter();

  const { classes, theme } = useStyles({})
  return (
    <SideBar >
      <Fragment>
        <GalleryComponent />
        <ScrollIntoView selector="#top" alignToTop smooth className={classes.backToTop} style={{ right: '100px' }}>
          {/* <span style={{ cursor: 'pointer' }}>Back to top</span> */}
          <Fab color="primary" aria-label="add">
            <ArrowUpwardIcon />
          </Fab>
        </ScrollIntoView>
      </Fragment>
    </SideBar>
  )
})

export default Gallery;