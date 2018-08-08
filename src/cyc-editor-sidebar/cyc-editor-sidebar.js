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
    <div class="sidebar-panel" data-target-prop="editor.foreground" on-mouseenter="_onSectionMouseenter">
      <div class="heading sidebar-heading" data-prop="editor.foreground">Editores abiertos</div>
      <ul class="open-files">
        <li class="modified selected">some-file.html</li>
        <li data-prop="editor.foreground">some-file.js</li>
        <li data-prop="editor.foreground">some-file.scss</li>
      </ul>
    </div>
    `;
  }
}

window.customElements.define('cyc-editor-sidebar', CycEditorSidebar);
