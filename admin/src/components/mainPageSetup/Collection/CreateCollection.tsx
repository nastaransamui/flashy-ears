import { FC } from "react";

//Hooks

import createCollectionHook from "./createCollectionHook";
import { CollectionFormInformation, CollectionFormImages } from './CollectionForm'

//Components
import StepsWizards from "@/shared/StepsWizard/StepsWizard";

const CreateCollection: FC = (() => {
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
    setImageValidate
  } = createCollectionHook();

  return (
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
        ]
      }
      title={t('createCollectionTitle')}
      subtitle={t('createCollectionSubTitle')}
      formId='collection-form'
      formTrigger={formTrigger}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit} />
  )
})

export default CreateCollection;