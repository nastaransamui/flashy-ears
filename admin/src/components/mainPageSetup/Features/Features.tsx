import PropsType from 'prop-types'
import DataShow from '@/src/components/Shared/DataShow/DataShow';
import { FC } from 'react';
import PageContainer from '@/shared/PageContainer';

export interface FeaturesPropsType {

}

const Features: FC<FeaturesPropsType> = (props: FeaturesPropsType) => {

  return (
    <PageContainer>
      <DataShow />
    </PageContainer>
  )
}

Features.propTypes = {}

export default Features;