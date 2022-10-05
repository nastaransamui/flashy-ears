
import { useMemo, FC } from 'react';
import Prodashboard from '@/src/components/Dashboard/ProDashboard/Prodashboard';
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import React from "react";
import { ProDashboardProps } from '../Shared/interfaces/react.interface';
import MainDashboard, { OneUser, UserList } from './MainDashboard/MainDashboard';
import NotFound from './NotFound';
import PropTypes from 'prop-types'

export function NotFoundPage() {
  return null;
}

export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const ReactRouter: FC<ProDashboardProps> = (props: ProDashboardProps) => {

  return (
    <React.StrictMode>
      <BrowserRouter basename='/admin/dashboard'>
        <Routes>
          <Route path="/" element={<Prodashboard {...props} />}>
            <Route index element={<MainDashboard {...props} />} />
            <Route path="/users-page" element={<UserList {...props} />} />
            <Route path="/user-page" element={<OneUser {...props} />} />
            <Route path="/user-page/:id" element={<OneUser {...props} />} />
            <Route path="*" element={<NotFound {...props} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}

ReactRouter.propTypes = {

}

export default ReactRouter