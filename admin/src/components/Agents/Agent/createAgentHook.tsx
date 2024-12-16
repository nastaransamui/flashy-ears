import { Profile, State } from '@/src/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
const createAgentHook = () => {
  const profile = useSelector<State, Profile>(state => state.profile)
  const [values, setValues] = useState([
    {
      _id: '',
      agentId: '',
      agentName: '',
      isActive: '',
      logoImage: '',
      logoImageKey: '',
      finalFolder: 'agencies',
      folderId: (Math.random() + 1).toString(36).substring(7),
      remark: '',
    },
    {
      address: '',
      city_id: [],
      cityName: '',
      province_id: [],
      provinceName: '',
      country_id: [],
      countryName: '',
      phones: [
        {
          tags: [''],
          number: '',
          remark: '',
        },
      ],
      email: '',
    },
    {
      currencyCode_id: [],
      currencyCode: '',
      creditAmount: '',
      depositAmount: '',
      remainCreditAmount: '',
      remainDepositAmount: '',
    },
    {
      userCreated: [profile._id],
      userUpdated: [profile._id],
      accountManager_id: [],
      accountManager: '',
    }
  ]);
  const { handleSubmit, watch, control, register, formState: { errors }, resetField, setError, clearErrors, trigger } = useForm<any>();
  const formTrigger = async () => { }
  const onSubmit = (data: any) => console.log(data)
  return {
    values,
    handleSubmit,
    formTrigger,
    onSubmit,
  }
}

export default createAgentHook;
