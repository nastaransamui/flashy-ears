import { useEffect, useState, useRef, SyntheticEvent } from "react";
import { useTranslation } from 'react-i18next';
import useCurrentRouteState from "@/src/components/Hooks/useCurrentRouteState";
import dataShowStyle from "@/shared/DataShow/data-show-style";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { State, TotalDataType } from "@/src/redux/store";
import { MuiTelInputInfo } from "mui-tel-input";
import { OptionType } from "./SearchAutoComplete";

const url = '/admin/api/modelsCrud/search';

const useSearchAutoComplete = () => {
  // const { classes, theme } = dataShowStyle({})
  // const currentRouteState = useCurrentRouteState();
  // const { modelName, activeOnly, predefineDb } = currentRouteState;
  // const { t } = useTranslation(modelName)
  // const { adminAccessToken, totalData, firstSearch, fieldValue } = useSelector<State, State>(state => state)
  // const dispatch = useDispatch()

  // const [value, setValue] = useState<OptionType | null>(null);
  // const [inputValue, setInputValue] = useState('');
  // const [stateOptions, setStateOptions] = useState([]);
  // const [openOption, setOpenOption] = useState<boolean>(false);
  // const [loadingOption, setLoadingOption] = useState<boolean>(openOption && stateOptions.length == 0)

  // const abortController = new AbortController();

  // let allTotalDataCopy = useRef<TotalDataType[]>([]);

  // useEffect(() => {
  //   if (!firstSearch) allTotalDataCopy.current = totalData
  //   return () => { }
  // }, [totalData])

  // const sleep = (delay = 0) => {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, delay);
  //   });
  // };

  // const getOptions = async () => {
  //   const body = {
  //     modelName: modelName,
  //     activeOnly: activeOnly,
  //     fieldValue: fieldValue,
  //     filterValue: inputValue
  //   }

  //   try {
  //     dispatch({
  //       type: 'FIRST_SEARCH',
  //       payload: true
  //     })
  //     axios.post(url, body, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         token: `Brearer ${adminAccessToken}`,
  //       },
  //       signal: abortController.signal
  //     }).then(((res) => {
  //       const { success, data } = res.data
  //       if (success) {
  //         setLoadingOption(() => false)
  //         if (data.length > 0) {
  //           setStateOptions(data)
  //           dispatch({
  //             type: 'TOTAL_DATA',
  //             payload: data
  //           })
  //         } else {
  //           dispatch({
  //             type: 'TOTAL_DATA',
  //             payload: allTotalDataCopy.current
  //           })
  //         }
  //       }
  //     })).catch((err) => {
  //       console.log(err)
  //     })

  //   } catch (error) {

  //   }
  // }

  // useEffect(() => {
  //   if (inputValue !== '') {
  //     (async () => {
  //       await sleep(1e3);
  //       getOptions();
  //     })();
  //   }

  //   return () => { }
  // }, [loadingOption, inputValue])


  // const onChangeFunc = (e: any, newValue: OptionType | null, reason: string) => {
  //   switch (reason) {
  //     case 'selectOption':
  //       setLoadingOption(() => false)
  //       break;
  //   }
  //   setValue(newValue);
  // }

  // const onInputChange = (e: any, newInputValue: string) => {
  //   if (newInputValue == '') {
  //     setLoadingOption(() => false)
  //   } else {
  //     setLoadingOption(() => true)
  //   }
  //   setInputValue(newInputValue);
  // }

  // const onPhoneInputChange = (value: string, info: MuiTelInputInfo) => {
  //   setLoadingOption(() => true)
  //   setInputValue(value)
  // }

  // const onClearClicked = () => {
  //   setInputValue('')
  //   setValue(null)
  //   setStateOptions([])
  //   dispatch({
  //     type: 'TOTAL_DATA',
  //     payload: allTotalDataCopy.current
  //   })
  // }
  // return {
  //   t,
  //   classes,
  //   theme,
  //   value,
  //   inputValue,
  //   onChangeFunc,
  //   onInputChange,
  //   onPhoneInputChange,
  //   modelName,
  //   stateOptions,
  //   loadingOption,
  //   openOption,
  //   setOpenOption,
  //   setValue,
  //   setInputValue,
  //   firstSearch,
  //   onClearClicked,
  //   predefineDb
  // }
}

export default useSearchAutoComplete;