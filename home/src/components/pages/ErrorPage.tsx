import PropTypes from 'prop-types'
import useStyles from "./error-style";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import { FC } from 'react';
import useShallowTranslation from '../Hooks/useShallowTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useWrapper from '@/shared/AppWrapper/useAppWrapper';


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
  return (
    <div className={classes.errorWrap}>
      <div className="lang-menu " >
        <div className={`selected-lang  ${lang}`}>
          {t(lang)}
        </div>
        <ul>
          <li>
            <Link
              href={{
                pathname: hasQuery ? router.route : router.asPath,
                query: router.query,
              }}
              replace locale={lang == 'en' ? 'th' : 'en'} scroll={false} shallow={true} legacyBehavior>
              <a role="button" className={lang == 'en' ? 'th' : 'en'}>{lang == 'en' ? t('th') : t('en')}</a>
            </Link>
          </li>
        </ul>
      </div>
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
  );
};

ErrorPage.propTypes = {
  t: PropTypes.func.isRequired,
  errorCode: PropTypes.string.isRequired
};

export default ErrorPage;