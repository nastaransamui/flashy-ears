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
  const reRunSingleGet = useSelector<State, boolean>(state => state.reRunSingleGet);

  const navigate = useNavigate();
  const [imagevalidate, setImageValidate] = useState<boolean>(false)
  const [productValidation, setProductValidation] = useState(false)
  const [values, setValues] = useState([
    {
      label_en: singleData?.label_en,
      label_th: singleData?.label_th,
      name_en: singleData?.name_en,
      name_th: singleData?.name_th,
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
        setValue("label_en", getValues('label_en') || singleData['label_en'])
        setValue("label_th", getValues('label_th') || singleData['label_th'])
        setValue("name_en", getValues('name_en') || singleData['name_en'])
        setValue("name_th", getValues('name_th') || singleData['name_th'])
        setValue("linkTitle_en", getValues('linkTitle_en') || singleData['linkTitle_en'])
        setValue("linkTitle_th", getValues('linkTitle_th') || singleData['linkTitle_th'])
        setValue("desc_en", getValues('desc_en') || singleData['desc_en'])
        setValue("desc_th", getValues('desc_th') || singleData['desc_th'])
        setValue("img_light", getValues('img_light') || singleData['img_light'])
        setValue("img_dark", getValues('img_dark') || singleData['img_dark'])
        setValues((prevState) => {
          return [
            {
              label_en: prevState[0]['label_en'] || singleData.label_en,
              label_th: prevState[0]['label_th'] || singleData.label_th,
              name_en: prevState[0]['name_en'] || singleData.name_en,
              name_th: prevState[0]['name_th'] || singleData.name_th,
              desc_en: prevState[0]['desc_en'] || singleData.desc_en,
              desc_th: prevState[0]['desc_th'] || singleData.desc_th,
              linkTitle_en: prevState[0]['linkTitle_en'] || singleData.linkTitle_en,
              linkTitle_th: prevState[0]['linkTitle_th'] || singleData.linkTitle_th,
            }, {
              img_dark: prevState[1]['img_dark'] || singleData.img_dark,
              img_light: prevState[1]['img_light'] || singleData.img_light,
            }, {
              totalProducts: prevState[2]['totalProducts'] || singleData.totalProducts,
              productData: prevState[2]['productData'] || singleData.productData,
            }
          ]
        })

        // }
        setValidate(() => true)
        setImageValidate(() => true)
      }
    }
  }, [singleData, reRunSingleGet])

  const { t, i18n } = useTranslation('Collections')
  const adminAccessToken = useSelector<State, string>(state => state.adminAccessToken as string)
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
      formData.append("label_en", data.label_en);
      formData.append("label_th", data.label_th);
      formData.append("name_en", data.name_en);
      formData.append("name_th", data.name_th);
      formData.append("linkTitle_en", data.linkTitle_en);
      formData.append("linkTitle_th", data.linkTitle_th);
      formData.append("desc_en", data.desc_en);
      formData.append("desc_th", data.desc_th);
      formData.append("img_light", data.img_light instanceof File ? data.img_light : JSON.stringify(values[1]['img_light']));
      formData.append("img_dark", data.img_dark instanceof File ? data.img_dark : JSON.stringify(values[1]['img_dark']));
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
            toast(<ToastMessage >{`Collection ${data[`label_${i18n.language}`]} was edited successfully`}</ToastMessage>, {
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

  const formTrigger = async () => {
    const result = await trigger([
      'label_en',
      'label_th',
      'name_en',
      'name_th',
      "linkTitle_en",
      "linkTitle_th",
      "desc_en",
      "desc_th",
    ]);
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
    setImageValidate,
    productValidation,
    setProductValidation,
    hanldeProductsData
  }
}

export default editCollectionHook;