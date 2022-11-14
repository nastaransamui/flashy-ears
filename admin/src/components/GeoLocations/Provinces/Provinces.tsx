import PropsType from 'prop-types'
import DataShow from '@/src/components/Shared/DataShow/DataShow';
import { FC } from 'react';
import PageContainer from '@/shared/PageContainer';

export interface ProvincesPropsType {

}

const Provinces: FC<ProvincesPropsType> = (props: ProvincesPropsType) => {

  return (
    <PageContainer>
      <DataShow />
    </PageContainer>
  )
}

Provinces.propTypes = {}

export default Provinces;