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
        _currentEditedThemeProperty: {
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
         * Number of allowed entries in edit history.
         */
        historyLimit: {
          type: Number,
          value: 20,
        },

        _formChanged: {
          type: Boolean,
          value: false,
        },
      };
    }

    /**
     * Generated theme.
     */
    get theme() {
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

    _updateTheme() {
      this._updateColors();
      this._updateDocumentStyles();
    }

    _updateColors() {
      const {prop, value} = this._currentEditedThemeProperty;
      const index = this._colors.findIndex((color) => color.prop === prop);
      this.set(['_colors', index, 'value'], value);
    }

    _updateDocumentStyles() {
      const {cssVar, value} = this._currentEditedThemeProperty;
      document.documentElement.style.setProperty(cssVar, value);
    }

    _onFormReset(event) {
      event.preventDefault();
      this._formChanged = false;
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

    _onFormChange() {
      this._formChanged = true;
      this._addLastEditedPropertyToHistory();
    }

    _addLastEditedPropertyToHistory() {
      if (!this._valueHasChanged()) {
        return;
      }

      if (this._editHistory.length === this.historyLimit) {
        this.shift('_editHistory');
      }

      this.push('_editHistory', this._lastEditedProperty);
    }

    _valueHasChanged() {
      const lastHistoryEntry = this._editHistory[this._editHistory.length - 1];
      return !this._deepEqual(lastHistoryEntry, this._lastEditedProperty);
    }

    _onFormSubmit(event) {
      event.preventDefault();
      this._downloadTheme();
    }

    _downloadTheme() {
      const formattedTheme = JSON.stringify(this.theme, null, 4);
      const output = `data:text/json;charset=utf-8,${formattedTheme}`;
      this.$.downloadLink.href = output;
      this.$.downloadLink.click();
    }

    /**
     * Opens the color picker to edit the the current `editProperty`.
     */
    openColorPicker() {
      this.$.inputColor.click();
      this._setLastEditedProperty();
    }

    _setLastEditedProperty() {
      if (this._currentEditedThemeProperty) {
        this._lastEditedProperty = this._clone(this._currentEditedThemeProperty);
      }
    }

    _editPropertyChanged(editProperty) {
      this._currentEditedThemeProperty = this._colors.find((color) => {
        return color.prop === editProperty;
      });
    }

    _undo() {
      this._currentEditedThemeProperty = this.pop('_editHistory');
      this._updateTheme();
    }
  }

  window.customElements.define(CycThemeEditor.is, CycThemeEditor);
}
