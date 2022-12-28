import { FC } from "react";

//Components
import BackButton from '@/shared/BackButton';
import EditCity from './EditCity';
import cityHook from "./cityHook";


interface CityTypes { }
const City: FC<CityTypes> = ((props: CityTypes) => {
  const { currentRouteState } = cityHook();

  return (
    <div style={{ marginTop: 100, wordBreak: 'break-word' }}>
      <BackButton pushUrl={currentRouteState.path} />
      <br />
      <EditCity />

    </div>
  )
})

export default City;