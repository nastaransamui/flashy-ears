import { FC, Fragment, useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useTranslation } from "react-i18next";
import productStyles from "./product-style";

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import FormControlLabel from '@mui/material/FormControlLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFieldArray } from "react-hook-form";

export interface ProductsFormFirstTypes {
  values: any;
  watch: any;
  errors: any;
  register: any;
}

export const ProductsFormFirst: FC<ProductsFormFirstTypes> = ((props: ProductsFormFirstTypes) => {
  const { values, watch, errors, register } = props;
  const { t } = useTranslation('Products')
  // console.log(values)

  return (
    <div>
      <Grid container spacing={3}>
        {
          Object.keys(values).map((val: any, i: number) => {
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
})

export interface ProductsFormSecondTypes {
  values: any;
  watch: any;
  errors: any;
  register: any;
  setValues: Function;
  colorArray: any;
  collectionArray: any;
  control: any;
  Controller: any
}


export const ProductsFormSecond: FC<ProductsFormSecondTypes> = ((props: ProductsFormSecondTypes) => {
  const { values, setValues, watch, errors, register, colorArray, collectionArray, control, Controller } = props;
  const { t, i18n } = useTranslation('Products')
  const { classes, theme } = productStyles({})

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    setValues((prevState: any) => {
      prevState[1]['colors'] = value;
      return [...prevState]
    })
  };

  const handleChangeCollection = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    setValues((prevState: any) => {
      prevState[1]['collections'] = value;
      return [...prevState]
    })
  };

  return (
    <div>
      <Grid container spacing={3}>
        {
          typeof colorArray == 'string'
            ? <Grid item xs={12} md={12} className={classes.colorEmpty} >
              {colorArray}
            </Grid>
            : typeof collectionArray == 'string'
              ? <Grid item xs={12} md={12} className={classes.colorEmpty} >
                {collectionArray}
              </Grid>
              : <Fragment>
                <FormControl sx={{ m: 1, width: '40%', ml: '3%' }}>
                  <InputLabel >{t('color')}</InputLabel>
                  <Controller
                    name="colors"
                    control={control}
                    render={(props: any) => {
                      const { field, fieldState, formState } = props;
                      const { ref, onChange } = field;
                      return (
                        <Select
                          inputRef={ref}
                          multiple
                          {...register('colors', { required: t('required', { ns: 'common' }) })}
                          value={values[1]['colors']}
                          onChange={(e: SelectChangeEvent) => {
                            handleChange(e)
                            onChange(e)
                          }}
                          input={<OutlinedInput label={t('color')}
                            error={errors['colors'] == undefined ? false : true} />}
                          renderValue={(selected: any) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value: any) => {
                                return (
                                  <Chip
                                    key={value['_id']}
                                    label={value[`label_${i18n.language}`]}
                                    sx={{ bgcolor: value.colorCode }} />
                                )
                              })}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        // {...register("colors")}
                        >
                          {colorArray.map((color: any) => {
                            return (
                              <MenuItem
                                key={color._id}
                                value={color}
                              >
                                {color[`label_${i18n.language}`]}
                              </MenuItem>
                            )
                          })}
                        </Select>
                      )
                    }}
                  />
                  {errors['colors'] && (
                    <FormHelperText error id="accountId-error">
                      {errors['colors'][`message`]}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl sx={{ m: 1, width: '40%', ml: '3%' }}>
                  <InputLabel >{t('collections')}</InputLabel>
                  <Controller
                    name="collections"
                    control={control}
                    render={(props: any) => {
                      const { field, fieldState, formState } = props;
                      const { ref, onChange } = field;
                      return (
                        <Select
                          inputRef={ref}
                          multiple
                          {...register('collections', { required: t('required', { ns: 'common' }) })}
                          value={values[1]['collections']}
                          onChange={(e: SelectChangeEvent) => {
                            handleChangeCollection(e)
                            onChange(e)
                          }}
                          input={<OutlinedInput label={t('collections')}
                            error={errors['collections'] == undefined ? false : true} />}
                          renderValue={(selected: any) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value: any) => {
                                return (
                                  <Chip
                                    key={value['_id']}
                                    label={value[`title_${i18n.language}`]}
                                    sx={{ bgcolor: value.colorCode }} />
                                )
                              })}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {collectionArray.map((colection: any) => {
                            return (
                              <MenuItem
                                key={colection._id}
                                value={colection}
                                disabled={values[1]['collections'].length > 0 && values[1]['collections'][0]['_id'] !== colection._id}
                              >
                                {colection[`title_${i18n.language}`]}
                              </MenuItem>
                            )
                          })}
                        </Select>
                      )
                    }}
                  />
                  {errors['collections'] && (
                    <FormHelperText error id="accountId-error">
                      {errors['collections'][`message`]}
                    </FormHelperText>
                  )}
                </FormControl>
              </Fragment>
        }
      </Grid>
    </div>
  )
})

