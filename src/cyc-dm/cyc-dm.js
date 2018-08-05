import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {utilsMixin} from '../cyc-mixins/cyc-utils-mixin.js';

/**
 * Formats the theme editor file according to the data expected by the UIs.
 * @polymer
 * @customElement
 * @extends {utilsMixin}
 * @extends {PolymerElement}
 */
class CycDm extends utilsMixin(PolymerElement) {
  static get properties() {
    return {
      /**
       * URL of the theme file (json).
       */
      url: {
        type: String,
        observer: '_urlChanged',
      },
    };
  }

  _urlChanged(url) {
    fetch(url).then((response) => {
      response.json().then(this._formatData.bind(this));
    });
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
}

window.customElements.define('cyc-dm', CycDm);
