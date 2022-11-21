import { FC, Fragment, useState } from "react";

import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import { DataGrid, GridColDef, GridActionsCellItem, GridRenderCellParams, GridRowParams, } from '@mui/x-data-grid';
import { CustomNoRowsOverlay, CustomToolbar, LocateText } from './functions'
import Typography from '@mui/material/Typography'
import { useReadLocalStorage } from 'usehooks-ts'
import useCurrentRouteState from '@/hookes/useCurrentRouteState'
import { useTranslation } from "react-i18next";
import SvgIcon from '@mui/material/SvgIcon';
import Close from '@mui/icons-material/Close';
import Done from '@mui/icons-material/Done';
import { useTheme } from '@mui/material';
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom';
import { Player } from 'video-react';
import Avatar from '@mui/material/Avatar'
import YouTube from 'react-youtube';
import ToggleOff from '@mui/icons-material/ToggleOff'
import ToggleOn from '@mui/icons-material/ToggleOn'

export interface MainTableType { }

import { makeStyles } from 'tss-react/mui';
import { PhoneAgentType } from "@/models/Agencies";

export function important<T>(value: T): T {
  return (value + ' !important') as any;
}

const mainTableStyles = makeStyles<{}>()((theme) => {
  return {
    root: {

    }
  }
})

export function escapeRegExp(value: string) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export const PhoneTooltip = ({ value, modelName }: { value: PhoneAgentType[], modelName: string }) => {
  const theme = useTheme();
  const { t } = useTranslation(modelName)
  return (
    <Tooltip title={
      value.map((a, i) => (<Typography variant='subtitle1'
        sx={{
          borderBottom:
            i !== value.length - 1
              ? `1px solid ${theme.palette.secondary.main}`
              : 'none',
        }} key={i}>
        {t(`${Object.keys(a)[1]}`)}: {a.number}<br />
        {t(`${Object.keys(a)[0]}`)}: {a.tags[0]}<br />
        {t(`${Object.keys(a)[2]}`)}: {a.remark}
      </Typography>))
    } TransitionComponent={Zoom} placement='top' arrow enterTouchDelay={0}>
      <div >{value[0]?.number}</div>
      {/*  */}

    </Tooltip>
  )
};

interface MuiDataType {
  type: string;
  thumbnail: string;
  filterable: boolean;
  icon: string;
  align?: string | undefined;
  width?: number | undefined;
}

