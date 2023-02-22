import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { ToastMessage } from '@/shared/CustomToaster/CustomToaster';
import axios from "axios";
import { useForm } from "react-hook-form";

let editCollectionUrl = '/admin/api/home/editCollection'

const editCollectionHook = (singleData: any, _id: string | null) => {
  const dispatch = useDispatch();
  const { reRunSingleGet } = useSelector<State, State>(state => state)
  const navigate = useNavigate();
  const [values, setValues] = useState([
    {
      title_en: '',
      title_th: '',
      desc_en: '',
      desc_th: '',
      linkTitle_en: '',
      linkTitle_th: '',
    },
    {
      img_dark: '',
      img_light: '',
    }
  ]);

  useEffect(() => {
    if (singleData !== null) {
      if (singleData == undefined) {
        navigate('/main-page-setup/collections')
      } else {
        setValues([
          {
            title_en: singleData.title_en,
            title_th: singleData.title_th,
            desc_en: singleData.desc_en,
            desc_th: singleData.desc_th,
            linkTitle_en: singleData.linkTitle_en,
            linkTitle_th: singleData.linkTitle_th,
          }, {
            img_dark: singleData.img_dark,
            img_light: singleData.img_light,
          }
        ])
      }
    }
  }, [singleData])

  const { t, i18n } = useTranslation('Collections')
  const { adminAccessToken } = useSelector<State, State>(state => state)
  const { handleSubmit, watch, setValue, register, formState: { errors }, trigger, resetField, setError, clearErrors } = useForm<any>();
  const [validate, setValidate] = useState<boolean>(false)


  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("title_en", data.title_en);
    formData.append("title_th", data.title_th);
    formData.append("linkTitle_en", data.linkTitle_en);
    formData.append("linkTitle_th", data.linkTitle_th);
    formData.append("desc_en", data.desc_en);
    formData.append("desc_th", data.desc_th);
    formData.append("img_dark", typeof data.img_dark == 'string' ? values[1].img_dark : data.img_dark[0]);
    formData.append("img_light", typeof data.img_light == 'string' ? values[1].img_light : data.img_light[0]);
    formData.append("_id", _id!)
    dispatch({
      type: 'ADMIN_FORM_SUBMIT',
      payload: true
    })
    axios
      .post(editCollectionUrl, formData, {
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
          toast(<ToastMessage >{`Collection ${data[`title_${i18n.language}`]} was edited successfully`}</ToastMessage>, {
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
  useEffect(() => {
    setValue("title_en", values[0]['title_en'])
    setValue("title_th", values[0]['title_th'])
    setValue("linkTitle_en", values[0]['linkTitle_en'])
    setValue("linkTitle_th", values[0]['linkTitle_th'])
    setValue("desc_en", values[0]['desc_en'])
    setValue("desc_th", values[0]['desc_th'])
    setValue("img_light", values[1]['img_light'])
    setValue("img_dark", values[1]['img_dark'])
  }, [values])
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
    values,
    t,
    setError,
    clearErrors,
    watch,
    register,
    errors,
    validate,
    resetField,
    onSubmit,
    handleSubmit,
    formTrigger
  }
}

export default editCollectionHook;