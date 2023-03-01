import { FC, Fragment, useEffect, useState } from "react";


//hooks
import createProductHook from "./createProductHook";

//Components
import StepsWizards from "@/shared/StepsWizard/StepsWizard";
import { ProductsFormFirst, ProductsFormSecond, ProductsFormThird } from "./ProductForm";
import Loading from "../../Shared/Loading";




const CreateProduct: FC = (() => {
  const {
    theme,
    values,
    colorArray,
    collectionArray,
    setValues,
    validate,
    secondValidate,
    thirdValidate,
    getAllColors,
    handleSubmit,
    formTrigger,
    onSubmit,
    errors,
    register,
    watch,
    Controller,
    control,
    resetField,
    t,
  } = createProductHook();

  return (
    <Fragment>
      <StepsWizards
        steps={
          [
            {
              stepName: t('productData'),
              stepComponent: () => <ProductsFormFirst
                values={values[0]}
                watch={watch}
                errors={errors}
                register={register} />,
              stepId: 'createProduct',
              isValidated: () => validate,
              handleChange: () => {
                if (colorArray == null || typeof colorArray == 'string' || collectionArray == null || typeof collectionArray == 'string') {
                  getAllColors();
                }
              },
              values: values[0]
            }, {
              stepName: t('productColors'),
              stepComponent: () =>
                <Fragment>
                  {
                    colorArray == null || collectionArray == null ?
                      <Loading color={theme.palette.secondary.main} /> :
                      <ProductsFormSecond
                        colorArray={colorArray}
                        collectionArray={collectionArray}
                        values={values}
                        setValues={setValues}
                        watch={watch}
                        errors={errors}
                        register={register}
                        Controller={Controller}
                        control={control} />
                  }
                </Fragment>,
              stepId: 'createColors',
              isValidated: () => secondValidate,
              handleChange: () => {
                if (colorArray == null || typeof colorArray == 'string' || collectionArray == null || typeof collectionArray == 'string') {
                  getAllColors();
                }
              },
              values: values[1]
            }, {
              stepName: t('productImages'),
              stepComponent: () => <ProductsFormThird
                resetField={resetField}
                values={values}
                setValues={setValues}
                watch={watch}
                errors={errors}
                register={register}
                Controller={Controller}
                control={control} />,
              stepId: 'createImage',
              isValidated: () => validate && secondValidate && thirdValidate,
              handleChange: () => {
                console.log('second')
              },
              values: values[2]
            },
          ]
        }
        title={t('createProduct')}
        subtitle=""
        formId='product-form'
        formTrigger={formTrigger}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit} />
    </Fragment>
  )
})

export default CreateProduct;