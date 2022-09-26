import HeadComponent from "@/src/components/head";
import { wrapper } from "@/src/redux/store";
import { Fragment } from "react";
import ErrorPage from "@/src/pages/ErrorPage";
import { withTranslation, useTranslation } from "react-i18next";
import AppWrapper from '@/src/components/Shared/AppWrapper/AppWrapper';

import dynamic from 'next/dynamic'
import { NextPage } from "next";

const DynamicError = dynamic(() => import('@/src/pages/ErrorPage'), {
  ssr: false,
})

const Custom404: NextPage = (props: any) => {
  const { t, ready, i18n } = useTranslation('404');
  const errorCode = props.router.route.substring(1);

  return (
    <Fragment>
      <HeadComponent title={t('title')} />
      <AppWrapper>
      <DynamicError
        {...props}
        t={t}
        i18n={i18n}
        errorCode={errorCode}
        text={ready && t('title')}
      />
      </AppWrapper>
    </Fragment>
  );
}


export default withTranslation('404')(Custom404);

