import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface CurrencyTypes { }
const Currency: FC<CurrencyTypes> = ((props: CurrencyTypes) => {

  const { state } = useLocation()

  // state !== null && delete state.muiData
  return (
    <div style={{ marginTop: 100 }}>Currency  {JSON.stringify(state)}</div>
  )
})

export default Currency;