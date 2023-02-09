
import { FC, useEffect, useState } from "react";

import galleryStyles from "./gallery-style";
import SideBar from "@/shared/SideBar";
import useShallowTranslation from "@/hookes/useShallowTranslation";
import Script from "next/script";

const Gallery: FC = (() => {

  const { classes, theme, cx } = galleryStyles({});
  const { t, lang } = useShallowTranslation('common');
  // const [percent, setPercent] = useState<number>(0)
  // const [showLoading, setShowLoading] = useState<boolean>(true)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (percent < 100) {
  //       setPercent(() => percent + 1)
  //     } else {
  //       // setShowLoading(false)
  //     }
  //   }, 20);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [percent, showLoading]);

  // console.log(percent)

  return (
    <SideBar >
      <>
        <div className="container">
          gallery
          <section className="content content--related"></section>
        </div>
      </>
    </SideBar>
  )
})

export default Gallery