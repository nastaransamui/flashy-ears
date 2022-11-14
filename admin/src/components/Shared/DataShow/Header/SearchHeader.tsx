import { FC, Fragment, useState } from "react";
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'

import SearchSelect from "@/shared/Inputs/SearchSelect";
import SearchAutoComplete from "@/shared/Inputs/SearchAutoComplete";

export interface SearchHeaderTypes { }

const SearchHeader: FC<SearchHeaderTypes> = (props: SearchHeaderTypes) => {
  return (
    <Fragment>
      <Divider orientation="vertical" />
      <Grid container rowSpacing={1} >
        <Grid item xl={3} lg={4} md={6} sm={6} xs={12} >
          <SearchSelect />
        </Grid>
        <Grid item xl={9} lg={8} md={6} sm={6} xs={12}>
          <SearchAutoComplete />
        </Grid>

      </Grid>
    </Fragment>
  )
}

export default SearchHeader