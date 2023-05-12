import { FC, useState, useEffect, useContext } from "react";


//Mui Components
import MuiCardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { makeStyles } from "tss-react/mui";
import useMediaQuery from '@mui/material/useMediaQuery';
import { GridSize } from '@mui/material/Grid';
import { useReadLocalStorage } from 'usehooks-ts';
import Avatar from '@mui/material/Avatar'
import SvgIcon from '@mui/material/SvgIcon'

//Hooks
import useCurrentRouteState from '@/hookes/useCurrentRouteState'
import { DataShowCtx } from '@/shared/DataShow/useDataShow';

import { Player } from 'video-react';
import YouTube from 'react-youtube';
import { useSelector } from "react-redux";
import { State } from "@/src/redux/store";

const cardContent = makeStyles<{ gridView: GridSize, elRefs: any }>()((theme, { gridView, elRefs }) => {
  return {
    icon: {
      border: `solid 1px ${theme.palette.secondary.main}`,
      maxWidth: '130px',
      maxHeight: '130px',
      minWidth: '130px',
      minHeight: '130px',
      margin: '-10px auto 0',
      borderRadius: '50%',
      overflow: 'hidden',
      padding: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    IconAvatar: {
      maxWidth: '130px',
      maxHeight: '130px',
      minWidth: '130px',
      minHeight: '130px',
    },
    svgIcon: {
      maxWidth: '60px',
      maxHeight: '60px',
      minWidth: '60px',
      minHeight: '60px',
    },
    video: {
      minHeight: '100%'
    },
    image: {
      maxWidth: '130px',
      maxHeight: '130px',
      minWidth: '130px',
      minHeight: '130px',
      margin: '-10px auto 0',
      borderRadius: '50%',
      overflow: 'hidden',
    },
    iso2: {
      maxWidth: '200px',
      maxHeight: gridView == 2 ? '90px' : '130px',
      minWidth: gridView == 2 ? elRefs?.['current']?.[`offsetWidth`] - 30 : '200px',
      minHeight: gridView == 2 ? '90px' : '130px',
      margin: '-10px auto 15px',
      borderRadius: 5,
      objectFit: "revert",
      overflow: 'hidden',
    }
  }
})

export interface CardContentTypes {
  elRefs: any;
  media: string;
  path: string;
  isYoutube?: boolean;
  colorCode?: string;
}

const CardContent: FC<CardContentTypes> = ((props: CardContentTypes) => {
  const { elRefs, media, path, isYoutube, colorCode } = props
  const currentRouteState = useCurrentRouteState();
  const { modelName, predefineDb, activeOnly } = currentRouteState;
  const { totalData } = useSelector<State, State>((state) => state);

  const gridView: GridSize = useReadLocalStorage(`${modelName}_gridView`)!
  const { classes, theme } = cardContent({ gridView, elRefs });
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const sm = useMediaQuery(theme.breakpoints.only('sm'));
  const md = useMediaQuery(theme.breakpoints.only('md'));
  const lg = useMediaQuery(theme.breakpoints.only('lg'));
  const xl = useMediaQuery(theme.breakpoints.only('xl'));
  const { setGridView } = useContext(DataShowCtx);


  const [cardHeight, setCardHeight] = useState<number>(
    gridView == 2 ? 130
      : gridView == 3 ? 200
        : gridView == 4 ? 300
          : gridView == 6 ? 400 : 700)

  useEffect(() => {
    if (totalData.length !== 0) {
      if (xs) {
        setGridView(() => 12)
        setCardHeight(250)
      }
      if (sm) {
        setCardHeight(elRefs?.['current']?.[`offsetWidth`])
      }
      if (md) {
        setCardHeight(350)
      }
      if (lg) {

        setCardHeight(200)
      }
      if (xl) {
        setCardHeight(gridView == 2 ? 130
          : gridView == 3 ? 200
            : gridView == 4 ? 300
              : gridView == 6 ? 400 : 800)
      }
    }
  }, [xs, sm, md, lg, xl, cardHeight, elRefs])


  return (
    <MuiCardContent>
      {(() => {
        switch (media) {
          case 'icon':
            return (
              <CardMedia className={classes.icon}>
                <Avatar className={classes.IconAvatar}>
                  <SvgIcon color="secondary" className={classes.svgIcon}>
                    <path d={path} />
                  </SvgIcon>
                </Avatar>
              </CardMedia>
            )
          case 'profileImage' as any:
          case 'logoImage' as any:
          case 'imageShow' as any:
            const replaceImage =
              media == 'profileImage' ? '/admin/images/faces/avatar1.jpg' :
                media == 'logoImage' ? '/admin/images/faces/avatar1.jpg' : media
            return (
              <CardMedia
                component="img"
                height="194"
                className={classes.image}
                image={path || replaceImage}
                alt=""
              />
            )

          case `img_light|img_dark` as any:
            const replaceImageTheme =
              media == 'profileImage' ? '/admin/images/faces/avatar1.jpg' :
                media == 'logoImage' ? '/admin/images/faces/avatar1.jpg' : media.split('|')[1]
            return (
              <CardMedia
                component="img"
                height="194"
                className={classes.image}
                image={path || replaceImageTheme}
                alt=""
              />
            )
          case `gallery` as any:
            const replaceImageProduct =
              media == 'gallery' ? '/admin/images/faces/avatar1.jpg' : media

            return (
              <CardMedia
                component="img"
                height="194"
                className={classes.image}
                image={path?.[`src` as keyof typeof path] as string || replaceImageProduct}
                alt=""
              />
            )
          case 'color':
            return (
              <CardMedia className={classes.icon}>
                <Avatar sx={{ bgcolor: colorCode }} className={classes.IconAvatar}>
                  {path.charAt(0).toUpperCase()}
                </Avatar>
              </CardMedia>
            )
          case 'iso2' as any:
            return (
              <CardMedia
                component="img"
                height="194"
                className={classes.iso2}
                image={`/admin/flags/256x256/${path.toLowerCase()}.png`}
                alt=""
              />
            )
          case 'videoLink' as any:
          case 'youTubeId' as any:
            return (
              <CardMedia className={classes.video}>
                {isYoutube ?
                  <YouTube
                    videoId={path}
                    style={{
                      borderRadius: 15,
                      zIndex: 1,
                      // display: 'flex',
                      height: cardHeight,
                      overflow: 'hidden',
                    }}
                    opts={{
                      width: gridView == 2 ? elRefs?.['current']?.[`offsetWidth`] - 30 : '100%',
                      height: cardHeight,
                      playerVars: {
                        autoplay: 1,
                        cc_load_policy: 0,
                        controls: 0,
                        loop: true,
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                        mute: 1,
                        origin: process.env.NEXT_PUBLIC_ADMIN_URL,
                        fs: 0,
                      }
                    }}
                  /> : <Player
                    aspectRatio='auto'
                    autoPlay
                    width={elRefs?.['current']?.[`offsetWidth`] == undefined ? '100%' : elRefs?.['current']?.[`offsetWidth`] - 30}
                    height={cardHeight}
                    fluid={false}
                    preload='auto'
                    muted
                    src={path}
                  />}
              </CardMedia>
            )
        }
      })()}
    </MuiCardContent>
  )
})

export default CardContent;