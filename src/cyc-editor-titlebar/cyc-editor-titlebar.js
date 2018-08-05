import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {highlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';

/**
 * `<cyc-editor-titlebar>` displays the editor title bar.
 * @polymer
 * @customElement
 * @extends {highlightMixin}
 * @extends {PolymerElement}
 */
class CycEditorTitlebar extends highlightMixin(PolymerElement) {
  static get template() {
    return html`
    <link rel="stylesheet" href="../cyc-styles/cyc-shared-styles.css" inline>
    <link rel="stylesheet" href="cyc-editor-titlebar.css" inline>

    <div class="buttons" aria-hidden="true">
      <div class="winBtn winBtn--close"></div>
      <div class="winBtn winBtn--minimize"></div>
      <div class="winBtn winBtn--maximize"></div>
    </div>

    <div class="title">
      <span data-prop="titleBar.activeForeground" on-mouseenter="_onSectionMouseenter">[[themeName]] &mdash; Color Your Code</span>
    </div>
    `;
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

window.customElements.define('cyc-editor-titlebar', CycEditorTitlebar);
