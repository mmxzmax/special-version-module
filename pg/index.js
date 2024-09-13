import style from './../src/assets/styles/main.scss';
import SpecialVersion from './../src/index';


const version = new SpecialVersion('.js-ver',[
  {
    serviceName:'FontSizeService',
    position: 1,
    groupName: 'Font',
    params: {
      cacheName: 'fontsize',
      params:[
        {
          buttonTittle: 'A',
          buttonAltText: 'standart',
          buttonClass: 'special-version__button_square,size-small',
          value: 1,
          styleSheet: '1.css'
        },
        {
          buttonTittle: 'A',
          buttonAltText: 'medium',
          buttonClass: 'special-version__button_square,size-middle',
          value: 1.5,
          styleSheet: '2.css'
        },
        {
          buttonTittle: 'A',
          buttonAltText: 'big',
          buttonClass: 'special-version__button_square,size-big',
          value: 2,
          styleSheet: '3.css'
        }

      ]
    }
  },
  {
    serviceName:'FontFamilyService',
    position: 1,
    groupName: '',
    params: {
      cacheName: 'fontFamily',
      params:[

        {
          buttonTittle: 'Arial',
          buttonAltText: 'Arial',
          buttonClass: '',
          value: 'Arial',
          styleSheet: ''
        },
        {
          buttonTittle: 'Times New Roman',
          buttonAltText: 'Times New Roman',
          buttonClass: '',
          value: 'Times New Roman',
          styleSheet: ''
        }

      ],
      fontList: [
        '',''
      ]
    }
  },
  {
    serviceName:'ColorSchemeService',
    position: 1,
    groupName: 'Color Theme',
    params: {
      cacheName: 'colorScheme',
      params:[

        {
          buttonTittle: 'C',
          buttonAltText: 'color scheme black and white',
          buttonClass: 'special-version__button_square,theme-bw',
          value: 'bw',
          styleSheet: ''
        },
        {
          buttonTittle: 'C',
          buttonAltText: 'color scheme white and black',
          buttonClass: 'special-version__button_square,theme-wb',
          value: 'wb',
          styleSheet: ''
        },
        {
          buttonTittle: 'C',
          buttonAltText: 'color scheme cyan and blue',
          buttonClass: 'special-version__button_square,theme-bb',
          value: 'bb',
          styleSheet: ''
        },
        {
          buttonTittle: 'C',
          buttonAltText: 'color scheme brown and light',
          buttonClass: 'special-version__button_square,theme-bwl',
          value: 'bwl',
          styleSheet: ''
        },
        {
          buttonTittle: 'C',
          buttonAltText: 'color scheme brown and green',
          buttonClass: 'special-version__button_square,theme-bg',
          value: 'bg',
          styleSheet: ''
        }

      ],
      scheme: {
        bw: ['#ffffff','#000000'],
        wb: ['#000000','#ffffff'],
        bb: ['#9dd1ff','#195183'],
        bwl: ['#f7f3d6','#4d4b43'],
        bg: ['#3b2716','#a9e44d']
      }
    }
  },
  {
    serviceName:'FontIntervalService',
    position: 2,
    groupName: 'Interval',
    params: {
      cacheName: 'fontInterval',
      params:[
        {
          buttonTittle: 'standart',
          buttonAltText: 'font Interval standart',
          buttonClass: '',
          value: 1,
          styleSheet: ''
        },
        {
          buttonTittle: 'medium',
          buttonAltText: 'font Interval medium',
          buttonClass: '',
          value: 1.5,
          styleSheet: ''
        },
        {
          buttonTittle: 'big',
          buttonAltText: 'font Interval big',
          buttonClass: '',
          value: 2,
          styleSheet: ''
        }

      ]
    }
  },
  {
    serviceName:'FontKerningService',
    position: 2,
    groupName: 'Kerning',
    params: {
      cacheName: 'fontKerning',
      params:[
        {
          buttonTittle: 'standart',
          buttonAltText: 'font Kerning standart',
          buttonClass: '',
          value: '',
          styleSheet: ''
        },
        {
          buttonTittle: 'medium',
          buttonAltText: 'font Kerning medium',
          buttonClass: '',
          value: 1.5,
          styleSheet: ''
        },
        {
          buttonTittle: 'big',
          buttonAltText: 'font Kerning big',
          buttonClass: '',
          value: 2,
          styleSheet: ''
        }

      ]
    }
  },
  {
    serviceName:'ImagesService',
    position: 2,
    groupName: 'Images',
    params: {
      cacheName: 'svImages',
      params:[
        {
          buttonTittle: 'show',
          buttonAltText: 'Images show',
          buttonClass: '',
          value: '',
          styleSheet: ''
        },
        {
          buttonTittle: 'hide',
          buttonAltText: 'Images hide',
          buttonClass: '',
          value: 2,
          styleSheet: ''
        },
        {
          buttonTittle: 'black and white',
          buttonAltText: 'Images black and white',
          buttonClass: '',
          value: 3,
          styleSheet: ''
        }

      ]
    }
  },
  {
    serviceName:'PluginSpeechSystem',
    position: 3,
    groupName: 'reading',
    params: {
      cacheName: 'speech',
      lngCode:'en',
      api:'http://api.voicerss.org/?key=77ea9a29e07645799e34ee3b99e04456&hl={{lang}}&c=MP3&src={{text}}',
      lngCodes:[
        "ca-es",
        "zh-cn",
        "zh-hk",
        "zh-tw",
        "da-dk",
        "nl-nl",
        "en-au",
        "en-ca",
        "en-gb",
        "en-in",
        "en-us",
        "fi-fi",
        "fr-ca",
        "fr-fr",
        "de-de",
        "it-it",
        "ja-jp",
        "ko-kr",
        "nb-no",
        "pl-pl",
        "pt-br",
        "pt-pt",
        "ru-ru",
        "es-mx",
        "es-es",
        "sv-se",
      ],
      params:[
        {
          buttonTittle: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 54 46" width="54" height="46"><path d=" M 46.414 22 L 53.707 14.707 C 54.098 14.316 54.098 13.684 53.707 13.293 C 53.316 12.902 52.684 12.902 52.293 13.293 L 45 20.586 L 37.707 13.293 C 37.316 12.902 36.684 12.902 36.293 13.293 C 35.902 13.684 35.902 14.316 36.293 14.707 L 43.586 22 L 36.293 29.293 C 35.902 29.684 35.902 30.316 36.293 30.707 C 36.488 30.902 36.744 31 37 31 C 37.256 31 37.512 30.902 37.707 30.707 L 45 23.414 L 52.293 30.707 C 52.488 30.902 52.744 31 53 31 C 53.256 31 53.512 30.902 53.707 30.707 C 54.098 30.316 54.098 29.684 53.707 29.293 L 46.414 22 L 46.414 22 Z  M 13 31 C 13 31.553 12.553 32 12 32 C 11.447 32 11 31.553 11 31 L 11 27 C 11 26.447 11.447 26 12 26 C 12.553 26 13 26.447 13 27 L 13 31 L 13 31 L 13 31 Z  M 13 18 C 13 18.553 12.553 19 12 19 C 11.447 19 11 18.553 11 18 L 11 14 C 11 13.447 11.447 13 12 13 C 12.553 13 13 13.447 13 14 L 13 18 L 13 18 L 13 18 Z  M 26.894 0 C 26.343 0 25.797 0.153 25.315 0.444 C 25.269 0.471 25.225 0.503 25.185 0.537 L 11.634 12 L 1 12 C 0.447 12 0 12.447 0 13 L 0 32 C 0 32.553 0.447 33 1 33 L 11.61 33 L 25.153 45.436 C 25.203 45.482 25.257 45.522 25.314 45.556 C 25.797 45.847 26.343 46 26.894 46 C 28.606 46 30 44.584 30 42.844 L 30 3.156 C 30 1.416 28.606 0 26.894 0 L 26.894 0 Z " fill-rule="evenodd" fill="rgb(0,0,0)"/></svg>',
          buttonAltText: 'reading off',
          buttonClass: 'special-version__button_square',
          value: 'off',
          styleSheet: ''
        },
        {
          buttonTittle: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 60 47.41" width="60" height="47.41"><path d=" M 13 32.063 C 13 32.616 12.553 33.063 12 33.063 C 11.447 33.063 11 32.616 11 32.063 L 11 28.063 C 11 27.51 11.447 27.063 12 27.063 C 12.553 27.063 13 27.51 13 28.063 L 13 32.063 L 13 32.063 L 13 32.063 L 13 32.063 L 13 32.063 Z  M 13 19.063 C 13 19.616 12.553 20.063 12 20.063 C 11.447 20.063 11 19.616 11 19.063 L 11 15.063 C 11 14.51 11.447 14.063 12 14.063 C 12.553 14.063 13 14.51 13 15.063 L 13 19.063 L 13 19.063 L 13 19.063 L 13 19.063 L 13 19.063 Z  M 52.026 23.563 C 52.026 15.216 46.71 7.803 38.797 5.116 C 38.275 4.939 37.706 5.219 37.528 5.742 C 37.351 6.264 37.631 6.833 38.154 7.011 C 45.255 9.422 50.026 16.074 50.026 23.564 C 50.026 31.047 45.264 37.7 38.177 40.118 C 37.655 40.296 37.375 40.864 37.554 41.388 C 37.696 41.803 38.084 42.065 38.5 42.065 C 38.607 42.065 38.716 42.048 38.823 42.011 C 46.721 39.316 52.026 31.903 52.026 23.563 L 52.026 23.563 L 52.026 23.563 Z  M 44.453 0.079 C 43.945 -0.134 43.358 0.1 43.141 0.609 C 42.926 1.118 43.163 1.705 43.672 1.921 C 52.376 5.614 58 14.11 58 23.563 C 58 33.34 52.106 41.943 42.985 45.477 C 42.47 45.677 42.214 46.256 42.414 46.771 C 42.567 47.167 42.946 47.41 43.347 47.41 C 43.467 47.41 43.589 47.389 43.708 47.343 C 53.605 43.506 60 34.172 60 23.563 C 60 13.305 53.897 4.087 44.453 0.079 L 44.453 0.079 Z  M 26.894 1.063 C 26.343 1.063 25.797 1.216 25.315 1.507 C 25.269 1.534 25.225 1.566 25.185 1.6 L 11.634 13.063 L 1 13.063 C 0.447 13.063 0 13.51 0 14.063 L 0 33.063 C 0 33.329 0.105 33.583 0.293 33.77 C 0.481 33.957 0.734 34.063 1 34.063 L 11.61 34.058 L 25.153 46.498 C 25.203 46.544 25.257 46.584 25.314 46.618 C 25.796 46.909 26.342 47.062 26.893 47.062 C 28.606 47.062 29.999 45.646 29.999 43.906 L 29.999 4.219 C 30 2.479 28.606 1.063 26.894 1.063 L 26.894 1.063 L 26.894 1.063 L 26.894 1.063 Z  M 43.026 23.563 C 43.026 17.591 39.017 12.261 33.277 10.601 C 32.747 10.45 32.193 10.753 32.039 11.285 C 31.886 11.815 32.191 12.37 32.723 12.523 C 37.612 13.936 41.027 18.476 41.027 23.563 C 41.027 28.65 37.612 33.19 32.723 34.603 C 32.192 34.756 31.886 35.311 32.039 35.841 C 32.166 36.279 32.565 36.564 33 36.564 C 33.092 36.564 33.185 36.551 33.277 36.525 C 39.018 34.864 43.026 29.534 43.026 23.563 Z " fill-rule="evenodd" fill="rgb(0,0,0)"/></svg>',
          buttonAltText: 'reading on',
          buttonClass: 'special-version__button_square',
          value: 'on',
          styleSheet: ''
        }
      ]
    }
  }
]);
