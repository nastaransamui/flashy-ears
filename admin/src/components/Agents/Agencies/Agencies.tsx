import PropsType from 'prop-types'
import DataShow from '@/src/components/Shared/DataShow/DataShow';
import { FC } from 'react';
import PageContainer from '@/shared/PageContainer';

export interface AgenciesPropsType {

}

const Agencies: FC<AgenciesPropsType> = (props: AgenciesPropsType) => {

  return (
    <PageContainer>
      <DataShow />
    </PageContainer>
  )
}

Agencies.propTypes = {}

export default Agencies;