import { FC, Fragment } from "react";
import dataShowStyle from "../data-show-style";

import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

import { useTranslation } from 'react-i18next';

export interface SearchHeaderTypes { }

const SearchHeader: FC<SearchHeaderTypes> = (props: SearchHeaderTypes) => {
  const { classes } = dataShowStyle({})
  const { t } = useTranslation()
  return (
    <Fragment>
      <Divider orientation="vertical" />
      <Grid container rowSpacing={1}>
        <Grid item xl={3} lg={4} md={6} sm={6} xs={12}>
          <FormControl size='small' className={classes.searchSelect}>
            <InputLabel className={classes.selectLabel} id="demo-simple-select-label">{t('Field', { ns: 'common' })}</InputLabel>
            <Select
              className={classes.inputSelect}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={10}
              label="Age"
              variant="outlined"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xl={9} lg={8} md={6} sm={6} xs={12}>
          <FormControl size='small' className={classes.searchSelect}>
            <TextField className={classes.input} id="standard-basic" label={t('labelSearch', { ns: 'common' })} variant="outlined" size='small' />
          </FormControl>
        </Grid>

      </Grid>
    </Fragment>
  )
}

export default SearchHeader