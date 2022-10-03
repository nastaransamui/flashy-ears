import { NextPageContext } from 'next';
import { getCookies, hasCookie, setCookie } from 'cookies-next';
import { unHashProfile } from './unhasshing';

export function isObjectEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

export async function setPageCookies(ctx: NextPageContext, store: any) {
  const profile: any = unHashProfile(
    getCookies(ctx)?.adminAccessToken as string
  );

  !hasCookie('adminThemeType') && setCookie('adminThemeType', 'dark', ctx);
  !hasCookie('adminThemeName') && setCookie('adminThemeName', 'cloud', ctx);

  return {
    ...(await store.dispatch({
      type: 'ADMIN_ACCESS_TOKEN',
      payload: getCookies(ctx).adminAccessToken || null,
    })),
    ...(await store.dispatch({
      type: 'ADMIN_THEMETYPE',
      payload: getCookies(ctx).adminThemeType,
    })),
    ...(await store.dispatch({
      type: 'ADMIN_PROFILE',
      payload: profile.err ? {} : profile,
    })),
    ...(await store.dispatch({
      type: 'ADMIN_THEMENAME',
      payload: getCookies(ctx).adminThemeName,
    })),
  };
}
