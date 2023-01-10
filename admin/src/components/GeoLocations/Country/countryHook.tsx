import { useEffect } from "react";
import useCurrentRouteState from '@/hookes/useCurrentRouteState';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from "@/src/components/Dashboard/ReactRouter";

const countryHook = () => {
  let query = useQuery();
  const _id = query.get('_id');
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