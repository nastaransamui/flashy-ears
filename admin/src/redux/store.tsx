// store.ts

import { AnyAction, Store, } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import { PaletteMode, } from '@mui/material';
import { hasCookie, getCookies } from 'cookies-next';
import { RoutesType } from '@/interfaces/react.interface';

export interface Profile {
  profileImage?: string;
  userName?: string;
  _id?: string;
}

export interface MuiDataType {
  type: string;
  thumbnail: string;
  filterable: boolean;
  searchable: boolean;
  icon: string;
  width?: number;
  align?: string;
}

export interface TotalDataType {
  _id: string;
  dispalyFields: string[];
  isActive?: boolean;
  muiData: MuiDataType;
  createdAt: Date;
}

export interface MainCardTypes {
  videoLink?: string;
  isYoutube?: boolean;
  youTubeId?: string;
  _id: string;
  dispalyFields: string[];
  isActive?: boolean;
  muiData: MuiDataType;
  imageShow?: string;
  iso2?: string;
  profileImage?: string;
  createdAt: Date;
  [key: string]: any
}
export interface State {
  adminAccessToken: any;
  adminThemeName: string | null;
  adminThemeType: PaletteMode | null;
  adminLoadingBar: number;
  adminFormSubmit: boolean;
  profile: Profile;
  propsMiniActive: boolean;
  updateRoutes: RoutesType[];
  spreadRoutes: RoutesType[];
  totalData: TotalDataType[];
  totalCount: number;
  deleteIds: string[];
  statusIdsUpdate: string[];
  firstSearch: boolean;
  fieldValue: string;
  expanded: { [key: string]: boolean }
  firstRow: { [key: string]: any },
  reRunSingleGet: boolean;
}

const initialState = {
  adminAccessToken: null,
  adminThemeName: typeof window !== 'undefined' ? getCookies().adminThemeName as string : 'grayscale',
  adminThemeType: typeof window !== 'undefined' ? getCookies().adminThemeType as PaletteMode : 'dark',
  adminLoadingBar: 0,
  adminFormSubmit: false,
  profile: {},
  propsMiniActive: false,
  updateRoutes: [],
  spreadRoutes: [],
  totalData: [],
  totalCount: 0,
  deleteIds: [],
  statusIdsUpdate: [],
  firstSearch: false,
  //Search header field value select 
  fieldValue: '',
  expanded: {},
  firstRow: {},
  reRunSingleGet: false,
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
    case 'UPDATE_ROUTES':
      return { ...state, updateRoutes: action.payload };
    case 'SPREAD_ROUTES':
      return { ...state, spreadRoutes: action.payload };
    case 'TOTAL_DATA':
      return { ...state, totalData: action.payload };
    case 'TOTAL_COUNT':
      return { ...state, totalCount: action.payload };
    case 'DELETE_IDS':
      return { ...state, deleteIds: action.payload };
    case 'STATUS_IDS_UPDATE':
      return { ...state, statusIdsUpdate: action.payload };
    case 'FIRST_SEARCH':
      return { ...state, firstSearch: action.payload };
    case 'FIELD_VALUE':
      return { ...state, fieldValue: action.payload };
    case 'EXPANDED':
      return { ...state, expanded: action.payload };
    case 'FIRST_ROW':
      return { ...state, firstRow: action.payload };
    case 'RERUN_SINGLE_GET':
      return { ...state, reRunSingleGet: action.payload };
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