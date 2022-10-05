import { makeStyles } from "tss-react/mui";
import { important } from "../Navbar/navbar-links-style";

const footerStyle = makeStyles<{}>()((theme) => {
  return {
    footer: {
      bottom: 0,
      // padding: '20px 0',
      width: '100%',
    },
    left: {
      float: important('left'),
      display: 'block',
      marginTop: 0,
      marginRight: 60,
    },
    right: {
      marginRight: 0,
      marginTop: 0,
      fontSize: '14px',
      float: important('right'),
      // padding: '15px',
    },
    anchorRight: {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      backgroundColor: 'transparent',
      marginLeft: theme.direction == 'ltr' ? -10 : 0,
      marginRight: theme.direction == 'ltr' ? 0 : -100,
    },
    anchorLeft: {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      backgroundColor: 'transparent',
      paddingRight: 15
    },
  }
})

export default footerStyle;