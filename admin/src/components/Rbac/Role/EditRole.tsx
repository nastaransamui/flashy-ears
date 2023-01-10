import { FC, Fragment } from "react";
import useSingleData from '@/hookes/useSingleData'
import editRoleHook from "./editRoleHook";
import { useTranslation } from "react-i18next";

//Components

import StepsWizards from "@/shared/StepsWizard/StepsWizard";

import Loading from "@/shared/Loading";
import LookUpsPagination from "@/shared/Lookups/LookUpsPagination";

const EditRole: FC = (() => {

  const { _id, singleData } = useSingleData('edit');
  const {
    values,
    handleRoutesChange,
    handleCrudChange,
    handleUsersChange
  } = editRoleHook(singleData);
  // console.log(singleData)
  const { t } = useTranslation('Roles')
  return (
    <Fragment>
      <StepsWizards
        steps={
          [{
            stepName: t('name'),
            stepComponent: () => <div>{JSON.stringify(values[0])}</div>,
            stepId: 'name',
            isValidated: () => true,
            handleChange: () => {
              // console.log(`handle  ${t('name')} change`)
            },
            values: values[0]
          },
          {
            stepName: t('routes'),
            stepComponent: () => <div>{JSON.stringify(values[1])}</div>,
            stepId: 'routes',
            isValidated: () => true,
            handleChange: () => {
              // console.log(`handle  ${t('routes')} change`)
            },
            values: values[1]
          },
          {
            stepName: t('crud'),
            stepComponent: () => <div>{JSON.stringify(values[2])}</div>,
            stepId: 'crud',
            isValidated: () => true,
            handleChange: () => {
              // console.log(`handle  ${t('crud')} change`) 
            },
            values: values[2]
          },
          singleData?.isActive && {
            stepName: t('users'),
            stepComponent: () => <div>
              {singleData?.userData == undefined ? <Loading color="" /> :
                <>
                  <LookUpsPagination stepIndex={0} stepId='userData' total={values[3].totalUsers} />
                  {JSON.stringify(values[3])}
                </>}
            </div>,
            stepId: 'users',
            isValidated: () => true,
            handleChange: () => {
              handleUsersChange();
              // console.log(`handle  ${t('users')} change`)
            },
            values: values[3]
          },
          ].filter(Boolean)
        }
        title={values[0].roleName!}
        subtitle={t('editRouteSubTitle')} />
    </Fragment>
  )
});

export default EditRole;