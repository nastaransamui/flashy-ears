import { useState, useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';

const editVideoHook = (singleData: any) => {
  const dispatch = useDispatch();
  const { reRunSingleGet } = useSelector<State, State>(state => state)
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
        }, {
          imageMobileShowKey: singleData.imageMobileShowKey,
          videoPosterKey: singleData.videoPosterKey,
          videoLinkKey: singleData.videoLinkKey,
          youTubeId: singleData.youTubeId,
          finalFolder: singleData.finalFolder,
          folderId: singleData.folderId,
          isActive: singleData.isActive,
          isYoutube: singleData.isYoutube,
          imageMobileShow: singleData.imageMobileShow,
          videoPoster: singleData.videoPoster,
          videoLink: singleData.videoLink,
        }
      ])
    }
  }, [singleData])

  const handleTitlesChange = () => { }
  const handleMediaChange = () => { }

  return {
    values,
    handleTitlesChange,
    handleMediaChange
  }
}

export default editVideoHook;