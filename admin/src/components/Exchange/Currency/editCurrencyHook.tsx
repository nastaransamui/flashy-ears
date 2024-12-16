import { useState, useEffect } from "react";
import useSingleData from '@/hookes/useSingleData'
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/src/redux/store";

const editCurrencyHook = () => {
  const { _id, singleData } = useSingleData('edit');
  const dispatch = useDispatch();
  const reRunSingleGet = useSelector<State, boolean>(state => state.reRunSingleGet);
  const [values, setValues] = useState([
    {
      name: singleData?.name,
      isActive: singleData?.isActive,
      iso3: singleData?.iso3,
      iso2: singleData?.iso2,
      numeric_code: singleData?.numeric_code,
      currency: singleData?.currency,
      currency_name: singleData?.currency_name,
      currency_symbol: singleData?.currency_symbol,
      emoji: singleData?.emoji,
    },
    {
      agentsData: singleData?.agentsData,
      totalAgents: singleData?.agents_id?.length
    },
    {
      suppliersData: singleData?.suppliersData,
      totalSuppliers: singleData?.suppliers_id?.length
    },
  ]);
  console.log(singleData)

  useEffect(() => {
    if (singleData !== null) {
      setValues([
        {
          name: singleData?.name,
          isActive: singleData?.isActive,
          iso3: singleData?.iso3,
          iso2: singleData?.iso2,
          numeric_code: singleData?.numeric_code,
          currency: singleData?.currency,
          currency_name: singleData?.currency_name,
          currency_symbol: singleData?.currency_symbol,
          emoji: singleData?.emoji,
        },
        {
          agentsData: singleData?.agentsData,
          totalAgents: singleData?.agents_id.length
        },
        {
          suppliersData: singleData?.suppliersData,
          totalSuppliers: singleData?.suppliers_id.length
        },
      ])
    }
  }, [singleData])
  const hanldeExchange = () => { }
  const hanldeAgentsData = () => {
    if (singleData?.agentsData == undefined) {
      dispatch({
        type: "RERUN_SINGLE_GET",
        payload: !reRunSingleGet,
      })
    }
  }
  const hanldeSuppliersData = () => {
    if (singleData?.suppliersData == undefined) {
      dispatch({
        type: "RERUN_SINGLE_GET",
        payload: !reRunSingleGet,
      })
    }
  }



  return {
    values,
    singleData,
    hanldeExchange,
    hanldeAgentsData,
    hanldeSuppliersData,
  }

}

export default editCurrencyHook;