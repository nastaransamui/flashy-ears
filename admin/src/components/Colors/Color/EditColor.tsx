
import { FC, Fragment } from "react";

//Hooks
import useSingleData from '@/hookes/useSingleData'
import editColorHook from "./editColorHook";
import { useTranslation } from "react-i18next";

//Components

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
    register,
    watch,
    colorSelected,
    classes,
    showSelect,
    setShowSelect,
    handleColorChange,
    t,
  } = editColorHook(singleData)


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
                watch={watch}
                colorSelected={colorSelected}
                classes={classes}
                showSelect={showSelect}
                setShowSelect={setShowSelect}
                handleColorChange={handleColorChange}
                t={t}
              />,
              stepId: 'editColor',
              isValidated: () => true,
              handleChange: () => { },
              values: values[0]
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