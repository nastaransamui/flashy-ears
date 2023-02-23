
import { FC, useState, useRef, useMemo, useEffect, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MuiTelInput, MuiTelInputInfo } from 'mui-tel-input';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match'
import throttle from 'lodash/throttle';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import useCurrentRouteState from "@/src/components/Hooks/useCurrentRouteState";
import dataShowStyle from "@/shared/DataShow/data-show-style";

import { State, TotalDataType } from "@/src/redux/store";
import axios from "axios";
import SvgIcon from '@mui/material/SvgIcon';
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Close from '@mui/icons-material/Close'


export interface OptionType {
  description: string;
  [key: string]: string
}

interface PartType {
  text: string;
  highlight: boolean;
}

interface SearchAutoCompleteProps { }
const SearchAutoComplete: FC<SearchAutoCompleteProps> = (() => {
  const [value, setValue] = useState<OptionType | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly OptionType[]>([]);
  const { classes, theme } = dataShowStyle({})
  const currentRouteState = useCurrentRouteState();
  const { modelName, activeOnly, predefineDb } = currentRouteState;
  const { t } = useTranslation(modelName)
  const { adminAccessToken, totalData, firstSearch, fieldValue } = useSelector<State, State>(state => state)
  const dispatch = useDispatch()
  let allTotalDataCopy = useRef<TotalDataType[]>([]);
  const [openOption, setOpenOption] = useState<boolean>(false);
  const [loadingOption, setLoadingOption] = useState<boolean>(openOption && options.length == 0)

  useEffect(() => {
    let active = true;
    if (!firstSearch && active) allTotalDataCopy.current = totalData
    return () => {
      active = false;
    }
  }, [totalData])


  const url = '/admin/api/modelsCrud/search';

  const fetch = useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          active: boolean
        ) => {
          dispatch({
            type: 'FIRST_SEARCH',
            payload: true
          });
          axios.post(url, {
            modelName: modelName,
            activeOnly: activeOnly,
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
              setLoadingOption(() => false)
              if (value) {
                newOptions = [value];
              }
              if (data.length > 0) {
                newOptions = [...newOptions, ...data];
                dispatch({
                  type: 'TOTAL_DATA',
                  payload: data
                })
              } else {
                dispatch({
                  type: 'TOTAL_DATA',
                  payload: allTotalDataCopy.current
                })
              }
              setOptions(newOptions);
            }
          })).catch((err) => {
            console.log(err)
          })

        },
        200,
      ),
    [inputValue],
  );
  useEffect(() => {
    let active = true;
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly OptionType[]) => { }, active);

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  useEffect(() => {
    setValue(null)
    setInputValue('')
    dispatch({ type: 'FIRST_SEARCH', payload: false })
    dispatch({ type: 'FIELD_VALUE', payload: '' })
    return () => { };
  }, [activeOnly])


  return (
    <Autocomplete
      id={`${modelName}_${fieldValue}_select`}
      options={options}
      loading={loadingOption}
      autoComplete
      includeInputInList
      filterSelectedOptions
      loadingText={t('loadingField', { ns: 'common' })}
      noOptionsText={t('fieldNoOptions', { ns: 'common' })}
      isOptionEqualToValue={(option: OptionType, value: OptionType) => {
        switch (typeof value[fieldValue]) {
          case 'undefined':
            return true
          default:
            return option[fieldValue] === value[fieldValue]
        }
      }}
      getOptionLabel={(option) => {
        return typeof option === 'string' ? option : option.autoCompleteMainLabel
      }}
      onOpen={() => {
        setOpenOption(true);
      }}
      onClose={() => {
        setOpenOption(false);
      }}
      filterOptions={(x) => x}
      disableClearable={value !== null}
      inputValue={inputValue}
      value={value}
      onChange={(event: any, newValue: OptionType | null, reason: string) => {
        if (reason == 'selectOption') {
          if (fieldValue == 'phones') {
            //@ts-ignore
            setInputValue(newValue?.phones[0]?.number);
            setLoadingOption(() => false)
          }
          if (fieldValue == 'creditAmount') {
            //@ts-ignore
            setInputValue(newValue?.creditAmount?.toString());
            setLoadingOption(() => false)
          }
          if (fieldValue == 'depositAmount') {
            //@ts-ignore
            setInputValue(newValue?.depositAmount?.toString());
            setLoadingOption(() => false)
          }
          if (fieldValue == 'remainCreditAmount') {
            //@ts-ignore
            setInputValue(newValue?.remainCreditAmount?.toString());
            setLoadingOption(() => false)
          }
          if (fieldValue == 'remainDepositAmount') {
            //@ts-ignore
            setInputValue(newValue?.remainDepositAmount?.toString());
            setLoadingOption(() => false)
          }
        }
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue, reason) => {
        switch (reason) {
          case 'input':
            setInputValue(newInputValue);
            setLoadingOption(() => true)
            break;
          case 'reset':
            if (
              fieldValue !== 'phones' &&
              fieldValue !== 'creditAmount' &&
              fieldValue !== 'depositAmount' &&
              fieldValue !== 'remainCreditAmount' &&
              fieldValue !== 'remainDepositAmount'
            ) {
              setInputValue(newInputValue);
              setLoadingOption(() => false)
            }
            break;


          default:
            setInputValue(newInputValue);
            setLoadingOption(() => true)
            break;
        }
      }}
      className={classes.searchSelect}
      renderInput={(params) => {
        return (
          <Fragment>
            {fieldValue !== 'phones' && fieldValue !== 'fax' ? (
              <TextField
                className={classes.input}
                {...params}
                variant="outlined"
                autoComplete='off'
                size='small'
                label={t('labelSearch', { ns: 'common' })}
                onKeyDown={(e) => {
                  const allowKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace', 'Enter', 'Delete']
                  const numberFields = ['creditAmount', 'depositAmount', 'remainCreditAmount', 'remainDepositAmount',]
                  if (!allowKeys.includes(e.key) && numberFields.includes(fieldValue)) {
                    e.preventDefault()
                  }
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loadingOption && inputValue !== '' ? (
                        <CircularProgress color='primary' size={20} />
                      ) :
                        (firstSearch && totalData?.length !== allTotalDataCopy?.current?.length) && <IconButton
                          disableFocusRipple
                          disableRipple
                          disableTouchRipple
                          sx={{ padding: '1px' }}
                          onClick={() => {
                            setInputValue('')
                            setValue(null)
                            setOptions([])
                            dispatch({
                              type: 'TOTAL_DATA',
                              payload: allTotalDataCopy.current
                            })
                          }}
                        >
                          <Close color='secondary' />
                        </IconButton>
                      }
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
              />) : (
              <MuiTelInput
                {...params}
                disableDropdown
                variant="outlined"
                autoComplete='off'
                size='small'
                label={t('labelSearch', { ns: 'common' })}
                InputProps={{
                  ...params.InputProps,
                  ref: params.InputProps.ref,
                  endAdornment: (
                    <Fragment>
                      {loadingOption && inputValue !== '' ? (
                        <CircularProgress color='primary' size={20} />
                      ) : (
                        (firstSearch && options.length > 0) && (
                          <IconButton
                            disableFocusRipple
                            disableRipple
                            disableTouchRipple
                            sx={{ padding: '1px' }}
                            onClick={() => {
                              setInputValue('')
                              setValue(null)
                              setOptions([])
                              dispatch({
                                type: 'TOTAL_DATA',
                                payload: allTotalDataCopy.current
                              })
                            }}>
                            <Close color='secondary' />
                          </IconButton>
                        )
                      )}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
                inputProps={{
                  ...params.inputProps,
                }}
                className={classes.phone}
                MenuProps={{
                  PaperProps: {
                    className: classes.phoneMenu,
                  },
                }}
                value={inputValue}
                onChange={(value: string, info: MuiTelInputInfo) => {
                  setInputValue(value)
                }}
              />
            )}
          </Fragment>
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
                {parts.map((part: PartType, index: number) => {
                  return (
                    <span
                      key={option._id + index}
                      style={{
                        fontWeight: part.highlight ? 900 : 400,
                        color: part.highlight ? theme.palette.primary.main : '',
                      }}
                      dangerouslySetInnerHTML={{ __html: part.text }}
                    ></span>
                  )
                })}
                <Typography variant="body2" color="text.secondary">
                  {/* {JSON.stringify(option[fieldValue])} */}
                  {option.autoCompleteSubLabel}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );

})

export default SearchAutoComplete;
