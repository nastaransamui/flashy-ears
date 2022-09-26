import useStyles from "./error-style";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'


export default function Error(props:any ){
  const {classes} = useStyles({});
  const { errorCode, text, router, t, type } = props;

  return(
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
              <Typography variant='h4'>{text}</Typography>
              <Typography>{t('404_subtitle')}</Typography>
              <Button
                variant='outlined'
                size='large'
                color='primary'
                onClick={() => {
                  if (type == 'next') {
                    router.push('/');
                  } else {
                    console.log("Error should update history.push")
                    // history.push('/admin/dashboard');
                  }
                }}
                className={classes.button}>
                {t('back')}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )

}