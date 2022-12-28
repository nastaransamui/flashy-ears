import { FC } from "react";

//Components
import BackButton from '@/shared/BackButton';
import EditCountry from './EditCountry';
import countryHook from "./countryHook";

interface CountryTypes { }
const Country: FC<CountryTypes> = ((props: CountryTypes) => {
  const { currentRouteState } = countryHook();

  return (
    <div style={{ marginTop: 100, wordBreak: 'break-word' }}>
      <BackButton pushUrl={currentRouteState.path} />
      <br />
      <EditCountry />

    </div>
  )
})

export default Country;