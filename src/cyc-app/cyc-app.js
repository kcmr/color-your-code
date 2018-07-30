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
        // Name of the file to be used as base theme.
        themeFile: {
          type: String,
          value: 'electron-color-theme.json',
        },
        _highlightSection: {
          type: String,
        },
        _foundColor: {
          type: String,
        },
      };
    }

    ready() {
      super.ready();
      this._emit('shell-loaded');
    }

    _setHighlight(event) {
      this._highlightSection = event.detail;
    }

    _setFoundColor(event) {
      this._foundColor = event.detail;
    }
  }

  window.customElements.define(CycApp.is, CycApp);
}
