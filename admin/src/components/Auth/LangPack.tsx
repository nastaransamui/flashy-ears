
import palette from "@/theme/palette";


import PropTypes from 'prop-types';

import PaletteIcon from '@mui/icons-material/Palette';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'

import langName from '@/public/text/langNames';

import useLangPack from "./useLangPack";


const LangPack = () => {

  const { classes, values, t, adminThemeType, handleLanguage, handleThemeName, handleMode } = useLangPack();

  return (
    <div className={classes.socmedSideLogin}>
      <FormControl size="small">
        <Select
          value={values.lang}
          aria-label='language-select'
          onChange={(e) => {
            // handleLangSelectChange(setValues, e);
          }}>
          {langName.map((item, i) => {
            return (
              <MenuItem
                key={i.toString()}
                value={item.LangCode}
                onClick={() => {
                  handleLanguage(item.LangCode);
                }}>
                <img
                  src={`/admin/images/langs/${item.Flag}`}
                  alt={item.Lang}
                  className={classes.flag}
                />
                <span className={classes.menuItemText}>
                  {item[`title_${values.lang}` as keyof typeof item]}
                </span>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl size="small">

        <Select
        aria-label='theme-select'
          value={values.paletteName}>
          {Object.keys(palette).map(function (key, index) {
            return (
              <MenuItem
                key={index}
                value={key}
                onClick={() => {
                  handleThemeName(key);
                }}
                style={{ background: palette[key].palette.primary.main }}>
                <PaletteIcon
                  style={{ color: palette[key].palette.secondary.light }}
                />
                &nbsp;
                <span className={classes.menuItemText}>{t(`${key}`)}</span>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl size='small'>
        <Select
        aria-label='mode-select'
          value={adminThemeType}
          onChange={(e) => {
          }}>
          {['dark', 'light'].map((item, i) => {
            return (
              <MenuItem
                key={i}
                value={item}
                onClick={(e) => {
                  handleMode(item);
                }}>
                {item == 'light' ? <LightModeIcon /> : <DarkModeIcon />}
                &nbsp;
                <span className={classes.menuItemText}>{t(`${item}`)}</span>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default LangPack