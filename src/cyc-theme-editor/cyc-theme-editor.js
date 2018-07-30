{
  const {Element} = Polymer;
  const {UtilsMixin} = ColorYourCode;

  /**
   * `<cyc-theme-editor>` displays the full list of editor colors and
   * allows to change them and download the modified theme.
   * @polymer
   * @customElement
   * @memberof ColorYourCode
   */
  class CycThemeEditor extends UtilsMixin(Element) {
    static get is() {
      return 'cyc-theme-editor';
    }

    static get properties() {
      return {
        /**
         * Type of the theme (dark | light)
         */
        themeType: {
          type: String,
          value: 'dark',
        },

        /**
         * Name of the theme.
         */
        themeName: {
          type: String,
          value: 'Your theme name',
        },

        /**
         * Object with the full theme configuration.
         * @type {Object}
         */
        theme: {
          type: Object,
        },

        /**
         * Color to highlight in the color list.
         */
        highlightColor: {
          type: String,
          observer: '_scrollToColor',
        },

        _themeColors: {
          type: Array,
          computed: '_computeThemeColors(theme)',
        },

        _submitEnabled: {
          type: Boolean,
          value: false,
        },
      };
    }

    get _theme() {
      const type = this.themeType;
      const name = this.themeName;
      const colors = {};

      for (const color of this._themeColors) {
        colors[color.prop] = color.value;
      }

      return {type, name, colors};
    }

    _computeThemeColors(theme) {
      const colors = Object.entries(theme.colors);

      const isSolidColor = (color) => color.value.length === 7;
      const formatColor = ([key, value]) => ({
        prop: key, value: value, cssVar: this._toCSSVar(key),
      });

      return colors.map(formatColor).filter(isSolidColor);
    }

    _toCSSVar(value) {
      return `--${value.replace('.', '-')}`;
    }

    _updateCSSVars(event) {
      const {dataset: {cssVar}, value} = event.target;
      document.documentElement.style.setProperty(cssVar, value);
    }

    _onFormReset(event) {
      event.preventDefault();
      this._submitEnabled = false;
      this._removeDocumentStyles();
      this._restoreOriginalTheme();
    }

    _removeDocumentStyles() {
      document.documentElement.removeAttribute('style');
    }

    _restoreOriginalTheme() {
      this.theme = Object.assign({}, this.theme);
    }

    _enableSubmit() {
      this._submitEnabled = true;
    }

    _onFormSubmit(event) {
      event.preventDefault();
      this._downloadTheme();
    }

    _downloadTheme() {
      const formattedTheme = JSON.stringify(this._theme, null, 4);
      const output = `data:text/json;charset=utf-8,${formattedTheme}`;
      this.$.downloadLink.href = output;
      this.$.downloadLink.click();
    }

    _onColorHover(event) {
      this._emit('color-hover', event.model.item.prop);
    }

    _onListMouseleave() {
      this._emit('color-hover');
    }

    _computeHighlighted(prop, highlightColor) {
      return (prop === highlightColor) ? 'highlight' : '';
    }

    _scrollToColor(color) {
      if (color) {
        this._getInputByName(color).scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }

    /**
     * Opens the color picker to edit the specified theme property.
     * @param {String} themeProperty Theme property.
     */
    openColorPicker(themeProperty) {
      if (themeProperty) {
        this._getInputByName(themeProperty).click();
      }
    }

    _getInputByName(name) {
      return this.shadowRoot.querySelector(`[name="${name}"]`);
    }

   /**
    * Fired after mouseenter/mouseleave a color field
    * @event color-hover
    * @param {String} detail property name or ''
    */
  }

  window.customElements.define(CycThemeEditor.is, CycThemeEditor);
}
