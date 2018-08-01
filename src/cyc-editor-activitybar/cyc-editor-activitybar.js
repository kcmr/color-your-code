{
  const {Element} = Polymer;
  const {HighlightMixin} = ColorYourCode;

  /**
   * `<cyc-editor-activitybar>` displays the editor activity bar.
   * @polymer
   * @customElement
   * @memberof ColorYourCode
   * @extends {ColorYourCode.HighlightMixin}
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
