import {html} from 'lit-element';
import {utilsMixin} from '../cyc-mixins/cyc-utils-mixin.js';
import '../cyc-editor-window/cyc-editor-window.js';
import '../cyc-theme-editor/cyc-theme-editor.js';
import '../cyc-dm/cyc-dm.js';

/**
 * CYC App
 * @customElement
 * @extends {utilsMixin}
 */
class CycApp extends utilsMixin {
  render() {
    return html`
    <link rel="stylesheet" href="cyc-app.css" inline>

    <cyc-dm id="dmTheme"
      hidden
      .url="${this.themeFile}"
      @response-success="${this._onDmResponseSuccess}"></cyc-dm>

    <div class="preview">
      <h1 class="site-title" role="text">
        <iron-icon aria-hidden="true" icon="cyc:vscode" class="site-title__logo"></iron-icon>
        <span>Color your Code</span>
      </h1>

      <cyc-editor-window id="editorWindow"
        theme-name="${this._themeName}"
        @editor-section-hover="${this._onEditorWindowSectionHover}"
        @mouseleave="${this._onEditorWindowMouseleave}"
        @click="${this._onEditorWindowClick}">
      </cyc-editor-window>

      <div class="hover-info">
        <span class="editor-section-name">${this._hoveredEditorSection}</span>
        <span class="color-preview" style="background-color: var(${this._hoveredEditorColor});"></span>
      </div>
    </div>

    <cyc-theme-editor class="panel" id="themeEditor"
      edit-property="${this._selectedEditorSection}"
      .colors="${this._colors}">
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
        attribute: 'theme-file',
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._emit('shell-loaded');
  }

  constructor() {
    super();

    this.themeFile = 'electron-color-theme.json';
    this._themeType = 'dark';
    this._hoveredEditorSection = '';
    this._hoveredEditorColor = '';
    this._themeName = '';
    this._colors = [];
    this._selectedEditorSection = '';
  }

  _onEditorWindowSectionHover(event) {
    this._hoveredEditorSection = event.detail;
    this._hoveredEditorColor = this._colors.find((color) => {
      return color.prop === event.detail;
    }).cssVar;
  }

  _onEditorWindowMouseleave() {
    setTimeout(() => {
      this._hoveredEditorSection = '';
      this._hoveredEditorColor = '';
    }, 100);
  }

  _onEditorWindowClick(event) {
    this._selectedEditorSection = this._getEditorSection(event);
    this.shadowRoot.querySelector('#themeEditor').openColorPicker();
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
