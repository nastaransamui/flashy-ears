import PropsType from 'prop-types'
import DataShow from '@/src/components/Shared/DataShow/DataShow';
import { FC } from 'react';
import PageContainer from '@/shared/PageContainer';

export interface ColorsPropsType {

}

const Colors: FC<ColorsPropsType> = (props: ColorsPropsType) => {

  return (
    <PageContainer>
      <DataShow />
    </PageContainer>
  )
}

Colors.propTypes = {}

export default Colors;