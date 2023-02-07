import { makeStyles } from 'tss-react/mui';

const ImageStyle = makeStyles<{}>({
  name: 'ImageStyle',
  uniqId: 'uniqueImageStyle',
})((theme, params, classes) => {
  return {
    slideshow: {
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
    },
    slides: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    slide: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity: 0,
      PointerEvent: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    current: {
      opacity: 1,
      pointerEvents: 'auto',
    },
    slide__img: {
      position: 'absolute',
      top: '-200px',
      left: '-200px',
      width: 'calc(100% + 400px)',
      height: 'calc(100% + 400px)',
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
    },
    slide__scroll: {
      position: 'relative',
      // top: -150,
      fontSize: '50px !important',
      cursor: 'pointer',
      color: theme.palette.text.color,
      zIndex: 200,
    },
    slide__title: {
      position: 'relative',
      left: -1300,
      transitionDuration: '2000ms',
      fontSize: '12vw',
      margin: 0,
      cursor: 'default',
      lineHeight: 1,
      color: 'white',
    },
    slide__desc: {
      position: 'relative',
      left: 1300,
      fontSize: `1.5em`,
      cursor: `default`,
      color: 'white',
      padding: `0 1em`,
      textAlign: `center`,
    },
    slide__link: {
      position: 'relative',
      right: -1300,
      fontSize: `1em`,
      fontWeight: `bold`,
      padding: `1em 2em`,
      display: `block`,
      color: theme.palette.primary.main,
      background: theme.palette.secondary.main,
      borderRadius: 8,
      cursor: 'pointer',
      zIndex: 200,
    },
    shape: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      pointerEvents: 'none',
    },
    span: {
      position: 'relative',
    },
    linkParent: {
      zIndex: 22222,
      cursor: 'pointer',
      marginTop: 100,
    },
  };
});
export default ImageStyle;
