import { useMemo } from "react";
import BadgeIcon from '@mui/icons-material/Badge';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import People from '@mui/icons-material/People';
import Public from '@mui/icons-material/Public';
import FlagIcon from '@mui/icons-material/Flag';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeWork from '@mui/icons-material/HomeWork';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import EmailIcon from '@mui/icons-material/Email'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import TitleIcon from '@mui/icons-material/Title'

const useIconMap = () => {
  const iconMap = useMemo(() => {
    return {
      EmailIcon,
      BadgeIcon,
      LocationCityIcon,
      FlagIcon,
      DisplaySettingsIcon,
      Public,
      EventIcon,
      InfoIcon,
      People,
      AccountCircleIcon,
      HomeWork,
      CheckBoxIcon,
      CheckBoxOutlineBlank,
      TitleIcon,
    }
  }, [])

  return iconMap
}

export default useIconMap;