import * as i18n from 'i18next';
import LoginForm from '@/src/components/Auth/LoginForm';

import AuthFrame from "@/src/components/Auth/AuthFrame";
import { FC } from 'react';

interface Props {
  t: i18n.TFunction;
}

const Login: FC<Props> = (props: any) => {

  const { t } = props;

  return (
    <div>
      <AuthFrame
        title={t('login_title')}
        subtitle={t('login_subtitle')}
        {...props}>
        <LoginForm {...props} />
      </AuthFrame>
    </div>
  )
}

export default Login;