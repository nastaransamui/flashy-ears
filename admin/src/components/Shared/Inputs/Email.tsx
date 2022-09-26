import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField';
import { FC, useState } from 'react';
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
  control: any;
  name: string;
}

export let regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)

const Email: FC<Props> = ({ isShrink, isRequired, value: stateValue, setValues, size, variant, control, name }) => {
  const { classes } = emailStyles({})
  const { t } = useTranslation();
  const [patternError, setPatternError] = useState(false)
  const [valueError, setValueError] = useState(false)

  const textFieldError = (error: object | undefined) => {
    return error !== undefined || (patternError && error == undefined) || (valueError && error == undefined)
  }

  const textFieldHelper = (error: any) => {
    return error !== undefined ?
      error?.type === "required" ? error.message
        : error?.type === "pattern" ? t('form_email_require')
          : ''
      : valueError ? t('form_require')
        : patternError ? t('form_email_require')
          : ''
  }

  const textFieldOnChange = (emailValue: string) => {
    if (emailValue == '') {
      setValueError(true)
      setPatternError(false)
    } else if (emailValue.match(regex) == null) {
      setPatternError(true)
      setValueError(false)
    } else {
      setPatternError(false)
      setValueError(false)
    }
    setValues((oldvalue: any) => ({ ...oldvalue, email: emailValue }));
  }

  return (
    <Controller rules={{
      required: t('form_require'),
      pattern: {
        value: regex,
        message: t('form_email_require')
      }
    }} control={control} name={name} render={({
      field: { onChange, ref },
      fieldState: { error },
    }) => {
      return (
        <TextField
          variant={variant}
          aria-label="email-input"
          className={classes.input}
          required={isRequired}
          InputLabelProps={{ shrink: variant == undefined ? isShrink : undefined }}
          defaultValue={stateValue}
          size={size}
          fullWidth
          error={isRequired && textFieldError(error)}
          helperText={isRequired && textFieldHelper(error)}
          label={t('login_email')}
          onChange={(e) => {
            const emailValue = e.target.value.toLowerCase().trim()
            textFieldOnChange(emailValue)
            onChange(emailValue)
          }}
          inputRef={ref} />
      )
    }} />
  )
}

Email.defaultProps = {
  isShrink: true,
  isRequired: true,
  size: undefined,
  variant: undefined
}

Email.propTypes = {
  isShrink: PropTypes.bool,
  isRequired: PropTypes.bool,
  value: PropTypes.string.isRequired,
  setValues: PropTypes.func.isRequired,
  size: PropTypes.any
}

export default Email;