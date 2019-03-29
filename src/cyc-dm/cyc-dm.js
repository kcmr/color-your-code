import {UtilsMixin} from '../cyc-mixins/cyc-utils-mixin.js';

/**
 * Formats the theme editor file according to the data expected by the UIs.
 *
 * @customElement
 * @extends {UtilsMixin}
 */
class CycDm extends UtilsMixin {
  static get properties() {
    return {
      /**
       * URL of the theme file (json).
       */
      url: {
        type: String,
      },
    };
  }

  updated(changedProperties) {
    if (changedProperties.has('url') && this.url) {
      this._request();
    }
  }

  _request() {
    fetch(this.url)
      .then((response) => response.ok && response.json())
      .then(this._formatData.bind(this))
      .catch(this._handleFetchError.bind(this));
  }

  _formatData(data) {
    const {type, name, colors} = data;
    const filteredColors = this._getFilteredColors(colors);

    /**
     * Fired after receiving data from the specified `url`.
     * @event response-success
     * @param {Object} detail Theme data.
     * @param {String} detail.type Theme type (dark | light).
     * @param {String} detail.name Theme name.
     * @param {Array} detail.colors List of theme properties, colors and custom CSS properties.
     */
    this._emit('response-success', {
      type, name, colors: filteredColors,
    });
  }

  _getFilteredColors(colors) {
    const isSolidColor = (color) => color.value.length === 7;
    const formatColor = ([key, value]) => ({
      prop: key,
      value: value.toLowerCase(),
      cssVar: this._toCSSVar(key),
    });

    return Object.entries(colors)
      .map(formatColor)
      .filter(isSolidColor);
  }

  _toCSSVar(value) {
    return `--${value.replace('.', '-')}`;
  }

  _handleFetchError(error) {
    /**
     * Fired when the fetch fails.
     * @event response-error
     * @param {String} Error message.
     */
    this._emit('response-error', error.message);
  }
}

window.customElements.define('cyc-dm', CycDm);
