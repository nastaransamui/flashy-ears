import PropTypes from 'prop-types';
import { FC, Fragment, useState, MouseEvent, useContext } from 'react';
import Tooltip from '@mui/material/Tooltip'
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useTheme } from "@mui/material";
import { useReadLocalStorage } from 'usehooks-ts'
import useCurrentRouteState from '@/hookes/useCurrentRouteState'
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import { DataShowCtx } from '../../useDataShow';
import CustomPopover from '@/shared/CustomPopover';

export interface PerPageIconType {
  // setPerPage: Function;
  // setPageNumber: Function;
}

const PerPageIcon: FC<PerPageIconType> = (props: PerPageIconType) => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const { totalCount } = useSelector<State, State>(state => state)
  const open = Boolean(anchor);
  const id = open ? 'perpage-popover' : undefined;
  const currentRouteState = useCurrentRouteState();
  const { modelName } = currentRouteState;
  const { setPerPage, setPageNumber } = useContext(DataShowCtx);
  const dispatch = useDispatch()

  const perPageArray = [6, 12, 24, 48, 96]

  const perPage: number = useReadLocalStorage(`${modelName}_perPage`)!
  const pageNumber: number = useReadLocalStorage(`${modelName}_pageNumber`)!

  const perPageFunc = (list: number) => {
    setPerPage(() => list)
    dispatch({
      type: 'DELETE_IDS',
      payload: []
    })

    if (Math.ceil(totalCount / list) < pageNumber) {
      setPageNumber(() => Math.ceil(totalCount / list))
    }
  }


  return (
    <Fragment>
      <Tooltip title={t('perPage', { ns: 'common' })} arrow placement='bottom'>
        <IconButton
          disableRipple
          disableFocusRipple
          disableTouchRipple
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            setAnchor(e.currentTarget);
          }}>
          <FilterListIcon fontSize='small' sx={{ fill: theme.palette.mode == 'dark' ? 'white' : 'black' }} />
        </IconButton>
      </Tooltip>
      <CustomPopover id={id} setAnchor={setAnchor} open={open} anchor={anchor} >
        <List
          // className={classes.IconsList}
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          dense
          disablePadding
          component='nav'
          aria-label='Page-menu'>
          {perPageArray.map((list, index) => {
            return (
              <Fragment key={index}>
                <ListItem
                  disablePadding
                  onClick={() => {
                    perPageFunc(list)
                    setAnchor(null);
                  }}>
                  <ListItemButton>
                    <ListItemIcon>
                      {list == perPage && <Check color='primary' />}
                    </ListItemIcon>
                    <ListItemText primary={t(`${list}`)} secondary={`${t('result')}`} />
                  </ListItemButton>
                </ListItem>
                {index !== 4 && <Divider />}
              </Fragment>
            );
          })}
        </List>
      </CustomPopover>
    </Fragment>
  )
}

PerPageIcon.propTypes = {
  // setPerPage: PropTypes.func.isRequired,
  // setPageNumber: PropTypes.func.isRequired
}

export default PerPageIcon