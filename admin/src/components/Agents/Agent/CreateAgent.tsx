import { FC, Fragment } from "react";


//hooks
import createAgentHook from "./createAgentHook";
import { useTranslation } from "react-i18next";

//Components
import StepsWizards from "@/shared/StepsWizard/StepsWizard";

const CreateUser: FC = (() => {
  const {
    values,
    handleSubmit,
    formTrigger,
    onSubmit,
  } = createAgentHook();
  const { t } = useTranslation('Agencies')

  return (
    <Fragment>
      <StepsWizards
        steps={
          [
            {
              stepName: t('agentData'),
              stepComponent: () => <div>{JSON.stringify(values[0])}</div>,
              stepId: 'createAgent',
              isValidated: () => true,
              handleChange: () => { },
              values: values[0]
            },
            {
              stepName: t('contactData'),
              stepComponent: () => <div>{JSON.stringify(values[1])}</div>,
              stepId: 'contactData',
              isValidated: () => true,
              handleChange: () => { },
              values: values[1]
            },
            {
              stepName: t('financialData'),
              stepComponent: () => <div>{JSON.stringify(values[2])}</div>,
              stepId: 'financialData',
              isValidated: () => true,
              handleChange: () => { },
              values: values[2]
            },
            {
              stepName: t('acountManagerData'),
              stepComponent: () => <div>{JSON.stringify(values[3])}</div>,
              stepId: 'acountManagerData',
              isValidated: () => true,
              handleChange: () => { },
              values: values[3]
            },
          ]
        }
        title={t('createAgent')}
        subtitle=""
        formId='agency-form'
        formTrigger={formTrigger}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit} />
    </Fragment>
  )
})

export default CreateUser;