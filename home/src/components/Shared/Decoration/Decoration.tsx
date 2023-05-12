import decorationStyles from "./decoration-style";
import { FC } from "react";
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

import DotDeco from "@/public/images/decoration/dot-deco.svg";
import TriangleDeco from "@/public/images/decoration/triangle-deco.svg";


const Decoration: FC = (() => {
  const { classes, cx, theme } = decorationStyles({})
  const arrayRange = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );


  return (
    <div className={classes.parallaxWrap} >
      <ParallaxProvider>
        <div className={classes.bannerParallaxWrap}>
          <Parallax
            tagouter="figure"
          >
            <svg
              fill={theme.palette.primary.main}
              width={845}
              height={1099}
              className={
                cx(
                  classes.parallaxVertical,
                  classes.parallaxDot
                )
              }
            >
              <use xlinkHref={`${DotDeco.src}#dot`} />
            </svg>
          </Parallax>
          <Parallax
            y={[-50, 50]}
            tagouter="figure"
          >
            <svg
              width={902}
              height={1042}
              className={
                cx(
                  classes.parallaxVertical,
                  classes.parallaxTriangle
                )
              } version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 845.2 1099.8" xmlSpace="preserve">
              {/* <use xlinkHref={`${DotDeco.src}#dot`} /> */}
              {/* <symbol id="dot" > */}

              <g>
                {
                  arrayRange(10, 1000, 15).map((a: any) => {
                    return arrayRange(-110, 500, 20).map((b: any) => {
                      return (
                        <g key={(a + b).toString()}>
                          <circle className="st0" cx={b} cy={a} r="2" fill={theme.palette.primary.main} />
                        </g>
                      )
                    })
                  })
                }


              </g>
              {/* </symbol> */}
            </svg>
            <svg
              fill={theme.palette.primary.main}
              width={902}
              height={1042}
              className={
                cx(
                  classes.parallaxVertical,
                  classes.parallaxTriangle
                )
              }
            >
              <use xlinkHref={`${TriangleDeco.src}#triangle`} />
            </svg>
          </Parallax>
        </div>
      </ParallaxProvider>
    </div>
  )
})

export default Decoration