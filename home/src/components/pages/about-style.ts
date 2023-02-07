import { makeStyles } from 'tss-react/mui';
const useStyles = makeStyles<{}>({
  name: 'AboutPage',
  uniqId: 'uniqeIDaboutPage',
})((theme, _params, classes: any) => {
  return {
    container: {
      height: '55vh',
      [theme.breakpoints.down(900)]: {
        height: '200%',
      },
      borderBottom: `1px solid ${
        theme.palette.mode == 'dark'
          ? theme.palette.secondary.main
          : theme.palette.primary.main
      }`,
      background: theme.palette.background.default,
    },
    main: {
      display: 'block',
      position: 'relative',
      zIndex: 1,
      [theme.breakpoints.down(600)]: {
        height: '100%',
        // marginLeft: 300,
      },
    },
    grid: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-evenly',
      minWidth: '33%',
      // flexDirection: 'column',
      [theme.breakpoints.down(900)]: {
        flexDirection: 'column',
      },
      '&::after': {
        content: '" "',
        background: 'rgba(202, 202, 202, 0.4)',
        opacity: 0,
        position: 'absolute',
        pointerEvents: 'none',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        WebkitTransition: 'opacity 0.5s',
        transition: 'opacity 0.5s',
      },
    },
    grid__item: {
      padding: `45px 55px 30px`,
      position: 'relative',
      color: theme.palette.text.disabled,
      minHeight: 300,
      minWidth: '33%',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      WebkitBoxDirection: 'normal',
      WebkitBoxOrient: 'vertical',
      WebkitFlexDirection: 'column',
      msFlexDirection: 'column',
      WebkitJustifyContent: 'center',
      [`&:hover .${classes.loader}`]: {
        height: 2,
      },
      zIndex: 10,
      '&::before': {
        position: 'absolute',
        content: '" "',
        top: 0,
        right: 55,
        bottom: 0,
        left: 55,
        border: `1px solid ${
          theme.palette.mode == 'dark'
            ? theme.palette.secondary.main
            : theme.palette.primary.main
        }`,
      },
      '&:hover': {
        WebkitFilter: 'none',
        filter: 'none',
        color: theme.palette.text.color,
      },
      '&:hover:before': {
        border: `3px solid ${
          theme.palette.mode == 'dark'
            ? theme.palette.secondary.main
            : theme.palette.primary.main
        }`,
      },
      '&:focus': {
        WebkitFilter: 'none',
        filter: 'none',
      },
      [theme.breakpoints.down(600)]: {
        padding: `45px 45px 30px`,
      },
    },
    title: {
      margin: 0,
      fontSize: '2.875em',
      textAlign: 'center',
    },
    titleFull: {
      fontSize: '3.25em',
      color: theme.palette.text.color,
    },
    grid__item__animate: {
      webkitTransitionDelay: '0s',
      transitionDelay: `0s`,
      opacity: 0,
      WebkitTransform: `translate3d(0, -20px, 0)`,
      transform: `translate3d(0, -20px, 0)`,
    },
    titlePreview: {
      WebkitFlex: 1,
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      transition: `transform 0.2s, opacity 0.2s`,
      transitionDelay: '0.15s',
    },
    loader: {
      height: 2,
      width: '40%',
      margin: `1em auto`,
      position: `relative`,
      background:
        theme.palette.mode == 'dark'
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
      transition: `transform 0.2s, opacity 0.2s, height 0.2s`,
      transitionTimingFunction: `cubic-bezier(0.7, 0, 0.3, 1)`,
      '&::before': {
        position: 'absolute',
        content: '" "',
        width: '100%',
        height: 2,
        background: theme.palette.text.color,
        left: 0,
        top: -1,
        transition: 'transform 1s',
        webkitTransform: `scale3d(0, 1, 1)`,
        transform: `scale3d(0, 1, 1)`,
        webkitTransformOrigin: `0% 50%`,
        transformOrigin: `0% 50%`,
      },
    },
    category: {
      margin: 0,
      position: 'relative',
      fontSize: '0.95em',
      fontStyle: 'italic',
      textAlign: 'center',
      display: 'block',
      transition: `transform 0.2s, opacity 0.2s`,
      transitionTimingFunction: `cubic-bezier(0.7, 0, 0.3, 1)`,
      transitionDelay: '0s',
    },
    categoryFull: {
      fontSize: '1.25em',
      marginBottom: 20,
      color: theme.palette.text.color,
      opacity: 1,
    },
    meta: {
      fontSize: `0.765em`,
      textAlign: 'left',
      '&::before': {
        content: '" "',
        display: 'table',
        clear: 'both',
      },
      '&::after': {
        content: '" "',
        display: 'table',
      },
    },
    metaPreview: {
      filter: `grayscale(50%)`,
      '&:hover': {
        filter: 'none',
      },
    },
    meta__avatar: {
      display: 'block',
      height: 90,
      width: 90,
      // borderRadius: `50%`,
      margin: `2em auto`,
      // filter: `grayscale(50%)`,
      '&:hover': {
        filter: 'none',
      },
    },
    metaFull: {
      fontSize: '1em',
      margin: '0 auto 2em',
      maxWidth: 1200,
    },
    meta__author: {
      display: 'block',
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 20,
    },
    content: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: `100%`,
      pointerEvents: 'none',
      height: 0,
      visibility: 'hidden',
      zIndex: 400,
      overflow: 'hidden',
    },
    scrollWrap: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      zIndex: 1,
      overflowY: 'scroll',
      WebkitOverflowScrolling: `touch`,
    },
    content__item: {
      position: 'absolute',
      top: 0,
      width: '100%',
      overflow: 'hidden',
      height: 0,
      opacity: 0,
      padding: '60px 60px 80px 60px',
      pointerEvents: 'none',
      fontSize: `0.85em`,
    },
    placeholder: {
      pointerEvents: 'none',
      position: 'absolute',
      width: 'calc(100% + 5px)',
      height: 'calc(100vh + 5px)',
      zIndex: 100,
      top: 0,
      left: 0,
      background: theme.palette.background.default,
      webkitTransformOrigin: `0 0`,
      transformOrigin: `0 0`,
    },
    placeholderTransIn: {
      webkitTransition: `-webkit-transform 0.5s`,
      transition: `transform 0.5s`,
      webkitTransitionTimingFunction: `cubic-bezier(0.165, 0.84, 0.44, 1)`,
      transitionTimingFunction: `cubic-bezier(0.165, 0.84, 0.44, 1)`,
    },
    placeholderTransOut: {
      transition: 'transform 0.5s',
      WebkitTransition: '-webkit-transform 0.5s',
    },
    viewSingle: {
      opacity: 1,
    },
    closeButton: {
      position: 'absolute',
      border: 'none',
      background: 'transparent',
      margin: 0,
      zIndex: 100,
      top: 0,
      right: 0,
      fontSize: 18,
      color:
        theme.palette.mode == 'dark'
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
      cursor: 'pointer',
      // pointerEvents: 'none',
      padding: `20px 30px`,
      opacity: 1,
      // -webkit-touch-callout: none,
      // -webkit-user-select: none,
      // -khtml-user-select: none,
      // -moz-user-select: none,
      // -ms-user-select: none,
      userSelect: 'none',
      // -webkit-transition: opacity 0.3s,
      transition: 'opacity 0.3s',
      '& span': {
        display: 'none',
      },
      '&:hover': {
        color:
          theme.palette.mode == 'dark'
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
      },
    },
    noscroll: { overflow: 'hidden' },
    closeButtonShow: {
      opacity: 1,
      pointerEvents: 'auto',
    },
    grid__item_loading: {
      transition: `transform 1s`,
      transitionTimingFunction: `cubic-bezier(0.165, 0.84, 0.44, 1)`,
      transform: `scale3d(1, 1, 1)`,
      [`.${classes.loader}`]: {
        '&::before': {
          transition: `transform 1s`,
          transitionTimingFunction: `cubic-bezier(0.165, 0.84, 0.44, 1)`,
          transform: `scale3d(1, 1, 1)`,
        },
      },
    },
    content__item__show: {
      height: 'auto',
      minHeight: '100vh',
      opacity: 1,
      pointerEvents: 'auto',
      WebkitTransition: 'opacity 0.6s',
      // transition: 'opacity 0.6s',
      background: theme.palette.background.default,
    },
    contentShow: {
      height: '100vh',
      pointerEvents: 'auto',
      visibility: 'visible',
    },
  };
});
export default useStyles;
