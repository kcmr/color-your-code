{
  const {Element} = Polymer;
  const {HighlightMixin} = ColorYourCode;

  /**
   * `<cyc-editor-activitybar>` displays the editor activity bar.
   * @polymer
   * @customElement
   * @memberOf ColorYourCode
   */
  class CycEditorActivitybar extends HighlightMixin(Element) {
    static get is() {
      return 'cyc-editor-activitybar';
    }

    static get properties() {
      return {

      };
    }
  }

  window.customElements.define(CycEditorActivitybar.is, CycEditorActivitybar);
}
