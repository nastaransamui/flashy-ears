import { useState, } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';

import { ToastMessage } from '@/shared/CustomToaster/CustomToaster';

import axios from 'axios'
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { unHashProfile } from '../../../helpers/unhasshing';
import { db } from '@/src/browserDb';


const api = `/admin/api/auth/login`
interface StateProps {
  email: string;
  password: string;
  showPassword: boolean;
}

const useLoginForm = () => {
  const { t } = useTranslation('common')
  const router = useRouter();
  const [values, setValues] = useState<StateProps>({
    email: '',
    password: '',
    showPassword: false,
  });

  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm<StateProps>();
  const onSubmit = (data: StateProps) => {
    const body = { ...data, strategy: 'local' }
    dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: true });
    axios.post(api, body)
      .then(async (resp) => {
        const { success, error, accessToken, accessRole } = resp.data
        if (!success) {
          toast(<ToastMessage >{t(`${error}`, { email: data.email })}</ToastMessage>, {
            onClose: () => {
              dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
            }
          })
        } else {
          const profile: any = unHashProfile(accessToken)
          try {
            await db.open();
            await db.routesDb.bulkAdd(accessRole)
            console.log(accessRole)
            dispatch({ type: 'ACCESS_ROLE', payload: accessRole })
            if (profile.err) {
              toast(<ToastMessage >{t(`${profile.err}`)}</ToastMessage>, {
                onClose: () => {
                  dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
                }
              })
            } else {
              dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
              dispatch({ type: 'ADMIN_ACCESS_TOKEN', payload: accessToken });
              dispatch({ type: 'ADMIN_PROFILE', profile })
              setCookie('adminAccessToken', accessToken);
              router.push('/dashboard');
            }

          } catch (error) {
            console.log(error)
            toast(<ToastMessage >{(error as Error).message}</ToastMessage>, {
              onClose: () => {
                dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
              }
            })
          }
        }
      })
      .catch((error) => {
        toast(<ToastMessage >{t(`${error.response.data.error}`)}</ToastMessage>, {
          onClose: () => {
            dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
          }
        })
      })
  };

  return {
    values,
    setValues,
    control,
    handleSubmit,
    onSubmit,
  }

}

export default useLoginForm;