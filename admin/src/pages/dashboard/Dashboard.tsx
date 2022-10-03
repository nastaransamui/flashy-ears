
import DashboardWrapper from '@/src/components/Shared/DashboardWrapper/DashboardWrapper';
import { FC, useState, useEffect } from 'react';
import { unHashProfile } from '@/helpers/unhasshing';
import { useTranslation } from 'react-i18next';
import { CustomPropsTypes } from '@/interfaces/react.interface'
import Prodashboard from '@/src/components/Dashboard/ProDashboard/Prodashboard';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainDashboard, { HelloH } from '@/src/components/Dashboard/MainDashboard/MainDashboard';
import NotFound from '@/src/components/Dashboard/NotFound';
import ReactRouter from '@/src/components/Dashboard/ReactRouter';
type SidebarColor = 'white' | 'black'

const Dashboard: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {
  const { t, i18n } = useTranslation(['dashboard', 'footer', 'users']);
  const { routes } = props;
  const rtlActive = i18n.language == 'fa'
  const accessRole = unHashProfile(localStorage.getItem('accessRole')!)
  const [propsMiniActive, setPropsMiniActive] = useState<boolean>(false);
  const [sidbarOpen, setSibarOpen] = useState<boolean>(false);
  const [sideBarbgColor, setSideBarbgColor] = useState<SidebarColor>('black');
  const sidebarMinimizeFunc = () => {
    setPropsMiniActive(!propsMiniActive);
    localStorage.setItem('miniActive', JSON.stringify(!propsMiniActive))
  };

  const [color, setColor] = useState('white');

  const handleDrawerToggle = () => {
    setSibarOpen(!sidbarOpen);
  };

  const handleSideBarBgToggle = () => {
    setSideBarbgColor(() => (sideBarbgColor == 'black' ? 'white' : 'black'))
    localStorage.setItem('sideBarbgColor', sideBarbgColor == 'black' ? 'white' : 'black')
  }

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      setSideBarbgColor(localStorage.getItem('sideBarbgColor') == null ? 'black' : localStorage.getItem('sideBarbgColor') as SidebarColor)
    }
    return () => {
      isMount = false
    }
  }, [])


  useEffect(() => {
    let isMount = true;
    if (isMount) {

      setPropsMiniActive(
        JSON.stringify(localStorage.getItem('miniActive')) == `null`
          ? false
          : JSON.parse(localStorage.getItem('miniActive')!)
      );
    }
    return () => {
      isMount = false;
    };
  }, [propsMiniActive]);
  return (
    <div >
      <DashboardWrapper>
        <ReactRouter {...props}
          sidebarMinimizeFunc={sidebarMinimizeFunc}
          t={t}
          propsMiniActive={propsMiniActive}
          routes={routes}
          color={color}
          handleDrawerToggle={handleDrawerToggle}
          sidebarOpen={sidbarOpen}
          sideBarbgColor={sideBarbgColor}
          rtlActive={rtlActive}
          handleSideBarBgToggle={handleSideBarBgToggle} />
      </DashboardWrapper>
    </div>
  )
}
export default Dashboard;