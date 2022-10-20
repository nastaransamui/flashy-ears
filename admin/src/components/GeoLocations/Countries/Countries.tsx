import PropsType from 'prop-types'
import DataShow from '@/src/components/Shared/DataShow/DataShow';
import { FC } from 'react';
import PageContainer from '@/shared/PageContainer';

export interface CountriesPropsType {

}

const Countries: FC<CountriesPropsType> = (props: CountriesPropsType) => {

  return (
    <PageContainer>
      <DataShow />
    </PageContainer>
  )
}

Countries.propTypes = {}

export default Countries;