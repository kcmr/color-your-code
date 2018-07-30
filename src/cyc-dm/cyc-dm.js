{
  const {Element} = Polymer;
  const {UtilsMixin} = ColorYourCode;

  /**
   * @polymer
   * @customElement
   * @memberof ColorYourCode
   * @appliesMixin ColorYourCode.UtilsMixin
   */
  class CycDm extends UtilsMixin(Element) {
    static get is() {
      return 'cyc-dm';
    }

    static get properties() {
      return {
        /**
         * URL for `<iron-ajax>` element.
         */
        url: {
          type: String,
        },

        /**
         * How to handle the response (json | text | xml).
         */
        handleAs: {
          type: String,
          value: 'json',
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
