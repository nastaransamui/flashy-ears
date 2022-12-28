import { FC } from "react";

//Hooks
import { useTranslation } from "react-i18next";
import createVideoHook from "./createVideoHook";

//Components
import StepsWizards from "@/shared/StepsWizard/StepsWizard";

const CreateVideo: FC = (() => {
  const { values } = createVideoHook();
  const { t } = useTranslation('Videos')
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
  )
})

export default CreateVideo;