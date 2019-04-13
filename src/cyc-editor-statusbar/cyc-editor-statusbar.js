import {html, css} from 'lit-element';
import {styles as sharedStyles} from '../cyc-styles/cyc-shared-styles.css.js';
import {styles} from './cyc-editor-statusbar.css.js';
import {HighlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';
import '../cyc-icons/cyc-icons.js';

/**
 * `<cyc-editor-statusbar>` displays the editor status bar.
 * @customElement
 * @extends {HighlightMixin}
 */
class CycEditorStatusbar extends HighlightMixin {
  static get styles() {
    return css`
      ${sharedStyles}
      ${styles}`;
  }

  render() {
    return html`
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
