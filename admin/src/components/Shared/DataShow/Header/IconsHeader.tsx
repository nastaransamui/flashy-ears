import { FC, Fragment } from "react";

import Hidden from '@mui/material/Hidden';
import AddIcon from '@mui/icons-material/Add'
import GetApp from '@mui/icons-material/GetApp'
import SortIcon from '@mui/icons-material/Sort';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton'

import Divider from '@mui/material/Divider'
import { useTheme } from "@mui/material";

export interface IconsHeaderTypes { }

const IconsHeader: FC<IconsHeaderTypes> = ((props: IconsHeaderTypes) => {
  const theme = useTheme()
  return (
    <Fragment>
      <Hidden smDown implementation='css'>
        <Divider orientation="vertical" sx={{ fill: theme.palette.mode == 'dark' ? 'white' : 'black' }} />
      </Hidden>
      <IconButton>
        <AddIcon fontSize='small' sx={{ fill: theme.palette.mode == 'dark' ? 'white' : 'black' }} />
      </IconButton>
      <IconButton>
        <GetApp fontSize='small' sx={{ fill: theme.palette.mode == 'dark' ? 'white' : 'black' }} />
      </IconButton>
      <IconButton>
        <SortIcon fontSize='small' sx={{ fill: theme.palette.mode == 'dark' ? 'white' : 'black' }} />
      </IconButton>
      <IconButton>
        <ViewColumnIcon fontSize='small' sx={{ fill: theme.palette.mode == 'dark' ? 'white' : 'black' }} />
      </IconButton>
      <IconButton>
        <FilterListIcon fontSize='small' sx={{ fill: theme.palette.mode == 'dark' ? 'white' : 'black' }} />
      </IconButton>
    </Fragment>
  )
})

export default IconsHeader