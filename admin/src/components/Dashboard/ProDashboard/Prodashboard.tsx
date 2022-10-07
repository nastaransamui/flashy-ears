import { Outlet } from 'react-router-dom';
import { FC } from 'react';
import SidebarMain from '../Sidebar/SidebarMain';

import { ProDashboardProps } from '@/interfaces/react.interface'
import prodashboardStyle from './prodashboard-style';
import NavbarMain from '../Navbar/NavbarMain';
import Footer from '../Footer/Footer';
import ThemeUser from '../Theme/ThemeUser';
import { useSelector } from 'react-redux';
import { State } from '@/src/redux/store';



const Prodashboard: FC<ProDashboardProps> = (props: ProDashboardProps) => {
  const { classes, cx } = prodashboardStyle({})
  const { rtlActive } = props;
  const { propsMiniActive } = useSelector<State, State>(state => state)
  const mainPageMinimize = classes.mainPageMinimize + ' ' + cx({
    [classes.mainPageHandlemainOpen]: propsMiniActive,
    [classes.mainPageHandlemainClose]: !propsMiniActive
  })

  return (
    <div >
      <SidebarMain {...props} />
      <NavbarMain {...props} />
      <span className={mainPageMinimize + ' ' + classes.main} >
        <Outlet />
      </span>
      <ThemeUser rtlActive={rtlActive} />
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