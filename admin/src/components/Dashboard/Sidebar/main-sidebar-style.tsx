import { makeStyles } from "tss-react/mui";

const drawerWidth = 260;
const drawerMiniWidth = 80;
const mainSidebarStyle = makeStyles<{}>()((theme) => {
  // console.log(theme)
  return {
    drawerPaper: {
      border: 'none',
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      zIndex: 10,
      transitionProperty: 'top, bottom, width',
      transitionDuration: '.2s, .2s, .35s',
      boxShadow: theme.shadows[24],
      width: drawerWidth,
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        position: 'fixed',
        height: "100%",
      },
      [theme.breakpoints.down('sm')]: {
        boxShadow: theme.shadows[24],
        width: drawerWidth,
        position: 'fixed',
        display: 'block',
        top: 0,
        height: '100vh',
        right: 0,
        left: 'auto',
        zIndex: 10,
        visibility: 'visible',
        overflowY: 'visible',
        borderTop: 'none',
        textAlign: 'left',
        paddingRight: 0,
        paddingLeft: 0,
        transform: `translated3d(${drawerWidth}px, 0, 0)`,
        transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
      },
      '&:before,&:after': {
        position: 'absolute',
        zIndex: 3,
        width: '100%',
        height: '100%',
        content: '""',
        display: 'block',
        top: 0,
      },
    },
    blackBackground: {
      color: 'white',
      '&:after': {
        background: "#000",
        opacity: 0.8,
      },
    },
    whiteBackground: {
      color: 'black',
      '&:after': {
        background: "#fff",
        opacity: 0.8,
      },
    },
    drawerPaperMini: {
      [theme.breakpoints.up('sm')]: {
        width: drawerMiniWidth + 'px!important',
      },
    },
    whiteScroll: {
      "&::-webkit-scrollbar-track": {
        background: "#fff",
      },
    },
    blackScroll: {
      "&::-webkit-scrollbar-track": {
        background: "#212121",
      },
    },
    sidebarWrapper: {

      position: 'relative',
      height: 'calc(100vh - 75px)',
      overflow: 'auto',
      overflowX: 'hidden',
      width: drawerWidth,
      zIndex: 4,
      overflowScrolling: 'touch',
      transitionProperty: 'top, bottom, width',
      transitionDuration: '.2s, .2s, .35s',
      transitionTimingFunction: 'linear, linear, ease',
      color: 'inherit',
      paddingBottom: '30px',
    },
    sidebarWrapperWithPerfectScrollbar: {
      overflow: 'hidden !important',
    },
    background: {
      position: 'absolute',
      zIndex: '1',
      height: '100%',
      width: '100%',
      display: 'block',
      top: '0',
      left: '0',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      transition: 'all 300ms linear',
    }
  }
})

export default mainSidebarStyle;