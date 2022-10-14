import { makeStyles } from "tss-react/mui";
import { alpha } from "@mui/system";
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
        right: 29,
        // top: -5,
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
  }
})

export default dataShowStyle;