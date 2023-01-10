import { useState, useEffect, createContext } from "react";

import { toast } from 'react-toastify';

import axios from 'axios';
import { State } from "@/src/redux/store";

//Hooks
import { useLocation } from "react-router-dom";
import { useQuery } from "@/src/components/Dashboard/ReactRouter";
import useCurrentRouteState from '@/hookes/useCurrentRouteState';
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage, } from 'usehooks-ts'

//Components
import { ToastMessage } from '@/shared/CustomToaster/CustomToaster';

let getOneUrl = '/admin/api/modelsCrud/getOne'

export interface SingleDataInterface {
  setLookupsFilter: Function;
}

const useSingleData = (componet: 'edit' | 'context') => {
  let { state } = useLocation();
  const dispatch = useDispatch();
  const [singleData, setSingleData] = useState(state);
  const { adminAccessToken, reRunSingleGet } = useSelector<State, State>(state => state)
  const currentRouteState = useCurrentRouteState();
  const { modelName, lookUps, predefineDb } = currentRouteState;
  const [lookupsFilter, setLookupsFilter] =
    useLocalStorage(`${modelName}_Lookup`,
      lookUps?.map((a: string) => {
        return {
          [`${modelName}_${a}_pageNumber`]: 1,
          [`${modelName}_${a}_perPage`]: 10,
          [`${modelName}_${a}_sortByField`]: predefineDb ? 'name' : 'createdAt',
          [`${modelName}_${a}_sortDirection`]: predefineDb ? 1 : -1,
        }
      }))

  let query = useQuery();
  const _id = query.get('_id');
  const toastID = `${modelName}_toastId`;


  const abortController = new AbortController();
  const body = {
    modelName: modelName,
    _id: _id,
    lookupsFilter
  }

  const getSingleData = async () => {
    dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: true });
    try {
      axios.post(getOneUrl, body,
        {
          headers: {
            'Content-Type': 'application/json',
            token: `Brearer ${adminAccessToken}`,
          }
        })
        .then((resp) => {
          const { success, data, error } = resp.data;
          if (success) {
            dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })

            dispatch({
              type: "RERUN_SINGLE_GET",
              payload: false,
            })
            setSingleData(data)
          } else {
            toast(<ToastMessage >{error}</ToastMessage>, {
              onClose: () => {
                dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
                toast.dismiss()
              },
              toastId: toastID
            })
          }
        }).catch(function (error) {
          toast(<ToastMessage >{error?.response?.data?.Error || error.message}</ToastMessage>, {
            onClose: () => {
              dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
              dispatch({
                type: "RERUN_SINGLE_GET",
                payload: false,
              })
              toast.dismiss()
            },
            toastId: toastID
          })
        });
    } catch (error) {
      toast(<ToastMessage >{(error as Error).message}</ToastMessage>, {
        onClose: () => {
          dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
          toast.dismiss()
        },
        toastId: toastID
      })
    }
  }


  useEffect(() => {
    if (state == null && _id !== null || reRunSingleGet) {
      //Todo
      if (componet == 'edit') {
        getSingleData();
      }
    }
    return () => {
      abortController.abort();
      if (reRunSingleGet) {
        dispatch({
          type: "RERUN_SINGLE_GET",
          payload: false,
        })
      }
    }
  }, [state, _id, reRunSingleGet])

  const singleDataContext: SingleDataInterface = {
    setLookupsFilter: setLookupsFilter,
  }
  return {
    singleData,
    _id,
    singleDataContext
  }
}

export const SingleDataCtx = createContext<SingleDataInterface>({
  setLookupsFilter: () => { },
})

export default useSingleData;