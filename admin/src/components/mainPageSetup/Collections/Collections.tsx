import PropsType from 'prop-types'
import DataShow from '@/src/components/Shared/DataShow/DataShow';
import { FC } from 'react';
import PageContainer from '@/shared/PageContainer';

export interface CollectionsPropsType {

}

const Collections: FC<CollectionsPropsType> = (props: CollectionsPropsType) => {

  return (
    <PageContainer>
      <DataShow />
    </PageContainer>
  )
}

Collections.propTypes = {}

export default Collections;