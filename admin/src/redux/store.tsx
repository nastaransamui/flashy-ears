// store.ts

import { AnyAction, Store, } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import { PaletteMode, } from '@mui/material';
import { hasCookie, getCookies } from 'cookies-next';

export interface Profile {
  profileImage?: string;
  userName?: string;
  _id?: string;
}
export interface State {
  adminAccessToken: any;
  adminThemeName: string | null;
  adminThemeType: PaletteMode | null;
  adminLoadingBar: number;
  adminFormSubmit: boolean;
  profile: Profile;
  propsMiniActive: boolean;
  cardView: boolean;
}

const initialState = {
  adminAccessToken: null,
  adminThemeName: typeof window !== 'undefined' ? getCookies().adminThemeName as string : 'cloud',
  adminThemeType: typeof window !== 'undefined' ? getCookies().adminThemeType as PaletteMode : 'dark',
  adminLoadingBar: 0,
  adminFormSubmit: false,
  profile: {},
  propsMiniActive: false,
  cardView: true,
}


// create your reducer
const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      // console.log(action)
      return { ...state, ...action.payload };
    case 'SERVER_ACTION':
    case 'CLIENT_ACTION':
    case 'ADMIN_ACCESS_TOKEN':
      // console.log("action")
      return { ...state, adminAccessToken: action.payload };
    case 'ADMIN_THEMENAME':
      return { ...state, adminThemeName: action.payload };
    case 'ADMIN_THEMETYPE':
      return { ...state, adminThemeType: action.payload };
    case 'ADMIN_LOADINGBAR':
      return { ...state, adminLoadingBar: action.payload };
    case 'ADMIN_FORM_SUBMIT':
      return { ...state, adminFormSubmit: action.payload };
    case 'ADMIN_PROFILE':
      return { ...state, profile: action.payload };
    case 'PROPS_MINI_ACTIVE':
      return { ...state, propsMiniActive: action.payload };
    case 'CARD_VIEW':
      return { ...state, cardView: action.payload };
    default:
      return state;
  }
};

// create a makeStore function
// const makeStore = (context: Context) => createStore(reducer);
const makeStore = () =>
  configureStore({
    reducer: reducer,
    devTools: true,
  });


// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(makeStore, { debug: false });