{
  const {Element} = Polymer;
  const {UtilsMixin} = ColorYourCode;

  /**
   * Formats the theme editor file according to the data expected by the UIs.
   * @polymer
   * @customElement
   * @memberof ColorYourCode
   * @extends {ColorYourCode.UtilsMixin}
   */
  class CycDm extends UtilsMixin(Element) {
    static get is() {
      return 'cyc-dm';
    }

    static get properties() {
      return {
        /**
         * URL of the theme file (json).
         */
        url: {
          type: String,
        },

        _responseData: {
          type: Object,
          observer: '_responseDataChanged',
        },
      };
    }

    _responseDataChanged(data) {
      const {type, name, colors} = data;
      const filteredColors = this._getFilteredColors(colors);

      /**
       * Fired after receiving data from the specified `url`.
       * @event response-success
       * @param {Object} detail Theme data.
       * @param {String} type Theme type (dark | light).
       * @param {String} name Theme name.
       * @param {Array} colors List of theme properties, colors and custom CSS properties.
       */
      this._emit('response-success', {
        type, name, colors: filteredColors,
      });
    }

    _getFilteredColors(colors) {
      const isSolidColor = (color) => color.value.length === 7;
      const formatColor = ([key, value]) => ({
        prop: key, value: value, cssVar: this._toCSSVar(key),
      });

      return Object.entries(colors)
        .map(formatColor)
        .filter(isSolidColor);
    }

    _toCSSVar(value) {
      return `--${value.replace('.', '-')}`;
    }
  }

  window.customElements.define(CycDm.is, CycDm);
}
