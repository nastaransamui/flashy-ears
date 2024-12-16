import { Outlet } from 'react-router-dom';
import { FC, useState } from 'react';
import SidebarMain from '../Sidebar/SidebarMain';

import { ProDashboardProps, RoutesType, DrawerStateType } from '@/interfaces/react.interface'
import prodashboardStyle from './prodashboard-style';
import NavbarMain from '../Navbar/NavbarMain';
import Footer from '../Footer/Footer';
import ThemeUser from '../Theme/ThemeUser';
import { useSelector } from 'react-redux';
import { Profile, State } from '@/src/redux/store';
import { useQuery } from "@/src/components/Dashboard/ReactRouter";

const Prodashboard: FC<ProDashboardProps> = (props: ProDashboardProps) => {
  const { classes, cx } = prodashboardStyle({})
  const { rtlActive, routes } = props;
  const profile = useSelector<State, Profile>(state => state.profile)
  const propsMiniActive = useSelector<State, boolean>((state) => state.propsMiniActive);
  const mainPageMinimize = classes.mainPageMinimize + ' ' + cx({
    [classes.mainPageHandlemainOpen]: propsMiniActive,
    [classes.mainPageHandlemainClose]: !propsMiniActive
  })
  let query = useQuery();
  const _id = query.get('_id');
  const getCollapseInitialState = (routes: RoutesType[]) => {
    for (let i = 0; i < routes?.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views as RoutesType[])) {
        return true;
      } else if (typeof routes[i].path !== 'undefined' && location.pathname.endsWith(routes[i].path)) {
        //don't collapse if _id is equal with profile
        if (profile._id == _id) {
          return false
        } else {
          return true;
        }
      } else if (typeof routes[i].editUrl !== 'undefined' && location.pathname.endsWith(routes[i].editUrl!)) {
        return true
      }
    }
    return false;
  };
  const getCollapseStates = (routes: RoutesType[]) => {
    let initialState = {};
    routes.map((prop) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop?.views as RoutesType[]),
          ...getCollapseStates(prop?.views as RoutesType[]),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };


  const [state, setState] = useState<DrawerStateType>({
    stateMiniActive: true,
    openAvatar: false,
    ...getCollapseStates(routes as RoutesType[])
  });
  return (
    <div >
      <SidebarMain {...props} state={state} setState={setState} getCollapseInitialState={getCollapseInitialState} />
      <NavbarMain {...props} />
      <span className={mainPageMinimize + ' ' + classes.main} >
        <Outlet />
      </span>
      <ThemeUser rtlActive={rtlActive} state={state} />
      <span className={mainPageMinimize}
        style={{
          display: 'flex',
          width: '100%',
        }}>
        <Footer />
      </span>
    </div>
  )
}

export default Prodashboard