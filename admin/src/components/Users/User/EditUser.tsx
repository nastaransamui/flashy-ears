import { FC, Fragment } from "react";

//Hooks
import useSingleData from '@/hookes/useSingleData'
import editUserHook from "./editUserHook";
import { useTranslation } from "react-i18next";

//Components

import StepsWizards from "@/shared/StepsWizard/StepsWizard";

import Loading from "@/shared/Loading";
import LookUpsPagination from "@/shared/Lookups/LookUpsPagination";

const EditUser: FC = (() => {

  const { _id, singleData } = useSingleData('edit');
  const { values,
    handleRolesdataChange,
    handleAgentsDataChange,
    handleSubmit,
    formTrigger,
    onSubmit } = editUserHook(singleData)

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
            handleChange: () => { },
            values: values[0]
          },
          {
            stepName: t('rolesdata'),
            stepComponent: () => <div>{singleData?.roleData == undefined ? <Loading color="" /> : JSON.stringify(values[1])}</div>,
            stepId: 'RolesData',
            isValidated: () => true,
            handleChange: () => {
              handleRolesdataChange()
            },
            values: values[1]
          },
          {
            stepName: t('agentsData'),
            stepComponent: () => <div>
              {singleData?.agentsData == undefined ? <Loading color="" /> :
                <>
                  <LookUpsPagination stepIndex={0} stepId='agentsData' total={values[2].totalAgents} />
                  {JSON.stringify(values[2])}
                </>}
            </div>,
            stepId: 'AgentsData',
            isValidated: () => true,
            handleChange: () => {
              handleAgentsDataChange()
            },
            values: values[1]
          },
          ]
        }
        title={t('editUserProfile')}
        subtitle=""
        formId='agency-form'
        formTrigger={formTrigger}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit} />
    </Fragment>
  )
});

export default EditUser;