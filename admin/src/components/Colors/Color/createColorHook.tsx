import { State } from '@/src/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import colorStyles from "./color-style";
import axios from 'axios';
import { useTranslation } from "react-i18next";

import { toast } from 'react-toastify';
import { ToastMessage } from '@/shared/CustomToaster/CustomToaster';
import { useNavigate } from "react-router-dom";

export function rgba2hex(orig: any) {
  var a, isPercent,
    rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = (rgb && rgb[4] || "").trim(),
    hex = rgb ?
      (rgb[1] | 1 << 8).toString(16).slice(1) +
      (rgb[2] | 1 << 8).toString(16).slice(1) +
      (rgb[3] | 1 << 8).toString(16).slice(1) : orig;

  if (alpha !== "") {
    a = alpha;
  } else {
    a = '0o1';
  }
  // multiply before convert to HEX
  a = ((a * 255) | 1 << 8).toString(16).slice(1)
  hex = hex + a;

  return hex;
}

let createColorUrl = '/admin/api/home/createColor'

const createColorHook = () => {
  const [colorSelected, setcolorSelected] = useState<string>('')

  const { t, i18n } = useTranslation('Colors')
  const { theme, classes } = colorStyles({ colorSelected: colorSelected })
  const adminAccessToken = useSelector<State, string>(state => state.adminAccessToken as string);
  const [values, setValues] = useState([{}]);

  const [showSelect, setShowSelect] = useState<boolean>(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleColorChange = (e: any) => {
    setcolorSelected(`#${rgba2hex(`rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})`)}`)
    setValue('colorCode', `#${rgba2hex(`rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})`)}`,)
    clearErrors('colorCode')
  }

  const { handleSubmit, watch, setValue, register, formState: { errors }, getValues, setError, clearErrors, trigger }
    = useForm<any>({});

  const formTrigger = async () => { }
  const onSubmit = (data: any) => {
    dispatch({
      type: 'ADMIN_FORM_SUBMIT',
      payload: true
    })
    axios.post(createColorUrl, data, {
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
        toast(<ToastMessage >{`Color ${data[`label_${i18n.language}`]} was created successfully`}</ToastMessage>, {
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
    setError,
    clearErrors,
    watch,
    colorSelected,
    classes,
    showSelect,
    setShowSelect,
    handleColorChange,
    t
  }
}

export default createColorHook;
