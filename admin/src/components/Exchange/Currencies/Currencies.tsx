import PropsType from 'prop-types';
import DataShow from '@/src/components/Shared/DataShow/DataShow';
import { FC } from 'react';
import PageContainer from '@/shared/PageContainer';

export interface CurrenciesPropsType {}

const Currencies: FC<CurrenciesPropsType> = (props: CurrenciesPropsType) => {
  return (
    <PageContainer>
      <DataShow />
    </PageContainer>
  );
};

Currencies.propTypes = {};

export default Currencies;
