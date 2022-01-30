/**
 * @type {import('postcss').PluginCreator}
 */

const defaultOptions = {
  unitFrom: 'px',
  unitTo: 'rem',
};

module.exports = (opts = {}) => {
  function getPxValues(cssRule: string): string[] | null {
    const pxRegEx = /\d*px/;

    return cssRule.match(pxRegEx);
  }

  function transformToRem(values: string[]): string[] {
    return values?.map((it) => {
      const itemLength = it.length;
      const numberToConvert = it.substring(0, itemLength - 2);
      const numberAsInt = Number(numberToConvert);
      const valueConvertedToRem = (numberAsInt / 16).toPrecision(4);

      if (valueConvertedToRem.indexOf('.000') === -1) {
        return valueConvertedToRem;
      }

      return valueConvertedToRem.split('.')[0] + 'rem';
    });
  }

  return {
    postcssPlugin: 'postcss-px-to-custom-unit',

    Root(root: any, postcss: any) {

    },

    /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  };
};

module.exports.postcss = true;
