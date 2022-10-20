
import { useMemo, FC, Fragment } from 'react';
import Prodashboard from '@/src/components/Dashboard/ProDashboard/Prodashboard';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ProDashboardProps } from '../Shared/interfaces/react.interface';
import MainDashboard from './MainDashboard/MainDashboard';
import NotFound from './NotFound';
import PropTypes from 'prop-types'
import Users from '@/src/components/Users/Users/Users';
import User from '@/src/components/Users/User/User';
import Roles from '@/src/components/Rbac/Roles/Roles';
import Role from '@/src/components/Rbac/Role/Role';
import Videos from '@/src/components/mainPageSetup/Videos/Videos';
import Video from '@/src/components/mainPageSetup/Video/Video';
import Photos from '@/src/components/mainPageSetup/Photos/Photos';
import Photo from '@/src/components/mainPageSetup/Photo/Photo';
import Features from '@/src/components/mainPageSetup/Features/Features';
import Feature from '@/src/components/mainPageSetup/Feature/Feature';
import Countries from '@/src/components/GeoLocations/Countries/Countries';
import Country from '@/src/components/GeoLocations/Country/Country';
import Currencies from '@/src/components/Exchange/Currencies/Currencies';
import Currency from '@/src/components/Exchange/Currency/Currency';
import { RoutesViews } from '@/interfaces/react.interface';
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
      Users,
      User,
      Roles,
      Role,
      Videos,
      Video,
      Photos,
      Photo,
      Features,
      Feature,
      Countries,
      Country,
      Currencies,
      Currency
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