import { FC, Fragment } from "react";
import editFeatureHook from "./editFeatureHook";
import useSingleData from '@/hookes/useSingleData'
import { useTranslation } from "react-i18next";

//Components

import StepsWizards from "@/shared/StepsWizard/StepsWizard";


const EditFeature: FC = (() => {
  const { _id, singleData } = useSingleData();
  const {
    values,
    hangleTitlesChange,
  } = editFeatureHook(singleData);
  const { t } = useTranslation('Features')
  return (
    <Fragment>
      <StepsWizards
        steps={
          [{
            stepName: t('titles'),
            stepComponent: () => <div>{JSON.stringify(values[0])}</div>,
            stepId: 'titles',
            isValidated: () => true,
            handleChange: () => { console.log(`handle ${t('titles')} change`) },
            values: values[0]
          },
          ]
        }
        title={t('createFeatureTitle')}
        subtitle={t('createFeatureSubTitle')} />
    </Fragment>
  )
})

export default EditFeature;