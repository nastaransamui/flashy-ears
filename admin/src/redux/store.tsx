// store.ts

import { AnyAction, Store, } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import { PaletteMode, } from '@mui/material';
export interface State {
  adminAccessToken: any;
  adminThemeName: string | null;
  adminThemeType: PaletteMode | null;
  adminLoadingBar: number;
  adminFormSubmit: boolean;
}


const initialState = {
  adminAccessToken: null,
  adminThemeName: typeof window !== 'undefined' ? localStorage.getItem('adminThemeName') !== null ? localStorage.getItem('adminThemeName') : 'cloud' : 'cloud',
  adminThemeType: typeof window !== 'undefined' ? localStorage.getItem('adminThemeType') as PaletteMode !== null ? localStorage.getItem('adminThemeType') as PaletteMode : 'dark' : 'dark',
  adminLoadingBar: 0,
  adminFormSubmit: false,
}


// create your reducer
const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
    // Attention! This will overwrite client state! Real apps should use proper reconciliation.

    // return {...state, ...action.payload};
    case 'SERVER_ACTION':
    // console.log("action")
    case 'CLIENT_ACTION':
    // console.log("action")
    case 'ADMIN_ACCESS_TOKEN':
      return { ...state, adminAccessToken: action.payload };
    case 'ADMIN_THEMENAME':
      return { ...state, adminThemeName: action.payload };
    case 'ADMIN_THEMETYPE':
      return { ...state, adminThemeType: action.payload };
    case 'ADMIN_LOADINGBAR':
      return { ...state, adminLoadingBar: action.payload };
    case 'ADMIN_FORM_SUBMIT':
      return { ...state, adminFormSubmit: action.payload };
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