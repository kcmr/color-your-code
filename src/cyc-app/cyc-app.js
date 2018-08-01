{
  const {Element} = Polymer;
  const {UtilsMixin} = ColorYourCode;

  /**
   * CYC App
   * @polymer
   * @customElement
   * @memberof ColorYourCode
   * @extends {ColorYourCode.UtilsMixin}
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

    _onEditorWindowSectionMouseleave() {
      setTimeout(() => {
        this._hoveredEditorSection = '';
      }, 100);
    }

    _onEditorWindowClick(event) {
      this._selectedEditorSection = this._getEditorSection(event);
      this.$.panel.openColorPicker();
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
