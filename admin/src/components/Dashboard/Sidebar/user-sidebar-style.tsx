import { makeStyles } from "tss-react/mui";
import { alpha } from "@mui/system";

const userSideBarStyle = makeStyles<{}>()((theme) => {
  return {
    user: {
      paddingBottom: '20px',
      margin: '20px auto 0',
      position: 'relative',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: '0',
        right: '15px',
        height: '1px',
        width: 'calc(100% - 30px)',
        backgroundColor: 'hsla(0,0%,100%,.3)',
      },
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
    photo: {
      transition: 'all 300ms linear',
      width: '34px',
      height: '34px',
      overflow: 'hidden',
      float: 'left',
      zIndex: 5,
      marginRight: '11px',
      borderRadius: '50%',
      marginLeft: '23px',
      boxShadow: theme.shadows[24],
    },
    photoRTL: {
      float: 'right',
      marginLeft: '12px',
      marginRight: '24px',
    },
    caret: {
      marginTop: '13px',
      position: 'absolute',
      right: '18px',
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
      right: -10,
      left: 'auto',
      [theme.breakpoints.down('sm')]: {
        right: -10,
      }
    },
    avatarImg: {
      width: '100%',
      verticalAlign: 'middle',
      border: 0
    },
    list: {
      marginTop: '15px',
      paddingLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: 0,
      listStyle: 'none',
      color: 'inherit',
      '&:before,&:after': {
        display: 'table',
        content: '" "',
      },
      '&:after': {
        clear: 'both',
      },
    },
    item: {
      position: 'relative',
      display: 'block',
      textDecoration: 'none',
      margin: 0,
      padding: 0
    },
    userItem: {
      '&:last-child': {
        paddingBottom: '0px',
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
        backgroundColor:
          alpha(
            theme.palette.secondary.light,
            theme.palette.action.activatedOpacity
          ),// 'rgba(51, 51, 51, 0.2)',
        boxShadow: 'none',
      },
      '&,&:hover,&:focus': {
        color: 'inherit',
      },
    },
    userCollapseButton: {
      margin: '0',
      padding: '6px 15px',
      '&:hover': {
        background: alpha(
          theme.palette.secondary.light,
          theme.palette.action.activatedOpacity
        ),
      },
    },
    userCaret: {
      marginTop: '10px',
    },
    caretActive: {
      transform: 'rotate(180deg)',
    },
    userItemText: {
      lineHeight: '22px',
    },
    collapseList: {
      marginTop: '0',
      '& $caret': {
        marginTop: '8px',
      },
    },
    collapseItem: {
      position: 'relative',
      display: 'block',
      textDecoration: 'none',
      margin: '10px 0 0 0',
      padding: '0',
    },
    userCollapseLinks: {
      marginTop: '-4px',
    },
    itemText: {
      color: 'inherit',
      margin: '0',
      lineHeight: '30px',
      fontSize: '14px',
      transform: 'translate3d(0px, 0, 0)',
      opacity: 1,
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
    itemTextRTL: {
      marginRight: '45px',
      textAlign: 'right',
    },
    itemTextMiniRTL: {

    },
    collapseItemMini: {
      color: 'inherit',
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
      marginRight: '1px',
    },
    collapseItemText: {
      margin: '0',
      position: 'relative',
      transform: 'translateX(0px)',
      opacity: '1',
      whiteSpace: 'nowrap',
      display: 'block',
      transition: 'transform 300ms ease 0s, opacity 300ms ease 0s',
      fontSize: '14px',
    },
    collapseItemTextRTL: {
      textAlign: 'right',
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
  }
})

export default userSideBarStyle;