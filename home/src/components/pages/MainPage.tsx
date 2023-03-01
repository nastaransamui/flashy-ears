
import { FC, Fragment } from "react";
import MainPageImagesComponent from "@/shared/MainPage/MainPageImagesComponent";
import LandingPage from "@/shared/MainPage/LandingPage";
import { useSelector } from "react-redux";
import { State } from "@/src/redux/store";
import SideBar from "../Shared/SideBar";



const MainPage: FC = (() => {

  const { homePageType, } = useSelector<State, State>(state => state)
  return (
    <Fragment>
      {
        homePageType == 'landingPage' ?
          <SideBar>
            <LandingPage />
          </SideBar>
          :
          <MainPageImagesComponent />
      }
    </Fragment>
  )
})

export default MainPage