export interface ProductsFormThirdTypes {
  values: any;
  watch: any;
  errors: any;
  register: any;
  setValues: Function;
  control: any;
  Controller: any;
  resetField: any
}
export const ProductsFormThird: FC<ProductsFormThirdTypes> = ((props: ProductsFormThirdTypes) => {
  const { values, setValues, watch, errors, register, control, Controller, resetField } = props;
  const { t, i18n } = useTranslation('Products')
  const { classes, theme } = productStyles({})

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "images",
  });
  useEffect(() => {
    for (const prop of Object.getOwnPropertyNames(values[2]['images'][0]['back'])) {
      delete values[2]['images'][0]['back'][prop];
    }
    for (const prop of Object.getOwnPropertyNames(values[2]['images'][0]['front'])) {
      delete values[2]['images'][0]['front'][prop];
    }
    values[1]['colors'].map((elem: any) => {
      values[2]['images'][0]['front'][elem?.label_en] = ""
      values[2]['images'][0]['back'][elem?.label_en] = ""
    })
    setValues((prevState: any) => {
      return [...prevState]
    })
  }, [values[1]['colors']])



  useEffect(() => {
    const subscription = watch((value: any, { type, name }: { type: string, name: string }) => {

      const random = (Math.random() + 1).toString(36).substring(7);
      let splitNameArray = name.split('.')
      if (value[splitNameArray[0]][splitNameArray[1]][splitNameArray[2]][splitNameArray[3]] !== undefined) {
        let file = value[splitNameArray[0]][splitNameArray[1]][splitNameArray[2]][splitNameArray[3]][0]
        let blob = file.slice(0, file.size, file.type);
        let newFile = new File([blob], random + file.name, {
          type: file.type,
        });
        // console.log(URL.createObjectURL(newFile))
        values[2][splitNameArray[0]][0][splitNameArray[2]][splitNameArray[3]] = URL.createObjectURL(newFile)

        setValues((prevState: any) => {
          return [...prevState]
        })
      } else {
        values[2][splitNameArray[0]][0][splitNameArray[2]][splitNameArray[3]] = ''

        setValues((prevState: any) => {
          return [...prevState]
        })
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);


  return (
    <Fragment>
      <Grid container spacing={1} direction="row"
        justifyContent="space-evenly"
        alignItems="center">
        <Grid item xs={12} md={5} sx={{ border: `1px solid ${theme.palette.primary.main}`, padding: 2, borderRadius: 5 }}>
          <Typography variant="h4" gutterBottom align="center">
            {t('frontImage')}
          </Typography>
          {
            Object.keys(values[2]['images'][0]['front']).map((a: any, i: number) => {
              return (
                <Fragment key={i}>
                  <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                    {values[2]['images'][0]['front'][a] == '' ?
                      <>
                        {errors['images'] && errors['images'][0]['front'][a]?.type === "required" &&
                          <FormHelperText error id="accountId-error">
                            {errors['images'][0]['front'][a][`message`]}
                          </FormHelperText>}

                        <FormControlLabel
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            minHeight: '50vh',
                            border: `2px solid ${values[1]['colors'][i]['colorCode']}`,
                            marginTop: '10px'
                          }}
                          classes={{
                            label: classes.label,
                            root: classes.labelRoot
                          }}
                          control={<TextField
                            variant='outlined'
                            fullWidth
                            required
                            size='small'
                            sx={{ display: 'none' }}
                            inputProps={{ accept: "image/png, image/jpeg, image/jpg" }}
                            InputLabelProps={{ shrink: true }}
                            type='file'
                            label={a}
                            error={errors[`images.0.front.${a}`] == undefined ? false : true}
                            {...register(`images.0.front.${a}`, { required: t('required', { ns: 'common' }) })}
                          />} label={<>
                            <p style={{ textAlign: 'center' }} >{a}</p>
                            <CloudUploadIcon className={classes.uploadIcon} />
                          </>
                          } />
                      </> :
                      <>
                        <Grid item xs={12} md={12} className={classes.imgBox}>
                          <p style={{ textAlign: 'center' }} >{a}</p>
                          <IconButton disableFocusRipple disableRipple disableTouchRipple className={classes.deleteButton} onClick={(e) => {
                            resetField(a)
                          }}>
                            <DeleteIcon sx={{ color: 'crimson' }} />
                          </IconButton>
                          <img src={values[2]['images'][0]['front'][a]} className={classes.img} />
                        </Grid>
                      </>
                    }
                  </Grid>
                </Fragment>
              )
            })
          }
        </Grid>
        <Grid item xs={12} md={5} sx={{ border: `1px solid ${theme.palette.primary.main}`, padding: 2, borderRadius: 5 }} >
          <Typography variant="h4" gutterBottom align="center">
            {t('backImage')}
          </Typography>
          {
            Object.keys(values[2]['images'][0]['back']).map((a: any, i: number) => {

              return (
                <Fragment key={i}>
                  <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                    {values[2]['images'][0]['back'][a] == '' ?
                      <>
                        {errors['images'] && errors['images'][1]['back'][a]?.type === "required" &&
                          <FormHelperText error id="accountId-error">
                            {errors['images'][1]['back'][a][`message`]}
                          </FormHelperText>}
                        <FormControlLabel
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            minHeight: '50vh',
                            border: `2px solid ${values[1]['colors'][i]['colorCode']}`,
                            marginTop: '10px'
                          }}
                          classes={{
                            label: classes.label,
                            root: classes.labelRoot
                          }}
                          control={<TextField
                            variant='outlined'
                            fullWidth
                            required
                            size='small'
                            sx={{ display: 'none' }}
                            inputProps={{ accept: "image/png, image/jpeg, image/jpg" }}
                            InputLabelProps={{ shrink: true }}
                            type='file'
                            label={a}
                            error={errors[`images.1.back.${a}`] == undefined ? false : true}
                            {...register(`images.1.back.${a}`, { required: t('required', { ns: 'common' }) })}
                          />} label={<>
                            <p style={{ textAlign: 'center' }} >{a}</p>
                            <CloudUploadIcon className={classes.uploadIcon} />
                          </>
                          } />
                      </> :
                      <>
                        <Grid item xs={12} md={12} className={classes.imgBox}>
                          <p style={{ textAlign: 'center' }} >{a}</p>
                          <IconButton disableFocusRipple disableRipple disableTouchRipple
                            className={classes.deleteButton} onClick={(e) => {
                              resetField(`images.1.back.${a}`)
                            }}>
                            <DeleteIcon sx={{ color: 'crimson' }} />
                          </IconButton>
                          <img src={values[2]['images'][0]['back'][a]} className={classes.img} />
                        </Grid>
                      </>
                    }
                  </Grid>
                </Fragment>
              )
            })
          }
        </Grid>
      </Grid>
    </Fragment>
  )
})