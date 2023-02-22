import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

const createUserHook = () => {
  const [values, setValues] = useState([
    {
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
    // {
    //   role_id: [],
    // },
    // {
    //   agents_id: [],
    // }
  ]);
  const { handleSubmit, watch, control, register, formState: { errors }, resetField, setError, clearErrors, trigger } = useForm<any>();
  const formTrigger = async () => { }
  const onSubmit = (data: any) => console.log(data)
  return {
    values,
    handleSubmit,
    formTrigger,
    onSubmit
  }
}

export default createUserHook;