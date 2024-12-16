import { useState, useEffect } from "react";
import useSingleData from '@/hookes/useSingleData'
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/src/redux/store";

const editCountryHook = () => {
  const {
    _id,
    singleData } = useSingleData('edit');
  const dispatch = useDispatch();
  const reRunSingleGet = useSelector<State, boolean>(state => state.reRunSingleGet);

  const [values, setValues] = useState([
    {
      id: singleData?.id,
      isActive: singleData?.isActive,
      isHotelsActive: singleData?.isHotelsActive,
      name: singleData?.name,
      iso3: singleData?.iso3,
      iso2: singleData?.iso2,
      numeric_code: singleData?.numeric_code,
      phone_code: singleData?.phone_code,
      capital: singleData?.capital,
      currency: singleData?.currency,
      currency_name: singleData?.currency_name,
      currency_symbol: singleData?.currency_symbol,
      tld: singleData?.tld,
      native: singleData?.native,
      region: singleData?.region,
      subregion: singleData?.subregion,
      latitude: singleData?.latitude,
      longitude: singleData?.longitude,
      emoji: singleData?.emoji,
      emojiU: singleData?.emojiU,
      timezones: singleData?.timezones,
      translations: singleData?.translations,
    },
    {
      statesData: singleData?.statesData,
      totalState: singleData?.states_id.length
    },
    {
      citiesData: singleData?.citiesData,
      totalCities: singleData?.cities_id.length
    },
    {
      userData: singleData?.userData,
      totalUsers: singleData?.users_id.length
    },
    {
      agentsData: singleData?.agentsData,
      totalAgents: singleData?.agents_id.length
    },
    {
      suppliersData: singleData?.suppliersData,
      totalSuppliers: singleData?.suppliers_id.length
    },
    {
      hotelsData: singleData?.hotelsData,
      totalHotels: singleData?.hotels_id.length
    },
  ]);
  console.log(singleData)

  useEffect(() => {
    if (singleData !== null) {
      setValues([
        {
          id: singleData?.id,
          isActive: singleData?.isActive,
          isHotelsActive: singleData?.isHotelsActive,
          name: singleData?.name,
          iso3: singleData?.iso3,
          iso2: singleData?.iso2,
          numeric_code: singleData?.numeric_code,
          phone_code: singleData?.phone_code,
          capital: singleData?.capital,
          currency: singleData?.currency,
          currency_name: singleData?.currency_name,
          currency_symbol: singleData?.currency_symbol,
          tld: singleData?.tld,
          native: singleData?.native,
          region: singleData?.region,
          subregion: singleData?.subregion,
          latitude: singleData?.latitude,
          longitude: singleData?.longitude,
          emoji: singleData?.emoji,
          emojiU: singleData?.emojiU,
          timezones: singleData?.timezones,
          translations: singleData?.translations,
        },
        {
          statesData: singleData?.statesData,
          totalState: singleData?.states_id.length
        },
        {
          citiesData: singleData?.citiesData,
          totalCities: singleData?.cities_id.length
        },
        {
          userData: singleData?.userData,
          totalUsers: singleData?.users_id.length
        },
        {
          agentsData: singleData?.agentsData,
          totalAgents: singleData?.agents_id.length
        },
        {
          suppliersData: singleData?.suppliersData,
          totalSuppliers: singleData?.suppliers_id.length
        },
        {
          hotelsData: singleData?.hotelsData,
          totalHotels: singleData?.hotels_id.length
        },
      ])
    }

  }, [singleData])

  const hanldeGeoLocation = () => { }
  const hanldeUserData = () => {
    if (singleData?.userData == undefined) {
      dispatch({
        type: "RERUN_SINGLE_GET",
        payload: !reRunSingleGet,
      })
    }
  }
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
  const hanldeHotelsData = () => {
    if (singleData?.hotelsData == undefined) {
      dispatch({
        type: "RERUN_SINGLE_GET",
        payload: !reRunSingleGet,
      })
    }
  }
  const hanldeStatesData = () => {
    if (singleData?.statesData == undefined) {
      dispatch({
        type: "RERUN_SINGLE_GET",
        payload: !reRunSingleGet,
      })
    }
  }
  const hanldeCitiesData = () => {
    if (singleData?.citiesData == undefined) {
      dispatch({
        type: "RERUN_SINGLE_GET",
        payload: !reRunSingleGet,
      })
    }
  }



  return {
    values,
    singleData,
    hanldeGeoLocation,
    hanldeUserData,
    hanldeAgentsData,
    hanldeSuppliersData,
    hanldeHotelsData,
    hanldeStatesData,
    hanldeCitiesData,
  }

}

export default editCountryHook;