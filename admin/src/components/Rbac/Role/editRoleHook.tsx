import { useEffect, useState } from 'react';
import Home from '@mui/icons-material/Home';
import useRoutesUpdate from '@/hookes/useRoutesUpdate';

import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import { useForm } from "react-hook-form";

const editRoleHook = (singleData: any) => {
  const updateRoutes = useRoutesUpdate();
  const dispatch = useDispatch();
  const { reRunSingleGet } = useSelector<State, State>(state => state)
  const [values, setValues] = useState([
    {
      roleName: '',
      isActive: true,
      //@ts-ignore
      icon: Home[`type` as keyof typeof Home].render().props.children.props.d,
      remark: ''
    },
    {
      routes: updateRoutes,
    },
    {
      routes: []
    },
    {
      userData: singleData?.userData,
      totalUsers: singleData?.users_id.length
    }
  ]);
  useEffect(() => {
    if (singleData !== null) {
      setValues([
        {
          roleName: singleData.roleName,
          isActive: singleData.isActive,
          icon: singleData.icon,
          remark: singleData.remark,
        },
        {
          routes: singleData.routes,
        },
        {
          routes: singleData.routes,
        },
        {
          userData: singleData?.userData,
          totalUsers: singleData?.users_id.length
        }
      ])
    }
  }, [singleData])

  const handleNameChange = () => { }

  const handleRoutesChange = () => {
    // if (singleData?.roleData == undefined) {
    //   dispatch({
    //     type: "RERUN_SINGLE_GET",
    //     payload: !reRunSingleGet,
    //   })
    // }
  }

  const handleCrudChange = () => {
    // if (singleData?.agentsData == undefined) {
    //   dispatch({
    //     type: "RERUN_SINGLE_GET",
    //     payload: !reRunSingleGet,
    //   })
    // }
  }
  const handleUsersChange = () => {
    if (singleData?.usersData == undefined) {
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
    handleSubmit,
    formTrigger,
    onSubmit,
    handleUsersChange
  }
}

export default editRoleHook;