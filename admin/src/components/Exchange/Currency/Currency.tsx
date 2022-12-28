import { FC } from "react";
//Components
import BackButton from '@/shared/BackButton';
import EditCurrency from './EditCurrency';
import currencyHook from "./currencyHook";


interface CurrencyTypes { }
const Currency: FC<CurrencyTypes> = ((props: CurrencyTypes) => {
  const { currentRouteState } = currencyHook();

  return (
    <div style={{ marginTop: 100, wordBreak: 'break-word' }}>
      <BackButton pushUrl={currentRouteState.path} />
      <br />
      <EditCurrency />

    </div>
  )
})

export default Currency;