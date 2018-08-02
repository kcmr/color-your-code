{
  const {Element} = Polymer;
  const {UtilsMixin} = ColorYourCode;

  /**
   * `<cyc-theme-editor>` allows to edit the theme color values and
   * download the modified theme.
   * @polymer
   * @customElement
   * @extends {Polymer.Element}
   * @extends {ColorYourCode.UtilsMixin}
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
         * Theme colors.
         * @type {Array}
         */
        colors: {
          type: Array,
        },

        /**
         * Copy of the original colors to be modified.
         */
        _colors: {
          type: Array,
          computed: '_computeColors(colors)',
        },

        _submitEnabled: {
          type: Boolean,
          value: false,
        },

        /**
         * Theme property to be edited.
         */
        editProperty: {
          type: Object,
          observer: '_editPropertyChanged',
        },

        /**
         * Current property edited from _colors.
         */
        _currentThemeProperty: {
          type: Object,
        },

        /**
         * History of edited colors for undoing changes.
         */
        _editHistory: {
          type: Array,
          value: () => [],
        },

        /**
         * Number of entries in edit history.
         */
        historyLimit: {
          type: Number,
          value: 20,
        },
      };
    }

    get _theme() {
      const type = this.themeType;
      const name = this.themeName;
      const colors = {};

      for (const color of this._colors) {
        colors[color.prop] = color.value;
      }

      return {type, name, colors};
    }

    _computeColors(colors) {
      return this._clone(colors);
    }

    _updateCSSVars() {
      const {cssVar, value} = this._currentThemeProperty;
      document.documentElement.style.setProperty(cssVar, value);
    }

    _onFormReset(event) {
      event.preventDefault();
      this._submitEnabled = false;
      this._removeDocumentStyles();
      this._restoreOriginalTheme();
      this._clearEditHistory();
    }

    _removeDocumentStyles() {
      document.documentElement.removeAttribute('style');
    }

    _restoreOriginalTheme() {
      this.colors = [...this.colors];
    }

    _clearEditHistory() {
      this._editHistory = [];
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

    /**
     * Opens the color picker to edit the the current `editProperty`.
     */
    openColorPicker() {
      this.$.inputColor.click();
      this._addLastEditedThemePropertyToHistory();
    }

    _editPropertyChanged(editProperty) {
      this._currentThemeProperty = this._getThemeProperty(editProperty);
    }

    _getThemeProperty(property) {
      return this._colors.find((color) => color.prop === property);
    }

    _addLastEditedThemePropertyToHistory() {
      if (this._editHistory.length === this.historyLimit) {
        this.shift('_editHistory');
      }

      this.push('_editHistory', this._clone(this._currentThemeProperty));
    }

    _undo() {
      this._currentThemeProperty = this.pop('_editHistory');
      this._updateCSSVars();
    }
  }

  window.customElements.define(CycThemeEditor.is, CycThemeEditor);
}
