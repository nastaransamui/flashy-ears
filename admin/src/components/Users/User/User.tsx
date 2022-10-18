
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface UserTypes { }
const User: FC<UserTypes> = ((props: UserTypes) => {

  const { state } = useLocation()


  // state !== null && delete state.muiData
  return (
    <div style={{ marginTop: 100 }}>User  {JSON.stringify(state)}</div>
  )
})

export default User;