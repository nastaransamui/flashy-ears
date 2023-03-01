import Script from "next/script";
import { FC, Fragment, ReactNode, useEffect } from "react";
import LangingStyle from "./landing-style";
import anime from 'animejs/lib/anime';
import Link from "next/link";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button'
import useShallowTranslation from "@/src/components/Hooks/useShallowTranslation";
import { useDispatch, useSelector } from "react-redux";
import { ProductItemsType, State } from "@/src/redux/store";
import Slider from 'react-animated-slider';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Circle from '@/src/components/SVGs/Circle'
import Oval from '@/src/components/SVGs/Oval'
import Diamond from '@/src/components/SVGs/Diamond'
import Bell from '@/src/components/SVGs/Bell'
import CrookedTriangle from '@/src/components/SVGs/crookedTriangle'
import LongTriangle from '@/src/components/SVGs/LongTriangle';
import Socks from '@/src/components/SVGs/Socks';
import Octagon from '@/src/components/SVGs/Octagon';
import Square from '@/src/components/SVGs/Square1';
import SquareWithHole from '@/src/components/SVGs/SquareWithHole';
import Triangle from '@/src/components/SVGs/Triangle';


const LandingPage: FC = (() => {
  const { t, lang } = useShallowTranslation('common')
  const router = useRouter();
  const dispatch = useDispatch()
  const { slides, productItems } = useSelector<State, State>(state => state)
  const { classes, theme, cx } = LangingStyle({ slides })
  useEffect(() => {
    var ScrollReveal: any;
    const load = async () => {
      if (typeof window !== 'undefined') {
        const win = window;
        const doc = document.documentElement;
        doc.classList.remove('no-js');
        doc.classList.add('js');
        ScrollReveal = (await import('scrollreveal')).default;
        const sr = (window.sr = ScrollReveal());
        sr.reveal(`.${cx(classes.feature, classes.isRevealing)}, .${classes.pricingTableInner}`, {
          duration: 600,
          distance: '20px',
          easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
          origin: 'bottom',
          interval: 100,
          opacity: 1
        });

        doc.classList.add(classes.animeReady);
        /* global anime */
        anime
          .timeline({
            targets: `.${cx(classes.herorBox, classes.heroBox1)}`,
          })
          .add({
            duration: 400,
            easing: 'easeInOutExpo',
            scaleX: [0.05, 0.05],
            scaleY: [0, 1],
            perspective: '500px',
            delay: anime.random(0, 400),
          })
          .add({
            duration: 400,
            easing: 'easeInOutExpo',
            scaleX: 1,
          })
          .add({
            duration: 800,
            rotateY: '-15deg',
            rotateX: '8deg',
            rotateZ: '-1deg',
          });

        anime
          .timeline({
            targets: `.${cx(classes.herorBox, classes.heroBox6)}, .${cx(classes.herorBox, classes.heroBox7)}`,
          })
          .add({
            duration: 400,
            easing: 'easeInOutExpo',
            scaleX: [0.05, 0.05],
            scaleY: [0, 1],
            perspective: '500px',
            delay: anime.random(0, 400),
          })
          .add({
            duration: 400,
            easing: 'easeInOutExpo',
            scaleX: 1,
          })
          .add({
            duration: 800,
            rotateZ: '-20deg',
          });

        anime({
          targets:
            `.${cx(classes.herorBox, classes.heroBox1)}, 
            .${cx(classes.herorBox, classes.heroBox2)}, 
            .${cx(classes.herorBox, classes.heroBox3)}, 
            .${cx(classes.herorBox, classes.heroBox4)}, 
            .${cx(classes.herorBox, classes.heroBox8)}, 
            .${cx(classes.herorBox, classes.heroBox9)}, 
            .${cx(classes.herorBox, classes.heroBox10)}`,
          duration: anime.random(600, 800),
          delay: anime.random(600, 800),
          rotate: [
            anime.random(-360, 360),
            function (el: HTMLElement) {
              return el.getAttribute('data-rotation');
            },
          ],
          scale: [0.7, 1],
          opacity: [0, 1],
          easing: 'easeInOutExpo',
        });
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (slides.length !== 0 && slides.length <= 2) {
      let m = [...slides, ...slides]
      dispatch({
        type: "SLIDES",
        payload: m
      })
    }
  }, [slides])


  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <span id='has-animations' className={cx(classes.isBoxed, classes.hasAnimation)}>
        <div className={classes.bodyWrap}>
          <header className={classes.siteHeader}>
            <div className={classes.container}>
              <div className={classes.siteHeaderInner}>
                <div >
                  <h1 >
                    <Link href="/">
                      <img className={classes.headerLogoImage} src={`/images/logo_${theme.palette.mode}.png`} alt="Logo" />
                    </Link>
                  </h1>
                </div>
              </div>
            </div>
          </header>

          <main>
            <section className={classes.hero}>
              <div className={classes.container}>
                <div className={classes.heroInner}>
                  <div className={classes.heroCopy}>
                    {slides.length > 0 ?
                      <Slider infinite={true} classNames={{
                        previousButton: classes.previousButton,
                        nextButton: classes.nextButton
                      }}>
                        {slides.map((slide, index) =>
                          <div key={index} className={"slider-content " + classes.sliderImage}
                            style={{
                              backgroundImage: `url('${slide[`img_${theme.palette.mode}` as keyof typeof slide]}')`,
                            }}>
                            <div className="inner"
                            >
                              <div className={classes.heroButtons}>
                                <Container>
                                  <div>
                                    <Grid container spacing={6}>
                                      <Grid item md={12} xs={12}>
                                        <Typography variant="h2" className={classes.title}>
                                          {slide[`title_${lang}` as keyof typeof slide]}
                                        </Typography>
                                        <Typography className={classes.subtitle}>
                                          {slide[`desc_${lang}` as keyof typeof slide]}
                                        </Typography>
                                        <Button onClick={() => { router.push('/collections', '/collections', { locale: lang }) }} variant="contained" color="primary">
                                          {slide[`linkTitle_${lang}` as keyof typeof slide]}
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </div>
                                </Container>
                              </div>
                            </div>
                          </div>)}
                      </Slider> : <>
                        <h1 style={{ marginTop: 0 }}>{t('collections')}</h1>
                        <p >{t('mainPageFirstP')}</p>
                        <div className={classes.heroCta}>
                          <Button variant="contained" color="primary" onClick={() => { router.push('/collections', '/collections', { locale: lang }) }} className={classes.button}>
                            {t('collections')}
                          </Button>
                          <Button variant="contained" color="secondary" onClick={() => { router.push('/contactUs', '/contactUs', { locale: lang }) }} className={classes.button}>{t('getIntouch')}</Button>
                        </div>
                      </>}

                  </div>
                  <div className={cx(classes.heroFigure, classes.animeElement)}>
                    <svg className="placeholder" width="528" height="396" viewBox="0 0 528 396">
                      <rect width="528" height="396" style={{ fill: 'transparent' }} />
                    </svg>
                    <div className={cx(classes.herorBox, classes.heroBox1)} data-rotation="45deg"></div>
                    <div className={cx(classes.herorBox, classes.heroBox2)} data-rotation="45deg"></div>
                    <div className={cx(classes.herorBox, classes.heroBox3)} data-rotation="0deg"></div>
                    <div className={cx(classes.herorBox, classes.heroBox4)} data-rotation="331deg"></div>
                    <div className={cx(classes.herorBox, classes.heroBox5)}></div>
                    <div className={cx(classes.herorBox, classes.heroBox6)}></div>
                    <div className={cx(classes.herorBox, classes.heroBox7)}></div>
                    <div className={cx(classes.herorBox, classes.heroBox8)} data-rotation="22deg"></div>
                    <div className={cx(classes.herorBox, classes.heroBox9)} data-rotation="0deg"></div>
                    <div className={cx(classes.herorBox, classes.heroBox10)} data-rotation="25deg"></div>
                  </div>
                </div>
              </div>
            </section>

            <section className={cx(classes.features, classes.section)}>
              <div className={classes.container}>
                <div className={cx(classes.featuresInner, classes.sectionInner, classes.hasBottomDivider)}>
                  <div className={classes.featuresWrap}>
                    {
                      productItems.map((product, index) => {
                        const Components = {
                          oval: Oval,
                          circle: Circle,
                          diamond: Diamond,
                          bell: Bell,
                          crookedTriangle: CrookedTriangle,
                          longTriangle: LongTriangle,
                          socks: Socks,
                          octagon: Octagon,
                          square: Square,
                          squareWithHole: SquareWithHole,
                          triangle: Triangle
                        };
                        const SpecificSvgShape =
                          Components[product.product_name as keyof typeof Components] || Components.diamond;

                        return (
                          <div key={index} className={cx(classes.feature, classes.isRevealing)}>
                            <div className={classes.featureInner}>
                              <div className={classes.featureIcon}>
                                {/* <img src={`/images/crookedTriangle.svg`} alt="Feature 01" /> */}
                                <SpecificSvgShape
                                  outlinestroke="#ffffff"
                                  inlinestroke={theme.palette.primary.main}
                                  linestroke="#7FFF00"
                                  fill="#000000"
                                  fillOpacity={1} />
                              </div>
                              <h4 style={{ marginTop: 24 }}>
                                {product[`product_label_${lang}` as keyof ProductItemsType] as ReactNode}
                              </h4>
                              <p className={classes.textSm}>
                                {product[`product__description_${lang}` as keyof typeof product] as ReactNode}
                              </p>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </section>

            <section className={cx(classes.pricing, classes.section)}>
              <div className={classes.containerSm}>
                <div className={classes.sectionInner}>
                  <div className={classes.pricingHeader}>
                    <h2 className={classes.h2}>{t('mainPageFirstP')}</h2>
                    {/* <p style={{ marginBottom: 1 }} className={classes.sectionParagraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ad quis nostrud.</p> */}
                  </div>
                  <div className={classes.pricingTablesWrap}>
                    <div className={classes.pricingTable}>
                      <div className={classes.pricingTableInner}>
                        <div className={classes.pricingTableMain}>
                          {/* <div className={classes.pricingTableHeader}>
                            <div className={classes.pricingTablePrice}>
                              <span className={cx(classes.pricingTablePriceCurrency, classes.h2)}>$</span>
                              <span className={cx(classes.pricingTablePriceAmount, classes.h1)}>49</span>
                              <span style={{ fontSize: '18px', lineHeight: `24px`, letterSpacing: '-0.1px' }}>/month</span>
                            </div>
                          </div> */}
                          <div style={{ fontSize: '18px', lineHeight: `24px`, letterSpacing: '-0.1px' }}
                            className={classes.pricingTableFeaturesTitle}>{t('whatGet')}</div>
                          <ul className={cx(classes.listReset, classes.textXS)}>
                            {
                              productItems.map((product, index) => {
                                const Components = {
                                  oval: Oval,
                                  circle: Circle,
                                  diamond: Diamond,
                                  bell: Bell,
                                  crookedTriangle: CrookedTriangle,
                                  longTriangle: LongTriangle,
                                  socks: Socks,
                                  octagon: Octagon,
                                  square: Square,
                                  squareWithHole: SquareWithHole,
                                  triangle: Triangle
                                };
                                const SpecificSvgShape =
                                  Components[product.product_name as keyof typeof Components] || Components.diamond;

                                return (
                                  <Fragment key={index} >
                                    <Link href="/collections">
                                      <span className={classes.liSvg}>
                                        <SpecificSvgShape
                                          outlinestroke={theme.palette.text.color}
                                          inlinestroke={theme.palette.mode == 'dark' ? theme.palette.secondary.main : '#7FFF00'}
                                          linestroke={theme.palette.mode == 'dark' ? theme.palette.secondary.main : '#7FFF00'}
                                          fill={theme.palette.text.color}
                                          fillOpacity={1} />
                                        <li className={classes.pricingTableFeatureLI} >
                                          <span>{product[`product_label_${lang}` as keyof typeof product] as ReactNode}</span>

                                        </li>
                                      </span>
                                    </Link>
                                  </Fragment>
                                )
                              })
                            }
                          </ul>
                        </div>
                        <div className={classes.pricingTableCta}>
                          <Button fullWidth variant="contained" color="secondary" onClick={() => { router.push('/collections', '/collections', { locale: lang }) }} className={classes.button}>{t('orderNow')}</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className={classes.ctaSection}>
              <div className={classes.container}>
                <div className={cx(classes.ctaInner, classes.sectionInner)} style={{ padding: `64px 32px`, }}>
                  <h3 className={classes.sectionTitle}>{t('still')}</h3>
                  <div className={classes.ctaCta}>
                    <Button variant="contained" color="secondary" onClick={() => { router.push('/contactUs', '/contactUs', { locale: lang }) }} className={classes.button}>{t('getIntouch')}</Button>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className={classes.siteFooter}>
            <div className={classes.container}>
              <div className={classes.siteFooterInner}>
                <div className={cx(classes.brand, classes.footerBrand)}>
                  <Link href="/">
                    <img className={classes.footerLogoImage} src={`/images/logo_${theme.palette.mode}.png`} alt="Logo" />
                  </Link>
                </div>
                <ul className={classes.footerLinks}>
                  <li><Link href="/about">{t('about')}</Link></li>
                  <li><Link href="/collections">{t('collections')}</Link></li>
                  <li><Link href="/gallery">{t('gallery')}</Link></li>
                  <li><Link href="/contactUs">{t('contactUs')}</Link></li>
                </ul>
                <ul className={classes.footerSocialLinks}>
                  <li>
                    <a href="https://www.facebook.com/FlashyEarsFb/" target='_blank' rel='noreferrer noopener' >
                      <span className={classes.screenReaderText}>Facebook</span>
                      <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z" fill={theme.palette.primary.main} />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/FlashyEarsT" target='_blank' rel='noreferrer noopener'>
                      <span className={classes.screenReaderText}>Twitter</span>
                      <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z" fill={theme.palette.primary.main} />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@flashyears" target='_blank' rel='noreferrer noopener' >
                      <span className={classes.screenReaderText}>Google</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill={theme.palette.primary.main}
                        viewBox="0 0 16 16"> <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/flashyearsi/" target='_blank' rel='noreferrer noopener' >
                      <span className={classes.screenReaderText}>Google</span>
                      <svg xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill={theme.palette.primary.main}
                        viewBox="0 0 16 16"> <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                      </svg>
                    </a>
                  </li>
                </ul>
                <div className={classes.footerCopyright}>&copy; {new Date().getFullYear()} {t('title')}, {t('reserve')}</div>
              </div>
            </div>
          </footer>
        </div>
      </span>
    </div>
  )
})

export default LandingPage;