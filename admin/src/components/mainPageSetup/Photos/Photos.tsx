import PropsType from 'prop-types'
import DataShow from '@/src/components/Shared/DataShow/DataShow';
import { FC } from 'react';
import PageContainer from '@/shared/PageContainer';

export interface PhotosPropsType {

}

const Photos: FC<PhotosPropsType> = (props: PhotosPropsType) => {

  return (
    <PageContainer>
      <DataShow />
    </PageContainer>
  )
}

Photos.propTypes = {}

export default Photos;