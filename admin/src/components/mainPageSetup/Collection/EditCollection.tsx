import { FC, Fragment } from "react";
import useSingleData from '@/hookes/useSingleData'
import editCollectionHook from './editCollectionHook';


//Components
import LookUpsPagination from "@/shared/Lookups/LookUpsPagination";
import Loading from "@/shared/Loading";
import StepsWizards from "@/shared/StepsWizard/StepsWizard";

import { CollectionFormInformation, CollectionFormImages } from './CollectionForm'


const editCollection: FC = (() => {
  const { _id, singleData } = useSingleData('edit');
  const {
    t,
    watch,
    values,
    setValue,
    setValues,
    control,
    Controller,
    getValues,
    clearErrors,
    setError,
    register,
    errors,
    validate,
    resetField,
    onSubmit,
    formTrigger,
    handleSubmit,
    imagevalidate,
    setImageValidate,
    productValidation,
    setProductValidation,
    hanldeProductsData
  } = editCollectionHook(singleData, _id);


  return (
    <Fragment>
      <StepsWizards
        steps={
          [{
            stepName: t('titles'),
            stepComponent: () =>
              <CollectionFormInformation
                watch={watch}
                values={values}
                clearErrors={clearErrors}
                setError={setError}
                register={register} errors={errors} />,
            stepId: 'titles',
            isValidated: () => validate,
            handleChange: () => { },
            values: values[0]
          },
          {
            stepName: t('media'),
            stepComponent: () => <CollectionFormImages
              watch={watch}
              resetField={resetField}
              values={values}
              register={register} errors={errors}
              setValue={setValue}
              setValues={setValues}
              control={control}
              Controller={Controller}
              getValues={getValues}
              setImageValidate={setImageValidate}
              clearErrors={clearErrors}
              setError={setError} />,
            stepId: 'media',
            isValidated: () => imagevalidate && validate,
            handleChange: () => { },
            values: values[1],
          },
          {
            stepName: t('products'),
            stepComponent: () =>
              <div>
                {singleData?.productData == undefined ? <Loading color="" /> :
                  <>
                    <LookUpsPagination
                      stepIndex={2}
                      stepId="products"
                      total={values[2].totalProducts} />
                    {JSON.stringify(values[2])}
                  </>
                }
              </div>,
            stepId: 'products',
            isValidated: () => imagevalidate && validate && productValidation,
            handleChange: () => {
              hanldeProductsData()

              setProductValidation(() => true)
            },
            values: values[2],
          },
          ]
        }
        title={t('createCollectionTitle')}
        subtitle={t('createCollectionSubTitle')}
        formId='collection-form'
        formTrigger={formTrigger}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit} />
    </Fragment>
  )
})

export default editCollection