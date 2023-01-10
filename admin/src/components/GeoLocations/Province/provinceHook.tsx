import { useEffect } from "react";
import { useQuery } from "@/src/components/Dashboard/ReactRouter";
import useCurrentRouteState from '@/hookes/useCurrentRouteState';
import { useNavigate, useLocation } from 'react-router-dom';

const pronvinceHook = () => {
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


export default pronvinceHook;