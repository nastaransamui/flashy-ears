
import { FC, Fragment } from "react";

//Hooks
import useSingleData from '@/hookes/useSingleData'
import editProductHook from "./editProductHook";
import { useTranslation } from "react-i18next";

//Components

import StepsWizards from "@/shared/StepsWizard/StepsWizard";
import { ProductsFormFirst } from "./ProductForm";

import Loading from "@/shared/Loading";

const EditProduct: FC = (() => {

  const { _id, singleData } = useSingleData('edit');
  const {
    values,
    handleSubmit,
    formTrigger,
    onSubmit,
    errors,
    register,
    watch,
    classes,
    t,
  } = editProductHook(singleData)


  return (
    <Fragment>
      <StepsWizards
        steps={
          [
            {
              stepName: t('productData'),
              stepComponent: () => <div></div>,
              stepId: 'editProduct',
              isValidated: () => true,
              handleChange: () => { },
              values: values[0]
            },
          ]
        }
        title={t('editProduct')}
        subtitle=""
        formId='product-form'
        formTrigger={formTrigger}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit} />
    </Fragment>
  )
});

export default EditProduct;