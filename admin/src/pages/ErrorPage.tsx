import PropTypes from 'prop-types'
import Error from '@/src/components/ErrorPage/Error'
import * as i18n from 'i18next'
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import AppWrapper from '@/src/components/Shared/AppWrapper/AppWrapper';


interface Props {
  t: i18n.TFunction;
  i18n: i18n.Module;
  errorCode: string
}

const ErrorPage: FC<Props> = (props: any) => {
  const { t, errorCode } = props;
  const { i18n } = useTranslation();
  return (
    <AppWrapper>
      <Error
        {...props}
        t={t}
        i18n={i18n}
        errorCode={errorCode}
        text={t('title')}
        type="next"
      />
    </AppWrapper>
  );
};

ErrorPage.propTypes = {
  t: PropTypes.func.isRequired,
  errorCode: PropTypes.string.isRequired
};

export default ErrorPage;