
import { applyMiddleware, createStore, AnyAction } from 'redux';

import promiseMiddleware from 'redux-promise-middleware';
import { HYDRATE } from 'next-redux-wrapper';

export interface State {
    adminAccessToken: any;
    adminThemeName: string;
    adminThemeType: string;
    adminLoadingBar: number;
    adminFormSubmit: boolean;
}

const initialState = {
    adminAccessToken: null,
    adminLoadingBar: 0,
    adminThemeName: 'grayscale',
    adminThemeType: 'dark',
    adminFormSubmit: false,
}

export const reducer = (state: State = initialState, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
        // return {...state, ...action.payload};
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

export const makeStore = () => createStore(reducer, undefined, applyMiddleware(promiseMiddleware));

