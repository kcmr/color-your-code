import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {utilsMixin} from '../cyc-mixins/cyc-utils-mixin.js';
import '../cyc-icons/cyc-icons.js';

/**
 * `<cyc-theme-editor>` allows to edit the theme color values and
 * download the modified theme.
 * @polymer
 * @customElement
 * @extends {utilsMixin}
 * @extends {PolymerElement}
 */
class CycThemeEditor extends utilsMixin(PolymerElement) {
  static get template() {
    return html`
    <link rel="stylesheet" href="../cyc-styles/cyc-shared-styles.css" inline>
    <link rel="stylesheet" href="cyc-theme-editor.css" inline>

    <form class="form" on-change="_onFormChange" on-reset="_onFormReset" on-submit="_onFormSubmit">
      <input class="sr-only" id="inputColor"
        type="color"
        value="{{_currentEditedThemeProperty.value::input}}"
        on-input="_updateTheme"
        on-change="_updateTheme">

      <div class="form-actions">
        <button class="btn" type="button" title="Edit mode">
          <iron-icon icon="cyc:eyedroper" class="icon-eyedroper"></iron-icon>
        </button>
        <button class="btn" type="button" title="Edit mode">
          <iron-icon icon="cyc:cursor" class="icon-eyedroper"></iron-icon>
        </button>
        <button class="btn" type="button" title="Edit mode">
          <iron-icon icon="cyc:crosshair"></iron-icon>
        </button>
        <button class="btn" type="reset" title="Discard all changes" disabled="[[!_themeChanged]]">
          <iron-icon icon="cyc:trash"></iron-icon>
        </button>
        <button class="btn" id="btnUndo" type="button" title="Undo" on-click="_undo" disabled="[[!_editHistory.length]]">
          <iron-icon icon="cyc:undo"></iron-icon>
        </button>
        <button class="btn" type="submit" title="Download theme" disabled="[[!_themeChanged]]">
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

      /**
       * True if the original theme colors are changed.
       * Used to set the disable attribute on download and reset buttons.
       */
      _themeChanged: {
        type: Boolean,
        value: false,
      },
    };
  }

  static get observers() {
    return [
      '_checkThemeChangedAfterUndoingAllChangesInHistory(_editHistory.length, _colors.*)',
    ];
  }

  _computeColors(colors) {
    return this._clone(colors);
  }

  _editPropertyChanged(editProperty) {
    this._currentEditedThemeProperty = this._colors.find((color) => {
      return color.prop === editProperty;
    });
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
    const formattedTheme = encodeURIComponent(JSON.stringify(this.theme, null, 4));
    const output = `data:text/json;charset=utf-8,${formattedTheme}`;
    this.$.downloadLink.href = output;
    this.$.downloadLink.click();
  }

  /**
   * Opens the color picker to edit the the current `editProperty`.
   */
  openColorPicker() {
    this.$.inputColor.focus(); // Required for Edge
    this.$.inputColor.click();
    this._setLastEditedProperty();
  }

  _setLastEditedProperty() {
    if (this._currentEditedThemeProperty) {
      this._lastEditedProperty = this._clone(this._currentEditedThemeProperty);
    }
  }

  _undo() {
    this._currentEditedThemeProperty = this.pop('_editHistory');
    this._updateTheme();
  }
}

window.customElements.define('cyc-theme-editor', CycThemeEditor);
