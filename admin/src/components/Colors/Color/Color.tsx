import { FC } from "react";

//Hooks
import { useLocation } from "react-router-dom";
import useCurrentRouteState from '@/hookes/useCurrentRouteState';


//Components
import BackButton from '@/shared/BackButton';
import EditColor from './EditColor';
import CreateColor from "./CreateColor";
interface ColorTypes { }
const Color: FC<ColorTypes> = ((props: ColorTypes) => {
  const currentRouteState = useCurrentRouteState();
  const { search } = useLocation()

  return (
    <div style={{ marginTop: 80, wordBreak: 'break-word' }}>
      <BackButton pushUrl={currentRouteState.path} />
      <br />
      {
        search == '' ? <CreateColor /> : <EditColor />
      }

    </div>
  )
})

export default Color;