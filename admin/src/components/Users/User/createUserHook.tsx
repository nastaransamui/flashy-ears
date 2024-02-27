import { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import userStyles from './user-style';
import { useNavigate } from "react-router-dom";
var toBoolean = require('to-boolean');

let createProductUrl = '/admin/api/modelsCrud/createUser'
const createUserHook = () => {

  const { t, i18n } = useTranslation('Users')
  const { theme, classes } = userStyles({})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [informationValidate, setInformationValidate] = useState<boolean>(false)
  const [values, setValues] = useState([
    {
      userName: '',
      password: '',
      isAdmin: true,
      profileImage: '',
      firstName: '',
      lastName: '',
      // profileImageKey: '',
      // finalFolder: 'users',
      // folderId: (Math.random() + 1).toString(36).substring(7),
      roleName: '',
      // role_id: [],
      // countryName: '',
      // country_id: [],
      // provinceName: '',
      // province_id: [],
      // cityName: '',
      // city_id: [],
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

  const {
    handleSubmit,
    watch,
    setValue,
    register,
    unregister,
    formState: { errors },
    resetField,
    setError,
    clearErrors,
    trigger,
    control,
    getValues }
    = useForm<any>({});
  const formTrigger = async () => {
    const result = await trigger([
      'userName',
      'password',
      'isAdmin',
      'profileImage',
      'firstName',
      'lastName',
      'roleName',
      'role_id',
      // 'countryName',
      // 'country_id',
      // 'provinceName',
      // 'province_id',
      // 'cityName',
      // 'city_id',
      'position',
      'aboutMe',
    ]);
  }
  const onSubmit = (data: any) => {
    console.log(data)
    console.log(informationValidate)
  }
  return {
    theme,
    values,
    setValues,
    setValue,
    getValues,
    setError,
    clearErrors,
    informationValidate,
    setInformationValidate,
    handleSubmit,
    formTrigger,
    onSubmit,
    errors,
    register,
    unregister,
    watch,
    Controller,
    control,
    resetField,
    classes,
    t,
  }
}

export default createUserHook;