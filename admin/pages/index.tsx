import { Fragment } from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation, withTranslation } from 'react-i18next';
import { wrapper, } from '@/src/redux/store';
import { GetServerSideProps } from 'next'

import HeadComponent from '@/src/components/head';
import { hasCookie, getCookies } from 'cookies-next';
import dynamic from 'next/dynamic'
import jwt from 'jsonwebtoken';
import { unHashProfile } from '@/helpers/unhasshing';
import { isObjectEmpty, setPageCookies } from '@/helpers/functions';
import { getFirstRow } from 'apiCalls/getFirstRow';
const DynamicLogin = dynamic(() => import('@/src/pages/login/LoginPage'), {
  ssr: false,
})

const Admin: NextPage = (props) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <HeadComponent title={t('title_login')} />
      <DynamicLogin t={t}  {...props} />
    </Fragment>
  );
};


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    let props = {}
    if (!isObjectEmpty(getCookies(ctx))) {
      const firstRow = await getFirstRow(getCookies(ctx).adminAccessToken!);
      props = {
        ...(await setPageCookies(ctx as any, store as any)),
        ...(store.dispatch({
          type: 'FIRST_ROW',
          payload: firstRow,
        })),
      }
    }
    if (hasCookie('adminAccessToken', ctx)) {
      return {
        redirect: {
          permanent: false,
          source: '/admin',
          destination: '/dashboard',
        }
      }
    } else {
      return {
        props
      }
    }
  }
)
export default withTranslation(['common'])(Admin);
