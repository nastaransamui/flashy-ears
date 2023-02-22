import { FC } from "react";
import { useLocation } from "react-router-dom";

//Components
import BackButton from '@/shared/BackButton';
import EditCollection from './EditCollection';
import CreateCollection from "./CreateCollection";
interface VideoTypes { }

const Collection: FC<VideoTypes> = ((props: VideoTypes) => {

  const { search } = useLocation()
  // state !== null && delete state.muiData
  return (
    <div style={{ marginTop: 100, wordBreak: 'break-word' }}>
      <BackButton pushUrl='/main-page-setup/collections' />
      <br />
      {
        search == '' ? <CreateCollection /> : <EditCollection />
      }

    </div>
  )
})

export default Collection;