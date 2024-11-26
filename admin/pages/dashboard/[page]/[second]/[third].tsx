import { Fragment } from 'react';
import type { NextPage } from 'next';
import { wrapper, } from '@/src/redux/store';
import { GetServerSideProps } from 'next'
import { hasCookie, getCookies } from 'cookies-next';
import { useTranslation, withTranslation } from 'react-i18next';
import HeadComponent from '@/src/components/head';
import { setPageCookies } from '@/helpers/functions';
import dynamic from 'next/dynamic';
import useRoutesUpdate from '@/src/components/Hooks/useRoutesUpdate';
import { getFirstRow } from 'apiCalls/getFirstRow';
import { getHomeTheme } from 'apiCalls/getHomeTheme';
import { ITheme } from 'homeModels/Theme';

const DynamicDashboard: any = dynamic(() => import('@/src/pages/dashboard/Dashboard'), {
  ssr: false,
})


const Doshboard: NextPage = (props) => {
  const { t, i18n } = useTranslation('dashboard');
  const updateRoutes = useRoutesUpdate()

  return (
    <Fragment>
      <HeadComponent title={t('title')} />
      {updateRoutes.length !== 0 && <DynamicDashboard  {...props} routes={updateRoutes} />}
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const firstRow = await getFirstRow(getCookies(ctx).adminAccessToken!);
    const homeTheme: ITheme = await getHomeTheme();
    let props = {}
    props = {
      ...(await setPageCookies(ctx as any, store as any)),
      ...(store.dispatch({
        type: 'FIRST_ROW',
        payload: firstRow,
      })),
      ...(store.dispatch({
        type: 'HOME_THEMENAME',
        payload: homeTheme?.['name'],
      })),
      ...(store.dispatch({
        type: 'HOME_PAGE_TYPE',
        payload: homeTheme?.['homePageType'],
      })),
    }
    if (!hasCookie('adminAccessToken', ctx)) {
      return {
        redirect: {
          permanent: false,
          source: '/admin',
          destination: '/',
        }
      }
    } else {
      return {
        props
      }
    }
  }
)
export default withTranslation(['dashboard'])(Doshboard);