
import { FC, Fragment } from "react";
import dynamic from "next/dynamic";
// const ImageComponet = dynamic(() => import("@/shared/MainPage/ImageComponent/ImageComponent"), { ssr: false });
import ImageComponet from "@/shared/MainPage/ImageComponent/ImageComponent";
import PageComponent from "@/shared/MainPage/PageComponent/PageComponent";



const MainPage: FC = (() => {


  return (
    <Fragment>
      <ImageComponet />
      <PageComponent />
    </Fragment>
  )
})

export default MainPage