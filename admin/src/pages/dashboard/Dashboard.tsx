import PropTypes from 'prop-types'
import DashboardWrapper from '@/src/components/Shared/DashboardWrapper/DashboardWrapper';
import { FC, } from 'react';
import { CustomPropsTypes, RoutesType } from '@/interfaces/react.interface'
import ReactRouter from '@/src/components/Dashboard/ReactRouter';
import useDashboard from './useDashboard';
import { BrowserRouter } from "react-router-dom";

const Dashboard: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {

  const { routes } = props;
  const {
    sidebarMinimizeFunc,
    handleDrawerToggle,
    sidebarOpen,
    sideBarbgColor,
    rtlActive,
    handleSideBarBgToggle,
  } = useDashboard()
  return (
    <div >
      <DashboardWrapper>
        <BrowserRouter basename='/admin/dashboard'
          future={{
            v7_startTransition: true,
          }}>
          <ReactRouter
            handleDrawerToggle={handleDrawerToggle}
            handleSideBarBgToggle={handleSideBarBgToggle}
            sidebarMinimizeFunc={sidebarMinimizeFunc}
            rtlActive={rtlActive}
            sidebarOpen={sidebarOpen}
            sideBarbgColor={sideBarbgColor}
            routes={routes as RoutesType[]} state={undefined} setState={undefined} getCollapseInitialState={() => { }} />
        </BrowserRouter>
      </DashboardWrapper>
    </div>
  )
}

Dashboard.propTypes = {
  routes: PropTypes.array.isRequired,
  isVercel: PropTypes.bool.isRequired
};

export default Dashboard;
