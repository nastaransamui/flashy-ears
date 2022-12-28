import { FC } from "react";

//Hooks
import { useLocation } from "react-router-dom";
import useCurrentRouteState from '@/hookes/useCurrentRouteState';


//Components
import BackButton from '@/shared/BackButton';
import EditAgent from './EditAgent';
import CreateAgent from "./CreateAgent";
interface AgentTypes { }
const Agent: FC<AgentTypes> = ((props: AgentTypes) => {
  const currentRouteState = useCurrentRouteState();
  const { search } = useLocation()

  return (
    <div style={{ marginTop: 80, wordBreak: 'break-word' }}>
      <BackButton pushUrl={currentRouteState.path} />
      <br />
      {
        search == '' ? <CreateAgent /> : <EditAgent />
      }

    </div>
  )
})

export default Agent;