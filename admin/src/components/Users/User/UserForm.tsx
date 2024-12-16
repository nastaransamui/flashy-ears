import {
  FC,
  Fragment,
  useEffect,
  useState,
  createRef
} from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useTranslation } from "react-i18next";
import SingleDropzoneField from '@/shared/SingleDropzoneField';
import CustomCardContent from '@/shared/CardsCompoents/CardContent';

import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment';
import Divider from "@mui/material/Divider";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import DeleteIcon from '@mui/icons-material/Delete'
import UploadIcon from '@mui/icons-material/UploadFile'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export interface UserFormInformationTypes {
  values: any;
  watch: any;
  errors: any;
  register: any;
  setError: any;
  getValues: Function;
  setInformationValidate: Function;
  clearErrors: Function;
  classes: any;
  theme: any;
  setValues: Function;
  setValue: Function;
  control: any;
}

var emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/

export const UserFormInformation: FC<UserFormInformationTypes> = ((props: UserFormInformationTypes) => {
  const [showPassword, setShowPassword] = useState(false)
  const {
    values,
    watch,
    errors,
    register,
    setError,
    getValues,
    setValues,
    setValue,
    setInformationValidate,
    clearErrors,
    classes,
    theme,
    control } = props;
  const { t } = useTranslation('Users')


  const handleChange = (event: SelectChangeEvent) => {
    //event.target.value as string
    setValues((prevState: any) => {
      prevState[0].isAdmin = !prevState[0].isAdmin
      return prevState
    });
  };

  useEffect(() => {
    const subscription = watch((value: any, { type, name }: { type: string, name: string }) => {
      //Check values of first step
      setValues((prevState: any) => {
        prevState[0][name] = value[name]
        return prevState
      })
      if (name == 'password') {
        if (value[name as string] == '') {
          setError(name as string, { type: 'required', message: t('required', { ns: 'common' }) })
        } else {
          if (!passwordRegex.test(value[name])) {
            setError(name, { type: 'pattern', message: t('isRegex') })
          } else {
            clearErrors(name)
          }
        }
      }
      if (name == 'userName') {
        if (value[name as string] == '') {
          setError(name as string, { type: 'required', message: t('required', { ns: 'common' }) })
        } else {
          if (!emailRegx.test(value[name])) {
            setError(name, { type: 'pattern', message: t('userNameRequire') })
          } else {
            clearErrors(name)
          }
        }
      }
      if (typeof value['isAdmin'] == 'string') {
        setValue('isAdmin', values[0]['isAdmin'])
      }
      if (
        name == 'firstName' ||
        name == 'lastName' ||
        name == 'position' ||
        name == 'aboutMe'
      ) {
        if (value[name as string] == '') {
          setError(name as string, { type: 'required', message: t('required', { ns: 'common' }) })
        } else {
          clearErrors(name)
        }
      }
      if (
        typeof value['isAdmin'] == 'boolean' &&
        value['userName'] !== '' && value['password'] !== '' &&
        value['firstName'] !== '' && value['lastName'] !== '' &&
        value['position'] !== '' && value['aboutMe'] !== '' &&
        emailRegx.test(value['userName']) && passwordRegex.test(value['password'])
      ) {
        setInformationValidate(() => true)
      } else {
        setInformationValidate(() => false)
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);


  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: "2-digit", minute: "2-digit" } as const;
  // console.log(getValues())
  // console.log(values)

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8}>
          <Card>
            <CardHeader
              avatar={
                <Fragment>
                  {
                    values[0]?.['profileImage'] == '' ?
                      <>
                        <Tooltip title={t('uploadImage')} arrow>
                          <Avatar sx={{ bgcolor: theme.palette.secondary.main, }} src='/admin/images/faces/avatar1.jpg' />
                        </Tooltip>
                      </> :
                      <Tooltip title={t('deleteImage')} arrow>
                        <Avatar sx={{ bgcolor: theme.palette.secondary.main, }} src={values[0]?.['profileImage']} />
                      </Tooltip>
                  }
                </Fragment>

              }
              action={
                <Fragment>
                  {
                    values[0]?.['profileImage'] == '' ?
                      <>
                        <Tooltip title={t('uploadImage')} arrow>
                          <IconButton
                            onClick={() => {
                              // deleteImage();
                            }}
                            style={{ marginTop: 10 }}
                            disableRipple>
                            <UploadIcon color='secondary' />
                          </IconButton>
                        </Tooltip>
                      </> :
                      <Tooltip title={t('deleteImage')} arrow>
                        <IconButton
                          onClick={() => {
                            // deleteImage();
                          }}
                          style={{ marginTop: 10 }}
                          disableRipple>
                          <DeleteIcon color='error' />
                        </IconButton>
                      </Tooltip>
                  }
                </Fragment>
              }
              title={getValues('userName') == '' ? t('addUserName') : values[0]['userName']}
              subheader={values[0]?.createdAt || new Date().toLocaleDateString("en-GB", options)}
            >
            </CardHeader>
            <Divider />
            <CardContent>
              <Grid container spacing={1} style={{ marginTop: 10 }}>
                <Grid item xs={12} sm={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('isAdmin')}</InputLabel>
                    <Select
                      defaultValue={values[0].isAdmin}
                      size='small'
                      value={values[0].isAdmin ? t('isAdmin') : t('isNotAdmin')}
                      label={t('isAdmin')}
                      name={register(`isAdmin`, { required: t('required', { ns: 'common' }) }).name}
                      ref={register(`isAdmin`, { required: t('required', { ns: 'common' }) }).ref}
                      onChange={(e: SelectChangeEvent) => {
                        handleChange(e)
                        setValue('isAdmin', e.target.value == t('isAdmin') ? true : false)
                      }}
                    >
                      <MenuItem value={t('isAdmin')}>{t('isAdmin')}</MenuItem>
                      <MenuItem value={t('isNotAdmin')}>{t('isNotAdmin')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={5}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    required
                    size='small'
                    label={t('userName')}
                    error={errors['userName'] == undefined ? false : true}
                    helperText={errors['userName'] && errors['userName'][`message`]}
                    name={register(`userName`, {
                      required: t('required', { ns: 'common' }),
                      pattern: {
                        value: emailRegx,
                        message: t('userNameRequire'),
                      }
                    }).name}
                    ref={register(`userName`, {
                      required: t('required', { ns: 'common' }),
                      pattern: {
                        value: emailRegx,
                        message: t('userNameRequire'),
                      }
                    }).ref}
                    onChange={(e: any) => {
                      const value = e.target.value;
                      const name = e.target.name
                      setValues((prevState: any) => {
                        prevState[0][name] = value
                        return prevState
                      })
                      setValue(name, value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    required
                    size='small'
                    type={!showPassword ? 'password' : 'text'}
                    label={t('password')}
                    error={errors['password'] == undefined ? false : true}
                    helperText={errors['password'] && errors['password'][`message`]}
                    {...register('password', {
                      required: t('required', { ns: 'common' }),
                      pattern: {
                        value: passwordRegex,
                        message: t('isRegex'),
                      }
                    })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='Toggle password visibility'
                            onClick={() => {
                              setShowPassword(() => !showPassword)
                            }}>
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ marginTop: 10 }}>
                <Grid item xs={12} sm={12} md={4}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    required
                    size='small'
                    label={t('firstName')}
                    error={errors['firstName'] == undefined ? false : true}
                    helperText={errors['firstName'] && errors['firstName'][`message`]}
                    name={register(`firstName`, {
                      required: t('required', { ns: 'common' }),
                    }).name}
                    ref={register(`firstName`, {
                      required: t('required', { ns: 'common' }),
                    }).ref}
                    onChange={(e: any) => {
                      const value = e.target.value;
                      const name = e.target.name
                      setValues((prevState: any) => {
                        prevState[0][name] = value
                        return prevState
                      })
                      setValue(name, value)
                    }}
                  />

                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    required
                    size='small'
                    label={t('lastName')}
                    error={errors['lastName'] == undefined ? false : true}
                    helperText={errors['lastName'] && errors['lastName'][`message`]}
                    name={register(`lastName`, {
                      required: t('required', { ns: 'common' }),
                    }).name}
                    ref={register(`lastName`, {
                      required: t('required', { ns: 'common' }),
                    }).ref}
                    onChange={(e: any) => {
                      const value = e.target.value;
                      const name = e.target.name
                      setValues((prevState: any) => {
                        prevState[0][name] = value
                        return prevState
                      })
                      setValue(name, value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <AutoComplete
                    name="roleName"
                    arrayOfIdsName="role_id"
                    setValue={setValue}
                    setValues={setValues}
                    control={control}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ marginTop: 10 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    required
                    size='small'
                    label={t('position')}
                    error={errors['position'] == undefined ? false : true}
                    helperText={errors['position'] && errors['position'][`message`]}
                    name={register(`position`, {
                      required: t('required', { ns: 'common' }),
                    }).name}
                    ref={register(`position`, {
                      required: t('required', { ns: 'common' }),
                    }).ref}
                    onChange={(e: any) => {
                      const value = e.target.value;
                      const name = e.target.name
                      setValues((prevState: any) => {
                        prevState[0][name] = value
                        return prevState
                      })
                      setValue(name, value)
                    }}
                  />

                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    multiline
                    maxRows={6}
                    minRows={6}
                    variant='outlined'
                    fullWidth
                    required
                    size='small'
                    label={t('aboutMe')}
                    error={errors['aboutMe'] == undefined ? false : true}
                    helperText={errors['aboutMe'] && errors['aboutMe'][`message`]}
                    name={register(`aboutMe`, {
                      required: t('required', { ns: 'common' }),
                    }).name}
                    ref={register(`aboutMe`, {
                      required: t('required', { ns: 'common' }),
                    }).ref}
                    onChange={(e: any) => {
                      const value = e.target.value;
                      const name = e.target.name
                      setValues((prevState: any) => {
                        prevState[0][name] = value
                        return prevState
                      })
                      setValue(name, value)
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card>
            <CustomCardContent
              path={values[0]?.['profileImage']}
              media='profileImage'
              elRefs={createRef()}
              key={0} />
            <h4 className={classes.cardIconTitle}>
              {values[0].userName} <br />
              <small>
                {' '}
                {values.password !== '' &&
                  //@ts-ignore
                  [...Array(values[0]?.['password'].length).keys()].map(
                    (d, i) => '*'
                  )}
              </small>
            </h4>
            <h6 className={classes.cardCategory}>{values[0].position}</h6>
            <h4 className={classes.cardTitle}>
              {values[0].firstName} {values[0].lastName}
            </h4>
            <p
              className={classes.description}
              style={{ whiteSpace: 'pre-wrap' }}>
              {values[0].aboutMe}
            </p>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  )
})

import MuiAutocomplete from '@mui/material/Autocomplete';
import { makeStyles } from 'tss-react/mui';
import { Controller } from "react-hook-form";
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match'
import throttle from 'lodash/throttle';
import { useMemo } from 'react'
import axios from "axios";
import { useSelector } from "react-redux";
import { State, } from "@/src/redux/store";
import SvgIcon from '@mui/material/SvgIcon';
import { useTheme } from "@mui/material";
import MainCard from "../../Shared/DataShow/Cards/MainCard";
export interface AutoCompleteType {
  name: string;
  setValue: Function;
  setValues: Function;
  control: any;
  arrayOfIdsName: string;
}


const autoStyle = makeStyles<{}>({
  name: 'AutoPage',
  uniqId: 'uniqeIDAutoPage',
})((theme, _params, classes: any) => {
  return {};
});

export interface OptionType {
  description: string;
  [key: string]: string
}

export const AutoComplete: FC<AutoCompleteType> = ((props: AutoCompleteType) => {
  const theme = useTheme();
  const { name,
    setValue,
    setValues,
    control,
    arrayOfIdsName
  } = props;
  const { t } = useTranslation('common');
  let modelName: string;
  let fieldValue: string;
  const [optionValue, setOptionValue] = useState<OptionType | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly OptionType[]>([]);
  const adminAccessToken = useSelector<State, string>(state => state.adminAccessToken as string)
  const url = '/admin/api/modelsCrud/autocomplete';
  switch (name) {
    case 'roleName':
      modelName = "Roles"
      fieldValue = 'roleName'
      break;
    //on each autocomplete update these two
  }

  const fetch = useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          active: boolean
        ) => {
          axios.post(url, {
            modelName: modelName,
            activeOnly: true,
            fieldValue: fieldValue,
            filterValue: request.input
          }, {
            headers: {
              'Content-Type': 'application/json',
              token: `Brearer ${adminAccessToken}`,
            },
          }).then(((res) => {
            const { success, data } = res.data
            if (active && success) {
              let newOptions: readonly OptionType[] = [];
              if (optionValue) {
                newOptions = [optionValue];
              }
              if (data.length > 0) {
                newOptions = [...newOptions, ...data];
              }
              setOptions(newOptions);
            }
          })).catch((err) => {
            console.log(err)
          })
        },
        200,
      ),
    [],
  );

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(optionValue ? [optionValue] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly OptionType[]) => { }, active);

    return () => {
      active = false;
    };
  }, [optionValue, inputValue, fetch]);

  return (
    <Controller
      rules={{ required: t('required') }}
      render={(innerProps) => {
        const { field, formState, fieldState } = innerProps;
        const { error } = fieldState;
        return (
          <MuiAutocomplete
            id={`${modelName}_${fieldValue}_select`}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            noOptionsText={t('fieldNoOptions', { ns: 'common' })}
            loadingText={t('loadingField', { ns: 'common' })}
            isOptionEqualToValue={(option: OptionType, value: OptionType) => {
              switch (typeof value[`${fieldValue}`]) {
                case 'undefined':
                  return true
                default:
                  return option[`${fieldValue}`] === value[`${fieldValue}`]
              }
            }}
            getOptionLabel={(option) =>
              typeof option === 'string' ? option : option.autoCompleteMainLabel
            }
            filterOptions={(x) => x}
            value={field.value || optionValue}
            ref={field.ref}
            onChange={(event: any, newValue: OptionType | null) => {
              setOptions(newValue ? [newValue, ...options] : options);
              setOptionValue(newValue);
              setValues((prevState: any) => {
                prevState[0][name] = newValue?.[`${fieldValue}`]
                prevState[0][arrayOfIdsName] = [newValue?._id]
                return prevState
              })
              setValue(arrayOfIdsName, [newValue?._id])
              field.onChange(newValue?.[`${fieldValue}`])
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => {
              params.size = 'small'
              return (
                <TextField
                  {...params}
                  label={t(name)}
                  fullWidth
                  placeholder={t('typeToSearch')}
                  helperText={error?.message} error={!!error} />
              )
            }}
            renderOption={(props, option) => {
              const matches = match(option?.autoCompleteMainLabel || '', inputValue, { insideWords: true, findAllOccurrences: true });
              const parts = parse(option?.autoCompleteMainLabel, matches);

              return (
                <li {...props} key={option._id}>
                  <Grid container alignItems="center">
                    <Grid item>
                      {option.autoCompleteIcon == '' ?
                        <img
                          key={option._id + option.autoCompleteImg}
                          height={30}
                          loading="lazy"
                          width={30}
                          style={{ borderRadius: '50%' }}
                          src={option.autoCompleteImg}
                          alt=''
                        />
                        : <SvgIcon
                          key={option._id + option.autoCompleteIcon}
                          style={{ color: option.colorCode !== undefined ? option.colorCode : theme.palette.secondary.main }}
                          sx={{ mr: 2 }}>
                          <path d={option.autoCompleteIcon} />
                        </SvgIcon>} &nbsp;&nbsp;&nbsp;
                    </Grid>
                    <Grid item xs>
                      {parts.map((part: any, index: number) => (
                        <span
                          key={option._id + index}
                          style={{
                            fontWeight: part.highlight ? 900 : 400,
                            color: part.highlight ? theme.palette.primary.main : '',
                          }}
                          dangerouslySetInnerHTML={{ __html: part.text }}
                        >
                        </span>
                      ))}
                      <Typography variant="body2" color="text.secondary">
                        {option.autoCompleteSubLabel}
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              );
            }}
            disablePortal
          />
        )
      }}
      name={name}
      control={control}
    />
  )
})