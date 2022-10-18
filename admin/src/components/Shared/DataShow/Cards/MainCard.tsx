import Grid, { GridSize } from '@mui/material/Grid'
import { FC, useEffect, useState, createRef, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
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

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
export interface MainCardTypes { }

type InputProps = {
  dispay: string
}

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

const MainCard: FC<MainCardTypes> = ((props: MainCardTypes) => {
  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    // add  refs
    setElRefs((elRefs) =>
      Array(10)
        .fill(0)
        .map((_, i) => elRefs[i] || createRef())
    );
  }, []);

  const currentRouteState = useCurrentRouteState();
  const { modelName } = currentRouteState;
  const { t, i18n } = useTranslation(modelName)
  const { totalData, deleteIds, profile } = useSelector<State, State>(state => state)
  const gridView: GridSize = useReadLocalStorage(`${modelName}_gridView`)!
  const iconMap = useIconMap()
  const dispatch = useDispatch()

  const theme = useTheme()


  // const setCardStyle = (index, expanded) => {
  //   return {
  //     // height: '80%',
  //     opacity:
  //       Object.keys(expanded).length === 0 &&
  //       Object.keys(expanded)[0] == undefined
  //         ? 1
  //         : expanded[index] == true
  //         ? 1
  //         : Object.values(expanded)[0] == undefined ||
  //           !Object.values(expanded)[0]
  //         ? 1
  //         : 0.2,
  //   };
  // };

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

  const arrayDelete = () => {
    switch (modelName) {
      case 'Users':
        return totalData.map((a) => a._id).filter((b) => b !== profile._id).filter((b) => !deleteIds.includes(b))

      default:
        return totalData.filter((b) => !b.isActive).map((a) => a._id).filter((b) => !deleteIds.includes(b))
    }
  }
  return (
    <Fragment>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <StyledBox
          dispay={deleteIds.length !== 0 ? 'flex' : 'none'}
          disableGutters
          maxWidth='xl'
          className='animate__animated animate__zoomIn'>
          {
            deleteIds.length !== 0 ?
              <Fragment>
                <Typography
                  sx={{ flex: '1 1 70%', mr: theme.direction == 'rtl' ? 2 : 0, ml: theme.direction == 'rtl' ? 0 : 2, mt: 1 }}
                  color='inherit'
                  variant='subtitle1'
                  component='div'>
                  {deleteIds.length} {t('selected')}
                </Typography>
                <Tooltip title={t('delete')} arrow>
                  <IconButton
                    disableRipple
                    onClick={() => {
                      // deleteIconClicked(deleteIds);
                    }}>
                    <DeleteIcon style={{ color: theme.palette.secondary.main }} />
                  </IconButton>
                </Tooltip>
                <FormControlLabel control={
                  <Checkbox
                    onChange={() => {
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
                    }} />} label={preventDeletationOnActive() ? t('selectAll', { ns: 'common' }) : t('diSelectAll', { ns: 'common' })} />
              </Fragment> : null
          }
        </StyledBox>
        {totalData.map((a, index) => {
          return (
            <Grid
              item
              xs={gridView}
              sm={gridView}
              md={gridView}
              lg={gridView}
              xl={gridView}
              key={index} style={{ border: '1px solid yellow' }}>
              <Fragment key={a._id}>
                <FormControlLabel control={<Checkbox
                  disabled={isDisabled(a)}
                  checked={deleteIds.findIndex((b) => b == a._id) !== -1} onChange={() => {
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
                  }} />} label={t('deleteTooltip', { ns: 'common' })} />
                {
                  Object.entries(a).map(([key, value], i) => {
                    let dispalyFields = a['dispalyFields']
                    if (dispalyFields?.includes(key)) {
                      let muiData = a['muiData'][key as keyof typeof a['muiData']]
                      let media = muiData['thumbnail' as keyof typeof muiData]
                      let icon = muiData['icon' as keyof typeof muiData]
                      const DynamicIcon = iconMap[icon as unknown as keyof typeof iconMap];

                      switch (true) {
                        case typeof value == 'boolean':

                          return (
                            <span key={(key + value.toString())} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                              <DynamicIcon style={{
                                color:
                                  theme.palette[
                                    `${i % 2 == 0 ? 'primary' : 'secondary'
                                    }`
                                  ].main,
                              }} />{t(key)} :
                              {value ? <CheckBoxIcon color='primary' /> :
                                <CheckBoxOutlineBlank color='secondary' />}
                            </span>
                          );

                        case key == "createdAt":
                          var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: "2-digit", minute: "2-digit" } as const;


                          return (
                            <span key={(key + value.toString())} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                              <DynamicIcon style={{
                                color:
                                  theme.palette[
                                    `${i % 2 == 0 ? 'primary' : 'secondary'
                                    }`
                                  ].main,
                              }} />{t(key)}: {new Date(value).toLocaleDateString("en-GB", options)}<br />
                            </span>
                          )

                        case key == "updatedAt":
                          var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: "2-digit", minute: "2-digit" } as const;

                          return (
                            <span key={(key + value.toString())} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                              <DynamicIcon style={{
                                color:
                                  theme.palette[
                                    `${i % 2 == 0 ? 'primary' : 'secondary'
                                    }`
                                  ].main,
                              }} />{t(key)}: {new Date(value).toLocaleDateString("en-GB", options)}<br />
                            </span>
                          )

                        default:
                          switch (true) {
                            case Array.isArray(value):
                              if (value.length == 0) return <div key={(key + value.toString())}> {t(key)} : length 0</div>

                              return (
                                <div key={(key + value.toString())} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                  <DynamicIcon style={{
                                    color:
                                      theme.palette[
                                        `${i % 2 == 0 ? 'primary' : 'secondary'
                                        }`
                                      ].main,
                                  }} />{t(key)}:{value.length}
                                </div>)

                            default:
                              switch (true) {
                                case value.length == 0:
                                  return (
                                    <div key={(key + value.toString())} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                      <DynamicIcon style={{
                                        color:
                                          theme.palette[
                                            `${i % 2 == 0 ? 'primary' : 'secondary'
                                            }`
                                          ].main,
                                      }} />{t(key)} :<Close style={{ color: theme.palette.error.main }} />
                                    </div>
                                  )
                                case value.length > 70:
                                  return (
                                    <div key={(key + value.toString())} >
                                      <Tooltip title={value} TransitionComponent={Zoom} placement='top' arrow>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                          <DynamicIcon style={{
                                            color:
                                              theme.palette[
                                                `${i % 2 == 0 ? 'primary' : 'secondary'
                                                }`
                                              ].main,
                                          }} />{t(key)} :{value.slice(0, 30) + '...'}</div>
                                      </Tooltip>
                                    </div>
                                  )
                                default:

                                  switch (media) {
                                    case 'icon' as any:
                                      return (
                                        <div key={(key + value.toString())} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                          <DynamicIcon style={{
                                            color:
                                              theme.palette[
                                                `${i % 2 == 0 ? 'primary' : 'secondary'
                                                }`
                                              ].main,
                                          }} />{t(key)} : {value.toString()}
                                        </div>
                                      );

                                    default:
                                      return (
                                        <div key={(key + value.toString())} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                          <DynamicIcon style={{
                                            color:
                                              theme.palette[
                                                `${i % 2 == 0 ? 'primary' : 'secondary'
                                                }`
                                              ].main,
                                          }} />{t(key)} : {value.toString()}
                                        </div>
                                      );
                                  }
                              }

                          }
                      }
                    }
                    // }
                  })
                }
              </Fragment>
            </Grid>
          )
        })}
      </Grid>
    </Fragment>
  )
});


export default MainCard