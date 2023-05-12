import { FC, useContext } from "react";

//Mui Components
import { useTheme } from '@mui/material';
import MuiCardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Edit from "@mui/icons-material/Edit";
import ToggleOff from "@mui/icons-material/ToggleOff";
import ToggleOn from "@mui/icons-material/ToggleOn";
import Delete from "@mui/icons-material/Delete";

//Hooks
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import useCurrentRouteState from '@/hookes/useCurrentRouteState';
import { useTranslation } from 'react-i18next';
import { DataShowCtx } from "@/shared/DataShow/useDataShow";

//Components
import MultipleExpand from '@/shared/StyledComponents/MultipleExpand';

//Types
import { State, MainCardTypes } from '@/src/redux/store'
export interface CardActionsType {
  fieldObject: MainCardTypes;
  index: number;
}

const CardActions: FC<CardActionsType> = (({ fieldObject, index }) => {
  const currentRouteState = useCurrentRouteState();
  const { modelName, predefineDb, activeOnly } = currentRouteState;
  const { singleDeleteClicked, singleStatusClicked } = useContext(DataShowCtx)
  const { profile } = useSelector<State, State>(state => state)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation(modelName);

  const isDisabled = (a: any) => {
    switch (modelName) {
      case 'Users':
        return profile._id == a._id;

      default:
        return a?.isActive;
    }
  }

  return (
    <MuiCardActions disableSpacing sx={{ padding: 0, }}>
      <IconButton aria-label="edit" onClick={() => {
        dispatch({
          type: 'FIRST_SEARCH',
          firstSearch: false
        })
        dispatch({
          type: 'DELETE_IDS',
          payload: []
        })
        navigate(`/${currentRouteState.path}/${currentRouteState?.modelName?.slice(0, -1)}?_id=${fieldObject._id}`, {
          state: fieldObject,
        })
      }}>
        <Tooltip title={t('editTooltip', { ns: 'common' })} placement='bottom'
          arrow>
          <Edit style={{ color: theme.palette.primary.main }} />
        </Tooltip>
      </IconButton>

      {predefineDb ? isDisabled(fieldObject) ?
        <IconButton aria-label="toggleOff" onClick={() => {
          singleStatusClicked(fieldObject._id, 'diactivate')
        }}>
          <Tooltip
            title={t('ToggleOff', { ns: 'common' })}
            placement='bottom'
            arrow>
            <ToggleOff
              style={{ color: !activeOnly && isDisabled(fieldObject) ? theme.palette.action.disabled : theme.palette.error.main }}
            />
          </Tooltip>
        </IconButton> :
        <IconButton aria-label="ToggleOn" onClick={() => {
          singleStatusClicked(fieldObject._id, 'active')
        }}>
          <Tooltip
            title={t('ToggleOn', { ns: 'common' })}
            placement='bottom'
            arrow>
            <ToggleOn style={{ color: isDisabled(fieldObject) ? theme.palette.action.disabled : theme.palette.success.main }} />
          </Tooltip>
        </IconButton> :
        <IconButton aria-label="Delete" disabled={isDisabled(fieldObject)} onClick={() => {
          singleDeleteClicked(fieldObject._id)
        }}>
          <Tooltip title={t('Delete', { ns: 'common' })} placement='bottom'
            arrow>
            <Delete
              style={{
                color: isDisabled(fieldObject)
                  ? theme.palette.action.disabled : theme.palette.error.main
              }} />
          </Tooltip>
        </IconButton>
      }
      <MultipleExpand index={index} />
    </MuiCardActions>
  )
})

export default CardActions