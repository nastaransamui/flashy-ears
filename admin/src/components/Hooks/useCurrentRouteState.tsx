import { useSelector } from "react-redux";
import { State } from "@/src/redux/store";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { RoutesType } from '@/interfaces/react.interface';

const useCurrentRouteState = () => {
  const location = useLocation()
  const { spreadRoutes } = useSelector<State, State>(state => state)
  const currentRoute = spreadRoutes.filter((a) => a.path == location.pathname)
  const [currentRouteState, setCurrentRouteState] = useState<RoutesType>({ ...currentRoute[0] })
  useEffect(() => {
    setCurrentRouteState({ ...currentRoute[0] })
    return () => { }
  }, [location])

  return currentRouteState;

}

export default useCurrentRouteState