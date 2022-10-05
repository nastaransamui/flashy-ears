import { makeStyles } from "tss-react/mui";
import {
  drawerWidth,
  drawerMiniWidth
} from '@/theme/common'

const navbarMainStyle = makeStyles<{}>()((theme) => {
  return {
    mainPanel: {
      transitionProperty: 'top, bottom, width',
      transitionDuration: '.2s, .2s, .35s',
      transitionTimingFunction: 'linear, linear, ease',
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
      overflow: 'auto',
      position: 'relative',
      float: 'left',
      maxHeight: '100%',
      width: '100%',
      overflowScrolling: 'touch',
      transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
    },
    mainPanelSidebarMini: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerMiniWidth}px)`,
      },
    },
    appBar: {
      backgroundColor: theme.palette.background.default,
      width: '100%',
      paddingTop: '10px',
      zIndex: 1,
      color: "blue",
      border: '0',
      padding: '10px 0',
      transition: 'all 150ms ease 0s',
      minHeight: '50px',
      display: 'block',
    },
    sidebarMinimize: {
      float: 'left',
      padding: '0 0 0 15px',
      display: 'block',
      color: 'blue',
    },
    sidebarHandlemainOpen: {
      padding: theme.direction == 'ltr' ? `0 0 0 ${drawerWidth / 2}px !important` : `0 ${drawerWidth / 2}px 0 0 !important`,
      transition: 'all .35s ease',
    },
    sidebarHandlemainClose: {
      transition: 'all .35s ease',
      padding: theme.direction == 'ltr' ? `0 0 0 ${drawerMiniWidth / 2}px !important` : `0 ${drawerMiniWidth / 2}px 0 0 !important`,
    },
    justIcon: {
      background:
        theme.palette.mode == 'dark' ? theme.palette.divider : 'white',
      boxShadow: theme.shadows[14],
    },
    sidebarMiniIcon: {
      width: '20px',
      height: '17px',
      fill: theme.palette.mode == 'dark' ? 'white' : 'black',
    },
    flex: {
      flex: 1,
    },
    title: {
      lineHeight: '30px',
      fontSize: '18px',
      borderRadius: '3px',
      textTransform: 'none',
      color: `${theme.palette.mode == 'dark' ? 'white' : 'black'} !important`,
      paddingTop: '0.625rem',
      paddingBottom: '0.625rem',
      margin: '0 !important',
      letterSpacing: 'unset',
      '&:hover,&:focus': {
        background: 'transparent',
      },
    },
  }
})

export default navbarMainStyle;