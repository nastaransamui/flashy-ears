import { useEffect } from "react";
import useSingleData from '@/hookes/useSingleData'
import useCurrentRouteState from '@/hookes/useCurrentRouteState';
import { useNavigate, useLocation } from 'react-router-dom';

const countryHook = () => {
  const { _id, singleData } = useSingleData();
  const currentRouteState = useCurrentRouteState();
  const navigate = useNavigate();

  const { search } = useLocation()

  useEffect(() => {
    if (!_id || search == '') {
      navigate(currentRouteState.path)
    }
  }, [_id])
  return { currentRouteState }
}


export default countryHook;