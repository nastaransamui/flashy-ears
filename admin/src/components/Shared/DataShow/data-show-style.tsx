import { makeStyles } from "tss-react/mui";
const dataShowStyle = makeStyles<{}>()((theme) => {

  return {
    viewTypeGrid: {
      display: 'flex',
      alignItems: 'center',
      paddingRight: theme.direction == 'ltr' ? 0 : 10,
      paddingLeft: theme.direction == 'ltr' ? 10 : 0,
      [theme.breakpoints.down('md')]: {
        justifyContent: 'space-evenly',
      }
    },
    searchGrid: {
      display: 'flex',
      alignItems: 'center',

    },
    iconGrid: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'end',
      paddingLeft: 0,
      flexWrap: 'wrap',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'space-evenly',
      }
    },
    searchSelect: {
      minWidth: '90%',
      maxWidth: 40,
      marginRight: theme.direction == 'ltr' ? 0 : 10,
      marginLeft: 10
    },
    input: {
      width: '100%',
      position: 'relative',
      legend: {
        textAlign: theme.direction == 'ltr' ? 'left' : 'right',
      },
      '& label': {
        right: theme.direction == 'ltr' ? 29 : 50,
        textAlign: theme.direction == 'ltr' ? 'left' : 'right',
      },
    },
    inputSelect: {
      position: 'relative',
      legend: {
        textAlign: theme.direction == 'ltr' ? 'left' : 'right',
      },
    },
    selectLabel: {
      position: 'absolute',
      left: theme.direction == 'ltr' ? -2 : 'auto',
      right: 25
    },

    phone: {
      borderColor: theme.palette.primary.main + '!important',
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: theme.palette.primary.main,
        },
        '&:hover fieldset': {
          borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.primary.main,
        },
      },
      '& label.Mui-focused': {
        color: theme.palette.primary.main,
      },
      '& .MuiInputLabel-shrink': {
        color: theme.palette.text.color,
      },
      '& input': {
        color: theme.palette.text.color,
        '&:focus': {
          color: theme.palette.text.color,
        },
        '&:hover': {
          color: theme.palette.text.color,
        },
      },
    },
    phoneMenu: {
      background: theme.palette.background.paper + '!important',
      color: `${theme.palette.text.color} !important`,
      '& p': {
        color: `${theme.palette.text.color} !important`,
      },
      '& li': {
        '&:hover': {
          background: theme.palette.primary.main,
        },
      },
    },
  }
})

export default dataShowStyle;