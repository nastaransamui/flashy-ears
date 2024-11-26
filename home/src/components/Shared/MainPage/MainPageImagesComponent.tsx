import { State } from "@/src/redux/store";
import { FC, useEffect, useState, useRef, createRef } from "react";
import { useSelector } from "react-redux";
import { Controller, Scene } from 'react-scrollmagic';
import ImageStyle from "./Image-style";
import anime from 'animejs/lib/anime';
import ScrollIntoView from 'react-scroll-into-view'
import useShallowTranslation from "@/hookes/useShallowTranslation";
import gsap from "gsap";
import { TweenMax, TimelineMax } from "gsap"; // Also works with TweenLite and TimelineLite
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { useTheme } from "@mui/material";
import Link from "next/link";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Fab from '@mui/material/Fab';


var lastScrollTop = 0;

const MainPageImagesComponent: FC = (() => {
  const [current, setCurrent] = useState<number>(0)
  const [dir, setDir] = useState('next')
  const { slides } = useSelector<State, State>((state) => state)
  const [isAnimating, setIsAnimating] = useState(false)
  const { classes, cx } = ImageStyle({})
  const slideTrackRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useShallowTranslation('common')
  const theme = useTheme()

  const [elRefs, setElRefs] = useState<any[]>([]);
  const [desRefs, setDesRefs] = useState<any[]>([]);
  const [buttonRefs, setButtonRefs] = useState<any[]>([]);

  useEffect(() => {
    // add  refs
    if (slides.length !== 0) {
      setElRefs((elRefs) =>
        Array(slides.length)
          .fill(0)
          .map((_, i) => elRefs[i] || createRef())
      );
      setDesRefs((elRefs) =>
        Array(slides.length)
          .fill(0)
          .map((_, i) => desRefs[i] || createRef())
      );
      setButtonRefs((elRefs) =>
        Array(slides.length)
          .fill(0)
          .map((_, i) => buttonRefs[i] || createRef())
      );
    }
  }, [slides]);

  useEffect(() => {
    const handleScroll = (event: any) => {
      let scrollMagic = document.querySelector<HTMLElement>(".scrollmagic-pin-spacer")

      // if (scrollMagic !== null && process.env.NODE_ENV == 'development') {
      //   scrollMagic.style.paddingBottom = '0';
      // }
      var st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setDir('next')
      } else {
        setDir('prev')
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      if (window.scrollY > 200 && window.scrollY < 400 && elRefs[current]?.['current']) {

        // gsap.to(elRefs[current]?.['current'], {
        //   top: -150, x: 1, scale: 2, color: '#ff4468', stagger: 0.1
        // });
      }

      if (window.scrollY > 0 && window.scrollY < 3000) {
        setCurrent(0)
      }
      if (window.scrollY > 3000 && window.scrollY < 6000) {
        setCurrent(1)
      }
      if (window.scrollY > 6000 && window.scrollY < 9000) {
        setCurrent(2)
      }
      if (window.scrollY > 9000 && window.scrollY < 12000) {
        setCurrent(3)
      }

    }
    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [elRefs[current]?.['current']])

  let settings = {
    animation: {
      slides: {
        duration: 600,
        easing: 'easeOutQuint',
      },
      shape: {
        duration: 300,
        easing: { in: 'easeOutQuad', out: 'easeOutQuad' },
      },
    },
    frameFill: 'url(#gradient1)',
  };

  useEffect(() => {
    let files = Array.from(slideTrackRef.current!.children);
    if (files.length > 0) {
      let filesTotal = files.length;
      let nav = document.querySelector('.slidenav')
      let rect = files[current].getBoundingClientRect();
      let frameSize = rect.width / 12;
      let paths = {
        initial: calculatePath('initial', rect, frameSize),
        final: calculatePath('final', rect, frameSize),
      }

      let svg = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      svg.setAttribute('class', classes.shape);
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute(
        'viewbox',
        `0 0 ${rect.width} ${rect.height}`
      );
      svg.innerHTML = `
              <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#ED4264">
                      <!--animate attributeName="stop-color" values="#ED4264; #FFEDBC; #ED4264" dur="3s" repeatCount="indefinite"></animate-->
                  </stop>
                  <stop offset="100%" stop-color="#FFEDBC">
                      <!--animate attributeName="stop-color" values="#FFEDBC; #ED4264; #FFEDBC" dur="3s" repeatCount="indefinite"></animate-->
                  </stop>
              </linearGradient>
              </defs>
              <path fill="${settings.frameFill}" d="${paths.initial}"/>
          `;
      document.getElementById('slideshow')!.insertBefore(svg, nav);
      let shape = svg.querySelector('path');
      navigate(shape, paths, files, rect, filesTotal)
    }

  }, [current, slides, slideTrackRef])
  const calculatePath = (path = 'initial', rect: any, frameSize: number) => {
    if (path === 'initial') {
      return `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${rect.width},0 0,0 Z M 0,0 ${rect.width},0 ${rect.width},${rect.height} 0,${rect.height} Z`;
    } else {
      return {
        step1: `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${rect.width},0 0,0 Z M ${frameSize},${frameSize} ${rect.width},0 ${rect.width},${rect.height} 0,${rect.height} Z`,
        step2: `M 0,0 0,${rect.height} ${rect.width},${rect.height
          } ${rect.width},0 0,0 Z M ${frameSize},${frameSize} ${rect.width - frameSize
          },${frameSize} ${rect.width},${rect.height} 0,${rect.height
          } Z`,
        step3: `M 0,0 0,${rect.height} ${rect.width},${rect.height
          } ${rect.width},0 0,0 Z M ${frameSize},${frameSize} ${rect.width - frameSize
          },${frameSize} ${rect.width - frameSize},${rect.height - frameSize
          } 0,${rect.height} Z`,
        step4: `M 0,0 0,${rect.height} ${rect.width},${rect.height
          } ${rect.width},0 0,0 Z M ${frameSize},${frameSize} ${rect.width - frameSize
          },${frameSize} ${rect.width - frameSize},${rect.height - frameSize
          } ${frameSize},${rect.height - frameSize} Z`,
      };
    }
  }

  const navigate = (shape: any, paths: any, slides: any, rect: any, slidesTotal: number) => {
    if (isAnimating) return false;
    setIsAnimating(true)
    const animateShapeInTimeline = anime.timeline({
      duration: settings.animation.shape.duration,
      easing: settings.animation.shape.easing.in,
    });
    animateShapeInTimeline
      .add({
        targets: shape,
        d: paths.final.step1,
      })
      .add({
        targets: shape,
        d: paths.final.step2,
        offset: `-=${settings.animation.shape.duration * 0.5}`,
      })
      .add({
        targets: shape,
        d: paths.final.step3,
        offset: `-=${settings.animation.shape.duration * 0.5}`,
      })
      .add({
        targets: shape,
        d: paths.final.step4,
        offset: `-=${settings.animation.shape.duration * 0.5}`,
      });

    const animateSlides = (slides: any, rect: any) => {
      return new Promise((resolve, reject) => {
        const currentSlide = slides[current];
        anime({
          targets: currentSlide,
          duration: settings.animation.slides.duration,
          easing: settings.animation.slides.easing,
          translateX: dir === 'next' ? -1 * rect.width : rect.width,
          complete: () => {
            // currentSlide.classList.remove('slide--current');
            resolve(currentSlide);
          },
        });


        const newSlide = slides[current];
        newSlide.classList.add('current');
        anime({
          targets: newSlide,
          duration: settings.animation.slides.duration,
          easing: settings.animation.slides.easing,
          translateX: [
            dir === 'next' ? rect.width : -1 * rect.width,
            0,
          ],
        });

        const newSlideImg = newSlide.querySelector('.slide__img');
        anime.remove(newSlideImg);
        anime({
          targets: newSlideImg,
          duration: settings.animation.slides.duration * 4,
          easing: settings.animation.slides.easing,
          translateX: [dir === 'next' ? 200 : -200, 0],
        });

      });
    };

    const animateShapeOut = () => {
      const animateShapeOutTimeline = anime.timeline({
        duration: settings.animation.shape.duration,
        easing: settings.animation.shape.easing.out,
      });
      animateShapeOutTimeline
        .add({
          targets: shape,
          d: paths.final.step3,
        })
        .add({
          targets: shape,
          d: paths.final.step2,
          offset: `-=${settings.animation.shape.duration * 0.5}`,
        })
        .add({
          targets: shape,
          d: paths.final.step1,
          offset: `-=${settings.animation.shape.duration * 0.5}`,
        })
        .add({
          targets: shape,
          d: paths.initial,
          offset: `-=${settings.animation.shape.duration * 0.5}`,
          complete: () => {
            setIsAnimating(false)
          },
        });
    };

    animateShapeInTimeline.finished.then(animateSlides(slides, rect)).then(animateShapeOut);
  }
  const addSpan = (note: any,) => {
    return [...note].map((letter, i) => {
      return <span key={i} className={classes.span}>{letter}</span>
    })
  }

  useEffect(() => {
    var controller: any;
    const load = async () => {
      if (typeof window !== undefined && elRefs[current]?.['current']) {

        const ScrollMagic = (await import('scrollmagic')).default;

        ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
        controller = new ScrollMagic.Controller({
          // globalSceneOptions: {
          //   triggerHook: 1,
          // }
        });
        var titleAnimation = gsap.timeline()
          .add(gsap.to(elRefs[current]?.['current']['children'], {
            left: -1300,
            x: 20,
            scale: 2,
            color: theme.palette.secondary.main,
            stagger: 0.1
          }))
          .add(gsap.to(elRefs[current]?.['current']['children'], {
            left: 1300,
            x: 20,
            scale: 1,
            color: theme.palette.mode == 'dark' ? '#fff' : '#000',
            stagger: 0.2
          }));
        new ScrollMagic.Scene({
          duration: '100%',
          triggerHook: (current * 3000) + 100
        })
          .setTween(titleAnimation)
          .addTo(controller);

        var descri = gsap.timeline()
          .add(gsap.to(desRefs[current]?.['current']['children'], {
            top: -10,
            right: 1300,
            x: 1,
            scale: 92,
            color: theme.palette.primary.main,
            stagger: 0.1
          }))
          .add(gsap.to(desRefs[current]?.['current']['children'], {
            top: 0,
            x: 0,
            scale: 1,
            color: theme.palette.mode == 'dark' ? '#fff' : '#000',
            stagger: 0.2
          }));


        new ScrollMagic.Scene({
          duration: '100%',
          triggerHook: (current * 3000) + 1000
        })
          .setTween(descri)
          .addTo(controller);

        if (buttonRefs[current]?.['current'] !== null) {
          var butsd = gsap.timeline()
            .add(gsap.to(buttonRefs[current]?.['current'], {
              right: 0,
              x: 1,
              scale: 1,
              color: theme.palette.primary.main,
              stagger: 0.1
            }))
          new ScrollMagic.Scene({
            duration: '100%',
            offset: (current * 3000) + 2000
          })
            .setTween(butsd)
            .addTo(controller);
        }




      }
    };
    load();
  }, [elRefs[current]?.['current'], desRefs[current]?.['current'], buttonRefs[current]?.['current'], current])

  useEffect(() => {
    if (buttonRefs[current]?.['current'] !== null) {
      if (buttonRefs[current - 1] !== undefined) {
        buttonRefs[current - 1]['current'].removeAttribute('style')
      }
    }
    if (elRefs[current - 1] !== undefined) {
      elRefs[current - 1]['current'].removeAttribute('style');
      for (let index = 0; index < elRefs[current - 1]['current'].children.length; index++) {
        const element = elRefs[current - 1]['current'].children[index];
        element.removeAttribute('style')
      }
    }
    if (desRefs[current - 1] !== undefined) {
      desRefs[current - 1]['current'].removeAttribute('style')
      for (let index = 0; index < desRefs[current - 1]['current'].children.length; index++) {
        const element = desRefs[current - 1]['current'].children[index];
        element.removeAttribute('style')
      }
    }
  }, [buttonRefs, elRefs, desRefs, current])

  return (
    <main id="top">
      {/* @ts-ignore */}
      <Controller>
        {/* @ts-ignore */}
        <Scene
          triggerHook="onLeave"
          duration={slides.length * 3000}
          pin
        >
          <div className={classes.slideshow} id='slideshow'>
            <div className={classes.slides} ref={slideTrackRef}>
              {
                slides.map((slide: any, i) => {
                  return (
                    <div className={classes.slide + " " + `${current == i ? classes.current : ' '}`} id={`slide_${i}`} key={i}>
                      <div className={classes.slide__img} style={{ backgroundImage: `url('${slide[`img_${theme.palette.mode}` as keyof typeof slide][0]['src' as any]}')` }}></div>
                      <div className="hero-arrow page-scroll home-arrow-down">
                        <a className="">
                          <i aria-hidden="true">{t('scrolldown')}</i>
                        </a>
                      </div>
                      <h2 className={classes.slide__title} ref={elRefs[i]}>{addSpan(slide[`label_${lang}` as keyof typeof slide])}</h2>
                      <p className={classes.slide__desc} ref={desRefs[i]}>{addSpan(slide[`desc_${lang}` as keyof typeof slide])}</p>
                      <Link href={{
                        pathname: '/collections',
                      }} className={classes.linkParent}>
                        <span className={classes.slide__link} ref={buttonRefs[i]}>{slide[`linkTitle_${lang}` as keyof typeof slide]}</span>
                      </Link>
                      <ScrollIntoView style={{ visibility: slides.length - 1 == i ? 'visible' : 'hidden' }} selector="#top" alignToTop smooth className={classes.linkParent}>
                        {/* <span style={{ cursor: 'pointer' }}>Back to top</span> */}
                        <Fab color="primary" aria-label="add">
                          <ArrowUpwardIcon />
                        </Fab>
                      </ScrollIntoView>

                    </div>
                  )
                })
              }
            </div>
          </div>
        </Scene>
      </Controller>
    </main>
  )
})

export default MainPageImagesComponent;