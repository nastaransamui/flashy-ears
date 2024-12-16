import { useSelector } from "react-redux";
import { State } from "@/src/redux/store";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { RoutesType } from '@/interfaces/react.interface';

const useCurrentRouteState = () => {
  const location = useLocation()
  const spreadRoutes = useSelector<State, RoutesType[]>((state) => state.spreadRoutes);
  const currentRoute = spreadRoutes.filter((a) => {
    if (a.path == location.pathname) {
      return a.path == location.pathname
    }
    if (a.editUrl == location.pathname) {
      return a.editUrl == location.pathname
    }

  })
  const [currentRouteState, setCurrentRouteState] = useState<RoutesType>({ ...currentRoute[0] })
  useEffect(() => {
    setCurrentRouteState({ ...currentRoute[0] })
    return () => { }
  }, [location])

  return currentRouteState;

}

export default useCurrentRouteState