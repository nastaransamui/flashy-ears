import { FC, Fragment } from "react";
import useSingleData from '@/hookes/useSingleData'
import editVideoHook from './editVideoHook';
import { useTranslation } from "react-i18next";

//Components

import StepsWizards from "@/shared/StepsWizard/StepsWizard";

const EditVideo: FC = (() => {
  const { _id, singleData } = useSingleData('edit');
  const {
    values,
    handleTitlesChange,
    handleMediaChange,
  } = editVideoHook(singleData);
  console.log(singleData)
  const { t } = useTranslation('Videos')
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
          {
            stepName: t('media'),
            stepComponent: () => <div>{JSON.stringify(values[1])}</div>,
            stepId: 'media',
            isValidated: () => true,
            handleChange: () => { console.log(`handle ${t('titles')} change`) },
            values: values[1]
          },
          ]
        }
        title={t('createVideoTitle')}
        subtitle={t('createVideoSubTitle')} />
    </Fragment>
  )
})

export default EditVideo