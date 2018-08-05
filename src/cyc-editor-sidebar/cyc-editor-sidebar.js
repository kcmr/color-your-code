import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {highlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';

/**
 * `<cyc-editor-sidebar>` displays the editor sidebar.
 * @polymer
 * @customElement
 * @extends {highlightMixin}
 * @extends {PolymerElement}
 */
class CycEditorSidebar extends highlightMixin(PolymerElement) {
  static get template() {
    return html`
    <link rel="stylesheet" href="../cyc-styles/cyc-shared-styles.css" inline>
    <link rel="stylesheet" href="cyc-editor-sidebar.css" inline>

    <div class="heading panel-heading" data-prop="sideBarTitle.foreground" on-mouseenter="_onSectionMouseenter">Explorador</div>
    <div class="sidebar-panel">
      <div class="heading sidebar-heading">Editores abiertos</div>
      <ul class="open-files">
        <li class="modified selected">some-file.html</li>
        <li>some-file.js</li>
        <li>some-file.scss</li>
      </ul>
    </div>
    `;
  }
}

window.customElements.define('cyc-editor-sidebar', CycEditorSidebar);
