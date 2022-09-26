import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation, withTranslation } from 'react-i18next';
import { wrapper, } from '@/src/redux/store';
import { GetServerSideProps } from 'next'

import HeadComponent from '@/src/components/head';
import AppWrapper from '@/src/components/Shared/AppWrapper/AppWrapper';
import Login from '@/src/pages/login/LoginPage';
import { hasCookie, getCookies } from 'cookies-next';
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const DynamicLogin = dynamic(() => import('@/src/pages/login/LoginPage'), {
  ssr: false,
})

const Admin: NextPage = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
    <HeadComponent title={t('title_login')} />
      <AppWrapper>
        {/* <Suspense fallback={`Loading...`}> */}
          <DynamicLogin t={t}  {...props} />
        {/* </Suspense> */}
      </AppWrapper>
    </React.Fragment>
  );
};


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    return {
      props: {
        adminAccessToken: null,
        ...(await store.dispatch({
          type: 'ADMIN_ACCESS_TOKEN',
          payload: null,
        })),
      }
    }
  }
)
export default withTranslation(['common'])(Admin);
