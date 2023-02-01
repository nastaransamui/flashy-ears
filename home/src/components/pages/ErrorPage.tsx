import PropTypes from 'prop-types'
import useStyles from "./error-style";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import { FC, createRef, useEffect } from 'react';
import useShallowTranslation from '../Hooks/useShallowTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useWrapper from '@/shared/AppWrapper/useAppWrapper';

// import dynamic from "next/dynamic";
// const SideBar = dynamic(() => import("@/shared/SideBar"), { ssr: false });
import SideBar from '@/shared/SideBar'

interface Props {
  t: any;
  errorCode: string
}

const ErrorPage: FC<Props> = (props: any) => {
  const { homeTheme } = useWrapper();
  const { t, errorCode } = props;
  const { lang } = useShallowTranslation('common')
  const router = useRouter();
  const hasQuery = router.asPath.includes('?');
  const { classes } = useStyles({ theme: homeTheme });
  const navRef = createRef<any>();
  const menuRef = createRef<any>();

  useEffect(() => {
    if (navRef.current !== null && menuRef.current !== null) {
      navRef.current.style.display = 'block'
      menuRef.current.style.display = 'flex'
    }
  }, [navRef])
  return (
    <SideBar >
      <div className={classes.errorWrap}>
        <Container maxWidth='md'>
          <Grid container spacing={0}>
            <Grid item md={4} xs={12}>
              <div className={classes.flex}>
                <div className={classes.deco}>
                  <Typography variant='h3'>{errorCode}</Typography>
                </div>
              </div>
            </Grid>
            <Grid item md={8} xs={12}>
              <div className={classes.text}>
                <Typography variant='h4'>{t('title')}</Typography>
                <Typography>{t('404_subtitle')}</Typography>
                <Button
                  variant='outlined'
                  size='large'
                  color='primary'
                  onClick={() => {
                    router.push('/', '/', { locale: lang, shallow: true, scroll: false });
                  }}
                  className={classes.button}>
                  {t('back')}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </SideBar>
  );
};

ErrorPage.propTypes = {
  t: PropTypes.func.isRequired,
  errorCode: PropTypes.string.isRequired
};

export default ErrorPage;