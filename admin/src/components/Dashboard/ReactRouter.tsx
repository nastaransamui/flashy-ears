
import { useMemo, FC } from 'react';
import Prodashboard from '@/src/components/Dashboard/ProDashboard/Prodashboard';
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import React from "react";
import { ProDashboardProps } from '../Shared/interfaces/react.interface';
import MainDashboard, { HelloH } from './MainDashboard/MainDashboard';
import NotFound from './NotFound';


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
            <Route path="/user-page" element={<HelloH {...props} />} />
            <Route path="*" element={<NotFound {...props} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default ReactRouter