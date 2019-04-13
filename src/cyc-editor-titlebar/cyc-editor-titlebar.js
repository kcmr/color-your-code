import {html, css} from 'lit-element';
import {styles as sharedStyles} from '../cyc-styles/cyc-shared-styles.css.js';
import {styles} from './cyc-editor-titlebar.css.js';
import {HighlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';

/**
 * `<cyc-editor-titlebar>` displays the editor title bar.
 * @customElement
 * @extends {HighlightMixin}
 */
class CycEditorTitlebar extends HighlightMixin {
  static get styles() {
    return css`
      ${sharedStyles}
      ${styles}`;
  }

  render() {
    return html`
    <div class="buttons" aria-hidden="true">
      <div class="winBtn winBtn--close"></div>
      <div class="winBtn winBtn--minimize"></div>
      <div class="winBtn winBtn--maximize"></div>
    </div>

    <div class="title">
      <span data-prop="titleBar.activeForeground" @mouseenter="${this._onSectionMouseenter}">${this.themeName} &mdash; Color Your Code</span>
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
        attribute: 'theme-name',
      },
    };
  }

  constructor() {
    super();

    this.themeName = 'Your Theme Name';
  }
}

window.customElements.define('cyc-editor-titlebar', CycEditorTitlebar);
