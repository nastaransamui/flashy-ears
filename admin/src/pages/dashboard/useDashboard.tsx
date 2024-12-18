import { State } from '@/src/redux/store';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';


type SidebarColor = 'white' | 'black'
const useDashboard = () => {
  const { i18n } = useTranslation(['dashboard', 'footer', 'users']);
  const rtlActive = i18n.language == 'fa'
  const propsMiniActive = useSelector<State, boolean>(state => state.propsMiniActive)
  const dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [sideBarbgColor, setSideBarbgColor] = useState<SidebarColor>('black');

  const sidebarMinimizeFunc = () => {
    localStorage.setItem('miniActive', JSON.stringify(!propsMiniActive))
    dispatch({
      type: 'PROPS_MINI_ACTIVE',
      payload: !propsMiniActive,
    });
  };

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSideBarBgToggle = () => {
    setSideBarbgColor(() => (sideBarbgColor == 'black' ? 'white' : 'black'))
    localStorage.setItem('sideBarbgColor', sideBarbgColor == 'black' ? 'white' : 'black')
  }


  // update sidebar color from local storage
  useEffect(() => {
    setSideBarbgColor(localStorage.getItem('sideBarbgColor') == null ? 'black' : localStorage.getItem('sideBarbgColor') as SidebarColor)
    return () => { }
  }, [])


  //Update open or close of side bar from localstorage
  useEffect(() => {
    dispatch({
      type: 'PROPS_MINI_ACTIVE',
      payload: JSON.stringify(localStorage.getItem('miniActive')) == `null`
        ? false
        : JSON.parse(localStorage.getItem('miniActive')!),
    });

    return () => { };
  }, [propsMiniActive]);
  return {
    sidebarMinimizeFunc,
    handleDrawerToggle,
    sidebarOpen,
    sideBarbgColor,
    rtlActive,
    handleSideBarBgToggle
  }
}
export default useDashboard;