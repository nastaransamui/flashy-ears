
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
import { getCookie, getCookies, setCookie } from "cookies-next";



const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];
const models = ["bell",
  "crookedTriangle",
  "diamond",
  "longTriangle",
  "octagon",
  "oval",
  "socks",
  "square",
  "squareWithHole",
  "triangle",]

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',

}));

import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import { useSelector } from "react-redux";
import { State, DBImagesType } from "@/src/redux/store";
import { getGalleryImages } from 'apiCalls/getGalleryImages';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ImageComponent = (props: ThumbnailImageProps) => {
  const { imageProps } = props
  const { src, alt, key, style } = imageProps
  return (
    <img src={src} alt={alt} key={key} style={style} />

  );
};





const GalleryPage: FC = (() => {

  const { classes, theme, cx } = galleryStyles({});
  const [galleryImageModel, setGalleryImageModel] = useState<string>(getCookies({}).galleryImageModel as string)
  const { t, lang } = useShallowTranslation('common');
  const { dbImages } = useSelector<State, State>(state => state)
  const mobile = useMediaQuery(theme.breakpoints.down(900));
  const [images, setImages] = useState<ImageGalleryType[]>([])
  useEffect(() => {
    document.getElementById('main')!.style.padding = `${mobile ? '35%' : '5%'} 0px`;
    document.getElementById('main')!.style.left = mobile ? '20px' : `50px`

  }, [])


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

  useEffect(() => {
    if (dbImages.length > 0) {
      let ImageCreate: ImageGalleryType[] = []
      dbImages.forEach((doc, i) => {
        ImageCreate.push({
          src: doc.src,
          width: 320,
          height: 212,
          caption: doc[`caption_${lang}` as keyof typeof doc],
          customOverlay: (
            <div className={classes.overlay__caption}>
              <div>{doc[`caption_${lang}` as keyof typeof doc]}</div>
            </div>
          ),
          thumbnailCaption: (
            <div className={classes.ReactGridGallery_tile_description}>{doc[`caption_${lang}` as keyof typeof doc]}</div>
          ),
        })
      })

      setImages((prevState) => {
        prevState = []
        return ImageCreate
      })

    }

  }, [dbImages, lang])



  useEffect(() => {
    const getNewImages = async () => {
      return await getGalleryImages(galleryImageModel)
    }
    getNewImages()
      .then((res) => {
        let ImageCreate: ImageGalleryType[] = []
        res.forEach((doc: DBImagesType, i: number) => {
          ImageCreate.push({
            src: doc.src,
            width: i == 20 ? 270 : 320,
            height: 212,
            caption: doc[`caption_${lang}` as keyof typeof doc],
            customOverlay: (
              <div className={classes.overlay__caption}>
                <div>{doc[`caption_${lang}` as keyof typeof doc]}</div>
              </div>
            ),
            // thumbnailCaption: (
            //   <div className={classes.ReactGridGallery_tile_description}>{doc[`caption_${lang}` as keyof typeof doc]}</div>
            // ),
          })
        })

        setImages((prevState) => {
          prevState = []
          return ImageCreate
        })
      })
      .catch(console.error)
  }, [galleryImageModel, getCookie('galleryImageModel'), theme.palette.mode])




  return (
    <SideBar >
      <>
        <Box sx={{ width: '95%', minHeight: 393 }}  >
          <Masonry columns={4} spacing={2}>
            {models.map((model, index) => (
              <Item key={index} sx={{
                height: heights[index], display: 'flex', justifyContent: 'center', alignItems: 'center',
                boxShadow: model == galleryImageModel ? `rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;` : ''
              }} onClick={() => {
                setCookie('galleryImageModel', model, {});
                setGalleryImageModel(model)
              }}>
                {t(`${model}`)}
              </Item>
            ))}
          </Masonry>
        </Box>
        <Gallery images={images}
          onClick={handleClick}
          enableImageSelection={false}
          // maxRows={6}
          margin={2}
          thumbnailImageComponent={ImageComponent}
        />

        {!!currentImage && (
          <Lightbox
            mainSrc={currentImage.src}
            imageTitle={currentImage.caption}
            mainSrcThumbnail={currentImage.src}
            nextSrc={nextImage.src}
            nextSrcThumbnail={nextImage.src}
            prevSrc={prevImage.src}
            prevSrcThumbnail={prevImage.src}
            onCloseRequest={handleClose}
            onMovePrevRequest={handleMovePrev}
            onMoveNextRequest={handleMoveNext}
          />
        )}
        <SocialMedia />
      </>
    </SideBar>
  )
})

export default GalleryPage