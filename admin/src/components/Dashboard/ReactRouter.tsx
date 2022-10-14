
import { useMemo, FC, Fragment, useState, useEffect } from 'react';
import Prodashboard from '@/src/components/Dashboard/ProDashboard/Prodashboard';
import { Routes, Route, BrowserRouter, useLocation, useSearchParams, Navigate } from "react-router-dom";
import React from "react";
import { ProDashboardProps } from '../Shared/interfaces/react.interface';
import MainDashboard, { OneUser, UserList } from './MainDashboard/MainDashboard';
import NotFound from './NotFound';
import PropTypes from 'prop-types'
import Roles from '@/src/components/Rbac/Roles/Roles';
import Role from '../Rbac/Role/Role';
import { RoutesType, RoutesViews } from '@/interfaces/react.interface';
import { useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const ReactRouter: FC<ProDashboardProps> = (props: ProDashboardProps) => {
  const { routes } = props
  const componentsMap = useMemo(() => {
    return {
      MainDashboard,
      UserList,
      OneUser,
      Roles,
      Role,
    }
  }, [])

  const { profile } = useSelector<State, State>(state => state)

  // Spread array of routes
  const allRoutes: RoutesViews[] = []
  routes?.forEach(function iter(a) {
    allRoutes.push(a as any);
    Array.isArray(a.views) && a.views.map(iter as any);
  })

  let query = useQuery();
  let location = useLocation();
  const isProfilePage = location.search !== '' && query.get('_id') !== null && query.get('_id') == profile._id

  return (
    // <React.StrictMode>
    <Routes>
      <Route path="/" element={<Prodashboard {...props} />} >
        <Route index element={<MainDashboard {...props} />} />
        {
          allRoutes?.map((a) => {
            if (a?.componentName !== undefined) {
              const DynamicComponent = componentsMap[a.componentName as keyof typeof componentsMap];

              return (
                <Fragment key={a.state}>
                  <Route path={a.path} element={
                    isProfilePage ? <DynamicComponent {...props} /> :
                      !a.access ? <Navigate to="/" replace />
                        : <DynamicComponent {...props} />} />
                </Fragment>
              )
            }

          })
        }
        <Route path="*" element={<NotFound {...props} />} />
      </Route>
    </Routes>

  )
}

ReactRouter.propTypes = {
  routes: PropTypes.array.isRequired
}

export default ReactRouter