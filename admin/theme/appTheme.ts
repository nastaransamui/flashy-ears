import '@mui/material/styles';
import { createTheme } from '@mui/material';
import palette from './palette';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { PaletteMode, } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypeText {
    hint: string;
    color: string;
  }
  interface Theme {
    rounded: {
      small: string;
      medium: string;
      big: string;
    };
    shade: {
      light: string;
    };
    direction: string;
  }
  interface ThemeOptions {
    rounded?: {
      small?: string;
      medium?: string;
      big?: string;
    };
    shade?: {
      light?: string;
    };
    direction?: string;
  }
}

const appTheme = (color: string, mode: PaletteMode, dir: string) => {
  const theme = createTheme({
    palette: {
      mode: mode,
      background: {
        paper: mode === 'dark' ? '#212121' : '#fff',
        default: mode === 'dark' ? '#424242' : '#f5f5f5',
      },
      primary: palette[color].palette.primary,
      secondary: palette[color].palette.secondary,
      action: {
        hover:
          mode === 'dark'
            ? 'rgba(128,128,128, 0.9)'
            : 'rgba(128,128,128, 0.05)',
        hoverOpacity: 0.05,
      },
      text: {
        hint: palette[color].palette.primary.light,
        color: mode === 'dark' ? '#fff' : '#000000',
      },
    },
    direction: dir,
    typography: {
      fontFamily: ['Open Sans', 'sans-serif'].join(','),
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
    shade: {
      light: '0 0 13px -1px rgba(0, 0, 0, 0.22)',
    },
    rounded: {
      small: '8px',
      medium: '12px',
      big: '20px',
    },
    shadows:
      mode === 'dark'
        ? [
            'none',
            '0px 1px 3px 0px rgba(50,50,50, 0.2),0px 1px 1px 0px rgba(50,50,50, 0.14),0px 2px 1px -1px rgba(50,50,50, 0.12)',
            '0px 1px 5px 0px rgba(50,50,50, 0.2),0px 2px 2px 0px rgba(50,50,50, 0.14),0px 3px 1px -2px rgba(50,50,50, 0.12)',
            '0px 1px 8px 0px rgba(50,50,50, 0.2),0px 3px 4px 0px rgba(50,50,50, 0.14),0px 3px 3px -2px rgba(50,50,50, 0.12)',
            '0px 2px 4px -1px rgba(50,50,50, 0.2),0px 4px 5px 0px rgba(50,50,50, 0.14),0px 1px 10px 0px rgba(50,50,50, 0.12)',
            '0px 3px 5px -1px rgba(50,50,50, 0.2),0px 5px 8px 0px rgba(50,50,50, 0.14),0px 1px 14px 0px rgba(50,50,50, 0.12)',
            '0px 3px 5px -1px rgba(50,50,50, 0.2),0px 6px 10px 0px rgba(50,50,50, 0.14),0px 1px 18px 0px rgba(50,50,50, 0.12)',
            '0px 4px 5px -2px rgba(50,50,50, 0.2),0px 7px 10px 1px rgba(50,50,50, 0.14),0px 2px 16px 1px rgba(50,50,50, 0.12)',
            '0px 5px 5px -3px rgba(50,50,50, 0.2),0px 8px 10px 1px rgba(50,50,50, 0.14),0px 3px 14px 2px rgba(50,50,50, 0.12)',
            '0px 5px 6px -3px rgba(50,50,50, 0.2),0px 9px 12px 1px rgba(50,50,50, 0.14),0px 3px 16px 2px rgba(50,50,50, 0.12)',
            '0px 6px 6px -3px rgba(50,50,50, 0.2),0px 10px 14px 1px rgba(50,50,50, 0.14),0px 4px 18px 3px rgba(50,50,50, 0.12)',
            '0px 6px 7px -4px rgba(50,50,50, 0.2),0px 11px 15px 1px rgba(50,50,50, 0.14),0px 4px 20px 3px rgba(50,50,50, 0.12)',
            '0px 7px 8px -4px rgba(50,50,50, 0.2),0px 12px 17px 2px rgba(50,50,50, 0.14),0px 5px 22px 4px rgba(50,50,50, 0.12)',
            '0px 7px 8px -4px rgba(50,50,50, 0.2),0px 13px 19px 2px rgba(50,50,50, 0.14),0px 5px 24px 4px rgba(50,50,50, 0.12)',
            '0px 7px 9px -4px rgba(50,50,50, 0.2),0px 14px 21px 2px rgba(50,50,50, 0.14),0px 5px 26px 4px rgba(50,50,50, 0.12)',
            '0px 8px 9px -5px rgba(50,50,50, 0.2),0px 15px 22px 2px rgba(50,50,50, 0.14),0px 6px 28px 5px rgba(50,50,50, 0.12)',
            '0px 8px 10px -5px rgba(50,50,50, 0.2),0px 16px 24px 2px rgba(50,50,50, 0.14),0px 6px 30px 5px rgba(50,50,50, 0.12)',
            '0px 8px 11px -5px rgba(50,50,50, 0.2),0px 17px 26px 2px rgba(50,50,50, 0.14),0px 6px 32px 5px rgba(50,50,50, 0.12)',
            '0px 9px 11px -5px rgba(50,50,50, 0.2),0px 18px 28px 2px rgba(50,50,50, 0.14),0px 7px 34px 6px rgba(50,50,50, 0.12)',
            '0px 9px 12px -6px rgba(50,50,50, 0.2),0px 19px 29px 2px rgba(50,50,50, 0.14),0px 7px 36px 6px rgba(50,50,50, 0.12)',
            '0px 10px 13px -6px rgba(50,50,50, 0.2),0px 20px 31px 3px rgba(50,50,50, 0.14),0px 8px 38px 7px rgba(50,50,50, 0.12)',
            '0px 10px 13px -6px rgba(50,50,50, 0.2),0px 21px 33px 3px rgba(50,50,50, 0.14),0px 8px 40px 7px rgba(50,50,50, 0.12)',
            '0px 10px 14px -6px rgba(50,50,50, 0.2),0px 22px 35px 3px rgba(50,50,50, 0.14),0px 8px 42px 7px rgba(50,50,50, 0.12)',
            '0px 11px 14px -7px rgba(50,50,50, 0.2),0px 23px 36px 3px rgba(50,50,50, 0.14),0px 9px 44px 8px rgba(50,50,50, 0.12)',
            '0px 11px 15px -7px rgba(50,50,50, 0.2),0px 24px 38px 3px rgba(850,50,50 0.14),0px 9px 46px 8px rgba(50,50,50, 0.12)',
          ]
        : [
            'none',
            '0px 1px 3px 0px rgba(128,128,128, 0.2),0px 1px 1px 0px rgba(128,128,128, 0.14),0px 2px 1px -1px rgba(128,128,128, 0.12)',
            '0px 1px 5px 0px rgba(128,128,128, 0.2),0px 2px 2px 0px rgba(128,128,128, 0.14),0px 3px 1px -2px rgba(128,128,128, 0.12)',
            '0px 1px 8px 0px rgba(128,128,128, 0.2),0px 3px 4px 0px rgba(128,128,128, 0.14),0px 3px 3px -2px rgba(128,128,128, 0.12)',
            '0px 2px 4px -1px rgba(128,128,128, 0.2),0px 4px 5px 0px rgba(128,128,128, 0.14),0px 1px 10px 0px rgba(128,128,128, 0.12)',
            '0px 3px 5px -1px rgba(128,128,128, 0.2),0px 5px 8px 0px rgba(128,128,128, 0.14),0px 1px 14px 0px rgba(128,128,128, 0.12)',
            '0px 3px 5px -1px rgba(128,128,128, 0.2),0px 6px 10px 0px rgba(128,128,128, 0.14),0px 1px 18px 0px rgba(128,128,128, 0.12)',
            '0px 4px 5px -2px rgba(128,128,128, 0.2),0px 7px 10px 1px rgba(128,128,128, 0.14),0px 2px 16px 1px rgba(128,128,128, 0.12)',
            '0px 5px 5px -3px rgba(128,128,128, 0.2),0px 8px 10px 1px rgba(128,128,128, 0.14),0px 3px 14px 2px rgba(128,128,128, 0.12)',
            '0px 5px 6px -3px rgba(128,128,128, 0.2),0px 9px 12px 1px rgba(128,128,128, 0.14),0px 3px 16px 2px rgba(128,128,128, 0.12)',
            '0px 6px 6px -3px rgba(128,128,128, 0.2),0px 10px 14px 1px rgba(128,128,128, 0.14),0px 4px 18px 3px rgba(128,128,128, 0.12)',
            '0px 6px 7px -4px rgba(128,128,128, 0.2),0px 11px 15px 1px rgba(128,128,128, 0.14),0px 4px 20px 3px rgba(128,128,128, 0.12)',
            '0px 7px 8px -4px rgba(128,128,128, 0.2),0px 12px 17px 2px rgba(128,128,128, 0.14),0px 5px 22px 4px rgba(128,128,128, 0.12)',
            '0px 7px 8px -4px rgba(128,128,128, 0.2),0px 13px 19px 2px rgba(128,128,128, 0.14),0px 5px 24px 4px rgba(128,128,128, 0.12)',
            '0px 7px 9px -4px rgba(128,128,128, 0.2),0px 14px 21px 2px rgba(128,128,128, 0.14),0px 5px 26px 4px rgba(128,128,128, 0.12)',
            '0px 8px 9px -5px rgba(128,128,128, 0.2),0px 15px 22px 2px rgba(128,128,128, 0.14),0px 6px 28px 5px rgba(128,128,128, 0.12)',
            '0px 8px 10px -5px rgba(128,128,128, 0.2),0px 16px 24px 2px rgba(128,128,128, 0.14),0px 6px 30px 5px rgba(128,128,128, 0.12)',
            '0px 8px 11px -5px rgba(128,128,128, 0.2),0px 17px 26px 2px rgba(128,128,128, 0.14),0px 6px 32px 5px rgba(128,128,128, 0.12)',
            '0px 9px 11px -5px rgba(128,128,128, 0.2),0px 18px 28px 2px rgba(128,128,128, 0.14),0px 7px 34px 6px rgba(128,128,128, 0.12)',
            '0px 9px 12px -6px rgba(128,128,128, 0.2),0px 19px 29px 2px rgba(128,128,128, 0.14),0px 7px 36px 6px rgba(128,128,128, 0.12)',
            '0px 10px 13px -6px rgba(128,128,128, 0.2),0px 20px 31px 3px rgba(128,128,128, 0.14),0px 8px 38px 7px rgba(128,128,128, 0.12)',
            '0px 10px 13px -6px rgba(128,128,128, 0.2),0px 21px 33px 3px rgba(128,128,128, 0.14),0px 8px 40px 7px rgba(128,128,128, 0.12)',
            '0px 10px 14px -6px rgba(128,128,128, 0.2),0px 22px 35px 3px rgba(128,128,128, 0.14),0px 8px 42px 7px rgba(128,128,128, 0.12)',
            '0px 11px 14px -7px rgba(128,128,128, 0.2),0px 23px 36px 3px rgba(128,128,128, 0.14),0px 9px 44px 8px rgba(128,128,128, 0.12)',
            '0px 11px 15px -7px rgba(128,128,128, 0.2),0px 24px 38px 3px rgba(128,128,128, 0.14),0px 9px 46px 8px rgba(128,128,128, 0.12)',
          ],
    //override
    components: {
      MuiInput: {
        styleOverrides: {
          root: {
            '&&:hover:not(.Mui-disabled):not(.Mui-error):before': {
              borderColor: palette[color].palette.secondary.main,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderRadius: 10,
              borderColor: palette[color].palette.secondary.main,
            },
            '&:focus .MuiOutlinedInput-notchedOutline': {
              borderRadius: 10,
              borderColor: palette[color].palette.secondary.main,
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            transformOrigin: dir == 'rtl' ? 'top right' : 'top left',
            '&.Mui-focused': {
              transformOrigin: dir == 'rtl' ? 'top right' : 'top left',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            borderRadius: '12px !important',
            backgroundColor: 'transparent !important',
            border: `1px solid ${
              mode === 'dark'
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)'
            }`,
            '&:before': {
              display: 'none',
            },
            '&:after': {
              display: 'none',
            },
            '&$focused': {
              borderColor: palette[color].palette.primary.main,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: 12,
          },
          elevation1: {
            boxShadow:
              mode === 'dark'
                ? '0px 1px 3px 0px rgba(64, 64, 64, 1), 0px 1px 1px 0px rgba(42, 42, 42, 1), 0px 2px 1px -1px rgba(20, 20, 20, 1)'
                : '0 1.5px 12px 2px rgba(0, 0, 0, 0.06)',
          },
          elevation4: {
            boxShadow:
              mode === 'dark'
                ? '0px 2px 4px -1px rgba(64, 64, 64, 0.46), 0px 4px 5px 0px rgba(42, 42, 42, 0.32), 0px 1px 10px 0px rgba(20, 20, 20, 0.12)'
                : '0 1.5px 12px 4px rgba(0, 0, 0, 0.12)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            // borderRadius: 36,
            // fontWeight: 600,
            // padding: '8px 24px',
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            textAlign: dir === 'ltr' ? 'left' : 'right',
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          footerContainer: {
            display: 'none',
          },
        },
      },
      MuiIconButton:{
        styleOverrides:{
          root:{
            '&:hover':{
              backgroundColor: 'unset'
            }
          }
        }
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: mode === 'dark' ? '#424242' : '#f5f5f5', //theme.palette.background.default,
            fontWeight: 600,
            fontSize: 12,
            whiteSpace: 'pre-line',
            borderRadius: 4,
            color: mode === 'dark' ? '#fff' : '#000000', //theme.palette.text.color,
            border: `solid 0.5px ${palette[color].palette.secondary.main}`,
          },
          arrow: {
            '&:before': {
              border: `0.5px solid ${palette[color].palette.secondary.main}`, //${theme.palette.secondary.main}
            },
            color: mode === 'dark' ? '#424242' : '#f5f5f5', //theme.palette.background.default,
          },
        },
      },
    },
  });

  return theme;
};

export default appTheme;
