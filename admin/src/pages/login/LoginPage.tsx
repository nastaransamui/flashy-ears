import * as i18n from 'i18next';
import LoginForm from '@/src/components/Auth/LoginForm';

import AuthFrame from "@/src/components/Auth/AuthFrame";
import { FC } from 'react';
import AppWrapper from '@/src/components/Shared/AppWrapper/AppWrapper';
import { useTranslation } from 'react-i18next';
interface Props {
  t: i18n.TFunction;
}

const Login: FC<Props> = (props: any) => {

  const { t } = useTranslation();

  return (
    <div>
      <AppWrapper>
        <AuthFrame
          title={t('login_title')}
          subtitle={t('login_subtitle')}
          {...props}>
          <LoginForm {...props} />
        </AuthFrame>
      </AppWrapper>
    </div>
  )
}

export default Login;