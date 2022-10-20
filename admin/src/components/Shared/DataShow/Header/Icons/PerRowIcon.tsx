import PropTypes from 'prop-types';
import { FC, Fragment, useState, MouseEvent, useContext, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/material";
import useCurrentRouteState from '@/hookes/useCurrentRouteState'
import { useReadLocalStorage } from 'usehooks-ts'
import { DataShowCtx } from '../../useDataShow';
import CustomPopover from '@/shared/CustomPopover';

import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import useMediaQuery from '@mui/material/useMediaQuery';

export interface PerRowIconType { }

const PerRowIcon: FC<PerRowIconType> = (props: PerRowIconType) => {
  const { t } = useTranslation();
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'perpage-popover' : undefined;
  const currentRouteState = useCurrentRouteState();
  const { modelName } = currentRouteState;
  const gridView = useReadLocalStorage(`${modelName}_gridView`)
  const cardView: boolean = useReadLocalStorage(`${modelName}_cardView`)!
  const { setGridView } = useContext(DataShowCtx);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true })
  const isTablet = useMediaQuery(theme.breakpoints.only('md'), { noSsr: true })

  useEffect(() => {
    let isMount = true;
    if (isMount) {

      isMobile ? setGridView(() => 12) : setGridView(() => 4)
    }
    return () => {
      isMount = false;
    }
  }, [isMobile])

  useEffect(() => {
    let isMount = true;
    if (isMount) {

      isTablet ? setGridView(() => 6) : setGridView(() => 4)
    }
    return () => {
      isMount = false;
    }
  }, [isTablet])


  const gridNumberFunc = (list: 2 | 3 | 4 | 6 | 12) => {
    setGridView(() => list)
  }

  useEffect(() => {
    let isMount = true
    if (isMount) {
      setGridView(() => gridView == null ? 3 : gridView)
    }
    return () => {
      isMount = false;
    }
  }, [cardView])


  return (
    <Fragment >
      {
        cardView && (
          <>
            <Tooltip title={t('perRow', { ns: 'common' })} arrow placement='bottom'>
              <IconButton
                disableFocusRipple
                disableRipple
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  setAnchorEl(e.currentTarget);
                }}>
                <ViewColumnIcon fontSize='small' sx={{ fill: theme.palette.mode == 'dark' ? 'white' : 'black' }} />
              </IconButton>
            </Tooltip>
            <CustomPopover id={id} setAnchor={setAnchorEl} open={open} anchor={anchorEl} >
              <List
                // className={classes.IconsList}
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                dense
                disablePadding
                component='nav'
                aria-label='Rows-menu'>
                {[2, 3, 4, 6, 12].map((list, index) => {
                  return (
                    <Fragment key={index}>
                      <ListItem
                        disablePadding
                        onClick={() => {
                          gridNumberFunc(list as 2 | 3 | 4 | 6 | 12)
                          setAnchorEl(null);
                        }}>
                        <ListItemButton>
                          <ListItemIcon>
                            {list == gridView && <Check color='primary' />}
                          </ListItemIcon>
                          <ListItemText
                            primary={t(`${list}_row`)}
                            secondary={`${t('result', { ns: 'common' })}`}
                          />
                        </ListItemButton>
                      </ListItem>
                      {index !== 4 && <Divider />}
                    </Fragment>
                  );
                })}
              </List>
            </CustomPopover>
          </>
        )
      }
    </Fragment>
  )
}
PerRowIcon.propTypes = {

};

export default PerRowIcon;