import PropTypes from 'prop-types'
import { FC, useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import dataShowStyle from "@/shared/DataShow/data-show-style";

import { useTranslation } from 'react-i18next';
import useCurrentRouteState from "@/src/components/Hooks/useCurrentRouteState";
import { useDispatch, useSelector } from 'react-redux';
import { State, TotalDataType } from '@/src/redux/store';
import FormHelperText from "@mui/material/FormHelperText";

interface SearchSelectProps { }

const SearchSelect: FC<SearchSelectProps> = (() => {
  const { classes } = dataShowStyle({})
  const currentRouteState = useCurrentRouteState();
  const { modelName } = currentRouteState;
  const { t, } = useTranslation(modelName)
  const totalData = useSelector<State, TotalDataType[]>((state) => state.totalData);
  const firstSearch = useSelector<State, boolean>((state) => state.firstSearch);
  const fieldValue = useSelector<State, string>((state) => state.fieldValue);

  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false)

  const selectClick = (firstField: string) => {
    dispatch({
      type: "FIELD_VALUE",
      payload: firstField
    });
  }

  useEffect(() => {
    if (totalData.length > 0 && !firstSearch && fieldValue == '') {
      dispatch({
        type: "FIELD_VALUE",
        payload: totalData[0]?.dispalyFields[0]
      });
    }
  }, [totalData])

  useEffect(() => {
    if (fieldValue == '') {
      if (totalData.length > 0) {
        setShowError(() => true)
      }
    } else {
      setShowError(() => false)
    }
  }, [fieldValue, totalData])

  return (
    <FormControl size='small' className={classes.searchSelect}>
      <InputLabel className={classes.selectLabel} id="demo-simple-select-label">{t('Field', { ns: 'common' })}</InputLabel>
      <Select
        className={classes.inputSelect}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        disabled={totalData.length == 0}
        value={fieldValue}
        label="Field"
        required
        error={showError}
        variant="outlined">
        {totalData.map((a, index) => {
          if (index == 0) {
            return Object.entries(a.muiData).map(([key, value], i) => {
              let dispalyFields = a['dispalyFields']
              if (dispalyFields?.includes(key) && value?.searchable) {
                return (
                  <MenuItem value={key} key={i.toString()} onClick={() => selectClick(key as string)}>
                    {t(key)}
                  </MenuItem>
                )
              }
            })
          }
        })}
      </Select>
      {showError && <FormHelperText error id="accountId-error">
        {t('required', { ns: 'common' })}
      </FormHelperText>}
    </FormControl>
  )
})

SearchSelect.defaultProps = {}

SearchSelect.propTypes = {}

export default SearchSelect;