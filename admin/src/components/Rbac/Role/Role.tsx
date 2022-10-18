import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface RoleTypes { }
const Role: FC<RoleTypes> = ((props: RoleTypes) => {

  const { state } = useLocation()

  // state !== null && delete state.muiData
  return (
    <div style={{ marginTop: 100 }}>Role  {JSON.stringify(state)}</div>
  )
})

export default Role;