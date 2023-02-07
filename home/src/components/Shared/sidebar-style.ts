import { makeStyles } from 'tss-react/mui';
import { darken } from '@mui/material/styles';
import { CSSProperties } from 'react';
import ShortUniqueId from 'short-unique-id';
const uid = new ShortUniqueId();
const SiebarStyle = makeStyles<{ lang: string }>({
  name: 'Sidebar',
  uniqId: 'uniqeId',
})((theme, _params, classes: any) => {
  const { lang } = _params;

  const hoverClass = {
    width: 50,
    height: 33,
    transformStyle: 'preserve-3d',
    borderRadius: 10,
    border: `1px solid ${theme.palette.secondary.main}`,
    boxShadow: `0 0 20px 5px ${
      theme.palette.mode == 'dark'
        ? 'rgba(255, 255, 255, .4)'
        : 'rgba(100, 100, 255, .4)'
    }`,
    opacity: 0,
    transition: 'all 0.3s ease',
    transitionDelay: '1s',
    position: 'relative',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
    bacgroundBlendMode: 'color-burn',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  } as CSSProperties;
  return {
    article: {
      position: 'fixed',
      width: '100%',
      minHeight: '100vh',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      padding: '30px 15%',
      overflow: 'auto',
      zIndex: 0,
      background: theme.palette.background.default,
      color: theme.palette.text.color,
      WebkitTransformOrigin: '0 50%',
      MozTransformOrigin: '0 50%',
      msTransformOrigin: '0 50%',
      OTransformOrigin: '0 50%',
      transformOrigin: '0 50%',
      WebkitTransition: 'all 600ms ease',
      MozTransition: 'all 600ms ease',
      msTransition: 'all 600ms ease',
      transition: 'all 600ms ease',
      '&::after': {
        position: 'absolute',
        content: '" "',
        left: '100%',
        top: 0,
        right: 0,
        bottom: 0,
        WebkitTransition: 'all 600ms ease',
        MozTransition: 'all 600ms ease',
        msTransition: 'all 600ms ease',
        transition: 'all 600ms ease',
      },
    },
    nav: {
      position: 'fixed',
      zIndex: 1,
      background:
        theme.palette.mode == 'dark'
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
      display: 'none',
      left: '-16em',
      top: 0,
      bottom: 0,
      borderRight: `50px solid ${
        theme.palette.mode == 'dark'
          ? theme.palette.secondary.main
          : theme.palette.primary.main
      }`,
      cursor: 'pointer',
      WebkitTransition: 'all 600ms ease',
      MozTransition: 'all 600ms ease',
      msTransition: 'all 600ms ease',
      transition: 'all 600ms ease',
      '&:hover ~article': {
        WebkitTransform: 'translateX(16em) perspective(600px) rotateY(10deg)',
        mozTransform: 'translateX(16em) perspective(600px) rotateY(10deg)',
        msTransform: 'translateX(16em) perspective(600px) rotateY(10deg)',
        OTransform: 'translateX(16em) perspective(600px) rotateY(10deg)',
        transform: 'translateX(16em) perspective(600px) rotateY(10deg)',
      },
      '&:hover ~article:after': {
        left: '60%',
      },
      '&:hover': {
        left: 0,
      },
      '&::after': {
        position: 'absolute',
        content: '" "',
        width: 0,
        height: 0,
        right: '-70px',
        top: '50%',
        borderWidth: '15px 10px',
        borderStyle: 'solid',
        borderColor: `transparent transparent transparent ${
          theme.palette.mode == 'dark'
            ? theme.palette.secondary.main
            : theme.palette.primary.main
        }`,
      },
    },
    ul: {
      width: '14em',
      listStyleType: 'none',
      margin: 0,
      padding: '1em',
    },
    a: {
      display: 'block',
      width: '100%',
      fontWeight: 'bold',
      lineHeight: '2.5em',
      textIndent: '10px',
      textDecoration: 'none',
      color:
        theme.palette.mode == 'dark'
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
      borderRadius: 4,
      outline: '0 none',
      '&:hover': {
        color:
          theme.palette.mode == 'dark'
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
        backgroundColor: darken(
          `${
            theme.palette.mode == 'dark'
              ? theme.palette.secondary.main
              : theme.palette.primary.main
          }`,
          0.2
        ),
        textShadow: `0 0 4px ${
          theme.palette.mode == 'dark'
            ? theme.palette.primary.main
            : theme.palette.secondary.main
        }`,
        boxShadow: 'inset 0 2px 2px rgba(0,0,0,0.2)',
      },
    },
    currentLink: {
      color:
        theme.palette.mode == 'dark'
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
      backgroundColor: darken(
        `${
          theme.palette.mode == 'dark'
            ? theme.palette.secondary.main
            : theme.palette.primary.main
        }`,
        0.2
      ),
      textShadow: `0 0 4px ${
        theme.palette.mode == 'dark'
          ? theme.palette.primary.main
          : theme.palette.secondary.main
      }`,
      boxShadow: 'inset 0 2px 2px rgba(0,0,0,0.2)',
    },
    //hover menu
    all: {
      display: 'none',
      position: 'fixed',
      top: 30,
      right: 30,
      perspective: '10px',
      zIndex: 2,
      transform: 'perspective(300px) rotateX(20deg)',
      willChange: 'prespective',
      perspectiveOrigin: 'center center',
      transition: 'all 1.3s ease-out',
      justifyContent: 'center',
      transformStyle: 'preserve-3d',
      [`&:hover .${classes.text}`]: {
        opacity: 1,
      },
      [`&:hover .${classes.explainer}`]: {
        opacity: 0,
      },
      '&:hover': {
        perspective: `1000px`,
        transition: 'all 1.3s ease-inall 1.3s ease-in',
        transform: 'perspective(10000px) rotateX(0deg)',
        '& > div': {
          opacity: 1,
          transitionDelay: '0s',
        },
      },
    },
    text: {
      transform: 'translateY(30px)',
      opacity: 0,
      transition: 'all .3s ease',
      bottom: 0,
      left: 0,
      position: 'absolute',
      willChange: 'transform',
      color: theme.palette.text.color,
      minWidth: 'max-content',
      textShadow: `0 0 5px rgba(100, 100, 255, .6)`,
    },
    left: {
      ...hoverClass,
      transform: `translateX(-30px) translateZ(-25px) rotateY(-5deg)`,
      backgroundImage: `url(/flags/128x128/${
        lang == 'en' ? 'th'.toUpperCase() : 'en'.toUpperCase()
      }.png)`,
    },
    center: {
      ...hoverClass,
      opacity: 1,
      backgroundImage: `url(/images/Icons/cart.png)`,
    },
    right: {
      ...hoverClass,
      transform: `translateX(30px) translateZ(-25px) rotateY(5deg)`,
      backgroundImage: `url(https://cdn3.iconfinder.com/data/icons/other-icons/48/cloud_weather-512.png)`,
    },
    lefter: {
      ...hoverClass,
      transform: 'translateX(-60px) translateZ(-50px) rotateY(-10deg)',
      backgroundImage: `url(/images/Icons/${
        theme.palette.mode == 'dark' ? 'light' : 'dark'
      }.png)`,
    },
    righter: {
      ...hoverClass,
      transform: `translateX(60px) translateZ(-50px) rotateY(10deg)`,
      backgroundImage: `url(https://cdn3.iconfinder.com/data/icons/other-icons/48/search-512.png)`,
    },
    explainer: {
      fontWeight: 300,
      color: theme.palette.text.color,
      transition: `all .6s ease`,
      width: `100%`,
      height: `100%`,
      backgroundColor: `#303050`,
      backgroundImage: `radial-gradient(circle at center top, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
      borderRadius: `10px`,
      textShadow: `0 0 10px rgba(255, 255, 255, .8)`,

      display: `flex`,
      justifyContent: `center`,
      alignItems: `center`,
    },
    menuIcon: {
      // position: 'absolute',
      // right: 0,
    },
  };
});

export default SiebarStyle;
