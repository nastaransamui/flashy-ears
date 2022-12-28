import { FC } from "react";

//Hooks
import { useTranslation } from "react-i18next";
import createFeatureHook from "./createFeatureHook";

//Components
import StepsWizards from "@/shared/StepsWizard/StepsWizard";

const CreateFeature: FC = (() => {
  const { values } = createFeatureHook();
  const { t } = useTranslation('Features')
  return (
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
      title={t('createPhotoTitle')}
      subtitle={t('createPhotoSubTitle')} />
  )
})

export default CreateFeature;
