import useShallowTranslation from "@/src/components/Hooks/useShallowTranslation";
import Script from "next/script";
import { FC, Fragment, useEffect, useMemo, useState, createRef, createElement } from "react";
import CollectionStyle from "./Collection-style";
import anime from 'animejs/lib/anime';
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip'
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import IconButton from '@mui/material/IconButton'
import Link from "next/link";
import SocialMedia from "../SocialMedia/SocialMedia";
import axios from "axios";
import { useSelector } from "react-redux";
import { ProductItemsType, State } from "@/src/redux/store";
import { setCookie } from "cookies-next";
import Decoration from "../Decoration/Decoration";
export function isObjectEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}
const ProductComponent: FC = (() => {
  const { t, lang } = useShallowTranslation('common');
  const [selectedColor, setSelectedColor] = useState<{ [k: string]: any }[]>([])
  const { classes, theme, cx } = CollectionStyle({})
  const [animeRef, setAnimeRef] = useState<any[]>([]);
  const { productItems } = useSelector<State, State>((state) => state)
  const [turn, setTurn] = useState<any>({})
  const [isZoomed, setIsZoomed] = useState<boolean>(false)
  const [productZoomed, setProductZoomed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)


  const onAddToCart = async () => {
    var Particles = (await import('../../../../public/js/particles')).default;
    var details = document.getElementsByClassName(classes.details)[0]
    var particl = details.querySelector(`.particles`)
    var bttn = document.querySelector('button')!
    if (particl == null) {
      const particles = new Particles(bttn, {
        duration: 500,
        easing: 'easeOutQuad',
        speed: .1,
        particlesAmountCoefficient: 10,
        oscillationCoefficient: 80
      });
      particles.disintegrate();
      setTimeout(() => {
        particles.integrate();
      }, 4000);
    } else {
      details.removeChild(particl)
      details.insertBefore(bttn, document.getElementById('close'))
      const particles = new Particles(bttn, {
        duration: 500,
        easing: 'easeOutQuad',
        speed: .1,
        particlesAmountCoefficient: 10,
        oscillationCoefficient: 80
      });
      particles.disintegrate();
      setTimeout(() => {
        particles.integrate();
      }, 4000);
    }
  }


  useEffect(() => {
    // add  refs
    if (productItems.length !== 0) {
      setAnimeRef((animeRef) =>
        Array(productItems.length)
          .fill(0)
          .map((_, i) => animeRef[i] || createRef())
      );
      setSelectedColor((prevState: any) => {
        let m: any = []
        productItems.map((a: any) => {
          let selectedColor = a['images'][0]['front'].filter((a: any) => a.isSelected)
          m.push({
            [a['product_label_en']]: selectedColor?.[0]?.['color'] || a['images'][0]['front']?.[0]?.['color']
          })
        })
        return m
      })
    }


  }, [productItems]);

  const onOpen = (product: any, index: number) => {
    if (isAnimating) return false;
    document.getElementById('deco')?.classList.add(classes[`badge_${Object.values(selectedColor[index])[0]}` as keyof typeof classes])
    setProductZoomed(() => !productZoomed)
    var body = document.getElementsByTagName('body');
    body[0].style.overflowY = 'hidden'
    var menuRef = document.getElementById('menuRef')!;
    menuRef.style.display = 'none'
    setIsAnimating(() => true)
    var details = document.getElementsByClassName(classes.details)[0]
    details.setAttribute('key', `${index}`)
    var bgUp = details.querySelector(`.${cx(classes.details__bg, classes.details__bg_up)}`);
    var bgDown: HTMLDivElement = details.querySelector(`.${cx(classes.details__bg, classes.details__bg_down)}`)!;
    var img: HTMLImageElement = details.querySelector(`.${classes.details__img}`)!;
    var title = details.querySelector(`.${classes.details__title}`)!;
    var deco = details.querySelector(`.${classes.details__deco}`);
    var subtitle = details.querySelector(`.${classes.details__subtitle}`)!;
    var price = details.querySelector(`.${classes.details__price}`)!;
    var description = details.querySelector(
      `.${classes.details__description}`
    )!;
    var cart = details.querySelector(`.${classes.details__addtocart}`);
    var close = details.querySelector(`.${classes.details__close}`);
    var magnifier = details.querySelector(
      `.${classes.details__magnifier}`
    );

    details.classList.add(`${classes.details__open}`)
    img?.setAttribute('src', animeRef[index]['current']['children'][!isObjectEmpty(turn) ? turn[index] ? 1 : 2 : 2].src)
    let currentColorArray = product?.['colors'].filter((a: any) => a._id == selectedColor[index][product['product_label_en']])
    let currentFinancial = product?.['financials'].filter((a: any) => a.color == selectedColor[index][product['product_label_en']])

    title.innerHTML = `${product[`product_label_${lang}`]} (${currentColorArray[0][`label_${lang}`]})`
    subtitle.innerHTML = product[`product_subtitle_${lang}`]
    price.innerHTML = `${currentFinancial[0]['salePrice']} $`
    description.innerHTML = product[`product_description_${lang}`]
    var productBg = animeRef[index]['current']['children'][0];
    var productImg = animeRef[index]['current']['children'][1];
    productBg.style.opacity = 0;
    productImg.style.opacity = 0;
    const rect = {
      productBgRect: productBg.getBoundingClientRect(),
      detailsBgRect: bgDown.getBoundingClientRect(),
      productImgRect: productImg.getBoundingClientRect(),
      detailsImgRect: img.getBoundingClientRect(),
    }
    bgDown.style.transform = `translateX(${rect.productBgRect.left - rect.detailsBgRect.left
      }px) translateY(${rect.productBgRect.top - rect.detailsBgRect.top
      }px) scaleX(${rect.productBgRect.width / rect.detailsBgRect.width
      }) scaleY(${rect.productBgRect.height / rect.detailsBgRect.height})`;
    bgDown.style.opacity = `1`;
    img.style.transform = `translateX(${rect.productImgRect.left - rect.detailsImgRect.left
      }px) translateY(${rect.productImgRect.top - rect.detailsImgRect.top
      }px) scaleX(${rect.productImgRect.width / rect.detailsImgRect.width
      }) scaleY(${rect.productImgRect.height / rect.detailsImgRect.height})`;
    img.style.opacity = `1`;
    anime({
      targets: [bgDown, img],
      duration: (target: any, index: number) => (index ? 1800 : 250),
      easing: (targe: any, index: number) => (index ? 'easeOutElastic' : 'easeOutSine'),
      elasticity: 50,
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
      complete: () => (setIsAnimating(() => false)),
    });
    anime({
      targets: [
        title,
        deco,
        subtitle,
        price,
        description,
        cart,
        magnifier,
      ],
      duration: 600,
      easing: 'easeOutExpo',
      delay: (ttarget: any, index: number) => {
        return index * 60;
      },
      translateY: (target: any, index: number, total: number) => {
        return index !== total - 1 ? [50, 0] : 0;
      },
      scale: (target: any, index: number, total: number) => {
        return index === total - 1 ? [0, 1] : 1;
      },
      opacity: 1,
    });

    anime({
      targets: bgUp,
      duration: 100,
      easing: 'linear',
      opacity: 1,
    });

    anime({
      targets: close,
      duration: 250,
      easing: 'easeOutSine',
      translateY: ['100%', 0],
      opacity: 1,
    });


  }

  const onCloseZoomClicked = () => {
    var details = document.getElementsByClassName(classes.details)[0]
    var bgUp = details.querySelector(`.${cx(classes.details__bg, classes.details__bg_up)}`);
    var bgDown: HTMLDivElement = details.querySelector(`.${cx(classes.details__bg, classes.details__bg_down)}`)!;
    var img: HTMLImageElement = details.querySelector(`.${classes.details__img}`)!;
    var title = details.querySelector(`.${classes.details__title}`)!;
    var deco = details.querySelector(`.${classes.details__deco}`);
    var subtitle = details.querySelector(`.${classes.details__subtitle}`)!;
    var price = details.querySelector(`.${classes.details__price}`)!;
    var description = details.querySelector(
      `.${classes.details__description}`
    )!;
    var cart = details.querySelector(`.${classes.details__addtocart}`);
    var close = details.querySelector(`.${classes.details__close}`);
    var magnifier = details.querySelector(
      `.${classes.details__magnifier}`
    );
    var productBg = animeRef[Number(details.getAttribute('key'))]['current']['children'][0];
    var productImg = animeRef[Number(details.getAttribute('key'))]['current']['children'][1];

    if (!isZoomed) {
      var body = document.getElementsByTagName('body');
      body[0].style.overflowY = 'auto'
      var menuRef = document.getElementById('menuRef')!;
      menuRef.style.display = 'flex'
      setIsAnimating(() => true)
      details.classList.remove(`${classes.details__open}`);
      anime({
        targets: close,
        duration: 250,
        easing: 'easeOutSine',
        translateY: '100%',
        opacity: 0,
      });

      anime({
        targets: bgUp,
        duration: 100,
        easing: 'linear',
        opacity: 0,
      });

      anime({
        targets: [
          title,
          deco,
          subtitle,
          price,
          description,
          cart,
          magnifier,
        ],
        duration: 20,
        easing: 'linear',
        opacity: 0,
      });
      const rect = {
        productBgRect: productBg.getBoundingClientRect(),
        detailsBgRect: bgDown.getBoundingClientRect(),
        productImgRect: productImg.getBoundingClientRect(),
        detailsImgRect: img.getBoundingClientRect(),
      }
      anime({
        targets: [bgDown, img],
        duration: 250,
        easing: 'easeOutSine',
        translateX: (target: any, index: number) => {
          return index
            ? rect.productImgRect.left - rect.detailsImgRect.left
            : rect.productBgRect.left - rect.detailsBgRect.left;
        },
        translateY: (target: any, index: number) => {
          return index
            ? rect.productImgRect.top - rect.detailsImgRect.top
            : rect.productBgRect.top - rect.detailsBgRect.top;
        },
        scaleX: (target: any, index: number) => {
          return index
            ? rect.productImgRect.width / rect.detailsImgRect.width
            : rect.productBgRect.width / rect.detailsBgRect.width;
        },
        scaleY: (target: any, index: number) => {
          return index
            ? rect.productImgRect.height / rect.detailsImgRect.height
            : rect.productBgRect.height / rect.detailsBgRect.height;
        },
        complete: () => {
          bgDown.style.opacity = `0`;
          img.style.opacity = `0`;
          bgDown.style.transform = 'none';
          img.style.transform = 'none';
          productBg.style.opacity = 1;
          productImg.style.opacity = 1;
          setIsAnimating(() => false)
        },
      });
    } else {
      if (isAnimating) return false;
      setIsAnimating(() => true)
      setIsZoomed(false)
      anime({
        targets: [
          title,
          deco,
          subtitle,
          price,
          description,
          cart,
          magnifier,
        ],
        duration: 250,
        easing: 'easeOutCubic',
        translateY: 0,
        scale: 1,
        opacity: 1,
      });
      anime({
        targets: img,
        duration: 1250,
        easing: 'easeOutCubic',
        translateX: 0,
        translateY: 0,
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
        complete: () => {
          img.style.transformOrigin = '0 0';
          setIsAnimating(() => false)
        },
      });
      anime({
        targets: close,
        duration: 250,
        easing: 'easeInOutCubic',
        scale: 1,
        rotate: 0,
      });
    }

  }

  const onMagnifiClicked = () => {
    setIsZoomed(true)
    var details = document.getElementsByClassName(classes.details)[0]
    var bgUp = details.querySelector(`.${cx(classes.details__bg, classes.details__bg_up)}`);
    var bgDown: HTMLDivElement = details.querySelector(`.${cx(classes.details__bg, classes.details__bg_down)}`)!;
    var img: HTMLImageElement = details.querySelector(`.${classes.details__img}`)!;
    var title = details.querySelector(`.${classes.details__title}`)!;
    var deco = details.querySelector(`.${classes.details__deco}`);
    var subtitle = details.querySelector(`.${classes.details__subtitle}`)!;
    var price = details.querySelector(`.${classes.details__price}`)!;
    var description = details.querySelector(
      `.${classes.details__description}`
    )!;
    var cart = details.querySelector(`.${classes.details__addtocart}`);
    var close = details.querySelector(`.${classes.details__close}`);
    var magnifier = details.querySelector(
      `.${classes.details__magnifier}`
    );
    anime({
      targets: [
        title,
        deco,
        subtitle,
        price,
        description,
        cart,
        magnifier,
      ],
      duration: 100,
      easing: 'easeOutSine',
      translateY: (target: any, index: number, total: number) => {
        return index !== total - 1
          ? [0, index === 0 || index === 1 ? -50 : 50]
          : 0;
      },
      scale: (target: any, index: number, total: number) => {
        return index === total - 1 ? [1, 0] : 1;
      },
      opacity: 0,
    });
    const imgrect = img.getBoundingClientRect();
    const win = { w: window.innerWidth, h: window.innerHeight };
    const imgAnimeOpts = {
      targets: img,
      duration: 1250,
      easing: 'easeOutCubic',
      translateX: win.w / 2 - (imgrect.left + imgrect.width / 2),
      translateY: win.h / 2 - (imgrect.top + imgrect.height / 2),
    };
    if (win.w > 0.8 * win.h) {
      img.style.transformOrigin = '50% 50%';
      Object.assign(imgAnimeOpts, {
        scaleX: (0.95 * win.w) / parseInt(`${0.8 * win.h}`),
        scaleY: (0.95 * win.w) / parseInt(`${0.8 * win.h}`),
        rotate: 90,
      });
    }
    anime(imgAnimeOpts);

    anime({
      targets: close,
      duration: 250,
      easing: 'easeInOutCubic',
      scale: 1.8,
      rotate: 180,
    });
  }

  var frontImageSrc: string;
  var backImageSrc: string;
  var currentColor: string


  return (
    <Fragment>
      <svg style={{ display: 'none' }}>
        <symbol id="icon-cross" viewBox="0 0 24 24">
          <title>cross</title>
          <path d="M 5.5,2.5 C 5.372,2.5 5.244,2.549 5.146,2.646 L 2.646,5.146 C 2.451,5.341 2.451,5.659 2.646,5.854 L 8.793,12 2.646,18.15 C 2.451,18.34 2.451,18.66 2.646,18.85 L 5.146,21.35 C 5.341,21.55 5.659,21.55 5.854,21.35 L 12,15.21 18.15,21.35 C 18.24,21.45 18.37,21.5 18.5,21.5 18.63,21.5 18.76,21.45 18.85,21.35 L 21.35,18.85 C 21.55,18.66 21.55,18.34 21.35,18.15 L 15.21,12 21.35,5.854 C 21.55,5.658 21.55,5.342 21.35,5.146 L 18.85,2.646 C 18.66,2.451 18.34,2.451 18.15,2.646 L 12,8.793 5.854,2.646 C 5.756,2.549 5.628,2.5 5.5,2.5 Z" />
        </symbol>
        <symbol id="icon-magnifier" viewBox="0 0 490.8 490.8">
          <title>magnifier</title>
          <path d="M364.8,299.55c46.3-75.8,36.9-176.3-28.6-241.9c-76.8-76.8-201.8-76.8-278.6,0s-76.8,201.8,0,278.5c65.5,65.5,166,74.9,241.9,28.6L412,477.25c18,18,47.3,18,65.3,0s18-47.3,0-65.3L364.8,299.55z M295.5,295.55c-54.4,54.4-142.8,54.4-197.1,0c-54.4-54.4-54.4-142.8,0-197.1c54.4-54.4,142.8-54.4,197.1,0C349.8,152.75,349.8,241.15,295.5,295.55z M220,171.95h59.4v45.3H220v59.4h-45.3v-59.4h-59.3v-45.3h59.4v-59.4h45.3v59.4H220z" />
        </symbol>
      </svg>
      <main >
        <div className={classes.content}>

          <Decoration />
          <Fragment>
            <div id="details" className={classes.details}>
              <div className={cx(classes.details__bg, classes.details__bg_up)}></div>
              <div className={cx(classes.details__bg, classes.details__bg_down)}></div>
              <img className={classes.details__img} src="" alt="img 01" />
              <h2 className={classes.details__title}></h2>
              <div id='deco' className={classes.details__deco}></div>
              <h3 className={classes.details__subtitle}></h3>
              <div className={classes.details__price}></div>
              <p className={classes.details__description}></p>
              <button onClick={onAddToCart} id='addToCart' className={classes.details__addtocart}>{t('addToCart')}</button>
              <button onClick={onCloseZoomClicked} id="close" className={classes.details__close}><svg className={`${classes.icon} icon--cross`}><use xlinkHref="#icon-cross"></use></svg></button>
              <button onClick={onMagnifiClicked} className={classes.details__magnifier}><svg className={cx(classes.icon, " ", 'icon--magnifier')}><use xlinkHref="#icon-magnifier"></use></svg></button>
            </div>
          </Fragment>

          {/* } */}
          <div className={`${classes.grid} animate__animated animate__fadeInUp`} >
            {selectedColor.length !== 0 &&
              productItems.map((product, i) => {
                let currentColorArray = product?.['colors'].filter((a: any) => a._id == selectedColor[i][product['product_label_en']])
                return (
                  <div className={classes.grid__item} key={i.toString()}>
                    <Tooltip title={t('rotate')} placement="top" arrow >
                      <IconButton className={classes.rotationButton} onClick={() => {
                        setTurn((prevState: any) => { return { ...prevState, [i]: !prevState[i] } })
                      }}>
                        <ThreeSixtyIcon />
                      </IconButton>
                    </Tooltip>
                    <div ref={animeRef[i]} className={classes.product}>
                      <div className={classes.product__bg} onClick={() => {
                        onOpen(product, i)
                      }} ></div>
                      {
                        product.images.map((side: any, index: number) => {
                          if (side['front'] && side['back'] == undefined) {
                            frontImageSrc = side['front'].filter((a: any) => a.color == selectedColor[i][product['product_label_en']])[0]['src']
                          }
                          if (side['back'] && side['front'] == undefined) {
                            backImageSrc = side['back'].filter((a: any) => a.color == selectedColor[i][product['product_label_en']])[0]['src']
                          }
                          return (
                            <Fragment key={index}>
                              {side['back'] !== undefined && <img className={
                                cx(turn[i] ? classes.product__img_back : classes.product__img_back_turn)
                              }
                                src={`${process.env.NEXT_PUBLIC_ADMIN_URL}${backImageSrc}`}
                                alt='img' />}
                              {side['front'] !== undefined && <img className={
                                cx(turn[i] ? classes.product__img : classes.product__img_turn)
                              }
                                src={`${process.env.NEXT_PUBLIC_ADMIN_URL}${frontImageSrc}`}
                                alt='img' />}
                            </Fragment>
                          )
                        })
                      }
                      <div className={classes.badgeColors} >
                        {
                          product.colors.map((c: any, index: number) => {

                            if (selectedColor.length !== 0) {
                              selectedColor.filter((a: any) => {
                                let s = Object.entries(a)
                                if (product.product_label_en == s.flat(1)[0]) {
                                  currentColor = s.flat(1)[1] as string
                                }
                              })
                            }
                            return (
                              <Tooltip key={index} title={c[`label_${lang}`]} placement="top" arrow
                                componentsProps={{
                                  tooltip: {
                                    sx: {
                                      border: `solid 0.5px ${c.colorCode}`,
                                    },
                                  },
                                  arrow: {
                                    sx: {
                                      '&:before': {
                                        border: `solid 0.5px ${c.colorCode}`,
                                      }
                                    }
                                  }
                                }}>
                                <span
                                  style={{
                                    backgroundColor: c.colorCode
                                  }}
                                  className={cx(classes.badge,
                                    currentColor == c._id &&
                                    classes.activeBadge,)}
                                  onClick={() => {
                                    setSelectedColor((prevState) => {
                                      prevState[i] = { [product['product_label_en']]: c._id }
                                      return [...prevState]
                                    })
                                  }} />
                              </Tooltip>
                            )
                          })
                        }
                      </div>
                      <h2 className={classes.product__title} >
                        <>
                          {product[`product_label_${lang}` as keyof typeof product]}
                          {/* @ts-ignore */}
                          {`(${currentColorArray[0][`label_${lang}`]})`}
                        </>
                      </h2>
                      <h3 className={classes.product__subtitle} >
                        {/* @ts-ignore */}
                        {product[`product_subtitle_${lang}` as keyof typeof productItems]}
                      </h3>
                      <p className={classes.product__description} >
                        {/* @ts-ignore */}
                        {product[`product_description_${lang}` as keyof typeof productItems]}
                      </p>
                      <div className={classes.product__price} >{product.product__price}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <section className={cx(classes.content, classes.contentRelated)}>
          <p className={classes.p} dangerouslySetInnerHTML={{ __html: t('lazada') }}></p>
          <p>{t('relatedImage')}</p>
          {
            productItems.map((product: any, index) => {
              let selectedGallery = product.gallery.filter((a: any) => a.isSelected)
              let imgSrc = selectedGallery?.[0]?.['src'] || product.gallery?.[0]?.['src']
              return (
                <Link key={index} locale={lang} className={classes.mediaItem} href={{
                  pathname: "/gallery"
                }}>
                  <img className={classes.mediaItem_img} src={`${process.env.NEXT_PUBLIC_ADMIN_URL}${imgSrc}`} onClick={() => {
                    setCookie('galleryImageModel', product['product_name_en'], {});
                  }} />
                </Link>
              )
            })
          }
          <SocialMedia />
        </section>
      </main>
      <Script src="/js/imagesloaded.pkgd.min.js" />
      <Script src="/js/anime.min.js" />
      <Script src="/js/particles.js" ></Script>
    </Fragment>
  )
});

export default ProductComponent