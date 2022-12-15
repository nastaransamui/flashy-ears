import PropTypes from 'prop-types';
import { FC, Fragment, } from "react";

import AddIcon from '@mui/icons-material/Add'
import GetApp from '@mui/icons-material/GetApp'
import SortIcon from '@mui/icons-material/Sort';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import PerPageIcon from "./Icons/PerPageIcon";
import IconButton from '@mui/material/IconButton'

import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useSpreadCrud from "@/src/components/Hooks/useCurrentRouteState";
import PerRowIcon from './Icons/PerRowIcon';
import SortByIcon from './Icons/SortByIcon';



export interface IconsHeaderTypes {

}

const IconsHeader: FC<IconsHeaderTypes> = ((props: IconsHeaderTypes) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const currentRouteState = useSpreadCrud();




  return (
    <Fragment>
      <IconButton disabled={!currentRouteState.create} onClick={() => {
        navigate(`/${currentRouteState.path}/${currentRouteState?.modelName?.slice(0, -1)}`)
      }}>
        <AddIcon fontSize='small' sx={{ fill: theme.palette.mode == 'dark' ? 'white' : 'black' }} />
      </IconButton>
      <IconButton>
        <GetApp fontSize='small' sx={{ fill: theme.palette.mode == 'dark' ? 'white' : 'black' }} />
      </IconButton>
      <SortByIcon />
      <PerRowIcon />
      <PerPageIcon />
    </Fragment>
  )
})

IconsHeader.propTypes = {

}
export default IconsHeader