import { FC, Fragment } from "react";

//Hooks
import { useTranslation } from "react-i18next";
import editProvinceHook from "./editProvinceHook";

//Components

import StepsWizards from "@/shared/StepsWizard/StepsWizard";

import Loading from "@/shared/Loading";
import LookUpsPagination from "@/shared/Lookups/LookUpsPagination";


const EditProvince: FC = (() => {
  const {
    values,
    singleData,
    hanldeGeoLocation,
    hanldeUserData,
    hanldeAgentsData,
    hanldeSuppliersData,
    hanldeHotelsData,
    hanldeCitiesData,
  } = editProvinceHook();

  const { t, i18n } = useTranslation('Provinces')
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
                stepName: t('citiesData'),
                stepComponent: () => <div>
                  {singleData?.citiesData == undefined ? <Loading color="" /> :
                    <>
                      <LookUpsPagination stepIndex={0} stepId="citiesData" total={values[1].totalCities} />
                      {JSON.stringify(values[1])}
                    </>
                  }</div>,
                stepId: 'citiesData',
                isValidated: () => true,
                handleChange: () => {
                  hanldeCitiesData()
                  console.log(`handle  ${t('citiesData')} change`)
                },
                values: values[1]
              },
              singleData?.isActive && {
                stepName: t('userData'),
                stepComponent: () => <div>
                  {singleData?.userData == undefined ? <Loading color="" /> :
                    <>
                      <LookUpsPagination stepIndex={1} stepId="userData" total={values[2].totalUsers} />
                      {JSON.stringify(values[2])}
                    </>
                  }
                </div>,
                stepId: 'userData',
                isValidated: () => true,
                handleChange: () => {
                  hanldeUserData()
                  console.log(`handle  ${t('userData')} change`)
                },
                values: values[2]
              },
              singleData?.isActive && {
                stepName: t('agentsData'),
                stepComponent: () => <div>
                  {singleData?.agentsData == undefined ? <Loading color="" /> :
                    <>
                      <LookUpsPagination stepIndex={2} stepId="agentsData" total={values[3].totalAgents} />
                      {JSON.stringify(values[3])}
                    </>
                  }
                </div>,
                stepId: 'agentsData',
                isValidated: () => true,
                handleChange: () => {
                  hanldeAgentsData()
                  console.log(`handle  ${t('agentsData')} change`)
                },
                values: values[3]
              },
              singleData?.isActive && {
                stepName: t('suppliersData'),
                stepComponent: () => <div>
                  {singleData?.suppliersData == undefined ? <Loading color="" /> :
                    <>
                      <LookUpsPagination stepIndex={3} stepId="suppliersData" total={values[4].totalSuppliers} />
                      {JSON.stringify(values[4])}
                    </>
                  }
                </div>,
                stepId: 'suppliersData',
                isValidated: () => true,
                handleChange: () => {
                  hanldeSuppliersData()
                  console.log(`handle  ${t('suppliersData')} change`)
                },
                values: values[4]
              },
              singleData?.isActive && {
                stepName: t('hotelsData'),
                stepComponent: () => <div>
                  {
                    singleData?.hotelsData == undefined ? <Loading color="" /> :
                      <>
                        <LookUpsPagination stepIndex={4} stepId="hotelsData" total={values[5].totalHotels} />
                        {JSON.stringify(values[5])}
                      </>
                  }
                </div>,
                stepId: 'hotelsData',
                isValidated: () => true,
                handleChange: () => {
                  hanldeHotelsData()
                  console.log(`handle  ${t('hotelsData')} change`)
                },
                values: values[5]
              },
            ].filter(Boolean)
          }
          title={values[0]?.name || t('provinceTitle') + values[0]?.country_name || t('country_name')}
          subtitle={t('provinceSubtitle')} />} */}
    </Fragment>
  )
})

export default EditProvince;