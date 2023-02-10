import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res
      .status(405)
      .json({ success: false, Error: `Method '${req.method}' Not Allowed` });
  },
});
const productItems = [
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
        },
      },
    ],
    product_name: 'diamond',
    product_label_en: 'Diamond Model',
    product_label_th: 'เพชร',
    product_subtitle_en: 'Size: (30mm x 48mm x 5mm)',
    product_subtitle_th: 'ขนาด: (30 มม. x 48 มม. x 5 มม.)',
    product__description_en:
      "Diamond shaped Thailand Teak wood. Hand-colored and hand wrapped with rope and it's UV light reactive.",
    product__description_th:
      'ไม้สักไทยทรงเพชร ทำสีด้วยมือและพันมือด้วยเชือกและทำปฏิกิริยากับแสงยูวี',
    _id: 'abcd0',
    product__price: '$8',
    colors: [
      {
        label: 'black',
        name: 'black',
        _id: '',
      },
      {
        label: 'blue',
        name: 'blue',
        _id: '',
      },
      {
        label: 'green',
        name: 'green',
        _id: '',
      },
      {
        label: 'magneta',
        name: 'magneta',
        _id: '',
      },
      {
        label: 'orange',
        name: 'orange',
        _id: '',
      },
      {
        label: 'pink',
        name: 'pink',
        _id: '',
      },
      {
        label: 'red',
        name: 'red',
        _id: '',
      },
      {
        label: 'violet',
        name: 'violet',
        _id: '',
      },
      {
        label: 'white',
        name: 'white',
        _id: '',
      },
      {
        label: 'yellow',
        name: 'yellow',
        _id: '',
      },
      {
        label: 'yellowOrange',
        name: 'yellowOrange',
        _id: '',
      },
    ],
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
        },
      },
    ],
    product_name: 'bell',
    product_label_en: 'Bell Model',
    product_label_th: 'เบลล์โมเดล',
    product_subtitle_en: 'Size: (30mm x 48mm x 5mm)',
    product_subtitle_th: 'ขนาด: (30 มม. x 48 มม. x 5 มม.)',
    product__description_en:
      "Bell shaped Thailand Teak wood. Hand-colored and hand wrapped with rope and it's UV light reactive.",
    product__description_th:
      'ทรงระฆังไม้สักไทย. ทำสีด้วยมือและพันมือด้วยเชือกและทำปฏิกิริยากับแสงยูวี',
    _id: 'abcd1',
    product__price: '$10',
    colors: [
      {
        label: 'black',
        name: 'black',
        _id: '',
      },
      {
        label: 'blue',
        name: 'blue',
        _id: '',
      },
      {
        label: 'green',
        name: 'green',
        _id: '',
      },
      {
        label: 'magneta',
        name: 'magneta',
        _id: '',
      },
      {
        label: 'orange',
        name: 'orange',
        _id: '',
      },
      {
        label: 'pink',
        name: 'pink',
        _id: '',
      },
      {
        label: 'red',
        name: 'red',
        _id: '',
      },
      {
        label: 'violet',
        name: 'violet',
        _id: '',
      },
      {
        label: 'white',
        name: 'white',
        _id: '',
      },
      {
        label: 'yellow',
        name: 'yellow',
        _id: '',
      },
      {
        label: 'yellowOrange',
        name: 'yellowOrange',
        _id: '',
      },
    ],
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
        },
      },
    ],
    product_name: 'socks',
    product_label_en: 'Socks Model',
    product_label_th: 'โมเดลถุงเท้า',
    product_subtitle_en: 'Size: (30mm x 48mm x 5mm)',
    product_subtitle_th: 'ขนาด: (30 มม. x 48 มม. x 5 มม.)',
    product__description_en:
      "Socks shaped Thailand Teak wood. Hand-colored and hand wrapped with rope and it's UV light reactive.",
    product__description_th:
      'ถุงเท้าไม้สักไทย ทำสีด้วยมือและพันมือด้วยเชือกและทำปฏิกิริยากับแสงยูวี',
    _id: 'abcd2',
    product__price: '$10',
    colors: [
      {
        label: 'black',
        name: 'black',
        _id: '',
      },
      {
        label: 'blue',
        name: 'blue',
        _id: '',
      },
      {
        label: 'green',
        name: 'green',
        _id: '',
      },
      {
        label: 'magneta',
        name: 'magneta',
        _id: '',
      },
      {
        label: 'orange',
        name: 'orange',
        _id: '',
      },
      {
        label: 'pink',
        name: 'pink',
        _id: '',
      },
      {
        label: 'red',
        name: 'red',
        _id: '',
      },
      {
        label: 'violet',
        name: 'violet',
        _id: '',
      },
      {
        label: 'white',
        name: 'white',
        _id: '',
      },
      {
        label: 'yellow',
        name: 'yellow',
        _id: '',
      },
      {
        label: 'yellowOrange',
        name: 'yellowOrange',
        _id: '',
      },
    ],
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
        },
      },
    ],
    product_name: 'crookedTriangle',
    product_label_en: 'Crooked Triangle Model',
    product_label_th: 'โมเดลสามเหลี่ยมคดเคี้ยว',
    product_subtitle_en: 'Size: (30mm x 48mm x 5mm)',
    product_subtitle_th: 'ขนาด: (30 มม. x 48 มม. x 5 มม.)',
    product__description_en:
      "Crooked Triangle shaped Thailand Teak wood. Hand-colored and hand wrapped with rope and it's UV light reactive.",
    product__description_th:
      'ไม้สักไทยทรงสามเหลี่ยมคด ทำสีด้วยมือและพันมือด้วยเชือกและทำปฏิกิริยากับแสงยูวี',
    _id: 'abcd3',
    product__price: '$10',
    colors: [
      {
        label: 'black',
        name: 'black',
        _id: '',
      },
      {
        label: 'blue',
        name: 'blue',
        _id: '',
      },
      {
        label: 'green',
        name: 'green',
        _id: '',
      },
      {
        label: 'magneta',
        name: 'magneta',
        _id: '',
      },
      {
        label: 'orange',
        name: 'orange',
        _id: '',
      },
      {
        label: 'pink',
        name: 'pink',
        _id: '',
      },
      {
        label: 'red',
        name: 'red',
        _id: '',
      },
      {
        label: 'violet',
        name: 'violet',
        _id: '',
      },
      {
        label: 'white',
        name: 'white',
        _id: '',
      },
      {
        label: 'yellow',
        name: 'yellow',
        _id: '',
      },
      {
        label: 'yellowOrange',
        name: 'yellowOrange',
        _id: '',
      },
    ],
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
        },
      },
    ],
    product_name: 'longTriangle',
    product_label_en: 'Long Triangle Model',
    product_label_th: 'โมเดลสามเหลี่ยมยาว',
    product_subtitle_en: 'Size: (30mm x 48mm x 5mm)',
    product_subtitle_th: 'ขนาด: (30 มม. x 48 มม. x 5 มม.)',
    product__description_en:
      "Long Triangle Triangle shaped Thailand Teak wood. Hand-colored and hand wrapped with rope and it's UV light reactive.",
    product__description_th:
      'สามเหลี่ยมยาว รูปสามเหลี่ยม ไม้สักไทย ทำสีด้วยมือและพันมือด้วยเชือกและทำปฏิกิริยากับแสงยูวี',
    _id: 'abcd4',
    product__price: '$10',
    colors: [
      {
        label: 'black',
        name: 'black',
        _id: '',
      },
      {
        label: 'blue',
        name: 'blue',
        _id: '',
      },
      {
        label: 'green',
        name: 'green',
        _id: '',
      },
      {
        label: 'magneta',
        name: 'magneta',
        _id: '',
      },
      {
        label: 'orange',
        name: 'orange',
        _id: '',
      },
      {
        label: 'pink',
        name: 'pink',
        _id: '',
      },
      {
        label: 'red',
        name: 'red',
        _id: '',
      },
      {
        label: 'violet',
        name: 'violet',
        _id: '',
      },
      {
        label: 'white',
        name: 'white',
        _id: '',
      },
      {
        label: 'yellow',
        name: 'yellow',
        _id: '',
      },
      {
        label: 'yellowOrange',
        name: 'yellowOrange',
        _id: '',
      },
    ],
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
        },
      },
    ],
    product_name: 'octagon',
    product_label_en: 'Octagon Model',
    product_label_th: 'รุ่นแปดเหลี่ยม',
    product_subtitle_en: 'Size: (30mm x 48mm x 5mm)',
    product_subtitle_th: 'ขนาด: (30 มม. x 48 มม. x 5 มม.)',
    product__description_en:
      "Octagon Triangle shaped Thailand Teak wood. Hand-colored and hand wrapped with rope and it's UV light reactive.",
    product__description_th:
      'แปดเหลี่ยม ทรงสามเหลี่ยม ไม้สักไทย ทำสีด้วยมือและพันมือด้วยเชือกและทำปฏิกิริยากับแสงยูวี',
    _id: 'abcd5',
    product__price: '$8',
    colors: [
      {
        label: 'black',
        name: 'black',
        _id: '',
      },
      {
        label: 'blue',
        name: 'blue',
        _id: '',
      },
      {
        label: 'green',
        name: 'green',
        _id: '',
      },
      {
        label: 'magneta',
        name: 'magneta',
        _id: '',
      },
      {
        label: 'orange',
        name: 'orange',
        _id: '',
      },
      {
        label: 'pink',
        name: 'pink',
        _id: '',
      },
      {
        label: 'red',
        name: 'red',
        _id: '',
      },
      {
        label: 'violet',
        name: 'violetB',
        _id: '',
      },
      {
        label: 'violet',
        name: 'violetC',
        _id: '',
      },
      {
        label: 'violet',
        name: 'violetW',
        _id: '',
      },
      {
        label: 'yellow',
        name: 'yellow',
        _id: '',
      },
      {
        label: 'yellowOrange',
        name: 'yellowOrange',
        _id: '',
      },
    ],
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
        },
      },
    ],
    product_name: 'oval',
    product_label_en: 'Oval Model',
    product_label_th: 'รุ่นวงรี',
    product_subtitle_en: 'Size: (30mm x 48mm x 5mm)',
    product_subtitle_th: 'ขนาด: (30 มม. x 48 มม. x 5 มม.)',
    product__description_en:
      "Oval shaped Thailand Teak wood. Hand-colored and hand wrapped with rope and it's UV light reactive.",
    product__description_th:
      'ไม้สักไทยทรงวงรี ทำสีด้วยมือและพันมือด้วยเชือกและทำปฏิกิริยากับแสงยูวี',
    _id: 'abcd6',
    product__price: '$10',
    colors: [
      {
        label: 'black',
        name: 'black',
        _id: '',
      },
      {
        label: 'blue',
        name: 'blue',
        _id: '',
      },
      {
        label: 'green',
        name: 'green',
        _id: '',
      },
      {
        label: 'magneta',
        name: 'magneta',
        _id: '',
      },
      {
        label: 'orange',
        name: 'orange',
        _id: '',
      },
      {
        label: 'pink',
        name: 'pink',
        _id: '',
      },
      {
        label: 'red',
        name: 'red',
        _id: '',
      },
      {
        label: 'violet',
        name: 'violet',
        _id: '',
      },
      {
        label: 'white',
        name: 'white',
        _id: '',
      },
      {
        label: 'yellow',
        name: 'yellow',
        _id: '',
      },
      {
        label: 'yellowOrange',
        name: 'yellowOrange',
        _id: '',
      },
    ],
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
        },
      },
    ],
    product_name: 'square',
    product_label_en: 'Square Model',
    product_label_th: 'รุ่นเหลี่ยม',
    product_subtitle_en: 'Size: (30mm x 48mm x 5mm)',
    product_subtitle_th: 'ขนาด: (30 มม. x 48 มม. x 5 มม.)',
    product__description_en:
      "Square shaped Thailand Teak wood. Hand-colored and hand wrapped with rope and it's UV light reactive.",
    product__description_th:
      'ไม้สักไทยทรงเหลี่ยม ทำสีด้วยมือและพันมือด้วยเชือกและทำปฏิกิริยากับแสงยูวี',
    _id: 'abcd7',
    product__price: '$10',
    colors: [
      {
        label: 'black',
        name: 'black',
        _id: '',
      },
      {
        label: 'blue',
        name: 'blue',
        _id: '',
      },
      {
        label: 'green',
        name: 'green',
        _id: '',
      },
      {
        label: 'magneta',
        name: 'magneta',
        _id: '',
      },
      {
        label: 'orange',
        name: 'orange',
        _id: '',
      },
      {
        label: 'pink',
        name: 'pink',
        _id: '',
      },
      {
        label: 'red',
        name: 'red',
        _id: '',
      },
      {
        label: 'whiteC',
        name: 'whiteC',
        _id: '',
      },
      {
        label: 'white',
        name: 'white',
        _id: '',
      },
      {
        label: 'yellow',
        name: 'yellow',
        _id: '',
      },
      {
        label: 'yellowC',
        name: 'yellowC',
        _id: '',
      },
      {
        label: 'yellowOrange',
        name: 'yellowOrange',
        _id: '',
      },
    ],
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
        },
      },
    ],
    product_name: 'squareWithHole',
    product_label_en: 'Square Model with Hole',
    product_label_th: 'รุ่นเหลี่ยมมีรู',
    product_subtitle_en: 'Size: (30mm x 48mm x 5mm)',
    product_subtitle_th: 'ขนาด: (30 มม. x 48 มม. x 5 มม.)',
    product__description_en:
      "Square with Hole shaped Thailand Teak wood. Hand-colored and hand wrapped with rope and it's UV light reactive.",
    product__description_th:
      'เหลี่ยมเจาะไม้สักไทย. ทำสีด้วยมือและพันมือด้วยเชือกและทำปฏิกิริยากับแสงยูวี.',
    _id: 'abcd8',
    product__price: '$10',
    colors: [
      {
        label: 'black',
        name: 'black',
        _id: '',
      },
      {
        label: 'blue',
        name: 'blue',
        _id: '',
      },
      {
        label: 'green',
        name: 'green',
        _id: '',
      },
      {
        label: 'magneta',
        name: 'magneta',
        _id: '',
      },
      {
        label: 'orange',
        name: 'orange',
        _id: '',
      },
      {
        label: 'pink',
        name: 'pink',
        _id: '',
      },
      {
        label: 'red',
        name: 'red',
        _id: '',
      },
      {
        label: 'blackC',
        name: 'blackC',
        _id: '',
      },
      {
        label: 'white',
        name: 'white',
        _id: '',
      },
      {
        label: 'yellow',
        name: 'yellow',
        _id: '',
      },
      {
        label: 'yellowOrange',
        name: 'yellowOrange',
        _id: '',
      },
    ],
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
        },
      },
    ],
    product_name: 'triangle',
    product_label_en: 'Triangle Model',
    product_label_th: 'โมเดลสามเหลี่ยม',
    product_subtitle_en: 'Size: (30mm x 48mm x 5mm)',
    product_subtitle_th: 'ขนาด: (30 มม. x 48 มม. x 5 มม.)',
    product__description_en:
      "Triangle shaped Thailand Teak wood. Hand-colored and hand wrapped with rope and it's UV light reactive.",
    product__description_th:
      'ไม้สักไทยทรงสามเหลี่ยม ทำสีด้วยมือและพันมือด้วยเชือกและทำปฏิกิริยากับแสงยูวี',
    _id: 'abcd9',
    product__price: '$10',
    colors: [
      {
        label: 'black',
        name: 'black',
        _id: '',
      },
      {
        label: 'blue',
        name: 'blue',
        _id: '',
      },
      {
        label: 'green',
        name: 'green',
        _id: '',
      },
      {
        label: 'magneta',
        name: 'magneta',
        _id: '',
      },
      {
        label: 'orange',
        name: 'orange',
        _id: '',
      },
      {
        label: 'pink',
        name: 'pink',
        _id: '',
      },
      {
        label: 'red',
        name: 'red',
        _id: '',
      },
      {
        label: 'violet',
        name: 'violet',
        _id: '',
      },
      {
        label: 'white',
        name: 'white',
        _id: '',
      },
      {
        label: 'yellow',
        name: 'yellow',
        _id: '',
      },
      {
        label: 'yellowOrange',
        name: 'yellowOrange',
        _id: '',
      },
    ],
  },
];

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ success: true, productItems: productItems });
});

export default apiRoute;
