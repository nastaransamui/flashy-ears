import { makeStyles } from "tss-react/mui";
import { alpha } from "@mui/system";

const linkSidebarStyle = makeStyles<{}>()((theme) => {
  return {
    list: {
      marginTop: '15px',
      paddingLeft: '0',
      paddingTop: '0',
      paddingBottom: '0',
      marginBottom: '0',
      listStyle: 'none',
      color: 'white',
      '&:before,&:after': {
        display: 'table',
        content: '" "',
      },
      '&:after': {
        clear: 'both',
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
    itemLink: {
      paddingLeft: '10px',
      paddingRight: '10px',
      transition: 'all 300ms linear',
      margin: '10px 15px 0',
      borderRadius: '3px',
      position: 'relative',
      display: 'block',
      padding: '10px 15px',
      backgroundColor: 'transparent',
      width: 'auto',
      '&:hover': {
        outline: 'none',
        backgroundColor: alpha(
          theme.palette.secondary.light,
          theme.palette.action.activatedOpacity
        ),
        boxShadow: 'none',
      },
      '&,&:hover,&:focus': {
        color: 'inherit',
      },
    },
    collapseActive: {
      outline: 'none',
      backgroundColor: alpha(
        theme.palette.secondary.light,
        theme.palette.action.activatedOpacity
      ),
      boxShadow: 'none',
    },
    itemText: {
      margin: '0',
      lineHeight: '30px',
      fontSize: '14px',
      transform: 'translate3d(0px, 0, 0)',
      opacity: '1',
      transition: 'transform 300ms ease 0s, opacity 300ms ease 0s',
      position: 'relative',
      display: 'block',
      height: 'auto',
      whiteSpace: 'nowrap',
      padding: '0 16px !important',
    },
    itemTextMini: {
      [theme.breakpoints.up('md')]: {
        transform: 'translate3d(-25px, 0, 0)',
      },
      opacity: '0',
      [theme.breakpoints.down('sm')]: {
        opacity: 1,
      },
    },
    //Not use
    itemTextRTL: {
      // marginRight: '45px',
      // textAlign: 'right',
      // color: 'blue'
    },
    //Not use
    itemTextMiniRTL: {

    },
    collapseItemText: {
      margin: '0 20px 0 0',
      position: 'relative',
      transform: 'translateX(0px)',
      opacity: '1',
      whiteSpace: 'nowrap',
      display: 'block',
      transition: 'transform 300ms ease 0s, opacity 300ms ease 0s',
      fontSize: '14px',
    },
    collapseItemTextMiniRTL: {
      transform: 'translate3d(25px, 0, 0) !important',
    },
    collapseItemTextMini: {
      [theme.breakpoints.up('md')]: {
        transform: 'translate3d(-25px, 0, 0)',
      },
      opacity: '0',
      [theme.breakpoints.down('sm')]: {
        opacity: 1,
      },
    },
    collapseItemTextRTL: {
      textAlign: 'right',
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
    },
    itemIcon: {
      width: '30px',
      height: '24px',
      float: 'left',
      position: 'inherit',
      top: '3px',
      marginRight: '15px',
      textAlign: 'center',
      verticalAlign: 'middle',
      opacity: '0.8',
    },
    itemIconRTL: {
      float: 'right',
      marginLeft: '5px',
      marginRight: '-10px',
    },
    itemIconMini: {
      position: 'absolute',
      margin: 'auto auto',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      [theme.breakpoints.down('sm')]: {
        // left: 'auto',
        left: theme.direction == 'ltr' ? 0 : 'auto',
        right: theme.direction == 'ltr' ? 'auto' : 0
      }
    },
    caret: {
      marginTop: '13px',
      position: 'absolute',
      right: -9,
      transition: 'all 150ms ease-in',
      display: 'inline-block',
      width: '0',
      height: '0',
      marginLeft: '2px',
      verticalAlign: 'middle',
      borderTop: '4px solid',
      borderRight: '4px solid transparent',
      borderLeft: '4px solid transparent',
    },
    caretRTL: {
      left: '-141px',
      right: 'auto',
    },
    collapseItemMini: {
      textTransform: 'uppercase',
      width: '30px',
      marginRight: '15px',
      textAlign: 'center',
      letterSpacing: '1px',
      position: 'relative',
      float: 'left',
      display: 'inherit',
      transition: 'transform 300ms ease 0s, opacity 300ms ease 0s',
      fontSize: '14px',
    },
    collapseItemMiniRTL: {
      float: 'right',
      marginLeft: '30px',
      marginRight: -9,
    },
    item: {
      position: 'relative',
      display: 'block',
      textDecoration: 'none',
      margin: '0',
      padding: '0',
    },
    collapseItem: {
      position: 'relative',
      display: 'block',
      textDecoration: 'none',
      margin: '10px 0 0 0',
      padding: '0',
    },
    caretActive: {
      transform: 'rotate(180deg)',
    },
    collapseList: {
      marginTop: '0',
      '& $caret': {
        marginTop: '8px',
      },
    },
    collapseItemLink: {
      transition: 'all 300ms linear',
      margin: '0 15px',
      borderRadius: '3px',
      position: 'relative',
      display: 'block',
      padding: '10px',
      backgroundColor: 'transparent',
      width: 'auto',
      '&:hover': {
        outline: 'none',
        backgroundColor: alpha(
          theme.palette.secondary.light,
          theme.palette.action.activatedOpacity
        ),
        boxShadow: 'none',
      },
      '&,&:hover,&:focus': {
      },
    },
    white: {
      '& div': {
        color: theme.palette.primary.contrastText,
      },
      '& span': {
        color: theme.palette.primary.contrastText,
      },
      '&,&:hover,&:focus': {
        backgroundColor: theme.palette.primary.main,
        boxShadow: theme.shadows[24],
      },
    },
    black: {
      '& div': {
        color: theme.palette.primary.contrastText,
      },
      '& span': {
        color: theme.palette.primary.contrastText,
      },
      '&,&:hover,&:focus': {
        backgroundColor: theme.palette.primary.main,
        boxShadow: theme.shadows[4],
      },
    },
  }
})

export default linkSidebarStyle