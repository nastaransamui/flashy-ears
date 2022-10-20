import PropTypes from 'prop-types';
import { FC, Fragment, useState, MouseEvent, useContext, useEffect, useMemo } from 'react';
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
import useCurrentRouteState from '@/hookes/useCurrentRouteState'
import { useReadLocalStorage } from 'usehooks-ts'
import { DataShowCtx } from '../../useDataShow';
import CustomPopover from '@/shared/CustomPopover';
import Sort from '@mui/icons-material/Sort';
import ArrowRight from '@mui/icons-material/ArrowRight'
import ArrowLeft from '@mui/icons-material/ArrowLeft'
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import Home from '@mui/icons-material/Home'
import Popover from '@mui/material/Popover'


import { makeStyles } from 'tss-react/mui';
import useIconMap from '@/src/components/Hooks/useIconMap';

const sortStyle = makeStyles<{}>()((theme) => {

  return {
    listItemHover: {
      background: '',
      '&:hover, &:focus': {
        background: 'unset',

        '& svg:last-of-type': {
          left: theme.direction == 'rtl' ? 'auto' : -10,
          opacity: 1,
        },
      },
    },
    listItemActive: {
      background: theme.palette.action.hover,
      '& #right': {
        left: 10,
        position: 'absolute',
        opacity: 1,
      },
      '& #left': {
        position: 'absolute',
        right: 10,
        opacity: 1
      }
    },


    listItemHoverSmallArrowLeft: {
      position: 'absolute',
      left: -10,
      opacity: 0,
    },
    listItemHoverSmallArrowRight: {
      position: 'absolute',
      left: 10,
      opacity: 0,
    },
  }
})

export interface SortByIconType { }

interface AnchorType {
  0: null | HTMLButtonElement;
  field: string;
}

const SortByIcon: FC<SortByIconType> = (props: SortByIconType) => {
  const { classes, theme, cx } = sortStyle({})
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'sort-by-popover' : undefined;
  const currentRouteState = useCurrentRouteState();
  const { modelName, predefineDb } = currentRouteState;
  const { t, i18n } = useTranslation(modelName)
  const { totalData } = useSelector<State, State>(state => state)
  const [anchorSTl, setAnchorSTl] = useState<AnchorType>({
    0: null,
    field: ''
  });
  const rtlActive = i18n.language == 'fa'
  const sortByField = useReadLocalStorage(`${modelName}_sortByField`)
  const sortDirection = useReadLocalStorage(`${modelName}_sortDirection`)
  const { setSortByField, setSortDirection } = useContext(DataShowCtx);
  const dispatch = useDispatch();
  useEffect(() => {
    let isMount = true
    if (isMount) {
      setSortByField(() => sortByField == null ? predefineDb ? 'name' : 'createdAt' : sortByField)
      setSortDirection(() => sortDirection == null ? predefineDb ? 1 : -1 : sortDirection)
    }
    return () => {
      isMount = false;
    }
  }, [sortByField, sortDirection])

  const iconMap = useIconMap();


  return (
    <Fragment>
      <Tooltip title={t('sortBy', { ns: 'common' })} arrow placement='bottom'>
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(e.currentTarget);
          }}>
          <Sort fontSize='small' />
        </IconButton>
      </Tooltip>
      <CustomPopover id={id} setAnchor={setAnchorEl} open={open} anchor={anchorEl} >
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          dense
          disablePadding
          component='nav'
          aria-label='Rows-menu'>
          {
            totalData.map((a, index) => {
              if (index == 0) {
                return Object.entries(a)
                  .filter((b) => a['dispalyFields'].includes(b[0]))
                  .map(([key, value], i) => {
                    let dispalyFields = a['dispalyFields']
                    if (dispalyFields?.includes(key)) {
                      let muiData = a['muiData'][key as keyof typeof a['muiData']]
                      let icon = muiData?.['icon' as keyof typeof muiData]
                      const DynamicIcon = iconMap[icon as unknown as keyof typeof iconMap];
                      return (
                        <Fragment key={(key + value.toString())}>
                          <ListItem
                            disablePadding
                            className={classes.listItemHover + ' ' + cx({
                              [classes.listItemActive]: key == sortByField
                            })}
                            onClick={() => { }}>
                            <ListItemButton
                              onClick={(e) => {
                                setAnchorSTl((prev) => ({
                                  0: e.currentTarget as unknown as HTMLButtonElement,
                                  field: key as string,
                                }));
                              }}>
                              <ListItemIcon >
                                <Tooltip title={t('filterType', { ns: 'common' })}>
                                  <IconButton
                                    size='large'
                                    disableFocusRipple
                                    disableRipple>
                                    {rtlActive ? (
                                      <ArrowRight
                                        id="right"
                                        className={
                                          classes.listItemHoverSmallArrowRight
                                        }
                                      />
                                    ) : (
                                      <ArrowLeft
                                        id="left"
                                        className={
                                          classes.listItemHoverSmallArrowLeft
                                        }
                                      />
                                    )}
                                  </IconButton>
                                </Tooltip>
                                <DynamicIcon style={{
                                  color:
                                    theme.palette[
                                      `${i % 2 == 0 ? 'primary' : 'secondary'
                                      }`
                                    ].main,
                                }} />
                              </ListItemIcon>
                              <ListItemText primary={t(key)} />
                            </ListItemButton>
                          </ListItem>
                          <Divider />
                        </Fragment>
                      )
                    }
                  })
              }
            })
          }
        </List>
      </CustomPopover>
      {
        anchorSTl[0] !== null && (
          <Popover
            elevation={18}
            id={id}
            open={open}
            anchorEl={anchorSTl[0]}
            onClose={(e) => {
              setAnchorSTl((prev) => ({
                0: null,
                field: ''
              }));
            }}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 52,
              horizontal: rtlActive ? -205 : 220,
            }}>
            <List
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 2,
                p: 0,
                minWidth: 220,
                maxWidth: 220,
                overflow: 'visible',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 60,
                  right: rtlActive ? 214 : -4,
                  width: 10,
                  height: 10,
                  bgcolor: theme.palette.primary.main,
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              }}
              dense
              disablePadding
              component='nav'
              aria-label='menu'>
              {[-1, 1].map((list, index) => {
                return (
                  <Fragment key={index}>
                    <ListItem
                      disablePadding
                      disableGutters={true}
                      dense
                      onClick={() => {
                        setSortByField(() => anchorSTl['field'])
                        setSortDirection(() => list)
                        setAnchorSTl({
                          0: null,
                          field: ''
                        });
                        dispatch({
                          type: 'DELETE_IDS',
                          payload: []
                        })
                      }}>
                      <ListItemButton>
                        <ListItemIcon>
                          {
                            sortByField == anchorSTl[`field`] &&
                              sortDirection == list ? (
                              <Check color="primary" />
                            ) : null
                          }
                        </ListItemIcon>
                        <ListItemText
                          primary={t(anchorSTl['field'])}
                          secondary={t(`${list}`, { ns: 'common' })} />
                      </ListItemButton>
                    </ListItem>
                    {index !== 1 && <Divider />}
                  </Fragment>
                )
              })}
            </List>
          </Popover>
        )
      }
    </Fragment>
  )
}

SortByIcon.propTypes = {}

export default SortByIcon