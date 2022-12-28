import { CSSProperties, FC } from "react";

//Mui Components
import { useTheme } from '@mui/material';
import MuiCardHeader from '@mui/material/CardHeader';
// import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import SvgIcon from '@mui/material/SvgIcon';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox';
import { GridSize } from '@mui/material/Grid'
import Typography from '@mui/material/Typography'



//Redux
import { useDispatch, useSelector } from 'react-redux';
import { State, MainCardTypes } from '@/src/redux/store';

//Hooks
import useCurrentRouteState from '@/hookes/useCurrentRouteState'
import { useTranslation } from 'react-i18next';
import { useReadLocalStorage } from 'usehooks-ts'

//Component
import Badge from '@/shared/Badge'
import CardAvatar from "@/shared/CardsCompoents/CardAvatar";

export interface CardHeaderType {
  fieldsObject: MainCardTypes
  thumbnail: string;
}

const CardHeader: FC<CardHeaderType> = ((props: CardHeaderType) => {
  const { fieldsObject, thumbnail } = props;
  const { deleteIds, profile, statusIdsUpdate } = useSelector<State, State>(state => state)

  const currentRouteState = useCurrentRouteState();
  const { modelName, predefineDb, activeOnly } = currentRouteState;
  const { t, i18n } = useTranslation(modelName);
  const rtlActive = i18n.language == 'fa';
  const dispatch = useDispatch();
  const gridView: GridSize = useReadLocalStorage(`${modelName}_gridView`)!

  const theme = useTheme()
  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: "2-digit", minute: "2-digit" } as const;
  const isDisabled = (fieldsObject: any) => {
    switch (modelName) {
      case 'Users':
        return profile._id == fieldsObject._id;

      default:
        return fieldsObject?.isActive;
    }
  }

  const date = fieldsObject.createdAt !== undefined ?
    new Date(fieldsObject.createdAt).toLocaleDateString(rtlActive ? 'fa-IR' : "en-GB", options) :
    new Date().toLocaleTimeString(rtlActive ? 'fa-IR' : "en-GB", options)

  const title = fieldsObject[fieldsObject.dispalyFields[0]]

  const titleStyle: CSSProperties = { paddingRight: rtlActive ? 8 : 0, display: 'flex', flexDirection: rtlActive ? 'row-reverse' : 'row' }

  return (
    <MuiCardHeader
      avatar={(() => {
        switch (thumbnail) {
          case 'icon' as any:
            return (
              <Badge color={fieldsObject.isActive ? "primary" : "error"}>
                <CardAvatar avatarType="icon" path={fieldsObject.icon} imageClass='image' />
              </Badge>
            )
          case 'videoLink' as any:
          case 'youTubeId' as any:
            if (fieldsObject.isYoutube) {
              return (
                <Badge color={fieldsObject.isActive ? "primary" : "error"} >
                  <CardAvatar avatarType="img" path={fieldsObject?.[`videoPoster`] || fieldsObject?.[`imageShow`]} imageClass='image' />
                </Badge>
              )
            } else {
              return (
                <Badge color={fieldsObject.isActive ? "primary" : "error"} >
                  <CardAvatar avatarType="img" path={fieldsObject?.[`videoPoster`] || fieldsObject?.[`imageShow`]} imageClass='image' />
                </Badge>
              )
            }
          case 'profileImage' as any:
          case 'logoImage' as any:
          case 'imageShow' as any:
            const replaceImage =
              thumbnail == 'profileImage' ? '/admin/images/faces/avatar1.jpg' :
                thumbnail == 'logoImage' ? '/admin/images/faces/avatar1.jpg' : thumbnail
            return (
              <Badge color={fieldsObject.isActive || fieldsObject.isAdmin ? (profile._id == fieldsObject._id ? 'secondary' : "primary") : "error"}  >
                <CardAvatar avatarType="img" path={fieldsObject?.[thumbnail] || replaceImage} imageClass='image' />
              </Badge>
            )
          case 'iso2' as any:
            return (
              <Badge color={fieldsObject.isActive ? "primary" : "error"}  >
                <Avatar sx={{ bgcolor: theme.palette.primary.main }} >
                  <CardAvatar avatarType="img" path={`/admin/flags/128x128/${fieldsObject?.['iso2' as string as keyof typeof fieldsObject['iso2']]}.png`} imageClass='flag' />
                </Avatar>
              </Badge>
            )
        }
      })()}
      action={
        <FormControlLabel
          label=''
          control={
            <Tooltip title={
              predefineDb ?
                fieldsObject.isActive ? t('ToggleOff', { ns: 'common' })
                  : t('ToggleOn', { ns: 'common' }) :
                t('deleteTooltip', { ns: 'common' })} placement='bottom'
              arrow>
              <Checkbox
                disabled={!activeOnly && isDisabled(fieldsObject)}
                checked={deleteIds.findIndex((b) => b == fieldsObject._id) !== -1 || statusIdsUpdate.findIndex((b) => b == fieldsObject._id) !== -1}
                onChange={() => {
                  switch (predefineDb) {
                    case true:
                      if (statusIdsUpdate.findIndex((b) => b == fieldsObject._id) == -1) {
                        dispatch({
                          type: 'STATUS_IDS_UPDATE',
                          payload: [...statusIdsUpdate, fieldsObject._id]
                        })
                      } else {
                        dispatch({
                          type: 'STATUS_IDS_UPDATE',
                          payload: [...statusIdsUpdate.filter((b) => b !== fieldsObject._id)]
                        })
                      }
                      break;

                    default:
                      if (deleteIds.findIndex((b) => b == fieldsObject._id) == -1) {
                        dispatch({
                          type: 'DELETE_IDS',
                          payload: [...deleteIds, fieldsObject._id]
                        })
                      } else {
                        dispatch({
                          type: 'DELETE_IDS',
                          payload: [...deleteIds.filter((b) => b !== fieldsObject._id)]
                        })
                      }
                      break;
                  }
                }} /></Tooltip>} />
      }
      title={<Tooltip title={title} placement='bottom'
        arrow>
        {(() => {
          switch (gridView) {
            case 12:
              return <span style={{ paddingRight: rtlActive ? 8 : 0 }}>{title}</span>
            case 6:
              return <span style={{ paddingRight: rtlActive ? 8 : 0 }}>{title}</span>
            case 4:
              return <span style={titleStyle}>
                <Typography variant="body2">{title.slice(0, 20)}</Typography>
                {title.length > 20 && <Typography variant="body2">...</Typography>}
              </span>
            case 3:
              return <span style={titleStyle} >
                <Typography variant="body2">{title.slice(0, 10)}</Typography>
                {title.length > 10 && <Typography variant="body2">...</Typography>}
              </span>
            default:
              return <span style={titleStyle}>
                <Typography variant="body2">{title.slice(0, 5)}</Typography>
                {title.length > 5 && <Typography variant="body2">...</Typography>}
              </span>
          }
        })()}

      </Tooltip>}
      subheader={
        <Tooltip title={date} arrow>
          {(() => {
            switch (gridView) {
              case 12:
                return <span style={{ paddingRight: rtlActive ? 8 : 0 }}>{date}</span>
              case 6:
                return <span style={{ paddingRight: rtlActive ? 8 : 0 }}>{date}</span>
              case 4:
                return <span style={{ paddingRight: rtlActive ? 8 : 0 }}>{date}</span>
              case 3:
                return <span style={titleStyle}>
                  <Typography variant="body2">{date.slice(0, 21)}</Typography>
                  {date.length > 21 && <Typography variant="body2">...</Typography>}
                </span>
              default:
                return <span style={titleStyle}>
                  <Typography variant="body2">{date.slice(0, 6)}</Typography>
                  {date.length > 6 && <Typography variant="body2">...</Typography>}
                </span>
            }
          })()}
        </Tooltip>
      }
    />
  )
})



export default CardHeader