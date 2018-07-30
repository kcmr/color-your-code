{
  const {Element} = Polymer;

  /**
   * `<cyc-editor-sidebar>` displays the editor sidebar.
   * @polymer
   * @customElement
   */
  class CycEditorSidebar extends Element {
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
