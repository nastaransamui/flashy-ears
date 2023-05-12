
import { FC, useEffect, useState, forwardRef } from "react";

import galleryStyles from "./gallery-style";
import SideBar from "@/shared/SideBar";
import useShallowTranslation from "@/hookes/useShallowTranslation";
import Script from "next/script";
import { Gallery, } from "react-grid-gallery";
import { Image as ImageGalleryType } from 'react-grid-gallery'
import Lightbox from "react-image-lightbox";
import { ThumbnailImageProps } from "react-grid-gallery";
import SocialMedia from "@/shared/SocialMedia/SocialMedia";
import Link from "next/link";
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getCookies, setCookie } from "cookies-next";
import { useSelector } from "react-redux";
import { State, DBImagesType } from "@/src/redux/store";
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Hidden from '@mui/material/Hidden';
import Carousel from 'react-slick';
import Image from "next/image";
import { useRouter } from 'next/router';
import Decoration from "../Decoration/Decoration";
const ImageComponent = (props: ThumbnailImageProps) => {
  const { imageProps } = props
  const { src, alt, key, style } = imageProps
  return (
    <img src={src} alt={alt} key={key} style={style} />

  );
};
const GalleryComponent: FC = (() => {
  const router = useRouter();
  const { classes, theme, cx } = galleryStyles({});
  const [galleryImageModel, setGalleryImageModel] = useState<string>(getCookies({}).galleryImageModel as string)
  const { t, lang } = useShallowTranslation('common');
  const { dbImages } = useSelector<State, State>(state => state)
  const mobile = useMediaQuery(theme.breakpoints.down(900));
  const [images, setImages] = useState<ImageGalleryType[]>([])
  const [filterData, setFilterData] = useState([])
  const [filter, setFilter] = useState('Show all');
  const [data, setData] = useState<any>([]);
  const [isLoaded, setLoaded] = useState(true);
  useEffect(() => {
    document.getElementById('main')!.style.padding = `${mobile ? '35%' : '5%'} 0px`;
    document.getElementById('main')!.style.left = mobile ? '20px' : `50px`

  }, [])

  useEffect(() => {
    setData(dbImages);
  }, [dbImages]);

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

  const filterChildren = (name: any) => {
    if (name !== 'Show all') {
      const filteredData = dbImages.filter((a: any) => a.collectionName['title_en'] == name);
      setData(filteredData);
      setFilter(name);
    } else {
      setData(dbImages);
      setFilter('Show all');
    }

    setLoaded(false);
    setTimeout(() => {
      setLoaded(true);
    }, 700);
  }

  useEffect(() => {
    if (data.length !== 0) {
      setImages(() => {
        return data.filter((a: DBImagesType) => a.product_name_en == galleryImageModel)[0]?.['gallery'] || []
      })

      setFilterData((prevState: any) => {
        if (prevState.filter((a: any) => a.title_en == 'Show all').length == 0) {
          prevState.unshift({
            _id: uuidv4(),
            title_en: 'Show all',
            title_th: 'แสดงทั้งหมด'
          }, ...data?.[0]?.['collectionData'])
        }
        return prevState
      })
    }
  }, [data, lang, galleryImageModel])
  const [index, setIndex] = useState(-1);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;
  const handleClick = (index: number, item: any) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);
  return (
    <>
      <div className={classes.root} id="top">
        <Container sx={{ mb: 10 }}>
          <Typography variant="h4">
            {t('gallery')}
          </Typography>
          <div className={classes.filter}>
            {
              filterData.map((a: any, index: number) => {
                return (
                  <Button key={a._id}
                    onClick={() => filterChildren(a.title_en)}
                    className={filter === a[`title_${lang}`] ? classes.selected : ''}>
                    {a[`title_${lang}`]}
                  </Button>
                )
              })
            }
          </div>
          <Decoration />
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block', } }}>
            <div className={classes.massonry}>
              {data.length !== 0 &&
                data.map((model: DBImagesType, index: number) => {
                  const bgImageArr = model.gallery.filter((a: any) => a.isSelected)
                  let bgImage: string;
                  if (bgImageArr.length !== 0) {
                    bgImage = bgImageArr[0]?.['src']
                  } else {
                    bgImage = model.gallery[0]?.['src']
                  }
                  return (
                    <div
                      className={cx(classes.item, isLoaded && classes.loaded)}
                      key={model._id}
                      style={{ transitionDuration: index / 4 + 's', cursor: 'pointer' }} onClick={() => {
                        setCookie('galleryImageModel', model.product_name_en, {});
                        setGalleryImageModel(model.product_name_en)
                      }}>
                      <Paper className={cx(classes.imgThumb, setSize('short'))}>
                        <div className={classes.figure}>
                          <div className={classes.img} style={{ backgroundImage: `url(${bgImage})` }} />
                        </div>
                        <div className={cx(classes.detail, galleryImageModel == model['product_name_en'] && classes.selectHoverReplica)} >
                          <Typography variant="h6" >{model[`product_label_${lang}` as keyof typeof model]}</Typography>
                        </div>
                      </Paper>
                    </div>
                  )
                })}
            </div>
            {data.length < 1 && (
              <Typography variant='button' component='p' align='center'>
                No data to display yet
              </Typography>
            )}
          </Box>
          <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', } }}>
            <Carousel {...settings} style={{ cursor: 'pointer' }} >
              {data.length !== 0 &&
                data.map((model: DBImagesType, index: number) => {
                  const bgImageArr = model.gallery.filter((a: any) => a.isSelected)
                  let bgImage: string;
                  if (bgImageArr.length !== 0) {
                    bgImage = bgImageArr[0]?.['src']
                  } else {
                    bgImage = model.gallery[0]?.['src']
                  }
                  return (
                    <div className={classes.itemCarousel} key={model._id} onClick={() => {
                      setCookie('galleryImageModel', model.product_name_en, {});
                      setGalleryImageModel(model.product_name_en)
                    }}>
                      <Paper className={cx(classes.imgThumb, setSize('long'))}>
                        <div className={classes.figure}>
                          <div className={classes.img} style={{
                            backgroundImage: `url(${bgImage})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat'
                          }} />
                        </div>
                        <div className={classes.detail}>
                          <Typography variant="h6" >{model[`product_label_${lang}` as keyof typeof model]}</Typography>
                        </div>
                      </Paper>
                    </div>
                  )
                })}
            </Carousel>
          </Box>
          <Gallery images={images}
            onClick={handleClick}
            enableImageSelection={false}
            margin={2}
            thumbnailImageComponent={ImageComponent}
          />

          {!!currentImage && (
            <Lightbox
              mainSrc={currentImage.src}
              imageTitle={currentImage!.tags?.[0]?.['title']}
              mainSrcThumbnail={currentImage.src}
              nextSrc={nextImage.src}
              nextSrcThumbnail={nextImage.src}
              prevSrc={prevImage.src}
              prevSrcThumbnail={prevImage.src}
              onCloseRequest={handleClose}
              onMovePrevRequest={handleMovePrev}
              onMoveNextRequest={handleMoveNext}
              imageCaption={currentImage!.tags?.[0]?.['value']}

            />
          )}
        </Container>
        <SocialMedia />
      </div>
    </>
  )
})

export default GalleryComponent