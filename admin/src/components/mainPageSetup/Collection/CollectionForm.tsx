import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import { FC, useEffect, useState } from 'react';
import collectionStyles from './collection-style';
import createCollectionHook from './createCollectionHook';
import Title from '@/shared/Title/Title'
import { useTranslation } from "react-i18next";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import FormControlLabel from '@mui/material/FormControlLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
}
//<div>{JSON.stringify(values[0])}</div>
export const CollectionFormFirst: FC<CollectionFormPropsType> = (props: CollectionFormPropsType) => {
  const { classes } = collectionStyles({});
  const { t } = useTranslation('Collections')
  const { register, errors, watch, setError, clearErrors } = props;
  useEffect(() => {
    const subscription = watch((value: any, { type, name }: { type: string, name: string }) => {
      if (name == 'title_en' || name == 'title_th' || name == 'linkTitle_en' || name == 'linkTitle_th') {
        if (value[name].length > 11) {
          setError(name, { type: 'maxLength', message: t('maxLength11', { ns: 'common' }) });
        } else {
          clearErrors(name);
        }
        if (value[name].length == 0) {
          setError(name, { type: 'required', message: t('required', { ns: 'common' }) });
        }
      }
      if (name == 'desc_en' || name == 'desc_th') {
        if (value[name].length > 37) {
          setError(name, { type: 'maxLength', message: t('maxLength37', { ns: 'common' }) });
        } else {
          clearErrors(name);
        }
        if (value[name].length == 0) {
          setError(name, { type: 'required', message: t('required', { ns: 'common' }) });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} >
          <TextField
            variant='outlined'
            fullWidth
            required
            size='small'
            label={t('title_en')}
            InputLabelProps={{ shrink: !!watch('title_en') }}
            error={errors.title_en == undefined ? false : true}
            helperText={errors.title_en && errors?.title_en?.message}
            {...register("title_en", {
              required: t('required', { ns: 'common' }),
              maxLength: {
                value: 11,
                message: t('maxLength11', { ns: 'common' })
              }
            })}
          />
        </Grid>
        <Grid item xs={12} md={6} >
          <TextField
            variant='outlined'
            fullWidth
            required
            size='small'
            label={t('title_th')}
            InputLabelProps={{ shrink: !!watch('title_th') }}
            error={errors.title_th == undefined ? false : true}
            helperText={errors.title_th && errors?.title_th?.message}
            {...register("title_th", {
              required: t('required', { ns: 'common' }),
              maxLength: {
                value: 11,
                message: t('maxLength11', { ns: 'common' })
              }
            })}
          />
        </Grid>
        <Grid item xs={12} md={6} >
          <TextField
            variant='outlined'
            fullWidth
            required
            size='small'
            label={t('linkTitle_en')}
            InputLabelProps={{ shrink: !!watch('linkTitle_en') }}
            error={errors.linkTitle_en == undefined ? false : true}
            helperText={errors.linkTitle_en && errors?.linkTitle_en?.message}
            {...register("linkTitle_en", {
              required: t('required', { ns: 'common' }),
              maxLength: {
                value: 11,
                message: t('maxLength11', { ns: 'common' })
              }
            })}
          />
        </Grid>
        <Grid item xs={12} md={6} >
          <TextField
            variant='outlined'
            fullWidth
            required
            size='small'
            label={t('linkTitle_th')}
            InputLabelProps={{ shrink: !!watch('linkTitle_th') }}
            error={errors.linkTitle_th == undefined ? false : true}
            helperText={errors.linkTitle_th && errors?.linkTitle_th?.message}
            {...register("linkTitle_th", {
              required: t('required', { ns: 'common' }),
              maxLength: {
                value: 11,
                message: t('maxLength11', { ns: 'common' })
              }
            })} />
        </Grid>
        <Grid item xs={12} md={6} >
          <TextField
            variant='outlined'
            fullWidth
            required
            size='small'
            label={t('desc_en')}
            InputLabelProps={{ shrink: !!watch('desc_en') }}
            error={errors.desc_en == undefined ? false : true}
            helperText={errors.desc_en && errors?.desc_en?.message}
            {...register("desc_en", {
              required: t('required', { ns: 'common' }),
              maxLength: {
                value: 37,
                message: t('maxLength37', { ns: 'common' })
              }
            })} />
        </Grid>
        <Grid item xs={12} md={6} >
          <TextField
            variant='outlined'
            fullWidth
            required
            size='small'
            label={t('desc_th')}
            InputLabelProps={{ shrink: !!watch('desc_th') }}
            error={errors.desc_th == undefined ? false : true}
            helperText={errors.desc_th && errors?.desc_th?.message}
            {...register("desc_th", {
              required: t('required', { ns: 'common' }),
              maxLength: {
                value: 37,
                message: t('maxLength37', { ns: 'common' })
              }
            })} />
        </Grid>
      </Grid>
    </div>
  )
}

export const CollectionFormSecond: FC<CollectionFormPropsType> = (props: CollectionFormPropsType) => {
  const { classes } = collectionStyles({});
  const { t } = useTranslation('Collections')
  const [imgLightSrc, setImgLightSrc] = useState('')
  const [imgDarkSrc, setImgDarkSrc] = useState('')
  const { values, register, errors, watch, resetField } = props;
  useEffect(() => {
    const subscription = watch((value: any) => {
      const { img_light, img_dark } = value
      const random = (Math.random() + 1).toString(36).substring(7);
      if (img_light !== undefined && img_light.length > 0) {
        if (typeof img_light == 'string') {
          setImgLightSrc(img_light)
        } else {
          let file = img_light[0];
          let blob = file.slice(0, file.size, file.type);
          let newFile = new File([blob], random + file.name, {
            type: file.type,
          });
          setImgLightSrc(URL.createObjectURL(newFile));
        }
      } else {
        setImgLightSrc('')
      }
      if (img_dark !== undefined && img_dark.length > 0) {
        if (typeof img_dark == 'string') {
          setImgDarkSrc(img_dark)
        } else {
          let file = img_dark[0];
          let blob = file.slice(0, file.size, file.type);
          let newFile = new File([blob], random + file.name, {
            type: file.type,
          });
          setImgDarkSrc(URL.createObjectURL(newFile));
        }
      } else {
        setImgDarkSrc('')
      }

    });
    return () => subscription.unsubscribe();
  }, [watch]);
  useEffect(() => {
    setImgLightSrc(() => values[1].img_light)
    setImgDarkSrc(() => values[1].img_dark)
  }, [values])
  return (
    <div>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6} >
          {imgLightSrc == '' ?
            <>
              {errors.img_light && errors.img_light.type === "required" && <p className='MuiFormHelperText-root Mui-error MuiFormHelperText-sizeSmall MuiFormHelperText-contained Mui-required mui-style-2w819c-MuiFormHelperText-root'>This is required</p>}

              <FormControlLabel
                sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', minHeight: '50vh' }}
                classes={{
                  label: classes.label,
                  root: classes.labelRoot
                }}
                control={<TextField
                  variant='outlined'
                  fullWidth
                  required
                  id="img_light"
                  size='small'
                  sx={{ display: 'none' }}
                  inputProps={{ accept: "image/png, image/jpeg, image/jpg" }}
                  InputLabelProps={{ shrink: true }}
                  type='file'
                  label={t('img_light')}
                  error={errors.img_light == undefined ? false : true}
                  helperText={errors.img_light && t('required', { ns: 'common' })}
                  {...register("img_light", { required: true })}
                />} label={<>
                  {/* {t('img_light')} */}
                  <p style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t('img_light') }}></p>
                  <CloudUploadIcon className={classes.uploadIcon} />
                </>
                } />
            </> :
            <>
              <Grid item xs={12} md={12} className={classes.imgBox}>
                <p style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t('img_light') }}></p>
                <IconButton disableFocusRipple disableRipple disableTouchRipple className={classes.deleteButton} onClick={(e) => {
                  resetField('img_light')
                }}>
                  <DeleteIcon sx={{ color: 'crimson' }} />
                </IconButton>
                <img src={imgLightSrc} className={classes.img} />
              </Grid>
            </>
          }


        </Grid>
        <Grid item xs={12} md={6} >
          {imgDarkSrc == '' ?
            <>
              {errors.img_dark && errors.img_dark.type === "required" && <p className='MuiFormHelperText-root Mui-error MuiFormHelperText-sizeSmall MuiFormHelperText-contained Mui-required mui-style-2w819c-MuiFormHelperText-root'>This is required</p>}

              <FormControlLabel
                sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', minHeight: '50vh' }}
                classes={{
                  label: classes.label,
                  root: classes.labelRoot
                }}
                control={<TextField
                  variant='outlined'
                  fullWidth
                  required
                  id="img_dark"
                  size='small'
                  sx={{ display: 'none' }}
                  inputProps={{ accept: "image/png, image/jpeg, image/jpg" }}
                  InputLabelProps={{ shrink: true }}
                  type='file'
                  label={t('img_dark')}
                  error={errors.img_dark == undefined ? false : true}
                  helperText={errors.img_dark && t('required', { ns: 'common' })}
                  {...register("img_dark", { required: true })}
                />} label={<>
                  <p style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t('img_dark') }}></p>
                  <CloudUploadIcon className={classes.uploadIcon} />
                </>
                } />
            </> :
            <>
              <Grid item xs={12} md={12} className={classes.imgBox}>
                <p style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t('img_dark') }}></p>
                <IconButton disableFocusRipple disableRipple disableTouchRipple className={classes.deleteButton} onClick={(e) => {
                  resetField('img_dark')
                }}>
                  <DeleteIcon sx={{ color: 'crimson' }} />
                </IconButton>
                <img src={imgDarkSrc} className={classes.img} />
              </Grid>
            </>
          }


        </Grid>
      </Grid>
    </div>
  )
}