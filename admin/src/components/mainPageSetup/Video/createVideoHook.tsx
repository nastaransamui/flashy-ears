import { useEffect, useState } from 'react';

const createVideoHook = () => {
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
    }, {
      imageMobileShowKey: '',
      videoPosterKey: '',
      videoLinkKey: '',
      youTubeId: '',
      finalFolder: 'videos',
      folderId: (Math.random() + 1).toString(36).substring(7),
      isActive: false,
      isYoutube: false,
      imageMobileShow: '',
      videoPoster: '',
      videoLink: '',
    }
  ]);

  return {
    values,
  }
}

export default createVideoHook;