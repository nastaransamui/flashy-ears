import { AnyAction, Store } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import { PaletteMode } from '@mui/material';
import { hasCookie, getCookies } from 'cookies-next';
import { getHomeTheme } from 'apiCalls/getHomeTheme';
import { ImageCollectionType } from '@/models/Collections';
import { Image as ImageGalleryType } from 'react-grid-gallery';
//@ts-ignore
const homeTheme = await getHomeTheme();

const initialState = {
  homePageType: homeTheme?.['homePageType'],
  adminAccessToken: null,
  homeThemeName: homeTheme?.['name'],
  homeThemeType:
    typeof window !== 'undefined'
      ? (getCookies().homeThemeType as PaletteMode)
      : 'dark',
  homeLoadingBar: 0,
  homeFormSubmit: false,
  slides: [],
  productItems: [],
  collectionItems: [],
  dbImages: [],
};

export interface DBImagesType {
  _id: string;
  product_label_en: string;
  product_label_th: string;
  product_name_en: string;
  collectionData: any;
  gallery: ImageGalleryType[];
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
  product_name_en: string;
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

export interface CollectionItemsType {
  _id: string;
  title_en: string;
  title_th: string;
  img_light: ImageCollectionType;
  img_dark: ImageCollectionType;
  desc_en: string;
  desc_th: string;
  linkTitle_en: string;
  linkTitle_th: string;
  products_id: string[];
}

export interface State {
  homePageType: string;
  adminAccessToken: any;
  homeThemeName: string | null;
  homeThemeType: PaletteMode | null;
  homeLoadingBar: number;
  homeFormSubmit: boolean;
  slides: SlidesType[];
  productItems: ProductItemsType[];
  collectionItems: CollectionItemsType[];
  dbImages: DBImagesType[];
}

const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    // return { ...state };
    // // case 'SERVER_ACTION':
    // // case 'CLIENT_ACTION':
    case 'HOME_PAGE_TYPE':
      return { ...state, homePageType: action.payload };
    case 'ADMIN_ACCESS_TOKEN':
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
    case 'COLLECTION_ITEMS':
      return { ...state, collectionItems: action.payload };
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
