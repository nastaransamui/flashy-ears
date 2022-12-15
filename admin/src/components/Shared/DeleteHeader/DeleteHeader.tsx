import { FC, Fragment, useContext } from "react";

//Mui Components
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

//Mui Icons
import ToggleOff from '@mui/icons-material/ToggleOff'
import ToggleOn from '@mui/icons-material/ToggleOn'
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material';

//Redux
import { useDispatch, useSelector } from "react-redux";
import { State } from '@/src/redux/store';

//Hooks
import useCurrentRouteState from '@/hookes/useCurrentRouteState';
import { useTranslation } from 'react-i18next';
import { DataShowCtx } from "@/shared/DataShow/useDataShow";

const DeleteHeader: FC = (() => {

  const theme = useTheme()
  const { profile, totalData, deleteIds, statusIdsUpdate, } = useSelector<State, State>(state => state);
  const dispatch = useDispatch();
  const currentRouteState = useCurrentRouteState();
  const { modelName, predefineDb, activeOnly } = currentRouteState;
  const { t } = useTranslation('common');
  const { multipleDeleteClicked, multipleStatusClicked } = useContext(DataShowCtx)
  const preventStatusChange = () => {
    switch (activeOnly) {
      case true:
        return totalData.filter((b) => b.isActive).map((a) => a._id).length !== statusIdsUpdate.length

      default:
        return totalData.filter((b) => !b.isActive).map((a) => a._id).length !== statusIdsUpdate.length
    }
  }

  const arrayStatus = () => {
    switch (activeOnly) {
      case true:
        return totalData.filter((b) => b.isActive).map((a) => a._id).filter((b) => !statusIdsUpdate.includes(b))

      default:
        return totalData.filter((b) => !b.isActive).map((a) => a._id).filter((b) => !statusIdsUpdate.includes(b))
    }
  }

  const arrayDelete = () => {
    switch (modelName) {
      case 'Users':
        return totalData.map((a) => a._id).filter((b) => b !== profile._id).filter((b) => !deleteIds.includes(b))

      default:
        return totalData.filter((b) => !b.isActive).map((a) => a._id).filter((b) => !deleteIds.includes(b))
    }
  }

  const preventDeletationOnActive = () => {
    switch (modelName) {
      case 'Users':
        return totalData.map((a) => a._id).filter((b) => b !== profile._id).length !== deleteIds.length
      default:
        return totalData.filter((b) => !b.isActive).map((a) => a._id).length !== deleteIds.length
    }
  }

  return (
    <Fragment>
      <Typography
        sx={{ flex: '1 1 70%', mr: theme.direction == 'rtl' ? 2 : 0, ml: theme.direction == 'rtl' ? 0 : 2, mt: 1 }}
        color='inherit'
        variant='subtitle1'
        component='div'>
        {deleteIds.length || statusIdsUpdate.length} {t('selected')}
      </Typography>
      {
        predefineDb ?
          activeOnly ? <Tooltip
            title={t('ToggleOff', { ns: 'common' })}
            placement='bottom'
            arrow>
            <IconButton
              disableRipple
              onClick={() => {
                multipleStatusClicked('diactivate')
              }}>
              <ToggleOff
                style={{ color: theme.palette.error.main }}
              />
            </IconButton>
          </Tooltip> :
            <Tooltip
              title={t('ToggleOn', { ns: 'common' })}
              placement='bottom'
              arrow>
              <IconButton
                disableRipple
                onClick={() => {
                  multipleStatusClicked('active')
                }}>
                <ToggleOn style={{ color: theme.palette.success.main }} />
              </IconButton>
            </Tooltip>
          : <Tooltip title={t('Delete')} arrow>
            <IconButton
              disableRipple
              onClick={() => {
                multipleDeleteClicked();
              }}>
              <DeleteIcon style={{ color: theme.palette.secondary.main }} />
            </IconButton>
          </Tooltip>
      }
      <FormControlLabel control={
        <Checkbox
          onChange={() => {
            switch (predefineDb) {
              case true:
                if (preventStatusChange()) {
                  dispatch({
                    type: 'STATUS_IDS_UPDATE',
                    payload: [...statusIdsUpdate, ...arrayStatus() as string[]]
                  })
                } else {

                  dispatch({
                    type: 'STATUS_IDS_UPDATE',
                    payload: []
                  })
                }
                break;

              default:
                if (preventDeletationOnActive()) {
                  dispatch({
                    type: 'DELETE_IDS',
                    payload: [...deleteIds, ...arrayDelete() as string[]]
                  })
                } else {

                  dispatch({
                    type: 'DELETE_IDS',
                    payload: []
                  })
                }
                break;
            }
          }} />} label={predefineDb ? preventStatusChange() ? t('selectAll', { ns: 'common' }) : t('diSelectAll', { ns: 'common' }) : preventDeletationOnActive() ? t('selectAll', { ns: 'common' }) : t('diSelectAll', { ns: 'common' })} />
    </Fragment>
  )
})



export default DeleteHeader