import Grid, { GridSize } from '@mui/material/Grid'
import { FC, useEffect, useState, createRef, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { State, MuiDataType } from '@/src/redux/store';
import useCurrentRouteState from '@/hookes/useCurrentRouteState'
import { useReadLocalStorage } from 'usehooks-ts'
import SvgIcon from '@mui/material/SvgIcon';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import Close from '@mui/icons-material/Close';
import useIconMap from '@/src/components/Hooks/useIconMap';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Container from '@mui/material/Container'
import ToggleOff from '@mui/icons-material/ToggleOff'
import ToggleOn from '@mui/icons-material/ToggleOn'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Typography from '@mui/material/Typography';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { PhoneTooltip } from '@/shared/DataShow/Table/MainTable'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Player } from 'video-react';
import YouTube from 'react-youtube';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import StarBorder from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
export interface MainCardTypes {
  videoLink?: string;
  isYoutube?: boolean;
  youTubeId?: string;
  _id: string;
  dispalyFields: string[];
  isActive?: boolean;
  muiData: MuiDataType;
  imageShow?: string;
  iso2?: string;
  profileImage?: string;
  createdAt: Date;
  [key: string]: any
}

type InputProps = {
  dispay: string
}
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const StyledBox = styled(Container)<InputProps>(({ theme, dispay }) => ({
  border: '2px solid ',
  marginTop: -10,
  borderColor: theme.palette.secondary.main,
  borderRadius: 5,
  marginBottom: 5,
  minWidth: '100%',
  [theme.breakpoints.only('lg')]: {
    minHeight: 30,
  },
  [theme.breakpoints.only('md')]: {
    minHeight: 30,
  },
  display: dispay,
}));

