import { FC } from "react";

//Hooks
import { useTranslation } from "react-i18next";
import createPhotoHook from "./createPhotoHook";

//Components
import StepsWizards from "@/shared/StepsWizard/StepsWizard";

const CreatePhoto: FC = (() => {
  const { values } = createPhotoHook();
  const { t } = useTranslation('Photos')
  return (
    <></>
    // <StepsWizards
    //   steps={
    //     [{
    //       stepName: t('titles'),
    //       stepComponent: () => <div>{JSON.stringify(values[0])}</div>,
    //       stepId: 'titles',
    //       isValidated: () => true,
    //       handleChange: () => { console.log(`handle ${t('titles')} change`) },
    //       values: values[0]
    //     },
    //     ]
    //   }
    //   title={t('createPhotoTitle')}
    //   subtitle={t('createPhotoSubTitle')} />
  )
})

export default CreatePhoto;
