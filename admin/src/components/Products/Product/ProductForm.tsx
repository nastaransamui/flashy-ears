
import { FC, Fragment, useEffect, useState, useCallback, ChangeEventHandler, KeyboardEvent, ChangeEvent } from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useTranslation } from "react-i18next";
import productStyles from "./product-style";

import SingleDropzoneField from '@/shared/SingleDropzoneField';
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import { ToastMessage } from '@/shared/CustomToaster/CustomToaster';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone'
import { Gallery, } from "react-grid-gallery";
import { Image as ImageGalleryType } from 'react-grid-gallery'
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

export interface ProductsFormInformationTypes {
  values: any;
  watch: any;
  errors: any;
  register: any;
  setError: any;
  getValues: Function;
  setInformationValidate: Function;
  clearErrors: Function
}

export const ProductsFormInformation: FC<ProductsFormInformationTypes> = ((props: ProductsFormInformationTypes) => {
  const { values, watch, errors, register, setError, getValues, setInformationValidate, clearErrors } = props;
  const { t } = useTranslation('Products')

  useEffect(() => {
    const subscription = watch((value: any, { type, name }: { type: string, name: string }) => {
      //Check values of first step
      if (Object.keys(values[0]).includes(name)) {
        if (value[name as string] !== '') {
          clearErrors(name)
        }
        if (value[name as string] == '') {
          setError(name as string, { type: 'required', message: t('required', { ns: 'common' }) })
        }
        setInformationValidate(() => getValues(Object.keys(values[0])).every((a: string) => a !== ''))
      }
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
                  onKeyPress={(e) => {
                    if (val == 'product_name_en' || val == 'product_name_th') {
                      var inputValue = e.which;
                      if (!(inputValue >= 97 && inputValue <= 122)) {
                        e.preventDefault();
                        setError(`${val}`, { type: 'numer', message: t('onlyAlphabet') });
                      }
                    }
                  }}
                  onPaste={(e) => {
                    if (val == 'product_name_en') {

                      var pat = /^[a-z]+$/;
                      if (!pat.test(e.clipboardData.getData('Text'))) {
                        e.preventDefault();
                        setError(`${val}`, { type: 'numer', message: t('onlyAlphabet') });
                      }
                    }
                    if (val == 'product_name_th') {
                      var pat = /^[\u0E00-\u0E7Fa-zA-Z']+$/;
                      if (!pat.test(e.clipboardData.getData('Text'))) {
                        e.preventDefault();
                        setError(`${val}`, { type: 'numer', message: t('onlyAlphabet') });
                      }
                    }
                  }}
                  variant='outlined'
                  fullWidth
                  required
                  size='small'
                  label={t(val)}
                  inputProps={{
                    autoComplete: val == 'product_name_en' || val == 'product_name_th' ? "off" : 'on',
                  }}
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

export interface ProductsFormColorTypes {
  values: any;
  watch: any;
  errors: any;
  setError: Function;
  clearErrors: Function
  register: any;
  setValues: Function;
  setValue: Function;
  getValues: Function;
  setColorValidation: Function;
  colorArray: any;
  collectionArray: any;
  control: any;
  Controller: any;
  setFinancialValidation: Function;
  componentType: 'edit' | 'create';
  resetField: any;
  unregister: any;
}
export interface ColorsType { _id: string, colorCode: string; label_en: string, label_th: string, name_en: string; name_th: string, }

export const ProductsFormColor: FC<ProductsFormColorTypes> = ((props: ProductsFormColorTypes) => {
  const {
    values,
    setValues,
    setValue,
    getValues,
    watch,
    errors,
    setError,
    clearErrors,
    register,
    colorArray,
    collectionArray,
    control,
    Controller,
    setColorValidation,
    setFinancialValidation,
    componentType,
    resetField,
    unregister,
  } = props;
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

  const handleChangeColor = (event: SelectChangeEvent) => {

    const {
      target: { value },
    } = event;
    if (componentType == 'create') {
      setFinancialValidation(() => false)
      if (value[value.length - 1] === "all") {
        if (values[1]['colors_id']?.length == colorArray.length) {
          //remove all
          setValues((prevState: any) => {
            prevState[1]['colors_id'] = [];
            return [...prevState]
          })
        } else {
          setValues((prevState: any) => {
            prevState[1]['colors_id'] = colorArray;
            return [...prevState]
          })
        }

      } else {
        let intersection = colorArray.filter((x: any) => value.includes(x._id));
        setValues((prevState: any) => {
          prevState[1]['colors_id'] = intersection;
          return [...prevState]
        })
      }

    } else {
      let originalColors = values[1]['colors'].map((a: ColorsType) => a._id)
      setFinancialValidation(() => false)
      if (value[value.length - 1] === "all") {
        if (values[1]['colors_id']?.length == colorArray.length) {
          //remove all
          setValues((prevState: any) => {
            prevState[1]['colors_id'] = [];
            return [...prevState]
          })
          setValue('deletedColor', originalColors)

        } else {
          setValues((prevState: any) => {
            prevState[1]['colors_id'] = colorArray;
            return [...prevState]
          })
          setValue('deletedColor', undefined)
        }

      } else {
        let intersection = colorArray.filter((x: any) => value.includes(x._id));
        let deletedColor = originalColors.filter((a: string) => !intersection.map((b: ColorsType) => b._id).includes(a))

        if (deletedColor.length !== 0) {
          setValue('deletedColor', deletedColor)
        }
        if (deletedColor.length == 0) {
          setValue('deletedColor', undefined)
        }
        setValues((prevState: any) => {
          prevState[1]['colors_id'] = intersection;
          return [...prevState]
        })
      }

    }
  }


  const handleChangeCollection = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    let intersection = collectionArray.filter((x: any) => value.includes(x._id));
    setValues((prevState: any) => {
      prevState[1]['collection_id'] = intersection;
      return [...prevState]
    })
  }

  useEffect(() => {
    const subscription = watch((value: any, { type, name }: { type: string, name: string }) => {
      if (componentType == 'create') {
        if (name == 'collection_id' || name == 'colors_id') {
          value[name].length == 0 ?
            setError(name, { type: 'required', message: t('required', { ns: 'common' }) }) :
            clearErrors(name)
          let bothValid = getValues(Object.keys(values[1])).map((a: any) => a?.length || 0).every((a: any) => a > 0)
          setColorValidation(() => bothValid)
        }
      } else {
        if (name == 'collection_id' || name == 'colors_id') {
          // console.log(value[name])
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);


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
                  <InputLabel required>{t('color')}</InputLabel>
                  <Controller
                    rules={{ required: t('required', { ns: 'common' }) }}
                    name="colors_id"
                    control={control}
                    render={(props: any) => {
                      const { field, fieldState, formState } = props;
                      const { ref, onChange } = field;
                      return (
                        <Select
                          inputRef={ref}
                          multiple
                          value={values[1]['colors_id'].map((a: any) => a._id)}
                          onChange={(e: SelectChangeEvent) => {
                            const {
                              target: { value },
                            } = e;
                            if (value[value.length - 1] === "all") {
                              if (typeof getValues('colors_id') == 'undefined' ||
                                getValues('colors_id')?.length !== colorArray.length
                              ) {
                                setValue('colors_id', [])
                                onChange(colorArray.map((a: any) => a._id))
                                handleChangeColor(e)
                              } else {
                                //remove all
                                setValue('colors_id', [])
                                handleChangeColor(e)
                              }

                            } else {
                              let intersection = colorArray.filter((x: any) => value.includes(x._id));
                              handleChangeColor(e)
                              onChange(intersection.map((a: any) => a._id))
                            }
                          }}
                          input={<OutlinedInput label={t('color')}
                            error={errors['colors'] == undefined ? false : true} />}
                          renderValue={(selected: any) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value: any, i: number) => {
                                let intersection = colorArray.filter((x: any) => selected.includes(x._id));
                                return (
                                  <Chip
                                    key={intersection[i]['_id']}
                                    label={intersection[i][`label_${i18n.language}`]}
                                    sx={{ bgcolor: intersection[i].colorCode }} />
                                )
                              })}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          <MenuItem
                            value="all"
                            classes={{
                              root: colorArray.length == values[1]['colors_id'].length ? classes.selectedAll : ""
                            }}
                          >
                            <ListItemIcon>
                              <Checkbox
                                classes={{ indeterminate: classes.indeterminateColor }}
                                checked={colorArray.length == values[1]['colors_id'].length}
                                indeterminate={colorArray.length !== values[1]['colors_id'].length}
                              />
                            </ListItemIcon>
                            <ListItemText
                              classes={{ primary: classes.selectAllText }}
                              primary={colorArray.length !== values[1]['colors_id'].length ? t('selectAll') : t('diSelectAll')}
                            />
                          </MenuItem>
                          {colorArray.map((color: any) => {
                            return (
                              <MenuItem
                                key={color._id}
                                value={color._id}
                                divider
                                sx={{
                                  display: "flex",
                                  justifyContent: 'space-between'
                                }}
                              >
                                <ListItemIcon>
                                  <Checkbox checked={values[1]['colors_id'].map((a: ColorsType) => a._id).includes(color._id)} />
                                </ListItemIcon>
                                <ListItemText primary={color[`label_${i18n.language}`]} />
                                <Chip
                                  key={color['_id']}
                                  label={color[`label_${i18n.language}`]}
                                  sx={{ bgcolor: color.colorCode, minWidth: '150px' }} />
                              </MenuItem>
                            )
                          })}
                        </Select>
                      )
                    }}
                  />
                  {errors['colors_id'] && (
                    <FormHelperText error id="accountId-error">
                      {errors['colors_id'][`message`]}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl sx={{ m: 1, width: '40%', ml: '3%' }}>
                  <InputLabel required shrink={!!watch('collection_id')} >{t('collections')}</InputLabel>
                  <Controller
                    rules={{ required: t('required', { ns: 'common' }) }}
                    name="collection_id"
                    control={control}
                    render={(props: any) => {
                      const { field, fieldState, formState } = props;
                      const { ref, onChange } = field;
                      return (
                        <Select
                          inputRef={ref}
                          value={values[1]['collection_id'].map((a: any) => a._id).length == 0 ? '' : values[1]['collection_id'].map((a: any) => a._id)}
                          onChange={(e: SelectChangeEvent) => {
                            const {
                              target: { value },
                            } = e;
                            let intersection = collectionArray.filter((x: any) => value.includes(x._id));
                            handleChangeCollection(e)
                            onChange(intersection.map((a: any) => a._id))
                          }}
                          input={<OutlinedInput label={t('collections')}
                            error={errors['collection_id'] == undefined ? false : true} />}
                          renderValue={(selected: any) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value: any, i: number) => {
                                let intersection = collectionArray.filter((x: any) => selected.includes(x._id));
                                return (
                                  <Chip
                                    key={intersection[i]['_id']}
                                    label={intersection[i][`label_${i18n.language}`]}
                                    sx={{ bgcolor: intersection[i].colorCode }}
                                  />
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
                                value={colection._id}
                                divider
                                disabled={
                                  values[1]['collection_id'].length > 0 &&
                                  values[1]['collection_id'][0]['_id'] == colection._id}
                              >
                                {colection[`label_${i18n.language}`]}
                              </MenuItem>
                            )
                          })}
                        </Select>
                      )
                    }}
                  />
                  {errors['collection_id'] && (
                    <FormHelperText error >
                      {errors['collection_id'][`message`]}
                    </FormHelperText>
                  )}
                </FormControl>
              </Fragment>
        }
      </Grid>
    </div>
  )
})

export interface ProductsFormFinancialTypes {
  values: any;
  watch: any;
  errors: any;
  register: any;
  colorArray: ColorsType[] | null;
  setValues: Function;
  setValue: Function;
  setError: Function;
  clearErrors: Function;
  getValues: Function;
  setFinancialValidation: Function;
  unregister: Function;
  control: any;
  Controller: any;
}

export interface FinancialType {
  [key: string]: [
    {
      buyPrice: number;
      salePrice: number;
      totalInventory: number;
      totalInventoryInCart: number;
    }
  ];
}
export const ProductsFormFinancial: FC<ProductsFormFinancialTypes> = ((props: ProductsFormFinancialTypes) => {
  const {
    colorArray,
    values,
    setValues,
    setValue,
    setError,
    clearErrors,
    watch,
    errors,
    register,
    getValues,
    setFinancialValidation,
    unregister,
    Controller,
    control
  } = props;
  const { t, i18n } = useTranslation('Products')
  const { classes, theme } = productStyles({})
  const dispatch = useDispatch();
  const productFinancialFillAll = useSelector<State, boolean | null>(state => state.productFinancialFillAll)
  let selectedColor: any = colorArray?.filter((a: ColorsType) => getValues("colors_id").includes(a._id))

  useEffect(() => {
    const subscription = watch((value: any, { name, type }: { name: string, type: string }) => {
      if (value['financials'] && name !== undefined) {
        if (name.includes('financials')) {
          if (name.includes('.')) {
            let m: any = []
            Object.values(value['financials']).map((doc: any, i: number) => {

              m.push(Object.values(doc))
            })
            setFinancialValidation(() => m.flat(1).filter((a: any) => typeof a !== 'string').every((b: any) => !isNaN(b)))
          }
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  useEffect(() => {
    let financeArray: any = []
    // var financials = getValues('financials') || [];
    if (typeof getValues('financials') == 'undefined') {
      //new
      selectedColor.forEach((element: ColorsType, index: number) => {
        setValue(`financials.${index}.color`, element._id)
        setValue(`financials.${index}.buyPrice`, NaN)
        setValue(`financials.${index}.salePrice`, NaN)
        setValue(`financials.${index}.totalInventory`, NaN)
        setValue(`financials.${index}.totalInventoryInCart`, 0)
        financeArray.push({
          color: element._id,
          buyPrice: NaN,
          salePrice: NaN,
          totalInventory: NaN,
          totalInventoryInCart: 0,
        })
      })
      setFinancialValidation(() => false)
      setValues((prevState: any) => {
        prevState[2]['financials'] = financeArray
        return [...prevState]
      })
    } else {
      let allNewColors = selectedColor.map((a: ColorsType) => a._id)
      let allOldIvalues = Object.values(getValues('financials')).map((a: any) => Object.entries(a))

      let newColorWithValue =
        allOldIvalues.filter((a: any) => allNewColors.includes(a.map((b: any) => typeof b[1] == 'string' && b[1])[0]))
      let newColorNoValue =
        allNewColors.filter((a: any) => !newColorWithValue.map((b: any) => b.map((c: any) => typeof c[1] == 'string' && c[1])[0]).includes(a))
      unregister('financials')
      newColorWithValue.forEach((element: any, index: number) => {
        const obj = Object.fromEntries(element);
        financeArray.push({
          color: obj.color,
          buyPrice: isNaN(obj.buyPrice) ? '' : obj.buyPrice,
          salePrice: isNaN(obj.salePrice) ? '' : obj.salePrice,
          totalInventory: isNaN(obj.totalInventory) ? '' : obj.totalInventory,
          totalInventoryInCart: isNaN(obj.totalInventoryInCart) ? '' : obj.totalInventoryInCart,
        })
      })

      newColorNoValue.forEach((element: any, index: number) => {
        financeArray.push({
          color: element,
          buyPrice: NaN,
          salePrice: NaN,
          totalInventory: NaN,
          totalInventoryInCart: 0,
        })
      })

      financeArray.sort((a: any, b: any) =>
        colorArray?.findIndex((c: ColorsType) => c._id == a.color) as number
        -
        colorArray?.findIndex((c: ColorsType) => c._id == b.color)! as number).forEach((a: any, index: number) => {
          let element = Object.entries(a)
          element.forEach((a: any, i: number) => {
            setValue(`financials.${index}.${a[0]}`, a[1])
          })
        })
      setValues((prevState: any) => {
        prevState[2]['financials'] = financeArray
        return [...prevState]
      })
    }

  }, [colorArray])


  return (
    <div>
      <Grid container spacing={3} >
        <Typography ml={'3%'} variant="subtitle2" >
          <Checkbox
            classes={{ indeterminate: classes.indeterminateColor }}
            checked={productFinancialFillAll == null ? false : productFinancialFillAll}
            onChange={(e) => {
              dispatch({
                type: 'PRODUCT_FINANCIAL_FILL_ALL',
                payload: productFinancialFillAll == null ? true : !productFinancialFillAll
              })
              localStorage.setItem('productFinancialFillAll',
                productFinancialFillAll == null ? 'true' : `${!productFinancialFillAll}`)
            }}
          />
          {t('fillAll')}
        </Typography>
        {
          values[2][`financials`].sort((a: any, b: any) =>
            colorArray?.findIndex((c: ColorsType) => c._id == a.color) as number
            -
            colorArray?.findIndex((c: ColorsType) => c._id == b.color)! as number)
            .map((finance: any, index: number) => {
              const colorCode = selectedColor.filter((a: ColorsType) => a._id == finance['color']).map((a: ColorsType) => a.colorCode)[0]
              const colorName = selectedColor.filter((a: ColorsType) => a._id == finance['color']).map((a: ColorsType) => a[`label_${i18n.language}` as keyof typeof a])[0]
              return (
                <Fragment key={index} >
                  <Grid container spacing={2} direction="row"
                    justifyContent="flex-start"
                    alignItems="center">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} justifyContent='start' alignItems="center"
                      sx={{
                        border: `1px solid ${colorCode}`,
                        minWidth: '97%',
                        m: 1,
                        ml: '3%',
                        mt: '2%',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <Typography mb={2} variant="subtitle2" >
                        {colorName}:
                      </Typography>
                      {
                        Object.entries(finance).map((key: any, i: number) => {
                          return (
                            <Fragment key={i}>
                              {
                                key[0] !== 'color' &&
                                <>
                                  <Grid item xs={12} md={2.6} sx={{ mb: 2, ml: 2, mt: 1 }}>
                                    <TextField
                                      onKeyPress={(e: KeyboardEvent<HTMLImageElement>) => {
                                        const target = e.target as HTMLInputElement;
                                        var charCode = e.which ? e.which : e.keyCode;
                                        if (
                                          charCode > 31 &&
                                          (charCode < 48 || charCode > 57) && charCode !== 46
                                          || charCode == 101 || charCode == 45
                                        ) {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          if (productFinancialFillAll !== null && productFinancialFillAll) {
                                            const nameSplictArray = target.name.split('.')
                                            values[2]['financials'].forEach((doc: any, h: number) => {
                                              setError(`financials.${h}.${nameSplictArray[2]}`, { type: 'numer', message: t('onlyNumber') })
                                            })
                                          } else {
                                            setError(`financials.${index}.${key[0]}`, { type: 'numer', message: t('onlyNumber') });
                                          }
                                          return false;
                                        } else {
                                          return true;
                                        }
                                      }}
                                      inputProps={{ type: "number" }}
                                      type="number"
                                      variant='outlined'
                                      fullWidth
                                      required
                                      size='small'
                                      label={t(key[0])}
                                      disabled={key[0] == "totalInventoryInCart"}
                                      InputLabelProps={{
                                        shrink: key[0] == "totalInventoryInCart" ? true :
                                          !isNaN(getValues(`financials.${index}.${key[0]}`)) && typeof getValues(`financials.${index}.${key[0]}`) !== 'string'
                                      }}
                                      error={errors[`financials`]?.[index]?.[key[0]] == undefined ? false : true}
                                      helperText={errors[`financials`]?.[index]?.[key[0]] && errors[`financials`]?.[index]?.[key[0]]?.[`message`]}
                                      name={register(`financials.${index}.${key[0]}`, { valueAsNumber: true, required: t('required', { ns: 'common' }) }).name}
                                      ref={register(`financials.${index}.${key[0]}`, { valueAsNumber: true, required: t('required', { ns: 'common' }) }).ref}
                                      onChange={(e) => {
                                        const name = e.target.name
                                        const value = parseFloat(e.target.value)
                                        const nameSplictArray = name.split('.')
                                        if (productFinancialFillAll !== null && productFinancialFillAll) {

                                          values[2]['financials'].forEach((doc: any, h: number) => {
                                            setValue(`financials.${h}.${nameSplictArray[2]}`, isNaN(value) ? '' : value)
                                            clearErrors(`financials.${h}.${nameSplictArray[2]}`)
                                            doc[nameSplictArray[2]] = isNaN(value) ? '' : value;
                                          })
                                          setValues((prevState: any) => {
                                            return prevState
                                          })
                                        }

                                        setValues((prevState: any) => {
                                          setValue(`financials.${index}.${[key[0]]}`, isNaN(value) ? '' : value)
                                          clearErrors(`financials.${index}.${[key[0]]}`)
                                          prevState[2]['financials'][index][`${[key[0]]}`] = isNaN(value) ? '' : value
                                          return prevState
                                        })
                                      }}
                                    />
                                  </Grid>
                                </>
                              }
                            </Fragment>
                          )
                        })
                      }
                    </Grid>
                  </Grid>
                </Fragment>
              )
            })
        }
      </Grid>
    </div>
  )
})

export interface ProductsFormImagesTypes {
  values: any;
  watch: any;
  errors: any;
  register: any;
  setError: Function;
  setValues: Function;
  getValues: Function;
  setValue: Function;
  setImagesValidation: Function;
  control: any;
  Controller: any;
  resetField: any;
  unregister: Function;
  colorArray: ColorsType[] | null;
  componentType: 'edit' | 'create';
}
export const ProductsFormImages: FC<ProductsFormImagesTypes> = ((props: ProductsFormImagesTypes) => {
  const {
    values,
    setValues,
    getValues,
    setValue,
    setImagesValidation,
    watch,
    errors,
    setError,
    register,
    control,
    Controller,
    resetField,
    unregister,
    componentType,
    colorArray } = props;
  const { t } = useTranslation('Products')
  const { classes, theme, cx } = productStyles({})
  let selectedColor: any = colorArray?.filter((a: ColorsType) => getValues("colors_id").includes(a._id))
  const [updateParentImage, setUpdateParentImage] = useState('')
  useEffect(() => {
    const subscription = watch((value: any, { name, type }: { name: string, type: string }) => {
      if (value['images'] && name !== undefined) {
        if (name.includes('images')) {
          if (name.includes('.')) {
            let m: any = []
            Object.values(value['images']).forEach((element: any) => {
              Object.values(element).forEach((a: any) => {
                if (componentType == 'create') {
                  a.forEach((b: any) => {
                    typeof Object.values(b)[0] == 'undefined' ? m.push(false) : m.push(true);
                  })
                } else {
                  a.forEach((b: any) => {
                    if (b) {
                      typeof Object.values(b)[0] == 'undefined' ? m.push(false) : m.push(true);
                    } else {
                      m.push(false)
                    }
                  })
                }
              })
            });
            setImagesValidation(() => m.every((a: boolean) => a))
          }
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  useEffect(() => {
    let imagesArray: any = [
      {
        front: [],
      },
      {
        back: [],
      }
    ]
    var images = getValues('images') || [
      {
        front: [],
      },
      {
        back: [],
      }
    ];


    let ImageCreate: any[] = [{
      front: [],
    },
    {
      back: [],
    }]

    switch (componentType) {
      case 'create':
        if (typeof getValues('images') == 'undefined') {
          selectedColor.forEach((element: ColorsType, index: number) => {
            imagesArray[0]['front'].push({
              color: element._id,
              height: 0,
              width: 0,
              src: '',
              path: '',
              isSelected: false,
              tags: [
                {
                  value: "", title: ""
                }
              ],
            })
            imagesArray[1]['back'].push({
              color: element._id,
              height: 0,
              width: 0,
              src: '',
              path: '',
              isSelected: false,
              tags: [
                {
                  value: "", title: ""
                }
              ],
            })
          })
          setImagesValidation(() => false)
          setValues((prevState: any) => {
            prevState[3]['images'] = imagesArray
            return [...prevState]
          })
        } else {

          let oldFront = getValues('images')[0]['front']
          let oldBack = getValues('images')[1]['back'];
          setValue('images.0.front', [])
          setValue('images.1.back', [])
          let allNewColors = selectedColor.map((a: ColorsType) => a._id)

          let allOldImages = Object.values(oldFront).map((a: any) => Object.keys(a)).flat(1)
          let newImageWithValue = allOldImages.filter((a: string) => allNewColors.includes(a))

          let newImagesNoValue = allNewColors.filter((a: string) => !newImageWithValue.includes(a))
          let mFront = oldFront.filter((a: any) => newImageWithValue.includes(Object.keys(a)[0]))
          let mBack = oldBack.filter((a: any) => newImageWithValue.includes(Object.keys(a)[0]))
          newImagesNoValue.forEach((a: any) => {
            mFront.push({ [a]: undefined })
            mBack.push({ [a]: undefined })
          })

          mFront.forEach((element: any, index: number) => {
            let file = Object.entries(element)[0][1] as any
            let color = Object.entries(element)[0][0]
            setValue(`images.0.front.${index}.${color}`, file)
            if (file) {
              ImageCreate[0]['front'].push({
                color: color,
                height: file['height'],
                width: file['width'],
                src: URL.createObjectURL(file),
                path: '',
                isSelected: values[3]['images'][0]['front'][index]['isSelected'],
                tags: [
                  {
                    value: file['name'], title: file['name']
                  }
                ],
              })
            } else {
              ImageCreate[0]['front'].push({
                color: images[0]?.['front']?.[index]?.['color'] || color,
                height: images[0]?.['front']?.[index]?.['height'] || 0,
                width: images[0]?.['front']?.[index]?.['width'] || 0,
                src: images[0]?.['front']?.[index]?.['src'] || '',
                path: images[0]?.['front']?.[index]?.['path'] || '',
                isSelected: images[0]?.['front']?.[index]?.['isSelected'] || false,
                tags: [
                  {
                    value: images[0]?.['front']?.[index]?.['tags']?.[0]?.['value'] || '', title: images[0]?.['front']?.[index]?.['tags']?.[0]?.['title'] || ""
                  }
                ],
              })
            }
          })
          mBack.forEach((element: any, index: number) => {
            let file = Object.entries(element)[0][1] as any
            let color = Object.entries(element)[0][0]
            setValue(`images.1.back.${index}.${color}`, file)
            if (file) {
              ImageCreate[1]['back'].push({
                color: color,
                height: file['height'],
                width: file['width'],
                src: URL.createObjectURL(file),
                path: '',
                isSelected: file['isSelected'],
                tags: [
                  {
                    value: file['name'], title: file['name']
                  }
                ],
              })
            } else {
              ImageCreate[1]['back'].push({
                color: images[1]?.['back']?.[index]?.['color'] || color,
                height: images[1]?.['back']?.[index]?.['height'] || 0,
                width: images[1]?.['back']?.[index]?.['width'] || 0,
                src: images[1]?.['back']?.[index]?.['src'] || '',
                path: images[1]?.['back']?.[index]?.['path'] || '',
                isSelected: images[1]?.['back']?.[index]?.['isSelected'] || false,
                tags: [
                  {
                    value: images[1]?.['back']?.[index]?.['tags']?.[0]?.['value'] || '', title: images[1]?.['back']?.[index]?.['tags']?.[0]?.['title'] || ""
                  }
                ],
              })
            }
          })
          setValues((prevState: any) => {
            prevState[3]['images'] = ImageCreate
            return [...prevState]
          })
        }
        break;

      case 'edit':
        let allNewColors = selectedColor.map((a: ColorsType) => a._id)
        let oldFront = getValues('images')[0]['front']
        let oldBack = getValues('images')[1]['back'];
        setValue('images.0.front', [])
        setValue('images.1.back', [])
        allNewColors.forEach((color_id: string, index: number) => {
          let IndexOfColorFront =
            oldFront.findIndex((b: any) => {
              if (b?.hasOwnProperty(color_id)) {
                return Object.keys(b)[0] == color_id
              } else {
                if (b?.['color']) {
                  return b['color'] == color_id
                } else {
                  // console.log(b)
                }
              }
            })
          if (IndexOfColorFront !== -1) {
            if (oldFront[IndexOfColorFront]?.hasOwnProperty(color_id)) {
              // file changed
              if (oldFront[IndexOfColorFront][color_id]) {
                //Image uploaded and has file
                setValue(`images.0.front.${IndexOfColorFront}.${color_id}`, oldFront[IndexOfColorFront][color_id])
                ImageCreate[0]['front'].push({
                  color: color_id,
                  height: oldFront[IndexOfColorFront][color_id]['height'],
                  width: oldFront[IndexOfColorFront][color_id]['width'],
                  src: URL.createObjectURL(oldFront[IndexOfColorFront][color_id]),
                  isSelected: oldFront[IndexOfColorFront][color_id]['isSelected'],
                  path: '',
                  tags: [
                    {
                      value: oldFront[IndexOfColorFront][color_id]['name'], title: oldFront[IndexOfColorFront][color_id]['name']
                    }
                  ],
                })
              } else {
                //image deleted not have file
                setValue(`images.0.front.${IndexOfColorFront}.${color_id}`, undefined)
                ImageCreate[0]['front'].push({
                  color: color_id,
                  height: 0,
                  width: 0,
                  src: '',
                  path: '',
                  isSelected: false,
                  tags: [
                    {
                      value: '', title: ''
                    }
                  ],
                })
              }
            } else {
              setValue(`images.0.front.${IndexOfColorFront}`, oldFront[IndexOfColorFront])
              ImageCreate[0]['front'].push({
                color: oldFront[IndexOfColorFront]['color'],
                height: oldFront[IndexOfColorFront]['height'],
                width: oldFront[IndexOfColorFront]['width'],
                src: oldFront[IndexOfColorFront]['src'],
                path: oldFront[IndexOfColorFront]['path'],
                isSelected: oldFront[IndexOfColorFront]['isSelected'],
                tags: [
                  {
                    value: oldFront[IndexOfColorFront]['tags'][0]['value'], title: oldFront[IndexOfColorFront]['tags'][0]['title']
                  }
                ],
              })
            }
          } else {
            setValue(`images.0.front.${index}.${color_id}`, undefined)
            ImageCreate[0]['front'].push({
              color: color_id,
              height: 0,
              width: 0,
              src: '',
              path: '',
              isSelected: false,
              tags: [
                {
                  value: '', title: ''
                }
              ],
            })
          }
          let IndexOfColorBack =
            oldBack.findIndex((b: any) => {
              if (b?.hasOwnProperty(color_id)) {
                return Object.keys(b)[0] == color_id
              } else {
                if (b?.['color']) {
                  return b['color'] == color_id
                } else {
                  // console.log(b)
                }
              }
            })
          if (IndexOfColorBack !== -1) {
            if (oldBack[IndexOfColorBack]?.hasOwnProperty(color_id)) {
              // file changed
              if (oldBack[IndexOfColorBack][color_id]) {
                //Image uploaded and has file
                setValue(`images.1.back.${IndexOfColorBack}.${color_id}`, oldBack[IndexOfColorBack][color_id])
                ImageCreate[1]['back'].push({
                  color: color_id,
                  height: oldBack[IndexOfColorBack][color_id]['height'],
                  width: oldBack[IndexOfColorBack][color_id]['width'],
                  src: URL.createObjectURL(oldBack[IndexOfColorBack][color_id]),
                  path: '',
                  isSelected: oldBack[IndexOfColorBack]['isSelected'],
                  tags: [
                    {
                      value: oldBack[IndexOfColorBack][color_id]['name'], title: oldBack[IndexOfColorBack][color_id]['name']
                    }
                  ],
                })
              } else {
                //image deleted not have file
                setValue(`images.1.back.${IndexOfColorBack}.${color_id}`, undefined)
                ImageCreate[1]['back'].push({
                  color: color_id,
                  height: 0,
                  width: 0,
                  src: '',
                  path: '',
                  isSelected: false,
                  tags: [
                    {
                      value: '', title: ''
                    }
                  ],
                })
              }
            } else {
              setValue(`images.1.back.${IndexOfColorBack}`, oldBack[IndexOfColorBack])
              ImageCreate[1]['back'].push({
                color: oldBack[IndexOfColorBack]['color'],
                height: oldBack[IndexOfColorBack]['height'],
                width: oldBack[IndexOfColorBack]['width'],
                src: oldBack[IndexOfColorBack]['src'],
                path: oldBack[IndexOfColorBack]['path'],
                isSelected: oldBack[IndexOfColorBack]['isSelected'],
                tags: [
                  {
                    value: oldBack[IndexOfColorBack]['tags'][0]['value'], title: oldBack[IndexOfColorBack]['tags'][0]['title']
                  }
                ],
              })
            }
          } else {
            setValue(`images.1.back.${index}.${color_id}`, undefined)
            ImageCreate[1]['back'].push({
              color: color_id,
              height: 0,
              width: 0,
              src: '',
              path: '',
              isSelected: false,
              tags: [
                {
                  value: '', title: ''
                }
              ],
            })
          }
        })
        setValues((prevState: any) => {
          prevState[3]['images'] = ImageCreate
          return [...prevState]
        })
        break;

      default:
        break;
    }


  }, [])

  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    0: false
  });


  return (
    <Fragment>
      <Grid container spacing={1} direction="row"
        justifyContent="space-evenly"
        alignItems="center"  >
        <Grid item xs={12} md={5} sx={{ border: `1px solid ${theme.palette.primary.main}`, padding: 2, borderRadius: 5 }}>
          <Typography variant="h4" gutterBottom align="center">
            {t('frontImage')}
          </Typography>
          <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
            {colorArray !== null &&
              Object.values(values[3]?.['images']?.[0]?.['front']).map((front: any, i: number) => {
                return (
                  <Fragment key={i} >
                    <Grid container direction="row" justifyContent="space-evenly" alignItems="center" >
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        minHeight: '50vh',
                        border: `2px solid ${colorArray.filter((b: any) => b._id == front['color'])[0]['colorCode']}`,
                        marginTop: '10px',
                      }}
                        className={classes.labelRoot}>
                        <Typography variant="button" gutterBottom align="center">
                          {colorArray.filter((b: any) => b._id == front['color'])[0]['label_en']}
                        </Typography>
                        {
                          front['src'] == '' ?
                            <>
                              <SingleDropzoneField
                                name={`images.0.front.${i}.${front['color']}`}
                                Controller={Controller}
                                control={control}
                                t={t}
                                setValue={setValue}
                                getValues={getValues}
                                classes={classes}
                                setValues={setValues}
                                errors={errors}
                                a={`images.0.front.${i}.${front['color']}`}
                                values={values}
                                index={i}
                                setUpdateParentImage={setUpdateParentImage}
                              />
                            </>
                            :
                            <Grid item xs={12} md={12} className={classes.imgBox} >
                              <span style={{
                                display: 'flex', maxWidth: (values[3]['images'][0]['front'].filter((a: any) => a.isSelected).length == 0
                                  ||
                                  values[3]['images'][0]['front'].filter((a: any) => a.isSelected).length > 0 && front['isSelected']
                                ) ? '55%' : '100%'
                              }}>
                                <IconButton
                                  disableFocusRipple disableRipple disableTouchRipple
                                  className={classes.deleteButton} onClick={(e) => {
                                    if (componentType == 'create') {
                                      setValue(`images.0.front.${i}.${front['color']}`, undefined)
                                      setError(`images.0.front.${i}.${front['color']}`, { type: 'required', message: t('required', { ns: 'common' }) })
                                      setValues((prevState: any) => {
                                        prevState[3]['images'][0]['front'][i] = {
                                          color: prevState[3]['images'][0]['front'][i]['color'],
                                          height: 0,
                                          width: 0,
                                          isSelected: false,
                                          src: '',
                                          path: '',
                                          tags: [
                                            {
                                              value: "", title: ""
                                            }
                                          ],

                                        }
                                        return [...prevState]
                                      })
                                    } else {
                                      setValue(`deletedImagesArray`,
                                        typeof getValues(`deletedImagesArray`) == 'undefined' ? [getValues(`images.0.front.${i}`)] :
                                          [...getValues(`deletedImagesArray`), getValues(`images.0.front.${i}`)])
                                      setValue(`images.0.front.${i}`, { [front['color']]: undefined })

                                      setError(`images.0.front.${i}.${front['color']}`, { type: 'required', message: t('required', { ns: 'common' }) })
                                      setValues((prevState: any) => {
                                        prevState[3]['images'][0]['front'][i] = {
                                          color: prevState[3]['images'][0]['front'][i]['color'],
                                          height: 0,
                                          width: 0,
                                          isSelected: false,
                                          src: '',
                                          path: '',
                                          tags: [
                                            {
                                              value: "", title: ""
                                            }
                                          ],

                                        }
                                        return [...prevState]
                                      })
                                    }
                                  }}>
                                  <DeleteIcon sx={{ color: 'crimson' }} />
                                </IconButton>
                                {
                                  (values[3]['images'][0]['front'].filter((a: any) => a.isSelected).length == 0
                                    ||
                                    values[3]['images'][0]['front'].filter((a: any) => a.isSelected).length > 0 && front['isSelected']
                                  ) &&
                                  <IconButton
                                    disableFocusRipple
                                    disableRipple
                                    disableTouchRipple
                                    className={classes.deleteButton} onClick={(e) => {
                                      setChecked(() => {
                                        return { [i as number]: true }
                                      })
                                      setValues((prevState: any) => {
                                        prevState[3]['images'][0]['front'][i]['isSelected'] = !prevState[3]['images'][0]['front'][i]['isSelected']
                                        prevState[3]['images'][1]['back'][i]['isSelected'] = !prevState[3]['images'][1]['back'][i]['isSelected']
                                        return prevState
                                      })

                                    }}>
                                    <Tooltip title={`${t('selectedColor')}`}
                                      TransitionComponent={Zoom}
                                      placement='bottom'
                                      arrow>
                                      <Checkbox
                                        checked={front['isSelected']}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                      />
                                    </Tooltip>
                                  </IconButton>}
                              </span>
                              <img
                                width={front['width']}
                                height={front['height']}
                                src={front['src'].replace('/admin', '')}
                                className={classes.img} />
                            </Grid>
                        }
                      </Box>
                    </Grid>
                  </Fragment>
                )
              })
            }
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} sx={{ border: `1px solid ${theme.palette.primary.main}`, padding: 2, borderRadius: 5 }}>
          <Typography variant="h4" gutterBottom align="center">
            {t('backImage')}
          </Typography>
          <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
            {colorArray !== null &&
              Object.values(values[3]?.['images']?.[1]?.['back']).map((back: any, i: number) => {
                return (
                  <Fragment key={i} >
                    <Grid container direction="row" justifyContent="space-evenly" alignItems="center" >
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        minHeight: '50vh',
                        border: `2px solid ${colorArray.filter((b: any) => b._id == back['color'])[0]['colorCode']}`,
                        marginTop: '10px',
                      }}
                        className={classes.labelRoot}>
                        <Typography variant="button" gutterBottom align="center">
                          {colorArray.filter((b: any) => b._id == back['color'])[0]['label_en']}
                        </Typography>
                        {
                          back['src'] == '' ?
                            <>
                              <SingleDropzoneField
                                name={`images.1.back.${i}.${back['color']}`}
                                Controller={Controller}
                                control={control}
                                t={t}
                                setValue={setValue}
                                getValues={getValues}
                                classes={classes}
                                setValues={setValues}
                                errors={errors}
                                a={`images.1.back.${i}.${back['color']}`}
                                values={values}
                                index={i}
                                setUpdateParentImage={setUpdateParentImage}
                              />
                            </>
                            :
                            <Grid item xs={12} md={12} className={classes.imgBox}>
                              <IconButton
                                disableFocusRipple disableRipple disableTouchRipple
                                className={classes.deleteButton} onClick={(e) => {
                                  if (componentType == 'create') {
                                    setValue(`images.1.back.${i}.${back['color']}`, undefined)
                                    setError(`images.1.back.${i}.${back['color']}`, { type: 'required', message: t('required', { ns: 'common' }) })
                                    setValues((prevState: any) => {
                                      prevState[3]['images'][1]['back'][i] = {
                                        color: prevState[3]['images'][1]['back'][i]['color'],
                                        height: 0,
                                        width: 0,
                                        src: '',
                                        path: '',
                                        tags: [
                                          {
                                            value: "", title: ""
                                          }
                                        ],

                                      }
                                      return [...prevState]
                                    })
                                  } else {
                                    setValue(`deletedImagesArray`,
                                      typeof getValues(`deletedImagesArray`) == 'undefined' ? [getValues(`images.1.back.${i}`)] :
                                        [...getValues(`deletedImagesArray`), getValues(`images.1.back.${i}`)])
                                    setValue(`images.1.back.${i}`, { [back['color']]: undefined })

                                    setError(`images.1.back.${i}.${back['color']}`, { type: 'required', message: t('required', { ns: 'common' }) })
                                    setValues((prevState: any) => {
                                      prevState[3]['images'][1]['back'][i] = {
                                        color: prevState[3]['images'][1]['back'][i]['color'],
                                        height: 0,
                                        width: 0,
                                        src: '',
                                        path: '',
                                        tags: [
                                          {
                                            value: "", title: ""
                                          }
                                        ],

                                      }
                                      return [...prevState]
                                    })

                                  }
                                }}>
                                <DeleteIcon sx={{ color: 'crimson' }} />
                              </IconButton>
                              <img
                                width={back['width']}
                                height={back['height']}
                                src={back['src'].replace('/admin', '')}
                                className={classes.img} />
                            </Grid>
                        }
                      </Box>
                    </Grid>
                  </Fragment>
                )
              })
            }
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
})
export interface ProductsFormGalleryTypes {
  values: any;
  watch: any;
  errors: any;
  clearErrors: Function;
  setError: Function;
  register: any;
  setValues: Function;
  setValue: Function;
  setGalleryValidation: Function;
  getValues: Function;
  control: any;
  Controller: any;
  resetField: any
}
export const ProductsFormGallery: FC<ProductsFormGalleryTypes> = ((props: ProductsFormGalleryTypes) => {
  const { values, setValues, setValue, getValues, setGalleryValidation, watch, errors, clearErrors, setError, register, control, Controller, resetField } = props;
  const { t } = useTranslation('Products')
  const { classes, } = productStyles({})
  const [images, setImages] = useState<ImageGalleryType[]>([]);

  const handleClick = (index: number, item: any, event: any) => {
    let isCreate: boolean = item['src'].startsWith('blob')
    if (isCreate) {
      const newImage = images.filter((a) => a !== item)
      setImages(newImage)

      const newValues = values[4]['gallery'].filter((a: any) => a !== values[4]['gallery'][index])
      setValues((prevState: any) => {
        prevState[4]['gallery'] = newValues;
        return prevState
      })
      const newValue = getValues('gallery').filter((a: any) => a !== getValues('gallery')[index])
      setValue('gallery', newValue)
    } else {
      const newImage = images.filter((a) => a !== item)
      setImages(newImage)

      const newValues = values[4]['gallery'].filter((a: any) => a !== values[4]['gallery'][index])
      setValues((prevState: any) => {
        prevState[4]['gallery'] = newValues;
        return prevState
      })
      const newValue = getValues('gallery').filter((a: any) => a !== getValues('gallery')[index])
      setValue('gallery', newValue)

      setValue(`deletedGalleryArray`,
        typeof getValues(`deletedGalleryArray`) == 'undefined' ?
          [item] :
          [...getValues(`deletedGalleryArray`), item])


    }
  }

  const handleSelect = (index: number, item: any, event: any) => {
    // console.log(values[4]['gallery'][index])
    let allSelected: any = []
    images.forEach((a: ImageGalleryType) => allSelected.push(a['isSelected']))
    if (allSelected.some((a: any) => a) && !allSelected[index]) {
      alert(t('onlyOne'))
    }
    const nextImages = images.map((image, i) => {
      return i === index ? {
        ...image,
        isSelected: !allSelected.some((a: any) => a) && !image.isSelected
      } : image
    });
    setValues((prevState: any) => {
      prevState[4]['gallery'] = nextImages
      return prevState
    })
    setImages(nextImages);
  };

  useEffect(() => {

    setImages(() => {
      let m = values[4]['gallery'].map((a: any) => ({ ...a, src: a.src.replace('/admin', '') }))
      if (values[4]['gallery'].length !== 0 && !values[4]['gallery'].some((a: ImageGalleryType) => a.isSelected)) {
        values[4]['gallery'][0]['isSelected'] = true
      }
      return m
    })
  }, [])
  useEffect(() => {
    if (images.length > 0) {
      setGalleryValidation(() => true);
      clearErrors('gallery')
    } else {
      setGalleryValidation(() => false)
      setError('gallery', { type: 'required', message: t('required', { ns: 'common' }) })
    }
  }, [images])

  return (
    <Fragment>
      {values[4]['gallery'].length !== 0 &&
        <>
          <Typography align="center" variant="inherit" dangerouslySetInnerHTML={{ __html: t('clickToDelete') }} />
          <Typography align="center" variant="inherit"> {getValues('gallery')?.length}{'  '}{t('images')}</Typography></>}
      <Gallery
        images={images}
        onClick={handleClick}
        onSelect={handleSelect}
      />
      <Grid container spacing={1} direction="row"
        justifyContent="space-evenly"
        alignItems="center"  >
        {
          values[4]['gallery'].length < 22 &&
          <DropzoneField
            name="gallery"
            Controller={Controller}
            control={control}
            t={t}
            classes={classes}
            setValues={setValues}
            getValues={getValues}
            setValue={setValue}
            setImages={setImages}
            errors={errors} />
        }
      </Grid>
    </Fragment>

  )
})

export const DropzoneField: FC<{
  name: string;
  Controller: any;
  control: any;
  t: any;
  setValue: Function;
  getValues: Function;
  classes: any;
  setValues: any;
  setImages: Function;
  errors: any;
}> = ({
  name,
  Controller,
  control,
  t, classes,
  setValues,
  getValues,
  setValue,
  setImages,
  errors,
  ...rest
}) => {


    return (
      <Controller
        rules={{ required: t('required', { ns: 'common' }) }}
        //@ts-ignore
        render={({ field: { onChange } }) => (
          <Dropzone
            onChange={(e: any) => { }

            }
            t={t}
            classes={classes}
            name={name}
            setValues={setValues}
            getValues={getValues}
            setValue={setValue}
            setImages={setImages}
            errors={errors}
            {...rest}
          />
        )}
        name={name}
        control={control}
      />
    );
  };

const Dropzone: FC<{
  onChange?: ChangeEventHandler<HTMLInputElement>;
  t: any;
  classes: any;
  name: any;
  setValues: any;
  setValue: Function;
  getValues: Function;
  setImages: Function;
  errors: any;
}> = ({ onChange, t, classes, name, setValues, getValues, setValue, setImages, errors, ...rest }) => {
  const onDrop = useCallback((acceptedFiles: any) => {

    if (typeof getValues(name) == 'undefined') {
      setValue(name, acceptedFiles)
      acceptedFiles.forEach((file: any) => {
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = function () {
          var image = new Image();
          image.onload = function () {
            let ImageCreate: ImageGalleryType[] = []
            ImageCreate.push({
              src: URL.createObjectURL(file),
              width: image.width,
              height: image.height,
              isSelected: false,
              tags: [
                { value: file['name'], title: file['name'] },
              ],
            })
            setImages((prevState: any) => {
              prevState = [...prevState, ...ImageCreate]
              return prevState
            })
            setValues((prevState: any) => {
              prevState[4][name] = [...prevState[4][name], ...ImageCreate]
              return prevState
            })
          };
          image.src = URL.createObjectURL(file)
        }
        reader.readAsDataURL(file);
      })
    } else {
      if ((acceptedFiles.length + getValues(name).length) <= 22) {
        setValue(name, [...getValues(name), ...acceptedFiles])
        acceptedFiles.forEach((file: any) => {
          const reader = new FileReader()

          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = function () {
            var image = new Image();
            image.onload = function () {
              let ImageCreate: ImageGalleryType[] = []
              ImageCreate.push({
                src: URL.createObjectURL(file),
                width: image.width,
                height: image.height,
                isSelected: false,
                tags: [
                  { value: file['name'], title: file['name'] },
                ],
              })
              setImages((prevState: any) => {
                prevState = [...prevState, ...ImageCreate]
                return prevState
              })
              setValues((prevState: any) => {
                prevState[4][name] = [...prevState[4][name], ...ImageCreate]
                return prevState
              })
            };
            image.src = URL.createObjectURL(file)
          }
          reader.readAsDataURL(file);
        })
      } else {
        toast(<ToastMessage >{t('maxFile22')}</ToastMessage>, {
          onClose: () => { }
        })
      }
    }

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...rest,
    onDrop,
    multiple: true,
    maxFiles: 22,
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpeg'], 'image/jpg': ['.jpg'], },
    onDropRejected: (e) => {
      let errorText = ""
      e.map((a) => {
        errorText = a.errors[0].message
      })
      toast(<ToastMessage >{errorText}</ToastMessage>, {
        onClose: () => { }
      })
      return false
    },
    autoFocus: true,
  });

  return (
    <Fragment>
      <div {...getRootProps()}>
        <input {...getInputProps({ onChange })} />
        < >
          <p style={{ textAlign: 'center' }} >{t('maxFile22')}</p>
          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {isDragActive ? <>{t('drop')}</> :
              <p style={{ textAlign: 'center' }} >{t('drag&drop')}</p>
            }
            {isDragActive ?
              <CloudDownloadIcon className={classes.dropIcon} /> :
              <CloudUploadIcon className={classes.uploadIcon} />
            }
          </span>
          {errors['gallery'] && errors?.['gallery']?.type === "required" &&
            <FormHelperText error style={{ marginBottom: '15px', textAlign: 'center' }}>
              {errors['gallery'][`message`]}
            </FormHelperText>}
        </>
      </div>
    </Fragment>
  );
};