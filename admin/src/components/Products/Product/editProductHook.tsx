import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import productStyles from "./product-style";
import { useTranslation } from "react-i18next";
import axios from 'axios';

import { toast } from 'react-toastify';
import { ToastMessage } from '@/shared/CustomToaster/CustomToaster';
// let editColorUrl = '/admin/api/home/editColor'

const editProductHook = (singleData: any) => {
  const dispatch = useDispatch();
  const { adminAccessToken } = useSelector<State, State>(state => state)
  const { t, i18n } = useTranslation('Products')
  const { theme, classes } = productStyles({})
  const navigate = useNavigate();
  const [values, setValues] = useState([
    {
      _id: '',
    },
  ]);

  useEffect(() => {
    if (singleData !== null) {
      if (singleData == undefined) {
        navigate('/products-data/products')
      } else {

      }
    }
  }, [singleData])


  const { handleSubmit, watch, setValue, register, formState: { errors }, resetField, setError, clearErrors, trigger }
    = useForm<any>({});
  const formTrigger = async () => { }
  const onSubmit = (data: any) => { }

  return {
    values,
    handleSubmit,
    formTrigger,
    onSubmit,
    errors,
    register,
    watch,
    classes,
    t
  }
}

export default editProductHook;