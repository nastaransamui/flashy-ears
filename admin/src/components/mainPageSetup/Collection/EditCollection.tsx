import { FC, Fragment } from "react";
import useSingleData from '@/hookes/useSingleData'
import editCollectionHook from './editCollectionHook';


//Components

import StepsWizards from "@/shared/StepsWizard/StepsWizard";

import { CollectionFormFirst, CollectionFormSecond } from './CollectionForm'


const editCollection: FC = (() => {
  const { _id, singleData } = useSingleData('edit');
  const {
    values,
    t,
    setError,
    clearErrors,
    watch,
    register,
    errors,
    validate,
    resetField,
    onSubmit,
    handleSubmit,
    formTrigger
  } = editCollectionHook(singleData, _id);


  return (
    <Fragment>
      <StepsWizards
        steps={
          [{
            stepName: t('titles'),
            stepComponent: () =>
              <CollectionFormFirst
                setError={setError}
                clearErrors={clearErrors}
                watch={watch}
                values={values}
                register={register}
                errors={errors} />,
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
            handleChange: () => { },
            values: values[1],
          },
          ]
        }
        title={t('createCollectionTitle')}
        subtitle={t('createCollectionSubTitle')}
        formId='collection-form'
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        formTrigger={formTrigger} />
    </Fragment>
  )
})

export default editCollection