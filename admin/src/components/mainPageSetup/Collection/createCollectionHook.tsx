import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/src/redux/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from 'react-toastify';
import { ToastMessage } from '@/shared/CustomToaster/CustomToaster';
import { useForm, Controller } from "react-hook-form";

let createCollection = '/admin/api/home/createCollection'



interface StatePropsTitle {
  desc_en: string;
  desc_th: string;
  label_en: string;
  label_th: string;
  name_en: string;
  name_th: string;
  linkTitle_en: string,
  linkTitle_th: string,
}

interface StatePropsMedia {
  img: string;
}

interface StateProps {

}

const createCollectionHook = () => {
  const { t, i18n } = useTranslation('Collections')
  const adminAccessToken = useSelector<State, string>(state => state.adminAccessToken as string)
  const [values, setValues] = useState<any>([
    {
      label_en: '',
      label_th: '',
      name_en: '',
      name_th: '',
      desc_en: '',
      desc_th: '',
      linkTitle_en: '',
      linkTitle_th: '',
    },
    {
      img_dark: [
        {
          height: 0,
          width: 0,
          isSelected: false,
          tags: [
            {
              value: '', title: ''
            }
          ],
          path: '',
          src: ''
        }
      ],
      img_light: [
        {
          height: 0,
          width: 0,
          isSelected: false,
          tags: [
            {
              value: '', title: ''
            }
          ],
          path: '',
          src: ''
        }
      ],
    }
  ]);

  const {
    handleSubmit,
    watch, setValue,
    register, unregister,
    formState: { errors },
    resetField,
    setError,
    clearErrors,
    trigger,
    control,
    getValues, } = useForm<any>();
  const [validate, setValidate] = useState<boolean>(false)
  const [imagevalidate, setImageValidate] = useState<boolean>(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    const formData = new FormData();
    if (validate && imagevalidate) {
      formData.append("label_en", data.label_en);
      formData.append("label_th", data.label_th);
      formData.append("name_en", data.name_en);
      formData.append("name_th", data.name_th);
      formData.append("linkTitle_en", data.linkTitle_en);
      formData.append("linkTitle_th", data.linkTitle_th);
      formData.append("desc_en", data.desc_en);
      formData.append("desc_th", data.desc_th);
      formData.append("img_light", data.img_light);
      formData.append("img_dark", data.img_dark);
      formData.append("img_light_src", JSON.stringify(values[1]['img_light']));
      formData.append("img_dark_src", JSON.stringify(values[1]['img_dark']));
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
            toast(<ToastMessage >{`Collection ${data[`label_${i18n.language}`]} was created successfully`}</ToastMessage>, {
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
      if (name !== 'img_light' && name !== 'img_dark') {
        if (Object.values(value).every((a) => a !== '')) {
          setValidate(() => true)
          clearErrors(name)
        } else {
          if (value[name as string] !== '') {
            clearErrors(name)
          }
          if (value[name as string] == '') {
            setError(name as string, { type: 'required', message: t('required', { ns: 'common' }) })
          }
          setValidate(() => false)
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const formTrigger = async () => {
    const result = await trigger([
      'label_en',
      'label_th',
      'name_en',
      'name_th',
      "linkTitle_en",
      "linkTitle_th",
      "desc_en",
      "desc_th",]);
  }
  return {
    t,
    watch,
    values,
    setValue,
    setValues,
    control,
    Controller,
    getValues,
    clearErrors,
    setError,
    register,
    errors,
    validate,
    setValidate,
    resetField,
    onSubmit,
    formTrigger,
    handleSubmit,
    imagevalidate,
    setImageValidate
  }
}

export default createCollectionHook;