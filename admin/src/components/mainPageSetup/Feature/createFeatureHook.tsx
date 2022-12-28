import { useState, useEffect } from "react";

const createFeatureHook = () => {
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

  return {
    values
  }
}

export default createFeatureHook;