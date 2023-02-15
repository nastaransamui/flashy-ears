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
  productItems: [],
  dbImages: [],
};

export interface DBImagesType {
  src: string;
  model: string;
  caption_en: string;
  caption_th: string;
}

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
export interface ProductItemsImagesFrontType {
  black: string;
  blue: string;
  green: string;
  magneta: string;
  orange: string;
  pink: string;
  red: string;
  violet: string;
  white: string;
  yellow: string;
  yellowOrange: string;
}
export interface ProductItemsImagesBackType {
  black: string;
  blue: string;
  green: string;
  magneta: string;
  orange: string;
  pink: string;
  red: string;
  violet: string;
  white: string;
  yellow: string;
  yellowOrange: string;
}
export interface ProductItemsImagesType {
  front: ProductItemsImagesFrontType;
  back: ProductItemsImagesBackType;
}
export interface ProductItemsColorsType {
  label: string;
  name: string;
  _id: string;
}
export interface ProductItemsType {
  images: ProductItemsImagesType[];
  product_name: string;
  product_label_en: string;
  product_label_th: string;
  product_subtitle_en: string;
  product_subtitle_th: string;
  product__description_en: string;
  product__description_th: string;
  _id: string;
  product__price: string;
  colors: ProductItemsColorsType[];
}
export interface State {
  adminAccessToken: any;
  homeThemeName: string | null;
  homeThemeType: PaletteMode | null;
  homeLoadingBar: number;
  homeFormSubmit: boolean;
  slides: SlidesType[];
  productItems: ProductItemsType[];
  dbImages: DBImagesType[];
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
    case 'PRODUCT_ITEMS':
      return { ...state, productItems: action.payload };
    case 'DB_IMAGES':
      return { ...state, dbImages: action.payload };
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
