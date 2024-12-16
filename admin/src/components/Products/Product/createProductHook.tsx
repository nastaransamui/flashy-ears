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
var toBoolean = require('to-boolean');

let createProductUrl = '/admin/api/home/createProduct'

const createProductHook = () => {

  const { t, i18n } = useTranslation('Products')
  const { theme, classes } = productStyles({})
  const adminAccessToken = useSelector<State, string>(state => state.adminAccessToken as string)
  const [informationValidate, setInformationValidate] = useState<boolean>(false)
  const [colorValidation, setColorValidation] = useState<boolean>(false)
  const [financialValidation, setFinancialValidation] = useState<boolean>(false)
  const [imagesValidation, setImagesValidation] = useState<boolean>(false)
  const [galleryValidation, setGalleryValidation] = useState<boolean>(false)
  const [colorArray, setColorArray] = useState(null)
  const [collectionArray, setcollectionArray] = useState(null)
  const [values, setValues] = useState([
    {
      product_label_en: '',
      product_label_th: '',
      product_name_en: '',
      product_name_th: '',
      product_subtitle_en: '',
      product_subtitle_th: '',
      product_description_en: '',
      product_description_th: '',
    },
    {
      colors_id: [],
      collection_id: []
    },
    {
      financials: []
    },
    {
      images: [
        {
          front: [],
        },
        {
          back: [],
        }
      ]
    },
    {
      gallery: []
    },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch({
        type: "PRODUCT_FINANCIAL_FILL_ALL",
        payload: localStorage.getItem('productFinancialFillAll') == null ? null : toBoolean(localStorage.getItem('productFinancialFillAll'))
      })
    }
  }, [])
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

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
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
      "product_description_en",
      "product_description_th",
      'colors_id',
      "collection_id",
      "financials",
      "images",
      'gallery'
    ]);
  }
  const getAllColors = async () => {
    axios.get('/admin/api/home/productsColorsCollections')
      .then((resp) => {
        const { success, data, error } = resp.data;
        if (success) {
          switch (true) {
            case data['collections'].length == 0:
              setColorArray(data['colors'].sort((a: any, b: any) => {
                if (a['label_en'] < b['label_en']) return -1
              }))
              setcollectionArray(t('collectionsEmpty'))
              break;
            case data['colors'].length == 0:

              setColorArray(t('colorEmpty'))
              setcollectionArray(data['collections'].sort((a: any, b: any) => {
                if (a['title_en'] < b['title_en']) return -1
              }))
              break;

            default:
              setColorArray(data['colors'].sort((a: any, b: any) => {
                if (a['label_en'] < b['label_en']) return -1
              }))
              setcollectionArray(data['collections'].sort((a: any, b: any) => {
                if (a['title_en'] < b['title_en']) return -1
              }))
              break;
          }
        }
      })
      .catch((err) => {
        setColorArray(err.message)
        setcollectionArray(err.message)
      })
  }
  const onSubmit = (data: any) => {
    if (informationValidate && colorValidation && imagesValidation && galleryValidation) {
      const formData = new FormData();

      formData.append("product_description_en", data.product_description_en);
      formData.append("product_description_th", data.product_description_th);
      formData.append("product_label_en", data.product_label_en);
      formData.append("product_label_th", data.product_label_th);
      formData.append("product_name_en", data.product_name_en);
      formData.append("product_name_th", data.product_name_th);
      formData.append("product_subtitle_en", data.product_subtitle_en);
      formData.append("product_subtitle_th", data.product_subtitle_th);
      formData.append("collection_id", JSON.stringify(data.collection_id));
      formData.append("colors_id", JSON.stringify(data.colors_id));
      formData.append("financials", JSON.stringify(data.financials));
      formData.append("images_information", JSON.stringify(values[3]));
      formData.append("gallery_information", JSON.stringify(values[4]));
      data.gallery.forEach((file: File) => {

        formData.append("gallery", file);
      });
      data.images[0]['front'].forEach((image: any) => {
        Object.entries(image).map((a: any) => {
          formData.append(`images_front_${a[0]}`, a[1]);
        })
      })
      data.images[1]['back'].forEach((image: any) => {
        Object.entries(image).map((a: any) => {
          formData.append(`images_back_${a[0]}`, a[1]);
        })
      })

      dispatch({
        type: 'ADMIN_FORM_SUBMIT',
        payload: true
      })
      axios.post(createProductUrl, formData, {
        headers: {
          "Content-Type": 'multipart/form-data',
          token: `Brearer ${adminAccessToken}`,
        }
      }).then((resp) => {
        const { success, data, error } = resp.data;
        dispatch({
          type: 'ADMIN_FORM_SUBMIT',
          payload: false
        })
        if (success) {
          toast(<ToastMessage >{`Product ${data[`product_label_${i18n.language}`]} was created successfully`}</ToastMessage>, {
            onClose: () => {
              dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
              dispatch({
                type: "RERUN_SINGLE_GET",
                payload: false,
              })
              toast.dismiss()
              navigate('/products-data/products')
            },
            toastId: `createProduct_toastId`
          })
        }
      })
        .catch((error) => {
          toast(<ToastMessage >{error?.response?.data?.Error || error.message}</ToastMessage>, {
            onClose: () => {
              if (error?.response?.statusText == 'Unauthorized') {
                // location.reload()
              }
              dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
              // dispatch({
              //   type: "RERUN_SINGLE_GET",
              //   payload: false,
              // })
              toast.dismiss()
            },
            toastId: `createProduct_toastId`
          })
        });

    }
  }
  return {
    theme,
    values,
    colorArray,
    collectionArray,
    setValues,
    setValue,
    getValues,
    setError,
    clearErrors,
    setFinancialValidation,
    financialValidation,
    setImagesValidation,
    informationValidate,
    setInformationValidate,
    colorValidation,
    setColorValidation,
    imagesValidation,
    galleryValidation,
    setGalleryValidation,
    getAllColors,
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

export default createProductHook;