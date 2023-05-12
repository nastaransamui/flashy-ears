
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

const EditColor: FC = (() => {

  const { _id, singleData } = useSingleData('edit');
  const {
    values,
    handleSubmit,
    formTrigger,
    onSubmit,
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
                        stepIndex={1}
                        stepId="products"
                        total={values[1].totalProducts} />
                      {JSON.stringify(values[1])}
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
        title={t('editColor')}
        subtitle=""
        formId='color-form'
        formTrigger={formTrigger}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit} />
    </Fragment>
  )
});

export default EditColor;