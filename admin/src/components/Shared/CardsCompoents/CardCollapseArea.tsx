import { forwardRef } from "react";

//Mui
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import Close from '@mui/icons-material/Close';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material';

//Hooks
import { useSelector } from "react-redux";
import useIconMap from '@/src/components/Hooks/useIconMap';
import useCurrentRouteState from '@/hookes/useCurrentRouteState'
import { useTranslation } from 'react-i18next';

//Components
import { PhoneTooltip } from '@/shared/DataShow/Table/MainTable'
import CircleIcon from '@mui/icons-material/Circle';

import { State, MainCardTypes } from "@/src/redux/store";


export interface CardCollapseAreaTypes {
  elRefs: any;
  index: number;
  fieldsObject: MainCardTypes
}
export type Ref = HTMLDivElement;
const CardCollapseArea = forwardRef<Ref, CardCollapseAreaTypes>(({ elRefs, index, fieldsObject }, ref) => {

  const theme = useTheme()
  const iconMap = useIconMap()
  const expanded = useSelector<State, { [key: string]: boolean }>(state => state.expanded)

  const currentRouteState = useCurrentRouteState();
  const { modelName } = currentRouteState;
  const { t, i18n } = useTranslation(modelName);
  const rtlActive = i18n.language == 'fa';

  const setBoxStyle = (index: number, expanded: { [key: string]: boolean }) => {
    return {
      bgcolor: theme.palette.background.paper,
      borderRadius: `12px 12px 12px 12px`,
      pb: expanded[index] ? 2 : 0,
      position: 'absolute',
      width: elRefs[index]?.['current']?.[`offsetWidth`],
      zIndex: expanded[index] ? 4 : 1,
    };
  };

  return (
    <Box sx={setBoxStyle(index, expanded)} ref={ref}>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        disablePadding
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" sx={{ marginTop: 1 }}>
            {fieldsObject[fieldsObject.dispalyFields[0]]}
          </ListSubheader>
        }
      >
        {
          Object.entries(fieldsObject).map(([key, value], i) => {
            let dispalyFields = fieldsObject['dispalyFields']
            if (dispalyFields?.includes(key)) {
              let muiData = fieldsObject['muiData'][key as keyof typeof fieldsObject['muiData']]
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
                  primaryValue = new Date(value).toLocaleDateString(rtlActive ? 'fa-IR' : "en-GB", options)
                  break;
                default:
                  switch (true) {
                    case Array.isArray(value):
                      if (value.length == 0) primaryValue = 'length 0'
                      primaryValue = key !== 'phones' ?
                        key == 'gallery' ? `${value.length} ${t('images')}` :
                          key == 'colors' ?
                            <span style={{ display: 'flex', flexWrap: 'wrap' }}>
                              {value.map((color: any) => (
                                <Tooltip
                                  TransitionComponent={Zoom}
                                  key={color._id} title={color[`label_en`]} arrow componentsProps={{
                                    tooltip: { sx: { border: `solid 0.5px ${color.colorCode}`, }, },
                                    arrow: {
                                      sx: {
                                        '&:before': {
                                          border: `0.5px solid ${color.colorCode}`,
                                        },
                                      }
                                    },
                                  }} >
                                  <CircleIcon sx={{ color: color.colorCode }} />
                                </Tooltip>))}
                            </span> :
                            key == 'financials' ?
                              <span>
                                <span style={{ display: 'flex' }}>
                                  {`${value.reduce((accumulator: any, object: any) => {
                                    return accumulator + object.totalInventoryInCart;
                                  }, 0)} ${t('inCart')} - 
                                 ${value.reduce((r: any, c: any) => r + c.buyPrice, 0) / value.length} ${t('buyPrice')} `}
                                </span>
                                <span>
                                  {`${value.reduce((r: any, c: any) => r + c.salePrice, 0) / value.length} ${t('salePrice')} - 
                             ${value.reduce((r: any, c: any) => r + c.totalInventory, 0) / value.length} ${t('totalInventory')}`}
                                </span>
                              </span> :
                              key == 'collectionData' ?
                                <span style={{ display: 'flex' }}>
                                  {value.map((collection: any) => (
                                    <div key={(key + value.toString())} style={{ display: 'flex', width: '100%', }}>
                                      <img
                                        alt=".."
                                        src={`${collection[`img_${theme.palette.mode}`][0]['src']}`}
                                        style={{ width: 30, height: 30, borderRadius: '50%', }} />
                                      <span style={{ paddingLeft: 10, paddingTop: 6 }}>{collection[`label_${i18n.language}`]}</span>
                                    </div>
                                  ))}
                                </span> :
                                value.length :
                        <PhoneTooltip value={value} modelName={modelName!} />
                      break;
                    case typeof value == 'object':

                      break
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
                            <span style={{ display: 'flex', flexDirection: 'row' }}>
                              {value.length >= 30 ? (rtlActive ? '...' + value.slice(0, 30) : value.slice(0, 30) + '...') : value.toString()}
                            </span>
                          </Tooltip>
                          break;
                      }
                      break;
                  }
                  break;
              }
              return (
                <ListItemButton
                  key={key}
                  disableTouchRipple
                  sx={{ borderTop: `1px solid ${theme.palette.primary.main}`, textAlign: rtlActive ? 'right' : 'left' }}>
                  <ListItemIcon style={{ minWidth: 35 }} >
                    <DynamicIcon style={{
                      color:
                        theme.palette[
                          `${i % 2 == 0 ? 'primary' : 'secondary'
                          }`
                        ].main,
                    }} />
                  </ListItemIcon>
                  <ListItemText sx={{ marginTop: 0, marginBottom: 0, }} primary={primaryValue} secondary={t(key)} />
                </ListItemButton>
              )
            }
            // }
          })
        }

      </List>
    </Box>
  )
})

export default CardCollapseArea;