const MainCard: FC = (() => {

  const currentRouteState = useCurrentRouteState();
  const { modelName, predefineDb, activeOnly } = currentRouteState;
  const { t, i18n } = useTranslation(modelName)
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const { totalData, deleteIds, profile, statusIdsUpdate, totalCount } = useSelector<State, State>(state => state)
  const gridView: GridSize = useReadLocalStorage(`${modelName}_gridView`)!
  const perPage: number = useReadLocalStorage(`${modelName}_perPage`)!
  const iconMap = useIconMap()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleExpandClick = (index: number) => {
    setExpanded(() => ({
      [`${index}`]: !expanded[index],
    }));
  };
  const awayClicked = (index: number, expanded: object) => {
    if (expanded[index as keyof typeof expanded]) {
      setExpanded(() => ({
        [`${index}`]: !expanded[index as keyof typeof expanded],
      }));
    }
  };
  const theme = useTheme()

  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    // add  refs
    setElRefs((elRefs) =>
      Array(perPage)
        .fill(0)
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [perPage]);


  const setCardStyle = (index: number, expanded: { [key: string]: boolean }) => {
    return {
      // height: '80%',
      opacity:
        Object.keys(expanded).length === 0 &&
          Object.keys(expanded)[0] == undefined
          ? 1
          : expanded[index as keyof typeof expanded] == true
            ? 1
            : Object.values(expanded)[0] == undefined ||
              !Object.values(expanded)[0]
              ? 1
              : 0.2,
    };
  };

  const isDisabled = (a: any) => {
    switch (modelName) {
      case 'Users':
        return profile._id == a._id;

      default:
        return a?.isActive;
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


  const setBoxStyle = (index: number, expanded: { [key: string]: boolean }) => {
    return {
      bgcolor: theme.palette.background.paper,
      borderRadius: `12px 12px 12px 12px`,
      pb: expanded[index] ? 2 : 0,
      position: 'absolute',
      //@ts-ignore
      width: elRefs[index]?.current?.offsetWidth,
      zIndex: expanded[index] ? 4 : 1,
    };
  };

  return (
    <Fragment>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <StyledBox
          dispay={deleteIds.length !== 0 || statusIdsUpdate.length !== 0 ? 'flex' : 'none'}
          disableGutters
          maxWidth='xl'
          className='animate__animated animate__zoomIn'>
          {
            deleteIds.length !== 0 || statusIdsUpdate.length !== 0 ?
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
                          // deleteIconClicked(deleteIds);
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
                            // deleteIconClicked(deleteIds);
                          }}>
                          <ToggleOn style={{ color: theme.palette.success.main }} />
                        </IconButton>
                      </Tooltip>
                    : <Tooltip title={t('Delete')} arrow>
                      <IconButton
                        disableRipple
                        onClick={() => {
                          // deleteIconClicked(deleteIds);
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
              </Fragment> : null
          }
        </StyledBox>
        {totalData.map((a: MainCardTypes, index) => {
          var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: "2-digit", minute: "2-digit" } as const;
          return (
            <Grid
              item
              xs={gridView}
              sm={gridView}
              md={gridView}
              lg={gridView}
              xl={gridView}
              key={index}>
              <Fragment key={a._id}>
                <Card ref={elRefs[index]} style={setCardStyle(index, expanded)}>
                  <CardHeader
                    avatar={
                      Object.entries(a.muiData).map(([key, value], i) => {
                        let media = value?.['thumbnail' as keyof typeof value]
                        const DynamicIcon = iconMap[value?.icon as unknown as keyof typeof iconMap];
                        switch (media) {
                          case 'icon' as any:
                            return (
                              <Avatar sx={{ bgcolor: theme.palette.primary.main }} key={i} >
                                <DynamicIcon color='secondary' />
                              </Avatar>
                            )
                          case 'videoLink' as any:
                            if (!a.isYoutube) {
                              return (
                                <Avatar key={i} >
                                  <Player
                                    autoPlay
                                    aspectRatio='auto'
                                    fluid={false}
                                    preload='auto'
                                    muted
                                    src={a?.['videoLink' as string as keyof typeof a['videoLink']]}
                                  />
                                </Avatar>
                              )
                            } else {
                              return null
                            }
                          case 'youTubeId' as any:
                            if (a.isYoutube) {
                              return (
                                <Avatar key={i} >
                                  <YouTube
                                    videoId={a?.['youTubeId' as string as keyof typeof a['youTubeId']]}
                                    opts={{ playerVars: { autoplay: 1 } }}
                                  />
                                </Avatar>
                              )
                            } else {
                              return null
                            }
                          case 'profileImage' as any:
                          case 'logoImage' as any:
                          case 'imageShow' as any:
                            return (
                              <Avatar key={i} >
                                <img
                                  alt=''
                                  src={a?.[media]}
                                />
                              </Avatar>
                            )
                          case 'iso2' as any:
                            return (
                              <Avatar key={i} >
                                <img
                                  alt=''
                                  src={`/admin/flags/128x128/${a?.['iso2' as string as keyof typeof a['iso2']]}.png`}
                                />
                              </Avatar>
                            )
                        }
                      })
                    }
                    action={
                      <FormControlLabel
                        label=''
                        control={
                          <Tooltip title={
                            predefineDb ?
                              a.isActive ? t('ToggleOff', { ns: 'common' })
                                : t('ToggleOn', { ns: 'common' }) :
                              t('deleteTooltip', { ns: 'common' })}>
                            <Checkbox
                              disabled={!activeOnly && isDisabled(a)}
                              checked={deleteIds.findIndex((b) => b == a._id) !== -1 || statusIdsUpdate.findIndex((b) => b == a._id) !== -1}
                              onChange={() => {
                                switch (predefineDb) {
                                  case true:
                                    if (deleteIds.findIndex((b) => b == a._id) == -1) {
                                      dispatch({
                                        type: 'STATUS_IDS_UPDATE',
                                        payload: [...statusIdsUpdate, a._id]
                                      })
                                    } else {
                                      dispatch({
                                        type: 'STATUS_IDS_UPDATE',
                                        payload: [...statusIdsUpdate.filter((b) => b !== a._id)]
                                      })
                                    }
                                    break;

                                  default:
                                    if (deleteIds.findIndex((b) => b == a._id) == -1) {
                                      dispatch({
                                        type: 'DELETE_IDS',
                                        payload: [...deleteIds, a._id]
                                      })
                                    } else {
                                      dispatch({
                                        type: 'DELETE_IDS',
                                        payload: [...deleteIds.filter((b) => b !== a._id)]
                                      })
                                    }
                                    break;
                                }
                              }} /></Tooltip>} />
                    }
                    title={<Tooltip title={a[a.dispalyFields[0]]} arrow>
                      <span>{a[a.dispalyFields[0]].length <= 21 ? a[a.dispalyFields[0]] : a[a.dispalyFields[0]].slice(0, 21) + '...'}</span>
                    </Tooltip>}
                    subheader={new Date(a.createdAt).toLocaleDateString("en-GB", options)}
                  />
                  <CardContent >

                    <CardActions disableSpacing sx={{ padding: 0 }}>
                      <IconButton aria-label="add to favorites" onClick={() => {
                        dispatch({
                          type: 'FIRST_SEARCH',
                          firstSearch: false
                        })
                        navigate(`/${currentRouteState.path}/${currentRouteState?.modelName?.slice(0, -1)}?_id=${a._id}`, {
                          state: a,
                        })
                      }}>
                        <Tooltip title={t('editTooltip', { ns: 'common' })} placement='bottom'
                          arrow>
                          <Edit style={{ color: theme.palette.primary.main }} />
                        </Tooltip>
                      </IconButton>
                      <IconButton aria-label="share">
                        {predefineDb ? isDisabled(a) ?
                          <Tooltip
                            title={t('ToggleOff', { ns: 'common' })}
                            placement='bottom'
                            arrow>
                            <ToggleOff
                              style={{ color: !activeOnly && isDisabled(a) ? theme.palette.action.disabled : theme.palette.error.main }}
                            />
                          </Tooltip> :
                          <Tooltip
                            title={t('ToggleOn', { ns: 'common' })}
                            placement='bottom'
                            arrow>
                            <ToggleOn style={{ color: isDisabled(a) ? theme.palette.action.disabled : theme.palette.success.main }} />
                          </Tooltip> :
                          <Tooltip title={t('Delete', { ns: 'common' })} placement='bottom'
                            arrow>
                            <Delete style={{ color: isDisabled(a) ? theme.palette.action.disabled : theme.palette.error.main }} />
                          </Tooltip>
                        }
                      </IconButton>
                      <ExpandMore
                        expand={expanded[index]}
                        onClick={() => handleExpandClick(index)}
                        aria-expanded={expanded[index]}
                        aria-label="show more"
                      >
                        <Tooltip
                          title={expanded[index] ? '' : t('expand')}
                          placement='top'
                          arrow>
                          <ExpandMoreIcon />
                        </Tooltip>
                      </ExpandMore>
                    </CardActions>
                  </CardContent>
                  <Collapse in={expanded[index]} timeout="auto" unmountOnExit >
                    <ClickAwayListener
                      onClickAway={() => awayClicked(index, expanded)}>

                      <Box sx={setBoxStyle(index, expanded)}>
                        <List
                          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                          disablePadding
                          subheader={
                            <ListSubheader component="div" id="nested-list-subheader" sx={{ marginTop: 1 }}>
                              {a[a.dispalyFields[0]]}
                            </ListSubheader>
                          }
                        >
                          {
                            Object.entries(a).map(([key, value], i) => {
                              let dispalyFields = a['dispalyFields']
                              if (dispalyFields?.includes(key)) {
                                let muiData = a['muiData'][key as keyof typeof a['muiData']]
                                let icon = muiData?.['icon' as keyof typeof muiData]
                                const DynamicIcon = iconMap[icon as unknown as keyof typeof iconMap];
                                let primaryValue;
                                switch (true) {
                                  case typeof value == 'boolean':
                                    primaryValue = value ? <CheckBoxIcon color='primary' /> :
                                      <CheckBoxOutlineBlank color='secondary' />
                                    break;
                                  case key == "createdAt":
                                  case key == "updatedAt":
                                    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: "2-digit", minute: "2-digit" } as const;
                                    primaryValue = new Date(value).toLocaleDateString("en-GB", options)
                                    break;
                                  default:
                                    switch (true) {
                                      case Array.isArray(value):
                                        if (value.length == 0) primaryValue = 'length 0'
                                        primaryValue = key !== 'phones' ?
                                          value.length :
                                          <PhoneTooltip value={value} modelName={modelName!} />
                                        break;
                                      default:
                                        switch (true) {
                                          case value == '':
                                            primaryValue = <Close style={{ color: theme.palette.error.main }} />
                                            break;
                                          case value.length == 0:
                                            primaryValue = <Close style={{ color: theme.palette.error.main }} />
                                          default:
                                          case value.length > 70:
                                            primaryValue = <Tooltip title={value} TransitionComponent={Zoom} placement='top' arrow>
                                              <span>{value.length >= 30 ? value.slice(0, 30) + '...' : value.toString()}</span>
                                            </Tooltip>
                                            break;
                                        }
                                        break;
                                    }
                                    break;
                                }
                                return (
                                  <ListItemButton key={key} disableTouchRipple sx={{ borderTop: `1px solid ${theme.palette.primary.main}` }}>
                                    <ListItemIcon >
                                      <DynamicIcon style={{
                                        color:
                                          theme.palette[
                                            `${i % 2 == 0 ? 'primary' : 'secondary'
                                            }`
                                          ].main,
                                      }} />
                                    </ListItemIcon>
                                    <ListItemText sx={{ marginTop: 0, marginBottom: 0 }} primary={primaryValue} secondary={t(key)} />
                                  </ListItemButton>
                                )
                              }
                              // }
                            })
                          }

                        </List>
                      </Box>
                    </ClickAwayListener>
                  </Collapse>
                </Card>
              </Fragment>
            </Grid>
          )
        })}
      </Grid>
    </Fragment >
  )
});


export default MainCard