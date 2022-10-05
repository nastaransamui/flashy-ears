import * as i18n from 'i18next';

export interface Lang {
  id: number;
  title_en: string;
  title_fa: string;
  Lang: string;
  LangCode: string;
  Flag: string;
}

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

export interface ActiveRouteType {
  name_en: string;
  name_fa: string;
  path: string;
}

export interface CustomPropsTypes {
  isVercel?: boolean;
  routes?: RoutesType[];
  propsMiniActive?: boolean;
}

export type ChildrenProps = {
  children: JSX.Element;
};

export interface ProDashboardProps extends CustomPropsTypes {
  handleDrawerToggle: () => void;
  handleSideBarBgToggle: React.MouseEventHandler;
  propsMiniActive: boolean;
  rtlActive: boolean;
  sidebarOpen: boolean;
  sideBarbgColor: string;
  sidebarMinimizeFunc: () => void;
}

export interface SibebarUserProps extends CustomPropsTypes {
  sideBarbgColor: string;
  rtlActive: boolean;
  openCollapse: Function;
  propsMiniActive: boolean;
  stateMiniActive: boolean;
  openAvatar: boolean;
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
  state: DrawerStateType;
  setState: Function;
  handleDrawerToggle: () => void;
}

export interface BrandLogoTypes {
  rtlActive: boolean;
  stateMiniActive: boolean;
  propsMiniActive: boolean;
  sideBarbgColor: string;
  handleSideBarBgToggle: React.MouseEventHandler;
}
