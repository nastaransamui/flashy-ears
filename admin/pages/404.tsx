import HeadComponent from "@/src/components/head";
import { ComponentType, Fragment } from "react";
import { withTranslation, useTranslation } from "react-i18next";

import dynamic from 'next/dynamic'
import { NextPage } from "next";

const DynamicError: any = dynamic(() => import('@/src/pages/ErrorPage'), {
  ssr: false,
})

const Custom404: NextPage = (props: any) => {
  const { t, ready, i18n } = useTranslation('404');
  const errorCode = props.router.route.substring(1);
  return (
    <Fragment>
      <HeadComponent title={t('title')} />
      <DynamicError
        {...props}
        t={t}
        i18n={i18n}
        errorCode={errorCode}
        text={ready && t('title')}
      />
    </Fragment>
  );
}


export default withTranslation('404')(Custom404);

