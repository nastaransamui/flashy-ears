import * as i18n from 'i18next';

export interface RoutesViews {
  path?: string;
  name_en: string;
  name_fa: string;
  mini_en: string;
  mini_fa: string;
  state: string;
  collapse?: boolean;
  views?: RoutesViews[];
}

export interface RoutesType {
  path: string;
  name_en: string;
  name_fa: string;
  collapse?: boolean;
  state: string;
  icon?: string;
  views?: RoutesViews[];
}

export interface CustomPropsTypes {
  t?: i18n.TFunction;
  routes?: RoutesType[];
}

export type ChildrenProps = {
  children: JSX.Element;
};

export interface ProDashboardProps extends CustomPropsTypes {
  sidebarMinimizeFunc: Function;
  propsMiniActive: boolean;
  color: string;
  handleDrawerToggle: () => void;
  sidebarOpen: boolean;
  sideBarbgColor: string;
  rtlActive: boolean;
  handleSideBarBgToggle: React.MouseEventHandler;
}

export interface SibebarUserProps extends CustomPropsTypes {
  sideBarbgColor: string;
  rtlActive: boolean;
  openCollapse: Function;
  propsMiniActive: boolean;
  stateMiniActive: boolean;
  openAvatar: boolean;
  handleDrawerToggle: () => void;
}

export interface DrawerStateType {
  stateMiniActive: boolean;
  openAvatar: boolean;
  [key: string]: boolean;
}

export interface SideBarLinksTypes {
  getCollapseInitialState: Function;
  routes: RoutesType[];
  sideBarbgColor: string;
  rtlActive: boolean;
  propsMiniActive: boolean;
  stateMiniActive: boolean;
  state: DrawerStateType;
  setState: Function;
  handleDrawerToggle: () => void;
}
