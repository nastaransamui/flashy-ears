import { useRef, createContext, useEffect } from 'react'
import { useLocalStorage, } from 'usehooks-ts'
import useCurrentRouteState from '@/hookes/useCurrentRouteState'
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';

import { toast } from 'react-toastify';
import { ToastMessage } from '@/shared/CustomToaster/CustomToaster';
import axios from 'axios';

let url = '/admin/api/modelsCrud/getAll'

export interface DataShowInterface {
  setCardView: Function;
  setPerPage: Function;
  setGridView: Function;
  setPageNumber: Function;
  setSortByField: Function;
  setSortDirection: Function;
}

const useDataShow = () => {
  const widthRef = useRef<HTMLDivElement>(null);
  const currentRouteState = useCurrentRouteState();
  const { modelName } = currentRouteState;
  const { adminAccessToken } = useSelector<State, State>(state => state)
  const dispatch = useDispatch()
  const toastID = `${modelName}_toatId`;
  //Dynamically add locall storage for view
  const [cardView, setCardView] =
    useLocalStorage(`${modelName}_cardView`, true)
  const [perPage, setPerPage] =
    useLocalStorage(`${modelName}_perPage`, 48)
  const [gridView, setGridView] =
    useLocalStorage(`${modelName}_gridView`, 4)
  const [pageNumber, setPageNumber] =
    useLocalStorage(`${modelName}_pageNumber`, 1)
  const [sortByField, setSortByField] =
    useLocalStorage(`${modelName}_sortByField`, 'createdAt')
  const [sortDirection, setSortDirection] =
    useLocalStorage(`${modelName}_sortDirection`, -1)


  const abortController = new AbortController();

  const allResults = async () => {
    dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: true });
    const body = {
      modelName: modelName,
      perPage: perPage,
      pageNumber: pageNumber,
      sortByField: sortByField,
      sortDirection: sortDirection
    }
    try {
      axios.post(url, body,
        {
          headers: {
            'Content-Type': 'application/json',
            token: `Brearer ${adminAccessToken}`,
          }
        })
        .then(function (resp) {
          const { success, totalCount, data, error } = resp.data
          if (success) {
            dispatch({ type: 'TOTAL_DATA', payload: data });
            dispatch({ type: 'TOTAL_COUNT', payload: totalCount });
            dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false });
          } else {
            toast(<ToastMessage >{error}</ToastMessage>, {
              onClose: () => {
                dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
                toast.dismiss()
              },
              toastId: toastID
            })
          }
        })
        .catch(function (error) {
          toast(<ToastMessage >{error.response.data.error}</ToastMessage>, {
            onClose: () => {
              dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
              toast.dismiss()
            },
            toastId: toastID
          })
        });
    } catch (error) {
      console.log(error)
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
    let isMount = true;
    if (isMount) {
      allResults()
    }
    return () => {
      isMount = false
      abortController.abort();
    }
  }, [perPage, pageNumber, sortDirection, sortByField])



  const dataShowContext: DataShowInterface = {
    setCardView: setCardView,
    setPerPage: setPerPage,
    setGridView: setGridView,
    setPageNumber: setPageNumber,
    setSortByField: setSortByField,
    setSortDirection: setSortDirection,
  }


  return {
    widthRef,
    cardView,
    dataShowContext
  }

}

export const DataShowCtx = createContext<DataShowInterface>({
  setCardView: () => { },
  setPerPage: () => { },
  setGridView: () => { },
  setPageNumber: () => { },
  setSortByField: () => { },
  setSortDirection: () => { },
});

export default useDataShow