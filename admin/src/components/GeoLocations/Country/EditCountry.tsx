import { FC, Fragment } from "react";

//Hooks
import { useTranslation } from "react-i18next";
import editCountryHook from "./editCountryHook";

//Components

import StepsWizards, { StepsType } from "@/shared/StepsWizard/StepsWizard";

import Loading from "@/shared/Loading";
import LookUpsPagination from "@/shared/Lookups/LookUpsPagination";

const EditCountry: FC = (() => {
  const {
    values,
    singleData,
    hanldeGeoLocation,
    hanldeUserData,
    hanldeAgentsData,
    hanldeSuppliersData,
    hanldeHotelsData,
    hanldeStatesData,
    hanldeCitiesData,
  } = editCountryHook();

  const { t, i18n } = useTranslation('Countries')

  return (
    <Fragment>
      {/* {singleData !== null &&
        <StepsWizards
          steps={
            [
              {
                stepName: t('geoLocation'),
                stepComponent: () => <div>{JSON.stringify(values[0])}</div>,
                stepId: 'geoLocation',
                isValidated: () => true,
                handleChange: () => { console.log(`handle  ${t('geoLocation')} change`) },
                values: values[0]
              },
              {
                stepName: t('statesData'),
                stepComponent: () => <div>{singleData?.statesData == undefined ?
                  <Loading color="" /> :
                  <>
                    <LookUpsPagination stepIndex={0} stepId='statesData' total={values[1].totalState} />
                    {values[1]?.statesData?.length}
                    {JSON.stringify(values[1])}
                  </>}</div>,
                stepId: 'statesData',
                isValidated: () => true,
                handleChange: () => {
                  hanldeStatesData()
                  console.log(`handle  ${t('statesData')} change`)
                },
                values: values[1]
              },
              {
                stepName: t('citiesData'),
                stepComponent: () => <div>{singleData?.citiesData == undefined ? <Loading color="" /> : <>
                  <LookUpsPagination stepIndex={1} stepId='citiesData' total={values[2].totalCities} />
                  {values[2]?.citiesData?.length}
                  {JSON.stringify(values[2])}
                </>}</div>,
                stepId: 'citiesData',
                isValidated: () => true,
                handleChange: () => {
                  hanldeCitiesData()
                  console.log(`handle  ${t('citiesData')} change`)
                },
                values: values[2]
              },
              singleData?.isActive &&
              {
                stepName: t('userData'),
                stepComponent: () => <div>{singleData?.userData == undefined ?
                  <Loading color="" /> :
                  <>
                    <LookUpsPagination stepIndex={2} stepId='userData' total={values[3].totalUsers} />
                    {values[3]?.userData?.length}
                    {JSON.stringify(values[3])}
                  </>}</div>,
                stepId: 'userData',
                isValidated: () => true,
                handleChange: () => {
                  hanldeUserData()
                  console.log(`handle  ${t('userData')} change`)
                },
                values: values[3]
              },
              singleData?.isActive &&
              {
                stepName: t('agentsData'),
                stepComponent: () => <div>{singleData?.agentsData == undefined ? <Loading color="" /> :
                  <>
                    <LookUpsPagination stepIndex={3} stepId='agentsData' total={values[4].totalAgents} />
                    {values[4]?.agentsData?.length}
                    {JSON.stringify(values[4])}
                  </>}</div>,
                stepId: 'agentsData',
                isValidated: () => true,
                handleChange: () => {
                  hanldeAgentsData()
                  console.log(`handle  ${t('agentsData')} change`)
                },
                values: values[4]
              },
              singleData?.isActive &&
              {
                stepName: t('suppliersData'),
                stepComponent: () => <div>{singleData?.suppliersData == undefined ? <Loading color="" /> :
                  <>
                    <LookUpsPagination stepIndex={4} stepId='suppliersData' total={values[5].totalSuppliers} />
                    {values[5]?.suppliersData?.length}
                    {JSON.stringify(values[5])}
                  </>}</div>,
                stepId: 'suppliersData',
                isValidated: () => true,
                handleChange: () => {
                  hanldeSuppliersData()
                  console.log(`handle  ${t('suppliersData')} change`)
                },
                values: values[5]
              },
              singleData?.isActive &&
              {
                stepName: t('hotelsData'),
                stepComponent: () => <div>{singleData?.hotelsData == undefined ? <Loading color="" /> :
                  <>
                    <LookUpsPagination stepIndex={5} stepId='hotelsData' total={values[6].totalHotels} />
                    {values[6]?.hotelsData?.length}
                    {JSON.stringify(values[6])}
                  </>}</div>,
                stepId: 'hotelsData',
                isValidated: () => true,
                handleChange: () => {
                  hanldeHotelsData()
                  console.log(`handle  ${t('hotelsData')} change`)
                },
                values: values[6]
              },
            ].filter(Boolean)
          }
          title={i18n.language == 'fa' ? values[0]?.translations['fa'] || t('countryTitle') : values[0]?.name || t('countryTitle')}
          subtitle={values[0]?.emoji !== undefined ? values[0]?.emoji.repeat([5]) : t('countrySubtitle')} />} */}
    </Fragment>
  )
})

export default EditCountry;