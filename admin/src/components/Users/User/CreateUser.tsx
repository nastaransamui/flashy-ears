import { FC, Fragment } from "react";


//hooks
import createUserHook from "./createUserHook";
import { useTranslation } from "react-i18next";

//Components
import StepsWizards from "@/shared/StepsWizard/StepsWizard";

const CreateUser: FC = (() => {
  const { values } = createUserHook();
  const { t } = useTranslation('Users')

  return (
    <Fragment>
      <StepsWizards
        steps={
          [{
            stepName: t('userdata'),
            stepComponent: () => <div>{JSON.stringify(values[0])}</div>,
            stepId: 'CreateUser',
            isValidated: () => true,
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
        subtitle="" />
    </Fragment>
  )
})

export default CreateUser;