import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface AgentTypes { }
const Agent: FC<AgentTypes> = ((props: AgentTypes) => {

  const { state } = useLocation()

  // state !== null && delete state.muiData
  return (
    <div style={{ marginTop: 100 }}>Agent  {JSON.stringify(state)}</div>
  )
})

export default Agent;