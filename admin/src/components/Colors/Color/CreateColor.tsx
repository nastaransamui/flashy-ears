import { FC, Fragment, useEffect, useState } from "react";


//hooks
import createColorHook from "./createColorHook";

//Components
import StepsWizards from "@/shared/StepsWizard/StepsWizard";
import ColorForm from "./ColorForm";




const CreateColor: FC = (() => {
  const {
    values,
    handleSubmit,
    formTrigger,
    onSubmit,
    errors,
    register,
    setError,
    clearErrors,
    watch,
    colorSelected,
    classes,
    showSelect,
    setShowSelect,
    handleColorChange,
    t,
  } = createColorHook();

  return (
    <Fragment>
      <StepsWizards
        steps={
          [
            {
              stepName: t('colorData'),
              stepComponent: () => <ColorForm
                errors={errors}
                register={register}
                setError={setError}
                clearErrors={clearErrors}
                watch={watch}
                colorSelected={colorSelected}
                classes={classes}
                showSelect={showSelect}
                setShowSelect={setShowSelect}
                handleColorChange={handleColorChange}
                t={t}
              />,
              stepId: 'createColor',
              isValidated: () => true,
              handleChange: () => { },
              values: values[0]
            },
          ]
        }
        title={t('createColor')}
        subtitle=""
        formId='color-form'
        formTrigger={formTrigger}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit} />
    </Fragment>
  )
})

export default CreateColor;