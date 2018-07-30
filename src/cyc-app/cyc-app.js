{
  const {Element} = Polymer;
  const {UtilsMixin} = ColorYourCode;

  /**
   * CYC App
   * @polymer
   * @customElement
   * @memberof ColorYourCode
   * @appliesMixin ColorYourCode.UtilsMixin
   */
  class CycApp extends UtilsMixin(Element) {
    static get is() {
      return 'cyc-app';
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
         * Highlighted section on the editor window.
         */
        _highlightedEditorSection: {
          type: String,
        },

        /**
         * Highlighted color on the theme editor (sidebar).
         */
        _highlightedEditorColor: {
          type: String,
        },
      };
    }

    ready() {
      super.ready();
      this._emit('shell-loaded');
    }

    _onEditorWindowSectionHover(event) {
      this._highlightedEditorColor = event.detail;
    }

    _onThemeEditorColorHover(event) {
      this._highlightedEditorSection = event.detail;
    }

    _onEditorWindowClick(event) {
      const part = this._getEditorSection(event);
      this.$.panel.openColorPicker(part);
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

  window.customElements.define(CycApp.is, CycApp);
}
