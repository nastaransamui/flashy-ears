import { FC, Fragment } from "react";
import editPhotoHook from "./editPhotoHook";
import useSingleData from '@/hookes/useSingleData'
import { useTranslation } from "react-i18next";

//Components

import StepsWizards from "@/shared/StepsWizard/StepsWizard";


const EditPhoto: FC = (() => {
  const { _id, singleData } = useSingleData('edit');
  const {
    values,
    hangleTitlesChange,
  } = editPhotoHook(singleData);
  const { t } = useTranslation('Photos')
  return (
    <Fragment>
      {/* <StepsWizards
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
        title={t('createPhotoTitle')}
        subtitle={t('createPhotoSubTitle')} /> */}
    </Fragment>
  )
})

export default EditPhoto;