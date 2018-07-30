{
  const {Element} = Polymer;
  const {HighlightMixin, UtilsMixin} = ColorYourCode;

  /**
   * `<cyc-editor-titlebar>` displays the editor title bar.
   * @polymer
   * @customElement
   * @memberof ColorYourCode
   */
  class CycEditorTitlebar extends UtilsMixin(
    HighlightMixin(
      Element)) {

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

    _onEditorPartMouseenter(event) {
      const editorPart = event.currentTarget.dataset.prop;
      this._emit('editor-part-hover', editorPart);
    }

    _onEditorPartMouseleave() {
      setTimeout(() => {
        this._emit('editor-part-hover');
      }, 100);
    }
  }

  window.customElements.define(CycEditorTitlebar.is, CycEditorTitlebar);
}
