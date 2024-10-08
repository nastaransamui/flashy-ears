
import { FC, Fragment } from "react";

//Hooks
import useSingleData from '@/hookes/useSingleData'
import editColorHook from "./editColorHook";
import { useTranslation } from "react-i18next";

//Components
import LookUpsPagination from "@/shared/Lookups/LookUpsPagination";
import StepsWizards from "@/shared/StepsWizard/StepsWizard";
import ColorForm from "./ColorForm";

import Loading from "@/shared/Loading";
import { CollectionFormProduct } from "../../mainPageSetup/Collection/CollectionForm";

const EditColor: FC = (() => {

  const { _id, singleData } = useSingleData('edit');
  const {
    values,
    handleSubmit,
    formTrigger,
    onSubmit,
    getValues,
    errors,
    setError,
    clearErrors,
    register,
    watch,
    colorSelected,
    classes,
    showSelect,
    setShowSelect,
    handleColorChange,
    hanldeProductsData,
    t,
    i18n,
    validate
  } = editColorHook(singleData)

  return (
    <Fragment>
      <StepsWizards
        steps={
          [
            {
              stepName: t('colorData'),
              stepComponent: () => <ColorForm
                clearErrors={clearErrors}
                setError={setError}
                errors={errors}
                register={register}
                watch={watch}
                colorSelected={colorSelected}
                classes={classes}
                showSelect={showSelect}
                setShowSelect={setShowSelect}
                handleColorChange={handleColorChange}
                t={t}
              />,
              stepId: 'editColor',
              isValidated: () => validate,
              handleChange: () => { },
              values: values[0]
            },
            {
              stepName: t('products'),
              stepComponent: () =>
                <div>
                  {singleData?.productData == undefined ? <Loading color="" /> :
                    <>
                      <LookUpsPagination
                        stepIndex={0}
                        stepId="productData"
                        total={values[1].totalProducts} />
                      <CollectionFormProduct
                        total={values[1]['totalProducts']}
                        productData={values[1]['productData']} />
                    </>
                  }
                </div>,
              stepId: 'products',
              isValidated: () => true,
              handleChange: () => {
                hanldeProductsData()

                // setProductValidation(() => true)
              },
              values: values[1],
            },
          ]
        }
        title={getValues(`label_${i18n.language}`) || t('editColor')}
        subtitle={t('editColor')}
        formId='color-form'
        formTrigger={formTrigger}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit} />
    </Fragment>
  )
});

export default EditColor;