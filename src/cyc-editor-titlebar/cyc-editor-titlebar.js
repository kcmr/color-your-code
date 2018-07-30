{
  const {Element} = Polymer;
  const {HighlightMixin} = ColorYourCode;

  /**
   * `<cyc-editor-titlebar>` displays the editor title bar.
   * @polymer
   * @customElement
   * @memberof ColorYourCode
   */
  class CycEditorTitlebar extends HighlightMixin(Element) {
    static get is() {
      return 'cyc-editor-titlebar';
    }

    static get properties() {
      return {
        // Name of the theme.
        themeName: {
          type: String,
          value: 'Your Theme Name',
        },
      };
    }
  }

  window.customElements.define(CycEditorTitlebar.is, CycEditorTitlebar);
}
