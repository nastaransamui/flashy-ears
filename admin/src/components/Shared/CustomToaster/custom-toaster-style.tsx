import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles<{}>()((theme) => {
  return {
    toastProgress: {
      background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.light}, ${theme.palette.secondary.light}, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})` + '!important'
    },
    toastBody: {
      background: `crimson` + '!important'
    }
  }
})

export default useStyles;