const MainTable: FC<MainTableType> = ((props: MainTableType) => {
  const { totalData, totalCount, profile, deleteIds, statusIdsUpdate } = useSelector<State, State>(state => state)
  const dispatch = useDispatch();
  const currentRouteState = useCurrentRouteState();

  const { modelName, predefineDb, activeOnly } = currentRouteState
  const { t } = useTranslation(modelName)
  const { classes, theme } = mainTableStyles({});
  const navigate = useNavigate()
  const m: any = []
  const perPage: number = useReadLocalStorage(`${modelName}_perPage`)!
  totalData.forEach((a, index) => {
    if (index == 0) {
      Object.entries(a).map(([key, value]) => {
        let dispalyFields = a['dispalyFields']
        if (dispalyFields?.includes(key)) {
          let muiData = a['muiData'][key as keyof typeof a['muiData']]
          let align = muiData?.[`align` as keyof typeof muiData]
          m.push({
            field: key,
            headerName: t(key),
            width: muiData?.[`width` as keyof typeof muiData] || 250,
            cellClassName: 'super-app-theme--cell',
            align: 'center',
            headerAlign: 'center',
            filterable: muiData?.[`filterable` as keyof typeof muiData],
            type: muiData?.[`type` as keyof typeof muiData],
            description: t(`${key}`),
            renderCell: (params: GridRenderCellParams) => {
              switch (true) {
                case Array.isArray(value):
                  if (params.row[key].length == 0) return <div key={(key + value.toString())}> {t(key)} : <Close style={{ position: 'absolute', color: theme.palette.error.main }} /></div>
                  return (
                    <div key={(key + value.toString())}>
                      {
                        key !== 'phones' ?
                          params.row[key].length :
                          <PhoneTooltip value={params.row[key]} modelName={modelName!} />

                      }
                    </div>
                  )

                case typeof value == 'boolean':
                  return (
                    <Fragment key={(key + value.toString())}>{params.row[key] ? <Done style={{ color: theme.palette.success.main }} /> : <Close style={{ color: theme.palette.error.main }} />}</Fragment>
                  );

                case key == "createdAt":
                  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: "2-digit", minute: "2-digit" } as const;

                  return (
                    <span>{new Date(params.formattedValue).toLocaleDateString("en-GB", options)}</span>
                  )

                case key == "updatedAt":
                  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: "2-digit", minute: "2-digit" } as const;
                  return (
                    <span>{new Date(params.formattedValue).toLocaleDateString("en-GB", options)}</span>
                  )

                default:
                  switch (true) {
                    case params.formattedValue == null:
                      return (<div>{t('notDefine')}</div>)
                    case params.formattedValue.length == 0:
                      return (
                        <Close style={{ color: theme.palette.error.main }} />
                      )
                    case params.formattedValue.length > 80:
                      return (
                        <Tooltip title={params.formattedValue} TransitionComponent={Zoom} placement='top' arrow enterTouchDelay={0}>
                          <div >{params.formattedValue.slice(0, 30) + ' ...'}</div>
                        </Tooltip>
                      )
                    default:
                      let media = muiData?.['thumbnail' as keyof typeof muiData]
                      switch (media) {
                        case 'icon' as any:
                          return (
                            <div style={{ display: 'flex', width: '100%' }}>
                              <SvgIcon >
                                <path d={`${params.row[media as unknown as keyof typeof params.row]}`} />
                              </SvgIcon>
                              <span style={{
                                marginLeft: theme.direction == 'ltr' ? 5 : 0,
                                marginRight: theme.direction == 'ltr' ? 0 : 5,
                              }}>{params.formattedValue.toString()}</span>
                            </div>
                          )
                        case 'videoLink' as any:
                          return (
                            <div style={{ display: 'flex', width: '100%' }}>
                              <Avatar sx={{ width: 30, height: 30 }}>
                                <Player
                                  autoPlay
                                  aspectRatio='auto'
                                  fluid={false}
                                  preload='auto'
                                  muted
                                  src={params.row[media as unknown as keyof typeof params.row]}
                                />
                              </Avatar>
                              <span style={{
                                marginLeft: theme.direction == 'ltr' ? 5 : 0,
                                marginRight: theme.direction == 'ltr' ? 0 : 5,
                              }}>{params.formattedValue.toString()}</span>
                            </div>
                          )
                        case 'youTubeId' as any:
                          return (
                            <div style={{ display: 'flex', width: '100%' }}>
                              <Avatar sx={{ width: 30, height: 30 }}>
                                <YouTube
                                  videoId={params.row[media as unknown as keyof typeof params.row]}
                                  opts={{ playerVars: { autoplay: 1 } }}
                                />
                              </Avatar>
                              <span style={{
                                marginLeft: theme.direction == 'ltr' ? 5 : 0,
                                marginRight: theme.direction == 'ltr' ? 0 : 5,
                              }}>{params.formattedValue.toString()}</span>
                            </div>
                          )
                        case '' as any:
                          //@ts-ignore
                          return <div style={{ display: 'flex', width: '100%', justifyContent: align }}>{params.formattedValue.toString()}</div>
                        case 'iso2' as any:
                          return (
                            <div style={{ display: 'flex', width: '100%' }}>
                              {media !== '' as any
                                ?
                                <img
                                  alt=".."
                                  src={`/admin/flags/128x128/${params.row[media as unknown as keyof typeof params.row]}.png` || '/admin/images/faces/avatar1.jpg'}
                                  style={{ width: 30, height: 30, borderRadius: '50%' }} /> : null}
                              <span style={{
                                marginLeft: theme.direction == 'ltr' ? 5 : 0,
                                marginRight: theme.direction == 'ltr' ? 0 : 5,
                              }}>{params.formattedValue.toString()}</span>
                            </div>
                          )
                        default:
                          return (
                            <div style={{ display: 'flex', width: '100%' }}>
                              {media !== '' as any
                                ?
                                <img
                                  alt=".."
                                  src={params.row[media as unknown as keyof typeof params.row] || '/admin/images/faces/avatar1.jpg'}
                                  style={{ width: 30, height: 30, borderRadius: '50%' }} /> : null}
                              <span style={{
                                marginLeft: theme.direction == 'ltr' ? 5 : 0,
                                marginRight: theme.direction == 'ltr' ? 0 : 5,
                              }}>{params.formattedValue.toString()}</span>
                            </div>
                          )
                      }
                    // return (

                    // );
                  }
              }
            }
          })
        }
      })

    }

  })
  const columns: GridColDef[] = [...m,
  {
    field: 'actions',
    type: 'actions',
    headerName: t('actions', { ns: 'common' }),
    headerAlign: 'center',
    width: 150,
    cellClassName: 'actions',
    filterable: false,
    hide: totalCount == 0 ? true : false,
    getActions: (params: GridRowParams) => {
      return [
        <GridActionsCellItem
          nonce={undefined} onResize={undefined} onResizeCapture={undefined}
          label={t('Edit')}
          className='textPrimary'
          onClick={() => {
            dispatch({
              type: 'FIRST_SEARCH',
              firstSearch: false
            })
            navigate(`/${currentRouteState.path}/${currentRouteState?.modelName?.slice(0, -1)}?_id=${params.id}`, {
              state: params.row,
            })
          }}
          color='inherit'
          disableRipple
          disableFocusRipple
          icon={
            <Tooltip title={t('editTooltip', { ns: 'common' })} placement='bottom'
              arrow>
              <Edit style={{ color: theme.palette.primary.main }} />
            </Tooltip>
          } />,
        <GridActionsCellItem
          nonce={undefined} onResize={undefined} onResizeCapture={undefined}
          label={t('Delete')}
          className='textPrimary'
          icon={predefineDb ? isDisabled(params) ?
            <Tooltip
              title={t('ToggleOff', { ns: 'common' })}
              placement='bottom'
              arrow>
              <ToggleOff
                style={{ color: !activeOnly && isDisabled(params) ? theme.palette.action.disabled : theme.palette.error.main }}
              />
            </Tooltip> :
            <Tooltip
              title={t('ToggleOn', { ns: 'common' })}
              placement='bottom'
              arrow>
              <ToggleOn style={{ color: isDisabled(params) ? theme.palette.action.disabled : theme.palette.success.main }} />
            </Tooltip> :
            <Tooltip title={t('Delete', { ns: 'common' })} placement='bottom'
              arrow>
              <Delete style={{ color: isDisabled(params) ? theme.palette.action.disabled : theme.palette.error.main }} />
            </Tooltip>
          }
          disabled={!activeOnly && isDisabled(params)}
          onClick={() => {
            if (deleteIds.findIndex((a) => a == params.id) == -1) {
              dispatch({
                type: 'DELETE_IDS',
                payload: [...deleteIds, params.id]
              })
            }
          }} />,
      ]
    }
  }
  ]

  const isDisabled = (params: GridRowParams) => {
    console.log()
    switch (modelName) {
      case 'Users':
        return profile._id == params.id;

      default:
        return params.row?.isActive;
    }
  }



  const deleteIconClicked = () => {
    console.log(deleteIds)
  }

  return (
    <Fragment>
      <Box
        sx={{
          height: '63vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          mb: 2,
          mt: 2,
        }}>
        <DataGrid
          className={classes.root}
          density='compact'
          showCellRightBorder
          localeText={LocateText()}
          rows={totalData}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={perPage}
          rowsPerPageOptions={[6, 12, 24, 48, 96]}
          checkboxSelection={totalCount > 0}
          // disableSelectionOnClick
          paginationMode='server'
          isRowSelectable={(params: GridRowParams) => {
            switch (modelName) {
              case 'Users':
                return profile._id !== params.id;
              case "Countries":
                return activeOnly ? params.row?.isActive : !params.row?.isActive;
              default:
                return !params.row?.isActive;
            }
          }}
          rowCount={totalCount}
          experimentalFeatures={{ newEditingApi: true }}
          // rowHeight={130}
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          componentsProps={{
            toolbar:
            {
              deleteIconClicked: deleteIconClicked,
            }
          }}
          onRowDoubleClick={(params) => {
            dispatch({
              type: 'FIRST_SEARCH',
              firstSearch: false
            })
            navigate(`/${currentRouteState.path}/${currentRouteState?.modelName?.slice(0, -1)}?_id=${params.id}`, {
              state: params.row,
            })
          }}
          keepNonExistentRowsSelected
          onSelectionModelChange={(newSelectionModel) => {
            switch (predefineDb) {
              case true:
                dispatch({
                  type: 'STATUS_IDS_UPDATE',
                  payload: [...newSelectionModel]
                })
                break;

              default:
                dispatch({
                  type: 'DELETE_IDS',
                  payload: [...newSelectionModel]
                })
                break;
            }
          }}
          selectionModel={predefineDb ? statusIdsUpdate : deleteIds}
        />
      </Box>
    </Fragment>
  )
});

export default MainTable;