import { makeStyles } from "tss-react/mui";
import { alpha } from "@mui/system";

const themeUserStyle = makeStyles<{}>()((theme) => {
  return {
    active: {
      border: `1px solid ${theme.palette.primary.main}`
    },
    tab: {
      '& svg': {
        marginRight: theme.spacing(),
      },
    },
    btn: {
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      right: theme.direction == 'ltr' ? 10 : 'auto',
      left: theme.direction == 'ltr' ? 'auto' : 10,
      top: '84%',
      zIndex: 999,
      borderRadius: 8,
      boxShadow: theme.shadows[4],
      padding: theme.spacing(0.5),
      border: `1px solid ${theme.palette.primary.main}`,
      background: alpha(theme.palette.background.paper, 0.6),
      backdropFilter: 'saturate(180%) blur(20px)',
      [theme.breakpoints.down('xs')]: {
        top: '45%',
      },
      '&$active': {
        right: 624,
        border: 'none',
      },
      '& svg': {
        width: 32,
        height: 32,
        fill: theme.palette.text.secondary,
        [theme.breakpoints.down('xs')]: {
          width: 22,
          height: 22,
        },
      },
      '& button': {
        [theme.breakpoints.down('xs')]: {
          padding: 8,
        },
      },
    },
    paper: {
      padding: theme.spacing(2),
      borderRadius: '10px',
    },
    optWrap: {
      width: 600,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      overflow: 'hidden',
      '& > div': {
        overflow: 'auto',
        height: '100%',
        paddingTop: theme.spacing(10),
      },
      '& header': {
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'row',
        },
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    mobileBack: {
      float: 'left',
      marginRight: '5%',
    },
    appbar: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: theme.direction == 'ltr' ? 'row' : 'row-reverse',
        justifyContent: theme.direction == 'ltr' ? 'flex-end' : 'flex-start',
      },
    },
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    swatch: {
      position: 'relative' as any,
      textAlign: 'center',
      padding: theme.spacing(3) + '!important',
      marginBottom: theme.spacing(2) + '!important',
      borderRadius: '10px !important',
      '&$active': {
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
      },
    },
    swatchWrapper: {
      [theme.breakpoints.down('sm')]: {
        display: 'grid',
        gridTemplateColumns: '105px 105px 105px',
      },
    },
    primary: {
      width: 60,
      height: 60,
      display: 'block',
      borderRadius: '50%',
    },
    secondary: {
      width: 30,
      height: 30,
      display: 'block',
      position: 'absolute',
      borderRadius: '50%',
      left: '60%',
      top: '60%',
    },
    draweBg: {
      background: alpha(theme.palette.background.paper, 0.6),
      backdropFilter: 'saturate(180%) blur(20px)',
      [theme.breakpoints.down('sm')]: {
        width: '100% !important',
      },
    },
    themeColor: {
      '& h6': {
        marginBottom: theme.spacing(),
      },
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
        '& h6': { textAlign: 'center' },
      },
    },
  }
})

export default themeUserStyle;