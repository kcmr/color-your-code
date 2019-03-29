import {html} from 'lit-element';
import {HighlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';
import '../cyc-icons/cyc-icons.js';

/**
 * `<cyc-editor-statusbar>` displays the editor status bar.
 * @customElement
 * @extends {HighlightMixin}
 */
class CycEditorStatusbar extends HighlightMixin {
  render() {
    return html`
    <link rel="stylesheet" href="../cyc-styles/cyc-shared-styles.css" inline>
    <link rel="stylesheet" href="cyc-editor-statusbar.css" inline>

    <div class="border" data-prop="statusBar.border" @mouseenter="${this._onSectionMouseenter}"></div>
    <div class="left">
      <iron-icon icon="cyc:fork" class="icon git-icon"></iron-icon>
      <span data-prop="statusBar.foreground" @mouseenter="${this._onSectionMouseenter}">master master!</span>
      <span class="grayscale"> 🤘</span>
    </div>
    <div class="right"></div>
    `;
  }
}

window.customElements.define('cyc-editor-statusbar', CycEditorStatusbar);
