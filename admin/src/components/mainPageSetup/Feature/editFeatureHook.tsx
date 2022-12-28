import { useState, useEffect } from "react";



const editFeatureHook = (singleData: any) => {
  const [values, setValues] = useState([
    {
      title_en: '',
      title_fa: '',
      imageShow: '',
      imageShowKey: '',
      videoLink: '',
      videoLinkKey: '',
      youTubeId: '',
      finalFolder: 'features',
      folderId: (Math.random() + 1).toString(36).substring(7),
      isActive: true,
      isYoutube: false,
    }
  ])

  useEffect(() => {
    if (singleData !== null) {
      setValues([
        {
          title_en: singleData.title_en,
          title_fa: singleData.title_fa,
          imageShow: singleData.imageShow,
          imageShowKey: singleData.imageShowKey,
          videoLink: singleData.videoLink,
          videoLinkKey: singleData.videoLinkKey,
          youTubeId: singleData.youTubeId,
          finalFolder: singleData.finalFolder,
          folderId: singleData.folderId,
          isActive: singleData.isActive,
          isYoutube: singleData.isYoutube,
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

export default editFeatureHook;