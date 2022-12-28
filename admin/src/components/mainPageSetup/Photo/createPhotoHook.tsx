import { useState, useEffect } from "react";

const createPhotoHook = () => {
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

  return {
    values
  }
}

export default createPhotoHook;