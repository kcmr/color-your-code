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

    <div class="heading panel-heading" data-prop="sideBarTitle.foreground" on-mouseenter="_onSectionMouseenter">Explorer</div>
    <div class="sidebar-panel">
      <div class="heading sidebar-heading" data-prop="editor.foreground" on-mouseenter="_onSectionMouseenter">Open editors</div>
      <ul class="open-files">
        <template is="dom-repeat" items="[[_openFiles]]">
          <li class$="[[_computeClass(_selectedFileType, item)]]" on-click="_selectFile">[[item.name]]</li>
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

      _openFiles: {
        type: Array,
        value: () => [{
          name: 'some-file.js',
          type: 'js',
          modified: true,
        }, {
          name: 'some-file.html',
          type: 'html',
          modified: false,
        }, {
          name: 'some-file.css',
          type: 'css',
          modified: false,
        }],
      },
    };
  }

  _computeClass(selectedFileType, item) {
    const {type, modified} = item;

    const modifiedClass = modified ? 'modified' : '';
    const selectedClass = (selectedFileType === type) ? 'selected' : '';
    const className = `${modifiedClass} ${selectedClass}`;

    return className;
  }

  _selectFile(event) {
    event.stopPropagation();

    const type = event.model.item.type;
    this._selectedFileType = type;

    /**
     * Fired after selecting a file.
     * @event selected-file
     * @param {String} type file extension (html | js | css).
     */
    this._emit('selected-file', type);
  }
}

window.customElements.define('cyc-editor-sidebar', CycEditorSidebar);
