import PropTypes from 'prop-types'
import DashboardWrapper from '@/src/components/Shared/DashboardWrapper/DashboardWrapper';
import { FC, } from 'react';
import { unHashProfile } from '@/helpers/unhasshing';
import { CustomPropsTypes, RoutesType } from '@/interfaces/react.interface'
import ReactRouter from '@/src/components/Dashboard/ReactRouter';
import useDashboard from './useDashboard';


const Dashboard: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {

  const { routes } = props;
  const accessRole = unHashProfile(localStorage.getItem('accessRole')!)

  return (
    <div >
      <DashboardWrapper>
        <ReactRouter
          {...props}
          {...useDashboard()}
          routes={routes as RoutesType[]}
        />
      </DashboardWrapper>
    </div>
  )
}

Dashboard.propTypes = {
  routes: PropTypes.array.isRequired,
  isVercel: PropTypes.bool.isRequired
};

export default Dashboard;
