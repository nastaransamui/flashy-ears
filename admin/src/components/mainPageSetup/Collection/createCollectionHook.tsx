import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/src/redux/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from 'react-toastify';
import { ToastMessage } from '@/shared/CustomToaster/CustomToaster';
import { useForm } from "react-hook-form";

let createCollection = '/admin/api/home/createCollection'



interface StatePropsTitle {
  desc_en: string;
  desc_th: string;
  title_en: string;
  title_th: string,
  linkTitle_en: string,
  linkTitle_th: string,
  link: string,
}

interface StatePropsMedia {
  img: string;
}

interface StateProps {

}

const createCollectionHook = () => {
  const { t, i18n } = useTranslation('Collections')
  const { adminAccessToken } = useSelector<State, State>(state => state)
  const [values, setValues] = useState<any>([
    {
      desc_en: '',
      desc_th: '',
      title_en: '',
      title_th: '',
      linkTitle_en: '',
      linkTitle_th: '',
      link: '',
    },
    {
      img_dark: '',
      img_light: '',
    }
  ]);

  const { handleSubmit, watch, control, register, formState: { errors }, resetField, setError, clearErrors, trigger } = useForm<any>();
  const [validate, setValidate] = useState<boolean>(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    const formData = new FormData();
    if (validate) {
      formData.append("title_en", data.title_en);
      formData.append("title_th", data.title_th);
      formData.append("linkTitle_en", data.linkTitle_en);
      formData.append("linkTitle_th", data.linkTitle_th);
      formData.append("desc_en", data.desc_en);
      formData.append("desc_th", data.desc_th);
      formData.append("img_light", data.img_light[0]);
      formData.append("img_dark", data.img_dark[0]);
      dispatch({
        type: 'ADMIN_FORM_SUBMIT',
        payload: true
      })
      axios
        .post(createCollection, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Brearer ${adminAccessToken}`,
          },
        })
        .then((resp) => {
          const { success, data, error } = resp.data;
          dispatch({
            type: 'ADMIN_FORM_SUBMIT',
            payload: false
          })
          if (success) {
            toast(<ToastMessage >{`Collection ${data[`title_${i18n.language}`]} was created successfully`}</ToastMessage>, {
              onClose: () => {
                dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
                dispatch({
                  type: "RERUN_SINGLE_GET",
                  payload: false,
                })
                toast.dismiss()
                navigate('/main-page-setup/collections')
              },
              toastId: `createCollection_toastId`
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
            toastId: `createCollection_toastId`
          })
        });
    }

  }

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        Object.values(value).every((a) => a !== '') &&
        value['title_en'].length <= 11 &&
        value['title_th'].length <= 11 &&
        value['linkTitle_en'].length <= 11 &&
        value['linkTitle_th'].length <= 11 &&
        value['desc_en'].length <= 37 &&
        value['desc_th'].length <= 37
      ) {
        setValidate(() => true)
      } else {
        setValidate(() => false)
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const formTrigger = async () => {
    const result = await trigger([
      "title_en",
      "title_th",
      "linkTitle_en",
      "linkTitle_th",
      "desc_en",
      "desc_th",]);
  }
  return {
    t,
    watch,
    values,
    clearErrors,
    setError,
    register,
    errors,
    validate,
    resetField,
    onSubmit,
    formTrigger,
    handleSubmit
  }
}

export default createCollectionHook;