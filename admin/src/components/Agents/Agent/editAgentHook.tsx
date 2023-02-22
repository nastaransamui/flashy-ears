import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import { useForm } from "react-hook-form";

const editAgentHook = (singleData: any) => {
  const dispatch = useDispatch();
  const { reRunSingleGet, profile } = useSelector<State, State>(state => state)
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
      email: '',
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
      // userCreated: [profile._id],
      // userUpdated: [profile._id],
      // accountManager_id: [],
      // accountManager: '',
      userCreatedData: [],
      userUpdatedData: [],
      accountManagerData: [],
    }
  ]);
  console.log(singleData)
  useEffect(() => {
    if (singleData !== null) {
      setValues([
        {
          _id: singleData?._id,
          agentId: singleData?.agentId,
          agentName: singleData?.agentName,
          isActive: singleData?.isActive,
          logoImage: singleData?.logoImage,
          logoImageKey: singleData?.logoImageKey,
          finalFolder: singleData?.finalFolder,
          folderId: singleData?.folderId,
          remark: singleData?.remark,
        },
        {
          email: singleData?.email,
          address: singleData?.address,
          city_id: singleData?.city_id,
          cityName: singleData?.cityName,
          province_id: singleData?.province_id,
          provinceName: singleData?.provinceName,
          country_id: singleData?.country_id,
          countryName: singleData?.countryName,
          phones: singleData?.phones,
        },
        {
          currencyCode_id: singleData?.currencyCode_id,
          currencyCode: singleData?.currencyCode,
          creditAmount: singleData?.creditAmount,
          depositAmount: singleData?.depositAmount,
          remainCreditAmount: singleData?.remainCreditAmount,
          remainDepositAmount: singleData?.remainDepositAmount,
        },
        {
          userCreatedData: singleData?.userCreatedData,
          userUpdatedData: singleData?.userUpdatedData,
          accountManagerData: singleData?.accountManagerData,
        }
      ])
    }
  }, [singleData])


  const handleAcountManagerDataChange = () => {
    if (
      singleData?.userCreatedData == undefined ||
      singleData?.userUpdatedData == undefined ||
      singleData?.accountManagerData == undefined
    ) {
      dispatch({
        type: "RERUN_SINGLE_GET",
        payload: !reRunSingleGet,
      })
    }
  }
  const { handleSubmit, watch, control, register, formState: { errors }, resetField, setError, clearErrors, trigger } = useForm<any>();
  const formTrigger = async () => { }
  const onSubmit = (data: any) => console.log(data)

  return {
    values,
    handleSubmit,
    formTrigger,
    onSubmit,
    handleAcountManagerDataChange
  }
}

export default editAgentHook;