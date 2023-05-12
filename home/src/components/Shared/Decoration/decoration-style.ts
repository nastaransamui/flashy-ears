import { makeStyles } from 'tss-react/mui';

const decorationStyles = makeStyles<{}>({
  name: 'DecorationPage',
  uniqId: 'uniqeIDgalleryPage',
})((theme, _params, classes: any) => {
  return {
    parallaxWrap: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      top: 0,
      left: 0,
      zIndex: 0,
      '& > div': {
        '& > div': {
          top: 400,
        },
      },
    },
    bannerParallaxWrap: {
      height: 800,
      top: 200,
      width: '100%',
      position: 'absolute',
      display: 'block',
      '& > div': {
        width: '100%',
        display: 'block',
        position: 'absolute',
        top: 0,
        '& > svg': {},
      },
    },
    parallaxVertical: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      [theme.breakpoints.up('lg')]: {
        transform: 'scale(0.5)',
      },
      [theme.breakpoints.up('xl')]: {
        display: 'none',
      },
    },
    parallaxDot: {
      // top: 420,
      fill: theme.palette.text.hint,
      width: 3045,
      height: 2099,
      opacity: 0.2,
      right: -1000,
      // left: 200,
    },
    parallaxTriangle: {
      // fill: theme.palette.text.hint,
      width: 3045,
      height: 3099,
      opacity: 0.2,
      // right: -1000,
      // top: 100,
      // outline: theme.palette.text.hint,
      // opacity: 1,
      // width: 2902,
      // height: 1042,
      // stroke: theme.palette.text.hint,
      // fill: theme.palette.primary.main,
      // strokeWidth: 0,
      // right: 0,
      // left: 0,
    },
    parallaxCircle: {
      top: 250,
      width: 600,
      height: 570,
      opacity: 0.1,
      stroke: theme.palette.text.hint,
      fill: 'transparent',
      strokeWidth: 40,
      right: 40,
    },
  };
});

export default decorationStyles;
