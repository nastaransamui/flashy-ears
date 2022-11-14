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
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import DnsIcon from '@mui/icons-material/Dns';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Grid3x3Icon from '@mui/icons-material/Grid3x3'
import HomeIcon from "@mui/icons-material/Home";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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
      SouthAmericaIcon,
      CurrencyExchangeIcon,
      HotelIcon,
      LocalPhoneIcon,
      AccountBoxIcon,
      DnsIcon,
      TimelapseIcon,
      FmdGoodIcon,
      Grid3x3Icon,
      HomeIcon,
      AlternateEmailIcon,
      AttachMoneyIcon
    }
  }, [])

  return iconMap
}

export default useIconMap;