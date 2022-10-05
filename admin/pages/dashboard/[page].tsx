import { Fragment } from 'react';
import type { NextPage } from 'next';
import { wrapper, } from '@/src/redux/store';
import { GetServerSideProps } from 'next'
import { hasCookie, getCookies, } from 'cookies-next';
import { useTranslation, withTranslation } from 'react-i18next';
import HeadComponent from '@/src/components/head';
import { isObjectEmpty, setPageCookies } from '@/helpers/functions';
import dynamic from 'next/dynamic';
import routes from '../../routes';

const DynamicDashboard = dynamic(() => import('@/src/pages/dashboard/Dashboard'), {
  ssr: false,
})


const Doshboard: NextPage = (props) => {
  const { t, i18n } = useTranslation('dashboard');


  return (
    <Fragment>
      <HeadComponent title={t('title')} />
      <DynamicDashboard  {...props} routes={routes} />
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    let props = {}
    // if (!isObjectEmpty(getCookies(ctx))) {
    props = {
      ...(await setPageCookies(ctx as any, store as any))
      // }
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