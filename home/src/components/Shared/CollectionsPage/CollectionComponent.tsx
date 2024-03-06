import { FC, Fragment, useState } from "react";
import useShallowTranslation from "@/src/components/Hooks/useShallowTranslation";
import { useSelector } from "react-redux";
import { CollectionItemsType, State } from "@/src/redux/store";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useTheme } from "@mui/material";
import Link from "next/link";
import galleryStyles from "./gallery-style";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Carousel from 'react-slick';

const CollectionComponent: FC = (() => {
  const { t, lang } = useShallowTranslation('common');
  let { collectionItems } = useSelector<State, State>((state) => state)
  // const theme = useTheme()
  const { classes, cx, theme } = galleryStyles({})
  const [isLoaded, setLoaded] = useState(true);

  const setSize = (sizePaper: string) => {
    switch (sizePaper) {
      case 'short':
        return classes.short;
      case 'long':
        return classes.long;
      default:
        return classes.medium;
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    arrows: true,
  };
  return (
    <Fragment>

      <Box
        className="animate__animated animate__zoomInDown"
        sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block', } }}>
        <div className={classes.massonry}>
          {
            collectionItems.map((item: CollectionItemsType, index: number) => {
              return (
                <div
                  className={cx(classes.item, isLoaded && classes.loaded)}
                  key={item._id}
                  style={{ transitionDuration: index / 4 + 's', }} >
                  <Paper className={cx(classes.imgThumb, setSize('short'))}>
                    <div className={classes.figure}>
                      <div className={classes.img} style={{
                        //@ts-ignore
                        backgroundImage: `url('${process.env.NEXT_PUBLIC_FOLDER_PUBLIC_UAT}${item[`img_${theme.palette.mode}`][0]['src']}')`
                      }} />
                    </div>
                    <div className={cx(classes.detail)} >
                      <Link key={item._id} href={{
                        pathname: '/products',
                        query: { _id: item._id }
                      }} >
                        <Typography variant="h6" style={{ color: theme.palette.text.color }}>{item[`desc_${lang}` as keyof typeof item] as string}</Typography>
                      </Link>
                      <span style={{ color: theme.palette.text.color }}>{t('numberOfProduct')}: {item.products_id.length}</span>
                    </div>
                  </Paper>
                </div>
              )
            })}
        </div>
        {collectionItems.length < 1 && (
          <Typography variant='button' component='p' align='center'>
            No data to display yet
          </Typography>
        )}
      </Box>
      <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', } }}>
        <Carousel {...settings} style={{ cursor: 'pointer' }} >
          {collectionItems.length !== 0 &&
            collectionItems.map((item: CollectionItemsType, index: number) => {
              return (
                <div className={classes.itemCarousel} key={item._id} >
                  <Paper className={cx(classes.imgThumb, setSize('long'))}>
                    <div className={classes.figure}>
                      <div className={classes.img} style={{
                        //@ts-ignore
                        backgroundImage: `url('${item[`img_${theme.palette.mode}`][0]['src']}')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat'
                      }} />
                    </div>
                    <div className={classes.detail}>
                      <Typography variant="h6" >{item[`desc_${lang}` as keyof typeof item] as string}</Typography>
                    </div>
                  </Paper>
                </div>
              )
            })}
        </Carousel>
      </Box>
    </Fragment>
  )
})

export default CollectionComponent;
