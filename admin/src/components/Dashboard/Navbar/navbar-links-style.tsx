import { makeStyles } from "tss-react/mui";
type SidebarColor = 'white' | 'black'
export function important<T>(value: T): T {
  return (value + ' !important') as any;
}

const navbarLinksStyle = makeStyles<{ sideBarbgColor?: SidebarColor }>()((theme, { sideBarbgColor }) => {
  return {
    dropdownItem: {
      fontSize: '13px',
      padding: '10px 20px',
      margin: '0 5px',
      borderRadius: '2px',
      position: 'relative',
      transition: 'all 150ms linear',
      display: 'block',
      clear: 'both',
      fontWeight: '400',
      height: '100%',
      color: theme.palette.text.color,
      whiteSpace: 'nowrap',
      minHeight: 'unset',
    },
    primaryHover: {
      [theme.breakpoints.up('sm')]: {
        '&:hover': {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          boxShadow: theme.shadows[12],
        },
      },
    },
    dropdownItemRTL: {
      textAlign: 'left',
    },
    wrapper: {
      [theme.breakpoints.between('sm', 'md')]: {
        display: 'flex',
      },
    },
    wrapperRTL: {
      [theme.breakpoints.up('md')]: {
        paddingLeft: '16px',
      },
    },
    managerClasses: {
      [theme.breakpoints.up('md')]: {
        display: 'inline-block',
      },
    },
    buttonLink: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        margin: '5px 15px 0',
        width: 'auto',
        height: 'auto',
        '& svg': {
          width: '30px',
          height: '24px',
          marginRight: '19px',
          marginLeft: '3px',
        },
        '& .fab,& .fas,& .far,& .fal,& .material-icons': {
          width: '30px',
          fontSize: '24px',
          lineHeight: '30px',
          marginRight: '19px',
          marginLeft: '3px',
        },
      },
    },
    labelRTL: {
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'row-reverse',
        justifyContent: 'initial',
        display: 'flex',
      },
    },
    headerLinksSvg: {
      width: '20px !important',
      height: '20px !important',
    },
    links: {
      width: '20px',
      height: '20px',
      zIndex: '4',
      fill: theme.palette.mode == 'dark' ? 'white' : 'black',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        width: '30px',
        height: '30px',
        color: 'inherit',
        opacity: '0.8',
        marginRight: '16px',
        marginLeft: '-5px',
        fill: sideBarbgColor == 'black' ? 'white' : 'black',
      },
    },
    linkTextRTL: {
      color: 'red',
    },
    linkText: {
      zIndex: '4',
      fontSize: '14px',
      margin: '0!important',
      textTransform: 'none',
    },
    popperClose: {
      pointerEvents: 'none',
      display: 'none !important',
    },
    popperNav: {
      [theme.breakpoints.down('sm')]: {
        position: important('static'),
        left: 'unset !important',
        top: 'unset !important',
        transform: 'none !important',
        willChange: 'unset !important',
        '& > div': {
          boxShadow: 'none !important',
          marginLeft: '0rem',
          marginRight: '0rem',
          transition: 'none !important',
          marginTop: '0px !important',
          marginBottom: '0px !important',
          padding: '0px !important',
          backgroundColor: 'transparent !important',
          '& ul li': {
            // color: 'crimson' + ' !important',
            margin: '10px 15px 0!important',
            padding: '10px 15px !important',
            '&:hover': {
              backgroundColor: 'hsla(0,0%,78%,.2)',
              boxShadow: 'none',
            },
          },
        },
      },
    },
    popperResponsive: {
      zIndex: '1200',
      [theme.breakpoints.down('sm')]: {
        zIndex: '1640',
        position: 'static',
        float: 'none',
        width: 'auto',
        marginTop: '0',
        backgroundColor: 'transparent',
        border: '0',
        boxShadow: 'none',
        color: 'black',
      },
    },
    langGrow: {
      [theme.breakpoints.up('sm')]: {
        transformOrigin: '0 0 0',
        marginLeft: theme.spacing(-10),
        marginRight: theme.spacing(-9),
        marginTop: theme.spacing(3),
      },
      [theme.breakpoints.down('sm')]: {
        transformOrigin: '0 0 0',
        borderRadius: 0,
      },
    },
    dropdown: {
      borderRadius: '3px',
      border: '0',
      boxShadow: theme.shadows[13],
      top: '100%',
      zIndex: '1000',
      minWidth: '160px',
      padding: '5px 0',
      margin: '20px -100px 0 10px',
      fontSize: '14px',
      textAlign: 'left',
      listStyle: 'none',
      backgroundColor: theme.palette.background.paper,
      backgroundClip: 'padding-box',
    },
    languagePack: {
      display: 'flex',
      color: theme.palette.text.color,
      width: 'auto',
      [theme.breakpoints.down('sm')]: {
        color: sideBarbgColor == 'black' ? 'white' : 'black',
        // marginLeft: theme.direction == 'rtl' ? '0' : '15%',
        width: '100%'
      },
      flexDirection: theme.direction == 'rtl' ? 'row-reverse' : 'row',
    },
    avatarImg: {
      width: 30,
      height: 30,
      borderRadius: 50,
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
  }
})

export default navbarLinksStyle;