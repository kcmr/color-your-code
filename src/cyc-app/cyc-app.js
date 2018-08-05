import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {utilsMixin} from '../cyc-mixins/cyc-utils-mixin.js';
import '../cyc-editor-window/cyc-editor-window.js';
import '../cyc-theme-editor/cyc-theme-editor.js';
import '../cyc-dm/cyc-dm.js';

/**
 * CYC App
 * @polymer
 * @customElement
 * @extends {utilsMixin}
 * @extends {PolymerElement}
 */
class CycApp extends utilsMixin(PolymerElement) {
  static get template() {
    return html`
    <link rel="stylesheet" href="cyc-app.css" inline>

    <cyc-dm id="dmTheme" hidden url="[[themeFile]]" on-response-success="_onDmResponseSuccess"></cyc-dm>

    <div class="preview">
      <h1 class="site-title" role="text">
        <iron-icon aria-hidden="true" icon="cyc:vscode" class="site-title__logo"></iron-icon>
        <span>Color your Code</span>
      </h1>

      <cyc-editor-window id="editorWindow"
        theme-name="[[_themeName]]"
        on-editor-section-hover="_onEditorWindowSectionHover"
        on-mouseleave="_onEditorWindowMouseleave"
        on-click="_onEditorWindowClick">
      </cyc-editor-window>

      <div class="hover-info">
        [[_hoveredEditorSection]]
      </div>
    </div>

    <cyc-theme-editor class="panel" id="themeEditor"
      edit-property="[[_selectedEditorSection]]"
      colors="[[_colors]]">
    </cyc-theme-editor>
    `;
  }

  static get properties() {
    return {
      /**
       * Name of the file to be used as base theme.
       */
      themeFile: {
        type: String,
        value: 'electron-color-theme.json',
      },

      /**
       * Hovered section on the editor window.
       */
      _hoveredEditorSection: {
        type: String,
      },

      /**
       * Name of the theme.
       */
      _themeName: {
        type: String,
      },

      /**
       * Theme type (dark | light).
       */
      _themeType: {
        type: String,
        value: 'dark',
      },

      /**
       * List of theme CSS properties and color values.
       * @type {Array}
       */
      _colors: {
        type: Array,
      },

      /**
       * Clicked theme section.
       */
      _selectedEditorSection: {
        type: String,
      },
    };
  }

  ready() {
    super.ready();
    this._emit('shell-loaded');
  }

  _onEditorWindowSectionHover(event) {
    this._hoveredEditorSection = event.detail;
  }

  _onEditorWindowMouseleave() {
    setTimeout(() => {
      this._hoveredEditorSection = '';
    }, 100);
  }

  _onEditorWindowClick(event) {
    this._selectedEditorSection = this._getEditorSection(event);
    this.$.themeEditor.openColorPicker();
  }

  _getEditorSection(event) {
    const path = event.composedPath();
    const hasDatasetProp = (element) => (element.dataset || {}).prop;
    return path.filter(hasDatasetProp)[0].dataset.prop;
  }

  _onDmResponseSuccess(event) {
    const {name, type, colors} = event.detail;

    this._themeName = name;
    this._themeType = type;
    this._colors = colors;
  }
}

window.customElements.define('cyc-app', CycApp);
