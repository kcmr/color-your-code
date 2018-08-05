import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {highlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';
import '../cyc-icons/cyc-icons.js';

/**
 * `<cyc-editor-statusbar>` displays the editor status bar.
 * @polymer
 * @customElement
 * @extends {highlightMixin}
 * @extends {PolymerElement}
 */
class CycEditorStatusbar extends highlightMixin(PolymerElement) {
  static get template() {
    return html`
    <link rel="stylesheet" href="../cyc-styles/cyc-shared-styles.css" inline>
    <link rel="stylesheet" href="cyc-editor-statusbar.css" inline>

    <div class="border" data-prop="statusBar.border"></div>
    <div class="left">
      <iron-icon icon="cyc:fork" class="icon git-icon"></iron-icon>
      <span data-prop="statusBar.foreground" on-mouseenter="_onSectionMouseenter">master master!</span>
      <span class="grayscale"> 🤘</span>
    </div>
    <div class="right"></div>
    `;
  }
}

window.customElements.define('cyc-editor-statusbar', CycEditorStatusbar);
