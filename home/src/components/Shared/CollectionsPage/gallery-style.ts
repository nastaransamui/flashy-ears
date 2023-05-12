import { makeStyles } from 'tss-react/mui';
import { alpha } from '@mui/material/styles';
const galleryStyles = makeStyles<{}>({
  name: 'GalleryPage',
  uniqId: 'uniqeIDgalleryPage',
})((theme, _params, classes: any) => {
  return {
    overlay__caption: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      maxHeight: 240,
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      width: '100%',
      color: 'white',
      padding: 2,
      fontSize: '90%',
    },
    ReactGridGallery_tile_description: {
      background: theme.palette.background.paper,
    },
    root: {
      position: 'relative',
    },
    loaded: {
      transition: 'all 0.3s ease-out',
      opacity: 1,
      paddingTop: 0,
    },
    selected: {
      background: `rgba(0, 0, 0, 0.87) !important`,
      color: 'white' + ' !important ',
    },
    filter: {
      position: 'relative',
      zIndex: 20,
      display: 'flex',
      overflow: 'auto',
      width: '100%',
      padding: theme.spacing(3, 0),
      [theme.breakpoints.down('sm')]: {
        paddingTop: 0,
      },
      '& > button': {
        background: 'transparent',
        borderRadius: 40,
        marginRight: theme.spacing(),
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.text.primary,
        whiteSpace: 'nowrap',
        minWidth: 100,
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(1, 4),
          marginRight: theme.spacing(3),
        },
      },
    },
    massonry: {
      columns: `${3} 300px`,
      columnGap: theme.spacing(4),
    },
    item: {
      marginBottom: theme.spacing(4),
      breakInside: 'avoid',
      opacity: 0,
      position: 'relative',
      paddingTop: 20,
    },
    itemCarousel: {
      position: 'relative',
    },
    figure: {
      height: '100%',
      width: '100%',
      position: 'relative',
      margin: 0,
      overflow: 'hidden',
      WebkitMaskImage: '-webkit-radial-gradient(white, black)',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: -80,
        left: -100,
        opacity: 0.8,
        width: 160,
        height: 160,
        transform: 'rotate(-35deg)',
        backgroundImage: `linear-gradient(120deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
      },
    },
    img: {
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      transform: 'scale(1.1)',
      transition: 'transform 0.2s ease-out',
    },
    imgThumb: {
      border: `8px solid ${theme.palette.background.paper}`,
      position: 'relative',
      '&:before': {
        content: '""',
        left: -13,
        bottom: -8,
        width: '30%',
        height: '100%',
        border: '4px solid',
        borderImageSource: `linear-gradient(120deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
        borderImageSlice: 1,
        borderTop: 0,
        borderRight: 0,
        position: 'absolute',
        [theme.breakpoints.down('xs')]: {
          display: 'none',
        },
      },
      [`&:hover .${classes.img}`]: {
        transform: 'scale(1)',
      },
      [`&:hover .${classes.detail}`]: {
        opacity: 1,
        backgroundPosition: '60% 0',
        '& h6, & a': {
          transform: 'translate(0, 0)',
        },
      },
    },
    selectHoverReplica: {
      opacity: 1 + ' !important',
      backgroundPosition: '60% 0 !important',
      '& h6, & a': {
        transform: 'translate(0, 0) !important',
      },
    },
    detail: {
      position: 'absolute',
      transition: 'opacity 0.3s ease-out, background-position 3s ease-out',
      width: '100%',
      height: '100%',
      bottom: 0,
      opacity: 0,
      background: `linear-gradient(329deg, ${
        theme.palette.secondary.main
      }, ${alpha(theme.palette.primary.main, 0)})`,
      backgroundSize: '300%',
      backgroundPosition: '0% 0',
      padding: theme.spacing(3),
      color: theme.palette.common.white,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      '& > *': {
        transition: 'all 0.4s ease-out',
      },
      '& h6': {
        position: 'relative',
        marginBottom: theme.spacing(3),
        lineHeight: '36px',
        fontSize: 18,
        textDecoration: 'underline',
        color: theme.palette.common.white,
        transform: 'translate(0, 30px)',
      },
      '& a': {},
    },
    short: {
      height: 240,
      [theme.breakpoints.down('md')]: {
        height: 210,
      },
      [`.${classes.img}`]: {
        width: '100%',
      },
      '&::before': {
        width: 80,
        height: 80,
      },
    },
    medium: {
      height: 320,
      [theme.breakpoints.down('xs')]: {
        height: 210,
      },
      [`.${classes.img}`]: {
        width: '100%',
      },
    },
    long: {
      height: 480,
      [theme.breakpoints.down('xs')]: {
        height: 210,
      },
      [`.${classes.img}`]: {
        height: '100%',
        backgroundPosition: 'center',
      },
      '&::before': {
        width: 190,
        height: 260,
      },
      [`.${classes.figure}`]: {
        '&:after': {
          width: 300,
          height: 300,
          left: -200,
          bottom: -120,
        },
      },
    },
  };
});
export default galleryStyles;
