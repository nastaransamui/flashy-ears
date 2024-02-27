import { FC, Fragment } from "react";


//hooks
import createUserHook from "./createUserHook";
import { useTranslation } from "react-i18next";

//Components
import StepsWizards from "@/shared/StepsWizard/StepsWizard";
import { UserFormInformation } from "./UserForm";

const CreateUser: FC = (() => {
  const {
    theme,
    values,
    setValues,
    setValue,
    getValues,
    setError,
    clearErrors,
    informationValidate,
    setInformationValidate,
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
    classes,
    t,
  } = createUserHook();

  return (
    <Fragment>
      <StepsWizards
        steps={
          [{
            stepName: t('userdata'),
            stepComponent: () => <UserFormInformation
              theme={theme}
              classes={classes}
              values={values}
              watch={watch}
              errors={errors}
              register={register}
              setError={setError}
              getValues={getValues}
              setValue={setValue}
              clearErrors={clearErrors}
              setValues={setValues}
              control={control}
              setInformationValidate={setInformationValidate} />,
            stepId: 'createUser',
            isValidated: () => informationValidate,
            handleChange: () => { console.log('handle change') },
            values: values[0]
          },
            // {
            //   stepName: t('rolesdata'),
            //   stepComponent: () => <div>{JSON.stringify(values[1])}</div>,
            //   stepId: 'RolesData',
            //   isValidated: () => true,
            //   handleChange: () => { console.log('handle change') },
            //   values: values[1]
            // },
            // {
            //   stepName: t('agentsData'),
            //   stepComponent: () => <div>{JSON.stringify(values[2])}</div>,
            //   stepId: 'AgentsData',
            //   isValidated: () => true,
            //   handleChange: () => { console.log('handle change') },
            //   values: values[1]
            // },
          ]
        }
        title={t('createUserProfile')}
        subtitle=""
        formId='user-form'
        formTrigger={formTrigger}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit} />
    </Fragment>
  )
})

export default CreateUser;