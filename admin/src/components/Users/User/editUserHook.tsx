import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import { useForm } from "react-hook-form";
const editUserHook = (singleData: any) => {
  const dispatch = useDispatch();
  const { reRunSingleGet } = useSelector<State, State>(state => state)
  const [values, setValues] = useState([
    {
      _id: '',
      userName: '',
      password: '',
      isAdmin: true,
      showPassword: false,
      profileImage: '',
      profileImageKey: '',
      finalFolder: 'users',
      folderId: (Math.random() + 1).toString(36).substring(7),
      roleName: '',
      role_id: [],
      countryName: '',
      country_id: [],
      provinceName: '',
      province_id: [],
      cityName: '',
      city_id: [],
      position: '',
      aboutMe: '',
    },
    {
      roleData: [],
    },
    {
      agentsData: singleData?.agentsData,
      totalAgents: singleData?.agents_id?.length
    }
  ]);

  useEffect(() => {
    if (singleData !== null) {
      setValues([
        {
          _id: singleData._id,
          userName: singleData.userName,
          password: '',
          isAdmin: singleData.isAdmin,
          showPassword: false,
          profileImage: singleData.profileImage,
          profileImageKey: singleData.profileImageKey,
          finalFolder: singleData.finalFolder,
          folderId: singleData.folderId,
          roleName: singleData.roleName,
          role_id: singleData.role_id,
          countryName: singleData.countryName,
          country_id: singleData.country_id,
          provinceName: singleData.provinceName,
          province_id: singleData.province_id,
          cityName: singleData.cityName,
          city_id: singleData.city_id,
          position: singleData.position,
          aboutMe: singleData.aboutMe,
        },
        {
          roleData: singleData.roleData,
        },
        {
          agentsData: singleData?.agentsData,
          totalAgents: singleData?.agents_id.length
        }
      ])
    }
  }, [singleData])


  const handleRolesdataChange = () => {
    if (singleData?.roleData == undefined) {
      dispatch({
        type: "RERUN_SINGLE_GET",
        payload: !reRunSingleGet,
      })
    }
  }

  const handleAgentsDataChange = () => {
    if (singleData?.agentsData == undefined) {
      dispatch({
        type: "RERUN_SINGLE_GET",
        payload: !reRunSingleGet,
      })
    }
  }

  const { handleSubmit, watch, control, register, formState: { errors }, resetField, setError, clearErrors, trigger } = useForm<any>();
  const formTrigger = async () => { }
  const onSubmit = (data: any) => console.log(data)

  return {
    values,
    handleRolesdataChange,
    handleAgentsDataChange,
    handleSubmit,
    formTrigger,
    onSubmit
  }
}

export default editUserHook;