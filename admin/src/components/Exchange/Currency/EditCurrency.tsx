import { FC, Fragment } from "react";

//Hooks
import { useTranslation } from "react-i18next";
import editCountryHook from "./editCurrencyHook";

//Components

import StepsWizards from "@/shared/StepsWizard/StepsWizard";

import Loading from "@/shared/Loading";
import LookUpsPagination from "@/shared/Lookups/LookUpsPagination";


const EditCurrency: FC = (() => {
  const {
    values,
    singleData,
    hanldeExchange,
    hanldeAgentsData,
    hanldeSuppliersData,
  } = editCountryHook();

  const { t, i18n } = useTranslation('Currencies')
  return (
    <Fragment>
      {/* {singleData !== null &&
        <StepsWizards
          steps={
            [
              {
                stepName: t('exchange'),
                stepComponent: () => <div>{JSON.stringify(values[0])}</div>,
                stepId: 'exchange',
                isValidated: () => true,
                handleChange: () => { console.log(`handle  ${t('exchange')} change`) },
                values: values[0]
              },
              singleData?.isActive && {
                stepName: t('agentsData'),
                stepComponent: () => <div>
                  {singleData?.agentsData == undefined ? <Loading color="" /> :
                    <>
                      <LookUpsPagination stepIndex={0} stepId='agentsData' total={values[1].totalAgents} />
                      {JSON.stringify(values[1])}
                    </>}
                </div>,
                stepId: 'agentsData',
                isValidated: () => true,
                handleChange: () => {
                  hanldeAgentsData()
                  console.log(`handle  ${t('agentsData')} change`)
                },
                values: values[1]
              },
              singleData?.isActive && {
                stepName: t('suppliersData'),
                stepComponent: () => <div>
                  {singleData?.suppliersData == undefined ? <Loading color="" /> :
                    <>
                      <LookUpsPagination stepIndex={1} stepId='suppliersData' total={values[2].totalSuppliers} />
                      {JSON.stringify(values[2])}
                    </>}
                </div>,
                stepId: 'suppliersData',
                isValidated: () => true,
                handleChange: () => {
                  hanldeSuppliersData()
                  console.log(`handle  ${t('suppliersData')} change`)
                },
                values: values[2]
              },
            ].filter(Boolean)
          }
          title={values[0]?.name || t('currencyTitle') + values[0]?.currency_name || t('currency_name')}
          subtitle={values[0]?.emoji !== undefined ? values[0]?.emoji.repeat([5]) : t('countrySubtitle')} />} */}
    </Fragment>
  )
})

export default EditCurrency;