import {html} from 'lit-element';
import {HighlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';
import '../cyc-mixins/cyc-utils-mixin.js';
import '../cyc-icons/cyc-icons.js';

/**
 * `<cyc-editor-activitybar>` displays the editor activity bar.
 * @customElement
 * @extends {HighlightMixin}
 */
class CycEditorActivitybar extends HighlightMixin {
  render() {
    return html`
    <link rel="stylesheet" href="../cyc-styles/cyc-shared-styles.css" inline>
    <link rel="stylesheet" href="cyc-editor-activitybar.css" inline>

    <ul class="icons" @mouseenter="${this._onSectionMouseenter}" data-target-prop="activityBar.foreground">
      <li>
        <span class="badge" data-prop="activityBarBadge.background" @mouseenter="${this._onSectionMouseenter}">
          <span class="bagde-text" data-prop="activityBarBadge.foreground" @mouseenter="${this._onSectionMouseenter}">1</span>
        </span>
        <iron-icon icon="cyc:files" data-prop="activityBar.foreground" class="icon active"></iron-icon>
      </li>
      <li><iron-icon icon="cyc:search" data-prop="activityBar.foreground" class="icon"></iron-icon></li>
      <li><iron-icon icon="cyc:git" data-prop="activityBar.foreground" class="icon"></iron-icon></li>
      <li><iron-icon icon="cyc:debug" data-prop="activityBar.foreground" class="icon"></iron-icon></li>
      <li><iron-icon icon="cyc:extensions" data-prop="activityBar.foreground" class="icon"></iron-icon></li>
    </ul>
    `;
  }
}

window.customElements.define('cyc-editor-activitybar', CycEditorActivitybar);
