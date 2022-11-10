let scssVariables = require('./tailwind.variables.config.js');
module.exports = {
  separator: '|',
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: scssVariables._primary,
        secondary: scssVariables.secondary,
        tertiary: scssVariables._tertiary,
        dark: scssVariables._dark,
        black: scssVariables._black,
        light: scssVariables._light,
        lighter: scssVariables._lighter,
        link: scssVariables._link,
        white: scssVariables._white,
      },
      borderColor: theme => ({
        ...theme('colors'),
        DEFAULT: '#D8D8D8',
        base: '#D8D8D8',
      }),
      backgroundColor: theme => ({
        ...theme('colors'),
      }),
      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        1: '1px',
        2: '2px',
        3: '3px',
        5: '5px',
        4: '4px',
        6: '6px',
        7: '7px',
        8: '8px',
      },
      borderStyle: ['hover'],
      borderRadius: {
        DEFAULT: '3px',
        0: '0',
        1: '1px',
        2: '2px',
        3: '3px',
        4: '4px',
        5: '5px',
        6: '6px',
        full: '9999px',
      },

      container: {
        center: true,
      },
      boxShadow: {
        DEFAULT: '0px 0px 47px 0px rgba(13, 37, 62, 0.1)',
      },
      zIndex: {
        '-1': '-1',
        '1': 1,
        '99': 99,
        '100': 100,
        'full': 9999,
      },
      width: (function () {
        const spacing = {}
        for (let i = 5; i <= 250; i = i + 5) {
          spacing[i] = i + 'px'
          spacing[-i] = -i + 'px'
        }
        return spacing
      })(),
      height: (function () {
        const spacing = {}
        for (let i = 5; i <= scssVariables._height; i = i + 5) {
          spacing[i] = i + 'px'
          spacing[-i] = -i + 'px'
        }
        return spacing
      })(),
      margin: (() => {
        const margin = {};
        const grids = 12;

        for (let i = 1; i <= grids; i++) {
          let property = i + '/' + grids;
          let value = 'calc(' + i + '/' + grids + ' * 100%)';
          let propertyMinus = '-' + i + '/' + grids;
          let valueMinus = 'calc(-' + i + '/' + grids + ' * 100%)';
          margin[property] = value;
          margin[propertyMinus] = valueMinus;
        }

        return margin;
      })(),

      padding: (() => {
        const padding = {};
        const grids = 12;
        for (let i = 1; i <= grids; i++) {
          let property = i + '/' + grids;
          let value = 'calc(' + i + '/' + grids + ' * 100%)';
          let propertyMinus = '-' + i + '/' + grids;
          let valueMinus = 'calc(-' + i + '/' + grids + ' * 100%)';
          padding[property] = value;
          padding[propertyMinus] = valueMinus;
        }
        return padding;
      })(),
      fontFamily: {
        'openSans': ['Open Sans', 'sans-serif'],
      },
      fontSize: (() => {
        const value = {
          '3xl': '1.75rem',
          h1: '3.75rem',
          h2: '2.25rem',
          h3: '2rem',
          h4: '1.5rem',
          h5: '1.125rem',
          h6: '1rem',
          h7: '0.875rem',
        }

        for (let i = 12; i <= 72; i++) {
          value[i] = i + 'px';
        }

        return value;
      })(),
      transitionProperty: {
        'inset': 'left, right, top, bottom',
      },
      maxWidth: {
        'full-screen': '100vw',
      },
      maxHeight: {
        'full-screen': '100vw',
      },
    },
    //响应式
    screens: {
      md: scssVariables._screen_md,
      // => @media (min-width: 992px) { ... }

      lg: scssVariables._screen_lg,
      // => @media (min-width: 1200px) { ... }

      xl: scssVariables._screen_xl,
      // => @media (min-width: 1470px) { ... }
    },
    spacing: (function () {
      const spacing = {}
      for (let i = 0; i <= scssVariables._spacing; i++) {
        spacing[i] = i + 'px'
        spacing[-i] = -i + 'px'
      }
      return spacing
    })(),
  },

  //禁用部分tailwindcss 
  corePlugins: {
   translate: false,
   accessibility: false,
   fill: false,
   stroke: false,
   strokeWidth: false,
   appearance:false,
   animation: false,
   transitionDelay: false,
   transitionTimingFunction: false,
   transitionProperty: false,
   tableLayout: false,
   borderCollapse: false,
   mixBlendMode:false,
   backgroundBlendMode:false,
   filter:false,
   blur:false,
   brightness:false,
   contrast:false,
   dropShadow:false,
   grayscale:false,
   hueRotate:false,
   invert:false,
   saturate:false,
   sepia:false,
   backdropFilter:false,
   backdropBlur:false,
   backdropBrightness:false,
   backdropContrast:false,
   backdropGrayscale:false,
   backdropHueRotate:false,
   backdropInvert:false,
   backdropOpacity:false,
   backdropSaturate:false,
   backdropSepia:false,
   ringWidth:false,
   ringColor:false,
   ringOpacity:false,
   ringOffsetWidth:false,
   ringOffsetColor:false,
   fontVariantNumeric: false,
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
