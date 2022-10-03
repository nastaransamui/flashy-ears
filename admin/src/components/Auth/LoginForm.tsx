
import Typography from '@mui/material/Typography'
import LangPack from '@/src/components/Auth/LangPack'
import Title from '@/src/components/Shared/Title/Title';
import authStyles from './auth-style';
import Grid from '@mui/material/Grid';
import Email from '../Shared/Inputs/Email';
import Password from '../Shared/Inputs/Password';

import Button from '@mui/material/Button'

import useLoginForm from './useLoginForm';


const LoginForm = (props: any) => {
  const { classes } = authStyles({})
  const { t } = props;

  const { values, setValues, control, handleSubmit, onSubmit } = useLoginForm();



  return (

    <div>
      <div className={classes.head}>
        <Title align='center'>{t('login')}</Title>
      </div>
      <LangPack />
      <div className={classes.separator}>
        <Typography>{t('login_or')}</Typography>
      </div>
      <form noValidate>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Email control={control} name="email" value={values.email} setValues={setValues} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Password control={control} name="password" value={values.password} setValues={setValues} showPassword={values.showPassword} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
        <div className={classes.btnArea}>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant='contained'
            fullWidth
            style={{ color: 'black' }}
            color='secondary'
            size='large'>
            {t('continue')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm