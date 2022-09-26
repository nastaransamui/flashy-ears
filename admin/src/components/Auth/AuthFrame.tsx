import PropTypes from 'prop-types';
import clsx from 'clsx';
import brand from '../../../public/text/brand';

import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material';

import logo from '@/public/images/logo.png';
import authStyles from './auth-style';


import { useText } from '@/theme/common';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
  title: string;
  subtitle: string;
}
type ObjectKey = keyof typeof brand;


const AuthFrame: React.FC<Props> = ({ children, title, subtitle }) => {
  const  {classes}  = authStyles({});
  const {i18n} = useTranslation();
  const {classes: text} = useText({})
  const langName = `name_${i18n.language}` as ObjectKey;

  return (
    <div className={classes.pageWrap}>
      <Hidden smUp>
        <div className={clsx(classes.logo, classes.logoHeader)}>
          <a href={process.env.NEXT_PUBLIC_HOME_URL}>
            <img src={logo.src} alt='logo' />
            <Typography component='p' className={text.subtitle2}>
            {brand[langName]}
            </Typography>
          </a>
        </div>
      </Hidden>
        <Container maxWidth='lg' className={classes.innerWrap}>
          <div className={classes.decoration}>
            <svg className={classes.leftDeco}>
              <use xlinkHref='/admin/images/svg/deco-bg-left.svg#main' />
            </svg>
            <svg className={classes.rightDeco}>
              <use xlinkHref='/admin/images/svg/deco-bg-right.svg#main' />
            </svg>
          </div>
          <Paper className={classes.paperClass}>
            <IconButton
              href={`${process.env.NEXT_PUBLIC_HOME_URL}`}
              target='_blank'
              className={classes.backtohome}
              >
              <i className='ion-ios-home-outline' />
              {i18n.language !== 'fa' ? (
                <i className='ion-ios-arrow-thin-left' />
              ) : (
                <i className='ion-ios-arrow-thin-right' />
              )}
            </IconButton>
            <div className={classes.authFrame}>
              <Grid container spacing={0}>
                <Grid item md={5} xs={12} style={{zIndex: 2}}>
                  <Hidden smDown>
                    <div className={classes.greeting}>
                      <div className={classes.logo}>
                        <img src={logo.src} alt='logo' />
                        <Typography className={text.subtitle2}>
                          {brand[langName]}
                        </Typography>
                      </div>
                      <Typography
                        gutterBottom
                        variant='h4'
                        className={text.subtitle}>
                        {title}
                      </Typography>
                      <Typography variant='h6' className={text.paragraph}>
                        {subtitle}
                      </Typography>
                    </div>
                  </Hidden>
                </Grid>
                <Grid item md={7} xs={12}>
                  <div className={classes.formWrap}>{children}</div>
                </Grid>
              </Grid>
            </div>
          </Paper>

        </Container>
    </div>
  )
}

AuthFrame.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

AuthFrame.defaultProps = {
  subtitle: '',
};

export default AuthFrame;