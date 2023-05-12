import { FC } from "react";

//Hooks
import { useLocation } from "react-router-dom";
import useCurrentRouteState from '@/hookes/useCurrentRouteState';


//Components
import BackButton from '@/shared/BackButton';
import EditProduct from './EditProduct';
import CreateProduct from "./CreateProduct";
interface ProductTypes { }
const Product: FC<ProductTypes> = ((props: ProductTypes) => {
  const currentRouteState = useCurrentRouteState();
  const { search } = useLocation()

  return (
    <div style={{ marginTop: 80, wordBreak: 'break-word' }}>
      <BackButton pushUrl={currentRouteState.path} />
      <br />
      {
        search == '' ? <CreateProduct /> : <EditProduct />
      }

    </div>
  )
})

export default Product;