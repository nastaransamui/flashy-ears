import { FC } from "react";
import { useLocation } from "react-router-dom";

//Components
import BackButton from '@/shared/BackButton';
import EditVideo from './EditVideo';
import CreateVideo from "./CreateVideo";
interface VideoTypes { }

const Video: FC<VideoTypes> = ((props: VideoTypes) => {

  const { search } = useLocation()
  // state !== null && delete state.muiData
  return (
    <div style={{ marginTop: 100, wordBreak: 'break-word' }}>
      <BackButton pushUrl='/main-page-setup/videos' />
      <br />
      {
        search == '' ? <CreateVideo /> : <EditVideo />
      }

    </div>
  )
})

export default Video;