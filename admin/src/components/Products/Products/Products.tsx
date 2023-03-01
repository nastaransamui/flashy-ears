import PropsType from 'prop-types'
import DataShow from '@/src/components/Shared/DataShow/DataShow';
import { FC } from 'react';
import PageContainer from '@/shared/PageContainer';

export interface ProductsPropsType {

}

const Products: FC<ProductsPropsType> = (props: ProductsPropsType) => {

  return (
    <PageContainer>
      <DataShow />
    </PageContainer>
  )
}

Products.propTypes = {}

export default Products;