import { useRef, createContext, useEffect } from 'react'
import { useLocalStorage, } from 'usehooks-ts'
import useCurrentRouteState from '@/hookes/useCurrentRouteState'
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';

import { toast } from 'react-toastify';
import { ToastMessage } from '@/shared/CustomToaster/CustomToaster';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import CustomAlert from '../CustomAlert/CustomAlert';

let getAllUrl = '/admin/api/modelsCrud/getAll';
let deleteUrl = '/admin/api/modelsCrud/delete';
let statusUrl = '/admin/api/modelsCrud/status';

export interface DataShowInterface {
  setCardView: Function;
  setPerPage: Function;
  setGridView: Function;
  setPageNumber: Function;
  setSortByField: Function;
  setSortDirection: Function;
  multipleDeleteClicked: Function;
  singleDeleteClicked: Function;
  multipleStatusClicked: Function;
  singleStatusClicked: Function;
}

const useDataShow = () => {
  const widthRef = useRef<HTMLDivElement>(null);
  const currentRouteState = useCurrentRouteState();
  const { modelName, predefineDb, activeOnly, path } = currentRouteState;
  const { adminAccessToken, deleteIds, statusIdsUpdate } = useSelector<State, State>(state => state)
  const location = useLocation();
  const dispatch = useDispatch()
  const toastID = `${modelName}_toastId`;
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
    useLocalStorage(`${modelName}_sortByField`, predefineDb ? 'name' : 'createdAt')
  const [sortDirection, setSortDirection] =
    useLocalStorage(`${modelName}_sortDirection`, predefineDb ? 1 : -1)

  const abortController = new AbortController();
  const body = {
    modelName: modelName,
    perPage: perPage,
    pageNumber: pageNumber,
    sortByField: sortByField,
    sortDirection: sortDirection,
    activeOnly: activeOnly
  }
  const allResults = async () => {
    dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: true });

    try {
      axios.post(getAllUrl, body,
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
          toast(<ToastMessage >{error.response.data.Error || error.message}</ToastMessage>, {
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
  const sweetAlert = CustomAlert();

  useEffect(() => {
    allResults()
    return () => {
      abortController.abort();
    }
  }, [perPage, pageNumber, sortDirection, sortByField, path, activeOnly]);


  const deleteResults = async (arrayOfIds: string[]) => {
    dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: true });
    axios.post(deleteUrl, { ...body, arrayOfIds }, {
      headers: {
        'Content-Type': 'application/json',
        token: `Brearer ${adminAccessToken}`,
      }
    })
      .then(async function (resp) {
        dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false });
        const { success, totalCount, data, error } = resp.data
        if (success) {
          dispatch({ type: 'TOTAL_DATA', payload: data });
          dispatch({ type: 'TOTAL_COUNT', payload: totalCount });
          dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false });
          dispatch({ type: 'DELETE_IDS', payload: [] });
          dispatch({ type: 'FIRST_SEARCH', payload: '' });
          dispatch({ type: 'FIELD_VALUE', payload: '' });
          dispatch({ type: 'FIRST_ROW', payload: [] });
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
        toast(<ToastMessage >{error.response.data.Error || error.message}</ToastMessage>, {
          onClose: () => {
            dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
            toast.dismiss()
          },
          toastId: toastID
        })
      });
  }

  const statusUpdateResult = async (arrayOfIds: string[], status: string) => {
    dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: true });
    axios.post(statusUrl, { ...body, arrayOfIds, status },
      {
        headers: {
          'Content-Type': 'application/json',
          token: `Brearer ${adminAccessToken}`,
        }
      })
      .then(function (resp) {
        dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false });
        const { success, totalCount, data, error } = resp.data
        if (success) {
          dispatch({ type: 'TOTAL_DATA', payload: data });
          dispatch({ type: 'TOTAL_COUNT', payload: totalCount });
          dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false });
          dispatch({ type: 'STATUS_IDS_UPDATE', payload: [] });
          dispatch({ type: 'FIRST_SEARCH', payload: '' });
          dispatch({ type: 'FIELD_VALUE', payload: '' });
          dispatch({ type: 'FIRST_ROW', payload: [] });
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
        toast(<ToastMessage >{error.response.data.Error || error.message}</ToastMessage>, {
          onClose: () => {
            dispatch({ type: 'ADMIN_FORM_SUBMIT', payload: false })
            toast.dismiss()
          },
          toastId: toastID
        })
      });
  }


  const multipleDeleteClicked = () => {
    sweetAlert(deleteIds, 'delete', deleteResults)
  }

  const singleDeleteClicked = (_id: string) => {
    // console.log([_id])
    sweetAlert([_id], 'delete', deleteResults);
  }

  const multipleStatusClicked = (status: string) => {
    sweetAlert(statusIdsUpdate, status, statusUpdateResult)
  }

  const singleStatusClicked = (_id: string, status: string) => {
    // console.log([_id])
    sweetAlert([_id], status, statusUpdateResult);
  }



  const dataShowContext: DataShowInterface = {
    setCardView: setCardView,
    setPerPage: setPerPage,
    setGridView: setGridView,
    setPageNumber: setPageNumber,
    setSortByField: setSortByField,
    setSortDirection: setSortDirection,
    multipleDeleteClicked: multipleDeleteClicked,
    singleDeleteClicked: singleDeleteClicked,
    multipleStatusClicked: multipleStatusClicked,
    singleStatusClicked: singleStatusClicked,
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
  multipleDeleteClicked: () => { },
  singleDeleteClicked: () => { },
  multipleStatusClicked: () => { },
  singleStatusClicked: () => { },
});

export default useDataShow