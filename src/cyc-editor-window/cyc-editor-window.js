{
  const {Element} = Polymer;
  const {HighlightMixin} = ColorYourCode;

  /**
   * `<cyc-editor-window>` displays the editor window preview.
   * @polymer
   * @customElement
   * @memberof ColorYourCode
   */
  class CycEditorWindow extends HighlightMixin(Element) {
    static get is() {
      return 'cyc-editor-window';
    }

    static get properties() {
      return {

      };
    }
  }

  window.customElements.define(CycEditorWindow.is, CycEditorWindow);
}
