import { makeStyles } from "tss-react/mui";

const brandStyle = makeStyles<{}>()((theme) => {
  return {
    logo: {
      padding: '15px 0px',
      margin: 0,
      display: 'block',
      position: 'relative',
      zIndex: 4,
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        height: 1,
        right: 15,
        width: 'calc(100% - 30px)',
        backgroundColor: 'hsla(0,0%,100%,.3)',
      }
    },
    whiteAfter: {
      '&:after': {
        backgroundColor: 'black !important',
      }
    },
    blackAfter: {
      '&:after': {
        backgroundColor: 'hsla(0,0%,71%,.3) !important',
      }
    },
    logoMini: {
      transition: 'all 300ms linear',
      opacity: 1,
      float: 'left',
      textAlign: 'center',
      width: `30px`,
      display: "inline-block",
      maxHeight: `30px`,
      marginLeft: `22px`,
      cursor: 'pointer',
      marginRight: `18px`,
      marginTop: `7px`,
      color: 'inherit'
    },
    logoMiniRTL: {
      float: 'right',
      marginRight: `30px`,
      marginLeft: `26px`
    },
    img: {
      width: 35,
      verticalAlign: 'middle',
      border: 0
    },
    logoNormal: {
      cursor: 'pointer',
      lineHeight: `40px`,
      transition: 'all 300ms linear',
      display: 'block',
      opacity: 1,
      transform: 'translate3d(0px, 0, 0)',
      textTransform: 'uppercase',
      padding: '5px 0px',
      fontSize: '18px',
      whiteSpace: 'nowrap',
      fontWeight: '400',
      overflow: 'hidden',
      '&,&:hover,&:focus': {
        color: 'inherit',
      },
    },
    logoNormalSidebarMini: {
      opacity: 0,
      [theme.breakpoints.up('md')]: {
        transform: 'translate3d(-25px, 0, 0)',
      },
      [theme.breakpoints.down('sm')]: {
        opacity: 1,
      },
    },
    logoNormalSidebarMiniRTL: {
      transform: 'translate3d(25px, 0, 0)',
    },
    logoNormalRTL: {
      textAlign: 'right',
      [theme.breakpoints.down('sm')]: {
        textAlign: 'left',
      },
    },
    sideBarTheme: {
      position: 'absolute',
      marginRight: 15,
      right: -8
    },
    sideBarThemeRTL: {
      position: 'absolute',
      right: 100,
      paddingLeft: 0
    }
  }
})

export default brandStyle;