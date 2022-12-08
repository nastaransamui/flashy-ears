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
  const { expanded } = useSelector<State, State>(state => state)
  const currentRouteState = useCurrentRouteState();
  const { modelName } = currentRouteState;
  const { t } = useTranslation(modelName);

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
  )
})

export default CardCollapseArea;