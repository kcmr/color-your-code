import {html} from 'lit-element';
import {UtilsMixin} from '../cyc-mixins/cyc-utils-mixin.js';
import '../cyc-icons/cyc-icons.js';

/**
 * `<cyc-theme-editor>` allows to edit the theme color values and
 * download the modified theme.
 * @customElement
 * @extends {UtilsMixin}
 */
class CycThemeEditor extends UtilsMixin {
  render() {
    return html`
    <link rel="stylesheet" href="../cyc-styles/cyc-shared-styles.css" inline>
    <link rel="stylesheet" href="cyc-theme-editor.css" inline>

    <form class="form" @change="${this._onFormChange}" @reset="${this._onFormReset}" @submit="${this._onFormSubmit}">
      <input class="sr-only" id="inputColor"
        type="color"
        value="${this._currentEditedThemeProperty.value}"
        @change="${this._onColorChanged}"
        @input="${this._onColorChanged}">

      <div class="form-actions">
        <button class="btn" type="reset" title="Discard all changes" ?disabled="${!this._themeChanged}">
          <iron-icon icon="cyc:trash"></iron-icon>
        </button>
        <button class="btn" id="btnUndo" type="button" title="Undo" @click="${this._undo}" ?disabled="${!this._editHistory.length}">
          <iron-icon icon="cyc:undo"></iron-icon>
        </button>
        <button class="btn" type="submit" title="Download theme" ?disabled="${!this._themeChanged}">
          <iron-icon icon="cyc:download"></iron-icon>
        </button>
        <a download="theme.json" id="downloadLink" hidden></a>
      </div>
    </form>
    `;
  }

  static get properties() {
    return {
      /**
       * Type of the theme (dark | light)
       */
      themeType: {
        type: String,
      },

      /**
       * Name of the theme.
       */
      themeName: {
        type: String,
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
      },

      /**
       * Theme property to be edited.
       */
      editProperty: {
        type: String,
        attribute: 'edit-property',
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
      },

      /**
       * Number of allowed entries in edit history.
       */
      historyLimit: {
        type: Number,
      },

      /**
       * True if the original theme colors are changed.
       * Used to set the disable attribute on download and reset buttons.
       */
      _themeChanged: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();

    this.themeType = 'dark';
    this.themeName = 'Your theme name';
    this._currentEditedThemeProperty = {};
    this._editHistory = [];
    this.historyLimit = 20;
    this._themeChanged = false;
  }

  firstUpdated() {
    this._$downloadLink = this.shadowRoot.querySelector('#downloadLink');
    this._$inputColor = this.shadowRoot.querySelector('#inputColor');
  }

  updated(changedProperties) {
    if (changedProperties.has('colors')) {
      this._colors = this._clone(this.colors);
    }

    if (changedProperties.has('_editHistory')) {
      this._checkThemeChangedAfterUndoingAllChangesInHistory(this._editHistory.length);
    }

    if (changedProperties.has('editProperty')) {
      this._editPropertyChanged(this.editProperty);
    }
  }

  _editPropertyChanged(editProperty) {
    this._currentEditedThemeProperty = this._colors.find((color) => {
      return color.prop === editProperty;
    });

    this._$inputColor.value = this._currentEditedThemeProperty.value;
    this.openColorPicker();
  }

  _checkThemeChangedAfterUndoingAllChangesInHistory(editHistoryLength) {
    if (editHistoryLength === 0) {
      this._themeChanged = !this._deepEqual(this._colors, this.colors);
    }
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

  _onColorChanged() {
    this._currentEditedThemeProperty.value = this._$inputColor.value;
    this._updateTheme();
  }

  _updateTheme() {
    this._updateColors();
    this._updateDocumentStyles();
    this._checkThemeChangedAfterUndoingAllChangesInHistory(this._editHistory.length);
  }

  _updateColors() {
    const {prop, value} = this._currentEditedThemeProperty;
    const index = this._colors.findIndex((color) => color.prop === prop);

    this._colors = [...this._colors];
    this._colors[index].value = value;
  }

  _updateDocumentStyles() {
    const {cssVar, value} = this._currentEditedThemeProperty;
    document.documentElement.style.setProperty(cssVar, value);
  }

  _onFormReset(event) {
    event.preventDefault();
    this._themeChanged = false;
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
    this._themeChanged = true;
    this._addLastEditedPropertyToHistory();
  }

  _addLastEditedPropertyToHistory() {
    if (!this._valueHasChanged()) {
      return;
    }

    if (this._editHistory.length === this.historyLimit) {
      this._editHistory.shift();
    }

    this._editHistory.push(this._lastEditedProperty);
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
    const formattedTheme = encodeURIComponent(JSON.stringify(this.theme, null, 4));
    const output = `data:text/json;charset=utf-8,${formattedTheme}`;

    this._$downloadLink.href = output;
    this._$downloadLink.click();
  }

  /**
   * Opens the color picker to edit the the current `editProperty`.
   */
  openColorPicker() {
    this._$inputColor.click();
    this._setLastEditedProperty();
  }

  _setLastEditedProperty() {
    if (this._currentEditedThemeProperty) {
      this._lastEditedProperty = this._clone(this._currentEditedThemeProperty);
    }
  }

  _undo() {
    this._currentEditedThemeProperty = this._editHistory.pop();
    this._updateTheme();
  }
}

window.customElements.define('cyc-theme-editor', CycThemeEditor);
