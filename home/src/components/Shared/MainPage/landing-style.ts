import { SlidesType } from '@/src/redux/store';
import { CSSProperties } from 'react';
import { makeStyles } from 'tss-react/mui';

const LangingStyle = makeStyles<
  { slides: SlidesType[] },
  'animeElement' | 'heroFigure' | 'button' | 'sectionInner'
>({
  name: 'LangingStyle',
  uniqId: 'uniqueLangingStyle',
})((theme, params, classes) => {
  const { slides } = params;

  const heroBoxfigure = {
    overflow: 'hidden',
  };
  const heroBoxfigureBefore = {
    content: '" "',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transformOrigin: '100% 100%',
  } as CSSProperties;
  const heroFigureBefore = {
    content: '" "',
    position: 'absolute',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    opacity: 0,
    transition: `opacity 2s ease`,
  } as CSSProperties;
  return {
    isBoxed: {
      background: theme.palette.background.default,
      '& main': {
        flex: `1 0 auto`,
        '& section': {
          display: 'block',
        },
      },
    },
    hasAnimation: {},
    bodyWrap: {
      background: theme.palette.background.default,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    siteHeader: {
      padding: '24px 0',
      position: 'relative',
      '&::before': {
        content: '" "',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '700px',
        backgroundColor: theme.palette.primary.main,
        background: `linear-gradient(80deg, ${theme.palette.background.paper} 0%, rgba(36,40,48,0) 100%)`,
        WebkitTransformOrigin: 0,
        transformOrigin: 0,
        WebkitTransform: 'skewY(-12deg)',
        transform: 'skewY(-12deg)',
      },
    },
    siteHeaderInner: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    container: {
      width: '100%',
      margin: '0 auto',
      paddingLeft: '24px',
      maxWidth: `1128px`,
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    },
    containerSm: {
      width: '100%',
      margin: '0 auto',
      paddingLeft: '24px',
      maxWidth: `848px`,
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 0,
      },
    },
    hero: {
      textAlign: 'center',
      paddingTop: '48px',
      paddingBottom: '88px',
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left',
        paddingTop: '64px',
        paddingBottom: '88px',
      },
    },
    heroCopy: {
      position: 'relative',
      zIndex: 1,
      [theme.breakpoints.only('xs')]: {
        marginLeft: '40px',
      },
      [theme.breakpoints.down('md')]: {
        marginTop: '50px',
        display: slides.length == 0 ? 'block' : 'flex',
        paddingRight: '20px !important',
        minWidth: '100% !important',
        [`.slider`]: {
          width: '200%',
        },
      },
      [theme.breakpoints.up('sm')]: {
        paddingRight: '64px',
        minWidth: '552px',
        width: '552px',
      },
    },
    heroParagraph: {
      marginTop: 0,
      marginBottom: '24px',
    },
    heroInner: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
      },
    },
    h1: {
      marginTop: 0,
      marginBottom: '16px',
      fontSize: '2em',
      margin: '0.67em 0',
      clear: 'both',
      fontWeight: 600,
      [theme.breakpoints.up('sm')]: {
        fontSize: '44px',
        lineHeight: '54px',
        letterSpacing: '0px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '38px',
        lineHeight: '48px',
        letterSpacing: '0px',
      },
    },
    heroCta: {
      marginBottom: '40px',
      margin: 0,
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-between',
        [`.${classes.button}`]: {
          '&:first-of-type': {
            width: '90%',
            marginBottom: 5,
            marginLeft: 10,
          },
          '&:last-of-type': {
            width: '90%',
            marginTop: 5,
            marginLeft: 10,
          },
        },
      },
      [`.${classes.button}`]: {
        '&:first-of-type': {
          marginRight: '16px',
        },
      },
    },
    heroFigure: {
      position: 'relative',
      '& svg': {
        width: '100%',
        height: 'auto',
      },
      '&::before': {
        ...heroFigureBefore,
        top: '-57.8%',
        left: '-1.3%',
        width: '152.84%',
        height: '178.78%',
        backgroundImage: `url('/images/hero-back-illustration.svg')`,
      },
      '&::after': {
        ...heroFigureBefore,
        top: '-35.6%',
        left: '99.6%',
        width: '57.2%',
        height: '87.88%',
        // backgroundImage: `url('/images/hero-top-illustration.svg')`,
      },
    },
    animeElement: {
      visibility: 'hidden',
    },
    animeReady: {
      visibility: 'visible',
      [`.${classes.animeElement}`]: {
        visibility: 'visible',
      },
      [`.${classes.heroFigure}`]: {
        [theme.breakpoints.down('sm')]: {
          marginTop: 250,
        },
        '&::before': {
          opacity: 1,
        },
        '&::after': {
          opacity: 1,
        },
      },
    },
    herorBox: {
      position: 'absolute',
      top: 0,
      willChange: 'transform',
    },
    heroBox1: {
      ...heroBoxfigure,
      left: '95.2%',
      top: '41.9%',
      width: '28.03%',
      height: '43.37%',
      // background: `linear-gradient(to left top, ${theme.palette.secondary.main}, rgba(0,191,251,0))`,
      transform: 'rotateZ(45deg)',
      backgroundImage: 'url(/img/square/whiteCrooked_front.png) ',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      [theme.breakpoints.down('sm')]: {
        top: '91%',
        left: '75.2%',
      },
      '&::before': {
        ...heroBoxfigureBefore,
        // background: `linear-gradient(to left, #15181D 0%, rgba(21,24,29,0) 60%)`,
        transform: 'rotateZ(45deg) scale(1.5)',
      },
    },
    heroBox2: {
      left: '71.3%',
      top: '74.1%',
      width: '37.87%',
      height: '50.50%',
      backgroundImage: 'url(/img/octagon/red_front.png) ',
      [theme.breakpoints.down('sm')]: {
        left: '50%',
      },
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '50% 100%',
      transform: 'rotateZ(-45deg)',
      ...heroBoxfigure,
      '&::before': {
        ...heroBoxfigureBefore,
        transform: 'rotateZ(-45deg) scale(1.5)',
      },
    },
    heroBox3: {
      left: '87.7%',
      top: '-33.8%',
      width: '36.81%',
      height: '75.75%',
      backgroundImage: 'url(/img/triangle/violet_front.png) ',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      transform: 'rotateZ(-45deg)',
      [theme.breakpoints.down('sm')]: {
        left: '60%',
      },
      ...heroBoxfigure,
      '&::before': {
        ...heroBoxfigureBefore,
        transform: 'rotateZ(-45deg) scale(1.5)',
      },
    },
    heroBox4: {
      left: '29.9%',
      top: '12%',
      width: '35.45%',
      height: '70.60%',
      // background: `linear-gradient(to left top, blue, rgba(2,112,215,0))`,
      backgroundImage: 'url(/img/socks/green_front.png) ',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      transform: 'rotateZ(-135deg)',
      ...heroBoxfigure,
      '&::before': {
        ...heroBoxfigureBefore,
        // background:
        // 'linear-gradient(to top, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 60%)',
        transform: 'rotateZ(-45deg) scale(1.5)',
      },
    },
    heroBox5: {
      // background: 'yellowgreen',
      // backgroundImage: 'url(/img/half1.png) ',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '50% 100%',
      boxShadow: '-20px 32px 64px rgba(#000, .25)',
      left: '17.4%',
      top: '43.3%',
      width: '100%',
      height: '50%',
      // transform:
      //   'perspective(500px) rotateY(-15deg) rotateX(8deg) rotateZ(-1deg)',
    },
    heroBox6: {
      // background: 'green',
      backgroundImage: 'url(/img/oval/black_front.png) ',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '50% 100%',
      boxShadow: '-20px 32px 64px rgba(#000, .25)',
      [theme.breakpoints.down('sm')]: {
        top: '30%',
      },
      left: '65.5%',
      top: '6.3%',
      width: '30.3%',
      height: '40.4%',
      transform: 'rotateZ(20deg)',
    },
    heroBox7: {
      // background: theme.palette.primary.main,
      boxShadow: '-20px 32px 64px rgba(#000, .25)',
      left: '1.9%',
      top: '42.4%',
      width: '32.12%',
      height: '36.16%',
      transform: 'rotateZ(20deg)',
      backgroundImage: 'url(/img/diamond/violet_front.png) ',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '50% 100%',
    },
    heroBox8: {
      left: '27.1%',
      top: '81.6%',
      width: '48.51%',
      height: '56.01%',
      // background: `#0270D7`,
      backgroundImage: 'url(/img/crookedTriangle/pink_front.png) ',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '50% 100%',
      transform: 'rotateZ(-22deg)',
      [theme.breakpoints.down('sm')]: {
        left: '10%',
      },
      ...heroBoxfigure,
      '&::before': {
        ...heroBoxfigureBefore,
        // background:
        //   'linear-gradient(to left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.48) 100%)',
        transform: 'rotateZ(45deg) scale(1.5)',
      },
    },
    heroBox9: {
      left: '42.6%',
      top: '-17.9%',
      width: '40.63%',
      height: '58.83%',
      // background: `#ff00dd`,
      transform: 'rotateZ(52deg)',
      backgroundImage: 'url(/img/longTriangle/orange_front.png) ',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '50% 100%',
      [theme.breakpoints.between('sm', 'md')]: {
        top: '-9.3%',
      },
      [theme.breakpoints.down('sm')]: {
        left: '30%',
      },
      ...heroBoxfigure,
      '&::before': {
        ...heroBoxfigureBefore,
        // background:
        //   'linear-gradient(to left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.64) 100%)',
        transform: 'rotateZ(45deg) scale(1.5)',
      },
    },
    heroBox10: {
      left: '-23.8%',
      top: '-24.3%',
      width: '45%',
      height: '50%',
      // background: rgba(#00BFFB, .32),
      // background: '#daff06',
      backgroundImage: 'url(/img/bell/blue_front.png) ',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '50% 100%',
      transform: 'rotateZ(-50deg)',
      [theme.breakpoints.between('sm', 'md')]: {
        top: '-4.3%',
      },
      [theme.breakpoints.down('sm')]: {
        left: 0,
      },
    },
    button: {
      fontWeight: 600,
      lineHeight: '16px',
      textDecoration: 'none !important',
      textTransform: 'uppercase',
      border: 'none',
      borderRadius: '2px',
      padding: '16px 32px',
      height: '48px',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    },
    //features
    features: {},
    section: {},
    featuresInner: {},
    sectionInner: {
      position: 'relative',
      paddingTop: '48px',
      paddingBottom: '48px',
      [theme.breakpoints.up('sm')]: {
        paddingTop: `88px`,
        paddingBottom: `88px`,
      },
    },
    hasBottomDivider: {
      position: 'relative',
      '&::after': {
        content: '" "',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'block',
        height: 1,
        background: theme.palette.text.color,
      },
    },
    featuresWrap: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      marginRight: -32,
      marginLeft: -32,
      '&:first-of-type': {
        marginTop: -16,
        [theme.breakpoints.up('sm')]: {
          marginTop: -24,
        },
      },
      '&:last-of-type': {
        marginBottom: -16,
        [theme.breakpoints.up('sm')]: {
          marginBottom: -24,
        },
      },
    },
    feature: {
      padding: '16px 32px',
      width: 380,
      maxWidth: 380,
      flexGrow: 1,
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        padding: '32px 32px',
      },
    },
    isRevealing: {
      visibility: 'hidden',
    },
    featureInner: {
      height: '100%',
    },
    featureIcon: {
      display: 'flex',
      justifyContent: 'center',
    },
    textSm: {
      fontSize: '18px',
      lineHeight: '28px',
      letterSpacing: '-0.1px',
      marginBottom: 0,
    },
    pricing: {},
    pricingHeader: {
      marginBottom: '48px',
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        marginBottom: '52px',
      },
    },
    sectionParagraph: {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: '90px',
        paddingRight: '90px',
      },
    },
    pricingTablesWrap: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginRight: '-12px',
      marginLeft: '-12px',
      '&:first-of-type': {
        marginTop: '-12px',
      },
      '&:last-child': {
        marginTop: '-12px',
      },
    },
    pricingTable: {
      position: 'relative',
      padding: 12,
      width: 368,
      maxWidth: 368,
      [theme.breakpoints.only('xs')]: {
        paddingLeft: '30px',
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: '90%',
      },
      flexGrow: 1,
      '&::before': {
        content: '" "',
        position: 'absolute',
        left: '50%',
        width: '200%',
        maxWidth: '200%',
        height: 450,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100%',
        bottom: '18.8%',
        WebkitTransform: 'translateX(-50%)',
        transform: 'translateX(-50%)',
        backgroundImage: `url(/images/pricing-illustration.svg)`,
      },
    },
    pricingTableInner: {
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      background: theme.palette.background.paper,
      borderRadius: 10,
      visibility: 'hidden',
      padding: '24px',
      height: '100%',
      '& >*': {
        position: 'relative',
        width: '100%',
      },
      '&::before': {
        content: '" "',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        boxShadow: `0 24px 48px rgba(21, 24, 29, 0.24)`,
        mixBlendMode: 'multiply',
      },
    },
    pricingTableMain: {},
    pricingTableHeader: {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      paddingBottom: '24px',
    },
    pricingTablePrice: {
      color: theme.palette.text.disabled,
    },
    pricingTablePriceCurrency: {
      color: theme.palette.text.color,
      fontWeight: 600,
      clear: 'both',
      marginTop: '48px',
      marginBottom: '16px',
      [theme.breakpoints.up('sm')]: {
        fontSize: '38px',
        lineHeight: '48px',
        letterSpacing: `0px`,
      },
    },
    pricingTablePriceAmount: {
      color: theme.palette.text.color,
      marginTop: '48px',
      marginBottom: '16px',
      [theme.breakpoints.up('sm')]: {
        fontSize: '44px',
        lineHeight: '54px',
        letterSpacing: `0px`,
      },
    },
    pricingTableFeaturesTitle: {
      fontWeight: 700,
      color: theme.palette.text.hint,
      paddingBottom: '24px',
      paddingTop: '24px',
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    pricingTableFeatureLI: {
      // '& > li': {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      display: 'flex',
      alignItems: 'center',
      padding: '14px 0',
      // '&::before': {
      //   content: '" "',
      //   width: '36px',
      //   height: '32px',
      //   marginRight: '16px',
      //   backgroundImage: 'url(/images/diamond.svg) ',
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundSize: '100% 100%',
      // },
      // },
    },
    liSvg: {
      // display: 'block',
      // margin: 30,
      '& li': {
        paddingLeft: 30,
      },
      '& svg': {
        maxHeight: 40,
        position: 'absolute',
        left: -100,
        marginTop: 5,
        paddingLeft: 30,
      },
    },
    listReset: {
      listStyle: 'none',
      padding: 0,
    },
    textXS: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '-0.1px',
    },
    pricingTableCta: {
      alignSelf: 'flex-end',
      marginBottom: '8px',
    },
    h2: {
      marginTop: 0,
      marginBottom: '16px',
      [theme.breakpoints.up('sm')]: {
        fontSize: '38px',
        lineHeight: '48px',
        letterSpacing: '0px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '32px',
        lineHeight: '42px',
        letterSpacing: '0px',
      },
    },
    ctaSection: {
      textAlign: 'left',
      display: 'block',
    },
    ctaInner: {
      [theme.breakpoints.only('xs')]: {
        borderRadius: 15,
        marginLeft: '20px',
      },
      position: 'relative',
      background: theme.palette.background.paper,
      overflow: 'hidden',
      '& >*': {
        position: 'relative',
      },
      '&::before': {
        content: '" "',
        position: 'absolute',
        right: '98px',
        top: '-117px',
        width: '160px',
        height: '187px',
        backgroundImage: `url(/images/cta-illustration.svg)`,
        backgroundRepeat: 'no-repeat',
      },
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    },
    sectionTitle: {
      marginBottom: '40px',
      marginTop: 0,
      [theme.breakpoints.up('sm')]: {
        marginBottom: 0,
        paddingRight: '24px',
        fontSize: '32px',
        lineHeight: '42px',
        letterSpacing: 0,
      },
    },
    ctaCta: {},
    siteFooter: {
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: 0,
      [theme.breakpoints.up('sm')]: {
        marginTop: '20px',
      },
      '* > a': {
        color: theme.palette.text.disabled,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
        '&:active': {
          textDecoration: 'underline',
        },
      },
    },
    siteFooterInner: {
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      paddingTop: '48px',
      paddingBottom: '48px',
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'space-between',
        paddingTop: '48px',
        paddingBottom: '64px',
      },
    },
    brand: {},
    footerBrand: {
      flex: 'none',
      width: '100%',
      display: 'inline-flex',
      justifyContent: 'center',
      marginBottom: '24px',
      [theme.breakpoints.up('sm')]: {
        flex: '50%',
        justifyContent: 'flex-start',
      },
    },
    footerLinks: {
      flex: 'none',
      width: '100%',
      display: 'inline-flex',
      justifyContent: 'center',
      marginBottom: '24px',
      [theme.breakpoints.only('xs')]: {
        justifyContent: 'flex-end',
        '& li ': {
          marginLeft: '34px !important',
        },
      },
      '& li ': {
        marginLeft: '24px',
        listStyle: 'none',
        padding: 0,
      },
      [theme.breakpoints.up('sm')]: {
        flex: '50%',
        justifyContent: 'flex-end',
        order: 1,
        marginBottom: 0,
      },
    },
    footerSocialLinks: {
      flex: 'none',
      width: '100%',
      display: 'inline-flex',
      justifyContent: 'center',
      marginBottom: '24px',
      [theme.breakpoints.up('sm')]: {
        flex: '50%',
        justifyContent: 'flex-end',
      },
      '& li ': {
        display: 'inline-flex',
        marginLeft: '16px',
        '& a': {
          padding: '8px',
        },
      },
    },
    screenReaderText: {
      clip: ' rect(1px, 1px, 1px, 1px)',
      position: 'absolute',
      height: '1px',
      width: '1px',
      overfolw: 'hidden',
      wordWrap: 'normal',
      '&:hover': {
        borderRadius: 2,
        boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.6)',
        clip: 'auto !important',
        display: 'block',
        fontSize: '14px',
        letterSpacing: 0,
        fontWeight: 600,
        lineHeight: '16px',
        textDecoration: 'none',
        textTransform: 'uppercase',
        background: theme.palette.primary.dark,
        color: '#0270d7 !important',
        border: 'none',
        height: 'auto',
        left: '8px',
        padding: '16px 32px',
        top: '8px',
        width: 'auto',
        zIndex: 1000000,
      },
    },
    footerCopyright: {
      flex: 'none',
      width: '100%',
      display: 'inline-flex',
      justifyContent: 'center',
      [theme.breakpoints.only('xs')]: {
        padding: '30px 0',
      },
      [theme.breakpoints.up('sm')]: {
        flex: '50%',
        justifyContent: 'flex-start',
      },
    },
    headerLogoImage: {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      width: 100,
      height: 100,
    },
    footerLogoImage: {
      // position: 'absolute',
      cursor: 'pointer',
      width: 100,
      height: 100,
    },

    //Slides
    sliderImage: {
      [theme.breakpoints.only('xs')]: {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover  !important',
      },
      [theme.breakpoints.only('sm')]: {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover  !important',
      },
      [theme.breakpoints.only('md')]: {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover  !important',
      },
      [theme.breakpoints.only('lg')]: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        height: '100vh',
      },
      [theme.breakpoints.only('xl')]: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        height: '100vh',
      },
    },
    heroButtons: {
      position: 'absolute',
      width: '100%',
      zIndex: 90,
      textAlign: 'left',
      color: theme.palette.common.white,
      top: '55%',
      [theme.breakpoints.down('sm')]: {
        top: '55%',
      },
      [theme.breakpoints.only('xs')]: {
        top: '10%',
        textAlign: 'center',
      },
      [theme.breakpoints.only('md')]: {
        // top: -200,
      },
      [theme.breakpoints.only('xl')]: {
        bottom: '10%',
      },
    },
    title: {
      color: theme.palette.text.color,
    },
    subtitle: {
      color: theme.palette.text.color,
    },
    previousButton: {
      fontSize: 22,
      lineHeight: 0,
      display: 'block',
      position: 'absolute',
      cursor: 'pointer',
      top: '44%',
      zIndex: 331,
      padding: 10,
      '& svg': {
        '& polygon': {
          fill: `${theme.palette.text.color} !important`,
        },
      },
    },
    nextButton: {
      fontSize: 22,
      lineHeight: 0,
      right: 20,
      display: 'block',
      position: 'absolute',
      cursor: 'pointer',
      top: '44%',
      zIndex: 331,
      padding: 10,
      '& svg': {
        '& polygon': {
          fill: `${theme.palette.text.color} !important`,
        },
      },
    },
  };
});

export default LangingStyle;
