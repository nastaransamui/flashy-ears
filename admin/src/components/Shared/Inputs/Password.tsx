import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { FC, useState, } from 'react';
import { useTranslation } from 'react-i18next';
import emailStyles from './email-style'
import { Controller } from "react-hook-form";

interface Props {
  isShrink?: boolean;
  isRequired?: boolean;
  value: string;
  setValues: Function;
  size?: any;
  variant?: "filled" | "outlined" | "standard" | undefined;
  showPassword: boolean;
  control: any;
  name: string;
}

export let regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);


const Password: FC<Props> = ({ isShrink, isRequired, value: stateValue, setValues, size, variant, showPassword, control, name }) => {
  const { classes } = emailStyles({})
  const { t } = useTranslation();
  const [isDirty, setIsDirty] = useState(false)
  const [patternError, setPatternError] = useState(false)
  const [valueError, setValueError] = useState(false)

  const textFieldError = (error: object | undefined) => {
    return error !== undefined || (patternError && error == undefined) || (valueError && error == undefined)
  }

  const textFieldHelper = (error: any) => {
    return error !== undefined ?
      error?.type === "required" ? error.message
        : error?.type === "pattern" ? t('form_password_regex')
          : ''
      : valueError ? t('form_require')
        : patternError ? t('form_password_regex')
          : ''
  }

  const textFieldOnChange = (passwordValue: string) => {
    if (passwordValue == '') {
      setValueError(true)
      setPatternError(false)
    } else if (passwordValue.match(regex) == null) {
      setPatternError(true)
      setValueError(false)
    } else {
      setPatternError(false)
      setValueError(false)
    }
    setValues((oldvalue: any) => ({ ...oldvalue, email: passwordValue }));
  }

  return (
    <Controller rules={{
      required: t('form_require'),
      pattern: {
        value: regex,
        message: t('form_password_regex')
      }
    }} control={control} name={name} render={({
      field: { onChange, ref },
      fieldState: { error },
    }) => {
      return (
        <TextField
          type={showPassword ? 'text' : 'password'}
          aria-label="password-input"
          variant={variant}
          className={classes.input}
          required={isRequired}
          InputLabelProps={{ shrink: variant == undefined ? isShrink : undefined }}
          defaultValue={stateValue}
          size={size}
          fullWidth
          error={isRequired && textFieldError(error)}
          helperText={isRequired && textFieldHelper(error)}
          label={t('login_password')}
          onChange={(e) => {
            const passwordValue = e.target.value
            textFieldOnChange(passwordValue)
            onChange(passwordValue)
          }}
          inputRef={ref}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='Toggle password visibility'
                  onClick={() => {
                    setValues((oldvalue: object) => ({ ...oldvalue, showPassword: !showPassword }));
                  }}>
                  {showPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }} />
      )
    }} />
    // <TextField
    //   type={showPassword ? 'text' : 'password'}
    //   variant={variant}
    //   className={classes.input}
    //   InputLabelProps={{ shrink: variant == undefined ? isShrink : undefined }}
    //   required={isRequired}
    //   fullWidth
    //   value={value}
    //   error={error || customError}
    //   label={t('login_password')}
    //   helperText={isRequired && error ? t('form_require') : isRequired && customError ? t('form_password_regex') : ''}
    //   onChange={(e) => {
    //     const passwordValue = e.target.value.toLowerCase().trim()
    //     setValues((oldvalue: object) => ({ ...oldvalue, password: passwordValue }));
    //     setIsDirty(true)
    //   }}
    //   size={size}
    //   InputProps={{
    //     endAdornment: (
    //       <InputAdornment position='end'>
    //         <IconButton
    //           aria-label='Toggle password visibility'
    //           onClick={() => {
    //             setValues((oldvalue: object) => ({ ...oldvalue, showPassword: !showPassword }));
    //           }}>
    //           {showPassword ? (
    //             <Visibility />
    //           ) : (
    //             <VisibilityOff />
    //           )}
    //         </IconButton>
    //       </InputAdornment>
    //     ),
    //   }}
    // />

  )
}

Password.defaultProps = {
  isShrink: true,
  isRequired: true,
  size: undefined,
  variant: undefined
}

Password.propTypes = {
  isShrink: PropTypes.bool,
  isRequired: PropTypes.bool,
  value: PropTypes.string.isRequired,
  setValues: PropTypes.func.isRequired,
  size: PropTypes.any,
  showPassword: PropTypes.bool.isRequired
}

export default Password;