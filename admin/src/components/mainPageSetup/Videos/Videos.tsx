import PropsType from 'prop-types'
import DataShow from '@/src/components/Shared/DataShow/DataShow';
import { FC } from 'react';
import PageContainer from '@/shared/PageContainer';

export interface VideosPropsType {

}

const Videos: FC<VideosPropsType> = (props: VideosPropsType) => {

  return (
    <PageContainer>
      <DataShow />
    </PageContainer>
  )
}

Videos.propTypes = {}

export default Videos;