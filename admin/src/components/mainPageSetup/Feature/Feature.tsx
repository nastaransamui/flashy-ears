import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface FeatureTypes { }
const Feature: FC<FeatureTypes> = ((props: FeatureTypes) => {

  const { state } = useLocation()
  // state !== null && delete state.muiData
  return (
    <div style={{ marginTop: 100 }}>Feature  {JSON.stringify(state)}</div>
  )
})

export default Feature;