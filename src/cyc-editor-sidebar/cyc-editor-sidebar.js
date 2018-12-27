import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {highlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

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

    <div class="heading panel-heading"
      data-prop="sideBarTitle.foreground"
      on-mouseenter="_onSectionMouseenter">Explorer</div>

    <div class="sidebar-panel">
      <div class="heading sidebar-heading"
        data-prop="sideBarSectionHeader.background"
        on-mouseenter="_onSectionMouseenter">
        <span class="sidebar-heading__foreground"
          data-prop="sideBarSectionHeader.foreground"
          on-mouseenter="_onSectionMouseenter">Some project</span>
      </div>

      <ul class="files">
        <template is="dom-repeat" items="[[files]]" id="files">
          <li class$="file [[_computeClass(item)]]"
            data-prop$="[[_computeFileBackgroundDataProp(item)]]"
            on-mouseenter="_onSectionMouseenter">
            <span class="file__foreground"
              data-prop$="[[_computeFileForegroundDataProp(item)]]"
              on-mouseenter="_onSectionMouseenter">[[item.name]]</span>
          </li>
        </template>
      </ul>
    </div>
    `;
  }

  static get properties() {
    return {
      /**
       * List of files.
       */
      files: {
        type: Array,
      },
    };
  }

  _computeClass(item) {
    const {modified, untracked, selected} = item;

    return this._classString({
      'modified': modified,
      'untracked': untracked,
      'selected': selected,
    });
  }

  _computeFileBackgroundDataProp(item) {
    return (item.selected)
      ? 'list.inactiveSelectionBackground'
      : 'list.hoverBackground';
  }

  _computeFileForegroundDataProp(item) {
    const {modified, untracked} = item;

    return this._classString({
      'gitDecoration.modifiedResourceForeground': modified,
      'gitDecoration.untrackedResourceForeground': untracked,
      'foreground': (!modified && !untracked),
    });
  }
}

window.customElements.define('cyc-editor-sidebar', CycEditorSidebar);
