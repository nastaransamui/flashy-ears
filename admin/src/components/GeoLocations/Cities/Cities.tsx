import PropsType from 'prop-types'
import DataShow from '@/src/components/Shared/DataShow/DataShow';
import { FC } from 'react';
import PageContainer from '@/shared/PageContainer';

export interface CitiesPropsType {

}

const Cities: FC<CitiesPropsType> = (props: CitiesPropsType) => {

  return (
    <PageContainer>
      <DataShow />
    </PageContainer>
  )
}

Cities.propTypes = {}

export default Cities;