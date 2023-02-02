import useShallowTranslation from "@/src/components/Hooks/useShallowTranslation";
import Script from "next/script";
import { FC, Fragment, useEffect, useMemo, useState, createRef } from "react";
import CollectionStyle from "./Collection-style";
import anime from 'animejs/lib/anime';
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip'
class Item {
  DOM: any;
  info: { img: any; title: any; subtitle: any; description: any; price: any; };
  index: number;
  classes: any;
  constructor(el: any, classes: any, animeRef: any, DOM: any, index: number, turn: any) {
    this.DOM = DOM;
    this.index = index;
    this.DOM.el = el;
    this.classes = classes;
    this.DOM.product = animeRef[index]['current'];
    this.DOM.productBg = animeRef[index]['current']['children'][0];
    this.DOM.productImg = animeRef[index]['current']['children'][1];
    this.info = {
      img: animeRef[index]['current']['children'][!isObjectEmpty(turn) ? turn[index] ? 1 : 2 : 2].src,
      title: animeRef[index]['current']['children'][4].innerHTML,
      subtitle: animeRef[index]['current']['children'][5].innerHTML,
      description: animeRef[index]['current']['children'][6].innerHTML,
      price: animeRef[index]['current']['children'][7].innerHTML,
    };
    this.initEvents();
  }
  initEvents() {
    this.DOM.productBg.addEventListener('click', () => this.open(this.index));
  }
  open(index: number) {
    this.DOM.details.fill(this.info, this.classes);
    this.DOM.details.open({
      productBg: this.DOM.gridItems[index].firstChild?.firstChild,
      productImg: this.DOM.gridItems[index].firstChild.getElementsByTagName('img')[0],
    });
  }
}

