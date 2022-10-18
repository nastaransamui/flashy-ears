import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface VideoTypes { }
const Video: FC<VideoTypes> = ((props: VideoTypes) => {

  const { state } = useLocation()
  // state !== null && delete state.muiData
  return (
    <div style={{ marginTop: 100 }}>Video  {JSON.stringify(state)}</div>
  )
})

export default Video;