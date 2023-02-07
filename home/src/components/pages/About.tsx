import { FC, createRef, useEffect, MouseEvent, useState } from "react";

import Button from '@mui/material/Button';

import useShallowTranslation from '@/hookes/useShallowTranslation'
import { useRouter } from 'next/router';
import SideBar from "@/shared/SideBar";
import useStyles from "./about-style";
import Script from "next/script";
import Trans from 'next-translate/Trans'
import SocialMedia from "@/shared/SocialMedia/SocialMedia";
import useMediaQuery from '@mui/material/useMediaQuery';


const About: FC = (() => {
  const { t, lang } = useShallowTranslation('common');
  const { classes, cx, theme } = useStyles({})

  const mobile = useMediaQuery(theme.breakpoints.down(900));

  useEffect(() => {
    document.getElementById('main')!.style.padding = `5% 0px`;
    document.getElementById('main')!.style.left = `15px`
    //   document.getElementById('main')!.style.color = `red`
    const load = async () => {
      if (typeof window !== 'undefined') {
        (function () {
          var bodyEl = document.body,
            docElem = window.document.documentElement,
            support = { transitions: window.Modernizr.csstransitions },
            // transition end event name
            transEndEventNames = {
              WebkitTransition: 'webkitTransitionEnd',
              MozTransition: 'transitionend',
              OTransition: 'oTransitionEnd',
              msTransition: 'MSTransitionEnd',
              transition: 'transitionend',
            },
            transEndEventName = transEndEventNames[window.Modernizr.prefixed('transition') as keyof typeof transEndEventNames],
            onEndTransition = function (el: HTMLElement, callback: Function) {
              var onEndCallbackFn = function (ev: any) {

                if (support.transitions) {
                  //@ts-ignore
                  if (ev.target != this) return;
                  //@ts-ignore
                  this.removeEventListener(transEndEventName, onEndCallbackFn);
                }
                if (callback && typeof callback === 'function') {
                  //@ts-ignore
                  callback.call(this);
                }
              };
              if (support.transitions) {
                el.addEventListener(transEndEventName, onEndCallbackFn);
              } else {
                //@ts-ignore
                onEndCallbackFn();
              }
            }
          var gridEl = document.getElementById('theGrid')!
          var gridItemsContainer: any = gridEl.querySelector(`.${classes[`grid` as keyof typeof classes]}`)!
          var contentItemsContainer: any = gridEl.querySelector(`.${classes[`content` as keyof typeof classes]}`)!
          var gridItems = (gridItemsContainer as HTMLElement).querySelectorAll(`.${classes[`grid__item` as keyof typeof classes]}`)
          var contentItems = contentItemsContainer.querySelectorAll(`.${classes['content__item' as keyof typeof classes]}`)
          var closeCtrl = contentItemsContainer.querySelector(`.${classes['closeButton']}`)
          var current = -1,
            lockScroll = false,
            xscroll: any,
            yscroll: any,
            isAnimating = false;
          // menuCtrl = document.getElementById('menu-toggle');
          // menuCloseCtrl = sidebarEl.querySelector('.close-button');

          /**
           * gets the viewport width and height
           * based on http://responsejs.com/labs/dimensions/
           */
          function getViewport(axis: any) {
            var client
            var inner
            if (axis === 'x') {
              client = docElem['clientWidth'];
              inner = window['innerWidth'];
            } else if (axis === 'y') {
              client = docElem['clientHeight'];
              inner = window['innerHeight'];
            }
            if (client && inner) {
              return client < inner ? inner : client;
            } else {
              return 0
            }
          }
          function scrollX() {
            return window.pageXOffset || docElem.scrollLeft;
          }
          function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
          }

          function init() {
            initEvents();
          }

          function initEvents() {
            [].slice.call(gridItems).forEach(function (item: HTMLElement, pos) {
              // grid item click event
              item.addEventListener('click', function (ev: any) {
                ev.preventDefault();
                if (isAnimating || current === pos) {
                  return false;
                }
                isAnimating = true;
                // index of current item
                current = pos;
                // simulate loading time..
                window.classie.add(item, classes.grid__item_loading);
                setTimeout(function () {
                  window.classie.add(item, classes.grid__item__animate);
                  // reveal/load content after the last element animates out (todo: wait for the last transition to finish)
                  setTimeout(function () {
                    loadContent(item);
                  }, 500);
                }, 1000);
              });
            });

            closeCtrl.addEventListener('click', function () {
              // hide content
              hideContent();
            });

            // keyboard esc - hide content
            document.addEventListener('keydown', function (ev) {
              if (!isAnimating && current !== -1) {
                var keyCode = ev.keyCode || ev.which;
                if (keyCode === 27) {
                  ev.preventDefault();
                  if ('activeElement' in document) (document.activeElement as HTMLElement).blur();
                  hideContent();
                }
              }
            });

          }

          function loadContent(item: any) {
            // add expanding element/placeholder
            var dummy = document.createElement('div');
            dummy.className = classes.placeholder;
            //remove padding from top
            document.getElementById('main')!.style.padding = `0px 0px`;
            var menuRef = document.getElementById('menuRef')!;
            menuRef.style.display = 'none'
            // set the width/heigth and position
            dummy.style.transform =
              'translate3d(' +
              (item.offsetLeft - 5) +
              'px, ' +
              (item.offsetTop - 5) +
              'px, 0px) scale3d(' +
              item.offsetWidth / gridItemsContainer.offsetWidth +
              ',' +
              item.offsetHeight / getViewport('y') +
              ',1)';
            dummy.style.transform =
              'translate3d(' +
              (item.offsetLeft - 5) +
              'px, ' +
              (item.offsetTop - 5) +
              'px, 0px) scale3d(' +
              item.offsetWidth / gridItemsContainer.offsetWidth +
              ',' +
              item.offsetHeight / getViewport('y') +
              ',1)';

            // add transition class
            window.classie.add(dummy, classes.placeholderTransIn);

            // insert it after all the grid items
            gridItemsContainer.appendChild(dummy);
            // body overlay
            window.classie.add(bodyEl, classes.viewSingle);

            setTimeout(function () {
              // expands the placeholder
              dummy.style.transform =
                'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
              dummy.style.transform =
                'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
              // disallow scroll
              window.addEventListener('scroll', noscroll);
            }, 25);

            onEndTransition(dummy, function () {
              // add transition class
              window.classie.remove(dummy, classes.placeholderTransIn);
              window.classie.add(dummy, classes.placeholderTransOut);
              // position the content container
              contentItemsContainer.style.top = scrollY() + 'px';
              // show the main content container
              window.classie.add(contentItemsContainer, classes.contentShow);
              // show content item:
              window.classie.add(contentItems[current], classes.content__item__show);
              // show close control
              window.classie.add(closeCtrl, classes.closeButtonShow);
              // sets overflow hidden to the body and allows the switch to the content scroll
              window.classie.addClass(bodyEl, classes.noscroll);

              isAnimating = false;
            });
          }

          function hideContent() {
            var gridItem = gridItems[current] as HTMLElement
            var contentItem = contentItems[current];
            document.getElementById('main')!.style.padding = `8% 0px`;
            var menuRef = document.getElementById('menuRef')!;
            menuRef.style.display = 'flex'

            window.classie.remove(contentItem, classes.content__item__show);
            window.classie.remove(contentItemsContainer, classes.contentShow);
            window.classie.remove(closeCtrl, classes.closeButtonShow);
            window.classie.remove(bodyEl, classes.viewSingle);

            setTimeout(function () {
              var dummy = gridItemsContainer.querySelector(`.${classes.placeholder}`);
              window.classie.removeClass(bodyEl, classes.noscroll);

              dummy.style.WebkitTransform =
                'translate3d(' +
                gridItem.offsetLeft +
                'px, ' +
                gridItem.offsetTop +
                'px, 0px) scale3d(' +
                gridItem.offsetWidth / gridItemsContainer.offsetWidth +
                ',' +
                gridItem.offsetHeight / getViewport('y') +
                ',1)';
              dummy.style.transform =
                'translate3d(' +
                gridItem.offsetLeft +
                'px, ' +
                gridItem.offsetTop +
                'px, 0px) scale3d(' +
                gridItem.offsetWidth / gridItemsContainer.offsetWidth +
                ',' +
                gridItem.offsetHeight / getViewport('y') +
                ',1)';

              onEndTransition(dummy, function () {
                // reset content scroll..
                contentItem.parentNode.scrollTop = 0;
                gridItemsContainer.removeChild(dummy);
                window.classie.remove(gridItem, classes.grid__item_loading);
                window.classie.remove(gridItem, classes.grid__item__animate);
                lockScroll = false;
                window.removeEventListener('scroll', noscroll);

              });

              // reset current
              current = -1;
            }, 25);
          }

          function noscroll() {
            if (!lockScroll) {
              lockScroll = true;
              xscroll = scrollX();
              yscroll = scrollY();
            }
            window.scrollTo(xscroll, yscroll);
          }

          init();
        })();
      }
    }
    // load();
  }, [])

  const getViewport = (axis: any) => {
    var docElem = window.document.documentElement
    var client
    var inner
    if (axis === 'x') {
      client = docElem['clientWidth'];
      inner = window['innerWidth'];
    } else if (axis === 'y') {
      client = docElem['clientHeight'];
      inner = window['innerHeight'];
    }
    if (client && inner) {
      return client < inner ? inner : client;
    } else {
      return 0
    }
  }

  const [current, setCurrent] = useState(-1)
  const onLinkClick = (e: MouseEvent, index: number) => {
    setCurrent(index)
    e.preventDefault();
    var bodyEl = document.body
    var docElem = window.document.documentElement
    var support = { transitions: window.Modernizr.csstransitions }
    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd',
      msTransition: 'MSTransitionEnd',
      transition: 'transitionend',
    }
    var transEndEventName = transEndEventNames[window.Modernizr.prefixed('transition') as keyof typeof transEndEventNames]
    var onEndTransition = function (el: HTMLElement, callback: Function) {
      var onEndCallbackFn = function (ev: any) {

        if (support.transitions) {
          //@ts-ignore
          if (ev.target != this) return;
          //@ts-ignore
          this.removeEventListener(transEndEventName, onEndCallbackFn);
        }
        if (callback && typeof callback === 'function') {
          //@ts-ignore
          callback.call(this);
        }
      };
      if (support.transitions) {
        el.addEventListener(transEndEventName, onEndCallbackFn);
      } else {
        //@ts-ignore
        onEndCallbackFn();
      }
    }
    var gridEl = document.getElementById('theGrid')!
    var gridItemsContainer: any = gridEl.querySelector(`.${classes[`grid` as keyof typeof classes]}`)!
    var contentItemsContainer: any = gridEl.querySelector(`.${classes[`content` as keyof typeof classes]}`)!
    var contentItems = contentItemsContainer.querySelectorAll(`.${classes['content__item' as keyof typeof classes]}`)

    var gridItems: any = (gridItemsContainer as HTMLElement).querySelectorAll(`.${classes[`grid__item` as keyof typeof classes]}`)
    var lockScroll = false,
      xscroll: any,
      yscroll: any,
      isAnimating = false;
    window.classie.add(gridItems[index], classes.grid__item_loading);
    setTimeout(function () {
      window.classie.add(gridItems[index], classes.grid__item__animate);
      setTimeout(function () {
        var dummy = document.createElement('div');
        dummy.className = classes.placeholder;
        document.getElementById('main')!.style.padding = `0px 0px`;
        var menuRef = document.getElementById('menuRef')!;
        menuRef.style.display = 'none'
        var container = document.getElementById('container')!;
        container.style.height = '50%'
        var grid = document.getElementById('grid')!;
        grid.style.display = 'none'
        dummy.style.transform =
          'translate3d(' +
          (gridItems[index].offsetLeft - 5) +
          'px, ' +
          (gridItems[index].offsetTop - 5) +
          'px, 0px) scale3d(' +
          gridItems[index].offsetWidth / gridItemsContainer.offsetWidth +
          ',' +
          gridItems[index].offsetHeight / getViewport('y') +
          ',1)';
        dummy.style.transform =
          'translate3d(' +
          (gridItems[index].offsetLeft - 5) +
          'px, ' +
          (gridItems[index].offsetTop - 5) +
          'px, 0px) scale3d(' +
          gridItems[index].offsetWidth / gridItemsContainer.offsetWidth +
          ',' +
          gridItems[index].offsetHeight / getViewport('y') +
          ',1)';
        window.classie.add(dummy, classes.placeholderTransIn);
        // insert it after all the grid items
        gridItemsContainer.appendChild(dummy);
        window.classie.add(bodyEl, classes.viewSingle);
        setTimeout(function () {
          dummy.style.transform =
            'translate3d(-5px, ' + (window.pageYOffset || docElem.scrollTop - 5) + 'px, 0px)';
          dummy.style.transform =
            'translate3d(-5px, ' + (window.pageYOffset || docElem.scrollTop - 5) + 'px, 0px)';
          // disallow scroll
          window.addEventListener('scroll', () => {
            if (!lockScroll) {
              lockScroll = true;
              xscroll = window.pageXOffset || docElem.scrollLeft;
              yscroll = window.pageYOffset || docElem.scrollTop;
            }
            window.scrollTo(xscroll, yscroll);
          });
          window.classie.remove(dummy, classes.placeholderTransIn);
          window.classie.add(dummy, classes.placeholderTransOut);
          // position the content container
          contentItemsContainer.style.top = window.pageYOffset || docElem.scrollTop + 'px';
          // show the main content container
          window.classie.add(contentItemsContainer, classes.contentShow);
          // show content item:
          window.classie.add(contentItems[index], classes.content__item__show);
          // show close control
          window.classie.addClass(bodyEl, classes.noscroll);

          isAnimating = false;

        }, 25)
        onEndTransition(dummy, function () {
          // add transition class
          window.classie.remove(dummy, classes.placeholderTransIn);
          window.classie.add(dummy, classes.placeholderTransOut);
          // // position the content container
          contentItemsContainer.style.top = window.pageYOffset || docElem.scrollTop + 'px';
          // // show the main content container
          window.classie.add(contentItemsContainer, classes.contentShow);
          // // show content item:
          window.classie.add(contentItems[index], classes.content__item__show);
          // // show close control
          // // window.classie.add(closeCtrl, classes.closeButtonShow);
          // // sets overflow hidden to the body and allows the switch to the content scroll
          window.classie.addClass(bodyEl, classes.noscroll);

          // isAnimating = false;
        });
      }, 500)
    }, 1000)
  }

  const closeClicked = () => {
    var support = { transitions: window.Modernizr.csstransitions }
    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd',
      msTransition: 'MSTransitionEnd',
      transition: 'transitionend',
    }
    var transEndEventName = transEndEventNames[window.Modernizr.prefixed('transition') as keyof typeof transEndEventNames]
    var onEndTransition = function (el: HTMLElement, callback: Function) {
      var onEndCallbackFn = function (ev: any) {

        if (support.transitions) {
          //@ts-ignore
          if (ev.target != this) return;
          //@ts-ignore
          this.removeEventListener(transEndEventName, onEndCallbackFn);
        }
        if (callback && typeof callback === 'function') {
          //@ts-ignore
          callback.call(this);
        }
      };
      if (support.transitions) {
        el.addEventListener(transEndEventName, onEndCallbackFn);
      } else {
        //@ts-ignore
        onEndCallbackFn();
      }
    }
    var gridEl = document.getElementById('theGrid')!
    var gridItemsContainer: any = gridEl.querySelector(`.${classes[`grid` as keyof typeof classes]}`)!
    var contentItemsContainer: any = gridEl.querySelector(`.${classes[`content` as keyof typeof classes]}`)!
    var contentItems = contentItemsContainer.querySelectorAll(`.${classes['content__item' as keyof typeof classes]}`)
    var gridItems = (gridItemsContainer as HTMLElement).querySelectorAll(`.${classes[`grid__item` as keyof typeof classes]}`)
    var gridItem = gridItems[current] as HTMLElement
    var contentItem = contentItems[current];
    var docElem = window.document.documentElement
    document.getElementById('main')!.style.padding = `8% 0px`;
    var menuRef = document.getElementById('menuRef')!;
    var bodyEl = document.body
    menuRef.style.display = 'flex'
    var grid = document.getElementById('grid')!;
    grid.style.display = 'flex'
    var container = document.getElementById('container')!;
    container.style.height = mobile ? '200%' : '55vh'
    var lockScroll = false
    var xscroll: any
    var yscroll: any
    // var closeCtrl = contentItemsContainer.querySelector(`.${classes['closeButton']}`)
    window.classie.remove(contentItem, classes.content__item__show);
    window.classie.remove(contentItemsContainer, classes.contentShow);
    // window.classie.remove(closeCtrl, classes.closeButtonShow);
    window.classie.remove(bodyEl, classes.viewSingle);
    setTimeout(function () {
      var dummy = gridItemsContainer.querySelector(`.${classes.placeholder}`);
      window.classie.removeClass(bodyEl, classes.noscroll);

      dummy.style.WebkitTransform =
        'translate3d(' +
        gridItem.offsetLeft +
        'px, ' +
        gridItem.offsetTop +
        'px, 0px) scale3d(' +
        gridItem.offsetWidth / gridItemsContainer.offsetWidth +
        ',' +
        gridItem.offsetHeight / getViewport('y') +
        ',1)';
      dummy.style.transform =
        'translate3d(' +
        gridItem.offsetLeft +
        'px, ' +
        gridItem.offsetTop +
        'px, 0px) scale3d(' +
        gridItem.offsetWidth / gridItemsContainer.offsetWidth +
        ',' +
        gridItem.offsetHeight / getViewport('y') +
        ',1)';

      // reset content scroll..
      contentItem.parentNode.scrollTop = 0;
      gridItemsContainer.removeChild(dummy);
      window.classie.remove(gridItem, classes.grid__item_loading);
      window.classie.remove(gridItem, classes.grid__item__animate);
      lockScroll = false;
      window.removeEventListener('scroll', () => {
        if (!lockScroll) {
          lockScroll = true;
          xscroll = window.pageXOffset || docElem.scrollLeft;
          yscroll = window.pageYOffset || docElem.scrollTop;
        }
        window.scrollTo(xscroll, yscroll);
      });
      onEndTransition(dummy, function () {
        // reset content scroll..
        contentItem.parentNode.scrollTop = 0;
        gridItemsContainer.removeChild(dummy);
        window.classie.remove(gridItem, classes.grid__item_loading);
        window.classie.remove(gridItem, classes.grid__item__animate);
        lockScroll = false;
        window.removeEventListener('scroll', () => { });

      });
      // reset current
      setCurrent(() => -1);
    }, 25);
  }

  return (
    <SideBar >
      <>
        <Script src="/js/about/modernizr.custom.js" strategy="beforeInteractive" />
        <div className={classes.container} id="container">
          <div id="theGrid"
            className={classes.main}
          >
            <section
              id="grid"
              className={classes.grid}
            >
              <a
                className={classes.grid__item}
                href="#"
                onClick={(e) => onLinkClick(e, 0)}
              >
                <h2
                  className={cx(classes.title, classes.titlePreview)}
                >{t('visionTitle')}</h2>
                <div
                  className={classes.loader}
                ></div>
                <span className={classes.category}>{t('visionSubtitle')}</span>
                <div className={cx(classes.meta, classes.metaPreview)}>
                  <img className={classes.meta__avatar} src={`/images/logo_${theme.palette.mode}.png`} alt="author01" />
                </div>
              </a>
              <a
                className={classes.grid__item}
                href="#" onClick={(e) => onLinkClick(e, 1)}>
                <h2
                  className={cx(classes.title, classes.titlePreview)}
                >{t('missionTitle')}</h2>
                <div
                  className={classes.loader}
                ></div>
                <span className={classes.category}>{t('missionSubtitle')}</span>
                <div className={cx(classes.meta, classes.metaPreview)}>
                  <img className={classes.meta__avatar} src={`/images/logo_${theme.palette.mode}.png`} alt="author01" />
                </div>
              </a>
              <a
                className={classes.grid__item}
                href="#" onClick={(e) => onLinkClick(e, 2)}>
                <h2
                  className={cx(classes.title, classes.titlePreview)}
                >{t('valuesTitle')}</h2>
                <div
                  className={classes.loader}
                ></div>
                <span className={classes.category}>{t('valuesSubtitle')}</span>
                <div className={cx(classes.meta, classes.metaPreview)}>
                  <img className={classes.meta__avatar} src={`/images/logo_${theme.palette.mode}.png`} alt="logo" />
                </div>
              </a>
            </section>
            <section className={classes.content}>
              <div className={classes.scrollWrap}>
                <article className={classes.content__item}>
                  <span className={cx(classes.category, classes.categoryFull)}>{t('title')}</span>
                  <h2 className={cx(classes.title, classes.titleFull)}>{t('visionTitle')}</h2>
                  <div className={cx(classes.meta, classes.metaFull)}>
                    <img className={classes.meta__avatar} src={`/images/logo_${theme.palette.mode}.png`} alt="logo" />

                  </div>
                  <span
                    dangerouslySetInnerHTML={{ __html: t('visionText') }}
                  />
                </article>
                <article className={classes.content__item}>
                  <span className={cx(classes.category, classes.categoryFull)}>{t('title')}</span>
                  <h2 className={cx(classes.title, classes.titleFull)}>{t('missionTitle')}</h2>
                  <div className={cx(classes.meta, classes.metaFull)}>
                    <img className={classes.meta__avatar} src={`/images/logo_${theme.palette.mode}.png`} alt="logo" />

                  </div>
                  <span
                    dangerouslySetInnerHTML={{ __html: t('missionText') }}
                  />
                </article>
                <article className={classes.content__item}>
                  <span className={cx(classes.category, classes.categoryFull)}>{t('title')}</span>
                  <h2 className={cx(classes.title, classes.titleFull)}>{t('valuesTitle')}</h2>
                  <div className={cx(classes.meta, classes.metaFull)}>
                    <img className={classes.meta__avatar} src={`/images/logo_${theme.palette.mode}.png`} alt="logo" />

                  </div>
                  <span
                    dangerouslySetInnerHTML={{ __html: t('valuesText') }}
                  />
                </article>
              </div>
              <button
                onClick={closeClicked}
                className={classes.closeButton}><i className="fa fa-close"></i><span>Close</span></button>

            </section>
          </div>
        </div>
        <SocialMedia />
        <Script src="/js/about/classie.js" />
        {/* <Script src="/js/about/main.js" /> */}
      </>
    </SideBar >
  )
})

export default About;