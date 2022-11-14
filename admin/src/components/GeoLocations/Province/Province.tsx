import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface ProvinceTypes { }
const Province: FC<ProvinceTypes> = ((props: ProvinceTypes) => {

  const { state } = useLocation()

  // state !== null && delete state.muiData
  return (
    <div style={{ marginTop: 100 }}>Province  {JSON.stringify(state)}</div>
  )
})

export default Province;