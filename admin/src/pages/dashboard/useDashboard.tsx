import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
type SidebarColor = 'white' | 'black'
const useDashboard = () => {
  const { i18n } = useTranslation(['dashboard', 'footer', 'users']);
  const rtlActive = i18n.language == 'fa'
  const [propsMiniActive, setPropsMiniActive] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [sideBarbgColor, setSideBarbgColor] = useState<SidebarColor>('black');
  const sidebarMinimizeFunc = () => {
    setPropsMiniActive(!propsMiniActive);
    localStorage.setItem('miniActive', JSON.stringify(!propsMiniActive))
  };


  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
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
  return {
    sidebarMinimizeFunc,
    propsMiniActive,
    handleDrawerToggle,
    sidebarOpen,
    sideBarbgColor,
    rtlActive,
    handleSideBarBgToggle
  }
}
export default useDashboard;