class Details {
  DOM: any;
  classes: any;
  isAnimating: any;
  isZoomed: any;
  anime: any;
  constructor(classes: any, DOM: any, anime: any) {
    this.DOM = {};
    this.classes = classes;
    this.anime = anime
    const detailsTmpl = `
    <div class="${classes.details__bg} ${classes.details__bg_up}"></div>
    <div class="${classes.details__bg} ${classes.details__bg_down}"></div>
    <img class="${classes.details__img}" src="" alt="img 01"/>
    <h2 class="${classes.details__title}"></h2>
    <div id='deco' class="${classes.details__deco}"></div>
    <h3 class="${classes.details__subtitle}"></h3>
    <div class="${classes.details__price}"></div>
    <p class="${classes.details__description}"></p>
    <button class="${classes.details__addtocart}">Add to cart</button>
    <button class="${classes.details__close}"><svg class="${classes.icon} icon--cross"><use xlink:href="#icon-cross"></use></svg></button>
    <button class="${classes.details__magnifier}"><svg class="${classes.icon} icon--magnifier"><use xlink:href="#icon-magnifier"></use></svg></button>
    `;

    this.DOM.details = document.createElement('div');
    this.DOM.details.className = `${classes.details}`;
    this.DOM.details.innerHTML = detailsTmpl;
    DOM.content.appendChild(this.DOM.details);
    this.init();
  }
  init() {
    this.DOM.bgUp = this.DOM.details.querySelector(`.${this.classes.details__bg_up}`);
    this.DOM.bgDown = this.DOM.details.querySelector(`.${this.classes.details__bg_down}`);
    this.DOM.img = this.DOM.details.querySelector(`.${this.classes.details__img}`);
    this.DOM.title = this.DOM.details.querySelector(`.${this.classes.details__title}`);
    this.DOM.deco = this.DOM.details.querySelector(`.${this.classes.details__deco}`);
    this.DOM.subtitle = this.DOM.details.querySelector(`.${this.classes.details__subtitle}`);
    this.DOM.price = this.DOM.details.querySelector(`.${this.classes.details__price}`);
    this.DOM.description = this.DOM.details.querySelector(
      `.${this.classes.details__description}`
    );
    this.DOM.cart = this.DOM.details.querySelector(`.${this.classes.details__addtocart}`);
    this.DOM.close = this.DOM.details.querySelector(`.${this.classes.details__close}`);
    this.DOM.magnifier = this.DOM.details.querySelector(
      `.${this.classes.details__magnifier}`
    );

    this.initEvents();
  }
  initEvents() {
    this.DOM.close.addEventListener('click', () =>
      this.isZoomed ? this.zoomOut() : this.close()
    );
    this.DOM.magnifier.addEventListener('click', () => this.zoomIn());
  }
  fill(info: { img: any; title: any; subtitle: any; description: any; price: any; }, classes: any) {

    this.DOM.img.src = info.img;
    this.DOM.title.innerHTML = info.title;
    // this.DOM.deco.classList.add(`${classes[`badge_${decoBackground}`]}`)
    this.DOM.subtitle.innerHTML = info.subtitle;
    this.DOM.price.innerHTML = info.price;
    this.DOM.description.innerHTML = info.description;
  }
  getProductDetailsRect() {
    return {
      productBgRect: this.DOM.productBg.getBoundingClientRect(),
      detailsBgRect: this.DOM.bgDown.getBoundingClientRect(),
      productImgRect: this.DOM.productImg.getBoundingClientRect(),
      detailsImgRect: this.DOM.img.getBoundingClientRect(),
    };
  }
  open(data: any) {
    if (this.isAnimating) return false;
    var body = document.getElementsByTagName('body');
    body[0].style.overflowY = 'hidden'
    var menuRef = document.getElementById('menuRef')!;
    menuRef.style.display = 'none'
    this.isAnimating = true;
    this.DOM.details.classList.add(`${this.classes.details__open}`);

    this.DOM.productBg = data.productBg;
    this.DOM.productImg = data.productImg;

    this.DOM.productBg.style.opacity = 0;
    this.DOM.productImg.style.opacity = 0;

    const rect = this.getProductDetailsRect();
    this.DOM.bgDown.style.transform = `translateX(${rect.productBgRect.left - rect.detailsBgRect.left
      }px) translateY(${rect.productBgRect.top - rect.detailsBgRect.top
      }px) scaleX(${rect.productBgRect.width / rect.detailsBgRect.width
      }) scaleY(${rect.productBgRect.height / rect.detailsBgRect.height})`;
    this.DOM.bgDown.style.opacity = 1;
    this.DOM.img.style.transform = `translateX(${rect.productImgRect.left - rect.detailsImgRect.left
      }px) translateY(${rect.productImgRect.top - rect.detailsImgRect.top
      }px) scaleX(${rect.productImgRect.width / rect.detailsImgRect.width
      }) scaleY(${rect.productImgRect.height / rect.detailsImgRect.height})`;
    this.DOM.img.style.opacity = 1;

    anime({
      targets: [this.DOM.bgDown, this.DOM.img],
      duration: (target: any, index: number) => (index ? 1800 : 250),
      easing: (targe: any, index: number) => (index ? 'easeOutElastic' : 'easeOutSine'),
      elasticity: 50,
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
      complete: () => (this.isAnimating = false),
    });

    anime({
      targets: [
        this.DOM.title,
        this.DOM.deco,
        this.DOM.subtitle,
        this.DOM.price,
        this.DOM.description,
        this.DOM.cart,
        this.DOM.magnifier,
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
      targets: this.DOM.bgUp,
      duration: 100,
      easing: 'linear',
      opacity: 1,
    });

    anime({
      targets: this.DOM.close,
      duration: 250,
      easing: 'easeOutSine',
      translateY: ['100%', 0],
      opacity: 1,
    });

    anime({
      targets: this.DOM.hamburger,
      duration: 250,
      easing: 'easeOutSine',
      translateY: [0, '-100%'],
    });
  }
  close() {
    if (this.isAnimating) return false;
    var body = document.getElementsByTagName('body');
    body[0].style.overflowY = 'auto'
    var menuRef = document.getElementById('menuRef')!;
    menuRef.style.display = 'flex'
    this.isAnimating = true;
    this.DOM.details.classList.remove(`${this.classes.details__open}`);
    // this.DOM.details.classList.remove(`${this.classes.details__open}`);


    anime({
      targets: this.DOM.hamburger,
      duration: 250,
      easing: 'easeOutSine',
      translateY: 0,
    });

    anime({
      targets: this.DOM.close,
      duration: 250,
      easing: 'easeOutSine',
      translateY: '100%',
      opacity: 0,
    });

    anime({
      targets: this.DOM.bgUp,
      duration: 100,
      easing: 'linear',
      opacity: 0,
    });

    anime({
      targets: [
        this.DOM.title,
        this.DOM.deco,
        this.DOM.subtitle,
        this.DOM.price,
        this.DOM.description,
        this.DOM.cart,
        this.DOM.magnifier,
      ],
      duration: 20,
      easing: 'linear',
      opacity: 0,
    });

    const rect = this.getProductDetailsRect();
    anime({
      targets: [this.DOM.bgDown, this.DOM.img],
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
      scaleX: (ttarget: any, index: number) => {
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
        this.DOM.bgDown.style.opacity = 0;
        this.DOM.img.style.opacity = 0;
        this.DOM.bgDown.style.transform = 'none';
        this.DOM.img.style.transform = 'none';
        this.DOM.productBg.style.opacity = 1;
        this.DOM.productImg.style.opacity = 1;
        this.isAnimating = false;
      },
    });
  }
  zoomIn() {
    this.isZoomed = true;

    anime({
      targets: [
        this.DOM.title,
        this.DOM.deco,
        this.DOM.subtitle,
        this.DOM.price,
        this.DOM.description,
        this.DOM.cart,
        this.DOM.magnifier,
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

    const imgrect = this.DOM.img.getBoundingClientRect();
    const win = { w: window.innerWidth, h: window.innerHeight };

    const imgAnimeOpts = {
      targets: this.DOM.img,
      duration: 1250,
      easing: 'easeOutCubic',
      translateX: win.w / 2 - (imgrect.left + imgrect.width / 2),
      translateY: win.h / 2 - (imgrect.top + imgrect.height / 2),
    };

    if (win.w > 0.8 * win.h) {
      this.DOM.img.style.transformOrigin = '50% 50%';
      Object.assign(imgAnimeOpts, {
        scaleX: (0.95 * win.w) / parseInt(`${0.8 * win.h}`),
        scaleY: (0.95 * win.w) / parseInt(`${0.8 * win.h}`),
        rotate: 90,
      });
    }
    anime(imgAnimeOpts);

    anime({
      targets: this.DOM.close,
      duration: 250,
      easing: 'easeInOutCubic',
      scale: 1.8,
      rotate: 180,
    });
  }
  zoomOut() {
    if (this.isAnimating) return false;
    this.isAnimating = true;
    this.isZoomed = false;

    anime({
      targets: [
        this.DOM.title,
        this.DOM.deco,
        this.DOM.subtitle,
        this.DOM.price,
        this.DOM.description,
        this.DOM.cart,
        this.DOM.magnifier,
      ],
      duration: 250,
      easing: 'easeOutCubic',
      translateY: 0,
      scale: 1,
      opacity: 1,
    });

    anime({
      targets: this.DOM.img,
      duration: 1250,
      easing: 'easeOutCubic',
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
      complete: () => {
        this.DOM.img.style.transformOrigin = '0 0';
        this.isAnimating = false;
      },
    });

    anime({
      targets: this.DOM.close,
      duration: 250,
      easing: 'easeInOutCubic',
      scale: 1,
      rotate: 0,
    });
  }
}
export function isObjectEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}
const CollectionComponent: FC = (() => {
  const { t, lang } = useShallowTranslation('common');
  const [selectedColor, setSelectedColor] = useState<{ [k: string]: any }>({})
  const { classes, theme, cx } = CollectionStyle({})
  const [animeRef, setAnimeRef] = useState<any[]>([]);

  const [turn, setTurn] = useState<any>({})
  // const [isZoomed, setIsZoomed] = useState<boolean>(false)
  // const [info, setInfo] = useState<{ [k: string]: any }>({})
  const [DOM, setDOM] = useState<{ [k: string]: any }>({})

  const productItems = useMemo(() => {
    return [
      {
        images: [
          {
            front: {
              black: '/img/diamond/black_front.png',
              blue: '/img/diamond/blue_front.png',
              green: '/img/diamond/green_front.png',
              magneta: '/img/diamond/magneta_front.png',
              orange: '/img/diamond/orange_front.png',
              pink: '/img/diamond/pink_front.png',
              red: '/img/diamond/red_front.png',
              violet: '/img/diamond/violet_front.png',
              white: '/img/diamond/white_front.png',
              yellow: '/img/diamond/yellow_front.png',
              yellowOrange: '/img/diamond/yellowOrange_front.png',
            },
            back: {
              black: '/img/diamond/black_back.png',
              blue: '/img/diamond/blue_back.png',
              green: '/img/diamond/green_back.png',
              magneta: '/img/diamond/magneta_back.png',
              orange: '/img/diamond/orange_back.png',
              pink: '/img/diamond/pink_back.png',
              red: '/img/diamond/red_back.png',
              violet: '/img/diamond/violet_back.png',
              white: '/img/diamond/white_back.png',
              yellow: '/img/diamond/yellow_back.png',
              yellowOrange: '/img/diamond/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'diamond',
        product_label: 'Diamond',
        product__img_front: '/img/pink_front.png',
        product__img_back: '/img/pink_behind.png',
        product__title: 'Marble Dream',
        product__subtitle: "Constantin Frecker",
        product__description: "Hashtag cred air plant drinking vinegar. Leggings yuccie chambray pop-up tousled hell of. Portland wolf mumblecore, synth cold-pressed polaroid poke cardigan gochujang farm-to-table photo booth.",
        product__price: "$129",
        colors: [{
          label: 'Black',
          name: 'black',
          _id: ''
        },
        {
          label: 'Blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'Green',
          name: 'green',
          _id: ''
        }, {
          label: 'Magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'Orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'Pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'Red',
          name: 'red',
          _id: ''
        }, {
          label: 'Violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'White',
          name: 'white',
          _id: ''
        }, {
          label: 'Yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'Yellow Orange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/diamond/black_front.png',
              blue: '/img/diamond/blue_front.png',
              green: '/img/diamond/green_front.png',
              magneta: '/img/diamond/magneta_front.png',
              orange: '/img/diamond/orange_front.png',
              pink: '/img/diamond/pink_front.png',
              red: '/img/diamond/red_front.png',
              violet: '/img/diamond/violet_front.png',
              white: '/img/diamond/white_front.png',
              yellow: '/img/diamond/yellow_front.png',
              yellowOrange: '/img/diamond/yellowOrange_front.png',
            },
            back: {
              black: '/img/diamond/black_back.png',
              blue: '/img/diamond/blue_back.png',
              green: '/img/diamond/green_back.png',
              magneta: '/img/diamond/magneta_back.png',
              orange: '/img/diamond/orange_back.png',
              pink: '/img/diamond/pink_back.png',
              red: '/img/diamond/red_back.png',
              violet: '/img/diamond/violet_back.png',
              white: '/img/diamond/white_back.png',
              yellow: '/img/diamond/yellow_back.png',
              yellowOrange: '/img/diamond/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'diamond',
        product_label: 'Diamond',
        product__img_front: '/img/2.png',
        product__img_back: '/img/2.png',
        product__title: 'Space Fantasy',
        product__subtitle: "Danica Green",
        product__description: "Man bun banjo pop-up meh hammock. Skateboard hammock tousled retro, etsy taiyaki narwhal gentrify fixie food truck microdosing sustainable dreamcatcher.",
        product__price: "$199",
        colors: [{
          label: 'Black',
          name: 'black',
          _id: ''
        },
        {
          label: 'Blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'Green',
          name: 'green',
          _id: ''
        }, {
          label: 'Magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'Orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'Pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'Red',
          name: 'red',
          _id: ''
        }, {
          label: 'Violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'White',
          name: 'white',
          _id: ''
        }, {
          label: 'Yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'Yellow Orange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/diamond/black_front.png',
              blue: '/img/diamond/blue_front.png',
              green: '/img/diamond/green_front.png',
              magneta: '/img/diamond/magneta_front.png',
              orange: '/img/diamond/orange_front.png',
              pink: '/img/diamond/pink_front.png',
              red: '/img/diamond/red_front.png',
              violet: '/img/diamond/violet_front.png',
              white: '/img/diamond/white_front.png',
              yellow: '/img/diamond/yellow_front.png',
              yellowOrange: '/img/diamond/yellowOrange_front.png',
            },
            back: {
              black: '/img/diamond/black_back.png',
              blue: '/img/diamond/blue_back.png',
              green: '/img/diamond/green_back.png',
              magneta: '/img/diamond/magneta_back.png',
              orange: '/img/diamond/orange_back.png',
              pink: '/img/diamond/pink_back.png',
              red: '/img/diamond/red_back.png',
              violet: '/img/diamond/violet_back.png',
              white: '/img/diamond/white_back.png',
              yellow: '/img/diamond/yellow_back.png',
              yellowOrange: '/img/diamond/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'diamond',
        product_label: 'Diamond',
        product__img_front: '/img/3.png',
        product__img_back: '/img/3.png',
        product__title: 'Mighty Eighties',
        product__subtitle: "Elizabeth Smith",
        product__description: "Air plant affogato microdosing banjo, palo santo squid craft beer vexillologist chambray everyday carry cronut aesthetic intelligentsia. ",
        product__price: "$159",
        colors: [{
          label: 'Black',
          name: 'black',
          _id: ''
        },
        {
          label: 'Blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'Green',
          name: 'green',
          _id: ''
        }, {
          label: 'Magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'Orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'Pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'Red',
          name: 'red',
          _id: ''
        }, {
          label: 'Violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'White',
          name: 'white',
          _id: ''
        }, {
          label: 'Yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'Yellow Orange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/diamond/black_front.png',
              blue: '/img/diamond/blue_front.png',
              green: '/img/diamond/green_front.png',
              magneta: '/img/diamond/magneta_front.png',
              orange: '/img/diamond/orange_front.png',
              pink: '/img/diamond/pink_front.png',
              red: '/img/diamond/red_front.png',
              violet: '/img/diamond/violet_front.png',
              white: '/img/diamond/white_front.png',
              yellow: '/img/diamond/yellow_front.png',
              yellowOrange: '/img/diamond/yellowOrange_front.png',
            },
            back: {
              black: '/img/diamond/black_back.png',
              blue: '/img/diamond/blue_back.png',
              green: '/img/diamond/green_back.png',
              magneta: '/img/diamond/magneta_back.png',
              orange: '/img/diamond/orange_back.png',
              pink: '/img/diamond/pink_back.png',
              red: '/img/diamond/red_back.png',
              violet: '/img/diamond/violet_back.png',
              white: '/img/diamond/white_back.png',
              yellow: '/img/diamond/yellow_back.png',
              yellowOrange: '/img/diamond/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'diamond',
        product_label: 'Diamond',
        product__img_front: '/img/4.png',
        product__img_back: '/img/4.png',
        product__title: 'Diamond Crafter',
        product__subtitle: "Fred House",
        product__description: "Crucifix shoreditch tumblr heirloom irony tbh gastropub migas sartorial mustache direct trade plaid readymade ramps hammock.",
        product__price: "$199",
        colors: [{
          label: 'Black',
          name: 'black',
          _id: ''
        },
        {
          label: 'Blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'Green',
          name: 'green',
          _id: ''
        }, {
          label: 'Magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'Orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'Pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'Red',
          name: 'red',
          _id: ''
        }, {
          label: 'Violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'White',
          name: 'white',
          _id: ''
        }, {
          label: 'Yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'Yellow Orange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/diamond/black_front.png',
              blue: '/img/diamond/blue_front.png',
              green: '/img/diamond/green_front.png',
              magneta: '/img/diamond/magneta_front.png',
              orange: '/img/diamond/orange_front.png',
              pink: '/img/diamond/pink_front.png',
              red: '/img/diamond/red_front.png',
              violet: '/img/diamond/violet_front.png',
              white: '/img/diamond/white_front.png',
              yellow: '/img/diamond/yellow_front.png',
              yellowOrange: '/img/diamond/yellowOrange_front.png',
            },
            back: {
              black: '/img/diamond/black_back.png',
              blue: '/img/diamond/blue_back.png',
              green: '/img/diamond/green_back.png',
              magneta: '/img/diamond/magneta_back.png',
              orange: '/img/diamond/orange_back.png',
              pink: '/img/diamond/pink_back.png',
              red: '/img/diamond/red_back.png',
              violet: '/img/diamond/violet_back.png',
              white: '/img/diamond/white_back.png',
              yellow: '/img/diamond/yellow_back.png',
              yellowOrange: '/img/diamond/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'diamond',
        product_label: 'Diamond',
        product__img_front: '/img/5.png',
        product__img_back: '/img/5.png',
        product__title: 'Disco Fever',
        product__subtitle: "Alice Muller",
        product__description: "Single-origin coffee air plant kitsch paleo iPhone vegan cold-pressed slow-carb cornhole dreamcatcher palo santo salvia lo-fi. ",
        product__price: "$99",
        colors: [{
          label: 'Black',
          name: 'black',
          _id: ''
        },
        {
          label: 'Blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'Green',
          name: 'green',
          _id: ''
        }, {
          label: 'Magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'Orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'Pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'Red',
          name: 'red',
          _id: ''
        }, {
          label: 'Violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'White',
          name: 'white',
          _id: ''
        }, {
          label: 'Yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'Yellow Orange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/diamond/black_front.png',
              blue: '/img/diamond/blue_front.png',
              green: '/img/diamond/green_front.png',
              magneta: '/img/diamond/magneta_front.png',
              orange: '/img/diamond/orange_front.png',
              pink: '/img/diamond/pink_front.png',
              red: '/img/diamond/red_front.png',
              violet: '/img/diamond/violet_front.png',
              white: '/img/diamond/white_front.png',
              yellow: '/img/diamond/yellow_front.png',
              yellowOrange: '/img/diamond/yellowOrange_front.png',
            },
            back: {
              black: '/img/diamond/black_back.png',
              blue: '/img/diamond/blue_back.png',
              green: '/img/diamond/green_back.png',
              magneta: '/img/diamond/magneta_back.png',
              orange: '/img/diamond/orange_back.png',
              pink: '/img/diamond/pink_back.png',
              red: '/img/diamond/red_back.png',
              violet: '/img/diamond/violet_back.png',
              white: '/img/diamond/white_back.png',
              yellow: '/img/diamond/yellow_back.png',
              yellowOrange: '/img/diamond/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'diamond',
        product_label: 'Diamond',
        product__img_front: '/img/6.png',
        product__img_back: '/img/6.png',
        product__title: 'Little Boxes',
        product__subtitle: "Xavier Brighton",
        product__description: "Drinking vinegar lumbersexual 90's flexitarian. Live-edge man bun air plant XOXO. Master cleanse vaporware keffiyeh.",
        product__price: "$299",
        colors: [{
          label: 'Black',
          name: 'black',
          _id: ''
        },
        {
          label: 'Blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'Green',
          name: 'green',
          _id: ''
        }, {
          label: 'Magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'Orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'Pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'Red',
          name: 'red',
          _id: ''
        }, {
          label: 'Violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'White',
          name: 'white',
          _id: ''
        }, {
          label: 'Yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'Yellow Orange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/diamond/black_front.png',
              blue: '/img/diamond/blue_front.png',
              green: '/img/diamond/green_front.png',
              magneta: '/img/diamond/magneta_front.png',
              orange: '/img/diamond/orange_front.png',
              pink: '/img/diamond/pink_front.png',
              red: '/img/diamond/red_front.png',
              violet: '/img/diamond/violet_front.png',
              white: '/img/diamond/white_front.png',
              yellow: '/img/diamond/yellow_front.png',
              yellowOrange: '/img/diamond/yellowOrange_front.png',
            },
            back: {
              black: '/img/diamond/black_back.png',
              blue: '/img/diamond/blue_back.png',
              green: '/img/diamond/green_back.png',
              magneta: '/img/diamond/magneta_back.png',
              orange: '/img/diamond/orange_back.png',
              pink: '/img/diamond/pink_back.png',
              red: '/img/diamond/red_back.png',
              violet: '/img/diamond/violet_back.png',
              white: '/img/diamond/white_back.png',
              yellow: '/img/diamond/yellow_back.png',
              yellowOrange: '/img/diamond/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'diamond',
        product_label: 'Diamond',
        product__img_front: '/img/7.png',
        product__img_back: '/img/7.png',
        product__title: 'Fractal Love',
        product__subtitle: "Walter Perry",
        product__description: "Leggings green juice DIY, flannel tattooed selvage plaid yr sartorial chia. Scenester you probably haven't heard of them locavore.",
        product__price: "$129",
        colors: [{
          label: 'Black',
          name: 'black',
          _id: ''
        },
        {
          label: 'Blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'Green',
          name: 'green',
          _id: ''
        }, {
          label: 'Magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'Orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'Pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'Red',
          name: 'red',
          _id: ''
        }, {
          label: 'Violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'White',
          name: 'white',
          _id: ''
        }, {
          label: 'Yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'Yellow Orange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/diamond/black_front.png',
              blue: '/img/diamond/blue_front.png',
              green: '/img/diamond/green_front.png',
              magneta: '/img/diamond/magneta_front.png',
              orange: '/img/diamond/orange_front.png',
              pink: '/img/diamond/pink_front.png',
              red: '/img/diamond/red_front.png',
              violet: '/img/diamond/violet_front.png',
              white: '/img/diamond/white_front.png',
              yellow: '/img/diamond/yellow_front.png',
              yellowOrange: '/img/diamond/yellowOrange_front.png',
            },
            back: {
              black: '/img/diamond/black_back.png',
              blue: '/img/diamond/blue_back.png',
              green: '/img/diamond/green_back.png',
              magneta: '/img/diamond/magneta_back.png',
              orange: '/img/diamond/orange_back.png',
              pink: '/img/diamond/pink_back.png',
              red: '/img/diamond/red_back.png',
              violet: '/img/diamond/violet_back.png',
              white: '/img/diamond/white_back.png',
              yellow: '/img/diamond/yellow_back.png',
              yellowOrange: '/img/diamond/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'diamond',
        product_label: 'Diamond',
        product__img_front: '/img/8.png',
        product__img_back: '/img/8.png',
        product__title: 'Liquidia',
        product__subtitle: "Lidia Greenwood",
        product__description: "Helvetica la croix readymade, butcher viral pitchfork chillwave pork belly vaporware blue bottle iceland semiotics subway tile irony.",
        product__price: "$249",
        colors: [{
          label: 'Black',
          name: 'black',
          _id: ''
        },
        {
          label: 'Blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'Green',
          name: 'green',
          _id: ''
        }, {
          label: 'Magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'Orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'Pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'Red',
          name: 'red',
          _id: ''
        }, {
          label: 'Violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'White',
          name: 'white',
          _id: ''
        }, {
          label: 'Yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'Yellow Orange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/diamond/black_front.png',
              blue: '/img/diamond/blue_front.png',
              green: '/img/diamond/green_front.png',
              magneta: '/img/diamond/magneta_front.png',
              orange: '/img/diamond/orange_front.png',
              pink: '/img/diamond/pink_front.png',
              red: '/img/diamond/red_front.png',
              violet: '/img/diamond/violet_front.png',
              white: '/img/diamond/white_front.png',
              yellow: '/img/diamond/yellow_front.png',
              yellowOrange: '/img/diamond/yellowOrange_front.png',
            },
            back: {
              black: '/img/diamond/black_back.png',
              blue: '/img/diamond/blue_back.png',
              green: '/img/diamond/green_back.png',
              magneta: '/img/diamond/magneta_back.png',
              orange: '/img/diamond/orange_back.png',
              pink: '/img/diamond/pink_back.png',
              red: '/img/diamond/red_back.png',
              violet: '/img/diamond/violet_back.png',
              white: '/img/diamond/white_back.png',
              yellow: '/img/diamond/yellow_back.png',
              yellowOrange: '/img/diamond/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'diamond',
        product_label: 'Diamond',
        product__img_front: '/img/9.png',
        product__img_back: '/img/9.png',
        product__title: 'The Buzz',
        product__subtitle: "Sarah Grand",
        product__description: "Celiac distillery man braid venmo, selfies you probably haven't heard of them tote bag forage fanny pack activated charcoal kale chips lo-fi before they sold out.",
        product__price: "$399",
        colors: [{
          label: 'Black',
          name: 'black',
          _id: ''
        },
        {
          label: 'Blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'Green',
          name: 'green',
          _id: ''
        }, {
          label: 'Magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'Orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'Pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'Red',
          name: 'red',
          _id: ''
        }, {
          label: 'Violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'White',
          name: 'white',
          _id: ''
        }, {
          label: 'Yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'Yellow Orange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/diamond/black_front.png',
              blue: '/img/diamond/blue_front.png',
              green: '/img/diamond/green_front.png',
              magneta: '/img/diamond/magneta_front.png',
              orange: '/img/diamond/orange_front.png',
              pink: '/img/diamond/pink_front.png',
              red: '/img/diamond/red_front.png',
              violet: '/img/diamond/violet_front.png',
              white: '/img/diamond/white_front.png',
              yellow: '/img/diamond/yellow_front.png',
              yellowOrange: '/img/diamond/yellowOrange_front.png',
            },
            back: {
              black: '/img/diamond/black_back.png',
              blue: '/img/diamond/blue_back.png',
              green: '/img/diamond/green_back.png',
              magneta: '/img/diamond/magneta_back.png',
              orange: '/img/diamond/orange_back.png',
              pink: '/img/diamond/pink_back.png',
              red: '/img/diamond/red_back.png',
              violet: '/img/diamond/violet_back.png',
              white: '/img/diamond/white_back.png',
              yellow: '/img/diamond/yellow_back.png',
              yellowOrange: '/img/diamond/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'diamond',
        product_label: 'Diamond',
        product__img_front: '/img/10.png',
        product__img_back: '/img/10.png',
        product__title: 'Sweet Escape',
        product__subtitle: "Peter Gradia",
        product__description: "Mumblecore bespoke blog raw denim, authentic VHS sustainable +1 freegan neutra small batch paleo. Schlitz chicharrones pork belly palo santo.",
        product__price: "$199",
        colors: [{
          label: 'Black',
          name: 'black',
          _id: ''
        },
        {
          label: 'Blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'Green',
          name: 'green',
          _id: ''
        }, {
          label: 'Magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'Orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'Pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'Red',
          name: 'red',
          _id: ''
        }, {
          label: 'Violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'White',
          name: 'white',
          _id: ''
        }, {
          label: 'Yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'Yellow Orange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
    ]
  }, [])

  useEffect(() => {
    // add  refs
    if (productItems.length !== 0) {
      setAnimeRef((animeRef) =>
        Array(productItems.length)
          .fill(0)
          .map((_, i) => animeRef[i] || createRef())
      );
      setSelectedColor((prevState: any) => {
        return Array(productItems.length)
          .fill(0)
          .map((_, i) => { return { [i]: 'red' } })
      })
    }


    // { return { ...prevState, [index]: false } })
    // items.push(new Item(item, classes, animeRef, DOM, index))

  }, [productItems]);

  let items = [];
  useEffect(() => {
    if (animeRef.length == productItems.length) {
      DOM.grid = document.querySelector(`.${classes.grid}`);
      DOM.content = DOM.grid.parentNode;
      DOM.hamburger = document.querySelector(`.${classes.dummyMenu}`);
      DOM.gridItems = Array.from(DOM.grid.querySelectorAll(`.${classes.grid__item}`));
      DOM.gridItems.forEach((item: any, index: number) => {
        items.push(new Item(item, classes, animeRef, DOM, index, turn))
      });

      const detailsDiv = document.getElementsByClassName(`${classes.details}`);
      while (detailsDiv.length > 0) {
        detailsDiv[0].remove()
      };
      DOM.details = new Details(classes, DOM, anime);
    }
  }, [animeRef, theme.palette.mode, turn, selectedColor])





  return (
    <Fragment>
      <svg style={{ display: 'none' }}>
        {/* <symbol id="icon-arrow" viewBox="0 0 24 24">
          <title>arrow</title>
          <polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 " />
        </symbol>
        <symbol id="icon-drop" viewBox="0 0 24 24">
          <title>drop</title>
          <path d="M12,21c-3.6,0-6.6-3-6.6-6.6C5.4,11,10.8,4,11.4,3.2C11.6,3.1,11.8,3,12,3s0.4,0.1,0.6,0.3c0.6,0.8,6.1,7.8,6.1,11.2C18.6,18.1,15.6,21,12,21zM12,4.8c-1.8,2.4-5.2,7.4-5.2,9.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2C17.2,12.2,13.8,7.3,12,4.8z" /><path d="M12,18.2c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7c1.3,0,2.4-1.1,2.4-2.4c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C15.8,16.5,14.1,18.2,12,18.2z" />
        </symbol> */}
        <symbol id="icon-cross" viewBox="0 0 24 24">
          <title>cross</title>
          <path d="M 5.5,2.5 C 5.372,2.5 5.244,2.549 5.146,2.646 L 2.646,5.146 C 2.451,5.341 2.451,5.659 2.646,5.854 L 8.793,12 2.646,18.15 C 2.451,18.34 2.451,18.66 2.646,18.85 L 5.146,21.35 C 5.341,21.55 5.659,21.55 5.854,21.35 L 12,15.21 18.15,21.35 C 18.24,21.45 18.37,21.5 18.5,21.5 18.63,21.5 18.76,21.45 18.85,21.35 L 21.35,18.85 C 21.55,18.66 21.55,18.34 21.35,18.15 L 15.21,12 21.35,5.854 C 21.55,5.658 21.55,5.342 21.35,5.146 L 18.85,2.646 C 18.66,2.451 18.34,2.451 18.15,2.646 L 12,8.793 5.854,2.646 C 5.756,2.549 5.628,2.5 5.5,2.5 Z" />
        </symbol>
        {/* <symbol id="icon-menu" viewBox="0 0 24 24">
          <title>menu</title>
          <path d="M23.8,6H0.1V3h23.7C23.8,3,23.8,6,23.8,6z M23.8,10.5H0.1v3h23.7C23.8,13.5,23.8,10.5,23.8,10.5z M24,18H10v3h14V18z" />
        </symbol> */}
        <symbol id="icon-magnifier" viewBox="0 0 490.8 490.8">
          <title>magnifier</title>
          <path d="M364.8,299.55c46.3-75.8,36.9-176.3-28.6-241.9c-76.8-76.8-201.8-76.8-278.6,0s-76.8,201.8,0,278.5c65.5,65.5,166,74.9,241.9,28.6L412,477.25c18,18,47.3,18,65.3,0s18-47.3,0-65.3L364.8,299.55z M295.5,295.55c-54.4,54.4-142.8,54.4-197.1,0c-54.4-54.4-54.4-142.8,0-197.1c54.4-54.4,142.8-54.4,197.1,0C349.8,152.75,349.8,241.15,295.5,295.55z M220,171.95h59.4v45.3H220v59.4h-45.3v-59.4h-59.3v-45.3h59.4v-59.4h45.3v59.4H220z" />
        </symbol>
      </svg>
      <main >
        <button className={classes.dummyMenu}>
          <svg className="icon icon--menu">
            <use xlinkHref="#icon-menu"></use></svg></button>
        <div className={classes.content}>
          <div className={`${classes.grid} animate__animated animate__fadeInUp`} >
            {
              productItems.map((product, i) => {
                return (
                  <div className={classes.grid__item} key={i.toString()}>
                    <div ref={animeRef[i]} className={classes.product}>
                      <div className={classes.product__bg} onClick={() => {
                        document.getElementById('deco')?.classList.add(classes[`badge_${Object.values(selectedColor[i])[0]}` as keyof typeof classes])
                      }} ></div>
                      {
                        product.images.map((image, j) => {
                          const frontImageSrc = !isObjectEmpty(selectedColor) ? image['front'][selectedColor[i][i] as keyof typeof image['front']] : ''
                          const backImageSrc = !isObjectEmpty(selectedColor) ? image['back'][selectedColor[i][i] as keyof typeof image['back']] : ''
                          return (
                            <Fragment key={j}>
                              <img className={
                                cx(turn[i] ? classes.product__img_back : classes.product__img_back_turn)
                              }
                                src={backImageSrc}
                                alt={product.product__title} />
                              <img className={
                                cx(turn[i] ? classes.product__img : classes.product__img_turn)
                              }
                                src={frontImageSrc}
                                alt={product.product__title} />
                            </Fragment>
                          )
                        })
                      }
                      <div className={classes.badgeColors} >
                        {
                          product.colors.map((c, index) => {

                            return (
                              <Tooltip key={index} title={c.label} placement="top" arrow sx={{
                                border: `solid 0.5px ${c.name}`,
                              }}>
                                <span
                                  className={cx(classes.badge, typeof selectedColor[i] !== 'undefined' && selectedColor[i][i] == c.name && classes.activeBadge, classes[`badge_${c.name}` as keyof typeof classes])} onClick={() => {
                                    setSelectedColor((prevState) => {
                                      return { ...prevState, [i]: { [i]: c.name } }
                                    })
                                  }} />
                              </Tooltip>
                            )
                          })
                        }
                      </div>
                      <h2 className={classes.product__title} >{product.product_label} {`(${selectedColor[i] !== undefined ? selectedColor[i][i] : ''})`}</h2>
                      <h3 className={classes.product__subtitle} >{product.product__subtitle}</h3>
                      <p className={classes.product__description} >{product.product__description}</p>
                      <div className={classes.product__price} >{product.product__price}</div>
                    </div>
                    <Button
                      variant="contained"
                      color={theme.palette.mode == 'dark' ? "secondary" : 'primary'}
                      style={{ color: 'black' }}
                      onClick={() => {
                        setTurn((prevState: any) => { return { ...prevState, [i]: !prevState[i] } })
                      }}
                    >Turn</Button>
                  </div>
                )
              })
            }
          </div>
        </div>
        <section className={cx(classes.content, classes.contentRelated)}>
          <p className={classes.p}>Find this project on <a href="https://github.com/codrops/ExpandingGridItemAnimation/">GitHub</a>.</p>
          <p>If you enjoyed this demo you might also like:</p>
          <a className={classes.mediaItem} href="https://tympanus.net/Development/AnimatedGridLayout/">
            <img className={classes.mediaItem_img} src="/img/related/GridItemAnimation.jpg" />
            <h3 className={classes.mediaItem_title}>Grid Item Animation Layout</h3>
          </a>
          <a className={classes.mediaItem} href="https://tympanus.net/Development/ImageGridEffects/">
            <img className={classes.mediaItem_img} src="/img/related/ImageGridEffects.png" />
            <h3 className={classes.mediaItem_title}>Effect Ideas for Image Grids</h3>
          </a>
          <p className={classes.p}>Guitar vector <a href="http://www.freepik.com">designed by Freepik</a>.</p>
          <p className={classes.p}>Patterns by <a href="https://pixelbuddha.net/">Pixel Buddha</a>.</p>
        </section>
      </main>
      <Script src="/js/imagesloaded.pkgd.min.js" />
      <Script src="/js/anime.min.js" />
      {/* <Script src="/js/main.js" /> */}
    </Fragment>
  )
});

export default CollectionComponent