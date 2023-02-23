import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import colorStyles from "./color-style";
import { useTranslation } from "react-i18next";
import { rgba2hex } from './createColorHook';
import axios from 'axios';

import { toast } from 'react-toastify';
import { ToastMessage } from '@/shared/CustomToaster/CustomToaster';
let editColorUrl = '/admin/api/home/editColor'

const editColorHook = (singleData: any) => {
  const dispatch = useDispatch();
  const { adminAccessToken } = useSelector<State, State>(state => state)
  const [colorSelected, setcolorSelected] = useState<string>('')
  const [showSelect, setShowSelect] = useState<boolean>(false)
  const { t, i18n } = useTranslation('Colors')
  const { theme, classes } = colorStyles({ colorSelected: colorSelected })
  const navigate = useNavigate();
  const [values, setValues] = useState([
    {
      _id: '',
      label_en: "",
      label_th: '',
      name_en: '',
      name_th: '',
      colorCode: ''
    },
  ]);

  useEffect(() => {
    if (singleData !== null) {
      if (singleData == undefined) {
        navigate('/colors-data/colors')
      } else {
        setValue('_id', singleData?._id)
        setValue('label_en', singleData?.label_en)
        setValue('label_th', singleData?.label_th)
        setValue('name_en', singleData?.name_en)
        setValue('name_th', singleData?.name_th)
        setcolorSelected(singleData?.colorCode)
        setValue('colorCode', singleData?.colorCode)
      }
    }
  }, [singleData])
  const handleColorChange = (e: any) => {
    setcolorSelected(`#${rgba2hex(`rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})`)}`)
    setValue('colorCode', `#${rgba2hex(`rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})`)}`,)
    clearErrors('colorCode')
  }

  const { handleSubmit, watch, setValue, register, formState: { errors }, resetField, setError, clearErrors, trigger }
    = useForm<any>({});
  const formTrigger = async () => { }
  const onSubmit = (data: any) => {
    dispatch({
      type: 'ADMIN_FORM_SUBMIT',
      payload: true
    })

    axios.post(editColorUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        token: `Brearer ${adminAccessToken}`
      }
    }).then((resp) => {
      const { success, data, error } = resp.data;
      dispatch({
        type: 'ADMIN_FORM_SUBMIT',
        payload: false
      })
      if (success) {
        toast(<ToastMessage >{`color ${data[`label_${i18n.language}`]} was edited successfully`}</ToastMessage>, {
          onClose: () => {
            dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
            dispatch({
              type: "RERUN_SINGLE_GET",
              payload: false,
            })
            toast.dismiss()
            navigate('/colors-data/colors')
          },
          toastId: `createColer_toastId`
        })
      }
    })
      .catch((error) => {
        toast(<ToastMessage >{error?.response?.data?.Error || error.message}</ToastMessage>, {
          onClose: () => {
            dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
            dispatch({
              type: "RERUN_SINGLE_GET",
              payload: false,
            })
            toast.dismiss()
          },
          toastId: `createColer_toastId`
        })
      });
  }

  return {
    values,
    handleSubmit,
    formTrigger,
    onSubmit,
    errors,
    register,
    watch,
    colorSelected,
    classes,
    showSelect,
    setShowSelect,
    handleColorChange,
    t
  }
}

export default editColorHook;