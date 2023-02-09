import { makeStyles } from 'tss-react/mui';
import { alpha } from '@mui/system';

const pattern = '/images/patern/bg-pattern.png';
const plane = '/images/patern/plane.png';

const contactStyles = makeStyles<{}>({
  name: 'ContactPage',
  uniqId: 'uniqeIDcontactPage',
})((theme, _params, classes: any) => {
  return {
    title: {},
    pageWrap: {
      textAlign: 'center',
      backgroundColor: theme.palette.background.default,
      backgroundImage: `url(${pattern})`,
      backgroundRepeat: 'repeat',
      backgroundSize: '15%',
      minHeight: '100vh',
      position: 'relative',
      width: '100%',
      alignItems: 'center',
      padding: theme.spacing(11, 5),
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(5, 0),
      },
      '& $title': {
        color: theme.palette.common.white,
      },
      '& a': {
        color:
          theme.palette.mode === 'dark'
            ? theme.palette.secondary.light
            : theme.palette.secondary.main,
        textTransform: 'none',
        fontSize: 16,
        textDecoration: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        [theme.breakpoints.down('xs')]: {
          fontSize: 14,
        },
      },
    },
    logoHeader: {},
    logo: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing(3),
      '&$logoHeader': {
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
      },
      '& img': {
        width: 64,
      },
      '& p, span': {
        display: 'block',
        paddingBottom: 4,
        color: theme.palette.text.color,
      },
    },
    subtitle2: {
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: 22,
      lineHeight: '32px',
      [theme.breakpoints.down('md')]: {
        fontSize: 20,
        lineHeight: '32px',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 16,
        lineHeight: '24px',
      },
    },
    innerWrap: {
      textAlign: 'left',
      position: 'relative',
      '&:before': {
        [theme.breakpoints.up('md')]: {
          content: '""',
          boxShadow: '0 0 12px 2px rgba(0, 0, 0, 0.05)',
          width: '100%',
          height: '100%',
          background: theme.palette.primary.main,
          transform: 'scale(0.95) rotate(-10deg)',
          position: 'absolute',
          borderRadius: 40,
          top: 0,
          left: 0,
        },
      },
    },
    backtohome: {
      width: 80,
      height: 80,
      position: 'absolute',
      marginTop: 20,
      marginLeft: 20,
      zIndex: 20,
      [theme.breakpoints.down('sm')]: {
        left: 'calc(50% - 40px)',
        top: 40,
        margin: 0,
      },
      [theme.breakpoints.up('md')]: {
        marginTop: 20,
        marginLeft: 20,
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      '& i': {
        fontSize: 32,
        color: alpha(theme.palette.common.white, 0.54),
      },
      '& > i:first-of-type': {
        opacity: 1,
        transition: 'opacity 0.3s ease',
      },
      '& > i:nth-of-type(2)': {
        position: 'absolute',
        right: 0,
        opacity: 0,
        transition: 'all 0.3s ease',
      },
      '&:hover': {
        '& > i:first-of-type': {
          opacity: 0,
        },
        '& > i:nth-of-type(2)': {
          right: 30,
          opacity: 1,
        },
      },
    },
    formBox: {
      position: 'relative',
      borderRadius: 40,
      overflow: 'vivible',
      background: `url(${plane}) no-repeat 90% bottom ${theme.palette.primary.dark}`,
      boxShadow: '0 1.5px 12px 2px rgba(0, 0, 0, 0.28)',
      [theme.breakpoints.down('xs')]: {
        boxShadow: 'none',
      },
      [theme.breakpoints.down('sm')]: {
        overflow: 'hidden',
      },
    },
    fullFromWrap: {
      color: theme.palette.common.white,
      padding: theme.spacing(14, 10),
      borderRadius: 40,
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(4),
      },
    },
    light: {},
    input: {
      width: '100%',
      '& label': {
        left: theme.direction == 'ltr' ? theme.spacing(0.5) : theme.spacing(3),
      },
      '& label.Mui-focused': {
        right: theme.direction == 'ltr' ? theme.spacing(0.5) : theme.spacing(3),
        left: theme.direction == 'ltr' ? theme.spacing(0.5) : theme.spacing(3),
      },
      '& .MuiInputLabel-shrink': {
        left: theme.direction == 'ltr' ? theme.spacing(0.5) : theme.spacing(3),
      },
      '& > div': {
        border: `1px solid ${alpha(theme.palette.text.primary, 0.25)}`,
        background: 'none',
        overflow: 'hidden',
        '& input': {
          paddingLeft: theme.spacing(2),
          '&:focus': {
            background: alpha(theme.palette.background.paper, 0.7),
          },
          '&:hover': {
            background: alpha(theme.palette.background.paper, 0.7),
          },
        },
      },
      '&$light': {
        '& label': {
          color: theme.palette.common.white,
        },
        '& > div': {
          border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
          '& input': {
            color: theme.palette.common.white,
            '&:focus': {
              background: alpha(theme.palette.text.hint, 0.2),
            },
            '&:hover': {
              background: alpha(theme.palette.text.hint, 0.2),
            },
          },
        },
      },
    },
    flex: {},
    btnArea: {
      justifyContent: 'space-between',
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(5),
        display: 'flex',
      },
      [theme.breakpoints.down('sm')]: {
        '& button': {
          marginTop: theme.spacing(4),
          width: '100%',
        },
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(5),
      },
      '& button': {
        marginTop: theme.spacing(2),
        minHeight: 48,
        minWidth: 180,
      },
      '& span': {
        '& a': {
          textDecoration: 'none !important',
          color: theme.palette.secondary.main,
        },
      },
      '&$flex': {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
          display: 'block',
        },
      },
    },
    check: {
      '& svg': {
        fill: theme.palette.secondary.main,
      },
    },
    particlesButton: {},
  };
});

export default contactStyles;
