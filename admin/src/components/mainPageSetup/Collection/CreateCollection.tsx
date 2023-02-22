import { FC } from "react";

//Hooks

import createCollectionHook from "./createCollectionHook";
import { CollectionFormFirst, CollectionFormSecond } from './CollectionForm'

//Components
import StepsWizards from "@/shared/StepsWizard/StepsWizard";

const CreateCollection: FC = (() => {
  const {
    t,
    watch,
    values,
    clearErrors,
    setError,
    register,
    errors,
    validate,
    resetField,
    onSubmit,
    formTrigger,
    handleSubmit } = createCollectionHook();

  return (
    <StepsWizards
      steps={
        [{
          stepName: t('titles'),
          stepComponent: () =>
            <CollectionFormFirst
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
          stepComponent: () => <CollectionFormSecond
            watch={watch}
            resetField={resetField}
            values={values}
            register={register} errors={errors} />,
          stepId: 'media',
          isValidated: () => true,
          handleChange: () => { console.log(`handle ${t('titles')} change`) },
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