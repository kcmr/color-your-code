{
  const {Element} = Polymer;
  const {HighlightMixin} = ColorYourCode;

  /**
   * `<cyc-editor-window>` displays the editor window preview.
   * @polymer
   * @customElement
   * @memberof ColorYourCode
   * @appliesMixin ColorYourCode.HighlightMixin
   */
  class CycEditorWindow extends HighlightMixin(Element) {
    static get is() {
      return 'cyc-editor-window';
    }

    static get properties() {
      return {
        /**
         * Name of the theme.
         */
        themeName: {
          type: String,
          value: 'Your Theme Name',
        },
      };
    }
  }

  window.customElements.define(CycEditorWindow.is, CycEditorWindow);
}
