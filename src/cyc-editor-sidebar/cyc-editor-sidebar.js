{
  const {Element} = Polymer;
  const {HighlightMixin} = ColorYourCode;

  /**
   * `<cyc-editor-sidebar>` displays the editor sidebar.
   * @polymer
   * @customElement
   * @memberof ColorYourCode
   * @appliesMixin ColorYourCode.HighlightMixin
   */
  class CycEditorSidebar extends HighlightMixin(Element) {
    static get is() {
      return 'cyc-editor-sidebar';
    }

    static get properties() {
      return {

      };
    }
  }

  window.customElements.define(CycEditorSidebar.is, CycEditorSidebar);
}
