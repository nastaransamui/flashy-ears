import { makeStyles } from 'tss-react/mui';
import { darken } from '@mui/material/styles';
import { CSSProperties } from 'react';

const CollectionStyle = makeStyles<{}>({
  name: 'Collection',
  uniqId: 'uniqeIDcollection',
})((theme, _params, classes: any) => {
  return {
    dummyMenu: {
      border: 0,
      background: 'none',
      padding: 0,
      margin: '2.75em 2.5em 0 0',
      position: 'fixed',
      top: 0,
      right: 0,
      fontSize: '0.85em',
      color: theme.palette.text.color,
      // visibility: 'hidden',
      display: 'none',
    },
    content: {
      position: 'relative',
      display: 'block',
      // zIndex: 1,
    },
    grid: {
      margin: '10em auto 7em',
      position: 'relative',
      padding: '0 1em',
      width: '100%',
      maxWidth: '1000px',
      display: 'grid',
      gridTemplateColumns: `repeat(2, 1fr)`,
      [theme.breakpoints.down(640)]: {
        padding: '0 1vw',
      },
    },
    grid__item: {
      padding: '0 4vw',
      margin: '0 0 12vh',
      [`&:nth-of-type(odd) .${classes.product}`]: {
        marginTop: '-8em',
      },
      [theme.breakpoints.down(640)]: {
        padding: '0 2vw',
      },
    },
    product: {
      height: '100%',
      paddingTop: '10em',
      position: 'relative',
      // cursor: 'pointer',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      '&:hover': {
        color: theme.palette.primary.main,
      },
      [`&:hover .${classes.product__img_back}`]: {
        transform: 'scale(1.1)',
      },
      [`&:hover .${classes.product__img}`]: {
        transform: 'scale(1.1)',
      },
      [`&:hover .${classes.product__subtitle}`]: {
        color:
          theme.palette.mode == 'dark'
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
        fontSize: '0.96em',
      },
      [theme.breakpoints.down(640)]: {
        fontSize: '0.75em',
      },
    },
    product__bg: {
      height: '20em',
      background: theme.palette.background.paper,
      position: 'relative',
      transition: 'all 0.3s',
      cursor: 'zoom-in',
      [theme.breakpoints.down(640)]: {
        height: '10em',
      },
    },
    product__img_back: {
      opacity: 1,
      transform: '',
      transitionDelay: '1.3s',
      maxHeight: '25em',
      margin: '0 auto',
      display: 'block',
      position: 'absolute',
      transition: 'all 1.3s',
      top: 0,
      left: '25%',
      pointerEvents: 'none',
      [theme.breakpoints.down(640)]: {
        maxHeight: '11em',
        top: 100,
        left: '10%',
      },
    },
    product__img_back_turn: {
      opacity: 0,
      transform: 'rotateY(90deg)',
      transitionDelay: '0.3s',
      maxHeight: '25em',
      margin: '0 auto',
      display: 'block',
      position: 'absolute',
      transition: 'all 1.3s',
      top: 0,
      left: '25%',
      pointerEvents: 'none',
      [theme.breakpoints.down(640)]: {
        maxHeight: '11em',
        top: 100,
        left: '10%',
      },
    },

    product__img: {
      opacity: 0,
      transform: 'rotateY(90deg)',
      transitionDelay: '0.3s',
      maxHeight: '25em',
      margin: '0 auto',
      display: 'block',
      position: 'absolute',
      transition: 'all 1.3s',
      top: 0,
      left: '25%',
      pointerEvents: 'none',
      [theme.breakpoints.down(640)]: {
        maxHeight: '11em',
        top: 100,
        left: '10%',
      },
    },
    product__img_turn: {
      opacity: 1,
      transform: '',
      transitionDelay: '1.3s',
      maxHeight: '25em',
      margin: '0 auto',
      display: 'block',
      position: 'absolute',
      transition: 'all 1.3s',
      top: 0,
      left: '25%',
      pointerEvents: 'none',
      [theme.breakpoints.down(640)]: {
        maxHeight: '11em',
        top: 100,
        left: '10%',
      },
    },
    badge: {
      transition: 'all 0.34s',
      WebkitTransition: 'all 0.34s',
      MozTransition: 'all 0.34s',
      border: `2px solid ${theme.palette.text.color}`,
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'inline-block',
      height: 23,
      marginRight: 5,
      position: 'relative',
      width: 23,
      '&:hover': {
        borderColor:
          theme.palette.mode == 'dark'
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
      },
      [theme.breakpoints.down(640)]: {
        border: `0.5px solid ${theme.palette.text.color}`,
        width: 10,
        height: 10,
      },
    },
    badgeColors: {
      position: 'relative',
      top: 8,
      textAlign: 'center',
    },
    badge_black: {
      backgroundColor: '#323231',
    },
    badge_blue: {
      backgroundColor: '#012a7f',
    },
    badge_green: {
      backgroundColor: '#02d302',
    },
    badge_magneta: {
      backgroundColor: '#db2321',
    },
    badge_orange: {
      backgroundColor: '#e24206',
    },
    badge_pink: {
      backgroundColor: '#ea2251',
    },
    badge_red: {
      backgroundColor: '#fe1c00',
    },
    badge_violet: {
      backgroundColor: '#880239',
    },
    badge_white: {
      backgroundColor: '#dad4d3',
    },
    badge_yellow: {
      backgroundColor: '#dde200',
    },
    badge_yellowOrange: {
      backgroundColor: '#fb7801',
    },
    activeBadge: {
      borderColor:
        theme.palette.mode == 'dark'
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
    },
    product__title: {
      position: 'relative',
      margin: '0.5em 0 0',
      fontSize: '1.75em',
      color: theme.palette.text.color,
      fontFamily: 'Roboto',
      fontWeight: 700,
      textTransform: 'capitalize',
      [theme.breakpoints.down(640)]: {
        fontSize: '1.25em',
      },
    },
    product__subtitle: {
      position: 'relative',
      margin: 0,
      textTransform: 'uppercase',
      transition: 'all 0.3s',
      color: theme.palette.text.disabled,
      fontSize: '0.85em',
      letterSpacing: '0.115em',
    },
    product__description: {
      opacity: 0,
      position: 'absolute',
    },
    product__price: {
      opacity: 0,
      position: 'absolute',
    },
    contentRelated: {
      padding: '8em 5vw',
      fontWeight: 'bold',
      textAlign: 'center',
      background: theme.palette.background.paper,
      color: theme.palette.text.color,
      marginTop: '10px !important',
      '* >a': {
        color: theme.palette.primary.main,
      },
    },
    p: {
      '&:hover  >a': {
        color: theme.palette.secondary.main,
      },
    },
    mediaItem: {
      display: 'inline-block',
      padding: '1em',
      verticalAlign: 'top',
      transition: 'color 0.3s',
      [`&:hover .${classes.mediaItem_img}`]: {
        opacity: 1,
      },
      [`&:focus .${classes.mediaItem_img}`]: {
        opacity: 1,
      },
    },
    mediaItem_img: {
      maxWidth: '100%',
      opacity: 0.8,
      transition: 'opacity 0.3s',
    },
    mediaItem_title: {
      fontSize: '1em',
      margin: 0,
      padding: '0.5em',
      color: theme.palette.secondary.main,
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    // open image
    details: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      bottom: 0,
      left: 0,
      padding: '40vh 0 10vh 10vw',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      pointerEvents: 'none',
      [theme.breakpoints.down(640)]: {
        padding: `30vh 0 5vh 10vw`,
      },
      '& > *': {
        position: 'relative',
        opacity: 0,
      },
    },
    details__bg: {
      width: '100%',
      position: 'fixed',
      left: '0',
      transformOrigin: '0 0',
    },
    details__bg_up: {
      top: 0,
      height: '100vh',
      background: theme.palette.background.default,
    },
    details__bg_down: {
      top: '40vh',
      height: '60vh',
      background: theme.palette.background.paper,
      [theme.breakpoints.down(640)]: {
        top: '30vh',
        height: '70vh',
      },
    },
    details__img: {
      position: 'absolute',
      top: '10vh',
      right: '10vh',
      height: '80vh',
      transformOrigin: '0 0',
      [theme.breakpoints.down(640)]: {
        right: '-12vh',
      },
    },
    details__title: {
      margin: '-1.5em 0 0.1em',
      fontSize: '4.5em',
      color:
        theme.palette.mode == 'dark'
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
      fontFamily: 'Roboto',
      fontWeight: 700,
      textTransform: 'capitalize',
      [theme.breakpoints.down(640)]: {
        fontSize: '2em',
      },
    },
    details__deco: {
      width: '7em',
      height: 50,
      // backgroundPosition: '50% 50%',
      // backgroundSize: '200%',
      // backgroundColor: 'yellowGreen',
      [theme.breakpoints.down(640)]: {
        height: 7,
        width: '4em',
      },
    },
    details__subtitle: {
      textTransform: 'uppercase',
      margin: '0.75em 0 1em 0',
      letterSpacing: '0.115em',
      fontSize: '1.75em',
      color: theme.palette.text.color,
      [theme.breakpoints.down(640)]: {
        fontSize: '1em',
      },
    },
    details__price: {
      fontSize: '3em',
      fontWeight: 'bold',
      color:
        theme.palette.mode == 'dark'
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
      [theme.breakpoints.down(640)]: {
        fontSize: '1.5em',
      },
    },
    details__description: {
      [theme.breakpoints.down(640)]: {
        fontSize: '0.85em',
        margin: '1em 0 0 0',
        maxWidth: '70%',
      },
      lineHeight: 1.5,
      fontWeight: 'bold',
      maxWidth: '50%',
      margin: '2em 0 0 0',
      color: theme.palette.text.color,
    },
    details__addtocart: {
      border: 0,
      margin: 'auto 0 0 0',
      borderRadius: 5,
      background:
        theme.palette.mode == 'dark'
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
      color: '#000',
      padding: '0.75em 2em',
      fontWeight: 'bold',
      '&:hover': {
        background: theme.palette.primary.main,
      },
    },
    details__close: {
      position: 'absolute',
      zIndex: 10,
      top: 0,
      right: 0,
      border: 0,
      background: 'none',
      margin: '2em',
      cursor: 'pointer',
      fontSize: '0.85em',
      color:
        theme.palette.mode == 'dark'
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
    },
    details__magnifier: {
      [theme.breakpoints.down(640)]: {
        right: '7vh',
      },
      border: 0,
      background: 'none',
      backgroundColor:
        theme.palette.mode == 'dark'
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
      color:
        theme.palette.mode == 'dark'
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
      padding: '1em',
      borderRadius: '50%',
      position: 'absolute',
      zIndex: 1000,
      right: 'calc(21.5vh + 10vw)',
      top: '75vh',
      cursor: 'pointer',
      '&:hover': {
        background: theme.palette.secondary.dark,
      },
    },
    details__open: {
      pointerEvents: 'auto',
    },
    icon: {
      display: 'block',
      width: '1.5em',
      height: '1.5em',
      margin: '0 auto',
      fill: 'currentColor',
    },
  };
});

export default CollectionStyle;
