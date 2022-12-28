import { FC } from "react";

//Components
import BackButton from '@/shared/BackButton';
import EditProvince from './EditProvince';
import pronvinceHook from "./provinceHook";

interface ProvinceTypes { }
const Province: FC<ProvinceTypes> = ((props: ProvinceTypes) => {
  const { currentRouteState } = pronvinceHook();

  return (
    <div style={{ marginTop: 100, wordBreak: 'break-word' }}>
      <BackButton pushUrl={currentRouteState.path} />
      <br />
      <EditProvince />

    </div>
  )
})

export default Province;