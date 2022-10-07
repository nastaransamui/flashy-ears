import brand from "@/public/text/brand";
import brandStyle from "./brand-style";
import PropTypes from 'prop-types'
import { FC } from "react";
import { useTranslation } from "react-i18next";
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton'
import { useNavigate } from "react-router-dom";
import { BrandLogoTypes } from '@/interfaces/react.interface'
import { useSelector } from "react-redux";
import { State } from "@/src/redux/store";

const BrandLogo: FC<BrandLogoTypes> = (props: BrandLogoTypes) => {
  const { i18n } = useTranslation();
  const { classes, cx } = brandStyle({})
  const navigate = useNavigate();
  const { sideBarbgColor, rtlActive, stateMiniActive, handleSideBarBgToggle } = props
  const { propsMiniActive } = useSelector<State, State>(state => state);
  const logoClasses =
    classes.logo +
    ' ' +
    cx({
      [classes.whiteAfter]: sideBarbgColor === 'white',
      [classes.blackAfter]: sideBarbgColor === 'black',
    });

  const logoMini =
    classes.logoMini +
    ' ' +
    cx({
      [classes.logoMiniRTL]: rtlActive,
    });

  const logoNormal =
    classes.logoNormal +
    ' ' +
    cx({
      [classes.logoNormalSidebarMini]: !propsMiniActive && stateMiniActive,
      [classes.logoNormalSidebarMiniRTL]:
        rtlActive && !propsMiniActive && stateMiniActive,
      [classes.logoNormalRTL]: rtlActive,
    });

  const sideBarTheme =
    classes.sideBarTheme +
    ' ' +
    cx({
      [classes.sideBarThemeRTL]: rtlActive,
    })

  return (
    <div className={logoClasses}>
      <span className={logoMini} onClick={() => navigate('/')}>
        <img src={`/admin${brand[`img_${i18n.language}` as keyof typeof brand]}`} className={classes.img} />
      </span>
      <span className={logoNormal} >
        {brand[`name_${i18n.language}` as keyof typeof brand]}
        <IconButton
          disableRipple
          disableFocusRipple
          disableTouchRipple
          className={sideBarTheme}
          onClick={handleSideBarBgToggle as React.MouseEventHandler}>
          {
            sideBarbgColor == 'white' ? <DarkModeIcon style={{ color: 'black' }} /> : <LightModeIcon style={{ color: 'white' }} />
          }
        </IconButton>
      </span>
    </div>
  )
}

BrandLogo.propTypes = {
  sideBarbgColor: PropTypes.string.isRequired,
  rtlActive: PropTypes.bool.isRequired,
  stateMiniActive: PropTypes.bool.isRequired,
  handleSideBarBgToggle: PropTypes.func.isRequired,
}

export default BrandLogo;