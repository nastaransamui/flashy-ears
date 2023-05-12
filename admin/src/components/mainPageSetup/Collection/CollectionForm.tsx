import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import { FC, Fragment, useEffect, useState } from 'react';
import collectionStyles from './collection-style';
import createCollectionHook from './createCollectionHook';
import Title from '@/shared/Title/Title'
import { useTranslation } from "react-i18next";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import FormControlLabel from '@mui/material/FormControlLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SingleDropzoneField from '@/shared/SingleDropzoneField';
import Box from '@mui/material/Box';
export interface CollectionFormPropsType {
  values: any;
  register: any;
  errors: any;
  watch?: any;
  resetField?: any;
  formType?: string;
  setValues?: any;
  setError?: any;
  clearErrors?: any;
  setValue?: any;
  control?: any;
  Controller?: any;
  getValues?: any;
  setImageValidate?: any;
  setProductValidation?: any;
}

export const CollectionFormInformation: FC<CollectionFormPropsType> = (props: CollectionFormPropsType) => {
  const { classes } = collectionStyles({});
  const { t } = useTranslation('Collections')
  const { register, errors, watch, setError, clearErrors, values } = props;
  useEffect(() => {
    const subscription = watch((value: any, { type, name }: { type: string, name: string }) => {

    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div>
      <Grid container spacing={3}>
        {
          Object.keys(values[0]).map((val: any, i: number) => {
            return (
              <Grid item xs={12} md={6} key={i}>
                <TextField
                  variant='outlined'
                  fullWidth
                  required
                  size='small'
                  label={t(val)}
                  InputLabelProps={{ shrink: !!watch(val) }}
                  error={errors[val] == undefined ? false : true}
                  helperText={errors[val] && errors[val][`message`]}
                  {...register(val, { required: t('required', { ns: 'common' }) })}
                />
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  )
}

export const CollectionFormImages: FC<CollectionFormPropsType> = (props: CollectionFormPropsType) => {
  const { classes, theme } = collectionStyles({});
  const { t } = useTranslation('Collections')
  const [updateParentImage, setUpdateParentImage] = useState('')
  const { values, register, errors, watch, resetField, setValue, setValues, control, Controller, getValues, setImageValidate, clearErrors, setError } = props;
  useEffect(() => {
    const subscription = watch((value: any, { type, name }: { type: string, name: string }) => {

      let valueDrop = value[name]
      if (valueDrop !== undefined) {
        if (
          (value['img_light'] !== undefined && value['img_dark'] !== undefined) &&
          (value['img_light'] !== '' && value['img_dark'] !== '')
        ) {
          setImageValidate(() => true)
        } else {
          setImageValidate(() => false)
        }
      } else {
        setImageValidate(() => false)
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (getValues('img_light') !== undefined && getValues('img_dark') !== undefined) {
      setImageValidate(() => true);
    } else {
      setImageValidate(() => false);
    }
  }, [])

  return (
    <div>
      <Grid container spacing={1} direction="row"
        justifyContent="space-evenly"
        alignItems="center"  >
        <Grid item xs={12} md={5} sx={{ border: `1px solid ${theme.palette.primary.main}`, padding: 2, borderRadius: 5 }}>
          <Typography variant="h6" gutterBottom align="center" dangerouslySetInnerHTML={{ __html: t('img_light') }} />
          <Grid
            container direction="row" justifyContent="space-evenly" alignItems="center"

          >
            {values[1]['img_light'] == '' || (values[1]['img_light'][0]['src'] == '') ?
              <>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  minHeight: '50vh',
                  border: `2px solid ${theme.palette.primary.main}`,
                  marginTop: '10px'
                }}
                  className={classes.labelRoot}>
                  <SingleDropzoneField
                    name="img_light"
                    Controller={Controller}
                    control={control}
                    t={t}
                    setValue={setValue}
                    getValues={getValues}
                    classes={classes}
                    setValues={setValues}
                    errors={errors}
                    a='img_light'
                    values={values}
                    index={0}
                    setUpdateParentImage={setUpdateParentImage}
                  />
                </Box>
              </> :
              <Grid item xs={12} md={12} className={classes.imgBox}
                sx={{ border: `2px solid ${theme.palette.secondary.main}`, }}>
                <p style={{ textAlign: 'center', margin: 0 }} ></p>
                <IconButton
                  disableFocusRipple disableRipple disableTouchRipple
                  className={classes.deleteButton} onClick={(e) => {
                    //create
                    values[1]['img_light'] = URL.revokeObjectURL(values[1]['img_light'])
                    resetField(`img_light`)
                    values[1]['img_light'] = ''
                    setValues((prevState: any) => {
                      return [...prevState]
                    })
                    setImageValidate(() => false)
                  }}>
                  <DeleteIcon sx={{ color: 'crimson' }} />
                </IconButton>
                <img
                  src={values[1]['img_light'][0]['src']}
                  width={values[1]['img_light'][0]['width']}
                  className={classes.img} />
              </Grid>
            }
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} sx={{ border: `1px solid ${theme.palette.primary.main}`, padding: 2, borderRadius: 5 }}>
          <Typography variant="h6" gutterBottom align="center" dangerouslySetInnerHTML={{ __html: t('img_dark') }} />
          <Grid
            container direction="row" justifyContent="space-evenly" alignItems="center"

          >
            {values[1]['img_dark'] == '' || (values[1]['img_dark'][0]['src'] == '') ?
              <>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  minHeight: '50vh',
                  border: `2px solid ${theme.palette.primary.main}`,
                  marginTop: '10px'
                }}
                  className={classes.labelRoot}>
                  <SingleDropzoneField
                    name="img_dark"
                    Controller={Controller}
                    control={control}
                    t={t}
                    setValue={setValue}
                    getValues={getValues}
                    classes={classes}
                    setValues={setValues}
                    errors={errors}
                    a='img_dark'
                    values={values}
                    index={0}
                    setUpdateParentImage={setUpdateParentImage}
                  />
                </Box>
              </> :
              <Grid item xs={12} md={12} className={classes.imgBox}
                sx={{ border: `2px solid ${theme.palette.secondary.main}`, }}>
                <p style={{ textAlign: 'center', margin: 0 }} ></p>
                <IconButton
                  disableFocusRipple disableRipple disableTouchRipple
                  className={classes.deleteButton} onClick={(e) => {
                    if (typeof getValues(`img_dark`) == 'object') {
                      //create
                      values[1]['img_dark'] = URL.revokeObjectURL(values[1]['img_dark'])
                      resetField(`img_dark`)
                      values[1]['img_dark'] = ''
                      setValues((prevState: any) => {
                        return [...prevState]
                      })
                    }
                  }}>
                  <DeleteIcon sx={{ color: 'crimson' }} />
                </IconButton>
                <img
                  src={values[1]['img_dark'][0]['src']}
                  width={values[1]['img_dark'][0]['width']}
                  className={classes.img} />
              </Grid>
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

