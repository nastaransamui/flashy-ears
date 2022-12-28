import { FC } from "react";
import { useLocation } from "react-router-dom";

//Components
import BackButton from '@/shared/BackButton';
import EditFeature from './EditFeature';
import CreateFeature from "./CreateFeature";
interface FeatureTypes { }
const Feature: FC<FeatureTypes> = ((props: FeatureTypes) => {

  const { search } = useLocation()
  // state !== null && delete state.muiData
  return (
    <div style={{ marginTop: 100, wordBreak: 'break-word' }}>
      <BackButton pushUrl='/main-page-setup/features' />
      <br />
      {
        search == '' ? <CreateFeature /> : <EditFeature />
      }

    </div>
  )
})

export default Feature;