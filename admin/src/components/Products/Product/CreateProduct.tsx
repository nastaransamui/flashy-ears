
import { FC, Fragment, useEffect, useState } from "react";


//hooks
import createProductHook from "./createProductHook";

//Components
import StepsWizards from "@/shared/StepsWizard/StepsWizard";
import {
  ProductsFormInformation,
  ProductsFormColor,
  ProductsFormFinancial,
  ProductsFormImages,
  ProductsFormGallery
} from "./ProductForm";
import Loading from "@/shared/Loading";
const CreateProduct: FC = (() => {
  const {
    theme,
    values,
    colorArray,
    collectionArray,
    setValues,
    getValues,
    setError,
    clearErrors,
    setFinancialValidation,
    financialValidation,
    setValue,
    setImagesValidation,
    informationValidate,
    setInformationValidate,
    colorValidation,
    setColorValidation,
    imagesValidation,
    galleryValidation,
    setGalleryValidation,
    getAllColors,
    handleSubmit,
    formTrigger,
    onSubmit,
    errors,
    register,
    unregister,
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
              stepComponent: () => <ProductsFormInformation
                values={values}
                watch={watch}
                errors={errors}
                register={register}
                setError={setError}
                getValues={getValues}
                clearErrors={clearErrors}
                setInformationValidate={setInformationValidate} />,
              stepId: 'createProduct',
              isValidated: () => informationValidate,
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
                      <ProductsFormColor
                        unregister={unregister}
                        resetField={resetField}
                        setFinancialValidation={setFinancialValidation}
                        colorArray={colorArray}
                        collectionArray={collectionArray}
                        setColorValidation={setColorValidation}
                        values={values}
                        setValues={setValues}
                        setValue={setValue}
                        getValues={getValues}
                        watch={watch}
                        errors={errors}
                        setError={setError}
                        clearErrors={clearErrors}
                        register={register}
                        Controller={Controller}
                        control={control}
                        componentType="create" />
                  }
                </Fragment>,
              stepId: 'createColors',
              isValidated: () => colorValidation,
              handleChange: () => {
                if (colorArray == null || typeof colorArray == 'string' || collectionArray == null || typeof collectionArray == 'string') {
                  getAllColors();
                }
              },
              values: values[1]
            },
            {
              stepName: t('productFinancial'),
              stepComponent: () =>
                <Fragment>
                  {
                    <ProductsFormFinancial
                      colorArray={colorArray}
                      unregister={unregister}
                      getValues={getValues}
                      values={values}
                      setValues={setValues}
                      clearErrors={clearErrors}
                      setValue={setValue}
                      setError={setError}
                      watch={watch}
                      errors={errors}
                      register={register}
                      Controller={Controller}
                      control={control}
                      setFinancialValidation={setFinancialValidation} />
                  }
                </Fragment>,
              stepId: 'createFinancial',
              isValidated: () => financialValidation,
              handleChange: () => { },
              values: values[2]
            }, {
              stepName: t('productImages'),
              stepComponent: () => <ProductsFormImages
                componentType="create"
                resetField={resetField}
                colorArray={colorArray}
                unregister={unregister}
                values={values}
                setError={setError}
                setValues={setValues}
                getValues={getValues}
                setValue={setValue}
                setImagesValidation={setImagesValidation}
                watch={watch}
                errors={errors}
                register={register}
                Controller={Controller}
                control={control} />,
              stepId: 'createImage',
              isValidated: () => informationValidate && colorValidation && imagesValidation,
              handleChange: () => { },
              values: values[2]
            }, {
              stepName: t('productGallery'),
              stepComponent: () => <ProductsFormGallery
                resetField={resetField}
                values={values}
                setValues={setValues}
                setValue={setValue}
                getValues={getValues}
                setGalleryValidation={setGalleryValidation}
                watch={watch}
                errors={errors}
                clearErrors={clearErrors}
                setError={setError}
                register={register}
                Controller={Controller}
                control={control} />,
              stepId: 'createGalery',
              isValidated: () => informationValidate && colorValidation && imagesValidation && galleryValidation,
              handleChange: () => { },
              values: values[3]
            },
          ]
        }
        title={getValues('product_label_en') || t('createProduct')}
        subtitle=""
        formId='product-form'
        formTrigger={formTrigger}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit} />
    </Fragment>
  )
})
export default CreateProduct;