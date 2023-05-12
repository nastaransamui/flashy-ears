import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { ToastMessage } from '@/shared/CustomToaster/CustomToaster';
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

let editCollectionUrl = '/admin/api/home/editCollection'

const editCollectionHook = (singleData: any, _id: string | null) => {
  const dispatch = useDispatch();
  const { reRunSingleGet } = useSelector<State, State>(state => state)
  const navigate = useNavigate();
  const [imagevalidate, setImageValidate] = useState<boolean>(false)
  const [productValidation, setProductValidation] = useState(false)
  const [values, setValues] = useState([
    {
      title_en: singleData?.title_en,
      title_th: singleData?.title_th,
      desc_en: singleData?.desc_en,
      desc_th: singleData?.desc_th,
      linkTitle_en: singleData?.linkTitle_en,
      linkTitle_th: singleData?.linkTitle_th,
    }, {
      img_dark: singleData?.img_dark,
      img_light: singleData?.img_light,
    }, {
      totalProducts: singleData?.totalProducts,
      productData: singleData?.productData,
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
          }, {
            totalProducts: singleData.totalProducts,
            productData: singleData.productData,
          }
        ])
        setValidate(() => true)
        setImageValidate(() => true)
      }
    }
  }, [singleData])

  const { t, i18n } = useTranslation('Collections')
  const { adminAccessToken } = useSelector<State, State>(state => state)
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
  const hanldeProductsData = () => {
    if (singleData?.productData == undefined) {
      dispatch({
        type: "RERUN_SINGLE_GET",
        payload: !reRunSingleGet,
      })
    }
  }

  const onSubmit = (data: any) => {
    const formData = new FormData();
    if (validate && imagevalidate && productValidation) {
      formData.append("title_en", data.title_en);
      formData.append("title_th", data.title_th);
      formData.append("linkTitle_en", data.linkTitle_en);
      formData.append("linkTitle_th", data.linkTitle_th);
      formData.append("desc_en", data.desc_en);
      formData.append("desc_th", data.desc_th);
      formData.append("img_light", data.img_light);
      formData.append("img_dark", data.img_dark);
      formData.append("img_light_src", JSON.stringify(values[1]['img_light']));
      formData.append("img_dark_src", JSON.stringify(values[1]['img_dark']));
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

  }
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name !== 'img_light' && name !== 'img_dark') {
        if (Object.values(value).every((a) => a !== '')) {
          setValidate(() => true)
          clearErrors(name)
        } else {
          if (value[name as string] !== '') {
            setValidate(() => true)
            clearErrors(name)
          }
          if (value[name as string] == '') {
            setValidate(() => false)
            setError(name as string, { type: 'required', message: t('required', { ns: 'common' }) })
          }
        }
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
      "desc_th",
      'img_light',
      'img_dark']);
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
    resetField,
    onSubmit,
    formTrigger,
    handleSubmit,
    imagevalidate,
    setImageValidate,
    productValidation,
    setProductValidation,
    hanldeProductsData
  }
}

export default editCollectionHook;