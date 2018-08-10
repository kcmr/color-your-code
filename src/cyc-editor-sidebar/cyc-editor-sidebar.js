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
        <template is="dom-repeat" items="[[files]]">
          <li class$="file [[_computeClass(_selectedFileType, item)]]" on-click="_selectFile">
            <span
              class="file__foreground"
              data-prop="list.activeSelectionForeground"
              on-mouseenter="_onSectionMouseenter">[[item.name]]</span>
          </li>
        </template>
      </ul>
    </div>
    `;
  }

  static get properties() {
    return {
      _selectedFileType: {
        type: String,
        value: 'js',
      },

      /**
       * List of files.
       */
      files: {
        type: Array,
      },
    };
  }

  _computeClass(selectedFileType, item) {
    const {type, modified, untracked} = item;

    return this._classString({
      'modified': modified,
      'untracked': untracked,
      'selected': selectedFileType === type,
    });
  }

  _selectFile(event) {
    event.stopPropagation();

    const {type, name} = event.model.item;
    this._selectedFileType = type;

    /**
     * Fired after selecting a file.
     * @event selected-file
     * @param {Object} detail
     * @param {String} detail.type file extension (html | js | css).
     * @param {String} detail.name file name.
     */
    this._emit('selected-file', {
      type, name,
    });
  }
}

window.customElements.define('cyc-editor-sidebar', CycEditorSidebar);
