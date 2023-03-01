import { State } from '@/src/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import productStyles from "./product-style";
import axios from 'axios';
import { useTranslation } from "react-i18next";

import { toast } from 'react-toastify';
import { ToastMessage } from '@/shared/CustomToaster/CustomToaster';
import { useNavigate } from "react-router-dom";


// let createColorUrl = '/admin/api/home/createColor'

const createProductHook = () => {

  const { t, i18n } = useTranslation('Products')
  const { theme, classes } = productStyles({})
  const { adminAccessToken } = useSelector<State, State>(state => state)
  const [validate, setValidate] = useState<boolean>(false)
  const [secondValidate, setSecondValidate] = useState<boolean>(false)
  const [thirdValidate, setThirdValidate] = useState<boolean>(false)
  const [colorArray, setColorArray] = useState(null)
  const [collectionArray, setcollectionArray] = useState(null)
  const [values, setValues] = useState([
    {
      product_name_en: '',
      product_name_th: '',
      product_label_en: '',
      product_label_th: '',
      product_subtitle_en: '',
      product_subtitle_th: '',
      product__description_en: '',
      product__description_th: '',
    },
    {
      colors: [],
      collections: []
    },
    {
      images: [
        {
          front: {},
          back: {}
        }
      ]
    }
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { handleSubmit, watch, setValue, register, formState: { errors }, resetField, setError, clearErrors, trigger, control }
    = useForm<any>({});
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == 'colors' || name == 'collections') {
        // console.log(value[name].length)
        if (value[name].length == 0) {
          setSecondValidate(() => false)
          setError(name, t('required', { ns: 'common' }))
        } else {
          clearErrors(name)
        }
      }
      if (value[`${name}`] !== '') {
        clearErrors(name)
      }
      if (
        Object.values(value).every((a) => a !== '')) {
        setValidate(() => true)
        if (
          value['collections'] !== undefined &&
          value['colors'] !== undefined &&
          value['colors']?.length > 0 &&
          value['collections']?.length > 0
        ) {
          // console.log('validate second')
          setSecondValidate(() => true)
        }
      } else {
        setValidate(() => false)
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  const formTrigger = async () => {
    const result = await trigger([
      "product_name_en",
      "product_name_th",
      "product_label_en",
      "product_label_th",
      "product_subtitle_en",
      "product_subtitle_th",
      "product__description_en",
      "product__description_th",
      'colors',
      "collections"
    ]);
  }

  const getAllColors = async () => {
    axios.get('/admin/api/home/productsColorsCollections')
      .then((resp) => {
        const { success, data, error } = resp.data;
        if (success) {
          switch (true) {
            case data['collections'].length == 0:
              setColorArray(data['colors'])
              setcollectionArray(t('collectionsEmpty'))
              break;
            case data['colors'].length == 0:
              setColorArray(t('colorEmpty'))
              setcollectionArray(data['collections'])
              break;

            default:
              setColorArray(data['colors'])
              setcollectionArray(data['collections'])
              break;
          }
        }
      })
      .catch((err) => {
        console.log(err)
        setColorArray(err.message)
        setcollectionArray(err.message)
        // setColorArray(() => err.message)
      })
  }
  const onSubmit = (data: any) => { console.log(data) }
  return {
    theme,
    values,
    colorArray,
    collectionArray,
    setValues,
    validate,
    secondValidate,
    thirdValidate,
    getAllColors,
    handleSubmit,
    formTrigger,
    onSubmit,
    errors,
    register,
    watch,
    Controller,
    control,
    resetField,
    classes,
    t
  }
}

export default createProductHook;
