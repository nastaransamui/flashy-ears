import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import { FC, Fragment, useEffect, useState, useContext, MouseEvent } from 'react';
import collectionStyles from './collection-style';
import { useTranslation } from "react-i18next";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import SingleDropzoneField from '@/shared/SingleDropzoneField';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CustomNoRowsOverlay } from '@/shared/DataShow/Table/functions'
import Lightbox from "react-image-lightbox";
import { Image as ImageGalleryType } from 'react-grid-gallery'
import Tooltip from '@mui/material/Tooltip';
import TablePagination from '@mui/material/TablePagination';
import { SingleDataCtx } from '@/hookes/useSingleData'
import { useReadLocalStorage } from 'usehooks-ts'
import useCurrentRouteState from '@/hookes/useCurrentRouteState';
import { useDispatch, useSelector } from "react-redux";
import Sort from '@mui/icons-material/Sort';
import Toolbar from '@mui/material/Toolbar';
import CustomPopover from '@/shared/CustomPopover';
import useIconMap from '@/src/components/Hooks/useIconMap';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowRight from '@mui/icons-material/ArrowRight'
import ArrowLeft from '@mui/icons-material/ArrowLeft'
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover'
import Check from '@mui/icons-material/Check';
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
  setValidate?: any;
}

export const CollectionFormInformation: FC<CollectionFormPropsType> = (props: CollectionFormPropsType) => {
  const { classes } = collectionStyles({});
  const { t } = useTranslation('Collections')
  const { register, errors, watch, setError, clearErrors, values, getValues, setValidate } = props;
  useEffect(() => {
    const subscription = watch((value: any, { type, name }: { type: string, name: string }) => {
      // if (name !== 'img_light' && name !== 'img_dark') {
      //   if (Object.values(value).every((a) => a !== '')) {
      //     setValidate(() => true)
      //     clearErrors(name)
      //   } else {
      //     if (value[name as string] !== '') {
      //       clearErrors(name)
      //     }
      //     if (value[name as string] == '') {
      //       setError(name as string, { type: 'required', message: t('required', { ns: 'common' }) })
      //     }
      //     setValidate(() => false)
      //   }
      // }
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
                    if (val == 'name_en' || val == 'name_th') {
                      var inputValue = e.which;
                      if (!(inputValue >= 97 && inputValue <= 122)) {
                        e.preventDefault();
                        setError(`${val}`, { type: 'numer', message: t('onlyAlphabet') });
                      }
                    }
                  }}
                  onPaste={(e) => {
                    if (val == 'name_en') {

                      var pat = /^[a-z]+$/;
                      if (!pat.test(e.clipboardData.getData('Text'))) {
                        e.preventDefault();
                        setError(`${val}`, { type: 'numer', message: t('onlyAlphabet') });
                      }
                    }
                    if (val == 'name_th') {
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
          Array.isArray(value['img_light']) && Array.isArray(value['img_dark']) ||
          value['img_dark'] instanceof File && value['img_light'] instanceof File ||
          Array.isArray(value['img_light']) && value['img_dark'] instanceof File ||
          Array.isArray(value['img_dark']) && value['img_light'] instanceof File
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
            {values[1]?.['img_light']?.[0]?.['src'] == '' || values[1]?.['img_light']?.[0]?.['src'] == undefined ?
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
                    values[1]['img_light'][0]['src'] = URL.revokeObjectURL(values[1]['img_light'][0]['src'])
                    values[1]['img_light'][0]['height'] = 0;
                    values[1]['img_light'][0]['width'] = 0;
                    values[1]['img_light'][0]['tags'][0]['value'] = '';
                    values[1]['img_light'][0]['tags'][0]['title'] = '';
                    setValue('img_light', undefined)
                    setImageValidate(() => false)
                    setError('img_light', { type: 'required', message: t('required', { ns: 'common' }) })
                  }}>
                  <DeleteIcon sx={{ color: 'crimson' }} />
                </IconButton>
                <img
                  src={values[1]['img_light'][0]['src'].replace('/admin', '')}
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
            {values[1]?.['img_dark']?.[0]?.['src'] == '' || values[1]?.['img_dark']?.[0]?.['src'] == undefined ?
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
                    values[1]['img_dark'][0]['src'] = URL.revokeObjectURL(values[1]['img_dark'][0]['src'])
                    values[1]['img_dark'][0]['height'] = 0;
                    values[1]['img_dark'][0]['width'] = 0;
                    values[1]['img_dark'][0]['tags'][0]['value'] = '';
                    values[1]['img_dark'][0]['tags'][0]['title'] = '';
                    setValue('img_dark', undefined)
                    setImageValidate(() => false)
                    setError('img_dark', { type: 'required', message: t('required', { ns: 'common' }) })
                  }}>
                  <DeleteIcon sx={{ color: 'crimson' }} />
                </IconButton>
                <img
                  src={values[1]['img_dark'][0]['src'].replace('/admin', '')}
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

export interface CollectionFormProductType {
  productData: any;
  total: number;
}

interface AnchorType {
  0: null | HTMLButtonElement;
  field: string;
}
export const CollectionFormProduct: FC<CollectionFormProductType> = (props: CollectionFormProductType) => {
  const { classes, theme, cx } = collectionStyles({});
  const [images, setImages] = useState<ImageGalleryType[]>([])
  const { t, i18n } = useTranslation('Collections')
  const { productData, total } = props;
  const currentRouteState = useCurrentRouteState();

  const { modelName } = currentRouteState;
  const lookupsFilter: any = useReadLocalStorage(`${modelName}_Lookup`)!
  const { setLookupsFilter } = useContext(SingleDataCtx);
  const dispatch = useDispatch();
  const handleClose = () => setImages([]);


  return (
    <Fragment>
      {images.length !== 0 && (
        // @ts-ignore
        <Lightbox
          mainSrc={images[0].src}
          imageTitle={images[0]!.tags?.[0]?.['title']}
          mainSrcThumbnail={images[0].src}
          nextSrc=""
          nextSrcThumbnail=""
          prevSrc=""
          prevSrcThumbnail=""
          onCloseRequest={handleClose}
          onMovePrevRequest={() => { }}
          onMoveNextRequest={() => { }}
          imageCaption={images[0]!.tags?.[0]?.['value']}

        />
      )}
      {
        productData !== undefined &&
          productData.length !== 0 ?
          <TableContainer component={Paper}>
            <SortByToolbar productData={productData} />
            <Table sx={{ minWidth: 650, bgcolor: 'background.paper' }} aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  {
                    Object.keys(productData[0]).map((title: string, index: number) => {
                      if (
                        title !== '_id' &&
                        title !== '__v' &&
                        title !== 'collection_id' &&
                        title !== 'product_name_en' &&
                        title !== 'product_name_th' &&
                        title !== 'product_subtitle_en' &&
                        title !== 'product_subtitle_th' &&
                        title !== 'collection_id' &&
                        title !== 'financials' &&
                        title !== 'product_description_th' &&
                        title !== 'product_description_en'
                      ) {
                        return (
                          <TableCell key={index} align='center'>{t(title, { ns: 'common' })}</TableCell>
                        )
                      }
                    })
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {productData.map((row: any) => {
                  let imageSrc = row.images[0]['front'].filter((a: any) => a.isSelected)?.[0] || row.images[0]['front'][0]
                  let gallerySrc = row.gallery.filter((a: any) => a.isSelected)?.[0] || row.gallery[0]
                  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: "2-digit", minute: "2-digit" } as const;
                  return (
                    <TableRow
                      hover
                      key={row._id}
                    // sx={{ '&:last-child td, &:last-child th': { border: 0, } }}
                    >
                      <TableCell align="center">{row.product_label_en}</TableCell>
                      <TableCell align="center">{row.product_label_th}</TableCell>
                      <TableCell align="center">{row.colors_id.length} {' '} {t('colors', { ns: 'common' })}</TableCell>
                      <Tooltip arrow title={t('clickToImage', { ns: 'common' })}>
                        <TableCell align="center" onClick={() => {
                          setImages(() => [imageSrc])
                        }}>
                          <img src={imageSrc['src']} style={{ width: imageSrc['width'] / 30, height: imageSrc['height'] / 30, cursor: 'pointer' }} />
                        </TableCell>
                      </Tooltip>
                      <Tooltip arrow title={t('clickToImage', { ns: 'common' })}>
                        <TableCell align="center" onClick={() => {
                          setImages(() => [gallerySrc])
                        }}>
                          <img src={gallerySrc['src']} style={{ width: gallerySrc['width'] / 30, height: gallerySrc['height'] / 30, cursor: 'pointer' }} />
                        </TableCell>
                      </Tooltip>
                      <TableCell align="center">
                        {new Date(row.createdAt).toLocaleDateString("en-GB", options)}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(row.updatedAt).toLocaleDateString("en-GB", options)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <CustomPagination total={total} />
          </TableContainer> :
          <>
            <Box sx={{ minWidth: 650, display: 'flex', minHeight: `50vh`, justifyContent: 'center', alignItems: 'center' }}>
              <CustomNoRowsOverlay />
            </Box>
          </>
      }
    </Fragment>
  )
}

const SortByToolbar: FC<{ productData: any }> =
  (({ productData }) => {
    const iconMap = useIconMap();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'sort-by-popover' : undefined;
    const [anchorSTl, setAnchorSTl] = useState<AnchorType>({
      0: null,
      field: ''
    });
    const { classes, theme, cx } = collectionStyles({});
    const { t, i18n } = useTranslation('Collections')
    const rtlActive = i18n.language == 'fa'
    const DynamicIcon = iconMap['InfoIcon'];

    const currentRouteState = useCurrentRouteState();

    const { modelName } = currentRouteState;
    const lookupsFilter: any = useReadLocalStorage(`${modelName}_Lookup`)!
    const { setLookupsFilter } = useContext(SingleDataCtx);
    const dispatch = useDispatch();
    const sortByField = lookupsFilter?.[0]?.[`${modelName}_productData_sortByField`]
    const sortDirection = lookupsFilter?.[0]?.[`${modelName}_productData_sortDirection`]
    return (
      <Toolbar
        sx={{
          float: 'right',
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 }
        }}
      >
        <Tooltip title={t('sortBy', { ns: 'common' })}>
          <IconButton disableRipple
            disableFocusRipple
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              setAnchorEl(e.currentTarget);
            }}>
            <Sort fontSize='small' />
          </IconButton>
        </Tooltip>
        <CustomPopover id={id} setAnchor={setAnchorEl}
          open={open} anchor={anchorEl} >
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            dense
            disablePadding
            component='nav'
            aria-label='Rows-menu'>
            {
              productData.map((a: any, index: number) => {
                if (index == 0) {
                  return Object.keys(a)
                    .map((key, i) => {
                      if (
                        key !== '_id' &&
                        key !== '__v' &&
                        key !== 'collection_id' &&
                        key !== 'product_name_en' &&
                        key !== 'product_name_th' &&
                        key !== 'product_subtitle_en' &&
                        key !== 'product_subtitle_th' &&
                        key !== 'collection_id' &&
                        key !== 'financials' &&
                        key !== 'product_description_th' &&
                        key !== 'product_description_en' &&
                        key !== 'images' &&
                        key !== 'colors_id' &&
                        key !== 'gallery'
                      ) {
                        return (
                          <Fragment key={(key + i.toString())}>
                            <ListItem
                              disablePadding
                              className={classes.listItemHover + ' ' + cx({
                                [classes.listItemActive]: key == sortByField
                              })}
                              onClick={() => { }}>
                              <ListItemButton
                                onClick={(e) => {
                                  setAnchorSTl((prev) => ({
                                    0: e.currentTarget as unknown as HTMLButtonElement,
                                    field: key as string,
                                  }));
                                }}>
                                <ListItemIcon >
                                  <Tooltip title={t('filterType', { ns: 'common' })}>
                                    <IconButton
                                      size='large'
                                      disableFocusRipple
                                      disableRipple>
                                      {rtlActive ? (
                                        <ArrowRight
                                          id="right"
                                          className={
                                            classes.listItemHoverSmallArrowRight
                                          }
                                        />
                                      ) : (
                                        <ArrowLeft
                                          id="left"
                                          className={
                                            classes.listItemHoverSmallArrowLeft
                                          }
                                        />
                                      )}
                                    </IconButton>
                                  </Tooltip>
                                  <DynamicIcon style={{
                                    color:
                                      theme.palette[
                                        `${i % 2 == 0 ? 'primary' : 'secondary'
                                        }`
                                      ].main,
                                  }} />
                                </ListItemIcon>
                                <ListItemText primary={t(key, { ns: 'common' })} />
                              </ListItemButton>
                            </ListItem>
                            <Divider />
                          </Fragment>
                        )
                      }
                    })
                }
              })
            }
          </List>
        </CustomPopover>
        {
          anchorSTl[0] !== null && (
            <Popover
              elevation={18}
              id={id}
              open={open}
              anchorEl={anchorSTl[0]}
              onClose={(e) => {
                setAnchorSTl((prev) => ({
                  0: null,
                  field: ''
                }));
              }}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 52,
                horizontal: rtlActive ? -205 : 220,
              }}>
              <List
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 0,
                  minWidth: 220,
                  maxWidth: 220,
                  overflow: 'visible',
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 60,
                    right: rtlActive ? 214 : -4,
                    width: 10,
                    height: 10,
                    bgcolor: theme.palette.primary.main,
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                }}
                dense
                disablePadding
                component='nav'
                aria-label='menu'>
                {[-1, 1].map((list, index) => {
                  return (
                    <Fragment key={index}>
                      <ListItem
                        disablePadding
                        disableGutters={true}
                        dense
                        onClick={() => {
                          setLookupsFilter((prevState: any) => {
                            prevState[0][`${modelName}_productData_sortByField`] = anchorSTl['field']
                            prevState[0][`${modelName}_productData_sortDirection`] = list
                            return prevState
                          })
                          dispatch({
                            type: 'RERUN_SINGLE_GET',
                            payload: true
                          })
                          setAnchorSTl({
                            0: null,
                            field: ''
                          });
                        }}>
                        <ListItemButton>
                          <ListItemIcon>
                            {
                              sortByField == anchorSTl[`field`] &&
                                sortDirection == list ? (
                                <Check color="secondary" />
                              ) : null
                            }
                          </ListItemIcon>
                          <ListItemText
                            primary={t(anchorSTl['field'], { ns: 'common' })}
                            secondary={t(`${list}`, { ns: 'common' })} />
                        </ListItemButton>
                      </ListItem>
                      {index !== 1 && <Divider />}
                    </Fragment>
                  )
                })}
              </List>
            </Popover>
          )
        }
      </Toolbar>
    )
  })

const CustomPagination: FC<{ total: number }> = (({ total }) => {

  const currentRouteState = useCurrentRouteState();

  const { modelName } = currentRouteState;
  const lookupsFilter: any = useReadLocalStorage(`${modelName}_Lookup`)!
  const { setLookupsFilter } = useContext(SingleDataCtx);
  const dispatch = useDispatch();
  return (
    <>
      {lookupsFilter !== null && <TablePagination
        sx={{ bgcolor: 'background.paper' }}
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={total}
        rowsPerPage={lookupsFilter[0][`${modelName}_productData_perPage`]}
        page={lookupsFilter[0][`${modelName}_productData_pageNumber`] - 1}
        onPageChange={(event: unknown, newPage: number) => {
          setLookupsFilter((prevState: any) => {
            prevState[0][`${modelName}_productData_pageNumber`] = newPage + 1
            return prevState
          })
          dispatch({
            type: 'RERUN_SINGLE_GET',
            payload: true
          })
        }}
        onRowsPerPageChange={(e) => {
          if (e.target.value)
            setLookupsFilter((prevState: any) => {
              prevState[0][`${modelName}_productData_perPage`] = e.target.value
              if (total / prevState[0][`${modelName}_productData_perPage`] < 1) {
                prevState[0][`${modelName}_productData_pageNumber`] = 1
              }
              if (total / prevState[0][`${modelName}_productData_perPage`] % 1 !== 0) {
                prevState[0][`${modelName}_productData_pageNumber`] = Math.ceil(total / prevState[0][`${modelName}_productData_perPage`])
              }
              return prevState
            })
          dispatch({
            type: 'RERUN_SINGLE_GET',
            payload: true
          })
        }}
      />}
    </>
  )
})