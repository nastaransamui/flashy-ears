import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface PhotoTypes { }
const Photo: FC<PhotoTypes> = ((props: PhotoTypes) => {

  const { state } = useLocation()
  // state !== null && delete state.muiData
  return (
    <div style={{ marginTop: 100 }}>Photo  {JSON.stringify(state)}</div>
  )
})

export default Photo;