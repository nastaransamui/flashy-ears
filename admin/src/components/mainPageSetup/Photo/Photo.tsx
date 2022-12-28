import { FC } from "react";
import { useLocation } from "react-router-dom";

//Components
import BackButton from '@/shared/BackButton';
import EditPhoto from './EditPhoto';
import CreatePhoto from "./CreatePhoto";

interface PhotoTypes { }
const Photo: FC<PhotoTypes> = ((props: PhotoTypes) => {

  const { search } = useLocation()
  // state !== null && delete state.muiData
  return (
    <div style={{ marginTop: 100, wordBreak: 'break-word' }}>
      <BackButton pushUrl='/main-page-setup/photos' />
      <br />
      {
        search == '' ? <CreatePhoto /> : <EditPhoto />
      }

    </div>
  )
})

export default Photo;