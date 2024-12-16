import { useState, useEffect } from "react";
import useSingleData from '@/hookes/useSingleData'
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/src/redux/store";

const editCityHook = () => {
  const { _id, singleData } = useSingleData('edit');
  const dispatch = useDispatch();
  const reRunSingleGet = useSelector<State, boolean>(state => state.reRunSingleGet);
  const [values, setValues] = useState([
    {
      isActive: singleData?.isActive,
      name: singleData?.name,
      country_id: singleData?.country_id,
      country_name: singleData?.country_name,
      state_id: singleData?.state_id,
      state_name: singleData?.state_name,
      iso2: singleData?.iso2,
      isHotelsActive: singleData?.isHotelsActive,
      type: singleData?.type,
      latitude: singleData?.latitude,
      longitude: singleData?.longitude,
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
          isActive: singleData?.isActive,
          name: singleData?.name,
          country_id: singleData?.country_id,
          country_name: singleData?.country_name,
          state_id: singleData?.state_id,
          state_name: singleData?.state_name,
          iso2: singleData?.iso2,
          isHotelsActive: singleData?.isHotelsActive,
          type: singleData?.type,
          latitude: singleData?.latitude,
          longitude: singleData?.longitude,
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




  return {
    values,
    singleData,
    hanldeGeoLocation,
    hanldeUserData,
    hanldeAgentsData,
    hanldeSuppliersData,
    hanldeHotelsData,
  }

}

export default editCityHook;