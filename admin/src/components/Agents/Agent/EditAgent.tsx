
import { FC, Fragment } from "react";

//Hooks
import useSingleData from '@/hookes/useSingleData'
import editAgentHook from "./editAgentHook";
import { useTranslation } from "react-i18next";

//Components

import StepsWizards from "@/shared/StepsWizard/StepsWizard";

import Loading from "@/shared/Loading";

const EditAgent: FC = (() => {

  const { _id, singleData } = useSingleData();
  const { values,
    handleAgentdataChange,
    handleContactDataChange,
    handleFinancialDataChange,
    handleAcountManagerDataChange,
  } = editAgentHook(singleData)

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
              handleChange: () => {
                handleAgentdataChange()
              },
              values: values[0]
            },
            {
              stepName: t('contactData'),
              stepComponent: () => <div>{JSON.stringify(values[1])}</div>,
              stepId: 'contactData',
              isValidated: () => true,
              handleChange: () => {
                handleContactDataChange()
              },
              values: values[1]
            },
            {
              stepName: t('financialData'),
              stepComponent: () => <div>{JSON.stringify(values[2])}</div>,
              stepId: 'financialData',
              isValidated: () => true,
              handleChange: () => {
                handleFinancialDataChange()
              },
              values: values[2]
            },
            {
              stepName: t('acountManagerData'),
              stepComponent: () => <div>
                {
                  singleData?.userCreatedData == undefined ||
                    singleData?.userUpdatedData == undefined ||
                    singleData?.accountManagerData == undefined ? <Loading color="" /> :
                    JSON.stringify(values[3])
                }
              </div>,
              stepId: 'acountManagerData',
              isValidated: () => true,
              handleChange: () => {
                handleAcountManagerDataChange()
              },
              values: values[3]
            },
          ]
        }
        title={t('createAgent')}
        subtitle="" />
    </Fragment>
  )
});

export default EditAgent;