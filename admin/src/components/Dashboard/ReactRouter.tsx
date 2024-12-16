
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
import Collections from '@/src/components/mainPageSetup/Collections/Collections';
import Collection from '@/src/components/mainPageSetup/Collection/Collection';
import Colors from '@/src/components/Colors/Colors/Colors';
import Color from '@/src/components/Colors/Color/Color'
import Products from '@/src/components/Products/Products/Products';
import Product from '@/src/components/Products/Product/Product'
// import Photos from '@/src/components/mainPageSetup/Photos/Photos';
// import Photo from '@/src/components/mainPageSetup/Photo/Photo';
// import Features from '@/src/components/mainPageSetup/Features/Features';
// import Feature from '@/src/components/mainPageSetup/Feature/Feature';
// import Countries from '@/src/components/GeoLocations/Countries/Countries';
// import Country from '@/src/components/GeoLocations/Country/Country';
// import Provinces from '@/src/components/GeoLocations/Provinces/Provinces';
// import Province from '@/src/components/GeoLocations/Province/Province';
// import Cities from '@/src/components/GeoLocations/Cities/Cities';
// import City from '@/src/components/GeoLocations/City/City';
// import Currencies from '@/src/components/Exchange/Currencies/Currencies';
// import Currency from '@/src/components/Exchange/Currency/Currency';
// import Agencies from '@/src/components/Agents/Agencies/Agencies';
// import Agent from '@/src/components/Agents/Agent/Agent';
import { RoutesViews } from '@/interfaces/react.interface';
import { useSelector } from 'react-redux';
import { Profile, State } from '@/src/redux/store';
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
      Collections,
      Collection,
      Colors,
      Color,
      Products,
      Product
    }
  }, [])

  const profile = useSelector<State, Profile>(state => state.profile)

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
    <Routes >
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