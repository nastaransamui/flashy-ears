import { makeStyles } from 'tss-react/mui';
export function important<T>(value: T): T {
  return (value + ' !important') as any;
}

const stepsWizardStyles = makeStyles<{}>()((theme) => {
  return {
    card: {
      display: 'inline-block',
      position: 'relative',
      width: '100%',
      margin: '5px 0',
      right: theme.direction == 'ltr' ? 14 : -14,
      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
      borderRadius: '6px',
      color: theme.palette.text.color,
      transition: 'all 300ms linear',
      minHeight: '410px',
      [theme.breakpoints.only('xs')]: {
        right: 6
      }
    },
    wizardHeader: {
      textAlign: 'center',

    },
    title: { margin: '0' },
    subtitle: { margin: '5px 0 0' },
    wizardNavigation: {
      position: 'relative',
    },
    nav: {
      marginTop: 20,
      backgroundColor: theme.palette.background.default,
      paddingLeft: 0,
      marginBottom: 0,
      listStyle: 'none',
      '&:after,&:before': {
        display: 'table',
        content: '" "',
      },
      '&:after': {
        boxSizing: 'border-box',
      },
      [theme.breakpoints.down('sm')]: {
        paddingRight: 0
      }
    },
    steps: {
      marginLeft: '0',
      textAlign: 'center',
      position: 'relative',
      display: 'inline-block',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '100%',
        minHeight: 40,
        maxHeight: 40,
      }
    },
    stepsAnchor: {
      cursor: 'pointer',
      position: 'relative',
      display: 'block',
      padding: '8px 15px',
      textDecoration: 'none',
      transition: 'all .3s',
      border: '0 !important',
      lineHeight: '18px',
      textTransform: 'uppercase',
      fontSize: '12px',
      fontWeight: '500',
      minWidth: '100px',
      textAlign: 'center',
      color: theme.palette.text.color,
      backgroundColor: theme.palette.background.paper,
      [theme.breakpoints.down('sm')]: {
        minWidth: '100%',
        borderRadius: 3,
        width: '100%'
      }
    },
    movingTab: {
      position: 'absolute',
      textAlign: 'center',
      padding: '12px',
      fontSize: '12px',
      textTransform: 'uppercase',
      WebkitFontSmoothing: 'subpixel-antialiased',
      top: '-4px',
      left: theme.direction == 'ltr' ? '0px' : '',
      borderRadius: '4px',
      color: theme.palette.text.color,
      cursor: 'pointer',
      fontWeight: '500',
      backgroundColor: theme.palette.primary.main,
      boxShadow: theme.shadows[12],
      [theme.breakpoints.down('sm')]: {
        // left: 'auto',
        right: 'auto',
        minWidth: '100%',
        minHeight: 40,
        maxHeight: 40
      }
    },
    content: {
      marginTop: '20px',
      minHeight: '340px',
      padding: '20px 15px',
    },
    bgLocation: {
      backgroundColor: theme.palette.background.default,
    },
    stepContent: {
      display: 'none',
    },
    stepContentActive: {
      display: 'block',
    },
    footer: {
      padding: '0 15px',
    },
    footerBgLocation: {
      backgroundColor: theme.palette.background.default,
    },
    left: {
      float: theme.direction == 'ltr' ? important('left') : important('right'),
    },
    right: {
      float: theme.direction == 'ltr' ? important('right') : important('left'),
    },
    clearfix: {
      '&:after,&:before': {
        display: 'table',
        content: '" "',
      },
      clear: 'both',
    },
    previousButton: {
      fontSize: 12,
      fontWeight: 500
    },
    nextButton: {
      fontSize: 12,
      fontWeight: 500
    },
    finishButton: {
      fontSize: 12,
      fontWeight: 500
    },
  }
})

export default stepsWizardStyles;