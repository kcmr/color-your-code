{
  const {Element} = Polymer;
  const {HighlightMixin, UtilsMixin} = ColorYourCode;

  /**
   * `<cyc-editor-activitybar>` displays the editor activity bar.
   * @polymer
   * @customElement
   * @memberOf ColorYourCode
   */
  class CycEditorActivitybar extends UtilsMixin(
    HighlightMixin(
      Element)) {

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
