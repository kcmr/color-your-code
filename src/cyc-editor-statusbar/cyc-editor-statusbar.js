{
  const {Element} = Polymer;
  const {HighlightMixin} = ColorYourCode;

  /**
   * `<cyc-editor-statusbar>` displays the editor status bar.
   * @polymer
   * @customElement
   * @memberOf ColorYourCode
   */
  class CycEditorStatusbar extends HighlightMixin(Element) {
    static get is() {
      return 'cyc-editor-statusbar';
    }

    static get properties() {
      return {

      };
    }
  }

  window.customElements.define(CycEditorStatusbar.is, CycEditorStatusbar);
}
