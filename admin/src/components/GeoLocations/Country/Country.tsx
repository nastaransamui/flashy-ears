import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface CountryTypes { }
const Country: FC<CountryTypes> = ((props: CountryTypes) => {

  const { state } = useLocation()

  // state !== null && delete state.muiData
  return (
    <div style={{ marginTop: 100 }}>Country  {JSON.stringify(state)}</div>
  )
})

export default Country;