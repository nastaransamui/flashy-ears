import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface CityTypes { }
const City: FC<CityTypes> = ((props: CityTypes) => {

  const { state } = useLocation()

  // state !== null && delete state.muiData
  return (
    <div style={{ marginTop: 100 }}>City  {JSON.stringify(state)}</div>
  )
})

export default City;