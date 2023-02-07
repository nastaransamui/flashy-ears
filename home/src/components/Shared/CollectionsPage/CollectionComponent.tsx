import useShallowTranslation from "@/src/components/Hooks/useShallowTranslation";
import Script from "next/script";
import { FC, Fragment, useEffect, useMemo, useState, createRef } from "react";
import CollectionStyle from "./Collection-style";
import anime from 'animejs/lib/anime';
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip'
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import IconButton from '@mui/material/IconButton'
import Link from "next/link";
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
      // productBg: this.DOM.gridItems[index].firstChild?.firstChild,
      // productImg: this.DOM.gridItems[index].firstChild.getElementsByTagName('img')[0],
      productBg: this.DOM.gridItems[index].getElementsByTagName('div')[1],
      productImg: this.DOM.gridItems[index].getElementsByTagName('img')[0],
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
        product_label_en: 'Diamond Model',
        product_label_th: 'เพชร',
        product_subtitle_en: "Size: (30mm x 48mm x 5mm)",
        product_subtitle_th: "ขนาด: (30 มม. x 48 มม. x 5 มม.)",
        product__description: "Hashtag cred air plant drinking vinegar. Leggings yuccie chambray pop-up tousled hell of. Portland wolf mumblecore, synth cold-pressed polaroid poke cardigan gochujang farm-to-table photo booth.",
        product__price: "$129",
        colors: [{
          label: 'black',
          name: 'black',
          _id: ''
        },
        {
          label: 'blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'green',
          name: 'green',
          _id: ''
        }, {
          label: 'magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'red',
          name: 'red',
          _id: ''
        }, {
          label: 'violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'white',
          name: 'white',
          _id: ''
        }, {
          label: 'yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'yellowOrange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/bell/black_front.png',
              blue: '/img/bell/blue_front.png',
              green: '/img/bell/green_front.png',
              magneta: '/img/bell/magneta_front.png',
              orange: '/img/bell/orange_front.png',
              pink: '/img/bell/pink_front.png',
              red: '/img/bell/red_front.png',
              violet: '/img/bell/violet_front.png',
              white: '/img/bell/white_front.png',
              yellow: '/img/bell/yellow_front.png',
              yellowOrange: '/img/bell/yellowOrange_front.png',
            },
            back: {
              black: '/img/bell/black_back.png',
              blue: '/img/bell/blue_back.png',
              green: '/img/bell/green_back.png',
              magneta: '/img/bell/magneta_back.png',
              orange: '/img/bell/orange_back.png',
              pink: '/img/bell/pink_back.png',
              red: '/img/bell/red_back.png',
              violet: '/img/bell/violet_back.png',
              white: '/img/bell/white_back.png',
              yellow: '/img/bell/yellow_back.png',
              yellowOrange: '/img/bell/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'bell',
        product_label_en: 'Bell Model',
        product_label_th: 'เบลล์โมเดล',
        product_subtitle_en: "Size: (30mm x 48mm x 5mm)",
        product_subtitle_th: "ขนาด: (30 มม. x 48 มม. x 5 มม.)",
        product__description: "Man bun banjo pop-up meh hammock. Skateboard hammock tousled retro, etsy taiyaki narwhal gentrify fixie food truck microdosing sustainable dreamcatcher.",
        product__price: "$199",
        colors: [{
          label: 'black',
          name: 'black',
          _id: ''
        },
        {
          label: 'blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'green',
          name: 'green',
          _id: ''
        }, {
          label: 'magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'red',
          name: 'red',
          _id: ''
        }, {
          label: 'violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'white',
          name: 'white',
          _id: ''
        }, {
          label: 'yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'yellowOrange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/socks/black_front.png',
              blue: '/img/socks/blue_front.png',
              green: '/img/socks/green_front.png',
              magneta: '/img/socks/magneta_front.png',
              orange: '/img/socks/orange_front.png',
              pink: '/img/socks/pink_front.png',
              red: '/img/socks/red_front.png',
              violet: '/img/socks/violet_front.png',
              white: '/img/socks/white_front.png',
              yellow: '/img/socks/yellow_front.png',
              yellowOrange: '/img/socks/yellowOrange_front.png',
            },
            back: {
              black: '/img/socks/black_back.png',
              blue: '/img/socks/blue_back.png',
              green: '/img/socks/green_back.png',
              magneta: '/img/socks/magneta_back.png',
              orange: '/img/socks/orange_back.png',
              pink: '/img/socks/pink_back.png',
              red: '/img/socks/red_back.png',
              violet: '/img/socks/violet_back.png',
              white: '/img/socks/white_back.png',
              yellow: '/img/socks/yellow_back.png',
              yellowOrange: '/img/socks/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'socks',
        product_label_en: 'Socks Model',
        product_label_th: 'โมเดลถุงเท้า',
        product_subtitle_en: "Size: (30mm x 48mm x 5mm)",
        product_subtitle_th: "ขนาด: (30 มม. x 48 มม. x 5 มม.)",
        product__description: "Air plant affogato microdosing banjo, palo santo squid craft beer vexillologist chambray everyday carry cronut aesthetic intelligentsia. ",
        product__price: "$159",
        colors: [{
          label: 'black',
          name: 'black',
          _id: ''
        },
        {
          label: 'blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'green',
          name: 'green',
          _id: ''
        }, {
          label: 'magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'red',
          name: 'red',
          _id: ''
        }, {
          label: 'violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'white',
          name: 'white',
          _id: ''
        }, {
          label: 'yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'yellowOrange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/crookedTriangle/black_front.png',
              blue: '/img/crookedTriangle/blue_front.png',
              green: '/img/crookedTriangle/green_front.png',
              magneta: '/img/crookedTriangle/magneta_front.png',
              orange: '/img/crookedTriangle/orange_front.png',
              pink: '/img/crookedTriangle/pink_front.png',
              red: '/img/crookedTriangle/red_front.png',
              violet: '/img/crookedTriangle/violet_front.png',
              white: '/img/crookedTriangle/white_front.png',
              yellow: '/img/crookedTriangle/yellow_front.png',
              yellowOrange: '/img/crookedTriangle/yellowOrange_front.png',
            },
            back: {
              black: '/img/crookedTriangle/black_back.png',
              blue: '/img/crookedTriangle/blue_back.png',
              green: '/img/crookedTriangle/green_back.png',
              magneta: '/img/crookedTriangle/magneta_back.png',
              orange: '/img/crookedTriangle/orange_back.png',
              pink: '/img/crookedTriangle/pink_back.png',
              red: '/img/crookedTriangle/red_back.png',
              violet: '/img/crookedTriangle/violet_back.png',
              white: '/img/crookedTriangle/white_back.png',
              yellow: '/img/crookedTriangle/yellow_back.png',
              yellowOrange: '/img/crookedTriangle/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'crookedTriangle',
        product_label_en: 'Crooked Triangle Model',
        product_label_th: 'โมเดลสามเหลี่ยมคดเคี้ยว',
        product_subtitle_en: "Size: (30mm x 48mm x 5mm)",
        product_subtitle_th: "ขนาด: (30 มม. x 48 มม. x 5 มม.)",
        product__description: "Crucifix shoreditch tumblr heirloom irony tbh gastropub migas sartorial mustache direct trade plaid readymade ramps hammock.",
        product__price: "$199",
        colors: [{
          label: 'black',
          name: 'black',
          _id: ''
        },
        {
          label: 'blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'green',
          name: 'green',
          _id: ''
        }, {
          label: 'magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'red',
          name: 'red',
          _id: ''
        }, {
          label: 'violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'white',
          name: 'white',
          _id: ''
        }, {
          label: 'yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'yellowOrange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/longTriangle/black_front.png',
              blue: '/img/longTriangle/blue_front.png',
              green: '/img/longTriangle/green_front.png',
              magneta: '/img/longTriangle/magneta_front.png',
              orange: '/img/longTriangle/orange_front.png',
              pink: '/img/longTriangle/pink_front.png',
              red: '/img/longTriangle/red_front.png',
              violet: '/img/longTriangle/violet_front.png',
              white: '/img/longTriangle/white_front.png',
              yellow: '/img/longTriangle/yellow_front.png',
              yellowOrange: '/img/longTriangle/yellowOrange_front.png',
            },
            back: {
              black: '/img/longTriangle/black_back.png',
              blue: '/img/longTriangle/blue_back.png',
              green: '/img/longTriangle/green_back.png',
              magneta: '/img/longTriangle/magneta_back.png',
              orange: '/img/longTriangle/orange_back.png',
              pink: '/img/longTriangle/pink_back.png',
              red: '/img/longTriangle/red_back.png',
              violet: '/img/longTriangle/violet_back.png',
              white: '/img/longTriangle/white_back.png',
              yellow: '/img/longTriangle/yellow_back.png',
              yellowOrange: '/img/longTriangle/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'longTriangle',
        product_label_en: 'Long Triangle Model',
        product_label_th: 'โมเดลสามเหลี่ยมยาว',
        product_subtitle_en: "Size: (30mm x 48mm x 5mm)",
        product_subtitle_th: "ขนาด: (30 มม. x 48 มม. x 5 มม.)",
        product__description: "Single-origin coffee air plant kitsch paleo iPhone vegan cold-pressed slow-carb cornhole dreamcatcher palo santo salvia lo-fi. ",
        product__price: "$99",
        colors: [{
          label: 'black',
          name: 'black',
          _id: ''
        },
        {
          label: 'blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'green',
          name: 'green',
          _id: ''
        }, {
          label: 'magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'red',
          name: 'red',
          _id: ''
        }, {
          label: 'violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'white',
          name: 'white',
          _id: ''
        }, {
          label: 'yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'yellowOrange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/octagon/black_front.png',
              blue: '/img/octagon/blue_front.png',
              green: '/img/octagon/green_front.png',
              magneta: '/img/octagon/magneta_front.png',
              orange: '/img/octagon/orange_front.png',
              pink: '/img/octagon/pink_front.png',
              red: '/img/octagon/red_front.png',
              violetB: '/img/octagon/violetB_front.png',
              violetC: '/img/octagon/violetC_front.png',
              violetW: '/img/octagon/violetW_front.png',
              yellow: '/img/octagon/yellow_front.png',
              yellowOrange: '/img/octagon/yellowOrange_front.png',
            },
            back: {
              black: '/img/octagon/black_back.png',
              blue: '/img/octagon/blue_back.png',
              green: '/img/octagon/green_back.png',
              magneta: '/img/octagon/magneta_back.png',
              orange: '/img/octagon/orange_back.png',
              pink: '/img/octagon/pink_back.png',
              red: '/img/octagon/red_back.png',
              violetB: '/img/octagon/violetB_back.png',
              violetC: '/img/octagon/violetC_back.png',
              violetW: '/img/octagon/violetW_back.png',
              yellow: '/img/octagon/yellow_back.png',
              yellowOrange: '/img/octagon/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'octagon',
        product_label_en: 'Octagon Model',
        product_label_th: 'รุ่นแปดเหลี่ยม',
        product_subtitle_en: "Size: (30mm x 48mm x 5mm)",
        product_subtitle_th: "ขนาด: (30 มม. x 48 มม. x 5 มม.)",
        product__description: "Drinking vinegar lumbersexual 90's flexitarian. Live-edge man bun air plant XOXO. Master cleanse vaporware keffiyeh.",
        product__price: "$299",
        colors: [{
          label: 'black',
          name: 'black',
          _id: ''
        },
        {
          label: 'blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'green',
          name: 'green',
          _id: ''
        }, {
          label: 'magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'red',
          name: 'red',
          _id: ''
        }, {
          label: 'violet',
          name: 'violetB',
          _id: ''
        }, {
          label: 'violet',
          name: 'violetC',
          _id: ''
        }, {
          label: 'violet',
          name: 'violetW',
          _id: ''
        }, {
          label: 'yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'yellowOrange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/oval/black_front.png',
              blue: '/img/oval/blue_front.png',
              green: '/img/oval/green_front.png',
              magneta: '/img/oval/magneta_front.png',
              orange: '/img/oval/orange_front.png',
              pink: '/img/oval/pink_front.png',
              red: '/img/oval/red_front.png',
              violet: '/img/oval/violet_front.png',
              white: '/img/oval/white_front.png',
              yellow: '/img/oval/yellow_front.png',
              yellowOrange: '/img/oval/yellowOrange_front.png',
            },
            back: {
              black: '/img/oval/black_back.png',
              blue: '/img/oval/blue_back.png',
              green: '/img/oval/green_back.png',
              magneta: '/img/oval/magneta_back.png',
              orange: '/img/oval/orange_back.png',
              pink: '/img/oval/pink_back.png',
              red: '/img/oval/red_back.png',
              violet: '/img/oval/violet_back.png',
              white: '/img/oval/white_back.png',
              yellow: '/img/oval/yellow_back.png',
              yellowOrange: '/img/oval/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'oval',
        product_label_en: 'Oval Model',
        product_label_th: 'รุ่นวงรี',
        product_subtitle_en: "Size: (30mm x 48mm x 5mm)",
        product_subtitle_th: "ขนาด: (30 มม. x 48 มม. x 5 มม.)",
        product__description: "Leggings green juice DIY, flannel tattooed selvage plaid yr sartorial chia. Scenester you probably haven't heard of them locavore.",
        product__price: "$129",
        colors: [{
          label: 'black',
          name: 'black',
          _id: ''
        },
        {
          label: 'blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'green',
          name: 'green',
          _id: ''
        }, {
          label: 'magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'red',
          name: 'red',
          _id: ''
        }, {
          label: 'violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'white',
          name: 'white',
          _id: ''
        }, {
          label: 'yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'yellowOrange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/square/black_front.png',
              blue: '/img/square/blue_front.png',
              green: '/img/square/green_front.png',
              magneta: '/img/square/magneta_front.png',
              orange: '/img/square/orange_front.png',
              pink: '/img/square/pink_front.png',
              red: '/img/square/red_front.png',
              white: '/img/square/white_front.png',
              whiteC: '/img/square/whiteCrooked_front.png',
              yellow: '/img/square/yellow_front.png',
              yellowC: '/img/square/yellowCrooked_front.png',
              yellowOrange: '/img/square/yellowOrange_front.png',
            },
            back: {
              black: '/img/square/black_back.png',
              blue: '/img/square/blue_back.png',
              green: '/img/square/green_back.png',
              magneta: '/img/square/magneta_back.png',
              orange: '/img/square/orange_back.png',
              pink: '/img/square/pink_back.png',
              red: '/img/square/red_back.png',
              white: '/img/square/white_back.png',
              whiteC: '/img/square/whiteCrooked_back.png',
              yellow: '/img/square/yellow_back.png',
              yellowC: '/img/square/yellowCrooked_back.png',
              yellowOrange: '/img/square/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'square',
        product_label_en: 'Square Model',
        product_label_th: 'รุ่นเหลี่ยม',
        product_subtitle_en: "Size: (30mm x 48mm x 5mm)",
        product_subtitle_th: "ขนาด: (30 มม. x 48 มม. x 5 มม.)",
        product__description: "Helvetica la croix readymade, butcher viral pitchfork chillwave pork belly vaporware blue bottle iceland semiotics subway tile irony.",
        product__price: "$249",
        colors: [{
          label: 'black',
          name: 'black',
          _id: ''
        },
        {
          label: 'blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'green',
          name: 'green',
          _id: ''
        }, {
          label: 'magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'red',
          name: 'red',
          _id: ''
        }, {
          label: 'whiteC',
          name: 'whiteC',
          _id: ''
        }, {
          label: 'white',
          name: 'white',
          _id: ''
        }, {
          label: 'yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'yellowC',
          name: 'yellowC',
          _id: ''
        }, {
          label: 'yellowOrange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/squareWithHole/black_front.png',
              blackC: '/img/squareWithHole/blackC_front.png',
              blue: '/img/squareWithHole/blue_front.png',
              green: '/img/squareWithHole/green_front.png',
              magneta: '/img/squareWithHole/magneta_front.png',
              orange: '/img/squareWithHole/orange_front.png',
              pink: '/img/squareWithHole/pink_front.png',
              red: '/img/squareWithHole/red_front.png',
              white: '/img/squareWithHole/white_front.png',
              yellow: '/img/squareWithHole/yellow_front.png',
              yellowOrange: '/img/squareWithHole/yellowOrange_front.png',
            },
            back: {
              black: '/img/squareWithHole/black_back.png',
              blackC: '/img/squareWithHole/blackC_back.png',
              blue: '/img/squareWithHole/blue_back.png',
              green: '/img/squareWithHole/green_back.png',
              magneta: '/img/squareWithHole/magneta_back.png',
              orange: '/img/squareWithHole/orange_back.png',
              pink: '/img/squareWithHole/pink_back.png',
              red: '/img/squareWithHole/red_back.png',
              white: '/img/squareWithHole/white_back.png',
              yellow: '/img/squareWithHole/yellow_back.png',
              yellowOrange: '/img/squareWithHole/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'squareWithHole',
        product_label_en: 'Square Model with Hole',
        product_label_th: 'รุ่นเหลี่ยมมีรู',
        product_subtitle_en: "Size: (30mm x 48mm x 5mm)",
        product_subtitle_th: "ขนาด: (30 มม. x 48 มม. x 5 มม.)",
        product__description: "Celiac distillery man braid venmo, selfies you probably haven't heard of them tote bag forage fanny pack activated charcoal kale chips lo-fi before they sold out.",
        product__price: "$399",
        colors: [{
          label: 'black',
          name: 'black',
          _id: ''
        },
        {
          label: 'blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'green',
          name: 'green',
          _id: ''
        }, {
          label: 'magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'red',
          name: 'red',
          _id: ''
        }, {
          label: 'blackC',
          name: 'blackC',
          _id: ''
        }, {
          label: 'white',
          name: 'white',
          _id: ''
        }, {
          label: 'yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'yellowOrange',
          name: 'yellowOrange',
          _id: ''
        }]
      },
      {
        images: [
          {
            front: {
              black: '/img/triangle/black_front.png',
              blue: '/img/triangle/blue_front.png',
              green: '/img/triangle/green_front.png',
              magneta: '/img/triangle/magneta_front.png',
              orange: '/img/triangle/orange_front.png',
              pink: '/img/triangle/pink_front.png',
              red: '/img/triangle/red_front.png',
              violet: '/img/triangle/violet_front.png',
              white: '/img/triangle/white_front.png',
              yellow: '/img/triangle/yellow_front.png',
              yellowOrange: '/img/triangle/yellowOrange_front.png',
            },
            back: {
              black: '/img/triangle/black_back.png',
              blue: '/img/triangle/blue_back.png',
              green: '/img/triangle/green_back.png',
              magneta: '/img/triangle/magneta_back.png',
              orange: '/img/triangle/orange_back.png',
              pink: '/img/triangle/pink_back.png',
              red: '/img/triangle/red_back.png',
              violet: '/img/triangle/violet_back.png',
              white: '/img/triangle/white_back.png',
              yellow: '/img/triangle/yellow_back.png',
              yellowOrange: '/img/triangle/yellowOrange_back.png',
            }
          }
        ],
        product_name: 'triangle',
        product_label_en: 'Triangle Model',
        product_label_th: 'โมเดลสามเหลี่ยม',
        product_subtitle_en: "Size: (30mm x 48mm x 5mm)",
        product_subtitle_th: "ขนาด: (30 มม. x 48 มม. x 5 มม.)",
        product__description: "Mumblecore bespoke blog raw denim, authentic VHS sustainable +1 freegan neutra small batch paleo. Schlitz chicharrones pork belly palo santo.",
        product__price: "$199",
        colors: [{
          label: 'black',
          name: 'black',
          _id: ''
        },
        {
          label: 'blue',
          name: 'blue',
          _id: ''
        },
        {
          label: 'green',
          name: 'green',
          _id: ''
        }, {
          label: 'magneta',
          name: 'magneta',
          _id: ''
        }, {
          label: 'orange',
          name: 'orange',
          _id: ''
        }, {
          label: 'pink',
          name: 'pink',
          _id: ''
        }, {
          label: 'red',
          name: 'red',
          _id: ''
        }, {
          label: 'violet',
          name: 'violet',
          _id: ''
        }, {
          label: 'white',
          name: 'white',
          _id: ''
        }, {
          label: 'yellow',
          name: 'yellow',
          _id: ''
        }, {
          label: 'yellowOrange',
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
          .map((_, i) => {

            return {
              [i]: productItems[i]['colors'][i]['name']
            }
          })
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
        <button className={classes.dummyMenu}>
          <svg className="icon icon--menu">
            <use xlinkHref="#icon-menu"></use></svg></button>
        <div className={classes.content}>
          <div className={`${classes.grid} animate__animated animate__fadeInUp`} >
            {
              productItems.map((product, i) => {
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
                                alt='img' />
                              <img className={
                                cx(turn[i] ? classes.product__img : classes.product__img_turn)
                              }
                                src={frontImageSrc}
                                alt='img' />
                            </Fragment>
                          )
                        })
                      }
                      <div className={classes.badgeColors} >
                        {
                          product.colors.map((c, index) => {
                            return (
                              <Tooltip key={index} title={t(`${c.label}`)} placement="top" arrow sx={{
                                border: `solid 0.5px ${c.name}`,
                              }}>
                                <span
                                  className={cx(classes.badge,
                                    typeof selectedColor[i] !== 'undefined' &&
                                    selectedColor[i][i] == c.name &&
                                    classes.activeBadge, classes[`badge_${c.name}` as keyof typeof classes])} onClick={() => {
                                      setSelectedColor((prevState) => {
                                        return { ...prevState, [i]: { [i]: c.name } }
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
                          {`(${selectedColor[i] !== undefined ? `${t(`${selectedColor[i][i]}`)}` : ''})`}
                        </>
                      </h2>
                      <h3 className={classes.product__subtitle} >
                        {/* @ts-ignore */}
                        {product[`product_subtitle_${lang}` as keyof typeof productItems]}
                      </h3>
                      <p className={classes.product__description} >{product.product__description}</p>
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
          <Link locale={lang} className={classes.mediaItem} href="/gallery">
            <img className={classes.mediaItem_img} src="/img/all_dark.jpg" />

            <h3 className={classes.mediaItem_title}>{t('diamondCollection')}</h3>
          </Link>
          <Link locale={lang} className={classes.mediaItem} href="/gallery">
            <img className={classes.mediaItem_img} src="/img/all2.jpeg" />
            <h3 className={classes.mediaItem_title}>{t('triangleCollection')}</h3>
          </Link>
          <Link locale={lang} className={classes.mediaItem} href="/gallery">
            <img className={classes.mediaItem_img} src="/img/half1.png" />
            <h3 className={classes.mediaItem_title}>{t('squareCollection')}</h3>
          </Link>

        </section>
      </main>
      <Script src="/js/imagesloaded.pkgd.min.js" />
      <Script src="/js/anime.min.js" />
      {/* <Script src="/js/main.js" /> */}
    </Fragment>
  )
});

export default CollectionComponent