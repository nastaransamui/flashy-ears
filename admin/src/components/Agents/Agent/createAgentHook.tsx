import { State } from '@/src/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const createAgentHook = () => {
  const { profile } = useSelector<State, State>(state => state)
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
  const handleAgentdataChange = () => { }

  const handleContactDataChange = () => { }

  const handleFinancialDataChange = () => { }
  const handleAcountManagerDataChange = () => { }

  return {
    values,
    handleAgentdataChange,
    handleContactDataChange,
    handleFinancialDataChange,
    handleAcountManagerDataChange
  }
}

export default createAgentHook;
