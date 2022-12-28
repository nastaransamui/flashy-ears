import { useState, useEffect } from "react";



const editPhotoHook = (singleData: any) => {
  const [values, setValues] = useState([
    {
      title_en: '',
      title_fa: '',
      topTitle_en: '',
      topTitle_fa: '',
      subTitle_en: '',
      subTitle_fa: '',
      button_en: '',
      button_fa: '',
      finalFolder: 'photos',
      folderId: (Math.random() + 1).toString(36).substring(7),
      isActive: true,
      imageShow: '',
      imageShowKey: '',
    }
  ])

  useEffect(() => {
    if (singleData !== null) {
      setValues([
        {
          title_en: singleData.title_en,
          title_fa: singleData.title_fa,
          topTitle_en: singleData.topTitle_en,
          topTitle_fa: singleData.topTitle_fa,
          subTitle_en: singleData.subTitle_en,
          subTitle_fa: singleData.subTitle_fa,
          button_en: singleData.button_en,
          button_fa: singleData.button_fa,
          finalFolder: singleData.finalFolder,
          folderId: singleData.folderId,
          isActive: singleData.isActive,
          imageShow: singleData.imageShow,
          imageShowKey: singleData.imageShowKey,
        }
      ])
    }
  }, [singleData])

  const hangleTitlesChange = () => { }

  return {
    values,
    hangleTitlesChange,
  }
}

export default editPhotoHook;