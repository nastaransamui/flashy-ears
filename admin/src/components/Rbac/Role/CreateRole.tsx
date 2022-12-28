import { FC, Fragment } from "react";

//Hooks
import { useTranslation } from "react-i18next";
import createRoleHook from "./createRoleHook";

//Components
import StepsWizards from "@/shared/StepsWizard/StepsWizard";


const CreateRole: FC = (() => {
  const { values } = createRoleHook();
  const { t } = useTranslation('Roles')
  return (
    <StepsWizards
      steps={
        [{
          stepName: t('name'),
          stepComponent: () => <div>{JSON.stringify(values[0])}</div>,
          stepId: 'name',
          isValidated: () => true,
          handleChange: () => { console.log('handle change') },
          values: values[0]
        },
        {
          stepName: t('routes'),
          stepComponent: () => <div>{JSON.stringify(values[1])}</div>,
          stepId: 'routes',
          isValidated: () => true,
          handleChange: () => { console.log('handle change') },
          values: values[1]
        },
        {
          stepName: t('crud'),
          stepComponent: () => <div>{JSON.stringify(values[2])}</div>,
          stepId: 'crud',
          isValidated: () => true,
          handleChange: () => { console.log('handle change') },
          values: values[2]
        },
        ]
      }
      title={t('createRouteSubTitle')}
      subtitle={t('createRouteSubTitle')} />
  )
})

export default CreateRole;