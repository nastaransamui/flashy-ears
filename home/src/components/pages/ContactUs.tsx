
import { ChangeEvent, FC, useState, useEffect, Fragment } from "react";
import contactStyles from "./contact-style";
import useShallowTranslation from '@/hookes/useShallowTranslation'
import SideBar from "@/shared/SideBar";
import Snackbar from '@mui/material/Snackbar';
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Hidden from '@mui/material/Hidden'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button'
import axios from "axios";

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Link from "next/link";
import { useDispatch } from "react-redux";
import SocialMedia from "../Shared/SocialMedia/SocialMedia";
import Script from "next/script";

const ContactUs: FC = (() => {
  const { t, lang } = useShallowTranslation('common');
  const { classes, cx, theme } = contactStyles({})
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [openNotif, setOpenNotif] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<AlertColor>('success')
  const [alertText, setAlertText] = useState<string>(t('messageSucces'))
  const dispatch = useDispatch();

  const handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
  };

  const handleSubmit = async (e: any) => {
    var Particles = (await import('../../../public/js/particles')).default;
    var bttn = e.target?.querySelector('button')!

    const particles = new Particles(bttn, {});


    particles.disintegrate();

    dispatch({
      type: 'HOME_FORM_SUBMIT',
      payload: true
    })
    axios.post(
      `/api/contact`, {
      ...values
    },
      {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }).then(((res) => {
        const { success, message } = res.data
        if (res.status == 200 && success) {
          dispatch({
            type: 'HOME_FORM_SUBMIT',
            payload: false
          })
          particles.integrate()
          setValues({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
          })
          setAlertType('success')
          setOpenNotif(true)
          setAlertText(message)
        }
      }))
      .catch((err) => {
        setAlertType('error')
        setOpenNotif(true)
        setAlertText(err.response?.data?.message)
        dispatch({
          type: 'HOME_FORM_SUBMIT',
          payload: false
        })
        particles.integrate()
      })
  };

  const handleClose = () => {
    setOpenNotif(false);
  };

  useEffect(() => {
    document.getElementById('main')!.style.padding = `0px 0px`;
  }, [])

  return (
    <Fragment>
      <SideBar >
        <>
          <div className={classes.pageWrap}>
            <Snackbar
              open={openNotif}
              autoHideDuration={4000}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              key='top right'
              onClose={handleClose}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
            >
              <MuiAlert
                elevation={12}
                variant="filled"
                severity={alertType}
                onClose={handleClose} >{alertText}</MuiAlert>
            </Snackbar>
            <Hidden mdUp>
              <div className={cx(classes.logo, classes.logoHeader)}>
                <Link href="/" locale={lang}>
                  <img src={`/images/logo_${theme.palette.mode}.png`} alt='' />
                  <Typography component='span' className={classes.subtitle2}>
                    {t('title')}
                  </Typography>
                </Link>
              </div>
            </Hidden>
            <Container maxWidth='md' className={classes.innerWrap}>
              <Paper className={cx(classes.formBox, 'fragment-fadeUp')}>
                <div className={classes.fullFromWrap}>
                  <Typography
                    variant='h3'
                    align='center'
                    className={cx(classes.title, classes.title)}
                    gutterBottom>
                    {t('contact_title2')}
                  </Typography>
                  <Typography className={cx(classes.subtitle2)}>
                    {t('contact_subtitle')}
                  </Typography>
                  <div >
                    <ValidatorForm
                      onSubmit={handleSubmit}>
                      <Grid container spacing={6}>
                        <Grid item md={6} xs={12}>
                          <TextValidator
                            variant='filled'
                            className={cx(classes.input, classes.light)}
                            label={t('form_name')}
                            onChange={handleChange('name')}
                            name='Name'
                            value={values.name}
                            validators={['required']}
                            errorMessages={t('form_require')}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextValidator
                            variant='filled'
                            className={cx(classes.input, classes.light)}
                            label={t('form_email')}
                            onChange={handleChange('email')}
                            name='Email'
                            value={values.email}
                            validators={['required', 'isEmail']}
                            errorMessages={[t('form_require'), t('form_email_require')]}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextValidator
                            variant='filled'
                            className={cx(classes.input, classes.light)}
                            label={t('form_subject')}
                            onChange={handleChange('subject')}
                            name='Subject'
                            value={values.subject}
                            validators={['required']}
                            errorMessages={[t('form_require')]}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextValidator
                            variant='filled'
                            className={cx(classes.input, classes.light)}
                            label={t('form_phone')}
                            onChange={handleChange('phone')}
                            name='Phone'
                            value={values.phone}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextValidator
                            variant='filled'
                            multiline
                            rows='6'
                            className={cx(classes.input, classes.light)}
                            label={t('form_message')}
                            onChange={handleChange('message')}
                            name='Message'
                            value={values.message}
                            validators={['required']}
                            errorMessages={t('form_require')}
                          />
                        </Grid>
                      </Grid>
                      <div className={cx(classes.btnArea, classes.flex)}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              className={classes.check}
                              checked={check}
                              onChange={(e) => handleCheck(e)}
                              color='secondary'
                              value='check'
                            />
                          }
                          label={
                            <span>
                              {t('form_terms')}
                              <br />
                              <a href='#'>{t('form_privacy')}</a>
                            </span>
                          }
                        />
                        <Button
                          sx={{ color: 'black' }}
                          variant='contained'
                          fullWidth={isMobile}
                          type='submit'
                          color='secondary'
                          className={classes.particlesButton}
                          size='large'>
                          {t('form_send')}
                        </Button>
                      </div>
                    </ValidatorForm>


                    <SocialMedia />
                  </div>
                </div>
              </Paper>
            </Container>
            <Script src="/js/particles.js" ></Script>
            <Script>

            </Script>
          </div>
        </>
      </SideBar>
    </Fragment>
  )
})

export default ContactUs