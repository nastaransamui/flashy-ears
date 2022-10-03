import { makeStyles } from "tss-react/mui";

const prodashboardStyle = makeStyles<{}>()((theme) => {
  return {
    main: {
      display: 'flex',
      width: '100%',
      // marginTop: 100,
      minHeight: '100vh',
      background: theme.palette.background.default
    },
    mainPageMinimize: {
      float: 'left',
      padding: '0 0 0 15px',
      display: 'block',
      color: theme.palette.text.color,
    },
    mainPageHandlemainOpen: {
      [theme.breakpoints.up('sm')]: {
        transition: 'all .35s ease',
        padding: theme.direction == 'ltr' ? `0 0 0 ${theme.spacing(37)} !important` : `0 ${theme.spacing(37)} 0 0 !important`,
      },
    },
    mainPageHandlemainClose: {
      [theme.breakpoints.up('sm')]: {
        transition: 'all .35s ease',
        padding: theme.direction == 'ltr' ? `0 0 0 ${theme.spacing(15)} !important` : `0 ${theme.spacing(15)} 0 0 !important`,
      },
    },
  }
})

export default prodashboardStyle;