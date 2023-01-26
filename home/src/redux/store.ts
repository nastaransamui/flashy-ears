import { AnyAction, Store } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import { PaletteMode } from '@mui/material';
import { hasCookie, getCookies } from 'cookies-next';
const initialState = {
  adminAccessToken: null,
  homeThemeName:
    typeof window !== 'undefined'
      ? (getCookies().homeThemeName as string)
      : 'oceanBlue',
  homeThemeType:
    typeof window !== 'undefined'
      ? (getCookies().homeThemeType as PaletteMode)
      : 'dark',
  homeLoadingBar: 0,
  homeFormSubmit: false,
  slides: [],
};

export interface SlidesType {
  img: string;
  desc_en: string;
  desc_th: string;
  title_en: string;
  title_th: string;
  linkTitle_en: string;
  linkTitle_th: string;
  link: string;
}
export interface State {
  adminAccessToken: any;
  homeThemeName: string | null;
  homeThemeType: PaletteMode | null;
  homeLoadingBar: number;
  homeFormSubmit: boolean;
  slides: SlidesType[];
}

const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case 'SERVER_ACTION':
    case 'CLIENT_ACTION':
    case 'ADMIN_ACCESS_TOKEN':
      // console.log("action")
      return { ...state, adminAccessToken: action.payload };
    case 'HOME_THEMENAME':
      return { ...state, homeThemeName: action.payload };
    case 'HOME_THEMETYPE':
      return { ...state, homeThemeType: action.payload };
    case 'HOME_LOADINGBAR':
      return { ...state, homeLoadingBar: action.payload };
    case 'HOME_FORM_SUBMIT':
      return { ...state, homeFormSubmit: action.payload };
    case 'SLIDES':
      return { ...state, slides: action.payload };
    default:
      return state;
  }
};
const makeStore = () =>
  configureStore({
    reducer: reducer,
    devTools: true,
  });

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(makeStore, { debug: false });
